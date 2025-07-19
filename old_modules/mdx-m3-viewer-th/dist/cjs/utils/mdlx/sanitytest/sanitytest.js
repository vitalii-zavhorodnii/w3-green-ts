"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const utils_1 = require("./utils");
const testers_1 = require("./testers");
/**
 * Run a sanity test on the model and return the results.
 */
function sanityTest(model) {
    const data = new data_1.default(model);
    // Run the tests.
    testers_1.testHeader(data);
    testers_1.testSequences(data);
    utils_1.testObjects(data, model.globalSequences, testers_1.testGlobalSequence);
    testers_1.testTextures(data);
    utils_1.testObjects(data, model.materials, testers_1.testMaterial);
    utils_1.testObjects(data, model.textureAnimations);
    utils_1.testObjects(data, model.geosets, testers_1.testGeoset);
    utils_1.testObjects(data, model.geosetAnimations, testers_1.testGeosetAnimation);
    utils_1.testObjects(data, model.bones, testers_1.testBone);
    utils_1.testObjects(data, model.lights, testers_1.testLight);
    utils_1.testObjects(data, model.helpers);
    testers_1.testAttachments(data);
    testers_1.testPivotPoints(data);
    utils_1.testObjects(data, model.particleEmitters, testers_1.testParticleEmitter);
    utils_1.testObjects(data, model.particleEmitters2, testers_1.testParticleEmitter2);
    if (model.version > 800) {
        utils_1.testObjects(data, model.particleEmittersPopcorn, testers_1.testParticleEmitterPopcorn);
    }
    utils_1.testObjects(data, model.ribbonEmitters, testers_1.testRibbonEmitter);
    utils_1.testObjects(data, model.eventObjects, testers_1.testEventObject);
    utils_1.testObjects(data, model.cameras, testers_1.testCamera);
    utils_1.testObjects(data, model.collisionShapes);
    if (model.version > 800) {
        utils_1.testObjects(data, model.faceEffects, testers_1.testFaceEffect);
        testers_1.testBindPose(data);
    }
    const root = data.stack[0];
    // Remove nodes that passed the test.
    utils_1.cleanNode(root);
    const { nodes, errors, severe, warnings } = root;
    let { unused } = root;
    // Add top-level objects that are not used.
    for (const node of nodes) {
        if (node.type === 'node') {
            if (node.uses === 0) {
                unused += 1;
            }
        }
    }
    return { type: 'node', nodes, errors, severe, warnings, unused };
}
exports.default = sanityTest;
//# sourceMappingURL=sanitytest.js.map