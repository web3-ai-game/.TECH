import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Gamepad2, Zap, Shield, Trophy } from 'lucide-react'

export function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to .TECH
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          The next generation Web3 AI-powered gaming platform. Play, earn, and compete in a decentralized ecosystem.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/dashboard">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <FeatureCard
          icon={<Zap className="w-12 h-12 text-primary" />}
          title="Lightning Fast"
          description="Experience seamless gameplay with our optimized blockchain infrastructure"
        />
        <FeatureCard
          icon={<Shield className="w-12 h-12 text-primary" />}
          title="Secure & Transparent"
          description="All game logic and rewards are secured by smart contracts on the blockchain"
        />
        <FeatureCard
          icon={<Trophy className="w-12 h-12 text-primary" />}
          title="Play to Earn"
          description="Compete in tournaments and earn real rewards in cryptocurrency"
        />
      </section>

      <section className="bg-card rounded-lg p-12 text-center">
        <Gamepad2 className="w-16 h-16 mx-auto mb-6 text-primary" />
        <h2 className="text-3xl font-bold mb-4">Ready to Start Playing?</h2>
        <p className="text-muted-foreground mb-6">
          Connect your wallet and join thousands of players worldwide
        </p>
        <Button size="lg" asChild>
          <Link to="/dashboard">Launch App</Link>
        </Button>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
