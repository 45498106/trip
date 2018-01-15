export default function() {
    const {tree, depot, terrain, misc, paper} = global.resource

    return [
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
            x: 2621, y: 658,
            z: 1,
        },

        {
            texture: terrain.textures['terrain.5.png'],
            x: 2775, y: 678,
            rotation: Math.PI / 5,
            alpha: 1,
            scale: {x: .5, y: 1.2},
        },

        {
            texture: terrain.textures['terrain.8.png'],
            x: 2568, y: 685,
            alpha: 1,
            scale: {x: .8, y: 1.5},
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
            z: 3,
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
            z: 2
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
        {
            texture: tree.textures['tree.16.png'],
            x: 6077, y: 694,
            z: 3,
            scale: 1.3,
        },
        {
            texture: terrain.textures['terrain.12.png'],
            x: 6145, y: 707,
            z: 2,
        },
        {
            texture: terrain.textures['terrain.8.png'],
            x: 6692, y: 726,
            z: 2,
            scale: {x: 2, y: 1},
        },
    ]
}