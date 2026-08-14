/**
 * API Utility Module
 *
 * Provides a base URL for API endpoints using Vite environment variables.
 *
 * REQUIRED: Define VITE_CODESPACE_NAME in .env.local
 * Example: VITE_CODESPACE_NAME=my-codespace
 *
 * This constructs API URLs like:
 * https://my-codespace-8000.app.github.dev/api/[component]/
 */

/**
 * Get the API base URL.
 * Falls back to localhost when VITE_CODESPACE_NAME is not defined.
 *
 * @returns {string} The base API URL
 */
export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (!codespaceName || !String(codespaceName).trim()) {
    console.warn(
      'VITE_CODESPACE_NAME is not defined. Falling back to http://localhost:8000/api. ' +
      'For Codespace deployments, define VITE_CODESPACE_NAME in .env.local.'
    );
    return 'http://localhost:8000/api';
  }

  return `https://${String(codespaceName).trim()}-8000.app.github.dev/api`;
}

/**
 * Construct a full API endpoint URL.
 *
 * @param {string} component - The component/resource name (e.g., 'activities', 'users')
 * @param {string} [path=''] - Optional additional path segments
 * @returns {string} The full endpoint URL
 */
export function getApiEndpoint(component, path = '') {
  const safeComponent = String(component || '').replace(/^\/+|\/+$/g, '');
  const safePath = path ? String(path).replace(/^\/+|\/+$/g, '') : '';
  const baseUrl = getApiBaseUrl();

  return safePath ? `${baseUrl}/${safeComponent}/${safePath}` : `${baseUrl}/${safeComponent}`;
}

/**
 * Fetch data from an API endpoint with error handling.
 *
 * @param {string} endpoint - The API endpoint URL
 * @param {object} [options={}] - Fetch options (method, headers, body, etc.)
 * @returns {Promise<{data: object|array, error: null}|{data: null, error: string}>} Response data or error
 */
export async function fetchFromApi(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('API request failed:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Normalize API responses so the frontend works with direct arrays and paginated payloads.
 *
 * @param {unknown} data - Raw API response
 * @returns {{ items: array, total: number }}
 */
function normalizeApiResponse(data) {
  if (Array.isArray(data)) {
    return { items: data, total: data.length };
  }

  if (data && typeof data === 'object') {
    const candidateArrays = ['data', 'items', 'results'];

    for (const key of candidateArrays) {
      if (Array.isArray(data[key])) {
        return {
          items: data[key],
          total: Number(data.total ?? data.count ?? data[key].length ?? 0),
        };
      }
    }
  }

  return { items: [], total: 0 };
}

/**
 * Fetch paginated data from an API endpoint.
 * Handles both array responses and paginated responses with data/items/results properties.
 *
 * @param {string} endpoint - The API endpoint URL
 * @param {object} [options={}] - Fetch options
 * @returns {Promise<{items: array, total: number, error: null}|{items: [], total: 0, error: string}>}
 */
export async function fetchPaginatedData(endpoint, options = {}) {
  const { data, error } = await fetchFromApi(endpoint, options);

  if (error) {
    return { items: [], total: 0, error };
  }

  const normalized = normalizeApiResponse(data);

  if (normalized.items.length > 0 || Array.isArray(data) || (data && typeof data === 'object' && ('data' in data || 'items' in data || 'results' in data))) {
    return {
      items: normalized.items,
      total: normalized.total,
      error: null,
    };
  }

  return { items: [], total: 0, error: 'Invalid response format' };
}
