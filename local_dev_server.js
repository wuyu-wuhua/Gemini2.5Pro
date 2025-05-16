const app = require('./server.js');
const port = process.env.PORT || 3001; // Or your preferred port

app.listen(port, () => {
  console.log(`Backend server running locally on port ${port}`);
  console.log(`Google OAuth Callback for local dev: http://localhost:${port}/auth/google/callback`);
  console.log("Ensure DASHSCOPE_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and SESSION_SECRET are set in your .env file.");
}); 