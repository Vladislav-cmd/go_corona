// Счетчик для статистики

window.addEventListener('load', windowLoad);

function windowLoad() {
    // Функция инициализации (определение счетчиков и запуск анимации для каждого)
    // если передаваемый параметр существует, то его используем
    function digitsCountersInit(digitsCountersItems) {
        // Если нет элементов для счетчика, то получаем их все в переменную
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
        // если на странице они есть, то есть не пустая переменная, то каждый передаем как параметр в функцию анимации
        if (digitsCounters) {
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }

    // dataset:
    // Чтобы получить data-атрибут можно взять свойство объекта dataset с именем,
    // равным части имени атрибута после data- (в нашем случаем digits-counter)
    // (обратите внимание, что дефисы в имени преобразуются в camelCase). => digitsCounter получим в итоге

    // Функция анимации
    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;
        // Скорость за которую мы перейдем от 0 до конечного значения
        // dataset = получает значение установленного data- атрибута, если же там ничего нет, то устанавливаем значение duration == 1 секунде
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
        // тут получаем значение, то есть цифры
        const startValue = parseInt(digitsCounter.innerHTML);
        // Стартовая позиция от нуля
        const startPosition = 0;
        // Шаг анимации
        const step = (timestamp) => {
            // если startTimestamp ещё == null, то мы приплюсовываем к ней timestamp 
            if (!startTimestamp) startTimestamp = timestamp;
            // высчитываем прогресс анимации:
            // берем минимальное значение  и максимальное значение 1
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // floor - округление в меньшую сторону
            // 0.5 * (0 + 10000) = 5000 (то есть за половину прогресса то есть пол секунды 0.5 уже проскролится до 5000)
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
            // здесь происходит рекурсия то есть вызывается анимационная функция step
            // до тех пор, пока покадровая анимация не дойдет до 1
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Запуск счетчика при загрузке страницы
    // digitsCountersInit();

    // при скролле и запуск анимции при отображении 30% от объекта
    let options = {
        // 30% от объекта должно отоброзиться, чтобы началась анимация счетчика
        threshold: 0.3
    }
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // перезаписываем как бы полученный объект и работаем с ним
                const targetElement = entry.target;
                // из этого объекта получаем все элементы для анимации, содержащие данный атрибут
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter");
                // и если они есть, то вызываем функцию инициализации анимации, передавая эти элементы
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
                // отключить отслеживание после срабатывания
                observer.unobserve(targetElement);
            }
        });
    }, options);

    // получаем все объекты, в которых есть data атрибуты, нужный для анимации
    let sections = document.querySelectorAll('.body-statistics-experts__item');
    if (sections.length) {
        sections.forEach(section => {
            // то передаем в функцию значения каждого объекта
            observer.observe(section);
        });
    }
}
