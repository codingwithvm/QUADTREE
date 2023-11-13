import Point from "./Point"
import Rectangle from "./Rectangle"

export default class Canvas {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    mousepos: Point | undefined
    onMouseClick?: any

    constructor() {
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement

        if (!this.canvas) {
            this.canvas = document.createElement("canvas")
            document.body.appendChild(this.canvas)
            this.canvas.width = 800
            this.canvas.height = 600
            this.canvas.style.border = "1px solid black"
        }

        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D
        this.canvas.addEventListener("click", e => {this.mouseclick(e)})
    }

    mouseclick(e: MouseEvent) {
        this.mousepos = new Point(e.clientX, e.clientY)
        if(this.onMouseClick) this.onMouseClick(this.mousepos)
    }

    clear(color: string) {
        if (!color) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        else {
            this.ctx.fillStyle = color
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }
    }

    rectangle(r: Rectangle, color: string, weight?: number) {
        this.ctx.lineWidth = weight || 1
        this.ctx.strokeStyle = color
        this.ctx.strokeRect(r.x, r.y, r.w, r.h)
    }

    point(p: Point, color: string, weight: number) {
        this.ctx.fillStyle = color
        const w = weight || 1
        let x = p.x
        let y = p.y
        if (w > 1) {
            const m = w / 2
            x -= m
            y -= m
        }
        this.ctx.fillRect(x, y, w, w)
    }

    line(x1: number, y1: number, x2: number, y2: number, color?: string) {
        this.ctx.strokeStyle = color || "white"
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }
}