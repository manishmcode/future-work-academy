import { authenticatedFetch, AUTH_EXPIRED_EVENT } from './authenticatedFetch';

const mockFetch = jest.fn();
const onExpired = jest.fn();

beforeEach(() => {
  localStorage.clear();
  mockFetch.mockReset();
  onExpired.mockReset();
  global.fetch = mockFetch;
  window.addEventListener(AUTH_EXPIRED_EVENT, onExpired);
});

afterEach(() => window.removeEventListener(AUTH_EXPIRED_EVENT, onExpired));

test('expires a missing session without sending a request', async () => {
  await expect(authenticatedFetch('/private')).rejects.toThrow('Please log in again.');
  expect(mockFetch).not.toHaveBeenCalled();
  expect(onExpired).toHaveBeenCalledTimes(1);
});

test('preserves request options and sets the current bearer token', async () => {
  localStorage.setItem('futureworkacademy_token', 'current-token');
  mockFetch.mockResolvedValue(new Response('{}'));
  await authenticatedFetch('/private', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
  });
  const [, options] = mockFetch.mock.calls[0];
  expect(options.headers.get('Authorization')).toBe('Bearer current-token');
  expect(options.headers.get('Content-Type')).toBe('application/json');
  expect(options.method).toBe('POST');
  expect(options.body).toBe('{}');
});

test('does not expire a new session when an older request is rejected', async () => {
  localStorage.setItem('futureworkacademy_token', 'old-token');
  mockFetch.mockImplementation(async () => {
    localStorage.setItem('futureworkacademy_token', 'new-token');
    return new Response('', { status: 401 });
  });
  await expect(authenticatedFetch('/private')).rejects.toThrow('session has expired');
  expect(onExpired).not.toHaveBeenCalled();
  expect(localStorage.getItem('futureworkacademy_token')).toBe('new-token');
});
