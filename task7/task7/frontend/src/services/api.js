const API_BASE = 'http://localhost:3000';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('ethereal_token') || null;
    this.user = JSON.parse(localStorage.getItem('ethereal_user') || 'null');
  }

  setToken(token, user = null) {
    this.token = token;
    if (token) {
      localStorage.setItem('ethereal_token', token);
    } else {
      localStorage.removeItem('ethereal_token');
    }
    if (user) {
      this.user = user;
      localStorage.setItem('ethereal_user', JSON.stringify(user));
    } else if (!token) {
      this.user = null;
      localStorage.removeItem('ethereal_user');
    }
  }

  getToken() {
    return this.token;
  }

  getUser() {
    return this.user;
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, config);
      let data = {};
      try {
        data = await response.json();
      } catch (err) {
        data = { message: response.statusText };
      }

      if (!response.ok) {
        const errorMsg = data.message || `Request failed with status ${response.status}`;
        throw new Error(errorMsg);
      }

      return data;
    } catch (err) {
      console.error(`API Error on ${endpoint}:`, err);
      throw err;
    }
  }

  // 1. Health / Root
  async health() {
    return this.request('/');
  }

  // 2. Auth Endpoints
  async register(name, email, password) {
    return this.request('/user/register', {
      method: 'POST',
      body: { name, email, password }
    });
  }

  async login(email, password) {
    const res = await this.request('/user/login', {
      method: 'POST',
      body: { email, password }
    });

    if (res && res.data) {
      let token = res.data;
      if (typeof token === 'object' && token.token) token = token.token;
      this.setToken(token, { email, name: email.split('@')[0] });
    }
    return res;
  }

  logout() {
    this.setToken(null, null);
  }

  // 3. Authors Module
  async createAuthorsCollection(authorDoc = { name: "Jane Austen", nationality: "British" }) {
    return this.request('/author/collection', {
      method: 'POST',
      body: authorDoc
    });
  }

  async getAuthors() {
    return this.request('/author');
  }

  // 4. Logs Module
  async createLogsCappedCollection(query = {}) {
    const qs = new URLSearchParams(query).toString();
    return this.request(`/logs/collection${qs ? '?' + qs : ''}`, {
      method: 'POST'
    });
  }

  async insertLog(bookIdOrInputs, action = "borrowed") {
    let payload = {};
    if (typeof bookIdOrInputs === 'object' && bookIdOrInputs !== null) {
      payload = {
        bookId: String(bookIdOrInputs.bookId || bookIdOrInputs._id || bookIdOrInputs.id || ''),
        action: bookIdOrInputs.action || action
      };
    } else {
      payload = {
        bookId: String(bookIdOrInputs || ''),
        action: action
      };
    }

    return this.request('/logs', {
      method: 'POST',
      body: payload
    });
  }

  // 5. Books Module - Collections & Indexes
  async createBooksCollection() {
    return this.request('/book/collection', {
      method: 'POST'
    });
  }

  async createBooksIndex() {
    return this.request('/book/index', {
      method: 'POST'
    });
  }

  // 6. Books Module - Documents CRUD
  async createBook(book) {
    return this.request('/book/bookDoc', {
      method: 'POST',
      body: book
    });
  }

  async createBooksBatch(booksArray) {
    return this.request('/book/batch', {
      method: 'POST',
      body: booksArray
    });
  }

  async updateBookWithTitle(title, updatedData) {
    const qs = new URLSearchParams({ title }).toString();
    return this.request(`/book?${qs}`, {
      method: 'PATCH',
      body: updatedData
    });
  }

  async findBookByTitle(title) {
    const qs = new URLSearchParams({ title }).toString();
    return this.request(`/book/title?${qs}`);
  }

  async findBooksBetweenYears(year1, year2) {
    const qs = new URLSearchParams({ year1: String(year1), year2: String(year2) }).toString();
    return this.request(`/book/year?${qs}`);
  }

  async findBooksByGenre(genres) {
    const qs = new URLSearchParams({ genres }).toString();
    return this.request(`/book/genre?${qs}`);
  }

  async getSkipAndLimitBooks() {
    return this.request('/book/skip-limit');
  }

  async getBooksWithYearInteger() {
    return this.request('/book/year-integer');
  }

  async getBooksExcludeGenres(genres = ['Horror', 'Science Fiction']) {
    const qs = Array.isArray(genres) 
      ? genres.map(g => `genres=${encodeURIComponent(g)}`).join('&')
      : `genres=${encodeURIComponent(genres)}`;
    return this.request(`/book/exclude-genres?${qs}`);
  }

  async deleteBooksBeforeYear(year) {
    const qs = new URLSearchParams({ year: String(year) }).toString();
    return this.request(`/book/before-year?${qs}`, {
      method: 'DELETE'
    });
  }

  // 7. Books Module - Aggregations
  async getAggregate1(year = 2000) {
    const qs = new URLSearchParams({ year: String(year) }).toString();
    return this.request(`/book/aggregate1?${qs}`);
  }

  async getAggregate2(year = 2000) {
    const qs = new URLSearchParams({ year: String(year) }).toString();
    return this.request(`/book/aggregate2?${qs}`);
  }

  async getAggregate3() {
    return this.request('/book/aggregate3');
  }

  async getAggregate4() {
    return this.request('/book/aggregate4');
  }
}

export const api = new ApiClient();
export default api;
