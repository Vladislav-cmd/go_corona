import del from "del";
import zipPlugin from "gulp-zip"; // Для создания Zip-архива

export const zip = () => {
    // удаляем имеющийся zip-архив
    del(`./${app.path.rootFolder}.zip`);
    // получаем папку с результатом и всеми файлами
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "ZIP",
                message: "Error: <%= error.message %>"
            })
        ))
        // получаем имя корневой папки и создаем архив
        .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
        // выводим результат в корень
        .pipe(app.gulp.dest('./'));
}