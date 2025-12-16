import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

const BASE_URL = 'http://localhost:3002/api';

const USER = {
  username: 'admin',
  password: '1234', // реальний пароль
};

export default function () {
  // ---------- 1. LOGIN ----------
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify(USER), {
    headers: { 'Content-Type': 'application/json' },
  });

  const loginOk = check(loginRes, {
    'login status 200': (r) => r.status === 200,
    'login token returned': (r) => r.json('token') !== undefined,
  });

  if (!loginOk) {
    console.log('Login failed:', loginRes.body);
    sleep(1);
    return;
  }

  const token = loginRes.json('token');
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  // ---------- 2. GET ME ----------
  const meRes = http.get(`${BASE_URL}/auth/me`, authHeaders);
  check(meRes, { 'get me status 200': (r) => r.status === 200 });

  // ---------- 3. GET ALL POSTS ----------
  const postsRes = http.get(`${BASE_URL}/posts`, authHeaders);
  check(postsRes, { 'get posts status 200': (r) => r.status === 200 });

  let posts = [];
  try {
    const data = postsRes.json();
    posts = data.posts || [];
  } catch (e) {
    posts = [];
  }

  check(posts, { 'posts is array': (p) => Array.isArray(p) });

  // ---------- 4. GET POST BY ID ----------
  if (posts.length > 0 && posts[0]._id) {
    const postRes = http.get(`${BASE_URL}/posts/${posts[0]._id}`, authHeaders);
    check(postRes, { 'get post by id status 200': (r) => r.status === 200 });
  }

  sleep(1);
}
