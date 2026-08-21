/* Peer-e-Kamil Core JavaScript Engine */

(function () {
    const THEME_KEY = 'selectedTheme';
    const FONT_KEY = 'selectedFont';
    const SIZE_KEY = 'selectedSize';

    function getSaved(key, fallback) {
        return localStorage.getItem(key) || fallback;
    }

    function applySettings() {
        const theme = getSaved(THEME_KEY, 'dark');
        const font = getSaved(FONT_KEY, 'literata');
        const size = getSaved(SIZE_KEY, 'medium');

        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-font', font);
        document.documentElement.setAttribute('data-size', size);

        if (document.body) {
            document.body.setAttribute('data-theme', theme);
            document.body.setAttribute('data-font', font);
            document.body.setAttribute('data-size', size);
        }

        updateUIButtons(theme, font, size);
    }

    window.setTheme = function (themeId) {
        localStorage.setItem(THEME_KEY, themeId);
        applySettings();
    };

    window.setFont = function (fontId) {
        localStorage.setItem(FONT_KEY, fontId);
        applySettings();
    };

    window.setSize = function (sizeId) {
        localStorage.setItem(SIZE_KEY, sizeId);
        applySettings();
    };

    function updateUIButtons(theme, font, size) {
        document.querySelectorAll('[data-set-theme]').forEach(btn => {
            if (btn.getAttribute('data-set-theme') === theme) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        document.querySelectorAll('[data-set-font]').forEach(btn => {
            if (btn.getAttribute('data-set-font') === font) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        document.querySelectorAll('[data-set-size]').forEach(btn => {
            if (btn.getAttribute('data-set-size') === size) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    // Apply settings on load
    applySettings();

    // Sound toggle state
    window.toggleAmbient = function (type, btn) {
        if (!btn) return;
        if (btn.innerText.includes('Sound')) {
            btn.innerText = '🔊 Playing';
            btn.style.background = 'var(--accent-gold)';
            btn.style.color = 'var(--btn-text)';
        } else {
            btn.innerText = 'Sound';
            btn.style.background = 'rgba(226, 184, 87, 0.15)';
            btn.style.color = 'var(--accent-gold)';
        }
    };

    // Modal & Drawer management
    window.openSettingsModal = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        const panel = document.getElementById('settingsPanel');
        const overlay = document.getElementById('drawerOverlay');
        if (panel) panel.classList.add('active');
        if (overlay) overlay.classList.add('active');
    };

    window.closeSettingsModal = function () {
        const panel = document.getElementById('settingsPanel');
        const overlay = document.getElementById('drawerOverlay');
        if (panel) panel.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    };

    window.openChapterDrawer = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        const drawer = document.getElementById('chapterDrawer');
        const overlay = document.getElementById('drawerOverlay');
        if (drawer) drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
    };

    window.closeChapterDrawer = function () {
        const drawer = document.getElementById('chapterDrawer');
        const overlay = document.getElementById('drawerOverlay');
        if (drawer) drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    };

    // Inject Shared Drawer & Settings Modals into DOM
    function mountUIElements() {
        if (document.getElementById('drawerOverlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'drawerOverlay';
        overlay.className = 'drawer-overlay';
        overlay.onclick = function () {
            window.closeSettingsModal();
            window.closeChapterDrawer();
        };

        const settingsModal = document.createElement('div');
        settingsModal.id = 'settingsPanel';
        settingsModal.className = 'modal-panel';

        const currentTheme = getSaved(THEME_KEY, 'dark');
        const currentFont = getSaved(FONT_KEY, 'literata');
        const currentSize = getSaved(SIZE_KEY, 'medium');

        settingsModal.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 18px;">
                <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--accent-gold); margin: 0; font-style: italic;">Reading & Theme Settings</h3>
                <button onclick="window.closeSettingsModal()" style="background: none; border: none; color: var(--text-primary); font-size: 1.2rem; cursor: pointer;">✕</button>
            </div>

            <div style="font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--accent-gold); font-weight: 700; margin-bottom: 10px;">Theme Palette</div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 18px;">
                <button type="button" class="header-button ${currentTheme === 'dark' ? 'active' : ''}" data-set-theme="dark" onclick="window.setTheme('dark')">🌙 Dark Gold</button>
                <button type="button" class="header-button ${currentTheme === 'cream' ? 'active' : ''}" data-set-theme="cream" onclick="window.setTheme('cream')">📜 Cream Sepia</button>
                <button type="button" class="header-button ${currentTheme === 'midnight' ? 'active' : ''}" data-set-theme="midnight" onclick="window.setTheme('midnight')">🌌 Midnight Sapphire</button>
                <button type="button" class="header-button ${currentTheme === 'emerald' ? 'active' : ''}" data-set-theme="emerald" onclick="window.setTheme('emerald')">🍃 Emerald Mint</button>
            </div>

            <div style="font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--accent-gold); font-weight: 700; margin-bottom: 10px;">Typography</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px;">
                <button type="button" class="header-button ${currentFont === 'literata' ? 'active' : ''}" data-set-font="literata" onclick="window.setFont('literata')">Literata</button>
                <button type="button" class="header-button ${currentFont === 'inter' ? 'active' : ''}" data-set-font="inter" onclick="window.setFont('inter')">Inter</button>
                <button type="button" class="header-button ${currentFont === 'nastaliq' ? 'active' : ''}" data-set-font="nastaliq" onclick="window.setFont('nastaliq')">Urdu</button>
            </div>

            <div style="font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: var(--accent-gold); font-weight: 700; margin-bottom: 10px;">Text Size</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                <button type="button" class="header-button ${currentSize === 'small' ? 'active' : ''}" data-set-size="small" onclick="window.setSize('small')">Small</button>
                <button type="button" class="header-button ${currentSize === 'medium' ? 'active' : ''}" data-set-size="medium" onclick="window.setSize('medium')">Medium</button>
                <button type="button" class="header-button ${currentSize === 'large' ? 'active' : ''}" data-set-size="large" onclick="window.setSize('large')">Large</button>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(settingsModal);
    }

    // Scroll reading progress listener
    window.addEventListener('scroll', function () {
        const prog = document.getElementById('readingProgress');
        if (prog) {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            prog.style.width = scrolled + '%';
        }
    });

    // Particle Background Initialization
    function initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        for (let i = 0; i < 70; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.5 + 0.2
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.y += p.speed;
                if (p.y > canvas.height) {
                    p.y = 0;
                    p.x = Math.random() * canvas.width;
                }
                ctx.fillStyle = "rgba(226, 184, 87, 0.25)";
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            applySettings();
            mountUIElements();
            initParticles();
        });
    } else {
        applySettings();
        mountUIElements();
        initParticles();
    }
})();
