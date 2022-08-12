import replace from "gulp-replace"; // Поиск и замена
import plumber from "gulp-plumber"; // Обработка ошибок
import notify from "gulp-notify"; // Сообщения (подсказки)
import browsersync from "browser-sync"; // Локальный сервер
// Проверка обновлений (обновилась ли картинка действительно) обратобка только тех картинок, что нет в папке с рузультатом
import newer from "gulp-newer"; // Проверка обновлений
import ifPlugin from "gulp-if"; // Условное ветвтелние

// После установки плагина создадим объект, в который будем собираться плагины
export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer,
    if: ifPlugin,
}