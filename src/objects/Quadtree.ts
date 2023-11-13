import Canvas from "./Canvas"
import Point from "./Point"
import Rectangle from "./Rectangle"

export default class Quadtree {
    capacity: number
    boundery: Rectangle
    points: Point[]
    topleft: Quadtree | undefined
    topright: Quadtree | undefined
    bottomleft: Quadtree | undefined
    bottomright: Quadtree | undefined

    constructor(capacity: number, boundery: Rectangle) {
        this.capacity = capacity
        this.boundery = boundery
        this.points = []
    }

    add(p: Point) {
        if (!this.boundery.contains(p)) return false
        if (this.points.length < this.capacity) {
            this.points.push(p)
            return true
        }
        if (!this.topleft) this.divide()

        const result: any =
            this.topleft?.add(p) ||
            this.topright?.add(p) ||
            this.bottomleft?.add(p) ||
            this.bottomright?.add(p)

        return result
    }

    divide() {
        const width = this.boundery.w / 2
        const height = this.boundery.h / 2

        this.topleft = new Quadtree(this.capacity, new Rectangle(this.boundery.x, this.boundery.y, width, height))
        this.topright = new Quadtree(this.capacity, new Rectangle(this.boundery.x + width, this.boundery.y, width, height))
        this.bottomleft = new Quadtree(this.capacity, new Rectangle(this.boundery.x, this.boundery.y + height, width, height))
        this.bottomright = new Quadtree(this.capacity, new Rectangle(this.boundery.x + width, this.boundery.y + height, width, height))
    }

    query(range: Rectangle) {
        let found: Point[] = []
        if (this.boundery.intersects(range)) {
            this.points.forEach(p => {
                if (range.contains(p)) found.push(p)
            })
            if(this.topleft) {
                found = found.concat(this.topleft.query(range))     
                found = found.concat(this.topright!.query(range))     
                found = found.concat(this.bottomleft!.query(range))     
                found = found.concat(this.bottomright!.query(range))     
            }
        }

        return found
    }

    draw(canvas: Canvas) {
        // canvas.clear("black")
        canvas.rectangle(this.boundery, "white")
        this.points.forEach(p => {
            canvas.point(p, "white", 4)
        })

        if (this.topleft) {
            this.topleft.draw(canvas)
            this.topright?.draw(canvas)
            this.bottomleft?.draw(canvas)
            this.bottomright?.draw(canvas)
        }
    }
}