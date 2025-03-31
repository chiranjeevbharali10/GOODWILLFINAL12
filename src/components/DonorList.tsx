
import React, { useState, useEffect } from 'react';
import { User, MapPin, Phone } from 'lucide-react';
import { HospitalList } from './HospitalList';

interface DonorListProps {
  bloodGroup: string;
}

interface Donor {
  donorName: string;
  bloodGroup: string;
  age: string;
  phone: string;
  address: string;
  availability: string;
  gender: string;
}

export const DonorList: React.FC<DonorListProps> = ({ bloodGroup }) => {
  const [showHospitals, setShowHospitals] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  
  useEffect(() => {
    // Load donors from localStorage
    const savedDonors = JSON.parse(localStorage.getItem('blood-donors') || '[]') as Donor[];
    // Filter donors by blood group
    const matchingDonors = savedDonors.filter(donor => donor.bloodGroup === bloodGroup);
    
    if (matchingDonors.length > 0) {
      setDonors(matchingDonors);
    } else {
      // Fallback to mock data if no matching donors are found
      setDonors([
        { donorName: 'John Smith', bloodGroup, age: '32', phone: '555-0123', address: '123 Main St', availability: 'Weekdays', gender: 'male' },
        { donorName: 'Sarah Johnson', bloodGroup, age: '28', phone: '555-0124', address: '456 Oak Ave', availability: 'Weekends', gender: 'female' },
        { donorName: 'Michael Brown', bloodGroup, age: '45', phone: '555-0125', address: '789 Pine Rd', availability: 'Evenings', gender: 'male' },
      ]);
    }
  }, [bloodGroup]);

  if (showHospitals) {
    return <HospitalList onBack={() => setShowHospitals(false)} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-block mb-2 px-3 py-1 bg-blood/10 text-blood rounded-full text-sm font-medium">
          {bloodGroup} Donors
        </div>
        <h2 className="text-2xl font-bold mb-2">Available Donors</h2>
        <p className="text-muted-foreground">
          We found {donors.length} potential donors matching {bloodGroup} blood group
        </p>
      </div>
      
      <div className="space-y-4 mb-8">
        {donors.map((donor, index) => (
          <div 
            key={index}
            className="flex items-center p-4 bg-white rounded-xl border border-blood/20 shadow-sm hover:shadow-md transition-all"
          >
            <div className="h-12 w-12 rounded-full bg-blood/10 flex items-center justify-center mr-4">
              <User className="h-6 w-6 text-blood" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium">{donor.donorName}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-xs px-2 py-1 bg-blood/10 text-blood rounded-full">
                  {donor.bloodGroup}
                </span>
                <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                  Age: {donor.age}
                </span>
                <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                  Available: {donor.availability}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" /> {donor.address}
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" /> {donor.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mb-4">
        <h3 className="font-medium mb-4">Available Hospitals for Blood Collection</h3>
        <button 
          onClick={() => setShowHospitals(true)}
          className="inline-flex items-center px-4 py-2 bg-blood/10 text-blood rounded-lg hover:bg-blood/20 transition-colors button-effect"
        >
          <MapPin className="h-5 w-5 mr-2" />
          View Hospitals
        </button>
      </div>
    </div>
  );
};
