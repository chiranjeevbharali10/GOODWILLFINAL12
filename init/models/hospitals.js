import { ObjectId } from 'mongodb';

export class Hospital {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.bloodUnits = {
      'A+': 0,
      'A-': 0,
      'B+': 0,
      'B-': 0,
      'AB+': 0,
      'AB-': 0,
      'O+': 0,
      'O-': 0
    };
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static fromDB(data) {
    const hospital = new Hospital(data.name, data.email, data.password);
    hospital._id = data._id;
    hospital.bloodUnits = data.bloodUnits || hospital.bloodUnits;
    hospital.createdAt = data.createdAt;
    hospital.updatedAt = data.updatedAt;
    return hospital;
  }

  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      bloodUnits: this.bloodUnits,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export const createHospital = async (db, hospitalData) => {
  const hospital = new Hospital(
    hospitalData.name,
    hospitalData.email,
    hospitalData.password
  );
  
  const result = await db.collection('hospitals').insertOne(hospital);
  hospital._id = result.insertedId;
  return hospital;
};

export const getHospitals = async (db, filter = {}) => {
  const hospitals = await db.collection('hospitals').find(filter).toArray();
  return hospitals.map(hospital => Hospital.fromDB(hospital));
};

export const getHospitalById = async (db, id) => {
  const hospital = await db.collection('hospitals').findOne({ _id: new ObjectId(id) });
  return hospital ? Hospital.fromDB(hospital) : null;
};

export const updateHospital = async (db, id, updateData) => {
  const result = await db.collection('hospitals').updateOne(
    { _id: new ObjectId(id) },
    { 
      $set: { 
        ...updateData,
        updatedAt: new Date()
      }
    }
  );
  return result.modifiedCount > 0;
};

export const deleteHospital = async (db, id) => {
  const result = await db.collection('hospitals').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

// New methods for blood donation and receiving
export const donateBlood = async (db, hospitalId, units) => {
  const result = await db.collection('hospitals').updateOne(
    { _id: new ObjectId(hospitalId) },
    { 
      $inc: { units: units },
      $set: { updatedAt: new Date() }
    }
  );
  return result.modifiedCount > 0;
};

export const receiveBlood = async (db, hospitalId, units) => {
  // First check if hospital has enough units
  const hospital = await getHospitalById(db, hospitalId);
  if (!hospital || hospital.units < units) {
    throw new Error('Not enough blood units available');
  }

  const result = await db.collection('hospitals').updateOne(
    { _id: new ObjectId(hospitalId) },
    { 
      $inc: { units: -units },
      $set: { updatedAt: new Date() }
    }
  );
  return result.modifiedCount > 0;
}; 