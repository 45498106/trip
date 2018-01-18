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

global.sort = function(arr, cmp=null) {
    return arr.length < 2 ? arr.sort(cmp) : order(arr, cmp)
}

function order(arr, cmp) {
    return merge(slice(arr), cmp)
}

function slice(arr) {
    return Array.from({length: Math.ceil(arr.length / 2)},
        (_, i) => arr.slice(i * 2, (i + 1) * 2))
}

function merge(arr, cmp) {

    cmp = cmp || ((a, b) => a - b)

    arr.forEach(item => {
        if (item.length > 1 && cmp(item[0], item[1]) > 0) {
            const tmp = item[0]
            item[0] = item[1]
            item[1] = tmp
        }
    })

    while (arr.length > 1) {
        const
            a = arr.shift(),
            b = arr.shift(),
            c = []

        while (b.length && a.length) {
            cmp(a[0], b[0]) > 0 ? c.push(b.shift()) : c.push(a.shift())
        }

        arr.unshift(c.concat(a, b))
    }

    return arr.pop()
}





