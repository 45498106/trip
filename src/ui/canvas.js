import * as pixi from 'pixi.js'
import * as core from '../core'

const
    {PI, cos, sin, sqrt, ceil} = Math,
    arrow = new pixi.Sprite.fromImage(require('../static/arrow.png'))


let app, width, height, graphics,
    path = []


export const setting = {
    size: 1,
    gap: 20,
    col: 0,
    row: 0
}

export const grid = []

export function init() {
    const canvas = document.querySelector('canvas')
    graphics = new pixi.Graphics()

    width = canvas.parentElement.offsetWidth
    height = canvas.parentElement.offsetHeight

    // 生成 grid
    setting.col = ceil(width / setting.gap)
    setting.row = ceil(height / setting.gap)

    arrow.anchor.set(.5)
    arrow.scale.set(setting.size * .1)
    arrow.position.set(width >> 1, height >> 1)
    arrow.interactive = true
    arrow
        .on('pointerdown', event => {
            arrow._down = true
            event.stopPropagation()
        })
        .on('pointerup', event => arrow._down = false)
        .on('pointermove', event => {
            arrow._down && arrow.position.set(event.data.global.x, event.data.global.y)
        })

    for (let i = 0; i < setting.row; i++) {
        const row = []
        for (let j = 0; j < setting.col; j++) {
            row.push({blocked: 0})
        }
        grid.push(row)
    }

    app = new pixi.Application({
        width,
        height,
        backgroundColor: 0xffffff,
        view: canvas
    })
    app.stage.addChild(graphics, arrow)

    app.stage.hitArea = new pixi.Rectangle(0, 0, width, height)
    app.stage.interactive = true
    app.stage
        .on('pointerup', event => {
            app.stage._down = false
        })
        .on('pointerdown', event => {
            if (event.data.button === 0) {
                const point = coord(event.data.global.x, event.data.global.y)
                app.stage._down = true

                grid[point.y][point.x].blocked ^= 1
                app.stage._lastCoord = point

                draw()
            } else if (event.data.button === 2) {
                path = core.search(
                    coord(arrow.x, arrow.y),
                    coord(event.data.global.x, event.data.global.y),
                    new core.Grid(grid.map(row => row.map(cell => cell.blocked))),
                    setting.size
                )
                draw()
            }
        })
        .on('pointermove', event => {
            if (app.stage._down) {
                const point = coord(event.data.global.x, event.data.global.y)

                if (app.stage._lastCoord.x === point.x && app.stage._lastCoord.y === point.y) return

                app.stage._lastCoord = point

                grid[point.y][point.x].blocked ^= 1

                draw()
            }
        })

    window.addEventListener('resize', event => {
        app.view.width = window.innerWidth
        app.view.height = window.innerHeight
    })


    draw()
}

export function setSize(i) {
    setting.size = i
    arrow.scale.set(.1 * setting.size)
}

function draw() {
    const gap = setting.gap

    graphics.clear()
    graphics.lineStyle(1, 0xffd900)

    // 绘制列
    for (let x = gap; x < width; x += gap) {
        graphics.moveTo(x, 0)
        graphics.lineTo(x, height)
    }

    // 绘制行
    for (let y = gap; y < height; y += gap) {
        graphics.moveTo(0, y)
        graphics.lineTo(width, y)
    }

    // 绘制障碍物
    graphics.beginFill(0xffd900)
    grid.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell.blocked) graphics.drawRect(
                j * setting.gap,
                i * setting.gap,
                setting.gap, setting.gap)
        })
    })
    graphics.endFill()

    // 绘制路径
    graphics.lineStyle(2, 0x4caf50)
    path.unshift()
    path.forEach((point, i) => {
        const {x, y} = point
        if (i) graphics.lineTo((x + .5) * setting.gap, (y + .5) * setting.gap)
        else graphics.moveTo(arrow.x, arrow.y)
    })
}

function coord(x, y) {
    return {
        x: ~~(x / setting.gap),
        y: ~~(y / setting.gap)
    }
}




if (module.hot) {
    module.hot.accept()
    module.hot.dispose(function() {
        location.reload()
    })
}