
const readMoreButtons = document.querySelectorAll('.read-more-btn');

readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
        const newsCard = this.closest('.news-card');
        const newsContent = newsCard.querySelector('.news-card-content');
        const buttonIcon = this.querySelector('i');
        newsContent.classList.toggle('open');
        if (newsContent.classList.contains('open')) {
            buttonIcon.classList.remove('fa-chevron-left');
            buttonIcon.classList.add('fa-chevron-right'); 
        } else {
            buttonIcon.classList.remove('fa-chevron-right'); 
            buttonIcon.classList.add('fa-chevron-left');
        }

    });
});

const newsContents = document.querySelectorAll('.news-card-content');
newsContents.forEach(content => {
    content.setAttribute('data-text', content.textContent);
});