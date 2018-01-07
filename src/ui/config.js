

export function init() {
    const {tree, depot, terrain} = global.resource

    const background = [
        {
            texture: tree.textures['tree.5.png'],
            alpha: .6,
            x: 431,
            y: 332,
            z: 5,
            scale: .8
        },
        {
            texture: depot.textures['depot.11.png'],
            x: 180,
            y: 300
        },
        {
            texture: tree.textures['tree.22.png'],
            x: 660,
            y: 257
        },
        {
            texture: depot.textures['depot.3.png'],
            x: 785,
            y: 437
        },
        {
            texture: tree.textures['tree.17.png'],
            x: 694, y: 261,
            alpha: .3,
            z: 6
        },
        {
            texture: tree.textures['tree.2.png'],
            x: 776, y: 302,
            alpha: .5,
            z: 3
        },
        {
            texture: tree.textures['tree.5.png'],
            x: 944, y: 382,
            alpha: .7,
            scale: .8,
            z: 3,
        },
        {
            texture: tree.textures['tree.2.png'],
            x: 1121, y: 361,
            alpha: .8,
            scale: .9,
            z: 1,
        },
        {
            texture: tree.textures['tree.14.png'],
            x: 900, y: 363,
            alpha: .6,
            scale: .9,
            z: 7,
        },
        {
            texture: tree.textures['tree.20.png'],
            x: 1104, y: 347,
            alpha: .5,
            scale: .7,
            z: 8,
        },
        {
            texture: tree.textures['tree.17.png'],
            x: 1229, y: 289,
            alpha: .4,
            scale: .9,
            z: 8,
        },
        {
            texture: depot.textures['depot.6.png'],
            x: 1318, y: 359,
        },
    ]

    const foreground = [
        {
            texture: tree.textures['tree.1.png'],
            x:390, y: 455
        },
        {
            texture: terrain.textures['terrain.12.png'],
            x: 428, y: 617
        },
        {
            texture: terrain.textures['terrain.46.png'],
            x: 322, y: 587
        },
        {
            texture: terrain.textures['terrain.15.png'],
            x: 0, y: 0
        },
        {
            texture: tree.textures['tree.16.png'],
            x: 631, y: 586
        }
    ]

    format(background)
    format(foreground)

    return {background, foreground}
}

function format(arr) {
    arr.forEach(item => {
        !item.hasOwnProperty('alpha') ? item.alpha = 1 : null
        !item.hasOwnProperty('scale') ? item.scale = 1 : null
        !item.hasOwnProperty('z') ? item.z = 0 : null
    })
}