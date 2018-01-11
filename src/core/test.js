import planck from 'planck-js'

/* 物理测试 */



export default class Test extends PIXI.Container {
    constructor() {
        super()

        const ground = new PIXI.Graphics()
            .beginFill(0xffff00)
            .drawRect(0, 0, 300, 50)

        ground.position.set(1600, 200)
        // ground.enable()


        let a = new PIXI.Graphics()
            .beginFill(0xffff00)
            .drawRect(0, 0, 300, 50)

        a.position.set(700, 500)
        a.enable().setStatic()

        let b = new PIXI.Graphics()
            // .beginFill(0xffff00)
            .lineStyle(3, 0xff9000)
            .moveTo(0, 0)
            .lineTo(300, 0)

        b.position.set(300, 700)
        b.enable().setStatic().clearFixtures()
            .createChain([{x: -300, y: 0}, {x: 300, y: 0}])

        this.addChild(ground, a, b)
    }
}