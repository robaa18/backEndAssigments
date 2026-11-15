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
  verifyTwoStep: (data) => api.patch('/auth/verify-2step-code', data),
  login: (data) => api.post('/auth/login', data),
  sendOtp: (data) => api.post('/auth/send-otp', data),
  forgotPassword: (data) => api.patch('/auth/forget-password', data),
  resetPassword: (data) => api.patch('/auth/reset-password', data),
  enableTwoStep: (data) => api.patch('/auth/enable-2step-verify', data),
  google: (credential) => api.post('/auth/google', { credential }),
}

export const messagesApi = {
  inbox: () => api.get('/messages'),
  send: (receiver, content) => api.post('/messages', { receiver, content }),
  sendLogged: (receiver, content) => api.post('/messages/logged-public', { receiver, content }),
}

export const requestsApi = {
  list: () => api.get('/request/requests'),
  send: (message) => api.post('/request/send-request', { message }),
  accept: (reqId) => api.patch('/request/accept-request', { reqId }),
  reject: (reqId) => api.patch('/request/reject-request', { reqId }),
}

export const usersApi = {
  uploadProfilePicture: (file) => {
    const form = new FormData()
    form.append('pp', file)
    return api.post('/users/upload-pp', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
