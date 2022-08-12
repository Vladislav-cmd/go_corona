// Получаем имя папки проекта
// так как мы переключились в файле package.json на type = module, то теперь мы можем подключать модули
// с помощью синтаксиса ES6
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

// путь к папке с результатом
// эта папка будет создаваться автоматически в процессе действия GULP
const buildFolder = `./dist`;
// путь к папке с исходниками
const srcFolder = `./src`;

// Общий объект path, где будет храниться информация о пути к тому или иному файлу папки
// чтобы эти пути могли использовать из других файлов эту константу нужно экспортировать
export const path = {
    build: { // указываются пути к файлам и папкам
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        files: `${buildFolder}/files/`,
        videos: `${buildFolder}/videos/`,
    },
    src: { // указываются пути к файлам и папкам (которые будут переноситься в папку с результатом)
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,ico}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss: `${srcFolder}/scss/*.scss`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        svgicons: `${srcFolder}/svgicons/*.svg`,
        videos: `${srcFolder}/videos/**/*.*`,
    },
    watch: { // указываются пути к файлам и папкам, за которыми GULP должен следить и при любых изменениях выполнять определённые действия
        js: `${srcFolder}/js/**/*.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.*`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp,ico}`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buildFolder, // то есть очищать папку с результатом при каждой новой компиляции
    buildFolder: buildFolder, // папка с результатом
    srcFolder: srcFolder, // папка с исходниками
    rootFolder: rootFolder, // название текущей папки проекта
    ftp: `test`, // тут мы сможем указывать папку на удаленном ftp server (в неё зальется папка с текущим проектом)
}