const
    {max, abs} = Math,
    delta = .15



export default class Camera extends PIXI.Container {
    constructor() {
        super()

        this.distance = {x: 0, y: 0}
        this.delta = delta
        this.targetLastPosition = {x: 0, y: 0}

        global.game.stage.addChild(this)

        this.update()
    }

    follow(target) {
        this.distance.x =
        this.distance.y = 0
        this.target = target
    }

    unfollow() {
        this.target = null
    }

    setDistance(x, y) {
        this.distance.x = x === undefined ? this.distance.x : x
        this.distance.y = y === undefined ? this.distance.y : y
    }

    track() {
        const
            point = this.target.getGlobalPosition(),
            hw = global.game.view.width * .5 + this.distance.x,
            hh = global.game.view.height * .5 + this.distance.y

        point.x = ~~(hw - point.x)
        point.y = ~~(hh - point.y)


        if (this.targetLastPosition.x === this.target.x &&
            this.targetLastPosition.y === this.target.y) {
            this.delta = delta
        } else {
            this.delta = +max(
                abs(point.x / hw),
                abs(point.y / hh),
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