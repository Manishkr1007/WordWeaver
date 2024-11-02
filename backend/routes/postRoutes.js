// routes/postRoutes.js
import express from 'express';
import Post from '../models/postModel.js';
const router = express.Router();
import multer from 'multer';
import path from 'path';
// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Ensure you have an 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
  });
  
  // Create the upload instance
  const upload = multer({ storage: storage });
  
  // Route to create a new post with image upload
  router.post('/', upload.single('image'), async (req, res) => {
    const { title, slug, content, status,userId } = req.body;
    const imageUrl = req.file ? req.file.path : ''; // Get the image path
  
    const newPost = new Post({
      title,
      slug,
      content,
      status,
      featuredImage: imageUrl, // Save the image URL/path to MongoDB,
        userId
    });
  
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost); // Respond with the saved post
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  


// Update an existing post
router.put('/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true, runValidators: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(400).json({ message: 'Error updating post', error: error.message });
    }
});

// Optionally, add a route to get all posts or a single post
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'name email'); // Populate user data if needed
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(400).json({ message: 'Error fetching posts', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('userId', 'name email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(400).json({ message: 'Error fetching post', error: error.message });
    }
});

/// Route to fetch posts by userId
router.get("/user-posts/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const posts = await Post.find({ userId }); // Fetch posts by userId
      
      // Create a full URL for the featuredImage
      const postsWithFullImageUrl = posts.map(post => ({
        ...post.toObject(),
        featuredImage: `${req.protocol}://${req.get('host')}/${post.featuredImage}`, // Build the full URL
      }));
      
      res.json(postsWithFullImageUrl);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error });
    }
});

export default router;
