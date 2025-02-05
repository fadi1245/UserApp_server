const pool = require('./dbconnection'); 

async function testDatabase() {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    console.log('Database connection successful', rows);
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    process.exit();
  }
}

testDatabase();
