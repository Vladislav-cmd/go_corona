import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.newer(app.path.build.images)) // обрабатывать только те, которых там нет
        // оптимизация картинок занимает время и не нужно в режиме разработки, поэтому тоже условное ветвление
        .pipe( // преобразовываем изображения --- PROD
            app.plugins.if(
                app.isBuild,
                webp()
            )
        )
        .pipe( // обработанные оказались в папке с результатом --- PROD
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images)
            )
        )
        .pipe( // опять получить доступ к исходниками --- PROD
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images)
            )
        )
        .pipe( // и проверить на обновление, обновились ли --- PROD
            app.plugins.if(
                app.isBuild,
                app.plugins.newer(app.path.build.images)
            )
        )
        .pipe( // для сжатия картинок --- PROD
            app.plugins.if(
                app.isBuild,
                imagemin({ // для сжатия картинок 
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3 // 0 to 7 - насколько сильно сжимать изображения
                })
            )
        )

        .pipe(app.gulp.dest(app.path.build.images)) // выгружаем оптимизированные картинки в папку с результатом
        .pipe(app.gulp.src(app.path.src.svg)) // получаем доступ к svg изображениям
        .pipe(app.gulp.dest(app.path.build.images)) // и просто копируем их в папку с результатом images
        .pipe(app.plugins.browsersync.stream()); // обновляем браузер
}