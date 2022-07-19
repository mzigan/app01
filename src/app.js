const radius = 10
const speed = 30
const cnt = 30
const moleculs = []

let curv
let angle
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
            vx: curv * Math.sin(angle) / 10,
            vy: curv * Math.cos(angle) / 10,
        })
    }
}

function render() {
    ctx.beginPath()
    ctx.strokeStyle = 'antiquewhite'
    ctx.lineWidth = 5
    for (let m of moleculs) {
        ctx.moveTo(m.x + radius, m.y)
        ctx.arc(m.x, m.y, radius, 0, Math.PI * 2, true)
    }
    ctx.stroke()

    for (let m of moleculs) {
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
    }
    
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 1
    for (let m of moleculs) {
        ctx.moveTo(m.x + radius, m.y)
        ctx.arc(m.x, m.y, radius, 0, Math.PI * 2, true)
    }
    ctx.stroke()
}

function run() {
    initCanvas()
    initMoleculs()
    setInterval(() => render(), 10)
}

document.addEventListener('DOMContentLoaded', run)
