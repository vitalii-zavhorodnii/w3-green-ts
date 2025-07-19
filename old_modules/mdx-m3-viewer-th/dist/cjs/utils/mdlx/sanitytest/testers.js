"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testBindPose = exports.testFaceEffect = exports.testCamera = exports.testEventObject = exports.testRibbonEmitter = exports.testParticleEmitterPopcorn = exports.testParticleEmitter2 = exports.testParticleEmitter = exports.testPivotPoints = exports.testAttachments = exports.testLight = exports.testBone = exports.testGeosetAnimation = exports.testGeoset = exports.testMaterial = exports.testTextures = exports.testGlobalSequence = exports.testSequences = exports.testHeader = void 0;
const path_1 = require("../../../common/path");
const utils_1 = require("./utils");
const tracks_1 = require("./tracks");
function testHeader(data) {
    const version = data.model.version;
    if (version !== 800 && version !== 900 && version !== 1000) {
        data.addWarning(`Unknown version: ${version}`);
    }
    if (version === 900) {
        data.addError('Version 900 is not supported by Warcrft 3');
    }
    if (data.model.animationFile !== '') {
        data.addWarning(`The animation file should probably be empty, currently set to: "${data.model.animationFile}"`);
    }
    utils_1.testExtent(data, data.model.extent);
}
exports.testHeader = testHeader;
function testSequences(data) {
    const sequences = data.model.sequences;
    if (sequences.length) {
        utils_1.testObjects(data, sequences, testSequence);
        data.assertSevere(data.foundStand, 'Missing "Stand" sequence');
        data.assertSevere(data.foundDeath, 'Missing "Death" sequence');
    }
    else {
        data.addWarning('No sequences');
    }
}
exports.testSequences = testSequences;
function testSequence(data, sequence, index) {
    const name = sequence.name;
    const tokens = name.toLowerCase().trim().split('-')[0].split(/\s+/);
    let token = tokens[0];
    const interval = sequence.interval;
    const length = interval[1] - interval[0];
    const sequences = data.model.sequences;
    for (let i = 0; i < index; i++) {
        const otherSequence = sequences[i];
        const otherInterval = otherSequence.interval;
        // Reforged fixed these weird issues with sequence ordering.
        if (data.model.version === 800) {
            if (interval[0] === otherInterval[0]) {
                data.addSevere(`This sequence starts at the same frame as sequence ${i} "${otherSequence.name}"`);
            }
            else if (interval[0] < otherInterval[1]) {
                data.addSevere(`This sequence starts before sequence ${i} "${otherSequence.name}" ends`);
            }
        }
    }
    if (token === 'alternate') {
        token = tokens[1];
    }
    if (token === 'stand') {
        data.foundStand = true;
    }
    if (token === 'death') {
        data.foundDeath = true;
    }
    data.addImplicitReference();
    data.assertWarning(utils_1.sequenceNames.has(token), `"${token}" is not a standard name`);
    data.assertWarning(length !== 0, 'Zero length');
    data.assertWarning(length > -1, `Negative length: ${length}`);
    utils_1.testExtent(data, sequence.extent);
}
function testGlobalSequence(data, sequence) {
    data.assertWarning(sequence !== 0, 'Zero length');
    data.assertWarning(sequence >= 0, `Negative length: ${sequence}`);
}
exports.testGlobalSequence = testGlobalSequence;
function testTextures(data) {
    const textures = data.model.textures;
    if (textures.length) {
        utils_1.testObjects(data, textures, testTexture);
    }
    else {
        data.addWarning('No textures');
    }
}
exports.testTextures = testTextures;
function testTexture(data, texture) {
    const replaceableId = texture.replaceableId;
    const path = texture.path.toLowerCase();
    const ext = path_1.extname(path);
    data.assertError(path === '' || ext === '.blp' || ext === '.tga' || ext === '.tif' || ext === '.dds', `Corrupted path: "${path}"`);
    data.assertError(replaceableId === 0 || utils_1.replaceableIds.has(replaceableId), `Unknown replaceable ID: ${replaceableId}`);
    data.assertWarning(path === '' || replaceableId === 0, `Path "${path}" and replaceable ID ${replaceableId} used together`);
}
function testMaterial(data, material) {
    const layers = material.layers;
    const shader = material.shader;
    if (data.model.version > 800) {
        data.assertWarning(shader === '' || shader === 'Shader_SD_FixedFunction' || shader === 'Shader_HD_DefaultUnit', `Unknown shader: "${shader}"`);
    }
    if (layers.length) {
        utils_1.testObjects(data, layers, testLayer);
    }
    else {
        data.addWarning('No layers');
    }
}
exports.testMaterial = testMaterial;
function testLayer(data, layer) {
    const textures = data.model.textures;
    const textureAnimations = data.model.textureAnimations;
    for (const textureId of utils_1.getTextureIds(layer)) {
        utils_1.testReference(data, textures, textureId, 'texture');
    }
    const textureAnimationId = layer.textureAnimationId;
    if (textureAnimationId !== -1) {
        utils_1.testReference(data, textureAnimations, textureAnimationId, 'texture animation');
    }
    const filterMode = layer.filterMode;
    data.assertWarning(filterMode >= 0 /* None */ && filterMode <= 6 /* Modulate2x */, `Invalid filter mode: ${layer.filterMode}`);
}
function testGeoset(data, geoset, index) {
    const geosetAnimations = data.model.geosetAnimations;
    const material = utils_1.testAndGetReference(data, data.model.materials, geoset.materialId, 'material');
    let isHd = false;
    if (material && material.shader === 'Shader_HD_DefaultUnit') {
        isHd = true;
    }
    if (!isHd) {
        // When a geoset has too many vertices (or faces? or both?) it will render completely bugged in WC3.
        // I don't know the exact number, but here are numbers that I tested:
        //
        //     Verts   Faces   Result
        //     ----------------------
        //     7433    16386   Bugged
        //     7394    16290   Good
        //
        const GUESSED_MAX_VERTICES = 7433 * 3;
        data.assertSevere(geoset.vertices.length < GUESSED_MAX_VERTICES, `Too many vertices in one geoset: ${geoset.vertices.length / 3}`);
    }
    utils_1.testGeosetSkinning(data, geoset);
    if (geosetAnimations.length) {
        const references = [];
        for (let j = 0, k = geosetAnimations.length; j < k; j++) {
            if (geosetAnimations[j].geosetId === index) {
                references.push(j);
            }
        }
        data.assertWarning(references.length <= 1, `Referenced by ${references.length} geoset animations: ${references.join(', ')}`);
    }
    if (geoset.faces.length) {
        data.addImplicitReference();
    }
    else {
        // The game and my code have no issue with geosets containing no faces, but Magos crashes, so add a warning in addition to it being useless.
        data.addWarning('Zero faces');
    }
    // The game and my code have no issue with geosets having any number of sequence extents, but Magos fails to parse, so add a warning.
    // Either way this is only relevant to version 800, because there seem to always be 0 extents in >800 models.
    if (geoset.sequenceExtents.length !== data.model.sequences.length && data.model.version === 800) {
        data.addWarning(`Number of sequence extents (${geoset.sequenceExtents.length}) does not match the number of sequences (${data.model.sequences.length})`);
    }
    utils_1.testExtent(data, geoset.extent);
    for (const extent of geoset.sequenceExtents) {
        utils_1.testExtent(data, extent);
    }
}
exports.testGeoset = testGeoset;
function testGeosetAnimation(data, geosetAnimation) {
    const geosets = data.model.geosets;
    const geosetId = geosetAnimation.geosetId;
    data.addImplicitReference();
    utils_1.testReference(data, geosets, geosetId, 'geoset');
}
exports.testGeosetAnimation = testGeosetAnimation;
const SUPPOSED_ALPHA_THRESHOLD = 0.1;
function testBone(data, bone, index) {
    const geosets = data.model.geosets;
    const geosetAnimations = data.model.geosetAnimations;
    const geosetId = bone.geosetId;
    const geosetAnimationId = bone.geosetAnimationId;
    if (geosetId !== -1) {
        utils_1.testReference(data, geosets, geosetId, 'geoset');
    }
    if (geosetAnimationId !== -1 && utils_1.testReference(data, geosetAnimations, geosetAnimationId, 'geoset animation')) {
        const geosetAnimation = geosetAnimations[geosetAnimationId];
        if (geosetId !== -1 && geosetAnimation.alpha < SUPPOSED_ALPHA_THRESHOLD && !utils_1.hasAnimation(geosetAnimation, 'KGAO')) {
            data.addSevere(`Referencing geoset ${geosetId} and geoset animation ${geosetAnimationId} with a 0 alpha, the geoset may be invisible`);
        }
    }
    data.assertWarning(data.boneUsageMap.get(index) > 0, `There are no vertices attached to this bone`);
}
exports.testBone = testBone;
function testLight(data, light) {
    const attenuation = light.attenuation;
    data.assertWarning(attenuation[0] >= 80, `Minimum attenuation should probably be bigger than or equal to 80, but is ${attenuation[0]}`);
    data.assertWarning(attenuation[1] <= 200, `Maximum attenuation should probably be smaller than or equal to 200, but is ${attenuation[1]}`);
    data.assertWarning(attenuation[1] - attenuation[0] > 0, `The maximum attenuation should be bigger than the minimum, but isn't`);
}
exports.testLight = testLight;
function testAttachments(data) {
    const attachments = data.model.attachments;
    let foundOrigin = false;
    for (const attachment of attachments) {
        const path = attachment.path;
        if (path.length) {
            const lowerCase = path.toLowerCase();
            data.assertError(lowerCase.endsWith('.mdl') || lowerCase.endsWith('.mdx'), `Invalid path "${path}"`);
        }
        if (attachment.name.startsWith('Origin Ref')) {
            foundOrigin = true;
        }
    }
    if (!foundOrigin) {
        data.addWarning('Missing the Origin attachment point');
    }
}
exports.testAttachments = testAttachments;
function testPivotPoints(data) {
    const pivotPoints = data.model.pivotPoints;
    const objects = data.objects;
    data.assertWarning(pivotPoints.length === objects.length, `Expected ${objects.length} pivot points, got ${pivotPoints.length}`);
}
exports.testPivotPoints = testPivotPoints;
function testParticleEmitter(data, emitter) {
    const path = emitter.path.toLowerCase();
    data.assertError(path.endsWith('.mdl') || path.endsWith('.mdx'), 'Invalid path');
}
exports.testParticleEmitter = testParticleEmitter;
function testParticleEmitter2(data, emitter) {
    const replaceableId = emitter.replaceableId;
    utils_1.testReference(data, data.model.textures, emitter.textureId, 'texture');
    const filterMode = emitter.filterMode;
    data.assertWarning(filterMode >= 0 /* Blend */ && filterMode <= 4 /* AlphaKey */, `Invalid filter mode: ${emitter.filterMode}`);
    data.assertError(replaceableId === 0 || utils_1.replaceableIds.has(replaceableId), `Invalid replaceable ID: ${replaceableId}`);
    if (emitter.flags & 1048576 /* XYQuad */) {
        data.assertSevere(emitter.speed !== 0 && emitter.latitude !== 0, 'XY Quad emitters must have a non-zero speed and latitude');
    }
    data.assertSevere(emitter.timeMiddle >= 0 && emitter.timeMiddle <= 1, `Expected time middle to be between 0 and 1, got ${emitter.timeMiddle}`);
    if (emitter.squirt && !utils_1.getAnimation(emitter, 'KP2E')) {
        data.addSevere('Using squirt without animating the emission rate');
    }
}
exports.testParticleEmitter2 = testParticleEmitter2;
function testParticleEmitterPopcorn(data, emitter) {
    data.assertSevere(emitter.animationVisiblityGuide.length > 0, 'No animation visibility guide');
}
exports.testParticleEmitterPopcorn = testParticleEmitterPopcorn;
function testRibbonEmitter(data, emitter) {
    utils_1.testReference(data, data.model.materials, emitter.materialId, 'material');
}
exports.testRibbonEmitter = testRibbonEmitter;
function testEventObject(data, eventObject) {
    tracks_1.default(data, eventObject);
}
exports.testEventObject = testEventObject;
function testCamera(data, _camera) {
    // I don't know what the rules are as to when cameras are used for portraits.
    // Therefore, for now never report them as not used.
    data.addImplicitReference();
}
exports.testCamera = testCamera;
function testFaceEffect(data, faceEffect) {
    const path = faceEffect.path;
    if (path.length) {
        data.assertError(path.endsWith('.facefx') || path.endsWith('.facefx_ingame'), `Corrupted face effect path: "${path}"`);
    }
    data.addImplicitReference();
}
exports.testFaceEffect = testFaceEffect;
function testBindPose(data) {
    const matrices = data.model.bindPose;
    const objects = data.objects;
    if (matrices.length && objects.length) {
        // There's always an extra matrix for some reason.
        // Face effects? but also models with no face effects have it.
        data.assertWarning(matrices.length === objects.length + 1, `Expected ${objects.length + 1} matrices, got ${matrices.length}`);
    }
}
exports.testBindPose = testBindPose;
//# sourceMappingURL=testers.js.map