import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return <h2>{t('homeWelcome')}</h2>;
};

export default Home;
