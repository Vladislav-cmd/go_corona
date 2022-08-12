"use strict"
// НЕОБХОДИМО АКТИВИРОВАТЬ СТРОГИЙ РЕЖИМ "use strict" в самом верху кода, так как по умолчанию в ES он отключен
// чтобы старый код адекватно работал по умолчанию некоторые функции выключены и для того, чтобы их использовать нужно
// явно их включить записью "use strict"
// (необязательно в при использовании GULP?)

// Как только страница загружается, то вызываем функцию windowLoad
window.addEventListener("load", windowLoad);

function windowLoad() {
    // получаем HTML блок
    const htmlBlock = document.documentElement;

    // Получаем выбранную тему пользователем на сайте, то есть его выбор сохраниться в браузера в локальном хранилище
    // это веб-хранилища, находящиеся в браузере пользователя и предназначенные для хранения данных
    const saveUserTheme = localStorage.getItem('user-theme'); // получим либо dark, либо light

    // Работа с системными настройками
    let userTheme;
    // Интерфейс в глобальной области видимости window.matchMedia,
    // который позволяет получить доступ к медиавыражениям из JavaScript и подписываться на их срабатывание.
    if (window.matchMedia) {
        // Записываем переменную значение по условному оператору, исходя из того, какой цвет системы у пользователя
        // если совпадает dark, то оставляем, если нет, то ставим light
        userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    // если же стоит dark и вешаем обработчик изменения при переключение системных настроек
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // если нет сохраненной темы как в веб-хранилище, то обращаемся к функции изменения темы
        !saveUserTheme ? changeTheme() : null;
    });

    // Изменение темы по клику
    const themeButton = document.querySelector('.button__change-theme');
    const resetButton = document.querySelector('.button__reset-theme');
    // если есть кнопка изменения темы, то вешаем на неё обработчик
    if (themeButton) {
        themeButton.addEventListener("click", function (e) {
            resetButton.classList.add('active');
            changeTheme(true);
        });
    }
    if (resetButton) {
        resetButton.addEventListener("click", function (e) {
            resetButton.classList.remove('active');
            // обнуляем значение ключа темы в веб-хранилище
            localStorage.setItem('user-theme', '');
        });
    }

    // Функция добавления класса темы
    function setThemeClass() {
        // Если пользователь уже нажимал на кнопку изменения темы, то работаем с ней
        if (saveUserTheme) {
            htmlBlock.classList.add(saveUserTheme); // к html добавляется либо .dark, либо .light
            resetButton.classList.add('active');
        } else {
            htmlBlock.classList.add(userTheme); // или же системную тему добавляем
        }
    }
    // Добавляем класс темы (вызываем функцию)
    setThemeClass();

    // Функция изменения темы
    function changeTheme(saveTheme = false) {
        let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
        let newTheme;

        if (currentTheme === 'light') {
            newTheme = 'dark';
        } else if (currentTheme === 'dark') {
            newTheme = 'light';
        }
        htmlBlock.classList.remove(currentTheme);
        htmlBlock.classList.add(newTheme);
        saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
    }
}