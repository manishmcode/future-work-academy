import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { API_URLS } from './api';

jest.mock('./components/Navbar', () => ({ Navbar: () => null }));
jest.mock('./components/Footer', () => ({ Footer: () => null }));
jest.mock('./components/Seo', () => ({ Seo: () => null }));
jest.mock('./components/ScrollToTop', () => ({ ScrollToTop: () => null }));
jest.mock('./pages/Home', () => ({ Home: () => <div>Home page</div> }));
jest.mock('./pages/Login', () => ({ Login: () => <div>Login page</div> }));
jest.mock('./pages/Pricing', () => ({ Pricing: () => <div>Pricing page</div> }));

const mockFetch = jest.fn();
const dashboard = () => new Response(JSON.stringify({ success: true, data: { plan_id: 1 } }));

beforeEach(() => {
  localStorage.clear();
  mockFetch.mockReset();
  global.fetch = mockFetch;
  window.history.replaceState({}, '', '/');
});

afterEach(() => jest.useRealTimers());

test.each(['/library/', '/schedule/', '/live-room/', '/courses/'])(
  'redirects an unauthenticated visit to %s to pricing', async (path) => {
    window.history.replaceState({}, '', path);
    render(<App />);
    expect(await screen.findByText('Pricing page')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/pricing/');
    expect(mockFetch).not.toHaveBeenCalled();
  },
);

test.each(['/account/', '/profile/'])(
  'redirects an unauthenticated visit to %s to login', async (path) => {
    window.history.replaceState({}, '', path);
    render(<App />);
    expect(await screen.findByText('Login page')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/login/');
    expect(mockFetch).not.toHaveBeenCalled();
  },
);

test.each([401, 403])('clears a rejected stored session (%s), even with a non-JSON body', async (status) => {
  window.history.replaceState({}, '', '/library/');
  localStorage.setItem('futureworkacademy_token', 'invalid-token');
  localStorage.setItem('futureworkacademy_user', JSON.stringify({ plan_id: 1 }));
  localStorage.setItem('futureworkacademy_auth', 'true');
  localStorage.setItem('futureworkacademy_is_admin', 'true');
  document.cookie = 'futureworkacademy_auth_hint=1; Path=/';
  mockFetch.mockResolvedValue(new Response('Unauthorized', { status }));
  render(<App />);
  expect(await screen.findByText('Login page')).toBeInTheDocument();
  expect(localStorage.length).toBe(0);
  expect(document.cookie).not.toContain('futureworkacademy_auth_');
});

test('redirects when the library rejects a previously validated session', async () => {
  localStorage.setItem('futureworkacademy_token', 'expired-after-dashboard');
  window.history.replaceState({}, '', '/library/');
  mockFetch.mockImplementation((url) => Promise.resolve(
    url === API_URLS.user.dashboard ? dashboard() : new Response('', { status: 401 }),
  ));
  render(<App />);
  expect(await screen.findByText('Login page')).toBeInTheDocument();
  expect(mockFetch).toHaveBeenCalledWith(`${API_URLS.library.items}?page=1&limit=10`, expect.anything());
  expect(localStorage.getItem('futureworkacademy_token')).toBeNull();
});

test('keeps pricing as the destination for a valid member without a plan', async () => {
  localStorage.setItem('futureworkacademy_token', 'valid-token');
  window.history.replaceState({}, '', '/library/');
  mockFetch.mockResolvedValue(new Response(JSON.stringify({ success: true, data: { plan_id: null } })));
  render(<App />);
  expect(await screen.findByText('Pricing page')).toBeInTheDocument();
  expect(localStorage.getItem('futureworkacademy_token')).toBe('valid-token');
});

test.each(['focus', 'timer'])('detects expiry while idle through the %s check', async (trigger) => {
  jest.useFakeTimers();
  localStorage.setItem('futureworkacademy_token', 'initially-valid');
  mockFetch.mockResolvedValueOnce(dashboard());
  render(<App />);
  await waitFor(() => expect(localStorage.getItem('futureworkacademy_auth')).toBe('true'));
  mockFetch.mockResolvedValue(new Response('', { status: 401 }));
  await act(async () => {
    if (trigger === 'focus') window.dispatchEvent(new Event('focus'));
    else jest.advanceTimersByTime(60_000);
  });
  expect(await screen.findByText('Login page')).toBeInTheDocument();
  expect(localStorage.getItem('futureworkacademy_token')).toBeNull();
});

test('retains the session when validation fails due to a network error', async () => {
  localStorage.setItem('futureworkacademy_token', 'valid-token');
  mockFetch.mockRejectedValue(new Error('Network unavailable'));
  render(<App />);
  await waitFor(() => expect(mockFetch).toHaveBeenCalled());
  expect(screen.getByText('Home page')).toBeInTheDocument();
  expect(localStorage.getItem('futureworkacademy_token')).toBe('valid-token');
});
