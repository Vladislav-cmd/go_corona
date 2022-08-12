export const videos = () => {
    // файл получен и теперь необходимо действие
    return app.gulp.src(app.path.src.videos) // получили файлы
        // дейсвтие:
        .pipe(app.gulp.dest(app.path.build.videos)) // перенесли файлы
}
