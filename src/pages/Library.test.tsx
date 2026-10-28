import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Library } from './Library';
import { authenticatedFetch } from '../utils/authenticatedFetch';
import { API_URLS } from '../api';

jest.mock('../utils/authenticatedFetch', () => ({ authenticatedFetch: jest.fn() }));
const mockFetch = authenticatedFetch as jest.MockedFunction<typeof authenticatedFetch>;
let intersection: IntersectionObserverCallback;
const card = (id: number) => ({
  title: `Lesson ${id}`, category: 'SEO', link: `/video/${id}`, image: `/image/${id}.webp`,
  plan_ids: [1], duration_seconds: 1200 - id,
});
const response = (data: unknown) => Promise.resolve({
  ok: true, json: async () => ({ success: true, data }),
} as Response);
const page = (start: number, count: number, hasMore: boolean) => ({
  items: Array.from({ length: count }, (_, i) => card(start + i)),
  pagination: { has_more: hasMore },
});
const renderLibrary = () => render(<MemoryRouter><Library /></MemoryRouter>);
const scrollToEnd = () => act(() => intersection([
  { isIntersecting: true } as IntersectionObserverEntry,
], {} as IntersectionObserver));

beforeEach(() => {
  mockFetch.mockReset();
  Element.prototype.scrollIntoView = jest.fn();
  global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
    intersection = callback;
    return { observe: jest.fn(), disconnect: jest.fn(), unobserve: jest.fn() };
  });
  mockFetch.mockImplementation((url) => url === API_URLS.library.categories
    ? response([{ title: 'SEO', item_count: 20 }]) : response(page(1, 10, true)));
});

test('selects ALL first and requests only the first ten items', async () => {
  renderLibrary();
  expect(await screen.findByRole('heading', { name: 'Lesson 1' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'ALL' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(10);
  expect(mockFetch).toHaveBeenCalledWith(`${API_URLS.library.items}?page=1&limit=10`, expect.anything());
  expect(mockFetch).not.toHaveBeenCalledWith(API_URLS.library.list, expect.anything());
});

test('scroll appends the next ten, prevents overlapping requests, and stops at the end', async () => {
  let resolveNext!: (value: Response) => void;
  mockFetch.mockImplementation((url) => {
    if (url === API_URLS.library.categories) return response([{ title: 'SEO', item_count: 20 }]);
    if (url.includes('page=2')) return new Promise((resolve) => { resolveNext = resolve; });
    return response(page(1, 10, true));
  });
  renderLibrary();
  await screen.findByRole('heading', { name: 'Lesson 1' });
  scrollToEnd();
  scrollToEnd();
  expect(mockFetch.mock.calls.filter(([url]) => url.includes('page=2'))).toHaveLength(1);
  await act(async () => { resolveNext(await response(page(11, 10, false))); });
  expect(await screen.findByRole('heading', { name: 'Lesson 20' })).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(20);
  expect(screen.queryByRole('button', { name: 'Load more lessons' })).not.toBeInTheDocument();
});

test('changing category discards an old in-flight page and restarts at page one', async () => {
  let resolveOld!: (value: Response) => void;
  mockFetch.mockImplementation((url) => {
    if (url === API_URLS.library.categories) return response([{ title: 'SEO', item_count: 1 }]);
    if (url.includes('category=SEO')) return response(page(99, 1, false));
    if (url.includes('page=2')) return new Promise((resolve) => { resolveOld = resolve; });
    return response(page(1, 10, true));
  });
  renderLibrary();
  await screen.findByRole('heading', { name: 'Lesson 1' });
  scrollToEnd();
  fireEvent.click(screen.getByRole('button', { name: 'SEO' }));
  await screen.findByRole('heading', { name: 'Lesson 99' });
  await act(async () => { resolveOld(await response(page(11, 10, false))); });
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
  expect(screen.queryByRole('heading', { name: 'Lesson 11' })).not.toBeInTheDocument();
  expect(mockFetch).toHaveBeenCalledWith(`${API_URLS.library.items}?page=1&limit=10&category=SEO`, expect.anything());
  fireEvent.click(screen.getByRole('button', { name: 'ALL' }));
  await screen.findByRole('heading', { name: 'Lesson 1' });
});

test('category selection scrolls immediately without waiting for videos or scrolling again after loading', async () => {
  let resolveCategory!: (value: Response) => void;
  mockFetch.mockImplementation((url) => {
    if (url === API_URLS.library.categories) return response([{ title: 'SEO', item_count: 1 }]);
    if (url.includes('category=SEO')) return new Promise((resolve) => { resolveCategory = resolve; });
    if (url.includes('page=2')) return response(page(11, 1, false));
    return response(page(1, 10, true));
  });
  renderLibrary();
  await screen.findByRole('heading', { name: 'Lesson 1' });
  expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'SEO' }));
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  await act(async () => { resolveCategory(await response(page(99, 1, false))); });
  await screen.findByRole('heading', { name: 'Lesson 99' });
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ block: 'start', behavior: 'smooth' });
  const scroll = Element.prototype.scrollIntoView as jest.Mock;
  expect(scroll.mock.instances[0]).toBe(screen.getByRole('region', { name: 'SEO' }));
  fireEvent.change(screen.getByRole('combobox', { name: 'Browse collections' }), { target: { value: '' } });
  expect(scroll).toHaveBeenCalledTimes(2);
  await screen.findByRole('heading', { name: 'Lesson 1' });
  scrollToEnd();
  await screen.findByRole('heading', { name: 'Lesson 11' });
  expect(scroll).toHaveBeenCalledTimes(2);
});

test('search queries the server so results outside loaded pages can be found', async () => {
  mockFetch.mockImplementation((url) => url === API_URLS.library.categories
    ? response([]) : response(url.includes('search=') ? page(99, 1, false) : page(1, 10, true)));
  renderLibrary();
  await screen.findByRole('heading', { name: 'Lesson 1' });
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'Lesson 99' } });
  await screen.findByRole('heading', { name: 'Lesson 99' });
  expect(mockFetch).toHaveBeenCalledWith(`${API_URLS.library.items}?page=1&limit=10&search=Lesson+99`, expect.anything());
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1);
});

test('a failed next page keeps existing cards and retries the same page', async () => {
  let nextAttempts = 0;
  mockFetch.mockImplementation((url) => {
    if (url === API_URLS.library.categories) return response([]);
    if (url.includes('page=2')) {
      nextAttempts += 1;
      return nextAttempts === 1 ? Promise.reject(new Error('Network interrupted')) : response(page(11, 1, false));
    }
    return response(page(1, 10, true));
  });
  renderLibrary();
  await screen.findByRole('heading', { name: 'Lesson 1' });
  scrollToEnd();
  expect(await screen.findByText('Network interrupted')).toBeInTheDocument();
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(10);
  fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
  await screen.findByRole('heading', { name: 'Lesson 11' });
  await waitFor(() => expect(nextAttempts).toBe(2));
});
