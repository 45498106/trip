import * as pixi from 'pixi.js'

export default class Tram {
    constructor() {
        this.body = new pixi.Sprite(global.resource.tram.textures['01.png'])
        this.body.anchor.set(.5)
        global.game.stage.addChild(this.body)
    }

    setPosition(x, y) {
        this.body.position.set(x, y)
        return this
    }
}

