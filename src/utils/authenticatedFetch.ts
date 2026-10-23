export const AUTH_EXPIRED_EVENT = 'futureworkacademy:auth-expired';

// Check status before callers parse JSON: authentication errors may have no body.
export async function authenticatedFetch(url: string, init?: RequestInit): Promise<Response> {
  const token = localStorage.getItem('futureworkacademy_token');
  if (!token) {
    window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    throw new Error('Please log in again.');
  }

  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(url, { ...init, headers });
  if (response.status === 401 || response.status === 403) {
    // A response from an older session must not log out a newly signed-in user.
    if (localStorage.getItem('futureworkacademy_token') === token) {
      window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
    }
    throw new Error('Your session has expired. Please log in again.');
  }
  return response;
}
