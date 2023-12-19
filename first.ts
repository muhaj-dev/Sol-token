// import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as mplTokenMetadata from '@metaplex-foundation/mpl-token-metadata';

// import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import * as web3 from "@solana/web3.js"
import * as anchor from '@project-serum/anchor'

export function loadWalletKey(keypairFile: string): web3.Keypair {
    const fs = require("fs");
    const loaded = web3.Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
}



async function main() {
    console.log("Let's name some tokens");

    const myKeypair = loadWalletKey("fuamk25XMM4PcXPqVQbgug2vk395oReGvab1awbMBoy.json")
    console.log(myKeypair.publicKey.toBase58())
    const mint = new web3.PublicKey("muhbx511HwkqCREqicGJ7W58j88HZQZZkzEVCMjTTw4")


    const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
    // const seed2 = Buffer.from(mpl.PROGRAM_ID.toBytes());
    const seed2 = Buffer.from(mplTokenMetadata.PROGRAM_ID.toBytes());
    const seed3 = Buffer.from(mint.toBytes());

    const [metadataPDA, _bump] = web3.PublicKey.findProgramAddressSync([seed1, seed2, seed3], mpl.PROGRAM_ID);


    const accounts = {
        metadata: metadataPDA,
        mint,
        mintAuthority: myKeypair.publicKey,
        payer: myKeypair.publicKey,
        updateAuthority: myKeypair.publicKey,
    }


    const dataV2 = {
        name: "Fudox",
        symbol: "Fud",
        uri: "https://harlequin-lazy-owl-879.mypinata.cloud/ipfs/QmUDG7AQArjccapo3LnqwqDv4wWZFQXhXLbHtXmZToEtix",
        // we don't need that
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }

    const args = {
        createMetadataAccountArgsV2: {
            data: dataV2,
            isMutable: true
        }
    };

    // const ix = mpl.createCreateMetadataAccountV2Instruction(accounts, args);
    const ix = mplTokenMetadata.createCreateMetadataAccountV2Instruction(accounts, args);
    const tx = new web3.Transaction();
    tx.add(ix);
    const connection = new web3.Connection("https://api.devnet.solana.com");
    const txid = await web3.sendAndConfirmTransaction(connection, tx, [myKeypair]);
    console.log(txid);



}

main()