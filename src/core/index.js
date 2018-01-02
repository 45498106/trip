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
    global.game.stage.addChild(
        new pixi.extras.TilingSprite(
            global.resource.bkg.texture,
            global.setting.width,
            global.setting.height
        )
    )
    global.tram = new Tram().setPosition(global.setting.width >> 1, global.setting.height >> 1)
})


function loadRes() {
    return new Promise(resolve => {
        const prefix = ver === 'production' ? '//cdn.safish.org/trip' : './src'
        global.game.loader
            .add('tram', `${prefix}/assets/sprites/tram.json`)
            .add('bkg', `${prefix}/assets/sprites/paper.png`)
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
            global.rotation = 90
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

/* 额外扩展 */
global.game.renderer.plugins.interaction.mapPositionToPoint = function(point, x, y) {
    let rect

    // IE 11 fix
    if (!this.interactionDOMElement.parentElement) {
        rect = {x: 0, y: 0, width: 0, height: 0}
    } else {
        rect = this.interactionDOMElement.getBoundingClientRect()
    }

    const resolutionMultiplier = navigator.isCocoonJS ? this.resolution : 1 / this.resolution

    if (global.rotation === 90) {
        point.y = (1 - (x - rect.left) / rect.width) * this.interactionDOMElement.height * resolutionMultiplier
        point.x = (y - rect.top) * (this.interactionDOMElement.width / rect.height) * resolutionMultiplier
    } else {
        point.x = ((x - rect.left) * (this.interactionDOMElement.width / rect.width)) * resolutionMultiplier
        point.y = ((y - rect.top) * (this.interactionDOMElement.height / rect.height)) * resolutionMultiplier
    }

}