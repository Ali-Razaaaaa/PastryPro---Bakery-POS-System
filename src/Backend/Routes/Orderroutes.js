import express from 'express';
import {postorder,getorder,orderitems,totalorders, totalorderitems, salesdata} from '../Controllers/Ordercontroller.js';

const router=express.Router();

router.get('/',getorder);
router.post('/post',postorder);
router.post('/orderitems',orderitems);
router.get('/totalorders/count',totalorders);
router.get('/totalorders/items',totalorderitems);
router.get('/salessummary',salesdata);


export default router;