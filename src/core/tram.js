export default class Tram extends PIXI.Sprite {
    constructor(...args) {
        const shape = global.resource.tramShape.data.bodies

        super(...args)

        this.speed = 5
        this.velocity = 0
        this.acceleration = 0

        this.position.set(1600, 100)


        this.doors = [
            new PIXI.Sprite(global.resource.tram.textures['tram.6.png']),
            new PIXI.Sprite(global.resource.tram.textures['tram.6.png'])
        ]
        this.doors[0].anchor.set(.5)
        this.doors[1].anchor.set(.5)

        this.doors[0].position.set(-123, 12)
        this.doors[1].position.set(123, 12)


        this.axles = [
            new PIXI.Sprite(global.resource.tram.textures['tram.3.png']),
            new PIXI.Sprite(global.resource.tram.textures['tram.3.png'])
        ]
        this.axles[0].anchor.set(.5)
        this.axles[1].anchor.set(.5)
        this.axles[0].position.set(-130, 82)
        this.axles[1].position.set(130, 82)

        this.wheels = [
            new PIXI.Sprite(global.resource.tram.textures['tram.2.png']),
            new PIXI.Sprite(global.resource.tram.textures['tram.2.png']),
            new PIXI.Sprite(global.resource.tram.textures['tram.2.png']),
            new PIXI.Sprite(global.resource.tram.textures['tram.2.png'])
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


        this.addChild(...this.doors, ...this.axles)
        this.update()
        this.listen()


        this.enable().clearFixtures()
            .loadPolygon(shape.body.fixtures[0].polygons)
    }

    update() {
        global.game.ticker.add(() => {
            this.wheels.forEach(wheel => {
                if (this.velocity > 0) wheel.rotation += Math.PI / 30
                else if (this.velocity < 0) wheel.rotation -= Math.PI / 30
                wheel.rotation %= global.util.PI2
            })

            if (global.camera.distance.end.x > -200 &&
                global.camera.target === this &&
                this.velocity > 0) {
                global.camera.setDistance(-200)
            } else if (global.camera.distance.end.x < 200 &&
                global.camera.target === this &&
                this.velocity < 0) {
                global.camera.setDistance(200)
            }

            this.x += this.velocity
        })
    }

    listen() {
        window.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case 37: {
                    this.velocity = -this.speed
                    break
                }

                case 38: {
                    this.y -= 3
                    break
                }

                case 39: {
                    this.velocity = this.speed
                    break
                }

                case 40: {
                    this.y += 3
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

        // global.game.stage.interactive = true
        // global.game.stage
        //     .on('pointerdown', event => {
        //         if (event.data.global.x > global.game.view.width >> 1) {
        //             this.velocity = this.speed
        //         } else {
        //             this.velocity = -this.speed
        //         }
        //     })
        //     .on('pointerup', event => {
        //         this.velocity = 0
        //     })

        // document.addEventListener('touchstart', event => {
        //     if (event.touches.item(0).pageX > window.innerWidth >> 1) {
        //         this.velocity = this.speed
        //     } else {
        //         this.velocity = -this.speed
        //     }
        // })
        // document.addEventListener('touchend', event => {
        //     this.velocity = 0
        // })
    }
}

