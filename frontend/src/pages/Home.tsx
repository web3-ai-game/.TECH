import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Gamepad2, Zap, Shield, Trophy } from 'lucide-react'
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('welcome')}
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('description')}
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/dashboard">{t('get_started')}</Link>
          </Button>
          <Button size="lg" variant="outline">
            {t('learn_more')}
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <FeatureCard
          icon={<Zap className="w-12 h-12 text-primary" />}
          title={t('feature_fast_title')}
          description={t('feature_fast_desc')}
        />
        <FeatureCard
          icon={<Shield className="w-12 h-12 text-primary" />}
          title={t('feature_secure_title')}
          description={t('feature_secure_desc')}
        />
        <FeatureCard
          icon={<Trophy className="w-12 h-12 text-primary" />}
          title={t('feature_earn_title')}
          description={t('feature_earn_desc')}
        />
      </section>

      <section className="bg-card rounded-lg p-12 text-center">
        <Gamepad2 className="w-16 h-16 mx-auto mb-6 text-primary" />
        <h2 className="text-3xl font-bold mb-4">{t('ready_to_play')}</h2>
        <p className="text-muted-foreground mb-6">
          {t('connect_wallet')}
        </p>
        <Button size="lg" asChild>
          <Link to="/dashboard">{t('launch_app')}</Link>
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