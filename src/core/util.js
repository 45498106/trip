global.util = {
    PI2: Math.PI * 2,

    get ratio() {
        return Math.min(
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

    lerp(from, to, t) {
        return (to - from) * t + from
    }
}

PIXI.DisplayObject.prototype.drag = function() {
    let delta, down = false

    this.interactive = true
    this
        .on('pointerdown', event => {
            event.stopPropagation()
            down = true
            delta = event.data.getLocalPosition(this)
        })
        .on('pointerup', () => {
            down = false
            console.log(`x: ${~~this.x}, y: ${~~this.y}`)
        })
        .on('pointermove', event => {
            if (down) {
                const point = event.data.getLocalPosition(this.parent)
                point.x -= delta.x * this.scale.x
                point.y -= delta.y * this.scale.y
                console.log(point.x)
                this.position.copy(point)
            }
        })
}




