"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geoset_1 = require("./geoset");
const batch_1 = require("./batch");
function setupGeosets(model, geosets) {
    if (geosets.length > 0) {
        const gl = model.viewer.gl;
        let positionBytes = 0;
        let normalBytes = 0;
        let uvBytes = 0;
        let tangentBytes = 0;
        let skinBytes = 0;
        let faceBytes = 0;
        const skinTypes = [];
        for (let i = 0, l = geosets.length; i < l; i++) {
            const geoset = geosets[i];
            if (geoset.lod === 0 || geoset.lod === -1) {
                const vertices = geoset.vertices.length / 3;
                positionBytes += vertices * 12;
                normalBytes += vertices * 12;
                uvBytes += geoset.uvSets.length * vertices * 8;
                if (geoset.tangents.length) {
                    tangentBytes += vertices * 16;
                }
                if (geoset.skin.length) {
                    skinBytes += vertices * 8;
                    skinTypes[i] = batch_1.SkinningType.Skin;
                }
                else {
                    let biggestGroup = 0;
                    for (const group of geoset.matrixGroups) {
                        if (group > biggestGroup) {
                            biggestGroup = group;
                        }
                    }
                    if (biggestGroup > 4) {
                        skinBytes += vertices * 9;
                        skinTypes[i] = batch_1.SkinningType.ExtendedVertexGroups;
                    }
                    else {
                        skinBytes += vertices * 5;
                        skinTypes[i] = batch_1.SkinningType.VertexGroups;
                    }
                }
                faceBytes += geoset.faces.byteLength;
            }
        }
        let positionOffset = 0;
        let normalOffset = positionOffset + positionBytes;
        let uvOffset = normalOffset + normalBytes;
        let tangentOffset = uvOffset + uvBytes;
        let skinOffset = tangentOffset + tangentBytes;
        let faceOffset = 0;
        let SkinTypedArray = Uint8Array;
        let skinGlType = gl.UNSIGNED_BYTE;
        if (model.bones.length > 255) {
            skinBytes *= 2;
            SkinTypedArray = Uint16Array;
            skinGlType = gl.UNSIGNED_SHORT;
        }
        model.skinDataType = skinGlType;
        model.bytesPerSkinElement = SkinTypedArray.BYTES_PER_ELEMENT;
        model.arrayBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, model.arrayBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, skinOffset + skinBytes, gl.STATIC_DRAW);
        model.elementBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.elementBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, faceBytes, gl.STATIC_DRAW);
        for (let i = 0, l = geosets.length; i < l; i++) {
            const geoset = geosets[i];
            if (geoset.lod === 0 || geoset.lod === -1) {
                const positions = geoset.vertices;
                const normals = geoset.normals;
                const uvSets = geoset.uvSets;
                const tangents = geoset.tangents;
                const faces = geoset.faces;
                let skin;
                const vertices = geoset.vertices.length / 3;
                const skinType = skinTypes[i];
                if (skinType === batch_1.SkinningType.Skin) {
                    skin = geoset.skin;
                }
                else {
                    const matrixIndices = geoset.matrixIndices;
                    const vertexGroups = geoset.vertexGroups;
                    const matrixGroups = [];
                    let offset = 0;
                    // Normally the shader supports up to 4 bones per vertex.
                    // This is enough for almost every existing Warcraft 3 model.
                    // That being said, there are a few models with geosets that need more, for example the Water Elemental.
                    // These geosets use a different shader, which support up to 8 bones per vertex.
                    let maxBones = 4;
                    if (skinType === batch_1.SkinningType.ExtendedVertexGroups) {
                        maxBones = 8;
                    }
                    skin = new SkinTypedArray(vertices * (maxBones + 1));
                    // Slice the matrix groups.
                    for (const size of geoset.matrixGroups) {
                        matrixGroups.push(matrixIndices.subarray(offset, offset + size));
                        offset += size;
                    }
                    // Parse the skinning.
                    for (let i = 0; i < vertices; i++) {
                        const matrixGroup = matrixGroups[vertexGroups[i]];
                        offset = i * (maxBones + 1);
                        // Somehow in some bad models a vertex group index refers to an invalid matrix group.
                        // Such models are still loaded by the game.
                        if (matrixGroup) {
                            const bones = Math.min(matrixGroup.length, maxBones);
                            for (let j = 0; j < bones; j++) {
                                skin[offset + j] = matrixGroup[j] + 1; // 1 is added to diffrentiate between matrix 0, and no matrix.
                            }
                            skin[offset + maxBones] = bones;
                        }
                    }
                }
                const vGeoset = new geoset_1.default(model, model.geosets.length, positionOffset, normalOffset, uvOffset, tangentOffset, skinOffset, faceOffset, vertices, faces.length, geoset.faceTypeGroups[0]);
                model.geosets.push(vGeoset);
                const material = model.materials[geoset.materialId];
                const isHd = material.shader === 'Shader_HD_DefaultUnit';
                if (isHd) {
                    model.batches.push(new batch_1.Batch(model.batches.length, vGeoset, material, skinType, true));
                }
                else {
                    for (const layer of material.layers) {
                        model.batches.push(new batch_1.Batch(model.batches.length, vGeoset, layer, skinType, false));
                    }
                }
                // Positions.
                gl.bufferSubData(gl.ARRAY_BUFFER, positionOffset, positions);
                positionOffset += positions.byteLength;
                // Normals.
                gl.bufferSubData(gl.ARRAY_BUFFER, normalOffset, normals);
                normalOffset += normals.byteLength;
                // Texture coordinates.
                for (const uvSet of uvSets) {
                    gl.bufferSubData(gl.ARRAY_BUFFER, uvOffset, uvSet);
                    uvOffset += uvSet.byteLength;
                }
                // Tangents.
                if (tangents.length) {
                    gl.bufferSubData(gl.ARRAY_BUFFER, tangentOffset, tangents);
                    tangentOffset += tangents.byteLength;
                }
                // Skin.
                gl.bufferSubData(gl.ARRAY_BUFFER, skinOffset, skin);
                skinOffset += skin.byteLength;
                // Faces.
                gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, faceOffset, faces);
                faceOffset += faces.byteLength;
            }
        }
    }
}
exports.default = setupGeosets;
//# sourceMappingURL=setupgeosets.js.map