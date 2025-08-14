import express from 'express';
import { Getstaff,Poststaff,Deletestaff} from '../Controllers/Staffcontroller.js';

const router = express.Router();

//Routes
router.get('/', Getstaff); 
router.post('/post',Poststaff);
router.delete('/delete/:id',Deletestaff);

export default router;