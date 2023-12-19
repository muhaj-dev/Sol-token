"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programAsBurner = void 0;
const web3_js_1 = require("@solana/web3.js");
const MetadataProgram_1 = require("../MetadataProgram");
async function programAsBurner() {
    return web3_js_1.PublicKey.findProgramAddress([Buffer.from('metadata'), MetadataProgram_1.MetadataProgram.PUBKEY.toBuffer(), Buffer.from('burn')], MetadataProgram_1.MetadataProgram.PUBKEY);
}
exports.programAsBurner = programAsBurner;
//# sourceMappingURL=pdas.js.map