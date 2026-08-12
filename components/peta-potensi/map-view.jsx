"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const GEOJSON_URL = "/geoData/titik_potensi.geojson";
const BOUNDARY_URL = "/geoData/desa-jadikarya.geojson";

const CATEGORY_COLORS = {
  Pendidikan: "#2563eb",
  Kesehatan: "#dc2626",
  Ekonomi: "#ea580c",
  Pelayanan: "#7c3aed",
  Keagamaan: "#0d9488",
  UMKM: "#b45309",
  Agroforestik: "#16a34a",
};

const CATEGORY_LABELS = {
  Pendidikan: "Pendidikan",
  Kesehatan: "Kesehatan",
  Ekonomi: "Ekonomi",
  Pelayanan: "Pelayanan",
  Keagamaan: "Keagamaan",
  UMKM: "UMKM",
  Agroforestik: "Agroforestik",
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}

function buildPinIcon(L, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="34" viewBox="0 0 24 32" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.35));">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="${color}" stroke="#ffffff" stroke-width="1.6"/>
    <circle cx="12" cy="11" r="4.5" fill="#ffffff"/>
  </svg>`;
  return L.divIcon({
    className: "potensi-pin",
    html: svg,
    iconSize: [26, 34],
    iconAnchor: [13, 32],
    popupAnchor: [0, -30],
  });
}

const DEFAULT_IMAGE = "/assets/sawah.jpg";

const LOCATION_IMAGES = {
  "Gudang Buah Sumber Rezeki": "/assets/gudangBuah/gudang-buah1.webp",
  "Rain Forest Ecological": "/assets/agroforestik/agroforestik3.webp",
  "Potensi keripik singkong Jadikarya": "/assets/umkm/kripik.webp",
  "Penghasil Kelapa": "/assets/umkm/penghasil_kelapa.webp",
  "Pengolahan Kayu": "/assets/umkm/pengolah_kayu.webp",
  "Kios Bumdes Jadikarya": "/assets/umkm/kios.webp",
  "Puskesmas Jadikarya": "/assets/kesehatan/puskesmas1.webp",
  "Posyandu Melati 2": "/assets/kesehatan/posyandu_2.webp",
  "Posyandu Melati 1": "/assets/kesehatan/posyandu_1.webp",
  "SD N 1 Jadikarya": "/assets/pendidikan/sd_1_jadikarya.webp",
  "SD N 2 Jadikarya": "/assets/pendidikan/sd_2_jadikarya.webp",
  "SD N 3 Jadikarya": "/assets/pendidikan/sd_3_jadikarya.webp",
  "SMP N 4 Langkaplancar": "/assets/pendidikan/smp4.webp",
  "Kantor Kepala desa Jadikarya": "/assets/pelayanan/kades.webp",
  "SPPG Jadikarya": "/assets/pelayanan/sppg.webp",
  "DKM Al-Huda": "/assets/dkm/al_huda.webp",
  "DKM AL-Anwar": "/assets/dkm/al_anwar.webp",
  "DKM Jami' Al-Abror": "/assets/dkm/al_abror.webp",
  "Masjid Al-Hidayah Lebakjero":"/assets/dkm/al_hidayah.webp",
  "DKM Al-Falah": "/assets/dkm/al_falah.webp"
};

function getLocationImage(name) {
  return LOCATION_IMAGES[name] || DEFAULT_IMAGE;
}

function buildPopup(name) {
  const imageUrl = getLocationImage(name);
  return `<div class="potensi-popup-body">
    <img class="potensi-popup-image" src="${imageUrl}" alt="${escapeHtml(name)}" loading="lazy" />
    <h3 class="potensi-popup-title">${escapeHtml(name)}</h3>
  </div>`;
}

function extractOuterRings(boundaryFC) {
  const rings = [];
  boundaryFC.features.forEach((feature) => {
    const geometry = feature.geometry;
    if (!geometry) return;
    if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach((polygon) => {
        polygon.forEach((ring) => rings.push(ring));
      });
    } else if (geometry.type === "Polygon") {
      geometry.coordinates.forEach((ring) => rings.push(ring));
    }
  });
  return rings;
}

function toLatLngRing(ring) {
  return ring.map((coord) => [coord[1], coord[0]]);
}

export default function MapView({ onCounts = null }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const onCountsRef = useRef(onCounts);

  useEffect(() => {
    onCountsRef.current = onCounts;
  }, [onCounts]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;
    let map = null;
    let observer = null;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        maxBoundsViscosity: 1.0,
      });
      mapRef.current = map;
      map.setView([-7.566, 108.49], 14);
      L.control.zoom({ position: "topright" }).addTo(map);
      L.control.scale({ position: "bottomleft", imperial: false }).addTo(map);

      const googleTiles = L.tileLayer(
        "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        {
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
          maxZoom: 20,
          attribution: "Imagery © Google",
        }
      );
      const esriTiles = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 18,
          attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
        }
      );

      googleTiles.addTo(map);
      googleTiles.on("tileerror", () => {
        if (map.hasLayer(googleTiles)) {
          map.removeLayer(googleTiles);
          esriTiles.addTo(map);
        }
      });

      let boundaryBounds = null;
      try {
        const boundaryRes = await fetch(BOUNDARY_URL);
        if (cancelled) return;
        const boundaryFC = await boundaryRes.json();

        const outerRings = extractOuterRings(boundaryFC).map(toLatLngRing);
        const boundaryLayer = L.geoJSON(boundaryFC, {
          style: {
            color: "#D4AF37",
            weight: 3,
            opacity: 1,
            fill: false,
          },
        }).addTo(map);

        boundaryBounds = boundaryLayer.getBounds();

        if (outerRings.length) {
          const worldRing = [
            [90, -180],
            [90, 180],
            [-90, 180],
            [-90, -180],
          ];
          const mask = L.polygon([worldRing, ...outerRings], {
            color: "transparent",
            fillColor: "#858080ff",
            fillOpacity: 0.5,
            interactive: false,
          }).addTo(map);
          boundaryLayer.bringToFront();
        }

        if (boundaryBounds.isValid()) {
          map.setMaxBounds(boundaryBounds);
          map.fitBounds(boundaryBounds, {
            padding: [20, 20],
            maxZoom: 15,
          });
          const minZoom = map.getZoom();
          map.setMinZoom(minZoom);
        }
      } catch (err) {
        console.warn("Gagal memuat batas wilayah:", err);
      }

      const res = await fetch(GEOJSON_URL);
      if (cancelled) return;
      const fc = await res.json();

      const latLngs = [];

      fc.features.forEach((feature) => {
        const name = feature.properties?.NamaLokasi;
        const category = feature.properties?.Kategori;
        const [lng, lat] = feature.geometry.coordinates;
        if (!name || !category) return;

        const marker = L.marker([lat, lng], {
          icon: buildPinIcon(L, CATEGORY_COLORS[category] || "#64748b"),
        });
        marker.bindPopup(buildPopup(name), {
          className: "potensi-popup",
          closeButton: false,
        });
        marker.addTo(map);
        latLngs.push([lat, lng]);
      });

      if (onCountsRef.current) {
        onCountsRef.current({ total: fc.features.length });
      }

      if (!boundaryBounds && latLngs.length) {
        map.fitBounds(L.latLngBounds(latLngs).pad(0.12), {
          padding: [40, 40],
          maxZoom: 16,
        });
      }

      observer = new ResizeObserver(() => map.invalidateSize());
      observer.observe(containerRef.current);
    })();

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      if (map) {
        map.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-0 w-full h-[420px] sm:h-[520px] lg:h-[560px]"
    />
  );
}