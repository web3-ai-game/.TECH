import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('header_title')}</h1>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>{t('footer_text')}</p>
      </footer>
    </div>
  );
};

export default Layout;