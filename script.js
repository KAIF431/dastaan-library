// 1. Font Size Control
let currentFontSize = 20; // Default size in px
const article = document.querySelector('article');

function changeFontSize() {
    // Agar article page par hai tabhi font change hoga
    if (article) {
        if (currentFontSize >= 30) {
            currentFontSize = 16; // Reset to small if too big
        } else {
            currentFontSize += 4; // Increase size
        }
        article.style.fontSize = currentFontSize + 'px';
        console.log("Font size changed to: " + currentFontSize);
    }
}

// 2. Dark/Light Mode Toggle
let isDark = true;
function toggleTheme() {
    const body = document.body;
    const nav = document.querySelector('nav');
    
    if (isDark) {
        // Light Mode Settings
        body.style.backgroundColor = "#fdfaf1"; // Paper White
        body.style.color = "#1a1a1a"; // Dark Text
        if (nav) nav.style.backgroundColor = "#fdfaf1";
        isDark = false;
    } else {
        // Dark Mode Settings
        body.style.backgroundColor = "#0d1310"; // Dark Green/Black
        body.style.color = "rgba(255, 255, 255, 0.85)";
        if (nav) nav.style.backgroundColor = "#0d1310";
        isDark = true;
    }
}

// 3. Buttons ko "Power" dena (Event Listeners)
// Ye function tab chalta hai jab poora page load ho jaye
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(btn => {
        // Font Size wale button ke liye
        if (btn.innerText.includes('Font Size')) {
            btn.addEventListener('click', changeFontSize);
        }
        // Dark/Light mode wale button ke liye
        if (btn.innerText.includes('Dark/Light')) {
            btn.addEventListener('click', toggleTheme);
        }
    });
    console.log("Dastaan Library Script Loaded Successfully!");
});
