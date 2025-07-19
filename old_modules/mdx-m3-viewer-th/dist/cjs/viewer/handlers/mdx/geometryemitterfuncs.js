"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderEmitter = exports.SETTING_PARTICLES_HIGH = exports.EMITTER_EVENT_TEXTURE_OFFSET = exports.EMITTER_PARTICLE2_TEXTURE_OFFSET = exports.EMITTER_UBERSPLAT = exports.EMITTER_SPLAT = exports.EMITTER_RIBBON = exports.EMITTER_PARTICLE2 = exports.BYTE_OFFSET_TEAM_COLOR = exports.FLOAT_OFFSET_HEALTH = exports.FLOAT_OFFSET_P3 = exports.FLOAT_OFFSET_P2 = exports.FLOAT_OFFSET_P1 = exports.FLOAT_OFFSET_P0 = exports.BYTE_OFFSET_LEFT_RIGHT_TOP = exports.BYTE_OFFSET_TAIL = exports.BYTE_OFFSET_COLOR = exports.BYTE_OFFSET_HEALTH = exports.BYTE_OFFSET_P3 = exports.BYTE_OFFSET_P2 = exports.BYTE_OFFSET_P1 = exports.BYTE_OFFSET_P0 = exports.FLOATS_PER_OBJECT = exports.BYTES_PER_OBJECT = void 0;
const gl_matrix_1 = require("gl-matrix");
const locationHeap = gl_matrix_1.vec3.create();
const startHeap = gl_matrix_1.vec3.create();
const endHeap = gl_matrix_1.vec3.create();
// The total storage that emitted objects can use.
// This is enough to support all of the MDX geometry emitters.
// The memory layout is the same as this C struct:
//
//   struct {
//     float p0[3]
//     float p1[3]
//     float p2[3]
//     float p3[3]
//     float health
//     byte color[4]
//     byte tail
//     byte leftRightTop[3]
//   }
//
exports.BYTES_PER_OBJECT = 60;
exports.FLOATS_PER_OBJECT = exports.BYTES_PER_OBJECT >> 2;
// Offsets into the emitted object structure.
exports.BYTE_OFFSET_P0 = 0;
exports.BYTE_OFFSET_P1 = 12;
exports.BYTE_OFFSET_P2 = 24;
exports.BYTE_OFFSET_P3 = 36;
exports.BYTE_OFFSET_HEALTH = 48;
exports.BYTE_OFFSET_COLOR = 52;
exports.BYTE_OFFSET_TAIL = 56;
exports.BYTE_OFFSET_LEFT_RIGHT_TOP = 57;
// Offset aliases.
exports.FLOAT_OFFSET_P0 = exports.BYTE_OFFSET_P0 >> 2;
exports.FLOAT_OFFSET_P1 = exports.BYTE_OFFSET_P1 >> 2;
exports.FLOAT_OFFSET_P2 = exports.BYTE_OFFSET_P2 >> 2;
exports.FLOAT_OFFSET_P3 = exports.BYTE_OFFSET_P3 >> 2;
exports.FLOAT_OFFSET_HEALTH = exports.BYTE_OFFSET_HEALTH >> 2;
exports.BYTE_OFFSET_TEAM_COLOR = exports.BYTE_OFFSET_LEFT_RIGHT_TOP;
// Emitter types
exports.EMITTER_PARTICLE2 = 0;
exports.EMITTER_RIBBON = 1;
exports.EMITTER_SPLAT = 2;
exports.EMITTER_UBERSPLAT = 3;
// Offsets for overriding emitter textures using setResource().
exports.EMITTER_PARTICLE2_TEXTURE_OFFSET = 1000;
exports.EMITTER_EVENT_TEXTURE_OFFSET = 10000;
// The game scales the emission rate of particle emitters depending on the particles setting.
// High seems to double the emission.
exports.SETTING_PARTICLES_HIGH = 2;
function bindParticleEmitter2Buffer(emitter, buffer) {
    const instance = emitter.instance;
    const objects = emitter.objects;
    const byteView = buffer.byteView;
    const floatView = buffer.floatView;
    const emitterObject = emitter.emitterObject;
    const modelSpace = emitterObject.modelSpace;
    const tailLength = emitterObject.tailLength;
    const node = emitter.node;
    const teamColor = instance.teamColor;
    let offset = 0;
    for (const object of objects) {
        const byteOffset = offset * exports.BYTES_PER_OBJECT;
        const floatOffset = offset * exports.FLOATS_PER_OBJECT;
        const p0Offset = floatOffset + exports.FLOAT_OFFSET_P0;
        let location = object.location;
        const scale = object.scale;
        const tail = object.tail;
        if (tail === 0 /* Head */) {
            // If this is a model space emitter, the location is in local space, so convert it to world space.
            if (modelSpace) {
                location = gl_matrix_1.vec3.transformMat4(locationHeap, location, node.worldMatrix);
            }
            floatView[p0Offset + 0] = location[0];
            floatView[p0Offset + 1] = location[1];
            floatView[p0Offset + 2] = location[2];
            // Used to rotate XY particles to face their velocity on the XY plane.
            floatView[p0Offset + 3] = object.facing;
        }
        else {
            const velocity = object.velocity;
            let start = startHeap;
            let end = location;
            start[0] = end[0] - tailLength * velocity[0];
            start[1] = end[1] - tailLength * velocity[1];
            start[2] = end[2] - tailLength * velocity[2];
            // If this is a model space emitter, the start and end are in local space, so convert them to world space.
            if (modelSpace) {
                start = gl_matrix_1.vec3.transformMat4(start, start, node.worldMatrix);
                end = gl_matrix_1.vec3.transformMat4(endHeap, end, node.worldMatrix);
            }
            floatView[p0Offset + 0] = start[0];
            floatView[p0Offset + 1] = start[1];
            floatView[p0Offset + 2] = start[2];
            floatView[p0Offset + 3] = end[0];
            floatView[p0Offset + 4] = end[1];
            floatView[p0Offset + 5] = end[2];
        }
        floatView[p0Offset + 6] = scale[0];
        floatView[p0Offset + 7] = scale[0];
        floatView[p0Offset + 8] = scale[0];
        floatView[floatOffset + exports.FLOAT_OFFSET_HEALTH] = object.health;
        byteView[byteOffset + exports.BYTE_OFFSET_TAIL] = tail;
        byteView[byteOffset + exports.BYTE_OFFSET_TEAM_COLOR] = teamColor;
        offset += 1;
    }
}
function bindParticleEmitter2Shader(emitter, shader) {
    const instance = emitter.instance;
    const textureOverrides = instance.textureOverrides;
    const scene = instance.scene;
    const camera = scene.camera;
    const emitterObject = emitter.emitterObject;
    const model = emitterObject.model;
    const viewer = model.viewer;
    const gl = viewer.gl;
    const mdxCache = viewer.sharedCache.get('mdx');
    const uniforms = shader.uniforms;
    const colors = emitterObject.colors;
    const intervals = emitterObject.intervals;
    const replaceable = emitterObject.replaceableId;
    let vectors;
    let mdxTexture = emitterObject.internalTexture;
    gl.blendFunc(emitterObject.blendSrc, emitterObject.blendDst);
    gl.uniform1f(uniforms['u_filterMode'], emitterObject.filterMode);
    // Determine where this texture is coming from.
    // This is to get the texture wrap modes.
    // The texture is either a replaceable in which case it's stored internally, a team color in which case it's stored in the handler, or a reference to one of the model textures.
    if (emitterObject.internalTexture) {
        mdxTexture = emitterObject.internalTexture;
    }
    else if (replaceable === 1) {
        mdxTexture = mdxCache.teamColors[instance.teamColor];
    }
    else if (replaceable === 2) {
        mdxTexture = mdxCache.teamGlows[instance.teamColor];
    }
    else {
        mdxTexture = model.textures[emitterObject.textureId];
    }
    // Now get the actual texture itself.
    // First check if there is an override for this particle emitter.
    let texture = textureOverrides.get(exports.EMITTER_PARTICLE2_TEXTURE_OFFSET + emitterObject.index);
    if (!texture) {
        // Next check if there is an override for model textures if this is one.
        if (replaceable === 0) {
            texture = textureOverrides.get(emitterObject.textureId);
        }
        // If there is still no override, get it from the existing texture object.
        if (!texture) {
            texture = mdxTexture.texture;
        }
    }
    viewer.webgl.bindTextureAndWrap(texture, 0, mdxTexture.wrapS, mdxTexture.wrapT);
    // Choose between a default rectangle or a billboarded one
    if (emitterObject.xYQuad) {
        vectors = camera.vectors;
    }
    else {
        vectors = camera.billboardedVectors;
    }
    gl.uniform1f(uniforms['u_lifeSpan'], emitterObject.lifeSpan);
    gl.uniform1f(uniforms['u_timeMiddle'], emitterObject.timeMiddle);
    gl.uniform1f(uniforms['u_columns'], emitterObject.columns);
    gl.uniform1f(uniforms['u_rows'], emitterObject.rows);
    gl.uniform1f(uniforms['u_teamColored'], emitterObject.teamColored);
    gl.uniform3fv(uniforms['u_intervals[0]'], intervals[0]);
    gl.uniform3fv(uniforms['u_intervals[1]'], intervals[1]);
    gl.uniform3fv(uniforms['u_intervals[2]'], intervals[2]);
    gl.uniform3fv(uniforms['u_intervals[3]'], intervals[3]);
    gl.uniform4fv(uniforms['u_colors[0]'], colors[0]);
    gl.uniform4fv(uniforms['u_colors[1]'], colors[1]);
    gl.uniform4fv(uniforms['u_colors[2]'], colors[2]);
    gl.uniform3fv(uniforms['u_scaling'], emitterObject.scaling);
    if (emitterObject.head) {
        gl.uniform3fv(uniforms['u_vertices[0]'], vectors[0]);
        gl.uniform3fv(uniforms['u_vertices[1]'], vectors[1]);
        gl.uniform3fv(uniforms['u_vertices[2]'], vectors[2]);
        gl.uniform3fv(uniforms['u_vertices[3]'], vectors[3]);
    }
    if (emitterObject.tail) {
        gl.uniform3fv(uniforms['u_cameraZ'], camera.directionZ);
    }
}
function bindRibbonEmitterBuffer(emitter, buffer) {
    let object = emitter.first;
    const byteView = buffer.byteView;
    const floatView = buffer.floatView;
    const emitterObject = emitter.emitterObject;
    const columns = emitterObject.columns;
    const alive = emitter.alive;
    const chainLengthFactor = 1 / (alive - 1);
    let offset = 0;
    while (object.next) {
        const next = object.next.vertices;
        const byteOffset = offset * exports.BYTES_PER_OBJECT;
        const floatOffset = offset * exports.FLOATS_PER_OBJECT;
        const p0Offset = floatOffset + exports.FLOAT_OFFSET_P0;
        const colorOffset = byteOffset + exports.BYTE_OFFSET_COLOR;
        const leftRightTopOffset = byteOffset + exports.BYTE_OFFSET_LEFT_RIGHT_TOP;
        const left = ((object.slot % columns) + (1 - (offset * chainLengthFactor) - chainLengthFactor)) / columns;
        const top = object.slot / columns;
        const right = left + chainLengthFactor;
        const vertices = object.vertices;
        const color = object.color;
        floatView[p0Offset + 0] = vertices[0];
        floatView[p0Offset + 1] = vertices[1];
        floatView[p0Offset + 2] = vertices[2];
        floatView[p0Offset + 3] = vertices[3];
        floatView[p0Offset + 4] = vertices[4];
        floatView[p0Offset + 5] = vertices[5];
        floatView[p0Offset + 6] = next[3];
        floatView[p0Offset + 7] = next[4];
        floatView[p0Offset + 8] = next[5];
        floatView[p0Offset + 9] = next[0];
        floatView[p0Offset + 10] = next[1];
        floatView[p0Offset + 11] = next[2];
        byteView[colorOffset + 0] = color[0];
        byteView[colorOffset + 1] = color[1];
        byteView[colorOffset + 2] = color[2];
        byteView[colorOffset + 3] = color[3];
        byteView[leftRightTopOffset + 0] = left * 255;
        byteView[leftRightTopOffset + 1] = right * 255;
        byteView[leftRightTopOffset + 2] = top * 255;
        object = object.next;
        offset += 1;
    }
}
function bindRibbonEmitterShader(emitter, shader) {
    const textureOverrides = emitter.instance.textureOverrides;
    const emitterObject = emitter.emitterObject;
    const layer = emitterObject.layer;
    const model = emitterObject.model;
    const gl = model.viewer.gl;
    const uniforms = shader.uniforms;
    const texture = model.textures[layer.textureId];
    const actualTexture = textureOverrides.get(layer.textureId) || texture.texture;
    layer.bind(shader);
    gl.uniform1f(uniforms['u_filterMode'], layer.filterMode);
    model.viewer.webgl.bindTextureAndWrap(actualTexture, 0, texture.wrapS, texture.wrapT);
    gl.uniform1f(uniforms['u_columns'], emitterObject.columns);
    gl.uniform1f(uniforms['u_rows'], emitterObject.rows);
}
function bindEventObjectEmitterBuffer(emitter, buffer) {
    const objects = emitter.objects;
    const floatView = buffer.floatView;
    let offset = 0;
    for (const object of objects) {
        const floatOffset = offset * exports.FLOATS_PER_OBJECT;
        const p0Offset = floatOffset + exports.FLOAT_OFFSET_P0;
        const vertices = object.vertices;
        floatView[p0Offset + 0] = vertices[0];
        floatView[p0Offset + 1] = vertices[1];
        floatView[p0Offset + 2] = vertices[2];
        floatView[p0Offset + 3] = vertices[3];
        floatView[p0Offset + 4] = vertices[4];
        floatView[p0Offset + 5] = vertices[5];
        floatView[p0Offset + 6] = vertices[6];
        floatView[p0Offset + 7] = vertices[7];
        floatView[p0Offset + 8] = vertices[8];
        floatView[p0Offset + 9] = vertices[9];
        floatView[p0Offset + 10] = vertices[10];
        floatView[p0Offset + 11] = vertices[11];
        floatView[floatOffset + exports.FLOAT_OFFSET_HEALTH] = object.health;
        offset += 1;
    }
}
function bindEventObjectSplEmitterShader(emitter, shader) {
    const textureOverrides = emitter.instance.textureOverrides;
    const emitterObject = emitter.emitterObject;
    const intervalTimes = emitterObject.intervalTimes;
    const intervals = emitterObject.intervals;
    const colors = emitterObject.colors;
    const model = emitterObject.model;
    const gl = model.viewer.gl;
    const uniforms = shader.uniforms;
    const texture = emitterObject.internalTexture;
    const actualTexture = textureOverrides.get(exports.EMITTER_EVENT_TEXTURE_OFFSET + emitterObject.index) || texture.texture;
    gl.blendFunc(emitterObject.blendSrc, emitterObject.blendDst);
    model.viewer.webgl.bindTextureAndWrap(actualTexture, 0, texture.wrapS, texture.wrapT);
    gl.uniform1f(uniforms['u_lifeSpan'], emitterObject.lifeSpan);
    gl.uniform1f(uniforms['u_columns'], emitterObject.columns);
    gl.uniform1f(uniforms['u_rows'], emitterObject.rows);
    // 3 because the uniform is shared with UBR, which has 3 values.
    gl.uniform3f(uniforms['u_intervalTimes'], intervalTimes[0], intervalTimes[1], 0);
    gl.uniform3fv(uniforms['u_intervals[0]'], intervals[0]);
    gl.uniform3fv(uniforms['u_intervals[1]'], intervals[1]);
    gl.uniform4fv(uniforms['u_colors[0]'], colors[0]);
    gl.uniform4fv(uniforms['u_colors[1]'], colors[1]);
    gl.uniform4fv(uniforms['u_colors[2]'], colors[2]);
}
function bindEventObjectUbrEmitterShader(emitter, shader) {
    const textureOverrides = emitter.instance.textureOverrides;
    const emitterObject = emitter.emitterObject;
    const intervalTimes = emitterObject.intervalTimes;
    const colors = emitterObject.colors;
    const model = emitterObject.model;
    const viewer = model.viewer;
    const gl = viewer.gl;
    const uniforms = shader.uniforms;
    const texture = emitterObject.internalTexture;
    const actualTexture = textureOverrides.get(exports.EMITTER_EVENT_TEXTURE_OFFSET + emitterObject.index) || texture.texture;
    gl.blendFunc(emitterObject.blendSrc, emitterObject.blendDst);
    model.viewer.webgl.bindTextureAndWrap(actualTexture, 0, texture.wrapS, texture.wrapT);
    gl.uniform1f(uniforms['u_lifeSpan'], emitterObject.lifeSpan);
    gl.uniform1f(uniforms['u_columns'], emitterObject.columns);
    gl.uniform1f(uniforms['u_rows'], emitterObject.rows);
    gl.uniform3fv(uniforms['u_intervalTimes'], intervalTimes);
    gl.uniform4fv(uniforms['u_colors[0]'], colors[0]);
    gl.uniform4fv(uniforms['u_colors[1]'], colors[1]);
    gl.uniform4fv(uniforms['u_colors[2]'], colors[2]);
}
function renderEmitter(emitter, shader) {
    let alive = emitter.alive;
    const emitterObject = emitter.emitterObject;
    const emitterType = emitterObject.geometryEmitterType;
    if (emitterType === exports.EMITTER_RIBBON) {
        alive -= 1;
    }
    if (alive > 0) {
        const viewer = emitter.instance.model.viewer;
        const buffer = viewer.buffer;
        const gl = viewer.gl;
        const instancedArrays = viewer.webgl.extensions['ANGLE_instanced_arrays'];
        const size = alive * exports.BYTES_PER_OBJECT;
        const attribs = shader.attribs;
        buffer.reserve(size);
        if (emitterType === exports.EMITTER_PARTICLE2) {
            bindParticleEmitter2Buffer(emitter, buffer);
            bindParticleEmitter2Shader(emitter, shader);
        }
        else if (emitterType === exports.EMITTER_RIBBON) {
            bindRibbonEmitterBuffer(emitter, buffer);
            bindRibbonEmitterShader(emitter, shader);
        }
        else if (emitterType === exports.EMITTER_SPLAT) {
            bindEventObjectEmitterBuffer(emitter, buffer);
            bindEventObjectSplEmitterShader(emitter, shader);
        }
        else {
            bindEventObjectEmitterBuffer(emitter, buffer);
            bindEventObjectUbrEmitterShader(emitter, shader);
        }
        buffer.bindAndUpdate(size);
        gl.uniform1i(shader.uniforms['u_emitter'], emitterType);
        gl.vertexAttribPointer(attribs['a_p0'], 3, gl.FLOAT, false, exports.BYTES_PER_OBJECT, exports.BYTE_OFFSET_P0);
        gl.vertexAttribPointer(attribs['a_p1'], 3, gl.FLOAT, false, exports.BYTES_PER_OBJECT, exports.BYTE_OFFSET_P1);
        gl.vertexAttribPointer(attribs['a_p2'], 3, gl.FLOAT, false, exports.BYTES_PER_OBJECT, exports.BYTE_OFFSET_P2);
        gl.vertexAttribPointer(attribs['a_p3'], 3, gl.FLOAT, false, exports.BYTES_PER_OBJECT, exports.BYTE_OFFSET_P3);
        gl.vertexAttribPointer(attribs['a_health'], 1, gl.FLOAT, false, exports.BYTES_PER_OBJECT, exports.BYTE_OFFSET_HEALTH);
        gl.vertexAttribPointer(attribs['a_color'], 4, gl.UNSIGNED_BYTE, true, exports.BYTES_PER_OBJECT, exports.BYTE_OFFSET_COLOR);
        gl.vertexAttribPointer(attribs['a_tail'], 1, gl.UNSIGNED_BYTE, false, exports.BYTES_PER_OBJECT, exports.BYTE_OFFSET_TAIL);
        gl.vertexAttribPointer(attribs['a_leftRightTop'], 3, gl.UNSIGNED_BYTE, false, exports.BYTES_PER_OBJECT, exports.BYTE_OFFSET_LEFT_RIGHT_TOP);
        instancedArrays.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 6, alive);
    }
}
exports.renderEmitter = renderEmitter;
//# sourceMappingURL=geometryemitterfuncs.js.map