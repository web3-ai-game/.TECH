import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <Button variant={i18n.language === 'en' ? 'secondary' : 'ghost'} onClick={() => changeLanguage('en')}>English</Button>
      <Button variant={i18n.language === 'zh-Hant' ? 'secondary' : 'ghost'} onClick={() => changeLanguage('zh-Hant')}>正體中文</Button>
    </div>
  );
};

export default LanguageSwitcher;