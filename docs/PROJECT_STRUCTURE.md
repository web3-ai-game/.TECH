# Project Structure

## Overview

.TECH is a full-stack Web3 AI game platform with three main components:

1. **Frontend** - React + TypeScript web application
2. **Backend** - Node.js + Express API server
3. **Smart Contracts** - Solidity contracts for blockchain integration

## Directory Structure

```
.TECH/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Layout.tsx
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── context/       # React contexts (Web3, etc.)
│   │   ├── pages/         # Page components
│   │   │   ├── Home.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── lib/           # Utility functions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/               # Node.js backend
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   │   ├── auth.ts   # Authentication routes
│   │   │   ├── user.ts   # User management
│   │   │   └── game.ts   # Game logic
│   │   ├── middleware/   # Express middleware
│   │   └── index.ts      # Main server file
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   ├── package.json
│   └── tsconfig.json
│
├── smart-contracts/       # Blockchain contracts
│   ├── contracts/
│   │   ├── GameToken.sol    # ERC20 game token
│   │   └── GameManager.sol  # Game logic contract
│   ├── scripts/
│   │   └── deploy.ts        # Deployment script
│   ├── test/
│   │   └── GameToken.test.ts
│   ├── hardhat.config.ts
│   └── package.json
│
├── docs/                  # Documentation
├── README.md
└── .gitignore
```

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + shadcn/ui
- **Routing**: React Router DOM
- **Web3**: ethers.js v6
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Validation**: Zod

### Smart Contracts
- **Language**: Solidity 0.8.20
- **Development**: Hardhat
- **Testing**: Hardhat + Chai
- **Libraries**: OpenZeppelin Contracts

## Key Features

### Frontend Features
- ✅ Responsive modern UI with TailwindCSS
- ✅ Web3 wallet integration (MetaMask)
- ✅ React Context for Web3 state management
- ✅ Dashboard for user statistics
- ✅ Type-safe with TypeScript

### Backend Features
- ✅ RESTful API design
- ✅ Database integration with Prisma
- ✅ Error handling middleware
- ✅ Route validation with Zod
- ✅ Authentication endpoints

### Smart Contract Features
- ✅ ERC20 game token (TECH)
- ✅ Game manager contract
- ✅ Staking and reward system
- ✅ Platform fee mechanism
- ✅ Comprehensive tests

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login with wallet signature
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/users/profile/:address` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Game
- `GET /api/games/history/:address` - Get game history
- `GET /api/games/leaderboard` - Get leaderboard
- `POST /api/games/create` - Create new game

## Smart Contracts

### GameToken.sol
- ERC20 token with minting and burning
- Max supply: 1 billion tokens
- Owner-controlled minting

### GameManager.sol
- Game creation and joining
- Staking mechanism
- Winner reward distribution
- Platform fee collection (5% default)

## Development Setup

### Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

### Backend
```bash
cd backend
pnpm install
cp .env.example .env
# Configure database URL
pnpm prisma:migrate
pnpm dev
```

### Smart Contracts
```bash
cd smart-contracts
pnpm install
pnpm compile
pnpm test
pnpm hardhat node  # Start local blockchain
pnpm deploy:localhost  # Deploy contracts
```

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - Backend API URL
- `VITE_CHAIN_ID` - Blockchain chain ID
- `VITE_CONTRACT_ADDRESS` - Deployed contract address

### Backend (.env)
- `PORT` - Server port
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `RPC_URL` - Blockchain RPC endpoint

## Next Steps

1. **Database Setup**: Configure PostgreSQL and run migrations
2. **Install Dependencies**: Run `pnpm install` in each directory
3. **Smart Contract Deployment**: Deploy contracts to testnet/mainnet
4. **Environment Configuration**: Set up all `.env` files
5. **Development**: Start all services for local development

## Contributing

Please ensure all code follows the existing style and includes appropriate tests.
