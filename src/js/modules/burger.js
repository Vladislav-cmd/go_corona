// Функция с фиксацией body для IOS, так как там не работает свойство overflow: hidden
// которое присваивается body через класс lock (в nullstyle)
let burgerButton = document.querySelector('.header__burger-button');
let burgerMenu = document.querySelector('.menu__body');
let mainBody = document.body;
let headerField = document.querySelector('.header');

burgerButton.addEventListener('click', function () {
    var deviceHeight = mainBody.clientHeight;
    var currentCoordValue = coordValue() * (-1) + deviceHeight;

    burgerButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    mainBody.classList.toggle('lock');

    // коррелирует с шапкой (header), если ей не задать fixed, а body присваивать, то шапку перекроет
    mainBody.style.position = 'fixed';
    mainBody.style.top = currentCoordValue + 'px';
    if (!(burgerButton.classList.contains('active'))) {
        mainBody.style.position = '';
        mainBody.style.top = '';
        window.scrollTo(0, (-currentCoordValue));
    }
});
/* -------------------------------------------------------------------------------------------- */
// TODO: чтобы при изменении ширины экрана убирался active у Бургера
window.addEventListener('resize', resizeBurger);
// переменная для того, чтобы код при resize отработала единожды
var isResize = false;
export function resizeBurger() {
    let currentDeviceWidth = window.innerWidth;
    // при включенном бургере и изменить ширину более 768px то произойдет скролл в самое начало страницы
    // не получилось просчитать момент фиксации :(

    if (currentDeviceWidth >= 768 && !isResize) {
        burgerButton.classList.remove('active');
        burgerMenu.classList.remove('active');
        mainBody.classList.remove('lock');
        mainBody.style.position = '';
        mainBody.style.top = '';

        isResize = true;
    } else if (currentDeviceWidth < 768 && isResize) {
        isResize = false;
    }
}
/* -------------------------------------------------------------------------------------------- */
// Добавлять белый фон для header только когда начинаем скролл
window.addEventListener('scroll', function () {
    let windowScrollTop = window.pageYOffset;
    if (windowScrollTop > 1) {
        headerField.style.background = 'var(--header_bar-background)';
    } else {
        headerField.style.background = 'transparent';
    }
});
/* -------------------------------------------------------------------------------------------- */
// Функция для определения координаты body при скролле к нужному попапу (для фиксации body на IOS)
function coordValue() {
    const currentWindowCoord = document.body.getBoundingClientRect().top;
    return currentWindowCoord;
}
/* -------------------------------------------------------------------------------------------- */