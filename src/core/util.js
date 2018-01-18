global.util = {
    PI2: Math.PI * 2,

    // 不建议同时开启：road & scene
    debug: {
        scene: true,
        road: false,
        camera: true
    },

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
    let delta = {}, down = false

    this.interactive = true
    this
        .on('pointerdown', event => {
            event.stopPropagation()
            down = true
            delta.x = this.x - event.data.global.x / global.util.ratio
            delta.y = this.y - event.data.global.y / global.util.ratio
        })
        .on('pointerup', () => {
            down = false
            console.log(`x: ${~~this.x}, y: ${~~this.y}`)
        })
        .on('pointermove', event => {
            if (down) {
                this.x = event.data.global.x / global.util.ratio + delta.x
                this.y = event.data.global.y / global.util.ratio + delta.y
            }
        })

    return this
}




