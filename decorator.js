/**
 * محرك زخرفة الأسماء والنصوص الفوري (Decorator Engine)
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const clearBtn = document.getElementById('clearBtn');
    const resultsGrid = document.getElementById('resultsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentFilter = 'all';
    let defaultPreview = 'البرنس Legend';

    // 1. خرائط حروف اليونيكود الإنجليزية (Unicode Alphabets)
    const unicodeFonts = {
        bold: {
            map: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭0123456789",
            category: 'english',
            name: 'خط عريض (Bold)'
        },
        italic: {
            map: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡0123456789",
            category: 'english',
            name: 'خط مائل (Italic)'
        },
        gothic: {
            map: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ0123456789",
            category: 'english',
            name: 'قوطي قديم (Gothic)'
        },
        doubleStruck: {
            map: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
            category: 'english',
            name: 'مزدوج الحواف (Outline)'
        },
        circled: {
            map: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ0①②③④⑤⑥⑦⑧⑨",
            category: 'english',
            name: 'دائري (Circled)'
        },
        smallCaps: {
            map: "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789",
            category: 'english',
            name: 'حروف مصغرة (Small Caps)'
        }
    };

    const normalChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    function convertToUnicode(text, targetMap) {
        let result = "";
        for (let char of text) {
            const index = normalChars.indexOf(char);
            if (index !== -1) {
                // التعامل مع تشفير الرموز البرمجية ثنائية الخانة في UTF-16
                const mappedChar = Array.from(targetMap)[index] || char;
                result += mappedChar;
            } else {
                result += char;
            }
        }
        return result;
    }

    // 2. إطارات وزخارف الألعاب والفخامة (العامة التي تقبل العربي والإنجليزي)
    const decoratorsList = [
        // ألعاب - ببجي وفري فاير
        { format: (t) => `꧁༺ ${t} ༻꧂`, category: 'gaming' },
        { format: (t) => `亗『 ${t} 』亗`, category: 'gaming' },
        { format: (t) => `⚔️ ${t} ⚔️`, category: 'gaming' },
        { format: (t) => `♛ ${t} ♛`, category: 'gaming' },
        { format: (t) => `ズ ${t} ★`, category: 'gaming' },
        { format: (t) => `꧁༒☬ ${t} ☬༒꧂`, category: 'gaming' },
        { format: (t) => `★彡 [ ${t} ] 彡★`, category: 'gaming' },
        { format: (t) => `個 ${t} ⚡`, category: 'gaming' },
        { format: (t) => `연 ${t} 气`, category: 'gaming' },
        { format: (t) => `帝『 ${t} 』帝`, category: 'gaming' },

        // فخمة ومميزة (Aesthetic)
        { format: (t) => `✧ ${t} ✧`, category: 'aesthetic' },
        { format: (t) => `✿ ${t} ✿`, category: 'aesthetic' },
        { format: (t) => `╰⊱♥ ${t} ♥⊱╮`, category: 'aesthetic' },
        { format: (t) => `⊰ ${t} ⊱`, category: 'aesthetic' },
        { format: (t) => `『 ${t} 』`, category: 'aesthetic' },
        { format: (t) => `« ${t} »`, category: 'aesthetic' },
        { format: (t) => `░ ${t} ░`, category: 'aesthetic' },
        { format: (t) => `•´¯\`•. ${t} .•´¯\`•`, category: 'aesthetic' },
        { format: (t) => `°•.¸♡ ${t} ♡¸.•°`, category: 'aesthetic' },
        { format: (t) => `(★) ${t} (★)`, category: 'aesthetic' },

        // تشكيل وحركات عربي (Arabic Tashkeel & Tatweel)
        { 
            format: (t) => decorateArabicHarakat(t), 
            category: 'arabic' 
        },
        { 
            format: (t) => decorateArabicTatweel(t), 
            category: 'arabic' 
        },
        { 
            format: (t) => decorateArabicOrnate(t), 
            category: 'arabic' 
        },
        { 
            format: (t) => decorateArabicDotted(t), 
            category: 'arabic' 
        }
    ];

    // دوال الزخرفة العربية
    function decorateArabicHarakat(text) {
        const harakat = ['َ', 'ُ', 'ِ', 'ْ', 'ّ', 'ً', 'ٌ', 'ٍ', 'ٰ'];
        return text.split('').map(c => {
            if (/[\u0600-\u06FF]/.test(c) && c !== ' ') {
                const randomHraka = harakat[Math.floor(Math.random() * harakat.length)];
                return c + randomHraka;
            }
            return c;
        }).join('');
    }

    function decorateArabicTatweel(text) {
        return text.split('').map(c => {
            if (/[\u0600-\u06FF]/.test(c) && c !== ' ' && c !== 'ا' && c !== 'د' && c !== 'ر' && c !== 'ز' && c !== 'و') {
                return c + 'ـ';
            }
            return c;
        }).join('');
    }

    function decorateArabicOrnate(text) {
        return `«۩๑ ${text} ๑۩»`;
    }

    function decorateArabicDotted(text) {
        return text.split('').join('・');
    }

    // توليد كل التصاميم
    function generateDecorations(rawText) {
        const text = rawText.trim() === '' ? defaultPreview : rawText;
        const list = [];

        // إضافة الخطوط الإنجليزية أولاً
        for (let key in unicodeFonts) {
            const font = unicodeFonts[key];
            list.push({
                text: convertToUnicode(text, font.map),
                category: font.category
            });
        }

        // إضافة الزخارف والإطارات
        decoratorsList.forEach(item => {
            list.push({
                text: item.format(text),
                category: item.category
            });
        });

        return list;
    }

    // رسم البطاقات على الصفحة
    function renderResults() {
        const query = inputText.value;
        const decorations = generateDecorations(query);
        resultsGrid.innerHTML = '';

        decorations.forEach(item => {
            if (currentFilter !== 'all' && item.category !== currentFilter) {
                return;
            }

            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <span class="decorated-text">${escapeHtml(item.text)}</span>
                <button class="btn-copy">نسخ</button>
            `;

            // حدث النسخ عند النقر
            card.addEventListener('click', () => copyToClipboard(item.text, card));

            resultsGrid.appendChild(card);
        });
    }

    // نسخ إلى الحافظة
    async function copyToClipboard(text, cardElement) {
        try {
            await navigator.clipboard.writeText(text);
            markAsCopied(cardElement);
        } catch (err) {
            // حل بديل للمتصفحات القديمة
            const temp = document.createElement('textarea');
            temp.value = text;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            markAsCopied(cardElement);
        }
    }

    function markAsCopied(card) {
        card.classList.add('copied');
        const btn = card.querySelector('.btn-copy');
        btn.textContent = '✓ تم النسخ';

        setTimeout(() => {
            card.classList.remove('copied');
            btn.textContent = 'نسخ';
        }, 2000);
    }

    // حماية ضد حقن HTML
    function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function (s) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '`': '&#x60;',
                '=': '&#x3D;'
            }[s];
        });
    }

    // تفريغ النص
    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        inputText.focus();
        renderResults();
    });

    // استماع للإدخال الفوري
    inputText.addEventListener('input', renderResults);

    // تبديل الفلاتر
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderResults();
        });
    });

    // التشغيل المبدئي
    renderResults();
});
