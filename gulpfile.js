// Основной модуль (сам галп из пакета галпа)
import gulp from "gulp";
// Импорт путей (константу пути, которую создали в файле path.js)
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
    // для определения режима
    isBuild: process.argv.includes('--build'), // - prod
    isDev: !process.argv.includes('--build'), // - dev
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// Импорт задачи
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { videos } from "./gulp/tasks/videos.js";

function watcher() {
    // 1 - пусть к файлам, за которыми нужно следить
    // 2 - действие, которое нужно выполнить
    // если необходимо при любом изменении файлов, чтобы они попадали сразу на FTP, то приписать так:
    gulp.watch(path.watch.files, copy); // вместо copy писать gulp.series(copy, ftp)
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}
// сразу же задачу экспортируем, так как хотим отдельно запускать эту задачу
// и возможно потребуется всего лишь один раз, когда подготовим все иконки 
export { svgSprive }

// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Так как сценарии все сложнее и сложнее, то выносим в отдельную константу
// параллельное выполнение
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, videos));

// Построение сценариев выполнения задач
// метод series - выполнение задач последовательно
// сперва очищаем папку, параллельно копируем файлы (в верхней константе копирование из папки files и html файлы) и потом включится наблюдатель
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
// Содержит только те задачи, которые нужны в режиме prod
const build = gulp.series(reset, mainTasks);
// Сценарий для создания архива с результатом
const deployZIP = gulp.series(reset, mainTasks, zip);
// Сценарий для передачи результата на FTP
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Экспорт сценариев для запуска через npm run (чтобы их было видно извне)
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Чтобы выполнить команду copy нужно указать задачу временно как задачу по умолчанию
// Выполнение сценария по умолчанию
gulp.task('default', dev);
