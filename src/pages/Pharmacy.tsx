
import React from 'react';
import { Header } from '../components/Header';
import { PharmacyProducts } from '../components/PharmacyProducts';
import { useIsMobile } from '@/hooks/use-mobile';

const Pharmacy = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-white to-blood/5">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-6 mt-12">
        <div className="max-w-3xl w-full text-center mb-8 animate-slide-down">
          <div className="inline-block mb-2 px-3 py-1 bg-blood/10 text-blood rounded-full text-sm font-medium">
            Health Essentials
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Pharmacy Essentials
          </h1>
          <p className="text-lg text-muted-foreground">
            Access essential medications and medical supplies to keep you and your loved ones healthy.
          </p>
        </div>
        
        <PharmacyProducts />
      </main>
      
      <footer className={`py-6 text-center text-sm text-muted-foreground ${isMobile ? 'mb-16' : ''}`}>
        <p>© 2025 GoodWill. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Pharmacy;
