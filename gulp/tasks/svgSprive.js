import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(svgSprite({
            mode: {
                stack: {
                    // Готовый sprite создастся в папке img/icons/icons.svg
                    sprite: `../icons/icons.svg`,
                    // Создавать страницу с перечнем иконок (html файл с превью всех иконок и как их подключать)
                    example: true,
                }
            },
        }))
        // Выгружаем в папку с картинками
        .pipe(app.gulp.dest(`${app.path.build.images}`));
}