import React from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css'; // We'll make this file

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <h2>{t('welcomeMessage')}</h2>
      <p>{t('homeDescription')}</p>
    </div>
  );
};

export default Home;
