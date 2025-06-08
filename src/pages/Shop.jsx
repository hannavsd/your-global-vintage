import React from 'react';
import { useTranslation } from 'react-i18next';

const Shop = () => {
  const { t } = useTranslation();
  return <h2>{t('shop')}</h2>;
};

export default Shop;
