const AdsConfig = {
    enableAdSense: false,
    adClient: 'ca-pub-XXXXXXXXXXXXXXXX',
    slots: {
        'top-header': '1234567890',
        'middle-content': '2345678901',
        'in-article': '3456789012',
        'sticky-footer': '4567890123'
    }
};

class AdsManager {
    constructor(config) {
        this.config = config;
        this.init();
    }

    init() {
        if (this.config.enableAdSense) {
            this.loadAdSenseScript();
            this.renderAdSenseUnits();
        } else {
            this.renderPlaceholders();
        }
        this.setupStickyFooterClose();
    }

    loadAdSenseScript() {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.config.adClient}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }

    renderAdSenseUnits() {
        document.querySelectorAll('.ad-space').forEach(slot => {
            const slotName = slot.getAttribute('data-ad-slot');
            const slotId = this.config.slots[slotName];
            if (slotId) {
                slot.innerHTML = `
                    <ins class="adsbygoogle"
                         style="display:block; width:100%; height:100%;"
                         data-ad-client="${this.config.adClient}"
                         data-ad-slot="${slotId}"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                `;
                try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
            }
        });
    }

    renderPlaceholders() {
        document.querySelectorAll('.ad-space').forEach(slot => {
            const slotName = slot.getAttribute('data-ad-slot');
            // استخدام لون #1e293b لضمان نسبة تباين تتجاوز 10:1 واجتياز فحص Accessibility
            slot.innerHTML = `
                <div style="color: #1e293b; font-weight: 700; font-size: 0.9rem; padding: 10px;">
                    📢 مساحة إعلانية (${slotName})
                </div>
            `;
        });
    }

    setupStickyFooterClose() {
        const closeBtn = document.getElementById('closeStickyAd');
        const stickyAd = document.querySelector('.ad-sticky-footer');
        if (closeBtn && stickyAd) {
            closeBtn.addEventListener('click', () => {
                stickyAd.style.display = 'none';
                document.body.style.paddingBottom = '0px';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AdsManager(AdsConfig);
});
