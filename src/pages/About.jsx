import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return <h2>{t('about')}</h2>;
};

export default About;
