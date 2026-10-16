/**
 * مدير الإعلانات (Ads Manager Module)
 * ملف منفصل لإدارة ومزامنة الإعلانات دون التأثير على سيو وسرعة الموقع
 */

const AdsConfig = {
    // اضبط هنا وضع التفعيل: true لتفعيل AdSense أو false لوضعية المعاينة (Demo Placeholder)
    enableAdSense: false,
    
    // معرف الناشر في جوجل أدسنس (استبدله بالمعرف الحقيقي الخاص بك)
    adClient: 'ca-pub-XXXXXXXXXXXXXXXX',
    
    // معرفات الوحدات الإعلانية لكل مكان
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

    // تحميل سكريبت جوجل أدسنس بشكل غير متزامن لتفادي بطء الموقع (PageSpeed Optimization)
    loadAdSenseScript() {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.config.adClient}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }

    // حقن وحدات أدسنس داخل الفتحات المخصصة
    renderAdSenseUnits() {
        const adSlots = document.querySelectorAll('.ad-space');

        adSlots.forEach(slot => {
            const slotName = slot.getAttribute('data-ad-slot');
            const slotId = this.config.slots[slotName];

            if (slotId) {
                slot.innerHTML = `
                    <ins class="adsbygoogle"
                         style="display:block; width:100%;"
                         data-ad-client="${this.config.adClient}"
                         data-ad-slot="${slotId}"
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                `;
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                    console.warn('AdSense push error:', e);
                }
            }
        });
    }

    // وضع عناصر معاينة أنيقة عند عدم تفعيل أدسنس بعد
    renderPlaceholders() {
        const adSlots = document.querySelectorAll('.ad-space');
        adSlots.forEach(slot => {
            const slotName = slot.getAttribute('data-ad-slot');
            slot.innerHTML = `
                <div style="color: #64748b; font-size: 0.9rem; padding: 15px;">
                    📢 مساحة إعلانية متجاوبة (${slotName})
                </div>
            `;
        });
    }

    // التحكم في زر إغلاق الشريط السفلي الثابت
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

// تهيئة الإعلانات عند اكتمال تحميل المستند
document.addEventListener('DOMContentLoaded', () => {
    new AdsManager(AdsConfig);
});
