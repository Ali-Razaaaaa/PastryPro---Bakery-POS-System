import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import Customerroutes from '../Routes/Customerroutes.js';
import Productroutes from '../Routes/Productroutes.js';
import Staffroutes from '../Routes/Staffroutes.js';
import Orderroutes from '../Routes/Orderroutes.js';
import Authroutes from '../Routes/Authroutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use('/customers', Customerroutes);
app.use('/products', Productroutes);
app.use('/staff',Staffroutes);
app.use('/orders',Orderroutes);
app.use('/login',Authroutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server running on port', port);
});
