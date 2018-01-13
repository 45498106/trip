/* 物理测试 */



export default class Test extends PIXI.Container {
    constructor() {
        super()

        const ground = new PIXI.Graphics()
            .beginFill(0xffff00)
            .drawRect(0, 0, 300, 50)

        ground.position.set(500, 200)
        ground.enable().loadBox(150, 25)


        let a = new PIXI.Graphics()
            .beginFill(0xffff00)
            .drawRect(0, 0, 300, 50)

        a.position.set(700, 500)
        a.enable().setStatic().loadBox(150, 25)

        let b = new PIXI.Graphics()
            // .beginFill(0xffff00)
            .lineStyle(3, 0xff9000)
            .moveTo(0, 0)
            .lineTo(300, 0)

        b.position.set(300, 700)
        b.enable().setStatic().createChain([{x: -300, y: 0}, {x: 300, y: 0}])


        const t = new PIXI.Graphics()
            .beginFill(0xff9000)
            .moveTo(0,0)
            .lineTo(100, 0)
            .lineTo(0, 100)
            // .lineTo(50, 50)
            .endFill()

        t.position.set(700, 100)
        // t.enable().createChain([
        //     {x: 0, y: 0},
        //     {x: 100, y: 0},
        //     {x: 0, y: 100}
        // ])
        // t.pivot.set(0, 0)

        this.addChild(ground, a, b,t)
    }
}