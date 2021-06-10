import { Router } from 'vue-router';

export function getAuthHeader(): Record<string, string> {
  // return authorization header with basic auth credentials
  const authHeader = localStorage.getItem('authHeader');

  if (authHeader) {
    return { Authorization: `Basic ${authHeader}` };
  }
  return {};
}

export function logout(router: Router): void {
  // remove user from local storage to log user out
  localStorage.removeItem('authHeader');
  router.push({ name: 'Login' });
}

export function authenticate(username: string, password: string, router: Router): void {
  const authHeader = window.btoa(`${username}:${password}`);
  localStorage.setItem('authHeader', authHeader);

  router.push({ name: 'Home' });
}
