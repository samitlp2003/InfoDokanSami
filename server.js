const express = require('express');
const path = require('path');
const app = express();

// JSON ডেটা পার্স করার জন্য
app.use(express.json());

// public ফোল্ডার থেকে স্ট্যাটিক ফাইল সার্ভ করবে
app.use(express.static(path.join(__dirname, 'public')));

// সাময়িক ব্লগ পোস্ট স্টোরেজ (রিস্টার্টে ডিলিট হবে)
let posts = [];

// ব্লগ পোস্ট API - নতুন পোস্ট যোগ করার জন্য
app.post('/api/posts', (req, res) => {
  const { title, content, date } = req.body;

  if (!title || !content) {
    return res.json({ success: false, message: "শিরোনাম ও বিষয়বস্তু প্রয়োজন" });
  }

  // যদি তারিখ না আসে, তাহলে আজকের তারিখ সেট করে দাও
  const postDate = date || new Date().toLocaleDateString();

  posts.push({ title, content, date: postDate });

  res.json({ success: true, message: "ব্লগ পোস্ট সফলভাবে যোগ হয়েছে!", posts });
});

// ব্লগ পোস্টগুলো দেখানোর জন্য API (ঐচ্ছিক)
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// '/' রুটে index.html পাঠাবে
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// অন্য কোনো রিকোয়েস্টে blog.html পাঠাতে চাইলে এটা যোগ করতে পারো (ঐচ্ছিক)
// app.get('/blog', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'blog.html'));
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server চলছে http://localhost:${PORT}`);
});
