// Находим все объекты, которые будут поддаваться анимации
let animItems = document.querySelectorAll('._anim-items');

// Проверим, существуют ли такие классы, и если да, (так как это массив данных) то выполняем
if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            // В переменную получаем высоту объекта
            const animItemHeight = animItem.offsetHeight;
            // Переменная, в которую получаем позицию элемента относительно верха (с помощью функции из интернета)
            const animItemOffset = offset(animItem).top;
            // Переменна коэффициент, (то есть когда 1/4 части элемента покажется, тогда сработает анимция появления)
            const animStart = 4;

            // ? момент настройки старта анимации:
            // от высоты окна браузера отнимаем высоту объекта, который анимируем, поделенный на коэффициент
            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            // но бывает момент, когда анимированный элемент выше окна браузера, поэтому сделаем проверку:
            // если высота анимированного объекта выше высоты окна браузера, то тогда вычитаем высоту окна браузера, поделенную на коэфф
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            // pageYOffset - возвращает кол-во прокрученных пикселей
            // если мы прокрутили больше, чем позиция объекта - точка старта
            // но прокрутили меньше, чем позиция объекта + его высота, то тогда добавляем к объекту класс
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else { // если не выполняется, то отбираем (у тех, у кого не _anim-no-hide), чтобы могли повторно анимировать объект
                // если нет класса, который "запрещает" повторную анимацию, то тогда и убираем _active
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }

    // Данная функция (из Интернета)
    // позволяет корректно и кроссбраузерно получать значение позиции элемента относительно верха
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    // ! Функция запуска сразу, не дожидаясь скролла для тех элементов, которые видны сразу
    setTimeout(() => {
        animOnScroll();
    }, 300);

}