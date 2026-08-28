// Dastaan x Parda Aur Mijaaz Settings & Theme Engine

(function () {
    const THEME_KEY = 'selectedTheme';
    const FONT_KEY = 'selectedFont';
    const SIZE_KEY = 'selectedSize';

    function getSaved(key, fallback) {
        return localStorage.getItem(key) || localStorage.getItem('parda_' + key.replace('selected', '').toLowerCase()) || fallback;
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

    // Apply settings immediately on script evaluation
    applySettings();

    window.openSettingsModal = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        const panel = document.getElementById('pardaSettingsPanel');
        const overlay = document.getElementById('pardaSettingsOverlay');
        if (panel) panel.classList.add('active');
        if (overlay) overlay.classList.add('active');
    };

    window.closeSettingsModal = function () {
        const panel = document.getElementById('pardaSettingsPanel');
        const overlay = document.getElementById('pardaSettingsOverlay');
        if (panel) panel.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    };

    function mountPardaSettingsSystem() {
        if (document.getElementById('pardaSettingsPanel')) return;

        // Overlay
        const overlay = document.createElement('div');
        overlay.id = 'pardaSettingsOverlay';
        overlay.onclick = window.closeSettingsModal;

        // Panel Modal
        const panel = document.createElement('div');
        panel.id = 'pardaSettingsPanel';

        const currentTheme = getSaved(THEME_KEY, 'dark');
        const currentFont = getSaved(FONT_KEY, 'literata');
        const currentSize = getSaved(SIZE_KEY, 'medium');

        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 14px; margin-bottom: 20px;">
                <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; color: var(--accent-gold); margin: 0; font-style: italic;">Reading & Theme Settings</h3>
                <button onclick="window.closeSettingsModal()" style="background: none; border: none; color: var(--text-primary); font-size: 1.2rem; cursor: pointer; opacity: 0.7;">✕</button>
            </div>

            <div class="settings-group-title">Theme Palette</div>
            <div class="settings-grid-options">
                <button type="button" class="settings-opt-btn ${currentTheme === 'dark' ? 'active' : ''}" data-set-theme="dark" onclick="window.setTheme('dark')">🌙 Dark Gold</button>
                <button type="button" class="settings-opt-btn ${currentTheme === 'cream' ? 'active' : ''}" data-set-theme="cream" onclick="window.setTheme('cream')">📜 Cream Sepia</button>
                <button type="button" class="settings-opt-btn ${currentTheme === 'midnight' ? 'active' : ''}" data-set-theme="midnight" onclick="window.setTheme('midnight')">🌌 Midnight Sapphire</button>
                <button type="button" class="settings-opt-btn ${currentTheme === 'emerald' ? 'active' : ''}" data-set-theme="emerald" onclick="window.setTheme('emerald')">🍃 Emerald Mint</button>
            </div>

            <div class="settings-group-title">Typography / Font</div>
            <div class="settings-grid-options" style="grid-template-columns: repeat(3, 1fr);">
                <button type="button" class="settings-opt-btn ${currentFont === 'literata' ? 'active' : ''}" data-set-font="literata" onclick="window.setFont('literata')">Literata</button>
                <button type="button" class="settings-opt-btn ${currentFont === 'inter' ? 'active' : ''}" data-set-font="inter" onclick="window.setFont('inter')">Inter</button>
                <button type="button" class="settings-opt-btn ${currentFont === 'nastaliq' ? 'active' : ''}" data-set-font="nastaliq" onclick="window.setFont('nastaliq')">Urdu</button>
            </div>

            <div class="settings-group-title">Text Size</div>
            <div class="settings-grid-options" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 0;">
                <button type="button" class="settings-opt-btn ${currentSize === 'small' ? 'active' : ''}" data-set-size="small" onclick="window.setSize('small')">Small</button>
                <button type="button" class="settings-opt-btn ${currentSize === 'medium' ? 'active' : ''}" data-set-size="medium" onclick="window.setSize('medium')">Medium</button>
                <button type="button" class="settings-opt-btn ${currentSize === 'large' ? 'active' : ''}" data-set-size="large" onclick="window.setSize('large')">Large</button>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(panel);

        // Auto-inject Settings button after Our Impact in header nav
        const navLinks = document.getElementById('navLinks');
        if (navLinks && !document.getElementById('pardaHeaderSettingsBtn')) {
            const settingsBtn = document.createElement('a');
            settingsBtn.id = 'pardaHeaderSettingsBtn';
            settingsBtn.href = '#';
            settingsBtn.className = 'hover:gold-text hover:opacity-100 transition cursor-pointer';
            settingsBtn.innerHTML = '⚙️ Settings';
            settingsBtn.onclick = window.openSettingsModal;
            navLinks.appendChild(settingsBtn);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            applySettings();
            mountPardaSettingsSystem();
        });
    } else {
        applySettings();
        mountPardaSettingsSystem();
    }
})();
