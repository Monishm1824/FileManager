// Authentication Service
import api from '../utils/apiClient';

export const authService = {
  async register(name, email, password) {
    const response = await api.post('/auth/register', { name, email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
};

// User Service
export const userService = {
  async getAllUsers(role) {
    const params = role ? { role } : {};
    return api.get('/users', { params });
  },

  async getUserById(id) {
    return api.get(`/users/${id}`);
  },

  async updateUser(id, data) {
    return api.put(`/users/${id}`, data);
  },

  async deleteUser(id) {
    return api.delete(`/users/${id}`);
  },

  async changePassword(id, newPassword) {
    return api.post(`/users/${id}/change-password`, { newPassword });
  },
};

// Task Service
export const taskService = {
  async createTask(data) {
    return api.post('/tasks', data);
  },

  async getAllTasks(filters) {
    const params = filters ? { ...filters } : {};
    return api.get('/tasks', { params });
  },

  async getTaskById(id) {
    return api.get(`/tasks/${id}`);
  },

  async updateTask(id, data) {
    return api.put(`/tasks/${id}`, data);
  },

  async deleteTask(id) {
    return api.delete(`/tasks/${id}`);
  },

  async getMyTasks() {
    return api.get('/tasks/my/tasks');
  },
};

// Note Service
export const noteService = {
  async createNote(content) {
    return api.post('/notes', { content });
  },

  async getMyNotes() {
    return api.get('/notes/my/notes');
  },

  async getNoteById(id) {
    return api.get(`/notes/${id}`);
  },

  async updateNote(id, content) {
    return api.put(`/notes/${id}`, { content });
  },

  async deleteNote(id) {
    return api.delete(`/notes/${id}`);
  },

  async getAllNotes() {
    return api.get('/notes');
  },
};

// Report Service
export const reportService = {
  async createReport(summary) {
    return api.post('/reports', { summary });
  },

  async getMyReports() {
    return api.get('/reports/my/reports');
  },

  async getReportById(id) {
    return api.get(`/reports/${id}`);
  },

  async getAllReports(filters) {
    const params = filters ? { ...filters } : {};
    return api.get('/reports', { params });
  },

  async updateReportStatus(id, data) {
    return api.put(`/reports/${id}`, data);
  },

  async approveReport(id) {
    return api.post(`/reports/${id}/approve`);
  },

  async rejectReport(id, reason) {
    return api.post(`/reports/${id}/reject`, { reason });
  },
};
