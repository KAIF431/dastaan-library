// Read More Toggle FIX
const readBtn = document.getElementById('readMoreBtn');
const fullSummary = document.getElementById('fullSummary');

readBtn.onclick = () => {
    if (fullSummary.style.maxHeight === "0px" || fullSummary.style.maxHeight === "") {

        // OPEN
        fullSummary.style.maxHeight = fullSummary.scrollHeight + "px";
        fullSummary.classList.remove('opacity-0');
        fullSummary.classList.add('opacity-100');

        readBtn.innerText = 'Collapse Narrative';

        setTimeout(() => {
            fullSummary.scrollIntoView({ behavior: 'smooth' });
        }, 300);

    } else {

        // CLOSE
        fullSummary.style.maxHeight = "0px";
        fullSummary.classList.remove('opacity-100');
        fullSummary.classList.add('opacity-0');

        readBtn.innerText = 'Read Full Narrative';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};