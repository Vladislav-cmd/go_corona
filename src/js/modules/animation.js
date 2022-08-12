const scrollToVideoButton = document.querySelector('.video-get-started');

// Проверка, чтобы не было сбоя при подключении app.js в другие страницы
if (scrollToVideoButton != null) {
    scrollToVideoButton.addEventListener('click', scrollToVideo);
}

function scrollToVideo() {
    const videoBlock = document.querySelector('.experts__video');
    //  прокрученные пиксели в отрицательном значении
    let windowScrollValue = document.body.getBoundingClientRect().top;
    // Высота блока видео
    let videoBlockHeight = videoBlock.offsetHeight;
    // Координаты блока видео
    let videoBlockCoord = videoBlock.getBoundingClientRect();
    let scrollToVideo = videoBlockCoord.top - videoBlockHeight - windowScrollValue;

    window.scrollTo({
        top: scrollToVideo,
        left: 0,
        behavior: "smooth",
    });

    // Какой-то баг в шапке, первый блок почему-то съезжает вверх, это из-за прикрученной
    // анимации появления блоков?
    // videoBlock.scrollIntoView({
    //     block: "center",
    //     behavior: "smooth",
    // });
}
