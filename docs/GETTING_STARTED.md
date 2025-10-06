# Getting Started with .TECH

This guide will help you set up and run the .TECH platform locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher
- **pnpm** (recommended) or npm: `npm install -g pnpm`
- **PostgreSQL** 14 or higher
- **MetaMask** browser extension (for Web3 features)
- **Git**

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/web3-ai-game/.TECH.git
cd .TECH
```

### 2. Install Dependencies

Install dependencies for all packages:

```bash
# Frontend
cd frontend
pnpm install

# Backend
cd ../backend
pnpm install

# Smart Contracts
cd ../smart-contracts
pnpm install
```

### 3. Set Up Environment Variables

#### Frontend
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
VITE_CHAIN_ID=1337
VITE_CONTRACT_ADDRESS=  # Will be filled after contract deployment
```

#### Backend
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/tech_db?schema=public"
JWT_SECRET=your-secret-key-change-this
RPC_URL=http://localhost:8545
CHAIN_ID=1337
```

### 4. Set Up Database

Create PostgreSQL database:
```bash
createdb tech_db
```

Run migrations:
```bash
cd backend
pnpm prisma:migrate
```

### 5. Start Local Blockchain (Optional)

For local development with smart contracts:

```bash
cd smart-contracts
pnpm hardhat node
```

Keep this terminal open. In a new terminal, deploy contracts:

```bash
cd smart-contracts
pnpm deploy:localhost
```

Copy the deployed contract addresses and update `frontend/.env`.

### 6. Start Development Servers

Open three terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
pnpm dev
```
Server will run on http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd frontend
pnpm dev
```
App will run on http://localhost:5173

**Terminal 3 - Blockchain (Optional):**
```bash
cd smart-contracts
pnpm hardhat node
```

### 7. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/health

## Testing

### Frontend
```bash
cd frontend
pnpm test
```

### Backend
```bash
cd backend
pnpm test
```

### Smart Contracts
```bash
cd smart-contracts
pnpm test
```

## Building for Production

### Frontend
```bash
cd frontend
pnpm build
```
Output will be in `frontend/dist/`

### Backend
```bash
cd backend
pnpm build
```
Output will be in `backend/dist/`

### Smart Contracts
```bash
cd smart-contracts
pnpm compile
```

## Deployment

### Smart Contracts to Testnet (e.g., Sepolia)

1. Get testnet ETH from a faucet
2. Create `.env` in `smart-contracts/`:
```env
PRIVATE_KEY=your-private-key
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR-PROJECT-ID
ETHERSCAN_API_KEY=your-etherscan-api-key
```

3. Add network config to `hardhat.config.ts`:
```typescript
sepolia: {
  url: process.env.SEPOLIA_RPC_URL,
  accounts: [process.env.PRIVATE_KEY],
}
```

4. Deploy:
```bash
pnpm hardhat run scripts/deploy.ts --network sepolia
```

### Backend to Production

Use services like:
- Heroku
- Railway
- Vercel
- AWS/DigitalOcean

Ensure to set all environment variables in your hosting platform.

### Frontend to Production

Deploy to:
- Vercel (recommended for Vite)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Common Issues

### MetaMask Connection Issues
- Ensure you're on the correct network (chainId matches)
- Try resetting your MetaMask account connection

### Database Connection Error
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in `.env`
- Ensure database exists: `psql -l`

### Smart Contract Deployment Fails
- Check you have enough ETH for gas
- Verify RPC URL is correct
- Ensure Hardhat node is running (for localhost)

### Port Already in Use
- Frontend: Change port in `vite.config.ts`
- Backend: Change PORT in `.env`

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Hardhat Documentation](https://hardhat.org)
- [Prisma Documentation](https://www.prisma.io/docs)
- [ethers.js Documentation](https://docs.ethers.org)

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation in `/docs`

## Next Steps

1. Explore the codebase structure in `docs/PROJECT_STRUCTURE.md`
2. Review smart contract functionality
3. Customize the UI and add your game logic
4. Deploy to testnet for testing
5. Launch on mainnet

Happy coding! 🚀
