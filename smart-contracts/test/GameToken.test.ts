import { expect } from "chai";
import { ethers } from "hardhat";
import { GameToken } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("GameToken", function () {
  let gameToken: GameToken;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const GameToken = await ethers.getContractFactory("GameToken");
    gameToken = await GameToken.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await gameToken.owner()).to.equal(owner.address);
    });

    it("Should assign the initial supply to the owner", async function () {
      const ownerBalance = await gameToken.balanceOf(owner.address);
      expect(await gameToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should have correct name and symbol", async function () {
      expect(await gameToken.name()).to.equal("TECH Token");
      expect(await gameToken.symbol()).to.equal("TECH");
    });
  });

  describe("Minting", function () {
    it("Should mint tokens to address", async function () {
      const mintAmount = ethers.parseEther("1000");
      await gameToken.mint(addr1.address, mintAmount);
      expect(await gameToken.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Should not exceed max supply", async function () {
      const maxSupply = await gameToken.MAX_SUPPLY();
      const currentSupply = await gameToken.totalSupply();
      const excessAmount = maxSupply - currentSupply + ethers.parseEther("1");
      
      await expect(
        gameToken.mint(addr1.address, excessAmount)
      ).to.be.revertedWith("Exceeds max supply");
    });
  });

  describe("Burning", function () {
    it("Should burn tokens from caller", async function () {
      const initialBalance = await gameToken.balanceOf(owner.address);
      const burnAmount = ethers.parseEther("1000");
      
      await gameToken.burn(burnAmount);
      expect(await gameToken.balanceOf(owner.address)).to.equal(
        initialBalance - burnAmount
      );
    });
  });
});
