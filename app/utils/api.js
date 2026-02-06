// API utility functions with error handling

const API_BASE_URL = "http://192.168.1.3:8000/api/ecom";
const API_TIMEOUT = 10000;

export class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    });

    clearTimeout(timeoutId);

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      throw new APIError(
        'Invalid JSON response from server',
        response.status,
        null
      );
    }

    if (!response.ok) {
      throw new APIError(
        data.message || `HTTP error! status: ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new APIError('Request timeout', 408, null);
    }
    
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or other errors
    throw new APIError(
      error.message || 'Network error occurred',
      0,
      null
    );
  }
}

// Specific API functions
export const api = {
  // Get menu items
  getMenu: () => apiRequest('/menu'),
  
  // Get all products
  getProducts: () => apiRequest('/products'),
  
  // Get product by ID
  getProduct: (id) => apiRequest(`/products/${id}`),
  
  // Get product by ID (fallback)
  getProductById: (id) => apiRequest(`/products?id=${id}`),
};

export default api;