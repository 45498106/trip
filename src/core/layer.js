import * as scenes from '../scenes/index.js'
import Road from './road.js'

export default class Layer extends PIXI.Container {
    constructor() {
        super()

        this.layers = [
            new PIXI.Container(),
            new PIXI.Container(),
            new PIXI.Container()
        ]

        this.addChild(...this.layers)
        // this.layers[2].visible = false
        this.setup()
        this.update()

        /* 绘制路径 */
        this.layers[2].addChild(new Road(scenes.road.tram))
    }

    setup() {
        const
            {background, foreground} = scenes.init(),
            cmp = (a, b) => a.z - b.z,
            _this = this

        background.sort(cmp).forEach(item => {
            const child = fit(item)
            child && this.layers[0].addChild(child)
        })
        foreground.sort(cmp).forEach(item => {
            const child = fit(item)
            child && this.layers[2].addChild(child)
        })

        function fit(item) {
            let display
            if (item.display) {
                display = item.display
            } else if (item.texture) {
                display = new PIXI.Sprite(item.texture)
            } else return null

            display.config = item
            display.alpha = item.alpha
            display.rotation = item.rotation
            display.position.set(item.x, item.y)
            display.scale.set(item.scale.x, item.scale.y)
            item.drag && display.drag()
            // display.drag()

            return display
        }
    }

    update() {
        global.game.ticker.add(() => {
            const
                hw = global.game.view.width * .5,
                hh = global.game.view.height * .5

            this.layers[0].children.forEach(child => {
                if (child.config && !child.config.drag) {
                    const point = child.getGlobalPosition()
                    child.x = child.config.x + (hw - point.x) *
                        (child.config.z < 0 ? Math.exp(25 / child.config.z) : 0)
                }
            })
        })
    }
}