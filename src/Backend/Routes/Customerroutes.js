import express from 'express';
import { getallcustomer,postcustomer,selectid,updatecustomer,deletecustomer} from '../Controllers/Customercontroller.js';

const router=express.Router();

router.get('/',getallcustomer);
router.post('/post',postcustomer);
router.put('/edit/:id',updatecustomer);
router.get('/edit/:id',selectid);
router.delete('/delete/:id',deletecustomer);

export default router;