export default class Random {
    static number(min: number, max: number) {
        const r = Math.random()
        const m = (max - min)
        const res = r * m  + min
        return res
    }

    static color() {
        const r = Math.floor(this.int(0 ,255))
        const g = Math.floor(this.int(0 ,255))
        const b = Math.floor(this.int(0 ,255))
        const c = "rgb(" + r + "," + g + "," + b + ")"
        return c
    }

    static int(min: number, max: number) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
    }
}