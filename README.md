# .TECH - Web3 AI Game Platform

A full-stack Web3 AI game platform built with modern technologies.

## Project Structure

```
.
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express backend
├── smart-contracts/   # Solidity smart contracts
└── docs/             # Documentation
```

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- shadcn/ui for components
- ethers.js for Web3 integration
- Lucide React for icons

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- Prisma ORM
- JWT authentication

### Smart Contracts
- Solidity
- Hardhat development environment
- OpenZeppelin contracts

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL 14+

### Installation

1. Install dependencies:
```bash
# Install frontend dependencies
cd frontend && pnpm install

# Install backend dependencies
cd ../backend && pnpm install

# Install smart contract dependencies
cd ../smart-contracts && pnpm install
```

2. Set up environment variables:
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

3. Run development servers:
```bash
# Frontend (http://localhost:5173)
cd frontend && pnpm dev

# Backend (http://localhost:3000)
cd backend && pnpm dev

# Smart contracts (local node)
cd smart-contracts && pnpm hardhat node
```

## License

MIT
