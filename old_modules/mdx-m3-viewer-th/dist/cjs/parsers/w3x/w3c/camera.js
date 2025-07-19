"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utf8_1 = require("../../../common/utf8");
/**
 * A camera.
 */
class Camera {
    constructor() {
        this.targetLocation = new Float32Array(3);
        this.rotation = 0;
        this.angleOfAttack = 0;
        this.distance = 0;
        this.roll = 0;
        this.fieldOfView = 0;
        this.farClippingPlane = 0;
        this.nearClippingPlane = 0;
        this.cinematicName = '';
        /**
         * @since Game version 1.32
         */
        this.localPitch = 0;
        /**
         * @since Game version 1.32
         */
        this.localYaw = 0;
        /**
         * @since Game version 1.32
         */
        this.localRoll = 0;
    }
    load(stream, buildVersion) {
        stream.readFloat32Array(this.targetLocation);
        this.rotation = stream.readFloat32(); // in degrees
        this.angleOfAttack = stream.readFloat32(); // in degrees
        this.distance = stream.readFloat32();
        this.roll = stream.readFloat32();
        this.fieldOfView = stream.readFloat32(); // in degrees
        this.farClippingPlane = stream.readFloat32();
        this.nearClippingPlane = stream.readFloat32();
        this.cinematicName = stream.readNull();
        if (buildVersion > 131) {
            this.localPitch = stream.readFloat32();
            this.localYaw = stream.readFloat32();
            this.localRoll = stream.readFloat32();
        }
    }
    save(stream, buildVersion) {
        stream.writeFloat32Array(this.targetLocation);
        stream.writeFloat32(this.rotation);
        stream.writeFloat32(this.angleOfAttack);
        stream.writeFloat32(this.distance);
        stream.writeFloat32(this.roll);
        stream.writeFloat32(this.fieldOfView);
        stream.writeFloat32(this.farClippingPlane);
        stream.writeFloat32(this.nearClippingPlane);
        stream.writeNull(this.cinematicName);
        if (buildVersion > 131) {
            stream.writeFloat32(this.localPitch);
            stream.writeFloat32(this.localYaw);
            stream.writeFloat32(this.localRoll);
        }
    }
    getByteLength(buildVersion) {
        let size = 41 + utf8_1.byteLengthUtf8(this.cinematicName);
        if (buildVersion > 131) {
            size += 12;
        }
        return size;
    }
}
exports.default = Camera;
//# sourceMappingURL=camera.js.map