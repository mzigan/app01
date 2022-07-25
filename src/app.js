const radius = 20    // радиус молекулы
const speed = 10     // максимальная скорость 
const cnt = 30      // кол-во молекул

let molecules = []  // массив молекул
let width   // ширина холста
let height  // высота холста
let ctx     // контекст холста

// генерация случайного числа в диапазоне
function randomRange(min, max) {
    return Math.random() * (max - min) + min
}

// получаем размеры и контекст холста
function getCanvasData() {
    const canvas = document.getElementById('screen')
    ctx = canvas.getContext('2d')
    width = parseInt(canvas.getAttribute('width'))
    height = parseInt(canvas.getAttribute('height'))

    ctx.fillStyle = 'antiquewhite' // цвет заливки холста
    ctx.strokeStyle = 'blue'        // цвет рисования молекул
    ctx.lineWidth = 1              // толщина пера
}

// инициализация массива молекул со случайными характеристиками
function initMolecules() {
    for (let i = 0; i < cnt; i++) {
        // случайные начальные угол и скорость молекулы
        const angle = randomRange(0, 360) * Math.PI / 180
        const curv = randomRange(1, speed)

        // добавление молекулы в массив
        molecules.push({
            x: randomRange(radius, width - radius),  // случайная начальная координата x
            y: randomRange(radius, height - radius), // случайная начальная координата y
            vx: curv * Math.sin(angle) / 10,         // горизонтальная скорость молекулы
            vy: curv * Math.cos(angle) / 10,         // вертикальная скорость молекулы
        })
    }
}

// отрисовка молекул на холсте 
function render() {
    // стираем с холста старое изображение 
    ctx.fillRect(0, 0, width, height)

    // вычисляем новые характеристики молекул
    for (let m of molecules) {
        // координаты в соответствии с их горизонтальной и вертикальной скоростями
        m.x = m.x + m.vx
        m.y = m.y + m.vy

        // проверка выхода за границы аквариума
        // если есть нарушение границ, то корректировка координат и изменений скорости на противоположную
        // в зависимости от конкретной границы
        if (m.x > width - radius) {  // правая граница
            m.x = width - radius
            m.vx = -m.vx
        }
        if (m.x < radius) {          // левая граница
            m.x = radius
            m.vx = -m.vx
        }
        if (m.y > height - radius) { // нижняя граница
            m.y = height - radius
            m.vy = -m.vy
        }
        if (m.y < radius) {          // верхняя граница
            m.y = radius
            m.vy = -m.vy
        }
    }

    // отрисовка всех полекул в цикле с новыми координатами
    ctx.beginPath()
    for (let m of molecules) { // цикл по молекулам
        ctx.moveTo(m.x + radius, m.y)
        ctx.arc(m.x, m.y, radius, 0, Math.PI * 2, true)  // рисуем окружность
    }
    ctx.stroke()
}

// если вызвать эту функцию, то программа начнёт работать
function run() {
    getCanvasData()  // здесь получаем данные по холсту
    initMolecules()   // здесь инициализируем молекулы

    setInterval(() => render(), 10) // здесь каждые 10 мс вызывается отрисовка холста
}

// запускаем программу после события загрузки документа в электрон, вызывая функцию run
document.addEventListener('DOMContentLoaded', run)
