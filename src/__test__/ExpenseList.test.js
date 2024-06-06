import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExpenseList from '../components/ExpenseList';


describe('ExpenseList component', () => {
  const expenses = [
    { id: 1, description: 'Groceries', category: 'Food', amount: '50' },
    { id: 2, description: 'Internet Bill', category: 'Utilities', amount: '80' },
  ];

  const onDeleteExpense = jest.fn();
  const onEditExpense = jest.fn();
  const onActivatePremium = jest.fn();



  test('displays total expenses correctly', () => {
    const { getByText } = render(
      <ExpenseList
        expenses={expenses}
        onDeleteExpense={onDeleteExpense}
        onEditExpense={onEditExpense}
        onActivatePremium={onActivatePremium}
        premiumActivated={false}
      />
    );

    expect(getByText('Total Expenses Amount')).toBeInTheDocument();
    expect(getByText('130')).toBeInTheDocument();
  });

  


  // Similarly, you can write test cases for other functionalities like premium activation, etc.
});
