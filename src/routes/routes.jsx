import React from 'react';

import { GeneralPageContainer } from '../containers/GeneralPageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { LandingPageContainer } from '../containers/LandingPageContainer';

import { Homepage } from '../components/Home';
import { ApplyLoan } from '../components/ApplyLoan';
import { EmployeeForm } from '../components/EmployeeForm';
import { ItemForm } from '../components/ItemForm';
import { LoanCardForm } from '../components/LoanCardForm';

export const publicRoutes = [
  {
    url: '/auth',
    component: <AuthPageContainer />,
    name: 'AuthPageContainer'
  },
  {
    url: '/',
    component: <LandingPageContainer />,
    name: 'LandingPageContainer'
  }

];

export const privateRoutes = [
  {
    url: '/home',
    component: <GeneralPageContainer child={<Homepage />} />,
    name: 'HomePageContainer',
    label: 'home'
  },
  {
    url: '/apply-loan',
    component: <GeneralPageContainer child={<ApplyLoan />} />,
    name: 'ApplyLoanPageContainer',
    label: 'apply Loan'
  },
  {
    url: '/add-employee',
    component: <GeneralPageContainer child={<EmployeeForm />} />,
    name: 'AddEmployeeContainer'
  },
  {
    url: '/add-item',
    component: <GeneralPageContainer child={<ItemForm />} />,
    name: 'AddItemContainer'
  },
  {
    url: '/add-loan',
    component: <GeneralPageContainer child={<LoanCardForm />} />,
    name: 'AddLoanCardContainer'
  }

];
