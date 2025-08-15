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
    $content.toggleClass("is-open");
  });

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
  $('[data-menu="dropdown-btn"]').on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("is-active");
    $('[data-menu="dropdown-list"]').slideToggle(300);
  });

  $('[data-menu="open-btn"]').on("click", () => {
    $('[data-menu="menu"]').removeClass("translate-x-[-100%]");
    $('[data-menu="menu-content"]').removeClass("translate-x-[-100%]");
  });

  $('[data-menu="close-btn"]').on("click", () => {
    $('[data-menu="menu"]').addClass("translate-x-[-100%]");
    $('[data-menu="menu-content"]').addClass("translate-x-[-100%]");
    $sectionMenu.hide();
    $mainMenu.show().css("opacity", 0).animate({ opacity: 1 }, 150);
  });

  $('[data-request="btn"]').on("click", () => {
    $('[data-request="complete"]').removeClass("hidden");
    $('[data-request="form"]').addClass("hidden");
  });

  const $searchInput = $('[data-search="input"]');
  const $clearBtn = $('[data-search="clear-btn"]');

  // Функция для троттлинга
  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  function handleInput() {
    if ($searchInput.val().trim() !== "") {
      $clearBtn.show();
    } else {
      $clearBtn.hide();
    }
    console.log("Search for:", $searchInput.val());
  }

  const throttledHandleInput = throttle(handleInput, 300);

  $searchInput.on("input", throttledHandleInput);

  $clearBtn.on("click", function () {
    $searchInput.val("").trigger("input");
    $searchInput.focus();
  });

  const $videoContainer = $('[data-video="block"]');
  const $video = $videoContainer.find('[data-video="player"]');
  const $playIcon = $videoContainer.find('[data-video="play-icon"]');
  const $pauseIcon = $videoContainer.find('[data-video="pause-icon"]');

  // Изначально скрываем иконку паузы
  $pauseIcon.hide();

  $videoContainer.on("click", function () {
    if ($video[0].paused) {
      // Запускаем видео
      $video[0].play();
      $playIcon.hide();

      // Показываем иконку воспроизведения на 1.5 секунды при возобновлении
      $playIcon.addClass("visible");
      setTimeout(() => {
        $playIcon.hide();
      }, 1500);
    } else {
      // Ставим на паузу
      $video[0].pause();

      // Показываем иконку паузы на 1.5 секунды
      $pauseIcon.show();
      setTimeout(() => {
        $pauseIcon.hide();
        setTimeout(() => {
          $pauseIcon.hide();
        }, 300); // Ждем завершения анимации opacity
      }, 1500);
    }
  });

  // Обработка окончания видео
  $video.on("ended", function () {
    $playIcon.show();
  });
});
