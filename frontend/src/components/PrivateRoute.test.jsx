import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import PrivateRoute from './PrivateRoute';

const tokenFor = (payload) => {
  const encodedPayload = btoa(JSON.stringify(payload));
  return `header.${encodedPayload}.signature`;
};

const renderRoute = (role) =>
  render(
    <MemoryRouter initialEntries={['/mentor/dashboard']}>
      <Routes>
        <Route
          path="/mentor/dashboard"
          element={
            <PrivateRoute role={role}>
              <p>Mentor dashboard</p>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<p>Login page</p>} />
        <Route path="/mentee/dashboard" element={<p>Mentee dashboard</p>} />
      </Routes>
    </MemoryRouter>,
  );

describe('PrivateRoute', () => {
  test('renders its children for an authenticated user with the required role', () => {
    localStorage.setItem('accessToken', tokenFor({ role: 'mentor' }));

    renderRoute('mentor');

    expect(screen.getByText('Mentor dashboard')).toBeInTheDocument();
  });

  test('redirects an unauthenticated user to login', () => {
    renderRoute('mentor');

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
