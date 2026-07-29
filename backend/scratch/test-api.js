const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';
const testUser = {
  fullName: 'Test User',
  email: `test_${Date.now()}@example.com`,
  password: 'password123',
};

async function runTests() {
  console.log('--- Testing Auth Backend API ---');
  console.log('Test User info:', testUser);

  let token = '';

  // 1. Test Register
  try {
    console.log('\n[1] Registering test user...');
    const res = await axios.post(`${API_URL}/register`, testUser);
    console.log('Register Success:', res.status);
    console.log('Response data:', res.data);
    token = res.data.token;
  } catch (error) {
    console.error('Register Failed:', error.response ? error.response.data : error.message);
    process.exit(1);
  }

  // 2. Test Login
  try {
    console.log('\n[2] Logging in test user...');
    const res = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: testUser.password,
    });
    console.log('Login Success:', res.status);
    console.log('Response data:', res.data);
  } catch (error) {
    console.error('Login Failed:', error.response ? error.response.data : error.message);
    process.exit(1);
  }

  // 3. Test Get Me
  try {
    console.log('\n[3] Fetching profile with Bearer Token...');
    const res = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Profile Fetch Success:', res.status);
    console.log('Profile data:', res.data);
  } catch (error) {
    console.error('Profile Fetch Failed:', error.response ? error.response.data : error.message);
    process.exit(1);
  }

  console.log('\n--- All Auth API Tests Passed Successfully! ---');
}

runTests();
