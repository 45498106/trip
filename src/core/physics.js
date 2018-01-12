import * as planck from 'planck-js'
import { Vec2 } from 'planck-js';

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

            node.x = p1.x * ptm
            node.y = p1.y * ptm

            if (node.name === '1') console.log(p1.y)

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
    this.rigidBody = body

    body.lastPostion = body.getPosition().clone()


    if (this.name === '1') console.log(point.y, body.lastPostion.y)

    body.createFixture(
        planck.Box(this.width * .5 * step, this.height * .5 * step),
        {density: 1}
    )
    return body
}

planck.Body.prototype.clearFixtures = function() {
    for (let fixture = this.getFixtureList(); fixture; fixture = fixture.getNext()) {
        this.destroyFixture(fixture)
    }
    return this
}

planck.Body.prototype.loadPolygon = function(path, fixtureDef={}) {
    path.forEach(vertexs => {
        this.createFixture(
            planck.Polygon(vertexs.map(vertex => planck.Vec2(vertex[0] * step, vertex[1] * step))),
            {density: 1, ...fixtureDef}
        )
    })
    return this
}

planck.Body.prototype.loadCircle = function(r, fixtureDef={}) {
    this.createFixture(
        planck.Circle(r * step),
        {density: 1, ...fixtureDef}
    )
    return this
}

planck.Body.prototype.createChain = function(points, loop=false, fixtureDef={}) {
    this.createFixture(
        planck.Chain(points.map(point => planck.Vec2(point.x * step , point.y * step)), loop),
        {density: 1, ...fixtureDef}
    )
    return this
}

planck.Body.prototype.destroy = function() {
    return world.destroyBody(this)
}

planck.Body.prototype.createRevoluteJoint = function(body, anchor, def={}) {
    world.createJoint(
        planck.RevoluteJoint(
            def,
            this,
            body,
            planck.Vec2(anchor.x * step, anchor.y * step)
        )
    )
    return this
}

planck.Body.prototype.createWheelJoint = function(body, anchor, axis, def={}) {
    world.createJoint(
        planck.WheelJoint(
            def, this, body,
            planck.Vec2(anchor.x * step, anchor.y * step),
            planck.Vec2(axis.x, axis.y)
        )
    )
    return this
}
