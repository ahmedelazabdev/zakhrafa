/**
 * محرك الزخرفة الشامل فائق الأداء (High-Speed Decoration Engine)
 * يتضمن أكثر من 50 نمطاً حصرياً
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const clearBtn = document.getElementById('clearBtn');
    const resultsGrid = document.getElementById('resultsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cardTemplate = document.getElementById('cardTemplate');

    let currentFilter = 'all';
    let animationFrameId = null;

    // 1. مصفوفة خطوط اليونيكود الإنجليزية (Fonts)
    const englishFonts = [
        { name: "عريض حديث", category: "english", map: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭0123456789" },
        { name: "عريض كلاسيكي", category: "english", map: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙0123456789" },
        { name: "مائل حديث", category: "english", map: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡0123456789" },
        { name: "مائل كلاسيكي", category: "english", map: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍0123456789" },
        { name: "مخطوط Cursive", category: "english", map: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩0123456789" },
        { name: "قوطي ملكي", category: "english", map: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789" },
        { name: "قوطي عريض", category: "english", map: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟0123456789" },
        { name: "مزدوج الحواف", category: "english", map: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡" },
        { name: "دائري مفرغ", category: "english", map: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ0①②③④⑤⑥⑦⑧⑨" },
        { name: "مربعات سوداء", category: "english", map: "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789" },
        { name: "حروف مصغرة", category: "english", map: "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789" },
        { name: "متباعد عريض", category: "english", map: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ０１２３４５６７８９" }
    ];

    const baseChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    function mapToUnicode(str, targetMap) {
        let out = "";
        const mapArray = Array.from(targetMap);
        for (let char of str) {
            const idx = baseChars.indexOf(char);
            out += (idx !== -1 && mapArray[idx]) ? mapArray[idx] : char;
        }
        return out;
    }

    // 2. مصفوفة الزخارف العامة والألعاب والفخامة
    const patterns = [
        // ألعاب - ببجي وفري فاير
        { format: t => `꧁༺ ${t} ༻꧂`, category: "gaming" },
        { format: t => `亗『 ${t} 』亗`, category: "gaming" },
        { format: t => `⚔️ ${t} ⚔️`, category: "gaming" },
        { format: t => `♛ ${t} ♛`, category: "gaming" },
        { format: t => `ズ ${t} ★`, category: "gaming" },
        { format: t => `꧁༒☬ ${t} ☬༒꧂`, category: "gaming" },
        { format: t => `★彡 [ ${t} ] 彡★`, category: "gaming" },
        { format: t => `個『 ${t} 』⚡`, category: "gaming" },
        { format: t => `연 ${t} 气`, category: "gaming" },
        { format: t => `帝 ${t} 帝`, category: "gaming" },
        { format: t => `〆 ${t} 〆`, category: "gaming" },
        { format: t => `🎯 『 ${t} 』 🎯`, category: "gaming" },
        { format: t => `🦅 『 ${t} 』 🦅`, category: "gaming" },
        { format: t => `🐲 ${t} 🐲`, category: "gaming" },

        // عربي - تشكيل ومد وإطارات تراثية
        { format: t => decorateArabicTatweel(t), category: "arabic" },
        { format: t => decorateArabicHarakat(t), category: "arabic" },
        { format: t => `«۩๑ ${t} ๑۩»`, category: "arabic" },
        { format: t => `﴿ ${t} ﴾`, category: "arabic" },
        { format: t => `⚜️ ${t} ⚜️`, category: "arabic" },
        { format: t => decorateArabicSpaced(t), category: "arabic" },
        { format: t => `☾ ${t} ☽`, category: "arabic" },

        // فخامة وإطارات Aesthetics
        { format: t => `✧･ﾟ: * ${t} *:･ﾟ✧`, category: "aesthetic" },
        { format: t => `✿ ${t} ✿`, category: "aesthetic" },
        { format: t => `╰⊱♥ ${t} ♥⊱╮`, category: "aesthetic" },
        { format: t => `『 ${t} 』`, category: "aesthetic" },
        { format: t => `« ${t} »`, category: "aesthetic" },
        { format: t => `░ ${t} ░`, category: "aesthetic" },
        { format: t => `•´¯\`•. ${t} .•´¯\`•`, category: "aesthetic" },
        { format: t => `°•.¸♡ ${t} ♡¸.•°`, category: "aesthetic" },
        { format: t => `(★) ${t} (★)`, category: "aesthetic" },
        { format: t => `💎 ${t} 💎`, category: "aesthetic" },

        // رموز نادرة ومميزة
        { format: t => `〚 ${t} 〛`, category: "symbols" },
        { format: t => `【 ${t} 】`, category: "symbols" },
        { format: t => `〖 ${t} 〗`, category: "symbols" },
        { format: t => `❖ ${t} ❖`, category: "symbols" },
        { format: t => `⚡ ${t} ⚡`, category: "symbols" },
        { format: t => `☬ ${t} ☬`, category: "symbols" }
    ];

    // دوال المعالجة العربية
    function decorateArabicTatweel(str) {
        return str.split('').map(c => (/[\u0600-\u06FF]/.test(c) && !' ادرزوء'.includes(c)) ? c + 'ـ' : c).join('');
    }

    function decorateArabicHarakat(str) {
        const marks = ['َ', 'ُ', 'ِ', 'ْ', 'ّ', 'ً', 'ٍ', 'ٰ'];
        return str.split('').map(c => {
            if (/[\u0600-\u06FF]/.test(c) && c !== ' ') {
                return c + marks[Math.floor(Math.random() * marks.length)];
            }
            return c;
        }).join('');
    }

    function decorateArabicSpaced(str) {
        return str.split('').join('・');
    }

    // توليد القائمة الكاملة
    function generateAllDecorations(text) {
        const query = text.trim() === '' ? 'Legend الملك' : text;
        const results = [];

        // الخطوط الإنجليزية
        englishFonts.forEach(font => {
            results.push({
                text: mapToUnicode(query, font.map),
                category: font.category
            });
        });

        // الأنماط والإطارات
        patterns.forEach(p => {
            results.push({
                text: p.format(query),
                category: p.category
            });
        });

        return results;
    }

    // رسم النتائج عبر DocumentFragment و Template
    function renderList() {
        const text = inputText.value;
        const items = generateAllDecorations(text);
        const fragment = document.createDocumentFragment();

        items.forEach(item => {
            if (currentFilter !== 'all' && item.category !== currentFilter) return;

            const clone = cardTemplate.content.cloneNode(true);
            const card = clone.querySelector('.result-card');
            const textSpan = clone.querySelector('.decorated-text');

            card.setAttribute('data-category', item.category);
            textSpan.textContent = item.text;

            // ربط حدث النسخ
            card.addEventListener('click', () => copyText(item.text, card));

            fragment.appendChild(clone);
        });

        resultsGrid.innerHTML = '';
        resultsGrid.appendChild(fragment);
    }

    // دالة النسخ الفوري
    async function copyText(str, cardElement) {
        try {
            await navigator.clipboard.writeText(str);
        } catch {
            const area = document.createElement('textarea');
            area.value = str;
            document.body.appendChild(area);
            area.select();
            document.execCommand('copy');
            document.body.removeChild(area);
        }

        cardElement.classList.add('copied');
        const btn = cardElement.querySelector('.btn-copy');
        btn.textContent = '✓ تم';

        setTimeout(() => {
            cardElement.classList.remove('copied');
            btn.textContent = 'نسخ';
        }, 1600);
    }

    // تفعيل النسخ على البطاقات المعروضة مبدئياً في HTML
    document.querySelectorAll('.result-card').forEach(card => {
        const str = card.querySelector('.decorated-text').textContent;
        card.addEventListener('click', () => copyText(str, card));
    });

    // استماع الإدخال مع RequestAnimationFrame لسرعة فائقة
    inputText.addEventListener('input', () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(renderList);
    });

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        renderList();
        inputText.focus();
    });

    // إدارة التصفية مع مطابقة معايير Accessibility 100%
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            currentFilter = btn.getAttribute('data-filter');
            renderList();
        });
    });
});
