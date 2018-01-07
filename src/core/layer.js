import * as config from '../ui/config.js'

export default class Layer extends PIXI.Container {
    constructor() {
        super()

        this.layers = [
            new PIXI.Container(),
            new PIXI.Container(),
            new PIXI.Container()
        ]

        //
        this.setup()

        this.addChild(...this.layers)

        this.update()
    }

    setup() {
        const
            {background, foreground} = config.init(),
            cmp = (a, b) => b.z - a.z

        background.sort(cmp).forEach(item => {
            const sprite = new PIXI.Sprite(item.texture)
            sprite.alpha = item.alpha
            sprite.config = item
            sprite.position.set(item.x, item.y)
            sprite.scale.set(item.scale)
            item.drag && sprite.drag()
            this.layers[0].addChild(sprite)
        })

        foreground.sort(cmp).forEach(item => {
            const sprite = new PIXI.Sprite(item.texture)
            sprite.alpha = item.alpha
            sprite.config = item
            sprite.position.set(item.x, item.y)
            sprite.scale.set(item.scale)
            item.drag && sprite.drag()
            this.layers[2].addChild(sprite)
        })
    }

    update() {
        global.game.ticker.add(() => {
            const
                hw = global.game.view.width * .5,
                hh = global.game.view.height * .5

            this.layers[0].children.forEach(child => {
                if (!child.config.drag) {
                    const point = child.getGlobalPosition()
                    child.x = child.config.x + (hw - point.x) * Math.exp(-25 / child.config.z)
                }
            })
        })
    }
}