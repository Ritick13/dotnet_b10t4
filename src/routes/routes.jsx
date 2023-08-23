import React from 'react';

import { GeneralPageContainer } from '../containers/GeneralPageContainer';
import { AuthPageContainer } from '../containers/AuthPageContainer';
import { LandingPageContainer } from '../containers/LandingPageContainer';

import { Homepage } from '../components/Home';
import { ApplyLoan } from '../components/ApplyLoan';
import { EmployeeForm } from '../components/EmployeeForm';
import { ItemForm } from '../components/ItemForm';
import { LoanCardForm } from '../components/LoanCardForm';
import { Employees } from '../components/Employee';
import { Loans } from '../components/LoanCard';
import { Items } from '../components/Item';
import { SalaryForm } from '../components/SalaryCalculator';

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
  },
  {
    url: '/salary',
    component: <SalaryForm />
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
    url: '/add/employee',
    component: <GeneralPageContainer child={<EmployeeForm />} />,
    name: 'AddEmployeeContainer'
  },
  {
    url: '/edit/employee/:id',
    component: <GeneralPageContainer child={<EmployeeForm />} />,
    name: 'EditEmployeeContainer'
  },
  {
    url: '/add/item',
    component: <GeneralPageContainer child={<ItemForm />} />,
    name: 'AddItemContainer'
  },
  {
    url: '/edit/item/:id',
    component: <GeneralPageContainer child={<ItemForm />} />,
    name: 'EditItemContainer'
  },
  {
    url: '/add/loan',
    component: <GeneralPageContainer child={<LoanCardForm />} />,
    name: 'AddLoanCardContainer'
  },
  {
    url: '/edit/loan/:id',
    component: <GeneralPageContainer child={<LoanCardForm />} />,
    name: 'EditLoanCardContainer'
  },
  {
    url: '/employees',
    component: <GeneralPageContainer child={<Employees />} />,
    name: 'Employees'
  },
  {
    url: '/loans',
    component: <GeneralPageContainer child={<Loans />} />,
    name: 'Loans'
  },
  {
    url: '/items',
    component: <GeneralPageContainer child={<Items />} />,
    name: 'items'
  }

];
