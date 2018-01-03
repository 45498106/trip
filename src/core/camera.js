
export default class Camera extends PIXI.Container {
    constructor() {
        super()
        global.game.stage.addChild(this)

        this.update()
    }

    follow(target) {
        this.target = target
    }

    update() {
        global.game.ticker.add(t => {
            if (this.target) {
                const point = this.toLocal({x: 0, y: 0}, this.target)
                point.x = global.util.view.width * .5 - point.x
                point.y = global.util.view.height * .5 - point.y
                t = 1 - Math.exp(-t / 10)
                this.x = (point.x - this.x) * t + this.x
                this.y = (point.y - this.y) * t + this.y
            }
            this.x > 0 ? this.x = 0 : null
        })
    }
}