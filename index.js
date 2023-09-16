const readline = require('readline');

/**
 * Функция для преобразования RGB цвета в формат Minecraft Bedrock Server Form (от 0 до 1).
 *
 * @param {number} r - Компонент красного цвета (от 0 до 255).
 * @param {number} g - Компонент зеленого цвета (от 0 до 255).
 * @param {number} b - Компонент синего цвета (от 0 до 255).
 * @returns {string[]} - Массив с преобразованными значениями R, G и B в виде строк (округленные до 3 знаков после запятой).
 * @throws {Error} - Если переданные значения r, g и b находятся вне диапазона от 0 до 255.
 */
const RGBtoMCFormColor = (r, g, b) => {
    // Проверка на диапазон значений
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error('Значения r, g и b должны быть в диапазоне от 0 до 255.');
    }
  
    // Преобразование значений RGB цветов в нужный формат и округление до трёх знаков после запятой.
    const MCFR = (r / 255).toFixed(3);
    const MCFG = (g / 255).toFixed(3);
    const MCFB = (b / 255).toFixed(3);
  
    // Возвращение значений в виде массива строк
    return [MCFR, MCFG, MCFB];
}

/**
 * Функция для обратного преобразования цвета из формата Minecraft Bedrock Server Form в формат RGB.
 *
 * @param {number} MCFR - Нормализованное значение компоненты красного цвета (от 0 до 1).
 * @param {number} MCFG - Нормализованное значение компоненты зеленого цвета (от 0 до 1).
 * @param {number} MCFB - Нормализованное значение компоненты синего цвета (от 0 до 1).
 * @returns {number[]} - Массив с целыми значениями R, G и B (от 0 до 255).
 * @throws {Error} - Если переданные нормализованные значения находятся вне диапазона от 0 до 1.
 */
const MCFormColorToRGB = (MCFR, MCFG, MCFB) => {
    // Проверка на диапазон нормализованных значений
    if (MCFR < 0 || MCFR > 1 || MCFG < 0 || MCFG > 1 || MCFB < 0 || MCFB > 1) {
        throw new Error('Нормализованные значения MCFR, MCFG и MCFB должны быть в диапазоне от 0 до 1.');
    }
  
    // Обратное преобразование в целые значения от 0 до 255
    const r = Math.round(MCFR * 255);
    const g = Math.round(MCFG * 255);
    const b = Math.round(MCFB * 255);
  
    // Возвращение целых значений в виде массива
    return [r, g, b];
}

// Использование функции
const normalizedColor = [1, 0.588, 0]; // Пример RGB в MCF цвета
const rgbColor = MCFormColorToRGB(normalizedColor[0], normalizedColor[1], normalizedColor[2]);
console.log('RGB цвет:', rgbColor);


const rl = readline.createInterface({
    input: process.stdin,   // входной поток как стандартный ввод
    output: process.stdout  // выходной поток как стандартный вывод
});

rl.question('Введите цвет в формате RGB (например, 255, 150, 0): ', (input) => {
    // Разбивка введенную строку на массив, разделенный запятой, и преобразуем его в числа
    const rgbArray = input.split(',').map(Number);

    // Проверка того, что введены 3 числа и они являются числами собстна
    if (rgbArray.length !== 3 || isNaN(rgbArray[0]) || isNaN(rgbArray[1]) || isNaN(rgbArray[2])) {
        console.log('Неверный формат ввода. Пожалуйста, введите цвет в формате "R, G, B".');
    } else {
        // Если введенные значения корректны, вызов функции RGBtoMCFormColor для преобразования
        const normalizedColor = RGBtoMCFormColor(rgbArray[0], rgbArray[1], rgbArray[2]);
        console.log('Нормализованный цвет:', normalizedColor);
    }

    // Закрытие интерфейса ввода-вывода после завершения
    rl.close();
});