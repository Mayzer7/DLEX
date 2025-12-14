// header scroll animation
const header = document.querySelector('.header');

if (header) {
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (isMenuOpen) return; 

        if (ticking) return;

        window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 0) {
            header.classList.remove('header--hidden', 'header--scrolled');
            lastScrollY = currentScrollY;
            ticking = false;
            return;
            }

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
            header.classList.add('header--hidden');
            header.classList.remove('header--scrolled');
            }

            if (currentScrollY < lastScrollY) {
            header.classList.remove('header--hidden');
            header.classList.add('header--scrolled');
            }

            lastScrollY = currentScrollY;
            ticking = false;
        });

        ticking = true;
    });
}




// Burger

const burgerBtn = document.getElementById('burger');
const burgerMenu = document.getElementById('burgerMenu');

if (burgerMenu) {
    const overlay = document.createElement('div');
    overlay.className = 'burger-overlay';
    document.body.appendChild(overlay);
    
    function toggleMenu() {
        burgerBtn.classList.toggle('active');
        burgerMenu.classList.toggle('active');
        overlay.classList.toggle('active');

        const isActive = burgerMenu.classList.contains('active');
        isMenuOpen = isActive;

        if (isActive) {
            header.classList.remove('header--hidden');
            header.classList.add('header--scrolled');

            lastScrollY = window.scrollY; 
            document.documentElement.classList.add('no-scroll');
        } else {
            document.documentElement.classList.remove('no-scroll');
        }
    }
    
    burgerBtn.addEventListener('click', toggleMenu);
    
    overlay.addEventListener('click', toggleMenu);
    burgerMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            toggleMenu();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && burgerMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}




















// Video
const video = document.querySelector('.main-video');

if (video) {
    const playBtn = document.querySelector('.video-play');

    const toggleVideo = () => {
        if (video.paused) {
            video.muted = false;
            video.play();
            playBtn.classList.add('is-hidden');
        } else {
            video.pause();
            playBtn.classList.remove('is-hidden');
        }
    };

    playBtn.addEventListener('click', toggleVideo);
    video.addEventListener('click', toggleVideo);
}



// Swiper

const whyDlexCards = document.querySelector('.why-dlex-cards');

if (whyDlexCards) {
    const paginationContainer = document.querySelector('.pagination-dots');
    const prevBtn = document.querySelector('.pagination-arrow--prev');
    const nextBtn = document.querySelector('.pagination-arrow--next');

    function renderPagination(swiper) {
        paginationContainer.innerHTML = '';

        swiper.snapGrid.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'pagination-dot';

            if (index === swiper.snapIndex) {
            dot.classList.add('pagination-dot--active');
            }

            dot.addEventListener('click', () => {
            swiper.slideTo(index);
            });

            paginationContainer.appendChild(dot);
        });
    }

    function updatePagination(swiper) {
        const dots = paginationContainer.querySelectorAll('.pagination-dot');

        dots.forEach((dot, index) => {
            dot.classList.toggle(
            'pagination-dot--active',
            index === swiper.snapIndex
            );
        });
    }

    function updateArrows(swiper) {
        prevBtn.classList.toggle('disabled', swiper.isBeginning);
        nextBtn.classList.toggle('disabled', swiper.isEnd);
    }

    const whyDlexSwiper = new Swiper(whyDlexCards, {
        slidesPerView: 4,
        spaceBetween: 24,
        speed: 600,

        navigation: {
            nextEl: '.pagination-arrow--next',
            prevEl: '.pagination-arrow--prev',
        },

        on: {
            init(swiper) {
            renderPagination(swiper);
            updatePagination(swiper);
            updateArrows(swiper);
            },

            slideChange(swiper) {
            updatePagination(swiper);
            updateArrows(swiper);
            },

            resize(swiper) {
            renderPagination(swiper);
            updatePagination(swiper);
            updateArrows(swiper);
            }
        },

        breakpoints: {
            0: { slidesPerView: 1.2 },
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
        }
    });
}


// Join the club modal
const joinClubModal = document.querySelector('.join-club-modal');
const closeJoinClubBtn = document.querySelector('.close-club-modal');

if (joinClubModal) {
    function openJoinClubModal() {
        if (!joinClubModal) return;

        joinClubModal.classList.add('is-active');
        document.documentElement.classList.add('no-scroll');
    }

    function closeJoinClubModal() {
        if (!joinClubModal) return;

        joinClubModal.classList.remove('is-active');
        document.documentElement.classList.remove('no-scroll');
    }


    joinClubModal.addEventListener('click', (event) => {
        if (event.target === joinClubModal) {
            closeJoinClubModal();
        }
    });

 
}


// Join the club form
const joinClubForm = document.querySelector('.join-club-form');

if (joinClubForm) {
    const emailInput = joinClubForm.querySelector('input[type="email"]');
    const inputWrapper = joinClubForm.querySelector('.form-input');
    const errorText = joinClubForm.querySelector('.form-input-error');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    joinClubForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (!email) {
            errorText.textContent = 'Please enter email';
            inputWrapper.classList.add('has-error');
            return;
        }

        if (!emailRegex.test(email)) {
            errorText.textContent = 'Please enter a valid email';
            inputWrapper.classList.add('has-error');
            return;
        }

        inputWrapper.classList.remove('has-error');

        console.log({
            email: email
        });

        joinClubForm.reset();
    });

    emailInput.addEventListener('input', () => {
        inputWrapper.classList.remove('has-error');
    });
}





