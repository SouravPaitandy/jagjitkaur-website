// filepath: c:\Users\soura\OneDrive\Desktop\Fasion Website For Client\jagjitkaur-site\lib\analytics.js
// Google Analytics 4 Event Tracking
export const trackEvent = (action, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label,
      value: parameters.value,
      ...parameters,
    });
  }
};

// Enhanced E-commerce tracking
export const trackPurchase = (transactionId, items, value, currency = 'INR') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  }
};

export const trackAddToCart = (item) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'INR',
      value: parseFloat(item.price.toString().replace(/[^\d]/g, '')),
      items: [{
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: 1,
        price: parseFloat(item.price.toString().replace(/[^\d]/g, '')),
      }],
    });
  }
};

export const trackAddToWishlist = (item) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_wishlist', {
      currency: 'INR',
      value: parseFloat(item.price.toString().replace(/[^\d]/g, '')),
      items: [{
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: 1,
        price: parseFloat(item.price.toString().replace(/[^\d]/g, '')),
      }],
    });
  }
};

export const trackViewItem = (item) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'INR',
      value: parseFloat(item.price.toString().replace(/[^\d]/g, '')),
      items: [{
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: 1,
        price: parseFloat(item.price.toString().replace(/[^\d]/g, '')),
      }],
    });
  }
};

export const trackSearch = (searchTerm, category = null) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      category: category,
    });
  }
};

export const trackWhatsAppClick = (source = 'unknown') => {
  trackEvent('whatsapp_click', {
    category: 'engagement',
    label: source,
  });
};

export const trackCategoryView = (category) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item_list', {
      item_list_id: category,
      item_list_name: category,
    });
  }
};

export const trackPageView = (url, title) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }
};