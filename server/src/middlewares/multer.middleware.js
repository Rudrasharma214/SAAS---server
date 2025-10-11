import multer from 'multer';

// Optimized multer configuration for faster uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit for faster uploads
    files: 1 // Only allow 1 file
  },
  fileFilter: (req, file, cb) => {
    // Fast file type validation
    if (file.mimetype.startsWith('image/')) {
      // Prioritize common web formats for faster processing
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Only JPG, PNG, and WebP images are allowed'), false);
      }
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

export default upload;
