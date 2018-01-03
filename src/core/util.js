global.util = {
    PI2: Math.PI * 2,

    get ratio() {
        return Math.max(
            global.game.view.width / global.util.setting.width,
            global.game.view.height / global.util.setting.height
        )
    },

    wait: {},

    setting: {
        width: 1334,
        height: 750,
        ratio: window.devicePixelRatio || 1
    },

    view: {
        width: 0,
        height: 0
    }
}



PIXI.DisplayObject.prototype.drag = function() {
    let delta, p1, down = false

    this.interactive = true
    this
        .on('pointerdown', event => {
            down = true
            delta = event.data.getLocalPosition(this)
        })
        .on('pointerup', () => {
            down = false
        })
        .on('pointermove', event => {
            if (down) {
                const point = event.data.getLocalPosition(this.parent)
                point.x -= delta.x
                point.y -= delta.y
                this.position.copy(point)
            }
        })
}
