// необходим для подключения модулей JS
import webpack from "webpack-stream";

export const js = () => {
    // sourcemaps: true нужен только в режиме разработчика, поэтому ставим app.isDev (то есть если dev, то это true)
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(webpack({
            // если в режиме prod или dev
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js',
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}