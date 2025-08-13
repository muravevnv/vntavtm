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

  // Основные элементы
  var $mainMenu = $('[data-menu="main"]');
  var $sectionMenu = $('[data-menu="section"]');

  // Инициализация - скрываем section меню и готовим к анимации
  $sectionMenu.hide().css({
    position: "relative",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    width: "100%",
    opacity: 0,
  });

  // Показ section меню с анимацией
  $('[data-menu="section-link"]').on("click", function () {
    $mainMenu.animate({ opacity: 0 }, 150, function () {
      $(this).hide();
      $sectionMenu.show().css({
        transform: "translateX(0)",
        opacity: 1,
      });
    });
  });

  // Скрытие section меню с анимацией
  $('[data-menu="back"]').on("click", function () {
    $sectionMenu.css({
      transform: "translateX(-10%)",
      opacity: 0,
    });

    setTimeout(function () {
      $sectionMenu.hide();
      $mainMenu.show().css("opacity", 0).animate({ opacity: 1 }, 150);
    }, 300); // Должно совпадать с длительностью transition
  });

  // Аккордеон
  $('[data-menu="dropdown-btn"]').on("click", function () {
    $(this).toggleClass("is-active");
    $('[data-menu="dropdown-list"]').slideToggle(300);
  });

  $('[data-menu="open-btn"]').on('click', () => {
    $('[data-menu="menu"]').removeClass('translate-x-[-100%]');
    $('[data-menu="menu-content"]').removeClass('translate-x-[-100%]');
  })

  $('[data-menu="close-btn"]').on('click', () => {
    $('[data-menu="menu"]').addClass('translate-x-[-100%]');
    $('[data-menu="menu-content"]').addClass('translate-x-[-100%]');
  })

});
