import {deployments, ethers} from "hardhat";
import { Signer } from "ethers";
import {PebbleCoin} from "../typechain-types";
import {expect} from "chai";

describe("PebbleCoin", function () {
    let pbl: PebbleCoin
    let [admin, operator, user1, user2]: Array<Signer> = []

    beforeEach(async function () {
        await deployments.fixture(["PebbleCoin"]);
        pbl = await ethers.getContract("PebbleCoin");
        [admin, operator, user1, user2] = await ethers.getSigners();
    });

    it("Admin has whole supply upon deployment", async function () {
        expect(await pbl.balanceOf(await admin.getAddress()))
            .to.be.equal(ethers.utils.parseEther('1000000000'))
    });
});