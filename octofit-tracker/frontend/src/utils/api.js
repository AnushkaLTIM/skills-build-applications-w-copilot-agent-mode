/**
 * API Utility Module
 * 
 * Provides a base URL for API endpoints using Vite environment variables.
 * 
 * REQUIRED: Define VITE_CODESPACE_NAME in .env.local
 * Example: VITE_CODESPACE_NAME=my-codespace
 * 
 * This will construct API URLs like:
 * https://my-codespace-8000.app.github.dev/api/[component]/
 */

/**
 * Get the API base URL
 * Falls back to localhost if VITE_CODESPACE_NAME is not defined
 * 
 * @returns {string} The base API URL
 */
export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName) {
    console.warn(
      'VITE_CODESPACE_NAME is not defined. Falling back to localhost. ' +
      'For Codespace deployments, define VITE_CODESPACE_NAME in .env.local'
    );
    return 'http://localhost:8000/api';
  }
  
  return `https://${codespaceName}-8000.app.github.dev/api`;
}

/**
 * Construct a full API endpoint URL
 * 
 * @param {string} component - The component/resource name (e.g., 'activities', 'users')
 * @param {string} [path=''] - Optional additional path segments
 * @returns {string} The full endpoint URL
 */
export function getApiEndpoint(component, path = '') {
  const baseUrl = getApiBaseUrl();
  const fullPath = path ? `/${path}` : '';
  return `${baseUrl}/${component}${fullPath}`;
}

/**
 * Fetch data from an API endpoint with error handling
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
 * Fetch paginated data from an API endpoint
 * Handles both array responses and paginated responses with data/items property
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

  // Handle paginated response format (e.g., { data: [...], total: 100 })
  if (data && typeof data === 'object' && 'data' in data) {
    return {
      items: Array.isArray(data.data) ? data.data : [],
      total: data.total || 0,
      error: null,
    };
  }

  // Handle direct array response
  if (Array.isArray(data)) {
    return {
      items: data,
      total: data.length,
      error: null,
    };
  }

  return { items: [], total: 0, error: 'Invalid response format' };
}
