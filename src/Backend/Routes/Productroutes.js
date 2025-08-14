import express from 'express';
import multer from 'multer';
import path from 'path';
import { Getproducts, Postproduct, Deleteproduct,updateproduct,lowStockItems,topproduct} from '../Controllers/Productcontroller.js';


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

// Routes
router.get('/', Getproducts);                                  
router.post('/post', upload.single('image'), Postproduct);
router.delete('/delete/:productId', Deleteproduct);     
router.put('/update/:id/:stock',updateproduct);
router.get('/lowstock', lowStockItems);
router.get('/topproduct',topproduct);

export default router;