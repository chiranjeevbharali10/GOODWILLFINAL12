
import React from 'react';
import { Header } from '../components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePoints } from '@/contexts/PointsContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

const History = () => {
  const isMobile = useIsMobile();
  const { points } = usePoints();
  
  // Sample history data - in a real app, this would come from an API or context
  const historyItems = [
    { id: 1, date: '2025-05-15', action: 'Donation', points: 100, details: 'Blood Donation at City Hospital' },
    { id: 2, date: '2025-05-10', action: 'Purchase', points: -50, details: 'Pharmacy purchase - Pain Relief Medication' },
    { id: 3, date: '2025-05-05', action: 'Donation', points: 150, details: 'Blood Donation at Medical Center' },
    { id: 4, date: '2025-04-20', action: 'Redemption', points: -200, details: 'Gift Card Redemption' },
    { id: 5, date: '2025-04-15', action: 'Donation', points: 100, details: 'Blood Donation at Community Clinic' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-white to-blood/5">
      <Header />
      
      <main className="flex-grow flex flex-col items-center p-6 mt-12">
        <div className="max-w-3xl w-full text-center mb-8 animate-slide-down">
          <div className="inline-block mb-2 px-3 py-1 bg-blood/10 text-blood rounded-full text-sm font-medium">
            Activity Log
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Your Activity History
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Track your donations, redemptions, and point transactions over time.
          </p>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm text-center mb-6">
            <p className="text-muted-foreground">Current Balance</p>
            <p className="text-4xl font-bold text-blood">{points} Points</p>
          </div>
        </div>
        
        <div className="w-full max-w-3xl">
          <h2 className="text-xl font-semibold mb-4 text-left">Recent Activity</h2>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {historyItems.map((item) => (
                <Card key={item.id} className="p-4 hover:shadow-md transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                    <div className={`font-bold ${item.points > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {item.points > 0 ? `+${item.points}` : item.points}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>
      
      <footer className={`py-6 text-center text-sm text-muted-foreground ${isMobile ? 'mb-16' : ''}`}>
        <p>© 2025 GoodWill. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default History;
