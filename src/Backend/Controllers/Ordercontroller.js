import connectDB from '../Database/db.js';
export const getorder = async (req, res) => {
  try {
    const db = connectDB();

    const [orders] = await db.query("SELECT * FROM orders");

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
export const postorder = async (req, res) => {
  const { customerId, customerName, items } = req.body;
 
  try {
    console.log("Request body:", req.body); // Debug line
    console.log("Items array:", items); // Debug line
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Items array is required" });
    }

    const db =  connectDB();
    const createdBy = 1;

    const [orderResult] = await db.query(
      "INSERT INTO orders (customer_id, total_amount, status, created_by, customer_name) VALUES (?, 0, 'pending', ?, ?)",
      [customerId, createdBy, customerName]
    );
    
    const orderId = orderResult.insertId;
    console.log("Order created with ID:", orderId); // Debug line
    let totalAmount = 0;

    for (const item of items) {
      console.log("Processing item:", item); // Debug line
      
      const [productData] = await db.query(
        "SELECT price, stock FROM products WHERE id = ?",
        [item.productId]
      );

      const product = productData[0];
      console.log("Product found:", product); 

      if (!product || product.stock < item.quantity) {
        throw new Error("Insufficient stock for product ID " + item.productId);
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      const [orderItemResult] = await db.query(
        "INSERT INTO orderitems (orderid, productid, quantity) VALUES (?, ?, ?)",
        [orderId, item.productId, item.quantity]
      );
      await db.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.productId]
      );
    }

    await db.query(
      "UPDATE orders SET total_amount = ? WHERE order_id = ?",
      [totalAmount, orderId]
    );

    console.log("Order completed successfully"); // Debug line
    res.json({ success: true, orderId, totalAmount, status: "pending" });
    
  } catch (err) {
    console.error("Error in postorder:", err);
    res.status(500).json({ error: err.message });
  }
};
export const orderitems = async (req, res) => {
  try {
    const { orderId } = req.body;
 
    
    const db = connectDB();
    
    const query = `
      SELECT 
        o.order_id,
        p.name AS product_name,
        oi.quantity,
        p.price
      FROM orders o
      JOIN orderitems oi ON o.order_id = oi.orderid
      JOIN products p ON oi.productid = p.id
      WHERE o.order_id = ?
    `;

    const [rows] = await db.query(query, [orderId]);
    
    res.json(rows);
    
  } catch (error) {
    console.error("Error in orderitems:", error);
    res.status(500).json({ error: error.message });
  }
};

export const totalorders = async (req, res) => {
   try {
    const db = connectDB();
    const query='select count(*) as total from orders';
    const [rows]=await db.query(query);
    
    res.json(rows[0]);
  }catch(e)
  {
    console.log('Error');
  }
}
//returning sales total orderitems
export const totalorderitems= async (req, res) => {
   try {
    const db = connectDB();
    const query='select count(*) as totalitems from orderitems';
    const [rows]=await db.query(query);
    
    res.json(rows[0]);
  }catch(e)
  {
    console.log('Error');
  }
};

export const salesdata = async (req, res) => {
  try {
    const db = connectDB();
    
    const query = `
      SELECT 
          DATE_FORMAT(order_date, '%l %p') AS time, 
          SUM(total_amount) AS sales
      FROM orders
      WHERE DATE(order_date) = CURDATE()
      GROUP BY HOUR(order_date), DATE_FORMAT(order_date, '%l %p')
      ORDER BY HOUR(order_date);
    `;
    const [results] = await db.query(query);
    
    res.json(results || []);
  } catch (err) {
    console.error("Error in salesdata:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

