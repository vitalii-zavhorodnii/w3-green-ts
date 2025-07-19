"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../../../common/path");
const audio_1 = require("../../../common/audio");
const model_1 = require("../../../parsers/mdlx/model");
const isformat_1 = require("../../../parsers/mdlx/isformat");
const mappeddata_1 = require("../../../utils/mappeddata");
const viewer_1 = require("../../viewer");
const model_2 = require("./model");
const texture_1 = require("./texture");
const sd_vert_1 = require("./shaders/sd.vert");
const sd_frag_1 = require("./shaders/sd.frag");
const hd_vert_1 = require("./shaders/hd.vert");
const hd_frag_1 = require("./shaders/hd.frag");
const particles_vert_1 = require("./shaders/particles.vert");
const particles_frag_1 = require("./shaders/particles.frag");
const batch_1 = require("./batch");
const mappedDataCallback = (data) => new mappeddata_1.MappedData(data);
const decodedDataCallback = (data) => audio_1.decodeAudioData(data);
exports.default = {
    load(viewer, pathSolver, reforged = false) {
        const gl = viewer.gl;
        const webgl = viewer.webgl;
        // Bone textures.
        if (!webgl.ensureExtension('OES_texture_float')) {
            throw new Error('MDX: No float texture support!');
        }
        // Geometry emitters.
        if (!webgl.ensureExtension('ANGLE_instanced_arrays')) {
            throw new Error('MDX: No instanced rendering support!');
        }
        // Shaders. Lots of them.
        const sdExtendedVert = '#define EXTENDED_BONES\n' + sd_vert_1.default;
        const sdDiffuse = '#define ONLY_DIFFUSE\n' + sd_frag_1.default;
        const sdTexcoords = '#define ONLY_TEXCOORDS\n' + sd_frag_1.default;
        const sdNormals = '#define ONLY_NORMALS\n' + sd_frag_1.default;
        const hdExtendedVert = '#define EXTENDED_BONES\n' + hd_vert_1.default;
        const hdSkinVert = '#define SKIN\n' + hd_vert_1.default;
        const hdDiffuse = '#define ONLY_DIFFUSE\n' + hd_frag_1.default;
        const hdNormalMap = '#define ONLY_NORMAL_MAP\n' + hd_frag_1.default;
        const hdOcclusion = '#define ONLY_OCCLUSION\n' + hd_frag_1.default;
        const hdRoughness = '#define ONLY_ROUGHNESS\n' + hd_frag_1.default;
        const hdMetallic = '#define ONLY_METALLIC\n' + hd_frag_1.default;
        const hdTCFactor = '#define ONLY_TC_FACTOR\n' + hd_frag_1.default;
        const hdEmissive = '#define ONLY_EMISSIVE\n' + hd_frag_1.default;
        const hdTexCoords = '#define ONLY_TEXCOORDS\n' + hd_frag_1.default;
        const hdNormals = '#define ONLY_NORMALS\n' + hd_frag_1.default;
        const hdTangents = '#define ONLY_TANGENTS\n' + hd_frag_1.default;
        const sdShader = webgl.createShader(sd_vert_1.default, sd_frag_1.default);
        const sdExtendedShader = webgl.createShader(sdExtendedVert, sd_frag_1.default);
        const hdShader = webgl.createShader(hd_vert_1.default, hd_frag_1.default);
        const hdExtendedShader = webgl.createShader(hdExtendedVert, hd_frag_1.default);
        const hdSkinShader = webgl.createShader(hdSkinVert, hd_frag_1.default);
        const particlesShader = webgl.createShader(particles_vert_1.default, particles_frag_1.default);
        const sdDebugShaders = [];
        const hdDebugShaders = [];
        let shaders = [];
        shaders[viewer_1.DebugRenderMode.Diffuse] = webgl.createShader(sd_vert_1.default, sdDiffuse);
        shaders[viewer_1.DebugRenderMode.TexCoords] = webgl.createShader(sd_vert_1.default, sdTexcoords);
        shaders[viewer_1.DebugRenderMode.Normals] = webgl.createShader(sd_vert_1.default, sdNormals);
        sdDebugShaders[batch_1.SkinningType.VertexGroups] = shaders;
        shaders = [];
        shaders[viewer_1.DebugRenderMode.Diffuse] = webgl.createShader(sdExtendedVert, sdDiffuse);
        shaders[viewer_1.DebugRenderMode.TexCoords] = webgl.createShader(sdExtendedVert, sdTexcoords);
        shaders[viewer_1.DebugRenderMode.Normals] = webgl.createShader(sdExtendedVert, sdNormals);
        sdDebugShaders[batch_1.SkinningType.ExtendedVertexGroups] = shaders;
        shaders = [];
        shaders[viewer_1.DebugRenderMode.Diffuse] = webgl.createShader(hd_vert_1.default, hdDiffuse);
        shaders[viewer_1.DebugRenderMode.NormalMap] = webgl.createShader(hd_vert_1.default, hdNormalMap);
        shaders[viewer_1.DebugRenderMode.Occlusion] = webgl.createShader(hd_vert_1.default, hdOcclusion);
        shaders[viewer_1.DebugRenderMode.Roughness] = webgl.createShader(hd_vert_1.default, hdRoughness);
        shaders[viewer_1.DebugRenderMode.Metallic] = webgl.createShader(hd_vert_1.default, hdMetallic);
        shaders[viewer_1.DebugRenderMode.TCFactor] = webgl.createShader(hd_vert_1.default, hdTCFactor);
        shaders[viewer_1.DebugRenderMode.Emissive] = webgl.createShader(hd_vert_1.default, hdEmissive);
        shaders[viewer_1.DebugRenderMode.TexCoords] = webgl.createShader(hd_vert_1.default, hdTexCoords);
        shaders[viewer_1.DebugRenderMode.Normals] = webgl.createShader(hd_vert_1.default, hdNormals);
        shaders[viewer_1.DebugRenderMode.Tangents] = webgl.createShader('#define ONLY_TANGENTS\n' + hd_vert_1.default, hdTangents);
        hdDebugShaders[batch_1.SkinningType.VertexGroups] = shaders;
        shaders = [];
        shaders[viewer_1.DebugRenderMode.Diffuse] = webgl.createShader(hdExtendedVert, hdDiffuse);
        shaders[viewer_1.DebugRenderMode.NormalMap] = webgl.createShader(hdExtendedVert, hdNormalMap);
        shaders[viewer_1.DebugRenderMode.Occlusion] = webgl.createShader(hdExtendedVert, hdOcclusion);
        shaders[viewer_1.DebugRenderMode.Roughness] = webgl.createShader(hdExtendedVert, hdRoughness);
        shaders[viewer_1.DebugRenderMode.Metallic] = webgl.createShader(hdExtendedVert, hdMetallic);
        shaders[viewer_1.DebugRenderMode.TCFactor] = webgl.createShader(hdExtendedVert, hdTCFactor);
        shaders[viewer_1.DebugRenderMode.Emissive] = webgl.createShader(hdExtendedVert, hdEmissive);
        shaders[viewer_1.DebugRenderMode.TexCoords] = webgl.createShader(hdExtendedVert, hdTexCoords);
        shaders[viewer_1.DebugRenderMode.Normals] = webgl.createShader(hdExtendedVert, hdNormals);
        shaders[viewer_1.DebugRenderMode.Tangents] = webgl.createShader('#define ONLY_TANGENTS\n' + hdExtendedVert, hdTangents);
        hdDebugShaders[batch_1.SkinningType.ExtendedVertexGroups] = shaders;
        shaders = [];
        shaders[viewer_1.DebugRenderMode.Diffuse] = webgl.createShader(hdSkinVert, hdDiffuse);
        shaders[viewer_1.DebugRenderMode.NormalMap] = webgl.createShader(hdSkinVert, hdNormalMap);
        shaders[viewer_1.DebugRenderMode.Occlusion] = webgl.createShader(hdSkinVert, hdOcclusion);
        shaders[viewer_1.DebugRenderMode.Roughness] = webgl.createShader(hdSkinVert, hdRoughness);
        shaders[viewer_1.DebugRenderMode.Metallic] = webgl.createShader(hdSkinVert, hdMetallic);
        shaders[viewer_1.DebugRenderMode.TCFactor] = webgl.createShader(hdSkinVert, hdTCFactor);
        shaders[viewer_1.DebugRenderMode.Emissive] = webgl.createShader(hdSkinVert, hdEmissive);
        shaders[viewer_1.DebugRenderMode.TexCoords] = webgl.createShader(hdSkinVert, hdTexCoords);
        shaders[viewer_1.DebugRenderMode.Normals] = webgl.createShader(hdSkinVert, hdNormals);
        shaders[viewer_1.DebugRenderMode.Tangents] = webgl.createShader('#define ONLY_TANGENTS\n' + hdSkinVert, hdTangents);
        hdDebugShaders[batch_1.SkinningType.Skin] = shaders;
        const rectBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rectBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
        const handlerData = {
            pathSolver,
            reforged,
            // Shaders.
            sdShader,
            sdExtendedShader,
            hdShader,
            hdExtendedShader,
            hdSkinShader,
            particlesShader,
            sdDebugShaders,
            hdDebugShaders,
            // Geometry emitters buffer.
            rectBuffer,
            // Team color/glow textures - loaded when the first model that uses team textures is loaded.
            teamColors: [],
            teamGlows: [],
            eventObjectTables: {},
            // lutTexture: null,
            // envDiffuseTexture: null,
            // envSpecularTexture: null,
        };
        viewer.sharedCache.set('mdx', handlerData);
    },
    isValidSource(object) {
        if (object instanceof model_1.default) {
            return true;
        }
        return isformat_1.isMdx(object) || isformat_1.isMdl(object);
    },
    resource: model_2.default,
    // async loadEnv(viewer: ModelViewer) {
    //   const mdxHandler = <MdxHandlerObject>viewer.sharedCache.get('mdx');
    //   if (!mdxHandler.lutTexture) {
    //     mdxHandler.lutTexture = new MdxTexture(0, WrapMode.WrapBoth);
    //     mdxHandler.envDiffuseTexture = new MdxTexture(0, WrapMode.WrapBoth);
    //     mdxHandler.envSpecularTexture = new MdxTexture(0, WrapMode.WrapBoth);
    //     const [lutTexture, diffuseTexture, specularTexture] = await Promise.all([
    //       viewer.load('env/lut.png'),
    //       viewer.load('env/diffuse-sRGB.png'),
    //       viewer.load('env/specular-sRGB.png'),
    //     ]);
    //     mdxHandler.lutTexture.texture = <Texture>lutTexture;
    //     mdxHandler.envDiffuseTexture.texture = <Texture>diffuseTexture;
    //     mdxHandler.envSpecularTexture.texture = <Texture>specularTexture;
    //   }
    // },
    loadTeamTextures(viewer) {
        const { pathSolver, reforged, teamColors, teamGlows } = viewer.sharedCache.get('mdx');
        if (teamColors.length === 0) {
            const teams = reforged ? 28 : 16;
            const ext = reforged ? 'dds' : 'blp';
            const params = reforged ? { reforged: true } : undefined;
            for (let i = 0; i < teams; i++) {
                const id = `${i}`.padStart(2, '0');
                const end = `${id}.${ext}`;
                const teamColor = new texture_1.default(1, 3 /* WrapBoth */);
                const teamGlow = new texture_1.default(2, 3 /* WrapBoth */);
                viewer.load(`ReplaceableTextures\\TeamColor\\TeamColor${end}`, pathSolver, params)
                    .then((texture) => teamColor.texture = texture);
                viewer.load(`ReplaceableTextures\\TeamGlow\\TeamGlow${end}`, pathSolver, params)
                    .then((texture) => teamGlow.texture = texture);
                teamColors[i] = teamColor;
                teamGlows[i] = teamGlow;
            }
        }
    },
    getEventObjectSoundFile(file, reforged, isHd, tables) {
        if (!reforged || path_1.extname(file) === '.flac') {
            return file;
        }
        for (let i = 1, l = tables.length; i < l; i++) {
            const raceRow = tables[i].data.getRow(file);
            if (raceRow) {
                const flags = raceRow.string('Flags');
                const filePath = raceRow.string('Filepath');
                if (flags === 'SD_ONLY') {
                    if (!isHd) {
                        return filePath;
                    }
                }
                else if (flags === 'HD_ONLY') {
                    if (isHd) {
                        return filePath;
                    }
                }
                else {
                    return filePath;
                }
            }
        }
        return;
    },
    async getEventObjectData(viewer, type, id, isHd) {
        // Units\Critters\BlackStagMale\BlackStagMale.mdx has an event object named "Point01".
        if (type !== 'SPN' && type !== 'SPL' && type !== 'UBR' && type !== 'SND') {
            return;
        }
        const { pathSolver, reforged, eventObjectTables } = viewer.sharedCache.get('mdx');
        const params = reforged ? { reforged: true } : {};
        const safePathSolver = (src, params) => {
            if (pathSolver) {
                return pathSolver(src, params);
            }
            return src;
        };
        if (!eventObjectTables[type]) {
            const paths = [];
            if (type === 'SPN') {
                paths.push('Splats\\SpawnData.slk');
            }
            else if (type === 'SPL') {
                paths.push('Splats\\SplatData.slk');
            }
            else if (type === 'UBR') {
                paths.push('Splats\\UberSplatData.slk');
            }
            else if (type === 'SND') {
                paths.push('UI\\SoundInfo\\AnimSounds.slk');
                // Reforged changed the data layout.
                if (reforged) {
                    paths.push('UI\\SoundInfo\\DialogueHumanBase.slk', 'UI\\SoundInfo\\DialogueOrcBase.slk', 'UI\\SoundInfo\\DialogueUndeadBase.slk', 'UI\\SoundInfo\\DialogueNightElfBase.slk', 'UI\\SoundInfo\\DialogueNagaBase.slk', 'UI\\SoundInfo\\DialogueDemonBase.slk', 'UI\\SoundInfo\\DialogueCreepsBase.slk');
                }
                else {
                    paths.push('UI\\SoundInfo\\AnimLookups.slk');
                }
            }
            const promises = paths.map((path) => viewer.loadGeneric(safePathSolver(path, params), 'text', mappedDataCallback));
            const resources = await Promise.all(promises);
            for (const resource of resources) {
                if (!resource) {
                    return;
                }
            }
            eventObjectTables[type] = resources;
        }
        const tables = eventObjectTables[type];
        const mappedData = tables[0].data;
        let row;
        const promises = [];
        if (type === 'SND') {
            // How to get the sound row?
            // TFT has AnimLookups.slk, which stores a ID->Label. Give it the event object ID, get back the label to look for in AnimSounds.slk.
            // Reforged removed AnimLookups.slk, and instead has the ID under a new column in AnimSounds.slk called AnimationEventCode.
            // In addition, Reforged can have SD/HD flags per sound, to determine whether it should load in SD or HD modes.
            // When a sound has both modes, the path to it in AnimSounds.slk won't be an actual file path (ending with .flac) but rather a label.
            // This label can be queried in other sound SLKs such as DialogueHumanBase.slk, which contains the full path and the mentioned flags.
            if (reforged) {
                row = mappedData.findRow('AnimationEventCode', id);
            }
            else {
                const lookupRow = tables[1].data.getRow(id);
                if (lookupRow) {
                    row = mappedData.getRow(lookupRow.string('SoundLabel'));
                }
            }
            if (row) {
                for (const fileName of row.string('FileNames').split(',')) {
                    const file = this.getEventObjectSoundFile(fileName, reforged, isHd, tables);
                    if (file) {
                        promises.push(viewer.loadGeneric(safePathSolver(file, params), 'arrayBuffer', decodedDataCallback));
                    }
                }
            }
        }
        else {
            // Model and texture event objects are simpler than sounds - just get the right model or texture file.
            row = mappedData.getRow(id);
            if (row) {
                if (type === 'SPN') {
                    promises.push(viewer.load(row.string('Model').replace('.mdl', '.mdx'), safePathSolver, params));
                }
                else if (type === 'SPL' || type === 'UBR') {
                    promises.push(viewer.load(`ReplaceableTextures\\Splats\\${row.string('file')}${reforged ? '.dds' : '.blp'}`, safePathSolver, params));
                }
            }
        }
        if (row && promises.length) {
            const resources = await Promise.all(promises);
            // Make sure the resources actually loaded properly.
            const filtered = resources.filter((resource) => resource);
            if (filtered.length) {
                return { row, resources: filtered };
            }
        }
        return;
    },
    getBatchShader(viewer, skinningType, isHd) {
        const mdxCache = viewer.sharedCache.get('mdx');
        const debugRenderMode = viewer.debugRenderMode;
        if (isHd) {
            if (debugRenderMode !== viewer_1.DebugRenderMode.None) {
                const shaders = mdxCache.hdDebugShaders[skinningType];
                if (shaders) {
                    const shader = shaders[debugRenderMode];
                    if (shader) {
                        return shader;
                    }
                }
            }
            if (skinningType === batch_1.SkinningType.Skin) {
                return mdxCache.hdSkinShader;
            }
            else if (skinningType === batch_1.SkinningType.VertexGroups) {
                return mdxCache.hdShader;
            }
            else {
                return mdxCache.hdExtendedShader;
            }
        }
        else {
            if (debugRenderMode !== viewer_1.DebugRenderMode.None) {
                const shaders = mdxCache.sdDebugShaders[skinningType];
                if (shaders) {
                    const shader = shaders[debugRenderMode];
                    if (shader) {
                        return shader;
                    }
                }
            }
            if (skinningType === batch_1.SkinningType.VertexGroups) {
                return mdxCache.sdShader;
            }
            else {
                return mdxCache.sdExtendedShader;
            }
        }
    }
};
//# sourceMappingURL=handler.js.map