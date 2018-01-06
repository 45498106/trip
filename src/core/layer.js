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
    }

    setup() {
        const things = [
            new PIXI.Sprite(global.resource.terrain.textures['terrain.15.png']),
            new PIXI.Sprite(global.resource.depot.textures['depot.11.png'])
        ]
        // things[1].drag()
        things[1].position.set(180, 300)
        this.layers[2].addChild(things[0])
        this.layers[0].addChild(things[1])
    }
}