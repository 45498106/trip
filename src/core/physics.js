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
    this.body = body

    body.lastPostion = body.getPosition().clone()
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
