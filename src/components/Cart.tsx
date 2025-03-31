
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePoints } from '../contexts/PointsContext';
import { useToast } from '@/hooks/use-toast';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, totalPoints, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { addPoints } = usePoints();
  const { toast } = useToast();
  
  const handleCompletePurchase = () => {
    // In a real app, this would process the payment
    addPoints(totalPoints);
    clearCart();
    setIsCheckoutOpen(false);
    
    toast({
      title: "Payment Successful!",
      description: `You've earned ${totalPoints} points for your purchase!`,
    });
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 text-blood">
          <ShoppingCart className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-blood text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="px-6 py-4 border-b">
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 p-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : isCheckoutOpen ? (
            <div className="flex flex-col h-full">
              <ScrollArea className="flex-1">
                <div className="py-6 px-6">
                  <h3 className="text-xl font-bold mb-4">Payment Details</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2">Order Summary</h4>
                      <div className="flex justify-between mb-1">
                        <span>Subtotal ({totalItems} items)</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                        <span>Total</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        You will earn {totalPoints} points with this purchase
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-4">Payment Method</h4>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 border rounded-md bg-gray-50">
                          <input type="radio" id="card" name="payment" className="mr-2" defaultChecked />
                          <label htmlFor="card" className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            <span>Credit/Debit Card</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="px-6 py-4 border-t mt-auto">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsCheckoutOpen(false)}
                  >
                    Back to Cart
                  </Button>
                  <Button 
                    className="flex-1 bg-blood hover:bg-blood/90"
                    onClick={handleCompletePurchase}
                  >
                    Complete Purchase
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <ScrollArea className="flex-1">
                <div className="py-6 px-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex gap-4 mt-1">
                          <span className="text-sm text-muted-foreground">₹{item.price}</span>
                          <span className="text-sm text-muted-foreground">{item.points} points</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="px-6 py-4 border-t mt-auto">
                <div className="p-4 border rounded-md mb-4">
                  <div className="flex justify-between mb-1">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Points to earn</span>
                    <span>{totalPoints} points</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-blood hover:bg-blood/90"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
