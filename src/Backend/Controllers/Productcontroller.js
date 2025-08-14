import connectDB from '../Database/db.js';

export const Getproducts = async (req, res) => {
  try {
    const db = connectDB();
    const query = 'SELECT * FROM products';
    const [rows] = await db.execute(query);
    return res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Error fetching products' });
  }
};

export const Getproduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const db = connectDB();
    const query = 'SELECT * FROM products WHERE id = ?';
    const [rows] = await db.execute(query, [productId]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    return res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Error fetching product' });
  }
};

export const Postproduct = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;
    
    if (!name || !category || !price || !stock) {
      return res.status(400).json({ 
        message: 'All fields are required: name, category, price, stock' 
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Product image is required' });
    }

    const image_url = `/uploads/${req.file.filename}`;
    const db =connectDB();

    const insertQuery = `
      INSERT INTO products (name, category, price, stock, image_url)
      VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(insertQuery, [name, category, price, stock, image_url]);

    res.status(201).json({
      message: 'Product added successfully',
      product: { name, category, price, stock, image_url },
    });
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ 
      message: 'Error while inserting product. Make sure all fields are filled correctly.' 
    });
  }
};
export const Deleteproduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const db =connectDB();

    console.log("Deleting child rows for product:", productId);

    const [childDelete] = await db.query(
      "DELETE FROM orderitems WHERE productid = ?",
      [productId]
    );
    console.log("Deleted child rows:", childDelete.affectedRows);

    const [result] = await db.query(
      "DELETE FROM products WHERE id = ?",
      [productId]
    );

    if (result.affectedRows === 0)
    {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete Product Error:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export const updateproduct = async (req, res) =>
{
  const id=req.params.id;
  const stock=req.params.stock;
  const db=connectDB();
  try
  {
    const query='update products set stock=? where id=?';
    await db.execute(query,[stock,id]);
    res.json({success:true})
  }catch(e)
  {
    res.json({message:'Error'});
  }
}

export const lowStockItems = async (req, res) => {
  try {
    const db = connectDB();

    const query = 'SELECT COUNT(*) as lowStockCount FROM products WHERE stock < 10';
    const [rows] = await db.query(query);
    res.json(rows[0]);
    
  } catch (e) {
    console.log('Error fetching low stock items:', e);
    res.status(500).json({ error: 'Server error' });
  }
}

export const topproduct = async (req, res) =>
{
  try
  {
    const db=connectDB();
    const [result]=await db.query(`SELECT 
    p.id,
    p.name,
    SUM(oi.quantity) AS total_sold
    FROM orderitems oi
    JOIN products p ON p.id = oi.productId
    GROUP BY p.id, p.name
    ORDER BY total_sold DESC
    LIMIT 1;`);
    res.json(result[0].name);

  }catch(e)
  {
   res.status(500).json({message:'Error'});
  }
}