import './util'
import Camera from './camera'
import Tram from './tram'
import Layer from './layer'

global.game = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
    view: document.querySelector('canvas')
})


loadRes().then(() => {
    global.game.stage.addChild(
        new PIXI.extras.TilingSprite(
            global.resource.bkg.texture,
            global.util.setting.width,
            global.util.setting.height
        )
    )
    global.camera = new Camera()

    global.layer = new Layer()

    global.tram = new Tram(global.resource.tram.textures['01.png'])
    global.tram.position.set(667, 480)
    global.layer.children[1].addChild(global.tram)
    global.camera.addChild(global.layer)
    global.camera.follow(global.tram)
})


function loadRes() {
    return new Promise(resolve => {
        const prefix = ver === 'production' ? '//cdn.safish.org/trip' : './src'
        global.game.loader
            .add('tram', `${prefix}/assets/sprites/tram.json`)
            .add('bkg', `${prefix}/assets/sprites/paper.png`)
            .add('mountain', `${prefix}/assets/sprites/terrain/02.png`)
            .add('house', `${prefix}/assets/sprites/depot/01.png`)
            .load((loader, resource) => {
                global.resource = resource
                resolve()
            })
    })
}

resize()
window.addEventListener('resize', resize)

function resize() {
    if (global.util.wait.resize) return
    global.util.wait.resize = true
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
        global.util.wait.resize = false
        global.util.setting.ratio = window.devicePixelRatio || 1


        global.game.view.style.width = `${width}px`
        global.game.view.style.height = `${height}px`
        global.game.view.style.top = `${(window.innerHeight - height) * .5}px`
        global.game.view.style.left = `${(window.innerWidth - width) * .5}px`
        global.game.renderer.resize(width * global.util.setting.ratio,
            height * global.util.setting.ratio)

        global.util.view.width = global.game.view.width
        global.util.view.height = global.game.view.height

        // stage 偏移
        global.game.stage.scale.set(global.util.ratio)
    }, 100)
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