import * as pixi from 'pixi.js'

export default class Tram {
    constructor() {
        this.body = new pixi.Sprite(global.resource.tram.textures['01.png'])
        this.body.anchor.set(.5)

        this.doors = [
            new pixi.Sprite(global.resource.tram.textures['05.png']),
            new pixi.Sprite(global.resource.tram.textures['05.png'])
        ]
        this.doors[0].anchor.set(.5)
        this.doors[1].anchor.set(.5)

        this.doors[0].position.set(-123, 12)
        this.doors[1].position.set(123, 12)

        this.body.addChild(...this.doors)

        this.axles = [
            new pixi.Sprite(global.resource.tram.textures['03.png']),
            new pixi.Sprite(global.resource.tram.textures['03.png'])
        ]
        this.axles[0].anchor.set(.5)
        this.axles[1].anchor.set(.5)
        this.axles[0].position.set(-130, 82)
        this.axles[1].position.set(130, 82)

        this.wheels = [
            new pixi.Sprite(global.resource.tram.textures['02.png']),
            new pixi.Sprite(global.resource.tram.textures['02.png']),
            new pixi.Sprite(global.resource.tram.textures['02.png']),
            new pixi.Sprite(global.resource.tram.textures['02.png'])
        ]
        this.wheels[0].anchor.set(.5)
        this.wheels[1].anchor.set(.5)
        this.wheels[2].anchor.set(.5)
        this.wheels[3].anchor.set(.5)

        this.wheels[0].position.set(-30, 5)
        this.wheels[2].position.set(-30, 5)
        this.wheels[1].position.set(30, 5)
        this.wheels[3].position.set(30, 5)


        this.axles[0].addChild(this.wheels[0], this.wheels[1])
        this.axles[1].addChild(this.wheels[2], this.wheels[3])

        this.body.addChild(...this.axles)
        global.game.stage.addChild(this.body)

        this.update()
    }

    setPosition(x, y) {
        this.body.position.set(x, y)
        return this
    }

    update() {
        global.game.ticker.add(() => {
            this.wheels.forEach(wheel => {
                wheel.rotation += Math.PI / 30
                wheel.rotation %= global.util.PI2
            })
        })
    }
}

