
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
                const point = this.target.getGlobalPosition()
                point.x = ~~(global.util.view.width * .5 - point.x)
                point.y = ~~(global.util.view.height * .5 - point.y)
                t =  1 - Math.exp(-t / 5)
                this.x += point.x * t
                this.y += point.y * t
            }
            this.x > 0 ? this.x = 0 : null
        })
    }
}