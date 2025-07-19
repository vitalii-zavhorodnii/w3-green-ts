"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericobject_1 = require("./genericobject");
/**
 * A ribbon emitter.
 */
class RibbonEmitter extends genericobject_1.default {
    constructor() {
        super(0x4000);
        this.heightAbove = 0;
        this.heightBelow = 0;
        this.alpha = 0;
        this.color = new Float32Array(3);
        this.lifeSpan = 0;
        this.textureSlot = 0;
        this.emissionRate = 0;
        this.rows = 0;
        this.columns = 0;
        this.materialId = 0;
        this.gravity = 0;
    }
    readMdx(stream) {
        const start = stream.index;
        const size = stream.readUint32();
        super.readMdx(stream);
        this.heightAbove = stream.readFloat32();
        this.heightBelow = stream.readFloat32();
        this.alpha = stream.readFloat32();
        stream.readFloat32Array(this.color);
        this.lifeSpan = stream.readFloat32();
        this.textureSlot = stream.readUint32();
        this.emissionRate = stream.readUint32();
        this.rows = stream.readUint32();
        this.columns = stream.readUint32();
        this.materialId = stream.readInt32();
        this.gravity = stream.readFloat32();
        this.readAnimations(stream, size - (stream.index - start));
    }
    writeMdx(stream) {
        stream.writeUint32(this.getByteLength());
        super.writeMdx(stream);
        stream.writeFloat32(this.heightAbove);
        stream.writeFloat32(this.heightBelow);
        stream.writeFloat32(this.alpha);
        stream.writeFloat32Array(this.color);
        stream.writeFloat32(this.lifeSpan);
        stream.writeUint32(this.textureSlot);
        stream.writeUint32(this.emissionRate);
        stream.writeUint32(this.rows);
        stream.writeUint32(this.columns);
        stream.writeInt32(this.materialId);
        stream.writeFloat32(this.gravity);
        this.writeNonGenericAnimationChunks(stream);
    }
    readMdl(stream) {
        for (const token of super.readGenericBlock(stream)) {
            if (token === 'static HeightAbove') {
                this.heightAbove = stream.readFloat();
            }
            else if (token === 'HeightAbove') {
                this.readAnimation(stream, 'KRHA');
            }
            else if (token === 'static HeightBelow') {
                this.heightBelow = stream.readFloat();
            }
            else if (token === 'HeightBelow') {
                this.readAnimation(stream, 'KRHB');
            }
            else if (token === 'static Alpha') {
                this.alpha = stream.readFloat();
            }
            else if (token === 'Alpha') {
                this.readAnimation(stream, 'KRAL');
            }
            else if (token === 'static Color') {
                stream.readColor(this.color);
            }
            else if (token === 'Color') {
                this.readAnimation(stream, 'KRCO');
            }
            else if (token === 'static TextureSlot') {
                this.textureSlot = stream.readInt();
            }
            else if (token === 'TextureSlot') {
                this.readAnimation(stream, 'KRTX');
            }
            else if (token === 'Visibility') {
                this.readAnimation(stream, 'KRVS');
            }
            else if (token === 'EmissionRate') {
                this.emissionRate = stream.readInt();
            }
            else if (token === 'LifeSpan') {
                this.lifeSpan = stream.readFloat();
            }
            else if (token === 'Gravity') {
                this.gravity = stream.readFloat();
            }
            else if (token === 'Rows') {
                this.rows = stream.readInt();
            }
            else if (token === 'Columns') {
                this.columns = stream.readInt();
            }
            else if (token === 'MaterialID') {
                this.materialId = stream.readInt();
            }
            else {
                throw new Error(`Unknown token in RibbonEmitter: "${token}"`);
            }
        }
    }
    writeMdl(stream) {
        stream.startObjectBlock('RibbonEmitter', this.name);
        this.writeGenericHeader(stream);
        if (!this.writeAnimation(stream, 'KRHA')) {
            stream.writeNumberAttrib('static HeightAbove', this.heightAbove);
        }
        if (!this.writeAnimation(stream, 'KRHB')) {
            stream.writeNumberAttrib('static HeightBelow', this.heightBelow);
        }
        if (!this.writeAnimation(stream, 'KRAL')) {
            stream.writeNumberAttrib('static Alpha', this.alpha);
        }
        if (!this.writeAnimation(stream, 'KRCO')) {
            stream.writeColor('static Color', this.color);
        }
        if (!this.writeAnimation(stream, 'KRTX')) {
            stream.writeNumberAttrib('static TextureSlot', this.textureSlot);
        }
        this.writeAnimation(stream, 'KRVS');
        stream.writeNumberAttrib('EmissionRate', this.emissionRate);
        stream.writeNumberAttrib('LifeSpan', this.lifeSpan);
        if (this.gravity !== 0) {
            stream.writeNumberAttrib('Gravity', this.gravity);
        }
        stream.writeNumberAttrib('Rows', this.rows);
        stream.writeNumberAttrib('Columns', this.columns);
        stream.writeNumberAttrib('MaterialID', this.materialId);
        this.writeGenericAnimations(stream);
        stream.endBlock();
    }
    getByteLength() {
        return 56 + super.getByteLength();
    }
}
exports.default = RibbonEmitter;
//# sourceMappingURL=ribbonemitter.js.map