"use client";

import { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

// Wishlist actions
const WISHLIST_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  TOGGLE_ITEM: 'TOGGLE_ITEM',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST',
  LOAD_WISHLIST: 'LOAD_WISHLIST',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
};

// Wishlist reducer
function wishlistReducer(state, action) {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return state; // Item already exists, don't add again
      }
      
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    
    case WISHLIST_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case WISHLIST_ACTIONS.TOGGLE_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id)
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }
    }
    
    case WISHLIST_ACTIONS.CLEAR_WISHLIST:
      return {
        ...state,
        items: []
      };
    
    case WISHLIST_ACTIONS.LOAD_WISHLIST:
      return {
        ...state,
        items: action.payload
      };
    
    case WISHLIST_ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    isOpen: false
  });

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('jagjitkaur-wishlist');
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist);
        dispatch({ type: WISHLIST_ACTIONS.LOAD_WISHLIST, payload: wishlistItems });
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jagjitkaur-wishlist', JSON.stringify(state.items));
  }, [state.items]);

  const addToWishlist = (product) => {
    const wishlistItem = {
      id: product.firestoreId || product.id,
      name: product.name,
      price: product.price,
      image: product.images?.find(img => img.isMain)?.url || product.images?.[0]?.url || product.image,
      fabric: product.fabric,
      work: product.work,
      origin: product.origin,
      occasion: product.occasion,
      category: product.category,
      description: product.description
    };
    
    dispatch({ type: WISHLIST_ACTIONS.ADD_ITEM, payload: wishlistItem });
  };

  const removeFromWishlist = (productId) => {
    dispatch({ type: WISHLIST_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  const toggleWishlistItem = (product) => {
    const wishlistItem = {
      id: product.firestoreId || product.id,
      name: product.name,
      price: product.price,
      image: product.images?.find(img => img.isMain)?.url || product.images?.[0]?.url || product.image,
      fabric: product.fabric,
      work: product.work,
      origin: product.origin,
      occasion: product.occasion,
      category: product.category,
      description: product.description
    };
    
    dispatch({ type: WISHLIST_ACTIONS.TOGGLE_ITEM, payload: wishlistItem });
  };

  const clearWishlist = () => {
    dispatch({ type: WISHLIST_ACTIONS.CLEAR_WISHLIST });
  };

  const toggleWishlist = () => {
    dispatch({ type: WISHLIST_ACTIONS.TOGGLE_SIDEBAR });
  };

  const isInWishlist = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const itemCount = state.items.length;

  return (
    <WishlistContext.Provider 
      value={{
        ...state,
        addToWishlist,
        removeFromWishlist,
        toggleWishlistItem,
        clearWishlist,
        toggleWishlist,
        isInWishlist,
        itemCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}