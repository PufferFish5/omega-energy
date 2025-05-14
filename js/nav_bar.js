fetch('nav_bar.html')
          .then(response => response.text())
          .then(data => {
            document.querySelector('#main-nav').innerHTML = data;
            const currentPagePath = window.location.pathname;

            const navLinks = document.querySelectorAll('#main-nav .nav-link');

            navLinks.forEach(link => {
                const linkPath = new URL(link.href, window.location.origin).pathname;

                if (currentPagePath === linkPath) {
                    link.classList.add('active');
                }
            });
          });