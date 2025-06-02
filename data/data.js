const usersData = [
    {
        userId: 'U001',
        userName: 'Budi Santoso',
        accountNumber: '1234-567890',
        balance: 'Rp 15,000,000',
        status: 'Aktif',
        email: 'budi.santoso@example.com',
        phone: '+62812345678',
        registrationDate: '2023-05-01',
        lastLogin: '2025-06-02 15:30 WIB',
        deviceInfo: 'Android 13 (App v1.2.3)',
        notifications: [
            { message: 'Sensor S001 aktif', dashboard: 'sensors', date: '2025-06-02 15:30 WIB' },
            { message: 'Laporan sampah diterima', dashboard: 'waste_reports', date: '2025-06-02 15:15 WIB' },
        ],
        sensors: [
            { id: 'S001', type: 'Temperature', status: 'Active', lastReading: '2025-06-02 15:30 WIB', data: { temperature: 29.2, humidity: 65, capacity: 22 } },
            { id: 'S002', type: 'Humidity', status: 'Active', lastReading: '2025-06-02 15:25 WIB', data: { temperature: 30.0, humidity: 64, capacity: 25 } },
        ],
        transactions: [
            { id: 'T001', description: 'Transfer ke Ani', amount: 'Rp 1,500,000', date: '2025-06-02 15:00 WIB', category: 'Transfer', status: 'Completed', type: 'out' },
            { id: 'T002', description: 'Penerimaan gaji', amount: 'Rp 5,000,000', date: '2025-06-02 10:00 WIB', category: 'Deposit', status: 'Completed', type: 'in' },
        ],
        wasteReports: [
            { id: 'WR001', type: 'Organic', location: 'Jakarta Selatan', status: 'Pending', date: '2025-06-02' },
        ],
        schedules: [
            { id: 'S001', date: '2025-06-03', time: '08:00 WIB', location: 'Jakarta Selatan', priority: 'High' },
        ],
        activities: [
            { description: 'Login ke aplikasi', category: 'Login', timestamp: '2025-06-02 15:30 WIB', ip: '192.168.1.1' },
            { description: 'Mengirim laporan sampah', category: 'Report', timestamp: '2025-06-02 15:15 WIB', ip: '192.168.1.1' },
        ],
    },
    {
        userId: 'U002',
        userName: 'Ani Wijaya',
        accountNumber: '9876-543210',
        balance: 'Rp 7,500,000',
        status: 'Aktif',
        email: 'ani.wijaya@example.com',
        phone: '+62809876543',
        registrationDate: '2023-06-15',
        lastLogin: '2025-06-02 15:25 WIB',
        deviceInfo: 'iOS 16 (App v1.2.3)',
        notifications: [
            { message: 'Transaksi masuk Rp 1,500,000', dashboard: 'transactions', date: '2025-06-02 15:00 WIB' },
        ],
        sensors: [
            { id: 'S003', type: 'Capacity', status: 'Active', lastReading: '2025-06-02 15:25 WIB', data: { temperature: 28.8, humidity: 63, capacity: 20 } },
        ],
        transactions: [
            { id: 'T003', description: 'Penerimaan dari Budi', amount: 'Rp 1,500,000', date: '2025-06-02 15:00 WIB', category: 'Transfer', status: 'Completed', type: 'in' },
        ],
        wasteReports: [
            { id: 'WR002', type: 'Inorganic', location: 'Jakarta Utara', status: 'Processing', date: '2025-06-02' },
        ],
        schedules: [
            { id: 'S002', date: '2025-06-04', time: '09:00 WIB', location: 'Jakarta Utara', priority: 'Medium' },
        ],
        activities: [
            { description: 'Menerima transaksi', category: 'Transaction', timestamp: '2025-06-02 15:00 WIB', ip: '192.168.1.2' },
        ],
    },
    {
        userId: 'U003',
        userName: 'Citra Lestari',
        accountNumber: '4567-890123',
        balance: 'Rp 20,000,000',
        status: 'Aktif',
        email: 'citra.lestari@example.com',
        phone: '+62811223344',
        registrationDate: '2023-07-20',
        lastLogin: '2025-06-02 15:20 WIB',
        deviceInfo: 'Android 12 (App v1.2.3)',
        notifications: [
            { message: 'Pembayaran tagihan', dashboard: 'transactions', date: '2025-06-02 15:10 WIB' },
        ],
        sensors: [
            { id: 'S004', type: 'Temperature', status: 'Inactive', lastReading: '2025-06-02 15:20 WIB', data: { temperature: 28.5, humidity: 62, capacity: 19 } },
        ],
        transactions: [
            { id: 'T004', description: 'Pembayaran tagihan', amount: 'Rp 800,000', date: '2025-06-02 15:10 WIB', category: 'Payment', status: 'Completed', type: 'out' },
        ],
        wasteReports: [
            { id: 'WR003', type: 'Organic', location: 'Jakarta Barat', status: 'Completed', date: '2025-06-02' },
        ],
        schedules: [
            { id: 'S003', date: '2025-06-05', time: '10:00 WIB', location: 'Jakarta Barat', priority: 'Low' },
        ],
        activities: [
            { description: 'Melakukan pembayaran', category: 'Transaction', timestamp: '2025-06-02 15:10 WIB', ip: '192.168.1.3' },
        ],
    },
    {
        userId: 'U004',
        userName: 'Dewi Sartika',
        accountNumber: '7890-123456',
        balance: 'Rp 10,000,000',
        status: 'Nonaktif',
        email: 'dewi.sartika@example.com',
        phone: '+62813456789',
        registrationDate: '2023-08-10',
        lastLogin: '2025-06-01 09:00 WIB',
        deviceInfo: 'iOS 15 (App v1.2.2)',
        notifications: [],
        sensors: [],
        transactions: [
            { id: 'T005', description: 'Transfer ke Budi', amount: 'Rp 500,000', date: '2025-06-01 08:30 WIB', category: 'Transfer', status: 'Completed', type: 'out' },
        ],
        wasteReports: [],
        schedules: [],
        activities: [
            { description: 'Login ke aplikasi', category: 'Login', timestamp: '2025-06-01 09:00 WIB', ip: '192.168.1.4' },
        ],
    },
    {
        userId: 'U005',
        userName: 'Eko Prasetyo',
        accountNumber: '2345-678901',
        balance: 'Rp 12,500,000',
        status: 'Aktif',
        email: 'eko.prasetyo@example.com',
        phone: '+62815678901',
        registrationDate: '2023-09-05',
        lastLogin: '2025-06-02 15:35 WIB',
        deviceInfo: 'Android 13 (App v1.2.3)',
        notifications: [
            { message: 'Sensor S005 aktif', dashboard: 'sensors', date: '2025-06-02 15:35 WIB' },
        ],
        sensors: [
            { id: 'S005', type: 'Humidity', status: 'Active', lastReading: '2025-06-02 15:35 WIB', data: { temperature: 29.0, humidity: 66, capacity: 21 } },
        ],
        transactions: [
            { id: 'T006', description: 'Penerimaan dari Citra', amount: 'Rp 1,000,000', date: '2025-06-02 15:20 WIB', category: 'Transfer', status: 'Completed', type: 'in' },
        ],
        wasteReports: [
            { id: 'WR004', type: 'Inorganic', location: 'Jakarta Timur', status: 'Pending', date: '2025-06-02' },
        ],
        schedules: [
            { id: 'S004', date: '2025-06-06', time: '11:00 WIB', location: 'Jakarta Timur', priority: 'High' },
        ],
        activities: [
            { description: 'Mengirim laporan sampah', category: 'Report', timestamp: '2025-06-02 15:35 WIB', ip: '192.168.1.5' },
        ],
    },
];

const damData = [
    {
        id: 'D001',
        location: 'Jakarta Selatan',
        waterLevel: 3.5,
        flowRate: 120,
        maxCapacity: 10.0,
        status: 'Normal',
        lastUpdated: '2025-06-02 15:30 WIB',
    },
    {
        id: 'D002',
        location: 'Jakarta Utara',
        waterLevel: 4.2,
        flowRate: 150,
        maxCapacity: 8.0,
        status: 'Warning',
        lastUpdated: '2025-06-02 15:25 WIB',
    },
    {
        id: 'D003',
        location: 'Jakarta Barat',
        waterLevel: 5.0,
        flowRate: 180,
        maxCapacity: 7.0,
        status: 'Critical',
        lastUpdated: '2025-06-02 15:20 WIB',
    },
    {
        id: 'D004',
        location: 'Jakarta Timur',
        waterLevel: 3.0,
        flowRate: 100,
        maxCapacity: 9.0,
        status: 'Normal',
        lastUpdated: '2025-06-02 15:35 WIB',
    },
];