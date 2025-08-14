import connectDB from '../Database/db.js';

export const getallcustomer = async(req,res)=>
{
    const query='Select * from customers';
    const db =connectDB();
    const [rows] = await db.execute(query);
    res.json(rows);
    
}

export const postcustomer = async(req,res)=>
{
    const content=req.body;
    const name=content.name;
    const email=content.email;
    const phone = content.phone;
    const address=content.address;

    const db= connectDB();

    try
    {
       await db.execute('insert into customers(name, email, phone, address) values (?,?,?,?)',[name,email,phone,address]);
        res.json({message:'uploaded sucessfully'});
        return;
    }catch(e)
    {
    console.error('Error inserting customer:', e);
    res.status(500).json({ error: 'Failed to add customer' });
    }
}
export const updatecustomer = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, address } = req.body;

  try {
    const db = connectDB();
    await db.execute(
      'UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [name, email, phone, address, id]
    );

    res.json({ message: 'Customer updated successfully' });
  } catch (e) {
    console.error('Error updating customer:', e);
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

export const selectid = async(req,res)=>
{
    const db=connectDB();
    const id=req.params.id;
    const [rows]=await db.execute('select* from customers where id = ?',[id]);
    res.json(rows[0]);
};
export const deletecustomer = async (req, res) => {
  try {
    const db = connectDB();
    const id = req.params.id;

    await db.query(
      `DELETE oi FROM orderitems oi 
       JOIN orders o ON oi.orderid = o.order_id 
       WHERE o.customer_id = ?`,
      [id]
    );

    await db.query(
      "DELETE FROM orders WHERE customer_id = ?",
      [id]
    );

    await db.query(
      "DELETE FROM customers WHERE id = ?",
      [id]
    );

    res.json({ message: 'Customer deleted successfully' });
  } 
  catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};
