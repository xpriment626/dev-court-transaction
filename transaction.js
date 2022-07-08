const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
import { Interface } from "ethers/lib/utils";
import { devCourt, solCourt, jsCourt } from "./court-params";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
// const abi = fs.readFileSync("./xKlerosLiquid_sol_xKlerosLiquid.abi", "utf8");
const contractAddress = "0x87E1bfEB31Ac4FA857a08471847122ec338F3cF2";
const gasPrice = provider.getGasPrice();
const signer = wallet.connect(provider);

const iface = new Interface([
    "function createSubcourt(uint96 parent, bool hiddenVotes, uint minStake, uint alpha, uint feeForJuror, uint jurorsForCourtJump, uint[4] timesPerPeriod, uint sortitionSumTreeK)",
]);
const devCourtTxData = iface.encodeFunctionData("createSubcourt", [
    devCourt.parent,
    devCourt.hiddenVotes,
    devCourt.minStake,
    devCourt.alpha,
    devCourt.feeForJuror,
    devCourt.jurorsForCourtJump,
    devCourt.sortitionSumTreeK,
]);

const solCourtTxData = iface.encodeFunctionData("createSubcourt", [
    solCourt.parent,
    solCourt.hiddenVotes,
    solCourt.minStake,
    solCourt.alpha,
    solCourt.feeForJuror,
    solCourt.jurorsForCourtJump,
    solCourt.sortitionSumTreeK,
]);

const jsCourtTxData = iface.encodeFunctionData("createSubcourt", [
    jsCourt.parent,
    jsCourt.hiddenVotes,
    jsCourt.minStake,
    jsCourt.alpha,
    jsCourt.feeForJuror,
    jsCourt.jurorsForCourtJump,
    jsCourt.sortitionSumTreeK,
]);

async function main() {
    const tx = {
        from: wallet.address,
        to: contractAddress,
        value: 0,
        gasPrice: gasPrice,
        gasLimit: ethers.utils.hexlify(200000),
        nonce: provider.getTransactionCount(wallet.address),
        data: devCourtTxData,
    };

    await signer.sendTransaction(tx);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
