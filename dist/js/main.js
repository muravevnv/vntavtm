document.addEventListener("DOMContentLoaded", () => {
  const recomendedSlider = document.querySelector('[data-slider="recomended"]');

  if (recomendedSlider) {
    new Swiper(recomendedSlider, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      navigation: {
        nextEl: "[data-slider-prev='recomended']",
        prevEl: "[data-slider-next='recomended']",
      },
      breakpoints: {
        560: {
          slidesPerView: 'auto',
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 16,
        },
      },
    });
  }

  const clientsSlider = document.querySelector('[data-slider="our-clients"]');

  if (clientsSlider) {
    new Swiper(clientsSlider, {
      slidesPerView: 2,
      spaceBetween: 24,
      navigation: {
        nextEl: '[data-slider-prev="our-clients"]',
        prevEl: '[data-slider-next="our-clients"]',
      },
      breakpoints: {
        560: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
          centeredSlides: true,
          initialSlide: 2,
        },
        1024: {
          slidesPerView: 5,
          centeredSlides: false,
          allowTouchMove: false,
          initialSlide: 0,
          loop: false,
        },
      },
    });
  }
});
