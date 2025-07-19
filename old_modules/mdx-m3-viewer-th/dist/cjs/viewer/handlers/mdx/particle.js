"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
const gl_matrix_addon_1 = require("../../../common/gl-matrix-addon");
const math_1 = require("../../../common/math");
const emittedobject_1 = require("../../emittedobject");
const rotationHeap = gl_matrix_1.quat.create();
const velocityHeap = gl_matrix_1.vec3.create();
const latitudeHeap = new Float32Array(1);
// const longitudeHeap = new Float32Array(1);
const lifeSpanHeap = new Float32Array(1);
const gravityHeap = new Float32Array(1);
const speedHeap = new Float32Array(1);
/**
 * A spawned model particle.
 */
class Particle extends emittedobject_1.default {
    constructor(emitter) {
        super(emitter);
        this.velocity = gl_matrix_1.vec3.create();
        this.gravity = 0;
        const emitterObject = emitter.emitterObject;
        const model = emitterObject.internalModel;
        this.internalInstance = model.addInstance();
    }
    bind() {
        const emitter = this.emitter;
        const instance = emitter.instance;
        const sequence = instance.sequence;
        const frame = instance.frame;
        const counter = instance.counter;
        const scene = instance.scene;
        const emitterObject = emitter.emitterObject;
        const node = instance.nodes[emitterObject.index];
        const internalInstance = this.internalInstance;
        const scale = node.worldScale;
        const velocity = this.velocity;
        emitterObject.getLatitude(latitudeHeap, sequence, frame, counter);
        // emitterObject.getLongitude(longitudeHeap, sequence, frame, counter);
        emitterObject.getLifeSpan(lifeSpanHeap, sequence, frame, counter);
        emitterObject.getGravity(gravityHeap, sequence, frame, counter);
        emitterObject.getSpeed(speedHeap, sequence, frame, counter);
        this.health = lifeSpanHeap[0];
        this.gravity = gravityHeap[0] * scale[2];
        // Local rotation
        gl_matrix_1.quat.identity(rotationHeap);
        gl_matrix_1.quat.rotateZ(rotationHeap, rotationHeap, math_1.randomInRange(-Math.PI, Math.PI));
        gl_matrix_1.quat.rotateY(rotationHeap, rotationHeap, math_1.randomInRange(-latitudeHeap[0], latitudeHeap[0]));
        gl_matrix_1.vec3.transformQuat(velocity, gl_matrix_addon_1.VEC3_UNIT_Z, rotationHeap);
        // World rotation
        gl_matrix_1.vec3.transformQuat(velocity, velocity, node.worldRotation);
        // Apply speed
        gl_matrix_1.vec3.scale(velocity, velocity, speedHeap[0]);
        // Apply the parent's scale
        gl_matrix_1.vec3.mul(velocity, velocity, scale);
        internalInstance.setScene(scene);
        internalInstance.setSequence(0);
        internalInstance.setTransformation(node.worldLocation, gl_matrix_1.quat.setAxisAngle(rotationHeap, gl_matrix_addon_1.VEC3_UNIT_Z, math_1.randomInRange(0, Math.PI * 2)), node.worldScale);
        internalInstance.show();
    }
    update(dt) {
        const internalInstance = this.internalInstance;
        this.health -= dt;
        if (this.health > 0) {
            const velocity = this.velocity;
            velocity[2] -= this.gravity * dt;
            internalInstance.move(gl_matrix_1.vec3.scale(velocityHeap, velocity, dt));
        }
        else {
            internalInstance.hide();
        }
    }
}
exports.default = Particle;
//# sourceMappingURL=particle.js.map