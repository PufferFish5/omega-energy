document.addEventListener('DOMContentLoaded', function() {
    const faqButtons = document.querySelectorAll('.topic-question');
    const allAnswers = document.querySelectorAll('.topic-answer');

    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const clickedAnswer = this.nextElementSibling;
            const isCurrentlyOpen = clickedAnswer.style.display === 'block';
            allAnswers.forEach(answer => {
                answer.style.display = 'none';
            });
            if (!isCurrentlyOpen) {
                if (clickedAnswer && clickedAnswer.classList.contains('topic-answer')) {
                     clickedAnswer.style.display = 'block';
                }
            }
        });
    });
});