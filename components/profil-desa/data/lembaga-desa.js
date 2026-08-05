import {
  Landmark,
  Users,
  Heart,
  Star,
  Shield,
  Building2,
  Sprout,
  Baby,
  Home,
} from "lucide-react";

export const lembagaDesa = [
  {
    id: "lpm",
    singkatan: "LPM",
    nama: "Lembaga Pemberdayaan Masyarakat",
    deskripsi:
      "Mitra kerja pemerintah desa dalam perencanaan, pelaksanaan, dan pengawasan pembangunan yang bersumber dari masyarakat.",
    icon: Users,
    details: {
      since: "2020",
      established: "Dibentuk melalui kerjasama Pemerintah Desa dengan masyarakat yang difasilitasi oleh Kabupaten Pangandaran.",
      members: "25 anggota aktif (15 laki-laki, 10 perempuan)",
      chairman: "Dede Suryana",
      fullDescription:
        "Lembaga Pemberdayaan Masyarakat (LPM) Desa Jadikarya berfungsi sebagai mitra strategis pemerintah desa dalam pemberdayaan masyarakat. LPM didirikan pada tahun 2020 dengan tujuan untuk meningkatkan partisipasi masyarakat dalam pembangunan dan memberdayakan potensi lokal. LPM berperan sebagai penghubung antara pemerintah desa dan masyarakat dalam merancang, melaksanakan, dan mengawasi berbagai program pembangunan. LPM juga menjadi wadah bagi masyarakat untuk mengembangkan inisiatif pemberdayaan berbasis masyarakat yang berkelanjutan.",
      activities: [
        "Perencanaan program pembangunan berbasis masyarakat",
        "Pelaksanaan program pemberdayaan",
        "Pengawasan pelaksanaan program",
        "Pelatihan keterampilan masyarakat",
        "Pengembangan usaha ekonomi kreatif",
        "Pengorganisasian kegiatan pemberdayaan"
      ],
      vision: "Mewujudkan masyarakat Desa Jadikarya yang mandiri dan berdaya melalui pemberdayaan yang berkelanjutan"
    }
  },
  {
    id: "pkk",
    singkatan: "PKK",
    nama: "Pemberdayaan Kesejahteraan Keluarga",
    deskripsi:
      "Gerakan pemberdayaan keluarga berbasis 10 Program Pokok PKK untuk meningkatkan kualitas hidup masyarakat.",
    icon: Heart,
    details: {
      since: "2018",
      established: "Diperkenalkan oleh Pemerintah Desa sebagai bagian dari program pembangunan kesejahteraan masyarakat.",
      members: "120 kepala keluarga (80 ibu, 40 bapak)",
      chairman: "Suryani M.Kom",
      fullDescription:
        "Lembaga Pemberdayaan Kesejahteraan Keluarga (PKK) Desa Jadikarya merupakan organisasi masyarakat yang fokus pada pemberdayaan keluarga untuk meningkatkan kualitas hidup. PKK didirikan pada tahun 2018 sebagai bagian dari upaya pemerintah desa dalam meningkatkan kesejahteraan masyarakat. PKK terdiri dari berbagai kelompok yang bekerja sama untuk melaksanakan 10 Program Pokok PKK, mulai dari peningkatan perekonomian keluarga, pendidikan anak, hingga kesehatan ibu dan anak. PKK berperan sebagai fasilitator dan motivator dalam memberdayakan keluarga untuk mencapai kehidupan yang lebih baik.",
      activities: [
        "Pelatihan keterampilan usaha kecil",
        "Pendidikan kesehatan keluarga",
        "Pelatihan pengasuhan anak",
        "Pengembangan gizi keluarga",
        "Pelatihan daur ulang dan kerajinan",
        "Bimbingan psikologi keluarga"
      ],
      vision: "Mewujudkan keluarga sejahtera dan berdaya melalui pemberdayaan yang berbasis 10 Program Pokok PKK"
    }
  },
  {
    id: "karangtaruna",
    singkatan: "Karang Taruna",
    nama: "Karang Taruna",
    deskripsi:
      "Organisasi kepemudaan desa yang berperan dalam pengembangan generasi muda, olahraga, dan kegiatan sosial.",
    icon: Star,
    details: {
      since: "2017",
      established: "Didirikan oleh pemuda-pemudi Desa Jadikarya sebagai wadah ekspresi dan pengembangan diri.",
      members: "35 anggota (25 laki-laki, 10 perempuan)",
      chairman: "Rudi",
      fullDescription:
        "Karang Taruna Desa Jadikarya merupakan organisasi kepemudaan yang didirikan pada tahun 2017 sebagai wadah bagi generasi muda dalam mengembangkan potensi diri dan berkontribusi pada masyarakat. Karang Taruna berperan sebagai motor penggerak kegiatan sosial, olahraga, dan budaya di desa. Organisasi ini menjadi tempat bagi pemuda untuk belajar kepemimpinan, bertanggung jawab, dan berkontribusi nyata pada pembangunan desa. Karang Taruna aktif dalam berbagai kegiatan seperti pelatihan keterampilan, olahraga, dan kegiatan sosial lainnya.",
      activities: [
        "Pelatihan kepemimpinan dan kewirausahaan",
        "Olahraga dan rekreasi pemuda",
        "Kegiatan sosial dan bakti sosial",
        "Pelatihan keterampilan dasar",
        "Pengabdian masyarakat",
        "Kegiatan seni dan budaya"
      ],
      vision: "Menjadi wadah pengembangan potensi pemuda untuk menciptakan generasi muda yang cerdas, berakhlak mulia, dan bermanfaat bagi masyarakat"
    }
  },
  {
    id: "kopdes",
    singkatan: "KOPDES",
    nama: "Koperasi Desa",
    deskripsi:
      "Lembaga usaha desa yang dikelola secara mandiri untuk meningkatkan perekonomian dan pendapatan asli desa.",
    icon: Building2,
    details: {
      since: "2021",
      established: "Didirikan sebagai upaya diversifikasi ekonomi desa dan peningkatan PAD.",
      members: "5 pengurus (3 laki-laki, 2 perempuan)",
      chairman: "Dede Suryana",
      fullDescription:
        "Badan Usaha Milik Desa (BUMDes) Desa Jadikarya merupakan lembaga usaha yang didirikan untuk mengelola potensi ekonomi desa dan meningkatkan pendapatan asli desa. BUMDes didirikan pada tahun 2021 sebagai bagian dari upaya pemerintah desa dalam diversifikasi ekonomi dan peningkatan PAD. BUMDes mengelola berbagai usaha seperti penyewaan peralatan pertanian, perdagangan hasil pertanian, dan layanan desa. BUMDes berperan sebagai penggerak ekonomi desa dan sumber pendapatan bagi desa melalui usaha yang berkelanjutan dan menguntungkan.",
      activities: [
        "Pengelolaan usaha penyewaan traktor dan alat pertanian",
        "Perdagangan dan distribusi hasil pertanian",
        "Pengelolaan posyandu dan klinik desa",
        "Penyewaan peralatan pesta dan event",
        "Pengelolaan lahan pertanian desa",
        "Pemasaran produk UMKM desa"
      ],
      vision: "Menjadi badan usaha mandiri yang profesional dan berdaya saing untuk kesejahteraan masyarakat desa"
    }
  },
  {
    id: "poktan",
    singkatan: "Kelompok Tani",
    nama: "Kelompok Tani",
    deskripsi:
      "Wadah bagi petani dalam meningkatkan produktivitas pertanian, berbagi pengetahuan, dan akses terhadap bantuan pertanian.",
    icon: Sprout,
    details: {
      since: "2016",
      established: "Dibentuk melalui inisiatif petani desa untuk meningkatkan produktivitas pertanian.",
      members: "45 anggota (30 laki-laki, 15 perempuan)",
      chairman: "Sutisna",
      fullDescription:
        "Kelompok Tani Desa Jadikarya merupakan wadah bagi petani dalam meningkatkan produktivitas pertanian dan kesejahteraan anggota. Kelompok Tani didirikan pada tahun 2016 sebagai upaya bersama petani desa untuk mengatasi tantangan pertanian dan meningkatkan hasil panen. Kelompok Tani berperan sebagai fasilitator dalam penyuluhan pertanian, distribusi pupuk dan benih, serta pemasaran hasil pertanian. Kelompok Tani juga menjadi tempat bagi petani untuk berbagi pengetahuan dan pengalaman dalam bidang pertanian.",
      activities: [
        "Penyuluhan teknologi pertanian",
        "Distribusi pupuk dan benih berkualitas",
        "Pengolahan dan pemasaran hasil pertanian",
        "Pelatihan pertanian organik",
        "Pengelolaan kelompok tani untuk setiap komoditas",
        "Kerjasama dengan pihak swasta dan pemerintah"
      ],
      vision: "Mewujudkan ketahanan pangan dan peningkatan kesejahteraan petani melalui pertanian yang berkelanjutan dan produktif"
    }
  },
  {
    id: "posyandu",
    singkatan: "Posyandu",
    nama: "Pos Pelayanan Terpadu",
    deskripsi:
      "Unit kegiatan masyarakat yang memberikan layanan kesehatan dasar terutama untuk ibu, bayi, dan balita.",
    icon: Baby,
    details: {
      since: "2015",
      established: "Dibentuk sebagai bagian dari program kesehatan pemerintah pusat di tingkat desa.",
      members: "15 kader (12 perempuan, 3 laki-laki)",
      chairman: "Suryani",
      fullDescription:
        "Posyandu (Pos Pelayanan Terpadu) Desa Jadikarya merupakan unit kesehatan masyarakat yang memberikan layanan kesehatan dasar terutama untuk ibu hamil, ibu menyusui, bayi, dan balita. Posyandu didirikan pada tahun 2015 sebagai bagian dari program kesehatan pemerintah pusat di tingkat desa. Posyandu terdiri dari kader kesehatan yang terlatih untuk memberikan pemeriksaan kesehatan, imunisasi, dan pendidikan kesehatan kepada masyarakat. Posyandu berperan penting dalam menurunkan angka kesakitan dan kematian bayi serta meningkatkan kesehatan ibu dan anak.",
      activities: [
        "Pemeriksaan kesehatan ibu hamil dan menyusui",
        "Imunisasi dan vaksinasi",
        "Pemeriksaan kesehatan bayi dan balita",
        "Pendidikan kesehatan keluarga",
        "Pengukuran pertumbuhan dan perkembangan anak",
        "Penyuluhan gizi dan kebersihan"
      ],
      vision: "Mencapai desa yang sehat dan produktif melalui layanan kesehatan terpadu yang menjangkau seluruh masyarakat"
    }
  },
  {
    id: "rtrw",
    singkatan: "RT / RW",
    nama: "Rukun Tetangga / Rukun Warga",
    deskripsi:
      "Unit terkecil pemerintahan yang berperan dalam membangun solidaritas dan gotong royong antar warga.",
    icon: Home,
    details: {
      since: "1998",
      established: "Dibentuk secara adat dan diformalkan dalam pemerintahan desa.",
      members: "120 RT dan 10 RW",
      chairman: "Ketua RT : Budi, Ketua RW : Rudi",
      fullDescription:
        "Rukun Tetangga (RT) dan Rukun Warga (RW) merupakan unit terkecil pemerintahan desa yang berperan penting dalam membangun solidaritas dan gotong royong antar warga. RT dan RW didirikan sejak tahun 1998 sebagai bagian dari sistem pemerintahan desa yang diformalkan. RT dan RW terdiri dari masyarakat yang tinggal di wilayah tertentu dan berperan sebagai penghubung antara pemerintah desa dan masyarakat. RT dan RW bertugas menjaga keamanan, ketertiban, dan kenyamanan lingkungan, serta memfasilitasi berbagai kegiatan sosial dan pembangunan.",
      activities: [
        "Pengamanan dan ketertiban lingkungan",
        "Kegiatan gotong royong dan kerja bakti",
        "Pendidikan dan penyuluhan masyarakat",
        "Pengorganisasian kegiatan sosial",
        "Koordinasi bantuan dan kemiskinan",
        "Pemeliharaan fasilitas lingkungan"
      ],
      vision: "Mewujudkan lingkungan yang aman, nyaman, dan harmonis melalui solidaritas dan gotong royong antar warga"
    }
  },
];
