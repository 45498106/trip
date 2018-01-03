
export default class Camera extends PIXI.Container {
    constructor() {
        super()

        global.game.stage.addChild(this)

        this.update()
    }

    follow(target) {
        this.target = target
    }

    track() {
        const point = this.target.getGlobalPosition()
        point.x = ~~(global.util.view.width * .5 - point.x)
        point.y = ~~(global.util.view.height * .5 - point.y)
        this.x += point.x
        this.y += point.y
    }

    update() {
        global.game.ticker.add(t => {
            this.target && this.track()
            this.x > 0 ? this.x = 0 : null
        })
    }
}