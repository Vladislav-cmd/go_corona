import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util'; // плагин для логов

export const ftp = () => {
    configFTP.log = util.log;
    // Создаем подключение к FTP
    const ftpConnect = vinylFTP.create(configFTP);
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FTP",
                message: "Error: <%= error.message %>"
            })
        ))
        // результат на FTP в уже названной папки проекта
        .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}