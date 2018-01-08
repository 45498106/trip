

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
            x: 920, y: 363,
            alpha: .6,
            scale: .8,
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
        {
            texture: tree.textures['tree.1.png'],
            x: 1334, y: 474,
            z: 2
        },
        {
            texture: tree.textures['tree.14.png'],
            x: 1360, y: 344,
            z: 5,
            alpha: .6,
            scale: .8,
        },
    ]

    const foreground = [
        {
            texture: tree.textures['tree.1.png'],
            x: 390, y: 455
        },
        {
            texture: terrain.textures['terrain.12.png'],
            x: 428, y: 617,
            alpha: .9
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
        },
        {
            texture: terrain.textures['terrain.42.png'],
            x: 1049, y: 620,
        },
        {
            texture: tree.textures['tree.18.png'],
            x: 1583, y: 574
        },
        {
            texture: terrain.textures['terrain.1.png'],
            x: 1650, y: 628,
        },
        {
            texture: terrain.textures['terrain.5.png'],
            x: 2014, y: 633,
            rotation: .08
        },
        {
            texture: terrain.textures['terrain.6.png'],
            x: 2351, y: 657,
            rotation: .08
        },
        {
            texture: tree.textures['tree.9.png'],
            x: 2070, y: 482,
            z: 1
        },
        {
            texture: terrain.textures['terrain.10.png'],
            x: 1880, y: 611,
            z: -1,
        },
        {
            texture: terrain.textures['terrain.12.png'],
            x: 1878, y: 669,
            alpha: .2,
            rotation: .02,
            z: -1,
        },
        {
            texture: terrain.textures['terrain.42.png'],
            x: 465, y: 633,
            alpha: .2,
            scale: 1.5,
            z: 1
        },
        {
            texture: terrain.textures['terrain.42.png'],
            x: 1043, y: 659,
            alpha: .2,
            scale: 1.5,
            z: 1,
        },
        {
            texture: terrain.textures['terrain.10.png'],
            x: 2621, y: 654,
            z: -1,
        },
        {
            texture: terrain.textures['terrain.47.png'],
            x: 2827, y: 613,
            rotation: Math.PI / 4,
        },
        {
            texture: terrain.textures['terrain.5.png'],
            x: 2799, y: 702,
            rotation: Math.PI / 5,
            alpha: .6,
            scale: {x: .5, y: 1.2},
        },
        {
            texture: tree.textures['tree.16.png'],
            x: 2914, y: 777,
            z: -1,
        },
        {
            texture: terrain.textures['terrain.2.png'],
            x: 2920, y: 827,
            z: 1,
        },
        {
            texture: terrain.textures['terrain.8.png'],
            x: 2259, y: 687,
            alpha: .3,
            scale: 2,
            z: 1,
        },
        {
            texture: tree.textures['tree.13.png'],
            x: 2886, y: 824,
            z: 0,
        },
    ]

    format(background)
    format(foreground)

    return {background, foreground}
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
}