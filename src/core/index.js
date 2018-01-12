import './util.js'
import Camera from './camera.js'
import Tram from './tram.js'
import Layer from './layer.js'
import Road from './road.js'
import physics from './physics.js'

import Test from './test.js'

global.game = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
    view: document.querySelector('canvas')
})


loadRes().then(() => {
    global.camera = new Camera()
    global.layer = new Layer()
    global.tram = new Tram()
    // global.tram = new Tram(global.resource.plane.texture)
    // global.tram.alpha = 0
    global.layer.children[1].addChild(global.tram)
    global.camera.addChild(global.layer, new Test())
    // global.camera.position.set(-5000, -360)
    // global.camera.listen()
    global.camera.follow(global.tram.body)
})


function loadRes() {
    return new Promise(resolve => {
        const prefix = ver === 'production' ? '//cdn.safish.org/trip' : './src'
        global.game.loader
            .add('paper', `${prefix}/assets/sprites/paper.png?${hash}`)
            .add('water', `${prefix}/assets/sprites/water.png?${hash}`)
            .add('tram', `${prefix}/assets/sprites/tram.json?${hash}`)
            .add('terrain', `${prefix}/assets/sprites/terrain.json?${hash}`)
            .add('depot', `${prefix}/assets/sprites/depot.json?${hash}`)
            .add('tree', `${prefix}/assets/sprites/tree.json?${hash}`)
            .add('misc', `${prefix}/assets/sprites/misc.json?${hash}`)
            .add('tramShape', `${prefix}/assets/physics/tram.json?${hash}`)

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
            global.rotation = 0
        }
        global.util.wait.resize = false
        global.util.setting.ratio = window.devicePixelRatio || 1


        global.game.view.style.width = `${width}px`
        global.game.view.style.height = `${height}px`
        global.game.view.style.top = `${(window.innerHeight - height) * .5}px`
        global.game.view.style.left = `${(window.innerWidth - width) * .5}px`
        global.game.renderer.resize(width * global.util.setting.ratio,
            height * global.util.setting.ratio)

        global.paper && global.paper.scale.set(1 / global.util.ratio)

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