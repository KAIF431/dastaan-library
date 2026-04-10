// --- 1. Font Size Control ---
let currentFontSize = 20; 
const article = document.querySelector('article');

function changeFontSize() {
    if (article) {
        if (currentFontSize >= 30) {
            currentFontSize = 16; 
        } else {
            currentFontSize += 4; 
        }
        article.style.fontSize = currentFontSize + 'px';
        console.log("Font size set to: " + currentFontSize);
    }
}

// --- 2. Dark/Light Mode Toggle ---
let isDark = true;
function toggleTheme() {
    const body = document.body;
    const nav = document.querySelector('nav');
    
    if (isDark) {
        body.style.backgroundColor = "#fdfaf1"; // Light Paper
        body.style.color = "#1a1a1a";
        if (nav) nav.style.backgroundColor = "#fdfaf1";
        isDark = false;
    } else {
        body.style.backgroundColor = "#0d1310"; // Dark Green
        body.style.color = "rgba(255, 255, 255, 0.85)";
        if (nav) nav.style.backgroundColor = "#0d1310";
        isDark = true;
    }
}

// --- 3. Search Functionality ---
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll('.novel-card');

            cards.forEach(card => {
                // Card ke andar ka title aur writer ka text uthayega
                const title = card.querySelector('h3').innerText.toLowerCase();
                const writer = card.querySelector('p').innerText.toLowerCase();

                if (title.includes(query) || writer.includes(query)) {
                    card.style.display = "flex"; // Show card
                } else {
                    card.style.display = "none"; // Hide card
                }
            });
        });
    }
}

// --- 4. Sab ko Activate Karna ---
document.addEventListener('DOMContentLoaded', () => {
    // Buttons ko power dena
    document.querySelectorAll('button').forEach(btn => {
        if (btn.innerText.includes('Font Size')) {
            btn.onclick = changeFontSize;
        }
        if (btn.innerText.includes('Dark/Light')) {
            btn.onclick = toggleTheme;
        }
    });

    // Search activate karna
    setupSearch();
    
    console.log("Dastaan Library: All systems online! 🚀");
});