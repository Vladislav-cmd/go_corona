// плагин для сборки html файлов
import fileInclude from "gulp-file-include";
// плагин для обработки svg картинок в webp, на всех подряд
import webpHtmlNosvg from "gulp-webp-html-nosvg";
// плагин позволит избежать ситуацию с кешированием, добавляет к файлам стилей и js определенный ключ
// который не позволяет их кешировать в браузере
import versionNumber from "gulp-version-number";

// аналог задачи copy
export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fileInclude())
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpHtmlNosvg()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}