const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());

// ✅ public ফোল্ডার থেকে static ফাইল সার্ভ
app.use(express.static(path.join(__dirname, 'public')));

let posts = [];

// নতুন পোস্ট যুক্ত করা
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: "শিরোনাম ও বিষয়বস্তু প্রয়োজন" });
  }
  const date = new Date().toLocaleDateString('bn-BD', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  posts.push({ title, content, date });
  res.json({ success: true });
});

// সব পোস্ট পাওয়া
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// ✅ index.html রেন্ডার
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ blog.html রেন্ডার
app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

app.listen(3000, () => {
  console.log('✅ Server চলছে: http://localhost:3000');
});
