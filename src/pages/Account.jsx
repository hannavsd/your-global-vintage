import React from 'react';
import { useTranslation } from 'react-i18next';

const Account = () => {
  const { t } = useTranslation();
  return <h2>{t('account')}</h2>;
};

export default Account;
