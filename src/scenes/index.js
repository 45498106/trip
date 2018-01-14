import background from './background.js'
import foreground from './foreground.js'

export function init() {
    return {
        background: format(background()),
        foreground: format(foreground())
    }
}

function format(arr) {
    arr.forEach(item => {
        !item.hasOwnProperty('alpha') ? item.alpha = 1 : null
        !item.hasOwnProperty('rotation') ? item.rotation = 0 : null
        !item.hasOwnProperty('z') ? item.z = 0 : null

        if (!item.hasOwnProperty('scale')) {
            item.scale = {x: 1, y: 1}
        } else if (Number.isFinite(item.scale)) {
            item.scale = {x: item.scale, y: item.scale}
        }
    })
    return arr
}

const tram = [{"x":1401.1284194528878,"y":642},{"x":1907.9369300911858,"y":642},{"x":1946.3389941214896,"y":644.0522534291313},{"x":1984.7661659046375,"y":648.4088830829523},{"x":2026.500979751796,"y":655.3794905290658},{"x":2065.799477465709,"y":668.4493794905289},{"x":2106.952611124648,"y":673.8806164702273},{"x":2370.2860107421875,"y":700.4760131835938},{"x":2635.5437964520993,"y":711.5712610166264},{"x":2677.1267145656434,"y":713.7583278902678},{"x":2713.46374918354,"y":721.6002612671457},{"x":2758.772697583279,"y":732.9274983670803},{"x":2806.3800048828125,"y":743.515749123422},{"x":2864.203135205748,"y":752.0966688438928},{"x":2921.7713144652444,"y":759},{"x":6101.617320413921,"y":759}]

tram.push({x: 6101, y: 50})
tram.unshift({x: 1401, y: 50})

export const road = {
    tram
}