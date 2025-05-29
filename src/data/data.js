export const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'nindy', password: '123456' },
];

export const homeData = {
  userName: "Manusia",
  accountNumber: "1111-2222-3333-44",
  balance: "Rp 10,000,000",
  email: "manusi@example.com",
  phone: "+62 1111 2222 33333",
  address: "JAWA, Indonesia",
  device: "Redmi Note 8",
  appVersion: "1.0.0",
  role: "nasabbah",
  status: "Aktif",
  transferHistory: [
    { type: "out", to: "Budi", amount: "Rp 500,000", date: "28 Mei 2025, 17:45 WIB", isNew: true },
    { type: "out", to: "Ani", amount: "Rp 300,000", date: "27 Mei 2025, 15:15 WIB", isNew: false },
    { type: "in", from: "Joko", amount: "Rp 1,000,000", date: "28 Mei 2025, 16:00 WIB", isNew: true },
    { type: "in", from: "Rina", amount: "Rp 750,000", date: "27 Mei 2025, 12:45 WIB", isNew: false }
  ],
  
  eventNews: [
    { title: "Pembaruan Kebijakan", status: "Baru" },
    { title: "Promo Baru: Diskon 20%", status: "Baru" },
    { title: "Pembaruan Aplikasi v2.1", status: "Selesai" },
    { title: "Pemeliharaan Sistem", status: "Selesai" },
    { title: "Dibatalkan: Event Offline", status: "Dibatalkan" }
  ],
  quickActions: [
    { name: "Jadwal Pengangkutan", icon: "FaCalendarAlt", color: "from-green-600 to-green-400", dashboard: "JadwalPengangkutan" },
    { name: "Lapor Sampah", icon: "FaExclamationTriangle", color: "from-green-600 to-green-400", dashboard: "LaporSampah" },
    { name: "Pilah Sampah", icon: "FaRecycle", color: "from-green-600 to-green-400", dashboard: "PilahSampah" },
    { name: "Pengangkutan", icon: "FaTruck", color: "from-green-600 to-green-400", dashboard: "Pengangkutan" },
    { name: "Bayar Tagihan", icon: "FaMoneyBillWave", color: "from-green-600 to-green-400", dashboard: "BayarTagihan" },
    { name: "Statistik Sampah", icon: "FaChartPie", color: "from-green-600 to-green-400", dashboard: "StatistikSampah" },
    { name: "Edukasi Sampah", icon: "FaLeaf", color: "from-green-600 to-green-400", dashboard: "EdukasiSampah" }
  ],
  quickActionData: {
    JadwalPengangkutan: [
      { date: "29 Mei 2025", time: "23:00 WIB", location: "Jl. Merdeka No. 10" },
      { date: "30 Mei 2025", time: "9:45 WIB", location: "Jl. Sudirman No. 5" }
    ],
    LaporSampah: [
      { id: "001", location: "J. Gl. Gatot Subroto", status: "Menunggu Konfirmasi" },
      { id: "002", location: "J. Thamrin", status: "Selesai" }
    ],
    PilahSampah: [
      { type: "Organik", weight: "5 kg", date: "28 Mei 2025" },
      { type: "Anorganik", weight: "3 kg", date: "27 Mei 2025" }
    ],
    Pengangkutan: [
      { id: "P001", date: "28 Mei 2025", status: "Selesai" },
      { id: "P002", date: "27 Mei 2025", status: "Dijadwalkan" }
    ],
    BayarTagihan: [
      { billId: "B001", amount: "Rp 50,000", dueDate: "31 Mei 2025" },
      { billId: "B002", amount: "Rp 75,000", dueDate: "30 Mei 2025" }
    ],
    StatistikSampah: [
      { month: "Mei 2025", organik: "20 kg", anorganik: "15 kg" },
      { month: "April 2025", organik: "18 kg", anorganik: "12 kg" }
    ],
    EdukasiSampah: [
      { title: "Cara Memilah Sampah", content: "Pelajari cara memisahkan sampah organik dan anorganik." },
      { title: "Daur Ulang 101", content: "Tips dasar untuk mendaur ulang plastik dan kertas." }
    ]
  },
  notifications: [
    { message: "Ada jadwal pengangkutan besok!", dashboard: "Notifications" },
    { message: "Pengaturan baru tersedia", dashboard: "Profile" }
  ]
};
