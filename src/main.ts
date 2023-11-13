import Quadtree from "./objects/Quadtree"
import Rectangle from "./objects/Rectangle"
import Canvas from "./objects/Canvas"
import Point from "./objects/Point"
import Random from "./Random"

const ca = new Canvas()
const points: Point[] = []

for (let i = 1; i < 1000; i++) {
    const x = Random.int(0, ca.canvas.width)
    const y = Random.int(0, ca.canvas.height)
    const p = new Point(x, y)
    points.push(p)
}

function canvasMouseClick(mp: Point) {
    const r = new Rectangle(mp.x, mp.y, 150, 150)
    ca.clear('black')
    qt.draw(ca)
    ca.rectangle(r, "green", 2)
    const qtPoints = qt.query(r)
    qtPoints.forEach(p => {
        if (r.contains(p)) ca.point(p, "red", 2)
    })
}

ca.onMouseClick = canvasMouseClick

const rect = new Rectangle(0, 0, ca.canvas.width, ca.canvas.height)
const distance = 20

let qt: Quadtree

function update() {
    qt = new Quadtree(4, rect)
    points.forEach(p => {
        p.x += Random.number(-2, 2)
        p.y -= Random.number(-2, 2)
        qt.add(p)
    })
}

function render() {
    ca.clear('black')
    qt.draw(ca)
    const t = Date.now()
    // lines()
    linesQt()
    const rt = Date.now() - t
    // console.log(rt)
}

function linesQt() {
    points.forEach(p => {
        const r = new Rectangle(p.x - distance, p.y - distance, distance * 2, distance * 2)
        const qtpoints = qt.query(r)
        qtpoints.forEach(qp => {
            if (qp !== p) {
                checkLine(p, qp)
            }
        })
    })
}

function lines() {
    for (let i = 0; i < points.length - 1; i++) {
        const a = points[i]
        for (let c = i + 1; c < points.length; c++) {
            const b = points[c]
            checkLine(a, b)
        }
    }
}

function checkLine(a: Point, b: Point) {
    const x = a.x - b.x
    const y = a.y - b.y
    const h = Math.hypot(x, y)

    if (h <= distance) {
        ca.line(a.x, a.y, b.x, b.y, "yellow")
    }
}

function execute() {
    update()
    render()

    requestAnimationFrame(execute)
}

requestAnimationFrame(execute)
