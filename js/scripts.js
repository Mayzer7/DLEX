const header = document.querySelector('.header');
const burgerBtn = document.getElementById('burger');
const burgerMenu = document.getElementById('burgerMenu');

let lastScrollY = window.scrollY || 0;
let ticking = false;
let isMenuOpen = false;

let lockedScrollPos = 0;
function lockScroll() {
  lockedScrollPos = window.scrollY || 0;
  document.documentElement.classList.add('no-scroll'); 
  document.body.style.position = 'fixed';
  document.body.style.top = `-${lockedScrollPos}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
}

function unlockScroll() {
  document.documentElement.classList.remove('no-scroll');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';

  window.scrollTo(0, lockedScrollPos);
  lastScrollY = lockedScrollPos;
}

// header scroll animation
if (header) {
  const onScroll = () => {
    if (isMenuOpen) return; 

    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || 0;

        if (currentScrollY <= 0) {
          header.classList.remove('header--hidden', 'header--scrolled');
          lastScrollY = currentScrollY;
          ticking = false;
          return;
        }

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          // scroll down
          header.classList.add('header--hidden');
          header.classList.remove('header--scrolled', 'header--menu-open');
        } else if (currentScrollY < lastScrollY) {
          // scroll up
          header.classList.remove('header--hidden');
          header.classList.add('header--scrolled');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });

      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}


// burger menu
if (burgerMenu && burgerBtn) {
  const overlay = document.createElement('div');
  overlay.className = 'burger-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    burgerBtn.classList.add('active');
    burgerMenu.classList.add('active');
    overlay.classList.add('active');

    isMenuOpen = true;

    header.classList.remove('header--hidden');
    header.classList.add('header--scrolled', 'header--menu-open');

    lockScroll();
  }

  function closeMenu() {
    burgerBtn.classList.remove('active');
    burgerMenu.classList.remove('active');
    overlay.classList.remove('active');

    isMenuOpen = false;

    header.classList.remove('header--menu-open');

    unlockScroll();
  }

  function toggleMenu() {
    if (burgerMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  burgerBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  burgerMenu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      toggleMenu();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burgerMenu.classList.contains('active')) {
      toggleMenu();
    }
  });
}


// Video
const video = document.querySelector('.main-video');

if (video) {
    const playBtn = document.querySelector('.video-play');

    let halfLogged = false;

    const toggleVideo = async () => {
        if (video.paused) {
            try {
                await video.play();
                playBtn.classList.add('is-hidden');
            } catch (e) {
                console.warn('Play error:', e);
            }
        } else {
            video.pause();
            playBtn.classList.remove('is-hidden');
        }
    };

    playBtn.addEventListener('click', toggleVideo);
    video.addEventListener('click', toggleVideo);

    video.addEventListener('timeupdate', () => {
        if (!halfLogged && video.duration && video.currentTime >= video.duration / 2) {
            openJoinClubModal();
            halfLogged = true;
        }
    });

    video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.pause();
        playBtn.classList.remove('is-hidden');
        halfLogged = false;
    });
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

let wasPlayingBeforeModal = false;

if (joinClubModal) {
    function openJoinClubModal() {
        wasPlayingBeforeModal = !video.paused; 
        video.pause();

        joinClubModal.classList.add('is-active');
        document.documentElement.classList.add('no-scroll');
    }

    function closeJoinClubModal() {
        joinClubModal.classList.remove('is-active');
        document.documentElement.classList.remove('no-scroll');

        if (wasPlayingBeforeModal && video.currentTime < video.duration) {
            try {
               video.play();
            } catch (e) {
                console.warn('Play after modal error:', e);
            }
        }
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





