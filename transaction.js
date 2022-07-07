const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
import { devCourt, solCourt, jsCourt } from "./court-params";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const abi = fs.readFileSync("./xKlerosLiquid_sol_xKlerosLiquid.abi", "utf8");
const contractAddress = "0x87E1bfEB31Ac4FA857a08471847122ec338F3cF2";

const contract = new ethers.Contract(contractAddress, abi, provider);

async function main() {
    const contractWalletConnection = contract.connect(wallet);

    const xDaiDevCourt = await contractWalletConnection.createSubcourt(
        devCourt.parent,
        devCourt.hiddenVotes,
        devCourt.minStake,
        devCourt.alpha,
        devCourt.feeForJuror,
        devCourt.jurorsForCourtJump,
        devCourt.timesPerPeriod,
        devCourt.sortitionSumTreeK
    );

    await xDaiDevCourt.wait(1);

    const xDaiSolCourt = await contractWalletConnection.createSubcourt(
        solCourt.parent,
        solCourt.hiddenVotes,
        solCourt.minStake,
        solCourt.alpha,
        solCourt.feeForJuror,
        solCourt.jurorsForCourtJump,
        solCourt.timesPerPeriod,
        solCourt.sortitionSumTreeK
    );

    await xDaiSolCourt.wait(1);

    const xDaiJSCourt = await contractWalletConnection.createSubcourt(
        jsCourt.parent,
        jsCourt.hiddenVotes,
        jsCourt.minStake,
        jsCourt.alpha,
        jsCourt.feeForJuror,
        jsCourt.jurorsForCourtJump,
        jsCourt.timesPerPeriod,
        jsCourt.sortitionSumTreeK
    );

    await xDaiJSCourt.wait(1);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
