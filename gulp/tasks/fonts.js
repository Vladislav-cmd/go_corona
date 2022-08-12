import fs from 'fs'; // плагин нод, работает с файловой системой (уже установлен)
import fonter from 'gulp-fonter'; // плагин позволит преобразовать шрифты из формата otf в ttf и woff
import ttf2woff2 from 'gulp-ttf2woff2'; // плагин сделает остальное
// в результате получим 2 вида шрифтов, они самые оптимизированные

export const otfToTtf = () => {
    // Ищем файлы шрифтов .otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        // Конвертируем в .ttf
        .pipe(fonter({
            formats: ['ttf'],
        }))
        // Выгружаем в исходную папку
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
    // Ищем файлы шрифтов .ttf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        // Конвертируем в .woff
        .pipe(fonter({
            formats: ['woff'],
        }))
        // Выгружаем в папку с результатом
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        // Ищем файлы шрифтов .ttf
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        // Конвертируем в .woff2
        .pipe(ttf2woff2())
        // Выгружаем в папку с результатом
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));
}

// задача записывает подключение файлов шрифтов в файл стилей
// весь код записи файла работает, когда файла не существует, поэтому если нужно добавить шрифты или ещё что, то надо удалить файл fonts.scss
// такая конструкция для того, что если надо будет там вносить правки, то чтобы gulp не перезаписывал файл, такая фича
export const fontsStyle = () => {
    // Файл стилей подключения шрифтов
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    // Проверяем, существуют ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // Проверяем существует ли файл стилей для подключения шрифтов
            if (!fs.existsSync(fontsFile)) {
                // Если файла нет, создаем его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    // Записываем подключения шрифтов в файл стилей
                    let fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900;
                        } else { // если же не распознаем его название, то дефолтный 400, который сможем поменять
                            fontWeight = 400;
                        }
                        // Формируем код подключения
                        fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                // если файл есть, выводим сообщение
                console.log("Файл scss/fonts.scss уже существует. Для обновления нужно его удалить!");
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}
