import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App'

// Mock components
jest.mock('../components/Header/Header', () => () => <div>Header Component</div>);
jest.mock('../components/Auth/AuthForm', () => () => <div>AuthForm Component</div>);
jest.mock('../components/Welcome', () => () => <div>Welcome Component</div>);
jest.mock('../components/CompleteProfile', () => () => <div>CompleteProfile Component</div>);

test('renders Header component', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  expect(screen.getByText('Header Component')).toBeInTheDocument();
});

test('renders AuthForm component at root path', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  expect(screen.getByText('AuthForm Component')).toBeInTheDocument();
});

test('renders Welcome component at /welcome path', () => {
  window.history.pushState({}, 'Welcome page', '/welcome');
  render(
    <Router>
      <App />
    </Router>
  );
  expect(screen.getByText('Welcome Component')).toBeInTheDocument();
});

test('renders CompleteProfile component at /complete-profile path', () => {
  window.history.pushState({}, 'Complete Profile page', '/complete-profile');
  render(
    <Router>
      <App />
    </Router>
  );
  expect(screen.getByText('CompleteProfile Component')).toBeInTheDocument();
});
