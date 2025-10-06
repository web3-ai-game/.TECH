import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, Wallet } from 'lucide-react'
import { Button } from './ui/button'
import { useWeb3 } from '../context/Web3Context'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { account, connectWallet, disconnectWallet } = useWeb3()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Gamepad2 className="w-6 h-6" />
            .TECH
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-primary transition-colors">
              Dashboard
            </Link>
            
            {account ? (
              <Button onClick={disconnectWallet} variant="outline">
                <Wallet className="w-4 h-4 mr-2" />
                {account.slice(0, 6)}...{account.slice(-4)}
              </Button>
            ) : (
              <Button onClick={connectWallet}>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 .TECH - Web3 AI Game Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
