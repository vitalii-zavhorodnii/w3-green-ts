"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skeletalnode_1 = require("../../skeletalnode");
const node_1 = require("./node");
/**
 * M3 skeleton.
 */
class M3Skeleton {
    constructor(instance) {
        const model = instance.model;
        const bones = model.bones;
        const boneLookup = model.boneLookup;
        const sharedNodeData = skeletalnode_1.createSkeletalNodes(bones.length, node_1.default);
        const nodes = sharedNodeData.nodes;
        this.nodes = nodes;
        this.worldMatrices = sharedNodeData.worldMatrices;
        this.instance = instance;
        this.modelNodes = bones;
        this.initialReference = model.initialReference;
        this.sts = model.sts;
        this.stc = model.stc;
        this.stg = model.stg;
        this.boneLookup = boneLookup;
        // Set the bone parent references
        for (let i = 0, l = bones.length; i < l; i++) {
            const bone = bones[i];
            if (bone.parent === -1) {
                nodes[i].parent = instance;
            }
            else {
                nodes[i].parent = nodes[bone.parent];
            }
            if (bone.billboard1) {
                nodes[i].billboarded = true;
            }
        }
    }
    update(dt) {
        const instance = this.instance;
        const nodes = this.nodes;
        const modelNodes = this.modelNodes;
        for (let i = 0, l = nodes.length; i < l; i++) {
            const node = nodes[i];
            const modelNode = modelNodes[i];
            this.getValue4(node.localRotation, modelNode.rotation, instance);
            this.getValue3(node.localLocation, modelNode.location, instance);
            this.getValue3(node.localScale, modelNode.scale, instance);
            node.recalculateTransformation(instance);
            // Recalculate and update child nodes.
            // Note that this only affects normal nodes such as instances, and not skeletal nodes.
            for (const child of node.children) {
                child.recalculateTransformation();
                child.update(dt);
            }
        }
    }
    getValueUnsafe(animRef, instance) {
        const sequence = instance.sequence;
        if (sequence !== -1) {
            return this.stg[sequence].getValueUnsafe(animRef, instance);
        }
        return animRef.initValue;
    }
    getValue(animRef, instance) {
        return this.getValueUnsafe(animRef, instance);
    }
    getValue2(out, animRef, instance) {
        const unsafeHeap = this.getValueUnsafe(animRef, instance);
        out[0] = unsafeHeap[0];
        out[1] = unsafeHeap[1];
        return out;
    }
    getValue3(out, animRef, instance) {
        const unsafeHeap = this.getValueUnsafe(animRef, instance);
        out[0] = unsafeHeap[0];
        out[1] = unsafeHeap[1];
        out[2] = unsafeHeap[2];
        return out;
    }
    getValue4(out, animRef, instance) {
        const unsafeHeap = this.getValueUnsafe(animRef, instance);
        out[0] = unsafeHeap[0];
        out[1] = unsafeHeap[1];
        out[2] = unsafeHeap[2];
        out[3] = unsafeHeap[3];
        return out;
    }
}
exports.default = M3Skeleton;
//# sourceMappingURL=skeleton.js.map