const {max, abs} = Math

export default class Camera extends PIXI.Container {
    constructor() {
        super()

        this.delta = .15
        this.targetLastPosition = {x: 0, y: 0}

        global.game.stage.addChild(this)

        this.update()
    }

    follow(target) {
        this.target = target
    }

    track() {
        const
            point = this.target.getGlobalPosition(),
            hw = global.game.view.width * .5,
            hh = global.game.view.height * .5

        point.x = ~~(hw - point.x)
        point.y = ~~(hh - point.y)

        if (this.targetLastPosition.x === this.target.x &&
            this.targetLastPosition.y === this.target.y) {
            this.delta = .15
        } else {
            this.delta = +max(
                abs(point.x / hw * .6),
                abs(point.y / hh * .6),
                this.delta
            ).toFixed(2)
        }

        this.targetLastPosition.x = this.target.x
        this.targetLastPosition.y = this.target.y

        this.delta > .8 ? this.delta = .8 : null

        this.x += point.x * this.delta
        this.y += point.y * this.delta

    }

    update() {
        global.game.ticker.add(() => {
            this.target && this.track()
            this.x > 0 ? this.x = 0 : null
        })
    }
}