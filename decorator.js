document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const clearBtn = document.getElementById('clearBtn');
    const resultsGrid = document.getElementById('resultsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentFilter = 'all';

    // خطوط اليونيكود الإنجليزية
    const unicodeFonts = {
        bold: { map: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭0123456789", category: 'english' },
        italic: { map: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡0123456789", category: 'english' },
        gothic: { map: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ0123456789", category: 'english' },
        doubleStruck: { map: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡", category: 'english' },
        circled: { map: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ0①②③④⑤⑥⑦⑧⑨", category: 'english' },
        smallCaps: { map: "ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789", category: 'english' }
    };

    const normalChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    function convertToUnicode(text, targetMap) {
        let result = "";
        const mapArr = Array.from(targetMap);
        for (let char of text) {
            const index = normalChars.indexOf(char);
            result += (index !== -1 && mapArr[index]) ? mapArr[index] : char;
        }
        return result;
    }

    const decoratorsList = [
        { format: (t) => `꧁༺ ${t} ༻꧂`, category: 'gaming' },
        { format: (t) => `亗『 ${t} 』亗`, category: 'gaming' },
        { format: (t) => `⚔️ ${t} ⚔️`, category: 'gaming' },
        { format: (t) => `♛ ${t} ♛`, category: 'gaming' },
        { format: (t) => `ズ ${t} ★`, category: 'gaming' },
        { format: (t) => `꧁༒☬ ${t} ☬༒꧂`, category: 'gaming' },
        { format: (t) => `★彡 [ ${t} ] 彡★`, category: 'gaming' },
        { format: (t) => `✧ ${t} ✧`, category: 'aesthetic' },
        { format: (t) => `✿ ${t} ✿`, category: 'aesthetic' },
        { format: (t) => `╰⊱♥ ${t} ♥⊱╮`, category: 'aesthetic' },
        { format: (t) => `『 ${t} 』`, category: 'aesthetic' },
        { format: (t) => decorateArabicTatweel(t), category: 'arabic' },
        { format: (t) => `«۩๑ ${t} ๑۩»`, category: 'arabic' }
    ];

    function decorateArabicTatweel(text) {
        return text.split('').map(c => (/[\u0600-\u06FF]/.test(c) && !' ادرزو'.includes(c)) ? c + 'ـ' : c).join('');
    }

    function generateDecorations(rawText) {
        const text = rawText.trim() === '' ? 'البرنس Legend' : rawText;
        const list = [];

        for (let key in unicodeFonts) {
            list.push({ text: convertToUnicode(text, unicodeFonts[key].map), category: 'english' });
        }

        decoratorsList.forEach(item => {
            list.push({ text: item.format(text), category: item.category });
        });

        return list;
    }

    function attachCardEvents(card, text) {
        card.addEventListener('click', () => copyToClipboard(text, card));
    }

    function renderResults() {
        const query = inputText.value;
        const decorations = generateDecorations(query);
        resultsGrid.innerHTML = '';

        decorations.forEach(item => {
            if (currentFilter !== 'all' && item.category !== currentFilter) return;

            const card = document.createElement('div');
            card.className = 'result-card';
            card.setAttribute('data-category', item.category);
            card.innerHTML = `
                <span class="decorated-text">${escapeHtml(item.text)}</span>
                <button class="btn-copy" aria-label="نسخ">نسخ</button>
            `;
            attachCardEvents(card, item.text);
            resultsGrid.appendChild(card);
        });
    }

    // تفعيل النسخ على البطاقات الأولية الموجودة مسبقاً في الـ HTML
    document.querySelectorAll('.result-card').forEach(card => {
        const text = card.querySelector('.decorated-text').textContent;
        attachCardEvents(card, text);
    });

    async function copyToClipboard(text, cardElement) {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            const temp = document.createElement('textarea');
            temp.value = text;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
        }
        cardElement.classList.add('copied');
        const btn = cardElement.querySelector('.btn-copy');
        btn.textContent = '✓ تم النسخ';
        setTimeout(() => {
            cardElement.classList.remove('copied');
            btn.textContent = 'نسخ';
        }, 1800);
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
    }

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        renderResults();
        inputText.focus();
    });

    inputText.addEventListener('input', renderResults);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderResults();
        });
    });
});
