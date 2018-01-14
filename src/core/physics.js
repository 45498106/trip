import * as planck from 'planck-js'

const
    world = planck.World(planck.Vec2(0, 3)),
    ptm = 32,
    step = 1 / ptm

loop()
function loop() {
    for (let body = world.getBodyList(); body; body = body.getNext()) {
        if (body.isDynamic()) {
            const
                node = body.node,
                point = body.getPosition()

            node.x = point.x * ptm
            node.y = point.y * ptm

            node.rotation = body.getAngle()
        }
    }
    world.step(step)
    window.requestAnimationFrame(loop)
}

/*
* 扩展方法
*/

/* pixi */
PIXI.DisplayObject.prototype.enable = function(anchor) {
    const
        point = this.getGlobalPosition(),
        body = world.createBody({
            type: planck.Body.DYNAMIC,
            position: planck.Vec2(point.x * step, point.y * step)
        })

    anchor = anchor || {x: .5, y: .5}
    this.anchor ? this.anchor.set(anchor.x, anchor.y) :
            this.pivot.set(this.width * anchor.x, this.height * anchor.y)

    body.node = this
    this.rigidBody = body

    body.lastPostion = body.getPosition().clone()

    return body
}

PIXI.DisplayObject.prototype.getJoints = function() {
    const joints = []
    for (let joint = this.rigidBody.getJointList(); joint; joint = joint.next) {
        joints.push(joint.joint)
    }
    return joints
}

/* 开启鼠标操作 */
PIXI.DisplayObject.prototype.enableMouseJonint = function() {
    let down

    this.interactive = true
    this.on('pointerdown', event => {
        down = true
        this.rigidBody.createMouseJoint(
            global.camera.toLocal(event.data.global)
        )
    }).on('pointermove', event => {
        if (down) {
            this.mouseJoint.follow(
                global.camera.toLocal(event.data.global)
            )
        }
    }).on('pointerup', () => {
        down = false
        this.rigidBody.destroyJoint(this.mouseJoint)
    }).on('pointerupoutside', () => {
        down = false
        this.rigidBody.destroyJoint(this.mouseJoint)
    })
}

/* planck */

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

planck.Body.prototype.loadBox = function(w, h, fixtureDef={}) {
    this.createFixture(
        planck.Box(w * step, h * step),
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

planck.Body.prototype.destroyJoint = function(joint) {
    world.destroyJoint(joint)
    return this
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

planck.Body.prototype.createMouseJoint = function(point) {
    const
        ground  = world.createBody()

    this.node.mouseJoint = world.createJoint(
        planck.MouseJoint(
            {maxForce: 1e3},
            ground, this,
            planck.Vec2(point.x * step, point.y * step)
        )
    )

    return this
}

planck.MouseJoint.prototype.follow = function(point) {
    point.x *= step
    point.y *= step
    this.setTarget(point)
}




