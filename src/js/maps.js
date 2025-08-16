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
                    <img src="https://example.com/path/to/image.jpg" alt="Описание места">
                    <h3>Интересное место</h3>
                    <p>Это описание нашего интересного места. Здесь может быть любой текст, который вы хотите показать пользователям при клике на метку.</p>
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
});
