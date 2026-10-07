// export const categories = [
//     { id: 'cpu', name: 'CPU', icon: '◈', label: 'CPU', sub: 'Processors' },
//     { id: 'gpu', name: 'GPU / Graphics Card', icon: '▰', label: 'GPU', sub: 'Graphics cards' },
//     { id: 'motherboard', name: 'Motherboard', icon: '⌁', label: 'Boards', sub: 'Motherboards' },
//     { id: 'ram', name: 'RAM', icon: '▥', label: 'RAM', sub: 'Memory' },
//     { id: 'storage', name: 'SSD / HDD', icon: '▱', label: 'Storage', sub: 'SSDs & HDDs' },
//     { id: 'psu', name: 'PSU', icon: '⚡', label: 'Power', sub: 'Power supplies' },
//     { id: 'case', name: 'PC Case', icon: '▣', label: 'Cases', sub: 'PC cases' },
//     { id: 'cooler', name: 'CPU Cooler', icon: '✣', label: 'Cooling', sub: 'CPU coolers' },
//     { id: 'fans', name: 'Fans', icon: '❂', label: 'Airflow', sub: 'Case fans' },
//     { id: 'monitors', name: 'Monitors', icon: '▦', label: 'Setup', sub: 'Monitors' },
//     { id: 'accessories', name: 'Accessories', icon: '✧', label: 'Extras', sub: 'PC accessories' },
// ]
// export const icon = (id) => categories.find((c) => c.id === id)?.icon
// export const usd = (n) => '$' + n.toLocaleString('en-US')

