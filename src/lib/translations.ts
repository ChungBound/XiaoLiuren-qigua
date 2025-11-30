
export const TRANSLATIONS = {
    zh: {
        title: '小六壬排盘',
        methods: {
            date: '时间起卦',
            number: '数字起卦',
            text: '文字/柳叶起卦',
            event: '依事起卦',
        },
        events: {
            marriage: '婚姻/杂事',
            wealth: '求财/经商',
            health: '疾病/健康',
            legal: '官司/诉讼',
            travel: '出行/旅行',
        },
        palaces: {
            1: {
                name: '大安',
                meaning: '大安事事昌，求财在坤方，失物去不远，宅舍保安康。',
                keywords: ['吉祥', '安稳', '顺利'],
                detail: '大安为最吉之卦，代表事情稳定、平安、顺利。求财、求官、出行皆吉。',
            },
            2: {
                name: '留连',
                meaning: '留连事难成，求谋日未明，官事只宜缓，去者未回程。',
                keywords: ['拖延', '阻碍', '纠缠'],
                detail: '留连代表事情拖延、不顺、有阻碍。凡事宜缓不宜急，需要耐心等待。',
            },
            3: {
                name: '速喜',
                meaning: '速喜喜来临，求财向南行，失物申未午，逢人路上寻。',
                keywords: ['喜庆', '快速', '吉利'],
                detail: '速喜代表喜事临门，事情会有快速的进展和好的结果。',
            },
            4: {
                name: '赤口',
                meaning: '赤口主口舌，官非切要防，失物速速讨，行人有惊慌。',
                keywords: ['口舌', '争执', '官非'],
                detail: '赤口代表口舌是非、争执、官司。需要小心言行，避免冲突。',
            },
            5: {
                name: '小吉',
                meaning: '小吉最吉昌，路上好商量，阴人来报喜，失物在坤方。',
                keywords: ['吉利', '和合', '顺利'],
                detail: '小吉代表吉利、和合、顺利。虽然不如大安宏大，但也是非常好的卦象。',
            },
            6: {
                name: '空亡',
                meaning: '空亡事不长，阴人小乖张，求财无利益，行人有灾殃。',
                keywords: ['空虚', '无果', '不吉'],
                detail: '空亡代表落空、无结果、不吉。凡事难成，需要谨慎小心。',
            },
        },
        ui: {
            calculate: '立即起卦',
            calculating: '起卦运算中...',
            step1: '初爻定位',
            step2: '二爻推进',
            step3: '三爻定局',
            result: '卦象结果',
            input_numbers: '请输入三个数字',
            input_date: '选择日期时间',
            input_text: '输入文字 (如: 柳叶)',
            select_event: '选择所求之事',
            current_time: '当前时间',
            back: '返回',
            history: '历史记录',
        }
    },
    en: {
        title: 'Xiao Liu Ren Divination',
        methods: {
            date: 'Time Divination',
            number: 'Number Divination',
            text: 'Text/Object Divination',
            event: 'Event Divination',
        },
        events: {
            marriage: 'Marriage/Misc',
            wealth: 'Wealth/Business',
            health: 'Health/Sickness',
            legal: 'Legal/Disputes',
            travel: 'Travel/Moving',
        },
        palaces: {
            1: {
                name: 'Da An (Great Peace)',
                meaning: 'Great Peace brings prosperity in all things. Seek wealth in the Southwest. Lost items are not far. The home is safe and healthy.',
                keywords: ['Auspicious', 'Stable', 'Smooth'],
                detail: 'Da An is the most auspicious sign, representing stability, peace, and smoothness. It is good for seeking wealth, career, and travel.',
            },
            2: {
                name: 'Liu Lian (Lingering)',
                meaning: 'Lingering makes things difficult to achieve. Plans are unclear. Legal matters should be delayed. Those who left have not returned.',
                keywords: ['Delay', 'Obstacle', 'Entanglement'],
                detail: 'Liu Lian represents delay, difficulty, and obstacles. Things should be taken slowly, not rushed. Patience is required.',
            },
            3: {
                name: 'Su Xi (Swift Joy)',
                meaning: 'Swift Joy brings happiness. Seek wealth in the South. Lost items are in the South/Southwest. Meet people on the way.',
                keywords: ['Joy', 'Fast', 'Lucky'],
                detail: 'Su Xi represents approaching joy. Things will progress quickly and have good results.',
            },
            4: {
                name: 'Chi Kou (Red Mouth)',
                meaning: 'Red Mouth brings disputes. Beware of official troubles. Seek lost items quickly. Travelers face panic.',
                keywords: ['Dispute', 'Conflict', 'Legal Issue'],
                detail: 'Chi Kou represents verbal disputes, conflicts, and legal issues. Be careful with words and avoid conflicts.',
            },
            5: {
                name: 'Xiao Ji (Minor Luck)',
                meaning: 'Minor Luck is very auspicious. Good discussions on the road. Women bring good news. Lost items are in the Southwest.',
                keywords: ['Lucky', 'Harmony', 'Smooth'],
                detail: 'Xiao Ji represents luck, harmony, and smoothness. Although not as grand as Da An, it is still a very good sign.',
            },
            6: {
                name: 'Kong Wang (Void)',
                meaning: 'Void means things won\'t last. Villains are tricky. No profit in seeking wealth. Travelers face disaster.',
                keywords: ['Empty', 'No Result', 'Inauspicious'],
                detail: 'Kong Wang represents emptiness, no result, and bad luck. Things are difficult to achieve. Caution is advised.',
            },
        },
        ui: {
            calculate: 'Divinate',
            calculating: 'Calculating...',
            step1: 'Step 1: Initial',
            step2: 'Step 2: Progress',
            step3: 'Step 3: Final',
            result: 'Result',
            input_numbers: 'Enter 3 Numbers',
            input_date: 'Select Date & Time',
            input_text: 'Enter Text (e.g. Willow)',
            select_event: 'Select Event Type',
            current_time: 'Current Time',
            back: 'Back',
            history: 'History',
        }
    }
};
