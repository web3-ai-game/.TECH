import { useWeb3 } from '../context/Web3Context'
import { Button } from '../components/ui/button'
import { Wallet, TrendingUp, Users, Trophy } from 'lucide-react'
import HealthCheck from '../components/HealthCheck';

export function Dashboard() {
  const { account, connectWallet } = useWeb3()

  if (!account) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Wallet className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
        <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="text-muted-foreground mb-6">
          Please connect your wallet to access the dashboard
        </p>
        <Button onClick={connectWallet} size="lg">
          Connect Wallet
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Wallet className="w-8 h-8" />}
          title="Wallet Balance"
          value="0.00 ETH"
          trend="+0%"
        />
        <StatCard
          icon={<Trophy className="w-8 h-8" />}
          title="Total Wins"
          value="0"
          trend="+0%"
        />
        <StatCard
          icon={<TrendingUp className="w-8 h-8" />}
          title="Win Rate"
          value="0%"
          trend="+0%"
        />
        <StatCard
          icon={<Users className="w-8 h-8" />}
          title="Global Rank"
          value="-"
          trend="+0%"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Games</h2>
          <p className="text-muted-foreground">No games played yet. Start playing to see your history!</p>
        </div>

        <div className="bg-card rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Active Tournaments</h2>
          <p className="text-muted-foreground">No active tournaments. Check back soon!</p>
        </div>
      </div>

      <HealthCheck />
    </div>
  )
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode; title: string; value: string; trend: string }) {
  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-primary">{icon}</div>
        <span className="text-sm text-green-600">{trend}</span>
      </div>
      <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
