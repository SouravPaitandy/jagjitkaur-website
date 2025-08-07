import { NextResponse } from 'next/server';

// Enhanced mock data with more realistic analytics
export async function GET() {
  try {
    const mockData = {
      users: '2,847',
      sessions: '3,692',
      pageviews: '8,456',
      bounceRate: 38,
      avgSessionDuration: '3:24',
      conversionRate: 4.7,
      growthRate: 24,
      activeUsers: 87,
      topPages: [
        ['/products', '1,592'],
        ['/', '1,267'],
        ['/products/saree-collection', '834'],
        ['/products/kurti-sets', '567'],
        ['/about', '389'],
        ['/contact', '234'],
        ['/products/lehenga-collection', '198'],
        ['/blog', '156'],
      ],
      deviceStats: [
        ['mobile', '1,856'],
        ['desktop', '1,523'],
        ['tablet', '313'],
      ],
      trafficSources: [
        ['google', '1,245'],
        ['direct', '892'],
        ['instagram', '567'],
        ['facebook', '234'],
        ['whatsapp', '189'],
        ['youtube', '98'],
      ],
      recentEvents: [
        { type: 'add_to_cart', product: 'Elegant Banarasi Saree', time: '2 minutes ago' },
        { type: 'add_to_wishlist', product: 'Silk Kurti Set', time: '3 minutes ago' },
        { type: 'whatsapp_click', source: 'product_page', time: '5 minutes ago' },
        { type: 'search', query: 'wedding saree', time: '7 minutes ago' },
        { type: 'add_to_cart', product: 'Designer Lehenga', time: '9 minutes ago' },
        { type: 'add_to_wishlist', product: 'Cotton Kurti', time: '12 minutes ago' },
      ],
      dailyStats: [
        { date: '2024-01-01', sessions: 145, users: 123 },
        { date: '2024-01-02', sessions: 189, users: 156 },
        { date: '2024-01-03', sessions: 167, users: 134 },
        { date: '2024-01-04', sessions: 234, users: 198 },
        { date: '2024-01-05', sessions: 267, users: 223 },
        { date: '2024-01-06', sessions: 298, users: 245 },
        { date: '2024-01-07', sessions: 321, users: 267 },
        { date: '2024-01-08', sessions: 289, users: 234 },
        { date: '2024-01-09', sessions: 345, users: 289 },
        { date: '2024-01-10', sessions: 367, users: 312 },
      ],
      hourlyStats: [
        { hour: '00:00', users: 12 },
        { hour: '02:00', users: 8 },
        { hour: '04:00', users: 5 },
        { hour: '06:00', users: 15 },
        { hour: '08:00', users: 45 },
        { hour: '10:00', users: 78 },
        { hour: '12:00', users: 92 },
        { hour: '14:00', users: 87 },
        { hour: '16:00', users: 76 },
        { hour: '18:00', users: 89 },
        { hour: '20:00', users: 95 },
        { hour: '22:00', users: 67 },
      ],
      geographicData: [
        { country: 'India', sessions: 2847, users: 2234 },
        { country: 'USA', sessions: 456, users: 389 },
        { country: 'UK', sessions: 234, users: 198 },
        { country: 'Canada', sessions: 89, users: 76 },
        { country: 'Australia', sessions: 66, users: 54 },
      ],
      conversionFunnel: [
        { step: 'Page Views', value: 8456 },
        { step: 'Product Views', value: 3234 },
        { step: 'Add to Cart', value: 567 },
        { step: 'Checkout Started', value: 234 },
        { step: 'Purchase Completed', value: 89 },
      ]
    };

    // Add realistic delay
    await new Promise(resolve => setTimeout(resolve, 200));

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Mock API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate mock data' },
      { status: 500 }
    );
  }
}