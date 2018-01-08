/* 物理测试 */

export default class Test extends PIXI.Container {
    constructor() {
        super()

        const ground = new PIXI.Graphics()
            .beginFill(0xffff00)
            .drawRect(0, 0, 300, 50)

        ground.position.set(500, 300)
        ground.enable()


        let a = new PIXI.Graphics()
            .beginFill(0xffff00)
            .drawRect(0, 0, 300, 50)

        a.position.set(700, 500)
        a.enable().setStatic()

        let b = new PIXI.Graphics()
            .beginFill(0xffff00)
            .drawRect(0, 0, 300, 50)

        b.position.set(300, 700)
        b.enable().setStatic()

        this.addChild(ground, a, b)
    }
}