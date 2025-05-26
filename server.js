const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to get posts
app.get('/api/posts', (req, res) => {
  const postsFile = path.join(__dirname, 'data', 'posts.json');
  if (fs.existsSync(postsFile)) {
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
    res.json(posts);
  } else {
    res.json([]);
  }
});

// API route to post new blog
app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  const postsFile = path.join(__dirname, 'data', 'posts.json');

  let posts = [];
  if (fs.existsSync(postsFile)) {
    posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
  }

  const newPost = {
    title,
    content,
    date: new Date().toLocaleDateString('bn-BD'),
  };

  posts.push(newPost);
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
  res.status(201).json(newPost);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
