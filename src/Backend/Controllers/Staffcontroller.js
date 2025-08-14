import connectDB from '../Database/db.js';

export const Getstaff = async (req, res) => {
  try {
    const db = connectDB();
    const query = 'SELECT * FROM staff';
    const [rows] = await db.execute(query);
    return res.json(rows);
  } catch (error) {
    console.error('Error fetching Staff', error);
    return res.status(500).json({ message: 'Error fetching Staff' });
  }
};
export const Poststaff = async (req, res) => {
  try {
    const { name, email, phone, address, role } = req.body;

    if (!name || !email || !phone || !address || !role) {
      return res.status(400).json({ message: 'All fields are required. Staff not added.' });
    }
    const db = connectDB();
    const query = 'INSERT INTO staff(name, email, phone, role, address) VALUES (?, ?, ?, ?, ?)';
    const [rows] = await db.execute(query, [name, email, phone, role, address]);

    return res.json({ message: 'Staff added successfully', data: rows });
  } catch (error) {
    console.error('Error inserting staff:', error);
    return res.status(500).json({ message: 'Error inserting staff' });
  }
};
export const Deletestaff = async (req, res) => {
  try {
    const db = connectDB();
    const id = req.params.id;

   await db.execute('DELETE FROM staff WHERE id = ?', [id]);
    res.json({ message: 'Staff deleted successfully' });
    
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting staff' });
  }
};
