"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericobject_1 = require("./genericobject");
/**
 * A light.
 */
class Light extends genericobject_1.default {
    constructor() {
        super(0x200);
        this.type = -1 /* None */;
        this.attenuation = new Float32Array(2);
        this.color = new Float32Array(3);
        this.intensity = 0;
        this.ambientColor = new Float32Array(3);
        this.ambientIntensity = 0;
    }
    readMdx(stream) {
        const start = stream.index;
        const size = stream.readUint32();
        super.readMdx(stream);
        this.type = stream.readUint32();
        stream.readFloat32Array(this.attenuation);
        stream.readFloat32Array(this.color);
        this.intensity = stream.readFloat32();
        stream.readFloat32Array(this.ambientColor);
        this.ambientIntensity = stream.readFloat32();
        this.readAnimations(stream, size - (stream.index - start));
    }
    writeMdx(stream) {
        stream.writeUint32(this.getByteLength());
        super.writeMdx(stream);
        stream.writeUint32(this.type);
        stream.writeFloat32Array(this.attenuation);
        stream.writeFloat32Array(this.color);
        stream.writeFloat32(this.intensity);
        stream.writeFloat32Array(this.ambientColor);
        stream.writeFloat32(this.ambientIntensity);
        this.writeNonGenericAnimationChunks(stream);
    }
    readMdl(stream) {
        for (const token of super.readGenericBlock(stream)) {
            if (token === 'Omnidirectional') {
                this.type = 0 /* Omnidirectional */;
            }
            else if (token === 'Directional') {
                this.type = 1 /* Directional */;
            }
            else if (token === 'Ambient') {
                this.type = 2 /* Ambient */;
            }
            else if (token === 'static AttenuationStart') {
                this.attenuation[0] = stream.readFloat();
            }
            else if (token === 'AttenuationStart') {
                this.readAnimation(stream, 'KLAS');
            }
            else if (token === 'static AttenuationEnd') {
                this.attenuation[1] = stream.readFloat();
            }
            else if (token === 'AttenuationEnd') {
                this.readAnimation(stream, 'KLAE');
            }
            else if (token === 'static Intensity') {
                this.intensity = stream.readFloat();
            }
            else if (token === 'Intensity') {
                this.readAnimation(stream, 'KLAI');
            }
            else if (token === 'static Color') {
                stream.readColor(this.color);
            }
            else if (token === 'Color') {
                this.readAnimation(stream, 'KLAC');
            }
            else if (token === 'static AmbIntensity') {
                this.ambientIntensity = stream.readFloat();
            }
            else if (token === 'AmbIntensity') {
                this.readAnimation(stream, 'KLBI');
            }
            else if (token === 'static AmbColor') {
                stream.readColor(this.ambientColor);
            }
            else if (token === 'AmbColor') {
                this.readAnimation(stream, 'KLBC');
            }
            else if (token === 'Visibility') {
                this.readAnimation(stream, 'KLAV');
            }
            else {
                throw new Error(`Unknown token in Light: "${token}"`);
            }
        }
    }
    writeMdl(stream) {
        stream.startObjectBlock('Light', this.name);
        this.writeGenericHeader(stream);
        if (this.type === 0 /* Omnidirectional */) {
            stream.writeFlag('Omnidirectional');
        }
        else if (this.type === 1 /* Directional */) {
            stream.writeFlag('Directional');
        }
        else if (this.type === 2 /* Ambient */) {
            stream.writeFlag('Ambient');
        }
        if (!this.writeAnimation(stream, 'KLAS')) {
            stream.writeNumberAttrib('static AttenuationStart', this.attenuation[0]);
        }
        if (!this.writeAnimation(stream, 'KLAE')) {
            stream.writeNumberAttrib('static AttenuationEnd', this.attenuation[1]);
        }
        if (!this.writeAnimation(stream, 'KLAI')) {
            stream.writeNumberAttrib('static Intensity', this.intensity);
        }
        if (!this.writeAnimation(stream, 'KLAC')) {
            stream.writeColor('static Color', this.color);
        }
        if (!this.writeAnimation(stream, 'KLBI')) {
            stream.writeNumberAttrib('static AmbIntensity', this.ambientIntensity);
        }
        if (!this.writeAnimation(stream, 'KLBC')) {
            stream.writeColor('static AmbColor', this.ambientColor);
        }
        this.writeAnimation(stream, 'KLAV');
        this.writeGenericAnimations(stream);
        stream.endBlock();
    }
    getByteLength() {
        return 48 + super.getByteLength();
    }
}
exports.default = Light;
//# sourceMappingURL=light.js.map