// Define translations for different languages
const translations = {
    en: {
        countdownHeading: 'Blackeye begins in:'
    },
    zh: {
        countdownHeading: '黑眼病开始于：'
    }
};

// Function to update text content based on selected language
function updateLanguage(lang) {
    const translation = translations[lang];
    if (translation) {
        // Update countdown heading
        const countdownHeading = document.querySelector('.countdown-heading');
        countdownHeading.textContent = translation.countdownHeading;
    }
}

// Initialize language based on user selection
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        updateLanguage(selectedLanguage);
    });

    // Default language on page load
    updateLanguage(languageSelect.value);
});
