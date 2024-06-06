import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ExpenseForm from '../components/ExpenseForm';

describe('ExpenseForm component', () => {
  const onAddExpense = jest.fn();
  const onEditExpense = jest.fn();

  test('renders ExpenseForm component correctly', () => {
    const { getByText, getByLabelText } = render(
      <ExpenseForm onAddExpense={onAddExpense} editingExpense={null} onEditExpense={onEditExpense} />
    );

    expect(getByText('Expense Form')).toBeInTheDocument();
    expect(getByLabelText('Amount Spent:')).toBeInTheDocument();
    expect(getByLabelText('Description:')).toBeInTheDocument();
    expect(getByLabelText('Category:')).toBeInTheDocument();
    expect(getByText('Add Expense')).toBeInTheDocument();
  });
  test('calls onAddExpense with correct data when adding a new expense', () => {
    const { getByLabelText, getByText } = render(
      <ExpenseForm onAddExpense={onAddExpense} editingExpense={null} onEditExpense={onEditExpense} />
    );

    fireEvent.change(getByLabelText('Amount Spent:'), { target: { value: '100' } });
    fireEvent.change(getByLabelText('Description:'), { target: { value: 'Dinner' } });
    fireEvent.change(getByLabelText('Category:'), { target: { value: 'Food' } });

    fireEvent.click(getByText('Add Expense'));

    expect(onAddExpense).toHaveBeenCalledTimes(1);
    expect(onAddExpense).toHaveBeenCalledWith({
      amount: '100',
      description: 'Dinner',
      category: 'Food',
    });
  });

  test('calls onEditExpense with correct data when updating an expense', () => {
    const editingExpense = {
      id: 1,
      amount: 50,
      description: 'Groceries',
      category: 'Food',
    };

    const { getByLabelText, getByText } = render(
      <ExpenseForm onAddExpense={onAddExpense} editingExpense={editingExpense} onEditExpense={onEditExpense} />
    );

    fireEvent.change(getByLabelText('Amount Spent:'), { target: { value: '80' } });
    fireEvent.change(getByLabelText('Description:'), { target: { value: 'Lunch' } });
    fireEvent.change(getByLabelText('Category:'), { target: { value: 'Food' } });

    fireEvent.click(getByText('Update Expense'));

    expect(onEditExpense).toHaveBeenCalledTimes(1);
    expect(onEditExpense).toHaveBeenCalledWith({
      id: 1,
      amount: '80',
      description: 'Lunch',
      category: 'Food',
    });
  });
});
