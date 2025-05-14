document.addEventListener('DOMContentLoaded', function() {
    const contactOptionButtons = document.querySelectorAll('.contact-option-btn');
    const contactForm = document.getElementById('contactForm');
    const nextBtn = document.getElementById('nextBtn');
    const messageField = document.getElementById('messageField');
    const validationError = document.getElementById('validationError');
    const contactInfoDiv = document.getElementById('contactInfo');
    const contactInfoTitle = document.getElementById('contactInfoTitle');
    // Select only the required fields in the first section for 'Next' button validation
    const personalInfoFields = contactForm.querySelectorAll('#firstName[required], #lastName[required], #phone[required], #email[required], #location[required]');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const infoItems = contactInfoDiv.querySelectorAll('.info-item');

    function validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^\+?[\d\s\-\(\)]{7,20}$/;
        return phoneRegex.test(phoneNumber);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    contactInfoDiv.style.display = 'block';
    contactForm.style.display = 'none';
    contactInfoTitle.style.display = 'block';

    infoItems.forEach(item => {
        if (item.dataset.option) {
            item.style.display = 'none';
        } else {
            item.style.display = 'flex';
        }
    });

    contactOptionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');

            contactForm.style.display = 'block';

            messageField.style.display = 'none';
            validationError.style.display = 'none';

            contactForm.reset();
            phoneInput.style.borderColor = '#555';
            phoneInput.style.boxShadow = '0 0 0 2px rgba(183, 0, 255, 0)';

            emailInput.style.borderColor = '#555';
            emailInput.style.boxShadow = '0 0 0 2px rgba(183, 0, 255, 0)';

            nextBtn.style.display = 'block';

            infoItems.forEach(item => {
                if (!item.dataset.option) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });

            contactInfoDiv.querySelectorAll(`.info-item[data-option="${target}"]`).forEach(item => {
                 item.style.display = 'flex';
            });
        });
    });

    nextBtn.addEventListener('click', function() {
        let allPersonalInfoFieldsFilled = true; // Renamed flag for clarity
        let isPhoneNumberValid = true;
        let isEmailValid = true;

        // Iterate only over the personal information fields
        personalInfoFields.forEach(element => {
             if (!element.value.trim()) {
                allPersonalInfoFieldsFilled = false;
            }
            // Phone and email validation are still done here as they are part of personal info
            if (element.id === 'phone' && element.value.trim() !== '') {
                if (!validatePhoneNumber(element.value.trim())) {
                    isPhoneNumberValid = false;
                }
            }
             if (element.id === 'email' && element.value.trim() !== '') {
                if (!validateEmail(element.value.trim())) {
                    isEmailValid = false;
                }
            }
        })

        // Check the flags for personal info and format validation
        if (allPersonalInfoFieldsFilled && isPhoneNumberValid && isEmailValid) {
            validationError.style.display = 'none';
            messageField.style.display = 'block';
            nextBtn.style.display = 'none';
        } else {
            if (!allPersonalInfoFieldsFilled) {
                 validationError.textContent = "Fill all fields.";
            } else if (!isPhoneNumberValid) {
                 validationError.textContent = "Wrong number.";
            } else if (!isEmailValid) {
                 validationError.textContent = "Wrong Email.";
            }
            validationError.style.display = 'block';
        }
    });

    phoneInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            if (validatePhoneNumber(this.value.trim())) {
                this.style.borderColor = '#5cb85c';
                 this.style.boxShadow = '0 0 0 2px rgba(92, 184, 92, 0.5)';
            } else {
                this.style.borderColor = '#ff4d4d';
                 this.style.boxShadow = '0 0 0 2px rgba(255, 77, 77, 0.5)';
            }
        } else {
            this.style.borderColor = '#555';
            this.style.boxShadow = '0 0 0 2px rgba(183, 0, 255, 0)';
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            if (validateEmail(this.value.trim())) {
                this.style.borderColor = '#5cb85c';
                this.style.boxShadow = '0 0 0 2px rgba(92, 184, 92, 0.5)';
            } else {
                this.style.borderColor = '#ff4d4d';
                this.style.boxShadow = '0 0 0 2px rgba(255, 77, 77, 0.5)';
            }
        } else {
            this.style.borderColor = '#555';
            this.style.boxShadow = '0 0 0 2px rgba(183, 0, 255, 0)';
        }
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.success) {
                alert(data.message);
                contactForm.reset();
                contactForm.style.display = 'none';
                messageField.style.display = 'none';
                validationError.style.display = 'none';
                contactInfoDiv.style.display = 'block';
                contactInfoTitle.style.display = 'block';
                nextBtn.style.display = 'block';
                phoneInput.style.borderColor = '#555';
                phoneInput.style.boxShadow = '0 0 0 2px rgba(183, 0, 255, 0)';
                emailInput.style.borderColor = '#555';
                emailInput.style.boxShadow = '0 0 0 2px rgba(183, 0, 255, 0)';
                 infoItems.forEach(item => {
                    if (item.dataset.option) {
                        item.style.display = 'none';
                    } else {
                        item.style.display = 'flex';
                    }
                });

            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('form_error.');
        });
    });
});
