"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customtexttrigger_1 = require("../../../parsers/w3x/wct/customtexttrigger");
const parsewtg_1 = require("./parsewtg");
const data_1 = require("./data");
const processing_1 = require("./processing");
const conversions_1 = require("./conversions");
function convertWeu(map, customTriggerData, weTriggerData) {
    let wts;
    let wtg;
    let wct;
    // Try to read the string table.
    try {
        wts = map.readStringTable();
    }
    catch (e) {
        return { ok: false, error: `Failed to read the string table file: ${e}` };
    }
    if (!wts) {
        return { ok: false, error: `The string table file doesn't exist` };
    }
    // Try to add function signatures from the map script.
    // This handles the case of injected libraries, mostly seen in YDWE maps.
    const scriptFile = map.getScriptFile();
    if (scriptFile && scriptFile.name.endsWith('.j')) {
        try {
            customTriggerData.addJassFunctions(scriptFile.text());
        }
        catch (e) {
        }
    }
    const data = new data_1.default(customTriggerData, wts);
    // Try to read the triggers file using the custom trigger data.
    // This will also try to analyze unknown signatures if such exist.
    try {
        wtg = parsewtg_1.default(map, customTriggerData, data);
    }
    catch (e) {
        return { ok: false, error: `Failed to read the triggers file: ${e}` };
    }
    if (!wtg) {
        return { ok: false, error: `The triggers file doesn't exist` };
    }
    // Try to read the custom text triggers file.
    try {
        wct = map.readCustomTextTriggers();
    }
    catch (e) {
        return { ok: false, error: `Failed to read the custom text triggers file: ${e}` };
    }
    if (!wct) {
        return { ok: false, error: `The custom text triggers file doesn't exist` };
    }
    const triggers = wtg.triggers;
    const customTextTriggers = wct.triggers;
    const mapHeader = wct.trigger;
    // If there are less custom text triggers than triggers, WE does not crash, however it doesn't load the map.
    if (customTextTriggers.length < triggers.length) {
        for (let i = 0, l = triggers.length - customTextTriggers.length; i < l; i++) {
            customTextTriggers.push(new customtexttrigger_1.default());
        }
    }
    // Process and convert the triggers as needed.
    for (let i = 0, l = triggers.length; i < l; i++) {
        const trigger = triggers[i];
        // Any callbacks that are generated due to conversions for this trigger will end up here.
        const callbacks = [];
        try {
            // Process the trigger.
            // If things inside it need to be converted, this will convert them.
            const result = processing_1.processTrigger(data, trigger, callbacks);
            // If the trigger itself needs to be converted, convert it.
            if (result.convert) {
                data.push(trigger);
                // The trigger body.
                let body = conversions_1.convertTrigger(data, trigger, callbacks);
                // If any callbacks were generated when converting the trigger, add them to the trigger.
                if (callbacks.length) {
                    body = `${callbacks.join('\r\n')}\r\n${body}`;
                }
                customTextTriggers[i].text = body;
                trigger.ecas.length = 0;
                trigger.isCustom = 1;
                data.change('convertedtrigger', result.reason, customTextTriggers[i].text);
                data.pop();
            }
            else if (callbacks.length) {
                const callbacksText = callbacks.join('\r\n');
                // If the trigger didn't need to be converted, but callbacks were generated due to things inside it being converted, add them to the map header.
                mapHeader.text += `// Callbacks generated for trigger "${trigger.name}" due to conversions\r\n${callbacksText}\r\n`;
                data.change('generatedcallbacks', trigger.name, callbacksText);
            }
        }
        catch (e) {
            return { ok: false, error: `Error at ${data.stackToString()}: ${e}` };
        }
    }
    // WE will only generate global variables for preplaced objects that are referenced directly by GUI.
    // Referencing them in custom text ECAs or custom text triggers doesn't cut it.
    // This function saves such references if they are deemed to be lost due to the conversion.
    // It does this by adding a new trigger called PreplacedObjectReferences, which is not initially on.
    // In it an ECA is added for each reference.
    // Note that this is not the case for all preplaced objects.
    // For example, triggers and regions seem to always be available.
    // For now only units and destructibles are checked.
    data.saveGUIReferences(triggers, customTextTriggers);
    // Save the triggers file back.
    map.set('war3map.wtg', wtg.save());
    // Save the custom text triggers file back.
    map.set('war3map.wct', wct.save());
    // Now try to re-read the triggers file, but using the normal WE trigger data.
    // If this fails, WE will fail too.
    try {
        wtg = map.readTriggers(weTriggerData);
    }
    catch (e) {
        return { ok: false, error: `Failed to validate the triggers file: ${e}` };
    }
    if (!wtg) {
        return { ok: false, error: `Failed to re-read the triggers file` };
    }
    return { ok: true, changes: data.changes };
}
exports.default = convertWeu;
//# sourceMappingURL=weu.js.map