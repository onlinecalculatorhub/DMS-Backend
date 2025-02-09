const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  apiKey: 'AIzaSyBliXjYaDB8vwICouYKplg4k2fxQo92QJs',
  authDomain: 'document-59e41.firebaseapp.com',
  projectId: 'document-59e41'
});

app.get('/', (req, res) => {
  res.send('✅ DMS Backend Running');
});

app.use((req, res) => {
  res.status(404).send('❌ Route Not Found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
