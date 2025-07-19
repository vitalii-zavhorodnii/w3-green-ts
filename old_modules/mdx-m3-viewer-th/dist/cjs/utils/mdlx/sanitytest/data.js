"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericobject_1 = require("../../../parsers/mdlx/genericobject");
const utils_1 = require("./utils");
class SanityTestData {
    constructor(model) {
        this.objects = [];
        this.map = new Map();
        this.foundStand = false;
        this.foundDeath = false;
        this.boneUsageMap = new Map();
        this.model = model;
        this.current = { type: 'node', name: '', errors: 0, severe: 0, warnings: 0, unused: 0, nodes: [] };
        this.stack = [this.current];
        this.addObjects(model.sequences);
        this.addObjects(model.globalSequences);
        this.addObjects(model.textures);
        this.addObjects(model.materials);
        this.addObjects(model.textureAnimations);
        this.addObjects(model.geosets);
        this.addObjects(model.geosetAnimations);
        this.addObjects(model.bones);
        this.addObjects(model.lights);
        this.addObjects(model.helpers);
        this.addObjects(model.attachments);
        this.addObjects(model.particleEmitters);
        this.addObjects(model.particleEmitters2);
        this.addObjects(model.particleEmittersPopcorn);
        this.addObjects(model.ribbonEmitters);
        this.addObjects(model.cameras);
        this.addObjects(model.eventObjects);
        this.addObjects(model.collisionShapes);
        this.addObjects(model.faceEffects);
    }
    /**
     * Adds nodes for all of the given objects.
     * Also handles the flat array of generic objects.
     */
    addObjects(objects) {
        if (objects.length) {
            const areGeneric = objects[0] instanceof genericobject_1.default;
            for (let i = 0, l = objects.length; i < l; i++) {
                const object = objects[i];
                const name = utils_1.getObjectName(object, i);
                const node = { type: 'node', name, errors: 0, severe: 0, warnings: 0, unused: 0, nodes: [] };
                if (!areGeneric) {
                    node.uses = 0;
                }
                this.map.set(object, node);
            }
            if (areGeneric) {
                this.objects.push(...objects);
            }
        }
    }
    /**
     * Pushes to the stack the node the given object maps to.
     * If this node does not exist, a new one will be created, which is used by internal nodes like material layers.
     */
    push(object, index) {
        let node = this.map.get(object);
        if (!node) {
            const name = utils_1.getObjectName(object, index);
            node = { type: 'node', name, errors: 0, severe: 0, warnings: 0, unused: 0, nodes: [] };
        }
        this.current.nodes.push(node);
        this.current = node;
        this.stack.unshift(node);
    }
    /**
     * Pops the current node from the stack.
     */
    pop() {
        this.stack.shift();
        this.current = this.stack[0];
    }
    /**
     * Adds a reference to the node the given object maps to.
     */
    addReference(object) {
        const node = this.map.get(object);
        if (node.uses !== undefined) {
            node.uses += 1;
        }
    }
    /**
     * Add a reference to the current node.
     */
    addImplicitReference() {
        const node = this.current;
        if (node.uses !== undefined) {
            node.uses += 1;
        }
    }
    addError(message) {
        this.current.nodes.push({ type: 'error', message });
        for (const node of this.stack) {
            node.errors += 1;
        }
    }
    addSevere(message) {
        this.current.nodes.push({ type: 'severe', message });
        for (const node of this.stack) {
            node.severe += 1;
        }
    }
    addWarning(message) {
        this.current.nodes.push({ type: 'warning', message });
        for (const node of this.stack) {
            node.warnings += 1;
        }
    }
    addUnused(message) {
        this.current.nodes.push({ type: 'unused', message });
        for (const node of this.stack) {
            node.unused += 1;
        }
    }
    assertError(condition, message) {
        if (!condition) {
            this.addError(message);
        }
    }
    assertSevere(condition, message) {
        if (!condition) {
            this.addSevere(message);
        }
    }
    assertWarning(condition, message) {
        if (!condition) {
            this.addWarning(message);
        }
    }
    assertUnused(condition, message) {
        if (!condition) {
            this.addUnused(message);
        }
    }
}
exports.default = SanityTestData;
//# sourceMappingURL=data.js.map