// DMS Backend (Node.js + Express)

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = 'YOUR_AZURE_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_AZURE_CLIENT_SECRET';
const TENANT_ID = 'YOUR_TENANT_ID';
const REDIRECT_URI = 'https://your-vercel-app.vercel.app';

// RBAC Roles (mock data, can be moved to Firebase)
const roles = {
  'admin@example.com': 'Admin',
  'editor@example.com': 'Editor',
  'viewer@example.com': 'Viewer'
};

app.post('/get-token', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`, new URLSearchParams({
      client_id: CLIENT_ID,
      scope: 'https://graph.microsoft.com/.default',
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      client_secret: CLIENT_SECRET
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Token Error:', error);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

app.get('/role/:email', (req, res) => {
  const { email } = req.params;
  res.json({ role: roles[email] || 'Viewer' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
