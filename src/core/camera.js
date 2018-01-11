const
    {max, abs} = Math,
    delta = .15



export default class Camera extends PIXI.Container {
    constructor() {
        super()

        // distance
        this.distance = {
            step: 5,
            now: {x: 0, y: 0},
            end: {x: 0, y: 0}
        }

        this.delta = delta
        this.targetLastPosition = {x: 0, y: 0}

        global.game.stage.addChild(this)

        this.update()
    }

    follow(target) {
        this.distance.end.x = 0
        this.distance.end.y = 0
        this.target = target
    }

    unfollow() {
        this.target = null
    }

    setDistance(x, y) {
        x = Number.isFinite(x) ? x : this.distance.end.x
        y = Number.isFinite(y) ? y : this.distance.end.y
        this.distance.end.x = x
        this.distance.end.y = y
    }

    track() {
        const
            point = this.target.getGlobalPosition(),
            hw = global.game.view.width * .5 + this.distance.now.x,
            hh = global.game.view.height * .5 + this.distance.now.y

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

            // 距离跟随
            {
                const {now, end, step} = this.distance

                if (now.x < end.x) {
                    now.x += step
                    now.x > end.x ? now.x = end.x : null
                } else if (now.x > end.x) {
                    now.x -= step
                    now.x < end.x ? now.x = end.x : null
                }

                if (now.y < end.y) {
                    now.y += step
                    now.y > end.y ? now.y = end.y : null
                } else if (now.y > end.y) {
                    now.y -= step
                    now.y < end.y ? now.y = end.y : null
                }

            }
        })
    }

    listen() {
        window.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case 37: {
                    this.x += 8
                    break
                }

                case 39: {
                    this.x -= 8
                    break
                }

                case 38: {
                    this.y += 8
                    break
                }

                case 40: {
                    this.y -= 8
                    break
                }
            }
        })
    }
}