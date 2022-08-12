// Подключаем плагин del (который устанавливаем через bash: npm i -D del)
import del from "del";
export const reset = () => {
    // указываем что удалять через глобальную переменную, как раз папка с результатом
    return del(app.path.clean)
}