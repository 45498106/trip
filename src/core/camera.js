
export default class Camera extends PIXI.Container {
    constructor() {
        super()

        global.game.stage.addChild(this)

        this.update()
    }

    follow(target) {
        this.target = target
    }

    track(t) {
        const point = this.target.getGlobalPosition()
        this.x += ~~(global.util.view.width * .5 - point.x) * t
        this.y += ~~(global.util.view.height * .5 - point.y) * t
    }

    update() {
        global.game.ticker.add(t => {
            this.target && this.track(.1)
            this.x > 0 ? this.x = 0 : null
        })
    }
}