// // Sample catalog. `c` = fields used by the PC Builder checks. Add `img: '/images/x.jpg'` to use a real photo.
// export const products = [
//     { id: 'cpu1', cat: 'cpu', name: 'Ryzen 5 7600X', price: 199, rating: 4.7, reviews: 412, spec: '6C / 12T · up to 5.3 GHz · AM5', c: { socket: 'AM5', tdp: 105 } },
//     { id: 'cpu2', cat: 'cpu', name: 'Core i5-14400F', price: 189, rating: 4.5, reviews: 268, spec: '10C / 16T · up to 4.7 GHz · LGA1700', c: { socket: 'LGA1700', tdp: 65 } },
//     { id: 'cpu3', cat: 'cpu', name: 'Ryzen 7 7800X3D', price: 349, badge: 'BEST SELLER', rating: 4.9, reviews: 1284, spec: '8C / 16T · 3D V-Cache · AM5', c: { socket: 'AM5', tdp: 120 } },
//     { id: 'gpu1', cat: 'gpu', name: 'RTX 4060 8G', price: 299, rating: 4.6, reviews: 530, spec: '8 GB GDDR6 · 1080p ready · 115 W', c: { length: 240, tdp: 115 } },
//     { id: 'gpu2', cat: 'gpu', name: 'RX 7800 XT 16G', price: 489, rating: 4.7, reviews: 344, spec: '16 GB GDDR6 · 1440p ready · 263 W', c: { length: 267, tdp: 263 } },
//     { id: 'gpu3', cat: 'gpu', name: 'RTX 4070 SUPER 12G', price: 599, badge: 'IN STOCK', rating: 4.8, reviews: 902, spec: '12 GB GDDR6X · DLSS 3 · 1440p ready', c: { length: 285, tdp: 220 } },
//     { id: 'mb1', cat: 'motherboard', name: 'B650 Gaming Plus WiFi', price: 199, rating: 4.6, reviews: 251, spec: 'AM5 · DDR5 · ATX · WiFi 6E', c: { socket: 'AM5', ddr: 'DDR5', form: 'ATX' } },
//     { id: 'mb2', cat: 'motherboard', name: 'B760M DS3H DDR4', price: 109, rating: 4.4, reviews: 189, spec: 'LGA1700 · DDR4 · Micro-ATX', c: { socket: 'LGA1700', ddr: 'DDR4', form: 'mATX' } },
//     { id: 'mb3', cat: 'motherboard', name: 'TUF Gaming B760-Plus', price: 189, rating: 4.6, reviews: 217, spec: 'LGA1700 · DDR5 · ATX', c: { socket: 'LGA1700', ddr: 'DDR5', form: 'ATX' } },
//     { id: 'ram1', cat: 'ram', name: 'Vengeance RGB 32GB', price: 109, badge: 'HOT DROP', rating: 4.8, reviews: 764, spec: 'DDR5-6000 · CL30 · 2 x 16 GB', c: { ddr: 'DDR5' } },
//     { id: 'ram2', cat: 'ram', name: 'Fury 16GB DDR4', price: 45, rating: 4.5, reviews: 398, spec: 'DDR4-3200 · CL16 · 2 x 8 GB', c: { ddr: 'DDR4' } },
//     { id: 'ssd1', cat: 'storage', name: '990 PRO 2TB NVMe', price: 159, badge: 'FAST SHIPPING', rating: 4.9, reviews: 1120, spec: '7,450 MB/s read · PCIe 4.0 · M.2', c: {} },
//     { id: 'ssd2', cat: 'storage', name: 'Barracuda 2TB HDD', price: 55, rating: 4.4, reviews: 640, spec: '7200 RPM · 3.5 inch · SATA', c: {} },
//     { id: 'psu1', cat: 'psu', name: 'RM750e 750W Gold', price: 109, rating: 4.8, reviews: 455, spec: '750 W · 80+ Gold · Fully modular', c: { watts: 750 } },
//     { id: 'psu2', cat: 'psu', name: 'MWE 550W Bronze', price: 55, rating: 4.3, reviews: 302, spec: '550 W · 80+ Bronze · Non-modular', c: { watts: 550 } },
//     { id: 'case1', cat: 'case', name: 'H5 Flow', price: 95, rating: 4.7, reviews: 388, spec: 'ATX mid tower · Mesh front · 2 fans', c: { form: ['ATX', 'mATX'], maxGpu: 365, maxCooler: 165 } },
//     { id: 'case2', cat: 'case', name: 'ICE-112', price: 49, rating: 4.3, reviews: 176, spec: 'Micro-ATX · Tempered glass · ARGB', c: { form: ['mATX'], maxGpu: 300, maxCooler: 150 } },
//     { id: 'cool1', cat: 'cooler', name: 'AK620', price: 65, rating: 4.8, reviews: 690, spec: 'Dual tower · 6 heat pipes · 160 mm tall', c: { sockets: ['AM5', 'LGA1700'], height: 160 } },
//     { id: 'cool2', cat: 'cooler', name: 'Hyper 212', price: 35, rating: 4.6, reviews: 812, spec: 'Single tower · 4 heat pipes · 158 mm tall', c: { sockets: ['AM5', 'LGA1700'], height: 158 } },
//     { id: 'fan1', cat: 'fans', name: 'P12 PWM (3 pack)', price: 25, rating: 4.8, reviews: 1502, spec: '120 mm · PWM · 3-pack', c: { size: '120 mm' } },
//     { id: 'fan2', cat: 'fans', name: 'UNI Fan SL120 (3 pack)', price: 70, rating: 4.7, reviews: 388, spec: '120 mm · ARGB · Daisy-chain', c: { size: '120 mm' } },
//     { id: 'mon1', cat: 'monitors', name: 'UltraGear 27" 1440p', price: 289, rating: 4.7, reviews: 512, spec: '27 inch · 165 Hz · IPS · 1 ms', c: {} },
//     { id: 'mon2', cat: 'monitors', name: 'Odyssey G3 24"', price: 149, rating: 4.5, reviews: 430, spec: '24 inch · 144 Hz · Full HD · 1 ms', c: {} },
//     { id: 'acc1', cat: 'accessories', name: 'K552 Mechanical Keyboard', price: 35, rating: 4.6, reviews: 950, spec: 'Mechanical · TKL · RGB', c: {} },
//     { id: 'acc2', cat: 'accessories', name: 'G304 Wireless Mouse', price: 40, rating: 4.7, reviews: 1330, spec: 'Wireless · 12,000 DPI · 99 g', c: {} },
// ]








// =====================================================
// CYBERFLIX SYSTEMS LLP
// PRODUCTS DATA
// =====================================================

// =====================================================
// CATEGORIES
// =====================================================

export const categories = [
    {
        id: 'cpu',
        name: 'CPU',
        icon: '◈',
        label: 'CPU',
        sub: 'Processors'
    },

    {
        id: 'gpu',
        name: 'GPU / Graphics Card',
        icon: '▰',
        label: 'GPU',
        sub: 'Graphics cards'
    },

    {
        id: 'motherboard',
        name: 'Motherboard',
        icon: '⌁',
        label: 'Boards',
        sub: 'Motherboards'
    },

    {
        id: 'ram',
        name: 'RAM',
        icon: '▥',
        label: 'RAM',
        sub: 'Memory'
    },

    {
        id: 'storage',
        name: 'SSD / HDD',
        icon: '▱',
        label: 'Storage',
        sub: 'SSDs & HDDs'
    },

    {
        id: 'psu',
        name: 'PSU',
        icon: '⚡',
        label: 'Power',
        sub: 'Power supplies'
    },

    {
        id: 'case',
        name: 'PC Case',
        icon: '▣',
        label: 'Cases',
        sub: 'PC cases'
    },

    {
        id: 'cooler',
        name: 'CPU Cooler',
        icon: '✣',
        label: 'Cooling',
        sub: 'CPU coolers'
    },

    {
        id: 'fans',
        name: 'Fans',
        icon: '❂',
        label: 'Airflow',
        sub: 'Case fans'
    },

    {
        id: 'monitors',
        name: 'Monitors',
        icon: '▦',
        label: 'Setup',
        sub: 'Monitors'
    },

    {
        id: 'accessories',
        name: 'Accessories',
        icon: '✧',
        label: 'Extras',
        sub: 'PC accessories'
    }
]

