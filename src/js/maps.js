$(document).ready(function () {
  if (document.querySelector("#map")) {
    ymaps.ready(init);
    function init() {
      // Создаем карту
      var map = new ymaps.Map("map", {
        center: [59.89273, 30.335074], // Москва
        zoom: 13,
      });

      // Создаем содержимое для попапа
      var popupContent = `
                <div class="custom-popup">
                  <picture class="custom-popup__img">
                    <img src="./img/contacts/map-content.png" alt="ВентАвтоматика">
                  </picture>
                  <div class="custom-popup__address">
                    <div class="custom-popup__address-label">
                      Адрес:
                    </div>
                    <div class="custom-popup__address-desc">
                      Санкт-Петербург, ст.м. "Московские ворота", ул. Парковая д.6, лит. А (офис), лит.И (склад)
                    </div>
                  </div>
                </div>
            `;

      // Создаем метку
      var placemark = new ymaps.Placemark(
        [59.89273, 30.335074],
        {
          // // Текст балуна (появляется при наведении)
          // balloonContentHeader: "Интересное место",
          // balloonContentBody: "Кликните для подробной информации",
          // balloonContentFooter: " ",
        },
        {
          // Опции метки
          // iconLayout: "default#image",
          // iconImageHref: "https://example.com/path/to/icon.png", // URL иконки
          // iconImageSize: [30, 30], // Размер иконки
          // iconImageOffset: [-15, -15], // Смещение иконки
        }
      );

      // Добавляем метку на карту
      map.geoObjects.add(placemark);

      // Обработчик клика по метке
      placemark.events.add("click", function (e) {
        // Открываем балун с нашим кастомным содержимым
        placemark.properties.set("balloonContent", popupContent);
        placemark.balloon.open();
      });

      // Опционально: закрываем балун при клике на карте
      map.events.add("click", function () {
        placemark.balloon.close();
      });
    }
  }

  if (document.querySelector("#delivery-map")) {
    ymaps.ready(init);

    function init() {
      var deliveryMap = new ymaps.Map("delivery-map", {
        center: [59.89273, 30.335074], // Москва
        zoom: 13,
      });
    }
  }

  if (document.querySelector("#delivery-address-map")) {
    ymaps.ready(init);

    function init() {
      var deliveryMap = new ymaps.Map("delivery-address-map", {
        center: [59.89273, 30.335074], // Москва
        zoom: 13,
      });
    }
  }

  if (document.querySelector("#pick-point-map")) {
    ymaps.ready(init);

    function init() {
      var deliveryMap = new ymaps.Map("pick-point-map", {
        center: [59.89273, 30.335074],
        zoom: 13,
      });

      // Создаем кастомную иконку для маркера
      var customIcon = new ymaps.Placemark(
        [59.89273, 30.335074], // Координаты маркера
        {
          hintContent: "Нажмите для подробной информации",
          // balloonContent полностью удален
        },
        {
          iconLayout: "default#image",
          iconImageHref: "../dist/img/icons/map-pin.png",
          iconImageSize: [16, 24],
          iconImageOffset: [-8, -16],
        }
      );

      // Добавляем маркер на карту
      deliveryMap.geoObjects.add(customIcon);

      // Создаем кастомный попап
      var popup = document.createElement("div");
      popup.className = "custom-popup";
      popup.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 16px;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            min-width: 300px;
            max-width: 400px;
            display: none;
            font-family: Arial, sans-serif;
        `;

      popup.innerHTML = `
            <button id="close-popup" class="absolute top-4 right-4 z-1 cursor-pointer">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.33203 1L11.9987 11.6667" stroke="#A4A4A4" style="stroke:#A4A4A4;stroke:color(display-p3 0.6433 0.6433 0.6433);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.9987 1L1.33203 11.6667" stroke="#A4A4A4" style="stroke:#A4A4A4;stroke:color(display-p3 0.6433 0.6433 0.6433);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="mb-4 flex flex-col items-start gap-1 pr-[30px]">
              <div class="flex items-start gap-1 text-xs font-medium">
                <div class="text-[#32333880] font-semibold">Пункт выдачи заказов:</div>
                СДЭК
              </div>
              <div class="flex items-start gap-1 text-xs font-medium">
                <div class="text-[#32333880] font-semibold">Адрес:</div>
                г. Москва, Нижний Сусальный переулок, 5 стр. 1, помещение 23
              </div>
              <div class="flex items-start gap-1 text-xs font-medium">
                <div class="text-[#32333880] font-semibold">График работы:</div>
                <div><span class="md:block">Пн-Пт 9:00-21:00,</span> <span class="md:block">Сб-Вс 10:00-20:00</span></div>
              </div>
              <div class="flex items-start gap-1 text-xs font-medium">
                <div class="text-[#32333880] font-semibold">Контакты:</div>+79687999585
              </div>
              <div class="flex items-start gap-1 text-xs font-medium">
                <div class="text-[#32333880] font-semibold">Тип пункта:</div>Отделение
              </div>
              <div class="flex items-start gap-1 text-xs font-medium">
                <div class="text-[#32333880] font-semibold">Максимальый вес выдачи:</div>50 кг
              </div>
            </div>
            <label class="flex items-start cursor-pointer mb-4">
              <input type="checkbox" class="absolute opacity-0 h-0 w-0 peer">
              <span
                class="relative inline-block shrink-0 mr-3 size-5 border-1 border-gray-300 rounded-md bg-no-repeat bg-center peer-checked:bg-[url('../img/icons/checked.svg')] peer-checked:border-[#3B8BEA]"></span>
              <span class="text-[14px] leading-[140%] font-medium">
                Сохранить как организацию по умолчанию
              </span>
            </label>
            <button type="submit" class="flex items-center justify-center gap-2 py-[10px] px-[18px] rounded-[10px] bg-primary 
              font-semibold text-sm text-white cursor-pointer hover:bg-[#2C6CB8] transition-all">
              Выбрать адрес
            </button>
        `;

      // Добавляем попап в контейнер карты
      deliveryMap.container.getElement().parentNode.appendChild(popup);

      // Обработчик клика по маркеру
      customIcon.events.add("click", function () {
        popup.style.display = "block";
      });

      // Обработчик клика по кнопке закрытия
      document
        .getElementById("close-popup")
        .addEventListener("click", function () {
          popup.style.display = "none";
        });
    }
  }
});
