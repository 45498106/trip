
export default class Tram extends PIXI.Sprite {
    constructor(...args) {
        super(...args)

        this.speed = 8
        this.velocity = 0
        this.acceleration = 0

        this.anchor.set(.5)

        this.doors = [
            new PIXI.Sprite(global.resource.tram.textures['05.png']),
            new PIXI.Sprite(global.resource.tram.textures['05.png'])
        ]
        this.doors[0].anchor.set(.5)
        this.doors[1].anchor.set(.5)

        this.doors[0].position.set(-123, 12)
        this.doors[1].position.set(123, 12)

        this.addChild(...this.doors)

        this.axles = [
            new PIXI.Sprite(global.resource.tram.textures['03.png']),
            new PIXI.Sprite(global.resource.tram.textures['03.png'])
        ]
        this.axles[0].anchor.set(.5)
        this.axles[1].anchor.set(.5)
        this.axles[0].position.set(-130, 82)
        this.axles[1].position.set(130, 82)

        this.wheels = [
            new PIXI.Sprite(global.resource.tram.textures['02.png']),
            new PIXI.Sprite(global.resource.tram.textures['02.png']),
            new PIXI.Sprite(global.resource.tram.textures['02.png']),
            new PIXI.Sprite(global.resource.tram.textures['02.png'])
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

        this.addChild(...this.axles)
        this.update()
        this.listen()
    }

    update() {
        global.game.ticker.add(() => {
            this.wheels.forEach(wheel => {
                if (this.velocity > 0) wheel.rotation += Math.PI / 30
                if (this.velocity < 0) wheel.rotation -= Math.PI / 30
                wheel.rotation %= global.util.PI2
            })

            this.x += this.velocity

            if (this === global.camera.target) global.camera.track()

        })
    }

    listen() {
        window.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case 37: {
                    this.velocity = -this.speed
                    break
                }

                case 39: {
                    this.velocity = this.speed
                    break
                }
            }
        })

        window.addEventListener('keyup', event => {
            switch (event.keyCode) {
                case 37: {
                    // this.acceleration = .1
                    this.velocity = 0
                    break
                }

                case 39: {
                    // this.acceleration = -.1
                    this.velocity = 0
                    break
                }

            }
        })

        global.game.stage.interactive = true
        global.game.stage
            .on('pointerdown', event => {
                if (event.data.global.x > global.game.view.width >> 1) {
                    this.velocity = this.speed
                } else {
                    this.velocity = -this.speed
                }
            })
            .on('pointerup', event => {
                this.velocity = 0
            })
    }
}

