"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An M3 bone.
 */
class M3Bone {
    constructor(bone) {
        const flags = bone.flags;
        this.name = bone.name.get();
        this.parent = bone.parent;
        this.location = bone.location;
        this.rotation = bone.rotation;
        this.scale = bone.scale;
        this.visibility = bone.visibility;
        this.inhertTranslation = flags & 0x1;
        this.inheritScale = flags & 0x2;
        this.inheritRotation = flags & 0x4;
        this.billboard1 = flags & 0x10;
        this.billboard2 = flags & 0x40;
        this.twoDProjection = flags & 0x100;
        this.animated = flags & 0x200;
        this.inverseKinematics = flags & 0x400;
        this.skinned = flags & 0x800;
        this.real = flags & 0x2000;
    }
}
exports.default = M3Bone;
//# sourceMappingURL=bone.js.map