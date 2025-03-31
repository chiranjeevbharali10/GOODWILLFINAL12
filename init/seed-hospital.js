import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'bloodbank';

async function seedHospital() {
  try {
    const client = await MongoClient.connect(mongoUrl);
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    
    // Hash the password
    const hashedPassword = bcrypt.hashSync('123', 10);
    
    // Create test hospital data
    const hospital = {
      name: 'HOSPITAL HERO',
      email: 'hero@hospital.com',
      password: hashedPassword,
      bloodUnits: {
        'A+': 5,
        'A-': 3,
        'B+': 4,
        'B-': 2,
        'AB+': 1,
        'AB-': 1,
        'O+': 6,
        'O-': 3
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Clear any existing hospital with the same email
    await db.collection('hospitals').deleteOne({ email: hospital.email });
    
    // Insert the test hospital
    await db.collection('hospitals').insertOne(hospital);
    console.log('Test hospital created successfully');
    console.log('Email: hero@hospital.com');
    console.log('Password: 123');
    
    await client.close();
  } catch (error) {
    console.error('Error seeding hospital:', error);
  }
}

seedHospital(); 