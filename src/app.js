const radius = 10
const speed = 7
const cnt = 30
const curv = 0
const angle = 0
const moleculs = []

let width
let height
let ctx

function randomRange(min, max) {
    return Math.random() * (max - min) + min
}

function initCanvas() {
    const canvas = document.getElementById('screen')
    ctx = canvas.getContext('2d')
    width = parseInt(canvas.getAttribute('width'))
    height = parseInt(canvas.getAttribute('height'))
}

function initMoleculs() {
    for (let i = 0; i < cnt; i++) {
        angle = randomRange(0, 360) * Math.PI / 180
        curv = randomRange(1, speed)

        moleculs.push({
            x: randomRange(radius, width - radius),
            y: randomRange(radius, height - radius),
            vx: Math.round(curv * Math.sin(angle)),
            vy: Math.round(curv * Math.cos(angle)),
        })
    }
}

function render() {
    ctx.beginPath()
    ctx.strokeStyle = 'antiquewhite'
    for (let m of moleculs) {
        ctx.arc(m.x, m.y, radius, 0, Math.PI * 2, true)
    }
    ctx.stroke()

    m.x = m.x + m.vx
    m.y = m.y + m.vy

    if (m.x > width - radius) {
        m.x = width - radius
        m.vx = -m.vx
    }
    if (m.x < radius) {
        m.x = radius
        m.vx = -m.vx
    }
    if (m.y > height - radius) {
        m.y = height - radius
        m.vy = -m.vy
    }
    if (m.y < radius) {
        m.y = radius
        m.vy = -m.vy
    }

    ctx.beginPath()
    ctx.strokeStyle = 'red'
    for (let m of moleculs) {
        ctx.arc(m.x, m.y, radius, 0, Math.PI * 2, true)
    }
    ctx.stroke()
}

function run() {
    initCanvas()
    initMoleculs()
    setInterval(() => render(), 100)
}

window.onload(() => run())
