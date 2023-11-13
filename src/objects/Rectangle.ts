import Point from "./Point"

export default class Rectangle {
    x: number
    y: number
    w: number
    h: number

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    contains(p: Point) {
        return (
            p.x >= this.x &&
            p.x <= this.x + this.w &&
            p.y >= this.y &&
            p.y <= this.y + this.h
        )
    }

    intersects(r: Rectangle) {
        return Rectangle.intersects(this, r)
    }

    static intersects(a: Rectangle, b: Rectangle) {
        const centerA = new Point(a.x + a.w / 2, a.y + a.h / 2)
        const centerB = new Point(b.x + b.w / 2, b.y + b.h / 2)

        const difX = Math.abs(centerA.x - centerB.x)
        const difY = Math.abs(centerA.y - centerA.y)

        const dx = a.w / 2 + b.w / 2
        const dy = a.h / 2 + b.h / 2

        return (difX <= dx && difY <= dy)
    }
}