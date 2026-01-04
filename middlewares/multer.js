import multer from 'multer';

// Configure memory storage
const storage = multer.memoryStorage();

// File filter function to allow only images
const fileFilter = (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
        // Allow image files
        cb(null, true);
    } else {
        // Reject non-image files
        cb(new Error('Only image files are allowed (png, jpg, jpeg, gif, webp, etc.)'), false);
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

export default upload;

