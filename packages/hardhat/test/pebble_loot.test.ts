import {deployments, ethers} from "hardhat";
import { Signer } from "ethers";
import {PebbleCoin, PebbleLoot} from "../typechain-types";
import {expect} from "chai";

describe("PebbleLoot", function () {
    const [imei1, imei2, imei3, imei4] = ["100000000000000", "999999999", "100000000000000000000", "100000000000001"]
    let loots: PebbleLoot
    let [admin, operator, user1, user2]: Array<Signer> = []

    beforeEach(async function () {
        await deployments.fixture(["PebbleLoot"]);
        loots = await ethers.getContract("PebbleLoot");
        [admin, operator, user1, user2] = await ethers.getSigners();
    });

    describe("Minting", function () {
        it('should revert if imei is out of range (lower bound)', async function () {
            await expect(loots.connect(user1).safeMint(imei2))
                .to.be.revertedWith("ImeiOutOfRange")
        });
        it('should revert if imei is out of range (higher bound)', async function () {
            await expect(loots.connect(user1).safeMint(imei3))
                .to.be.revertedWith("ImeiOutOfRange")
        });
        it('should successfully mint a token', async function () {
            await expect(loots.connect(user1).safeMint(imei1))
                .to.emit(loots, "TokenMinted")
                .withArgs(await user1.getAddress(), imei1)
        });
    });

    describe("Token URI", function () {
        before('premint token', async function () {
            await loots.connect(user1).safeMint(imei4)
        })
        it('should return token uri', async function () {
            console.log(await loots.tokenURI(imei4))
        });
    })
});