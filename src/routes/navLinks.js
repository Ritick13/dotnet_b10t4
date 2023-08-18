import {
  IconBasket,
  IconForms,
  IconHome,
  IconSettingsDollar,
  IconUsers
} from '@tabler/icons-react';

export const navLinks = [
  {
    link: '/home', label: 'home', icon: IconHome, for: 'user'
  },
  {
    link: '/apply-loan', label: 'apply Loan', icon: IconForms, for: 'user'
  },
  {
    link: '/employees', label: 'Employees', icon: IconUsers, for: 'admin'
  },
  {
    link: '/loans', label: 'Loans', icon: IconSettingsDollar, for: 'admin'
  },
  {
    link: '/items', label: 'Items', icon: IconBasket, for: 'admin'
  }
];
