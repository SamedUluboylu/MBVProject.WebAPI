import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistItem {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (item: WishlistItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const isInWishlist = (productId: string) => {
    return items.some((i) => i.productId === productId);
  };

  const totalItems = items.length;

  const value: WishlistContextType = {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    totalItems,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
