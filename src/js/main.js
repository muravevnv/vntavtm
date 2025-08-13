document.addEventListener("DOMContentLoaded", () => {
  const recomendedSlider = document.querySelector('[data-slider="recomended"]');

  if (recomendedSlider) {
    new Swiper(recomendedSlider, {
      slidesPerView: "auto",
      spaceBetween: 12,
      navigation: {
        nextEl: "[data-slider-prev='recomended']",
        prevEl: "[data-slider-next='recomended']",
      },
      breakpoints: {
        560: {
          slidesPerView: "auto",
          spaceBetween: 16,
        },
        768: {
          slidesPerView: "auto",
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
        },
        1024: {
          slidesPerView: 5,
        },
      },
    });
  }

  $('[data-catalog-block="toggle-btn"]').on("click", function () {
    const $parent = $(this).closest('[data-catalog-block="block"]');
    const $content = $parent.find('[data-catalog-block="content"]');

    $(this).toggleClass("is-active");
    $content.toggleClass("is-open");
  });

  const videoPlayer = {
    init() {
      this.bindEvents();
    },

    bindEvents() {
      $(document).on("click", '[data-video="play-btn"]', this.handlePlayClick);
      $(document).on("click", '[data-video="player"]', this.handlePlayerClick);
      $(document).on("ended", '[data-video="player"]', this.handleVideoEnded);
    },

    handlePlayClick(e) {
      const $btn = $(e.currentTarget);
      const $player = $btn
        .closest('[data-video="block"]')
        .find('[data-video="player"]');

      $player[0].play();
      $btn.hide();
    },

    handlePlayerClick(e) {
      const $player = $(e.currentTarget);
      const $btn = $player
        .closest('[data-video="block"]')
        .find('[data-video="play-btn"]');

      $player[0].pause();
      $btn.show();
    },

    handleVideoEnded(e) {
      const $player = $(e.currentTarget);
      const $btn = $player
        .closest('[data-video="block"]')
        .find('[data-video="play-btn"]');

      $btn.show();
    },
  };

  videoPlayer.init();
});
