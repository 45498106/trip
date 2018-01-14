export default function() {
    const {tree, depot, terrain, misc, paper, house} = global.resource

    return [
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
        {
            texture: terrain.textures['terrain.11.png'],
            x: 6126, y: 678,
        },
        {
            texture: tree.textures['tree.16.png'],
            x: 6262, y: 680,
        },
        {
            texture: tree.textures['tree.10.png'],
            x: 6287, y: 689,
        },
        {
            texture: tree.textures['tree.12.png'],
            x: 6433, y: 644,
        },
        {
            texture: house.textures['house.23.png'],
            x: 6462, y: 542,
        },
        {
            texture: house.textures['house.36.png'],
            x: 6739, y: 685,
            z: 1,
        },
        {
            texture: misc.textures['misc.13.png'],
            x: 6825, y: 112,
            z: -1,
        },
        {
            texture: tree.textures['tree.1.png'],
            x: 6773, y: 623,
            z: -5,
            scale: .6,
        },
        {
            texture: tree.textures['tree.1.png'],
            x: 6741, y: 591,
            z: -3,
            scale: .8,
        },
        {
            texture: tree.textures['tree.18.png'],
            x: 6773, y: 664,
            z: -1,
        },
        {
            texture: house.textures['house.36.png'],
            x: 6917, y: 685,
            z: 1,
        },
        {
            texture: house.textures['house.36.png'],
            x: 7036, y: 685,
            z: 1,
        },
        {
            texture: house.textures['house.36.png'],
            x: 7155, y: 685,
            z: 1,
            drag:true
        },
    ]
}