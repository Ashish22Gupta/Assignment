document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('interestForm');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    $('.courses-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarToggler && navbarToggler.getAttribute('aria-expanded') === 'true') {
                navbarToggler.click();
            }
        });
    });

    function validatePhoneNumber(input) {
        const phoneRegex = /^[6-9]\d{9}$/;
        const value = input.value.trim();

        if (value.length === 0) {
            input.setCustomValidity('Phone number is required.');
            return false;
        } else if (!phoneRegex.test(value)) {
            input.setCustomValidity('Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9.');
            return false;
        } else {
            input.setCustomValidity('');
            return true;
        }
    }

    phoneNumberInput.addEventListener('input', function () {
        validatePhoneNumber(this);
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const isPhoneValid = validatePhoneNumber(phoneNumberInput);

        if (!form.checkValidity() || !isPhoneValid) {
            form.classList.add('was-validated');
            return;
        }

        formSuccessMessage.classList.remove('d-none');
        form.reset();
        form.classList.remove('was-validated');

        formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(function () {
            formSuccessMessage.classList.add('d-none');
        }, 5000);
    });

    const backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});