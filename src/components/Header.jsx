import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log(`Current language: ${lng}`);
  };

  return (
    <header className="header">
      <h1 className="logo">{t('globalVintage')}</h1>
      <nav className="nav-links">
        <Link to="/">{t('home')}</Link>
        <Link to="/shop">{t('shop')}</Link>
        <Link to="/about">{t('about')}</Link>
        <Link to="/contact">{t('contact')}</Link>
        <Link to="/checkout">{t('checkout')}</Link>
      </nav>
      <div className="language-switcher">
        <button onClick={() => changeLanguage('en')}>🇬🇧</button>
        <button onClick={() => changeLanguage('no')}>🇳🇴</button>
      </div>
    </header>
  );
};

export default Header;
