document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nextBtn = document.getElementById('nextBtn');
    const messageField = document.getElementById('messageField');
    const validationError = document.getElementById('validationError');
    const submissionMessage = document.getElementById('submissionMessage'); 
    const formElements = contactForm.querySelectorAll('input[required], textarea[required]');

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let allFieldsFilled = true;
            formElements.forEach(element => {
                if (!element.value.trim()) {
                    allFieldsFilled = false;
                }
            });

            if (allFieldsFilled) {
                validationError.style.display = 'none';
                if (messageField) {
                    messageField.style.display = 'block';
                }
                if (submissionMessage) {
                    submissionMessage.textContent = 'Your form has been submitted successfully!'; 
                    submissionMessage.style.display = 'block'; 
                }
            } else {
                validationError.style.display = 'block';
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("sdfsssssssssssssssssss");
        });
    }
});