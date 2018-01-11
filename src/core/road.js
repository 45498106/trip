import physics from './physics.js'

export default class Road extends PIXI.Container {
    constructor(points=[]) {
        super()
        this.points = points

        // global.camera.interactive = true
        // global.camera
        //     .on('pointerdown', event => {
        //         const point = global.camera.toLocal({
        //             x: event.data.global.x,
        //             y: event.data.global.y
        //         })
        //         this.addPoint(point.x, point.y)
        //     })

        this.draw()
    }

    addPoint(x, y) {
        this.points.push({x, y})
        this.points.sort((a, b) => a.x - b.x)
        this.draw()
        console.log(JSON.stringify(this.points))
    }

    removePoint(x, y) {
        const index = this.points.findIndex(point => {
            return point.x === x && point.y === y
        })
        event.stopPropagation()

        this.points.splice(index, 1)
        this.draw()
        console.log(JSON.stringify(this.points))
    }

    draw() {
        this.clear()
        this.points.forEach((point, i) => {
            const dot = new PIXI.Graphics()
                .beginFill(0xe91e63)
                .drawCircle(0, 0, 8)
                .endFill()

            // 连线
            if (this.points[i+1]) {
                const
                    next = this.points[i+1],
                    line = new PIXI.Graphics()
                        .lineStyle(1, 0xff9800)
                        .moveTo(0, 0)
                        .lineTo(next.x - point.x, next.y - point.y)

                line.position.set(point.x, point.y)
                this.addChild(line)
            }

            dot.position.set(point.x, point.y)


            /* 监听 */
            dot.interactive = true
            dot.on('pointerdown', event => {
                this.removePoint(dot.x, dot.y)
            })

            this.addChild(dot)
        })

        this.resetPhys()
    }

    /* 物理相关 */
    resetPhys() {
        this.body && this.body.destroy()
        this.enable().setStatic().clearFixtures()
            .createChain(this.points.map(point => ({
                x: point.x - this.x,
                y: point.y - this.y
            })), false)
        // 重置锚点
        this.pivot.set(0, 0)
    }

    clear() {
        while (this.children.length) this.children[0].destroy(true)
    }
}