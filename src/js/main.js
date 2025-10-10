document.addEventListener("DOMContentLoaded", () => {
  const recomendedSlider = document.querySelectorAll(
    '[data-slider="recomended"]'
  );

  if (recomendedSlider.length > 0) {
    recomendedSlider.forEach((slider) => {
      const sliderPrev = slider.querySelector(
        '[data-slider-prev="recomended"]'
      );
      const sliderNext = slider.querySelector(
        '[data-slider-next="recomended"]'
      );

      new Swiper(slider, {
        slidesPerView: "auto",
        spaceBetween: 12,
        navigation: {
          nextEl: sliderPrev,
          prevEl: sliderNext,
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

  const developSlider = document.querySelector(
    '[data-slider="develop-slider"]'
  );

  if (developSlider) {
    new Swiper(developSlider, {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: '[data-slider-next="develop-slider"]',
        prevEl: '[data-slider-prev="develop-slider"]',
      },
      breakpoints: {
        1024: {
          slidesPerView: "auto",
        },
      },
    });
  }

  const projectsSlider = document.querySelectorAll(
    '[data-slider="projects-slider"]'
  );

  if (projectsSlider.length > 0)
    projectsSlider.forEach((slider) => {
      new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 16,
        navigation: {
          nextEl: '[data-slider-next="projects-slider"]',
          prevEl: '[data-slider-prev="projects-slider"]',
        },
        breakpoints: {
          560: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
            grid: {
              rows: 2,
            },
          },
        },
      });
    });

  const articleSlider = document.querySelector(
    '[data-slider="article-slider"]'
  );

  if (articleSlider) {
    new Swiper(articleSlider, {
      slidesPerView: 1,
      spaceBetween: 16,
      navigation: {
        nextEl: '[data-slider-prev="article-slider"]',
        prevEl: '[data-slider-next="article-slider"]',
      },
    });
  }

  const productSlider = document.querySelector(
    '[data-slider="product-slider"]'
  );

  const productThumbs = document.querySelector(
    '[data-slider="product-thumbs"]'
  );

  if (productSlider && productThumbs) {
    const productSwiperThumbs = new Swiper(productThumbs, {
      slidesPerView: 4,
      spaceBetween: 6,
      direction: "vertical",
      reverseDirection: true,
      speed: 1000,
      loop: true,
    });

    const productSwiper = new Swiper(productSlider, {
      slidesPerView: 1,
      spaceBetween: 32,
      speed: 1000,
      loop: true,
      navigation: {
        nextEl: '[data-slider-next="product-slider"]',
        prevEl: '[data-slider-prev="product-slider"]',
      },
      thumbs: {
        swiper: productSwiperThumbs,
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
    $('[data-menu="dropdown-list"]').slideUp(300);
    $('[data-menu="dropdown-btn"]').removeClass("is-active");
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

  $("[data-select]").each(function () {
    const $select = $(this);

    const options = {
      theme: "default",
      width: "100%",
      language: "ru",
      placeholder: $select.find('option[value=""]').text(),
    };

    $select.select2(options);
  });

  function initAllModalShadows() {
    $("[data-popup-bottom-panel]").each(function () {
      var $panel = $(this);
      var $content = $panel.closest("[data-popup-scrollable]");

      function checkScroll() {
        var scrollTop = $content.scrollTop();
        var innerHeight = $content.innerHeight();
        var scrollHeight = $content[0].scrollHeight;

        console.log(
          "scrollTop:",
          scrollTop,
          "innerHeight:",
          innerHeight,
          "scrollHeight:",
          scrollHeight
        );

        if (scrollTop + innerHeight >= scrollHeight - 2) {
          $panel.addClass("is-end");
        } else {
          $panel.removeClass("is-end");
        }
      }

      $content.off("scroll.modalShadow").on("scroll.modalShadow", checkScroll);
      $panel.data("scroll-initialized", true);

      // Первоначальная проверка
      setTimeout(checkScroll, 50);
    });
  }

  // Инициализируем при загрузке
  initAllModalShadows();
});

$(document).ready(function () {
  const $dropdownParents = $('[data-header="dropdown-parent"]');
  const $dropdownMenus = $('[data-header="dropdown-menu"]');
  const $dropdownSubparents = $('[data-header="dropdown-subparent"]');
  const $dropdownSubmenus = $('[data-header="dropdown-submenu"]');

  let hideTimeout;
  const delay = 200; // Задержка перед скрытием меню

  // Функция для скрытия всех меню
  function hideAllMenus() {
    $dropdownMenus.addClass("opacity-0 pointer-events-none");
    $dropdownSubmenus.addClass("opacity-0 pointer-events-none");
  }

  // Обработчики для меню первого уровня
  $dropdownParents.each(function () {
    const $parent = $(this);
    const $menu = $parent.find('[data-header="dropdown-menu"]');

    $parent.on("mouseenter", function () {
      clearTimeout(hideTimeout);
      hideAllMenus();
      $menu.removeClass("opacity-0 pointer-events-none");
    });

    $parent.on("mouseleave", function () {
      hideTimeout = setTimeout(function () {
        $menu.addClass("opacity-0 pointer-events-none");
      }, delay);
    });

    $menu.on("mouseenter", function () {
      clearTimeout(hideTimeout);
    });

    $menu.on("mouseleave", function () {
      hideTimeout = setTimeout(function () {
        $menu.addClass("opacity-0 pointer-events-none");
      }, delay);
    });
  });

  // Обработчики для меню второго уровня
  $dropdownSubparents.each(function () {
    const $subparent = $(this);
    const $submenu = $subparent.find('[data-header="dropdown-submenu"]');
    const $menu = $subparent.closest('[data-header="dropdown-menu"]');

    $subparent.on("mouseenter", function () {
      clearTimeout(hideTimeout);
      $submenu.removeClass("opacity-0 pointer-events-none");

      // Добавляем padding-right к меню второго уровня
      $menu.css("padding-right", "554px");

      // Устанавливаем минимальную высоту меню второго уровня равной высоте подменю
      const submenuHeight = $submenu[0].scrollHeight;
      $menu.css("min-height", submenuHeight + "px");
    });

    $subparent.on("mouseleave", function () {
      hideTimeout = setTimeout(function () {
        $submenu.addClass("opacity-0 pointer-events-none");
        $menu.css({ "padding-right": "", "min-height": "" });
      }, delay);
    });

    $submenu.on("mouseenter", function () {
      clearTimeout(hideTimeout);
    });

    $submenu.on("mouseleave", function () {
      hideTimeout = setTimeout(function () {
        $submenu.addClass("opacity-0 pointer-events-none");
        $menu.css({ "padding-right": "", "min-height": "" });
      }, delay);
    });
  });

  $('[data-accordion="head"]').on("click", function () {
    const $block = $(this).closest('[data-accordion="block"]');
    const $body = $block.find('[data-accordion="body"]');
    $block.toggleClass("is-open");
    $body.slideToggle();
  });

  $("[data-doc-link]").on("click", function (e) {
    e.preventDefault();
    const dataLink = $(this).attr("data-doc-link");

    $("[data-doc-section]").hide();
    $(`[data-doc-section="${dataLink}"]`).show();

    if (window.matchMedia("(max-width: 767px)").matches) {
      $("[data-doc-title]").hide();
      $("[data-doc-nav]").hide();
    }
  });

  $("[data-doc-back]").on("click", function () {
    $("[data-doc-section]").hide();
    $("[data-doc-title]").show();
    $("[data-doc-nav]").show();
  });

  if (window.matchMedia("(max-width: 767px)").matches) {
    $("[data-doc-section]").hide();
  }

  $("[data-tabs-btn]").on("click", function () {
    const tabId = $(this).attr("data-tabs-btn");
    console.log(tabId);

    // Убираем активный класс у всех кнопок
    $("[data-tabs-btn]").removeClass("is-active");
    $(this).addClass("is-active");

    // Скрываем все табы (сразу убираем opacity)
    $("[data-tabs-content]").css("opacity", "0");

    // После завершения анимации скрытия скрываем display
    setTimeout(() => {
      $("[data-tabs-content]").hide();

      // Показываем нужный таб
      $(`[data-tabs-content="${tabId}"]`).show();

      // Добавляем opacity с задержкой для плавности
      setTimeout(() => {
        $(`[data-tabs-content="${tabId}"]`).css("opacity", "1");
      }, 10);
    }, 300); // Задержка должна соответствовать времени CSS-перехода
  });

  $('input[type="tel"]').mask("+7 (999) 999-99-99", {
    translation: {
      9: { pattern: /[0-9]/ },
    },
  });

  $('[data-catalog-layout="lines"]').on("click", function () {
    $('[data-catalog-layout="container"]').addClass("is-layout-lines");
    $(this).addClass("is-active");
    $('[data-catalog-layout="grid"]').removeClass("is-active");
  });

  $('[data-catalog-layout="grid"]').on("click", function () {
    $('[data-catalog-layout="container"]').removeClass("is-layout-lines");
    $(this).addClass("is-active");
    $('[data-catalog-layout="lines"]').removeClass("is-active");
  });

  const $scrollContainer = $('[data-scrollable="container"]');
  const $stickySection = $('[data-scrollable="sticky-section"]');

  // Функция проверки достижения конца скролла
  function checkScrollEnd() {
    const scrollHeight = $scrollContainer[0].scrollHeight;
    const scrollTop = $scrollContainer.scrollTop();
    const clientHeight = $scrollContainer[0].clientHeight;

    // Проверяем, достигли ли мы конца скролла (добавляем небольшую погрешность в 1px)
    const isAtEnd = scrollHeight - scrollTop <= clientHeight + 1;

    // Добавляем или удаляем класс
    $stickySection.toggleClass("is-end", isAtEnd);
  }

  $('[data-catalog-filters="btn-open"]').on("click", function () {
    $('[data-catalog-filters="popup"]').addClass("is-open");
    $scrollContainer.on("scroll", checkScrollEnd);
  });

  $('[data-catalog-filters="btn-close"]').on("click", function () {
    $('[data-catalog-filters="popup"]').removeClass("is-open");
  });

  $("[data-tippy-html]").each(function () {
    tippy(this, {
      content: $(this).attr("data-tippy-html"),
      allowHTML: true,
      placement: "top-end",
    });
  });

  $('[data-hidden-block="controller"]').on("click", function () {
    const content = $('[data-hidden-block="content"]');
    const toggleBtn = $('[data-hidden-block="btn"]');
    const textBtnUp = toggleBtn.attr("data-text-up");
    const textBtnDown = toggleBtn.attr("data-text-down");

    $(this).toggleClass("is-active");

    toggleBtn.text($(this).hasClass("is-active") ? textBtnDown : textBtnUp);

    content.slideToggle();
  });

  $('[data-breadcrumbs="toggle-btn"]').on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("is-active");
    $('[data-breadcrumbs="list"]').toggleClass("is-open");
  });

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest('[data-breadcrumbs="toggle-btn"]').length &&
      !$(e.target).closest('[data-breadcrumbs="list"]').length
    ) {
      $('[data-breadcrumbs="toggle-btn"]').removeClass("is-active");
      $('[data-breadcrumbs="list"]').removeClass("is-open");
    }
  });

  $('[data-counter="plus"]').click(function () {
    var $counterBlock = $(this).closest('[data-counter="block"]'); // используем класс контейнера
    var $input = $counterBlock.find('[data-counter="input"]');
    var currentValue = parseInt($input.data("count"));

    currentValue++;
    updateCounter($input, currentValue);
  });

  $('[data-counter="minus"]').click(function () {
    var $counterBlock = $(this).closest('[data-counter="block"]'); // используем класс контейнера
    var $input = $counterBlock.find('[data-counter="input"]');
    var currentValue = parseInt($input.data("count"));

    if (currentValue > 1) {
      currentValue--;
      updateCounter($input, currentValue);
    }
  });

  // Функция обновления счетчика
  function updateCounter($input, value) {
    $input.data("count", value);
    $input.val(value + " шт");

    // Можно также добавить событие для оповещения других компонентов
    $input.trigger("change.counter", [value]);
  }

  // Обработка ручного ввода (если нужно разрешить редактирование)
  $('[data-counter="input"]').on("blur", function () {
    var value = $(this).val().replace(" шт", "");
    value = parseInt(value) || 1;

    if (value < 1) value = 1;

    updateCounter($(this), value);
  });

  // Элементы страницы
  const $nav = $("[data-nav-links]");
  const $navLinks = $("[data-nav-link]");
  const $sections = $("[data-nav-section]");

  // Проверяем, есть ли с чем работать
  if ($nav.length === 0 || $sections.length === 0) {
    return;
  }

  // Высота навигационной панели (для отступа при скролле)
  const navHeight = $nav.outerHeight();

  // 1. ФУНКЦИЯ ПЛАВНОГО СКРОЛЛА ПО КЛИКУ (работает всегда)
  $navLinks.on("click", function (e) {
    e.preventDefault(); // Отменяем стандартное поведение якоря

    const targetId = $(this).attr("href"); // Получаем ID целевой секции (например, "#section-1")
    const $targetSection = $(targetId); // Находим саму секцию по ID

    if ($targetSection.length) {
      // Вычисляем позицию, куда скроллить: отступ секции сверху минус высота навигации
      const targetScrollTop = $targetSection.offset().top;

      // Плавный скролл к вычисленной позиции
      $("html, body").animate(
        {
          scrollTop: targetScrollTop,
        },
        800
      ); // 800ms - длительность анимации

      // На мобильных устройствах просто активируем ссылку по клику
      if ($(window).width() < 768) {
        $navLinks.removeClass("is-active");
        $(this).addClass("is-active");
      }
      // На десктопе активный класс установит Intersection Observer, чтобы не было конфликта со скроллом
    }
  });

  // 2. ЛОГИКА ДЛЯ ДЕСКТОПА (>= 768px) С Intersection Observer
  if ($(window).width() >= 768) {
    let observer;

    // Функция инициализации наблюдателя
    const initObserver = () => {
      // Настройки для Observer
      // rootMargin в формате "0px 0px -X% 0px". Смещаем нижнюю границу области наблюдения ВВЕРХ.
      // -Y%: отрицательное значение означает, что мы поднимаем нижнюю границу.
      // Мы хотим, чтобы срабатывание было, когда верх секции находится на высоте `navHeight` от верха окна.
      // Вычисляем процент от высоты окна (viewport), который занимает наша панель.
      const rootMarginPercent = (navHeight / $(window).height()) * 100;
      // rootMargin: "0px 0px -90% 0px" означает, что нижняя граница области наблюдения поднята на 90% высоты окна.
      // Мы поднимаем ее на (100% - высота_панели), чтобы "зона активации" начиналась сразу под панелью.
      const rootMargin = `0px 0px -${100 - rootMarginPercent}% 0px`;

      const options = {
        root: null, // null означает viewport (окно браузера)
        rootMargin: rootMargin, // Критически важный параметр! Создает отступ снизу.
        threshold: 0, // Срабатывает как только мишень (секция) начинает пересекать область
      };

      // Колбэк, который выполняется при пересечении каждой секции
      const callback = (entries) => {
        entries.forEach((entry) => {
          // entry.isIntersecting = true, если секция вошла в зону видимости (под нашу панель)
          if (entry.isIntersecting) {
            // Находим ID секции, которая сейчас активна
            const currentActiveSectionId = "#" + entry.target.id;
            // Находим соответствующую ссылку и делаем ее активной
            $navLinks.removeClass("is-active");
            $navLinks
              .filter(`[href="${currentActiveSectionId}"]`)
              .addClass("is-active");
          }
        });
      };

      // Создаем экземпляр наблюдателя
      observer = new IntersectionObserver(callback, options);

      // Начинаем наблюдать за всеми секциями
      $sections.each(function () {
        observer.observe(this);
      });
    };

    // Инициализируем наблюдатель сразу
    initObserver();
  }
});