// =====================================================
// CATEGORY ICON
// =====================================================

export const icon = (id) =>
    categories.find(
        (category) => category.id === id
    )?.icon

// =====================================================
// PRICE FORMAT
// =====================================================

export const formatPrice = (amount) =>
    `₹${Number(amount || 0).toLocaleString('en-IN')}`

// =====================================================
// PRODUCTS
// =====================================================

export const products = [

    // =================================================
    // CPU
    // =================================================

    {
        id: 'cpu1',
        cat: 'cpu',
        name: 'Ryzen 5 7600X',
        price: 199,
        rating: 4.7,
        reviews: 412,
        spec: '6C / 12T · up to 5.3 GHz · AM5',

        c: {
            socket: 'AM5',
            tdp: 105
        }
    },

    {
        id: 'cpu2',
        cat: 'cpu',
        name: 'Core i5-14400F',
        price: 189,
        rating: 4.5,
        reviews: 268,
        spec: '10C / 16T · up to 4.7 GHz · LGA1700',

        c: {
            socket: 'LGA1700',
            tdp: 65
        }
    },

    {
        id: 'cpu3',
        cat: 'cpu',
        name: 'Ryzen 7 7800X3D',
        price: 349,
        badge: 'BEST SELLER',
        rating: 4.9,
        reviews: 1284,
        spec: '8C / 16T · 3D V-Cache · AM5',

        c: {
            socket: 'AM5',
            tdp: 120
        }
    },

    // =================================================
    // GPU
    // =================================================

    {
        id: 'gpu1',
        cat: 'gpu',
        name: 'RTX 4060 8G',
        price: 299,
        rating: 4.6,
        reviews: 530,
        spec: '8 GB GDDR6 · 1080p ready · 115 W',

        c: {
            length: 240,
            tdp: 115
        }
    },

    {
        id: 'gpu2',
        cat: 'gpu',
        name: 'RX 7800 XT 16G',
        price: 489,
        rating: 4.7,
        reviews: 344,
        spec: '16 GB GDDR6 · 1440p ready · 263 W',

        c: {
            length: 267,
            tdp: 263
        }
    },

    {
        id: 'gpu3',
        cat: 'gpu',
        name: 'RTX 4070 SUPER 12G',
        price: 599,
        badge: 'IN STOCK',
        rating: 4.8,
        reviews: 902,
        spec: '12 GB GDDR6X · DLSS 3 · 1440p ready',

        c: {
            length: 285,
            tdp: 220
        }
    },

    // =================================================
    // MOTHERBOARD
    // =================================================

    {
        id: 'mb1',
        cat: 'motherboard',
        name: 'B650 Gaming Plus WiFi',
        price: 199,
        rating: 4.6,
        reviews: 251,
        spec: 'AM5 · DDR5 · ATX · WiFi 6E',

        c: {
            socket: 'AM5',
            ddr: 'DDR5',
            form: 'ATX'
        }
    },

    {
        id: 'mb2',
        cat: 'motherboard',
        name: 'B760M DS3H DDR4',
        price: 109,
        rating: 4.4,
        reviews: 189,
        spec: 'LGA1700 · DDR4 · Micro-ATX',

        c: {
            socket: 'LGA1700',
            ddr: 'DDR4',
            form: 'mATX'
        }
    },

    {
        id: 'mb3',
        cat: 'motherboard',
        name: 'TUF Gaming B760-Plus',
        price: 189,
        rating: 4.6,
        reviews: 217,
        spec: 'LGA1700 · DDR5 · ATX',

        c: {
            socket: 'LGA1700',
            ddr: 'DDR5',
            form: 'ATX'
        }
    },

    // =================================================
    // RAM
    // =================================================

    {
        id: 'ram1',
        cat: 'ram',
        name: 'Vengeance RGB 32GB',
        price: 109,
        badge: 'HOT DROP',
        rating: 4.8,
        reviews: 764,
        spec: 'DDR5-6000 · CL30 · 2 x 16 GB',

        c: {
            ddr: 'DDR5'
        }
    },

    {
        id: 'ram2',
        cat: 'ram',
        name: 'Fury 16GB DDR4',
        price: 45,
        rating: 4.5,
        reviews: 398,
        spec: 'DDR4-3200 · CL16 · 2 x 8 GB',

        c: {
            ddr: 'DDR4'
        }
    },

    // =================================================
    // SSD / HDD
    // =================================================

    {
        id: 'ssd1',
        cat: 'storage',
        name: '990 PRO 2TB NVMe',
        price: 159,
        badge: 'FAST SHIPPING',
        rating: 4.9,
        reviews: 1120,
        spec: '7,450 MB/s read · PCIe 4.0 · M.2',

        c: {}
    },

    {
        id: 'ssd2',
        cat: 'storage',
        name: 'Barracuda 2TB HDD',
        price: 55,
        rating: 4.4,
        reviews: 640,
        spec: '7200 RPM · 3.5 inch · SATA',

        c: {}
    },

    // =================================================
    // PSU
    // =================================================

    {
        id: 'psu1',
        cat: 'psu',
        name: 'RM750e 750W Gold',
        price: 109,
        rating: 4.8,
        reviews: 455,
        spec: '750 W · 80+ Gold · Fully modular',

        c: {
            watts: 750
        }
    },

    {
        id: 'psu2',
        cat: 'psu',
        name: 'MWE 550W Bronze',
        price: 55,
        rating: 4.3,
        reviews: 302,
        spec: '550 W · 80+ Bronze · Non-modular',

        c: {
            watts: 550
        }
    },

    // =================================================
    // PC CASE
    // =================================================

    {
        id: 'case1',
        cat: 'case',
        name: 'H5 Flow',
        price: 95,
        rating: 4.7,
        reviews: 388,
        spec: 'ATX mid tower · Mesh front · 2 fans',

        c: {
            form: ['ATX', 'mATX'],
            maxGpu: 365,
            maxCooler: 165
        }
    },

    {
        id: 'case2',
        cat: 'case',
        name: 'ICE-112',
        price: 49,
        rating: 4.3,
        reviews: 176,
        spec: 'Micro-ATX · Tempered glass · ARGB',

        c: {
            form: ['mATX'],
            maxGpu: 300,
            maxCooler: 150
        }
    },

    // =================================================
    // CPU COOLER
    // =================================================

    {
        id: 'cool1',
        cat: 'cooler',
        name: 'AK620',
        price: 65,
        rating: 4.8,
        reviews: 690,
        spec: 'Dual tower · 6 heat pipes · 160 mm tall',

        c: {
            sockets: [
                'AM5',
                'LGA1700'
            ],
            height: 160
        }
    },

    {
        id: 'cool2',
        cat: 'cooler',
        name: 'Hyper 212',
        price: 35,
        rating: 4.6,
        reviews: 812,
        spec: 'Single tower · 4 heat pipes · 158 mm tall',

        c: {
            sockets: [
                'AM5',
                'LGA1700'
            ],
            height: 158
        }
    },

    // =================================================
    // FANS
    // =================================================

    {
        id: 'fan1',
        cat: 'fans',
        name: 'P12 PWM (3 pack)',
        price: 25,
        rating: 4.8,
        reviews: 1502,
        spec: '120 mm · PWM · 3-pack',

        c: {
            size: '120 mm'
        }
    },

    {
        id: 'fan2',
        cat: 'fans',
        name: 'UNI Fan SL120 (3 pack)',
        price: 70,
        rating: 4.7,
        reviews: 388,
        spec: '120 mm · ARGB · Daisy-chain',

        c: {
            size: '120 mm'
        }
    },

    // =================================================
    // MONITORS
    // =================================================

    {
        id: 'mon1',
        cat: 'monitors',
        name: 'UltraGear 27" 1440p',
        price: 289,
        rating: 4.7,
        reviews: 512,
        spec: '27 inch · 165 Hz · IPS · 1 ms',

        c: {}
    },

    {
        id: 'mon2',
        cat: 'monitors',
        name: 'Odyssey G3 24"',
        price: 149,
        rating: 4.5,
        reviews: 430,
        spec: '24 inch · 144 Hz · Full HD · 1 ms',

        c: {}
    },

    // =================================================
    // ACCESSORIES
    // =================================================

    {
        id: 'acc1',
        cat: 'accessories',
        name: 'K552 Mechanical Keyboard',
        price: 35,
        rating: 4.6,
        reviews: 950,
        spec: 'Mechanical · TKL · RGB',

        c: {}
    },

    {
        id: 'acc2',
        cat: 'accessories',
        name: 'G304 Wireless Mouse',
        price: 40,
        rating: 4.7,
        reviews: 1330,
        spec: 'Wireless · 12,000 DPI · 99 g',

        c: {}
    }
]