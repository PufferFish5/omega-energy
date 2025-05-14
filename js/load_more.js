const loadMoreBtn = document.getElementById('load-more-btn');
const hiddenNews = document.querySelectorAll('.news-card.hidden');
const itemsPerLoad = 3; 
function showNextNewsBatch() {
    const currentHiddenNews = document.querySelectorAll('.news-card.hidden');
    const numToShow = Math.min(itemsPerLoad, currentHiddenNews.length);
    for (let i = 0; i < numToShow; i++) {
        currentHiddenNews[i].classList.remove('hidden');
    }
    const remainingHiddenNews = document.querySelectorAll('.news-card.hidden');
    if (remainingHiddenNews.length === 0) {
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'none';
        }
    }
}

if (loadMoreBtn) { 
    loadMoreBtn.addEventListener('click', showNextNewsBatch);
    if (hiddenNews.length === 0) {
         loadMoreBtn.style.display = 'none';
    }
}