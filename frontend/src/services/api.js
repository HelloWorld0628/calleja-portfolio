// API client
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  contact: {
    submit: (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  },
  admin: {
    messages: (params = {}) => {
      const search = new URLSearchParams(params).toString();
      return request(`/admin/messages${search ? `?${search}` : ''}`);
    },
    stats: () => request('/admin/messages/stats'),
    getMessage: (id) => request(`/admin/messages/${id}`),
    updateStatus: (id, status) =>
      request(`/admin/messages/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
    deleteMessage: (id) => request(`/admin/messages/${id}`, { method: 'DELETE' }),
  },
  health: () => request('/health'),
};

export default api;