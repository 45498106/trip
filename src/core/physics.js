import * as planck from 'planck-js'

const
    world = planck.World(planck.Vec2(0, 6)),
    ptm = 32,
    step = 1 / ptm

loop()
function loop() {
    for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (body.isDynamic()) {
            const
                node = body.node,
                p1 = body.getPosition(),
                p2 = body.lastPostion

            node.x += (p1.x - p2.x) * ptm
            node.y += (p1.y - p2.y) * ptm

            node.rotation = body.getAngle()

            body.lastPostion.x = p1.x
            body.lastPostion.y = p1.y
        }
    }
    world.step(step)
    window.requestAnimationFrame(loop)
}

/* 扩展方法 */
PIXI.DisplayObject.prototype.enable = function() {
    const
        point = this.getGlobalPosition(),
        body = world.createBody({
            type: planck.Body.DYNAMIC,
            position: planck.Vec2(point.x * step, point.y * step)
        })

    this.anchor ? this.anchor.set(.5) :
        this.pivot.set(this.width * .5, this.height * .5)

    body.node = this
    body.lastPostion = body.getPosition().clone()
    body.createFixture(
        planck.Box(this.width * .5 * step, this.height * .5 * step),
        {
            density: 1
        }
    )

    return body
}