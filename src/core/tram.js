export default class Tram extends PIXI.Container {
    constructor(...args) {

        super(...args)

        this.speed = 20
        this.velocity = 0
        this.acceleration = 0

        this.body = new PIXI.Sprite(global.resource.tram.textures['tram.1.png'])


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

        this.wheels = [
            new PIXI.Sprite(global.resource.tram.textures['tram.2.png']),
            new PIXI.Sprite(global.resource.tram.textures['tram.2.png']),
            new PIXI.Sprite(global.resource.tram.textures['tram.2.png']),
            new PIXI.Sprite(global.resource.tram.textures['tram.2.png'])
        ]


        this.body.addChild(...this.doors)
        this.addChild(this.body, ...this.axles, ...this.wheels)

        this.setPhysics()
        this.update()


        this.listen()
    }

    setPhysics() {
        const
            shape = global.resource.tramShape.data.bodies,
            wheelDef = {
                motorSpeed: 0,
                maxMotorTorque: 500,
                enableMotor: false,
                frequencyHz: 8,
                dampingRatio: .7
            },
            wheelAxis = {x: 0, y: 1}

        this.body.position.set(1680, 400)

        this.axles[0].position.set(this.body.x - 130, this.body.y + 80)
        this.axles[1].position.set(this.body.x + 130, this.body.y + 80)

        this.wheels[0].position.set(this.axles[0].x - 30, this.axles[0].y + 5)
        this.wheels[1].position.set(this.axles[0].x + 30, this.axles[0].y + 5)
        this.wheels[2].position.set(this.axles[1].x - 30, this.axles[1].y + 5)
        this.wheels[3].position.set(this.axles[1].x + 30, this.axles[1].y + 5)

        this.body.enable().setStatic().clearFixtures().loadPolygon(
            shape.body.fixtures[0].polygons, {density: .1})

        this.axles.forEach((axle, i) => {
            axle.enable().clearFixtures().loadPolygon(shape.axle.fixtures[0].polygons)
            this.body.rigidBody.createRevoluteJoint(
                axle.rigidBody,
                axle.position,
                {
                    lowerAngle: -.02 * Math.PI,
                    upperAngle: .02 * Math.PI,
                    enableLimit: true
                }
            )
        })

        this.wheels.forEach((wheel, i) => {
            const axle = this.axles[i < 2 ? 0 : 1]
            i === 1 ? wheel.name = '1' : null

            wheel.enable().clearFixtures().loadCircle(15)
            axle.rigidBody.createWheelJoint(
                wheel.rigidBody,
                wheel.position,
                wheelAxis,
                wheelDef
            )
        })


    }

    update() {
        global.game.ticker.add(() => {
            // this.wheels.forEach(wheel => {
            //     if (this.velocity > 0) wheel.rotation += Math.PI / 30
            //     else if (this.velocity < 0) wheel.rotation -= Math.PI / 30
            //     wheel.rotation %= global.util.PI2
            // })
            // console.log(this.wheels[0].y)

            if (global.camera.distance.end.x > -200 &&
                global.camera.target === this &&
                this.velocity > 0) {
                global.camera.setDistance(-200)
            } else if (global.camera.distance.end.x < 200 &&
                global.camera.target === this &&
                this.velocity < 0) {
                global.camera.setDistance(200)
            }

            // this.x += this.velocity
        })
    }

    listen() {
        /* 获取 wheelJoint */
        const joints = this.wheels.map(wheel => wheel.rigidBody.getJointList().joint)

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

            joints.forEach(joint => {
                joint.enableMotor(true)
                joint.setMotorSpeed(this.velocity)
            })
        })

        window.addEventListener('keyup', event => {
            switch (event.keyCode) {
                case 37: {
                    this.velocity = 0
                    joints.forEach(joint => {
                        joint.enableMotor(false)
                        joint.setMotorSpeed(this.velocity)
                    })
                    break
                }

                case 39: {
                    this.velocity = 0
                    joints.forEach(joint => {
                        joint.enableMotor(false)
                        joint.setMotorSpeed(this.velocity)
                    })
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

