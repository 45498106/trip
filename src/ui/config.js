

export function init() {
    const {tree, depot, terrain, misc} = global.resource

    const background = [
        {
            texture: tree.textures['tree.5.png'],
            alpha: .6,
            x: 431,
            y: 332,
            z: -5,
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
            z: -6
        },
        {
            texture: tree.textures['tree.2.png'],
            x: 776, y: 302,
            alpha: .5,
            z: -3
        },
        {
            texture: tree.textures['tree.5.png'],
            x: 944, y: 382,
            alpha: .7,
            scale: .8,
            z: -3,
        },
        {
            texture: tree.textures['tree.2.png'],
            x: 1121, y: 361,
            alpha: .8,
            scale: .9,
            z: -1,
        },
        {
            texture: tree.textures['tree.14.png'],
            x: 920, y: 363,
            alpha: .6,
            scale: .8,
            z: -7,
        },
        {
            texture: tree.textures['tree.20.png'],
            x: 1104, y: 347,
            alpha: .5,
            scale: .7,
            z: -8,
        },
        {
            texture: tree.textures['tree.17.png'],
            x: 1229, y: 289,
            alpha: .4,
            scale: .9,
            z: -8,
        },
        {
            texture: tree.textures['tree.1.png'],
            x: 1334, y: 474,
            z: -2
        },
        {
            texture: tree.textures['tree.14.png'],
            x: 1360, y: 344,
            z: -5,
            alpha: .6,
            scale: .8,
        },
        {
            texture: tree.textures['tree.14.png'],
            x: 1942, y: 392,
            z: -6,
            alpha: .5,
            scale: .7,
        },
        {
            texture: terrain.textures['terrain.37.png'],
            x: 2164, y: 574,
            z: -2,
            alpha: .8,
        },
        {
            texture: tree.textures['tree.16.png'],
            x: 2328, y: 614,
            z: -1,
            alpha: .8,
        },
        {
            texture: tree.textures['tree.20.png'],
            x: 2574, y: 222,
            alpha: .8,
        },
        {
            texture: tree.textures['tree.20.png'],
            x: 2262, y: 368,
            z: -6,
            scale: .7,
            alpha: .5,
        },
        {
            texture: tree.textures['tree.18.png'],
            x: 2802, y: 632,
            z: -1,
            scale: .9,
        },
        {
            texture: terrain.textures['terrain.35.png'],
            x: 2744, y: 516,
            z: -6,
            alpha: .7,
            scale: .7,
        },
    ]

    const foreground = [
        {
            texture: tree.textures['tree.19.png'],
            x: 3295, y: 886,
        },

        {
            texture: terrain.textures['terrain.23.png'],
            x: 3281, y: 920,
        },
        {
            texture: terrain.textures['terrain.4.png'],
            x: 3611, y: 928,
            z: 1,
            scale: 1.2,
        },
        {
            texture: tree.textures['tree.19.png'],
            x: 3651, y: 900,
        },
        {
            texture: terrain.textures['terrain.33.png'],
            x: 3415, y: 926,
            scale: 1.3,
        },
        {
            texture: depot.textures['depot.7.png'],
            x: 3489, y: 886,
        },
        // 流水
        (function() {
            const
                river = new PIXI.Container(),
                width = 2300,
                height = 53,
                mask = new PIXI.Graphics()
                    .beginFill(0xff9000)
                    .drawRect(0, 0, width, height)
                    .endFill()

            river.mask = mask
            river.addChild(
                new PIXI.extras.TilingSprite(global.resource.water.texture, width, height),
                new PIXI.extras.TilingSprite(global.resource.water.texture, width, height),
                mask
            )
            river.children[0].x = 0
            river.children[1].x = width
            global.game.ticker.add(() => {
                river.children[0].x -= .3
                river.children[1].x -= .3
                if (river.children[0].x < -width) river.children[0].x = river.children[1].x + width
                if (river.children[1].x < -width) river.children[1].x = river.children[0].x + width
            })

            return {
                display: river,
                x: 3329, y: 940,
                z: -3,
                drag: true
            }
        })(),
        {
            texture: depot.textures['depot.18.png'],
            x: 2914, y: 728,
        },
        {
            texture: depot.textures['depot.2.png'],
            x: 3356, y: 730,
            z: -3
        },
        {
            texture: depot.textures['depot.18.png'],
            x: 3372, y: 728,
            drag: true
        },
        {
            texture: depot.textures['depot.2.png'],
            x: 3814, y: 730,
            z: -1,
        },
        {
            texture: depot.textures['depot.18.png'],
            x: 3830, y: 728,
        },
        {
            texture: depot.textures['depot.2.png'],
            x: 4272, y: 730,
            z: -1,
        },
        {
            texture: depot.textures['depot.18.png'],
            x: 4288, y: 728,
        },
        {
            texture: depot.textures['depot.2.png'],
            x: 4730, y: 730,
            z: -1,
        },
        {
            texture: depot.textures['depot.18.png'],
            x: 4746, y: 728,
        },
        {
            texture: depot.textures['depot.2.png'],
            x: 5188, y: 730,
            z: -1,
        },
        {
            texture: depot.textures['depot.18.png'],
            x: 5204, y: 728,
        },
        {
            texture: depot.textures['depot.2.png'],
            x: 5646, y: 730,
            z: -1,
        },
        {
            texture: depot.textures['depot.18.png'],
            x: 5662, y: 728,
        },
        {
            texture: depot.textures['depot.6.png'],
            x: 1318, y: 359,
            z: -1,
        },
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
            z: -1
        },
        {
            texture: terrain.textures['terrain.10.png'],
            x: 1880, y: 611,
            z: 1,
        },
        {
            texture: terrain.textures['terrain.12.png'],
            x: 1878, y: 669,
            alpha: .2,
            rotation: .02,
            z: 1,
        },
        {
            texture: terrain.textures['terrain.42.png'],
            x: 465, y: 633,
            alpha: .2,
            scale: 1.5,
            z: -1
        },
        {
            texture: terrain.textures['terrain.42.png'],
            x: 1043, y: 659,
            alpha: .2,
            scale: 1.5,
            z: -1,
        },
        {
            texture: terrain.textures['terrain.10.png'],
            x: 2621, y: 654,
            z: 1,
        },

        {
            texture: terrain.textures['terrain.5.png'],
            x: 2799, y: 702,
            rotation: Math.PI / 5,
            alpha: .6,
            scale: {x: .5, y: 1.2},
        },

        {
            texture: terrain.textures['terrain.8.png'],
            x: 2259, y: 687,
            alpha: .3,
            scale: 2,
            z: -1,
        },
        {
            texture: tree.textures['tree.13.png'],
            x: 2886, y: 824,
            z: 0,
        },
        {
            texture: depot.textures['depot.5.png'],
            x: 3120, y: 854,
            z: -2
        },
        {
            texture: depot.textures['depot.5.png'],
            x: 3305, y: 854,
            z: -2
        },
        {
            texture: depot.textures['depot.4.png'],
            x: 3265, y: 964,
            rotation: -Math.PI * .5,
            z: -6,
        },
        {
            texture: depot.textures['depot.4.png'],
            x: 3475, y: 964,
            rotation: -Math.PI * .5,
            z: -6,
        },
        {
            texture: terrain.textures['terrain.43.png'],
            x: 5564, y: 834,
        },
        {
            texture: terrain.textures['terrain.11.png'],
            x: 5710, y: 890,
            z: -1,
        },
        {
            texture: terrain.textures['terrain.46.png'],
            x: 5954, y: 868,
            z: 1,
        },
        {
            texture: terrain.textures['terrain.33.png'],
            x: 5806, y: 906,
            z: -2,
        },
        {
            texture: tree.textures['tree.19.png'],
            x: 5778, y: 874,
            z: -1,
        },
        {
            texture: tree.textures['tree.16.png'],
            x: 5940, y: 852,
            z: 2,
            drag: true
        },
        {
            texture: tree.textures['tree.18.png'],
            x: 5858, y: 848,
            drag: true
        },
        {
            texture: terrain.textures['terrain.41.png'],
            x: 6064, y: 920,
            rotation: -Math.PI * .5,
        },
        {
            texture: terrain.textures['terrain.4.png'],
            x: 5956, y: 892,
            z: 2,
            scale: 2,
            alpha: .6,
            drag: true
        },
        {
            texture: terrain.textures['terrain.6.png'],
            x: 5728, y: 930,
            z: -4,
            rotation: -.1,
        },
        {
            texture: misc.textures['misc.16.png'],
            x: 5556, y: 940,
            z: -3,
            alpha: .5,
            scale: {x: .7, y: 1},
        },
        {
            texture: tree.textures['tree.16.png'],
            x: 2914, y: 777,
            z: 1,
        },
        {
            texture: terrain.textures['terrain.47.png'],
            x: 2827, y: 613,
            rotation: Math.PI / 4,
            z: 1
        },
        {
            texture: terrain.textures['terrain.2.png'],
            x: 2920, y: 827,
            z: -1
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

export const path = [{"x":1456.0786092715232,"y":613.8811920529802},{"x":1881.547814569536,"y":615.6480794701987}]