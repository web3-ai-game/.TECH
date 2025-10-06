// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./GameToken.sol";

/**
 * @title GameManager
 * @dev Manages game sessions and rewards
 */
contract GameManager is Ownable, ReentrancyGuard {
    GameToken public gameToken;
    
    struct Game {
        address player1;
        address player2;
        uint256 stake;
        address winner;
        bool completed;
        uint256 timestamp;
    }
    
    mapping(uint256 => Game) public games;
    uint256 public gameCounter;
    
    uint256 public platformFeePercentage = 5; // 5% platform fee
    uint256 public constant MAX_FEE = 10; // Maximum 10% fee
    
    event GameCreated(uint256 indexed gameId, address indexed player1, uint256 stake);
    event GameJoined(uint256 indexed gameId, address indexed player2);
    event GameCompleted(uint256 indexed gameId, address indexed winner, uint256 reward);
    event FeeUpdated(uint256 newFee);
    
    constructor(address _gameToken) Ownable(msg.sender) {
        gameToken = GameToken(_gameToken);
    }
    
    /**
     * @dev Create a new game
     * @param stake Amount of tokens to stake
     */
    function createGame(uint256 stake) external nonReentrant returns (uint256) {
        require(stake > 0, "Stake must be greater than 0");
        require(gameToken.transferFrom(msg.sender, address(this), stake), "Transfer failed");
        
        gameCounter++;
        games[gameCounter] = Game({
            player1: msg.sender,
            player2: address(0),
            stake: stake,
            winner: address(0),
            completed: false,
            timestamp: block.timestamp
        });
        
        emit GameCreated(gameCounter, msg.sender, stake);
        return gameCounter;
    }
    
    /**
     * @dev Join an existing game
     * @param gameId ID of the game to join
     */
    function joinGame(uint256 gameId) external nonReentrant {
        Game storage game = games[gameId];
        require(game.player1 != address(0), "Game does not exist");
        require(game.player2 == address(0), "Game already full");
        require(msg.sender != game.player1, "Cannot join own game");
        require(!game.completed, "Game already completed");
        
        require(gameToken.transferFrom(msg.sender, address(this), game.stake), "Transfer failed");
        
        game.player2 = msg.sender;
        emit GameJoined(gameId, msg.sender);
    }
    
    /**
     * @dev Complete a game and distribute rewards (only owner)
     * @param gameId ID of the game
     * @param winner Address of the winner
     */
    function completeGame(uint256 gameId, address winner) external onlyOwner nonReentrant {
        Game storage game = games[gameId];
        require(game.player1 != address(0), "Game does not exist");
        require(game.player2 != address(0), "Game not started");
        require(!game.completed, "Game already completed");
        require(winner == game.player1 || winner == game.player2, "Invalid winner");
        
        game.winner = winner;
        game.completed = true;
        
        uint256 totalPot = game.stake * 2;
        uint256 platformFee = (totalPot * platformFeePercentage) / 100;
        uint256 reward = totalPot - platformFee;
        
        require(gameToken.transfer(winner, reward), "Reward transfer failed");
        require(gameToken.transfer(owner(), platformFee), "Fee transfer failed");
        
        emit GameCompleted(gameId, winner, reward);
    }
    
    /**
     * @dev Update platform fee (only owner)
     * @param newFee New fee percentage
     */
    function updateFee(uint256 newFee) external onlyOwner {
        require(newFee <= MAX_FEE, "Fee too high");
        platformFeePercentage = newFee;
        emit FeeUpdated(newFee);
    }
    
    /**
     * @dev Get game details
     * @param gameId ID of the game
     */
    function getGame(uint256 gameId) external view returns (Game memory) {
        return games[gameId];
    }
}
