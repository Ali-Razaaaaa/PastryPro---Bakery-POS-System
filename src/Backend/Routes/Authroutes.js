import express from 'express';
import Userverify from '../Controllers/Authcontroller.js';
const router=express.Router();


router.post('/verify',Userverify);


export default router;