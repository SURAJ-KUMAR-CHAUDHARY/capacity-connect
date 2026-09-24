const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function migrate() {
  // Connect to default 'postgres' database to create new one
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
    port: process.env.DB_PORT || 5432,
  });

  try {
    await client.connect();
    console.log('Connected to default postgres DB');
    
    // Check if database exists
    const dbRes = await client.query("SELECT 1 FROM pg_database WHERE datname = 'capacity_connect'");
    if (dbRes.rows.length === 0) {
      await client.query("CREATE DATABASE capacity_connect");
      console.log('Database capacity_connect created');
    } else {
      console.log('Database capacity_connect already exists');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }

  // Connect to the new database and run schema
  const dbClient = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'capacity_connect',
    port: process.env.DB_PORT || 5432,
  });

  try {
    await dbClient.connect();
    console.log('Connected to capacity_connect DB');
    
    const schemaPath = path.join(__dirname, 'src', 'db', 'migrations', '001_init_schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await dbClient.query(schema);
    console.log('Schema migration applied successfully');
  } catch (err) {
    console.error('Error applying schema:', err);
  } finally {
    await dbClient.end();
  }
}

migrate();
