import * as pixi from 'pixi.js'
import './util'
import Tram from './tram'

global.wait = {}
global.setting = {
    width: 1920,
    height: 1080,
    ratio: window.devicePixelRatio || 1
}

global.game = new pixi.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
    view: document.querySelector('canvas')
})


loadRes().then(() => {
    global.tram = new Tram().setPosition(global.setting.width >> 1, global.setting.height >> 1)
})


function loadRes() {
    return new Promise(resolve => {
        const prefix = ver === 'production' ? '.' : './src'
        global.game.loader
            .add('tram', `${prefix}/assets/sprites/tram.json`)
            .load((loader, resource) => {
                global.resource = resource
                resolve()
            })
    })
}

resize()
window.addEventListener('resize', resize)

function resize() {
    if (global.wait.resize) return
    global.wait.resize = true
    setTimeout(() => {
        let width, height
        if (window.innerWidth <= window.innerHeight) {
            width = window.innerHeight
            height = window.innerWidth
        } else {
            width = window.innerWidth
            height = window.innerHeight
        }
        global.wait.resize = false
        global.setting.ratio = window.devicePixelRatio || 1

        global.game.view.style.width = `${width}px`
        global.game.view.style.height = `${height}px`
        global.game.view.style.top = `${(window.innerHeight - height) * .5}px`
        global.game.view.style.left = `${(window.innerWidth - width) * .5}px`
        global.game.renderer.resize(width * global.setting.ratio, height * global.setting.ratio)

        // stage 偏移
        global.game.stage.scale.set(global.util.ratio)
        global.game.stage.x =
            (global.game.view.width - global.setting.width * global.util.ratio) * .5
        global.game.stage.y =
            (global.game.view.height - global.setting.height * global.util.ratio) * .5
    })
}
