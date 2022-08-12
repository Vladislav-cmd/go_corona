// плагины для компиляции scss в css
import dartSass from 'sass'; // сам препроцессор sass
import gulpSass from 'gulp-sass'; // и плагин для запуска этого препроцессора
import rename from 'gulp-rename'; // переименователь

import cleanCss from 'gulp-clean-css'; // Сжатие CSS-файла
import webpcss from 'gulp-webpcss'; // Выбор WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов

const sass = gulpSass(dartSass); // делаем вызов с передачей соответствующего компилятора

export const scss = () => {
    // sourcemaps = true - будем собирать файл стилей из множества частей
    // и при возникновении ошибки либо просто в анализе того или иного блока хотим видеть, в каком именно файле написан этот стиль
    // sourcemaps: true нужен только в режиме разработчика, поэтому ставим app.isDev (то есть если dev, то это true)
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded',
        }))
        .pipe( // --- PROD
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe( // --- PROD
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp",
                })
            )
        )
        .pipe( // --- PROD
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true,
                })
            )
        )
        // получить дубль файла стилей, но не сжатый и с исходным расширением
        .pipe(app.gulp.dest(app.path.build.css)) // когда не нужны уже будут эти файлы, то просто закоментировать
        .pipe( // сжимать --- PROD
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: ".min.css",
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}
