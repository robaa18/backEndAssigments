import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(new Error(
    error.response?.data?.message || error.message || 'Something went wrong. Please try again.'
  )),
)

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  verify: (data) => api.patch('/auth/verify', data),
  login: (data) => api.post('/auth/login', data),
  sendOtp: (data) => api.post('/auth/send-otp', data),
  resetPassword: (data) => api.patch('/auth/reset-password', data),
  google: (credential) => api.post('/auth/google', { credential }),
}

export const messagesApi = {
  inbox: () => api.get('/messages'),
  send: async (receiverId, content) => {
    const message = typeof content === 'string'
      ? { receiver: receiverId, content }
      : { ...content, receiver: content?.receiver ?? receiverId }

    try {
      return await api.post('/messages', message)
    } catch (error) {
      if (!receiverId) throw error
      const status = error?.response?.status
      if (status === 404 || status === 405) {
        return api.post(`/messages/${encodeURIComponent(receiverId)}`, { content: message.content })
      }
      throw error
    }
  },
  publicProfile: (username) => api.get(`/users/${encodeURIComponent(username)}`),
}
