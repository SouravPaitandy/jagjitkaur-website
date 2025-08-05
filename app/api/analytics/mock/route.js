import { NextResponse } from 'next/server';

// Mock data for testing when real analytics fails
export async function GET() {
  try {
    const mockData = {
      users: '1,247',
      sessions: '1,892',
      pageviews: '3,456',
      bounceRate: 42,
      avgSessionDuration: '2:34',
      conversionRate: 3.2,
      topPages: [
        ['/products', '892'],
        ['/', '567'],
        ['/products/saree-collection', '234'],
        ['/about', '189'],
        ['/contact', '123'],
      ],
      deviceStats: [
        ['mobile', '756'],
        ['desktop', '423'],
        ['tablet', '68'],
      ],
      trafficSources: [
        ['google', '645'],
        ['direct', '312'],
        ['instagram', '189'],
        ['facebook', '67'],
        ['whatsapp', '34'],
      ],
      recentEvents: [
        { type: 'add_to_cart', product: 'Elegant Banarasi Saree', time: '2 minutes ago' },
        { type: 'add_to_wishlist', product: 'Silk Kurti Set', time: '5 minutes ago' },
        { type: 'whatsapp_click', source: 'product_page', time: '8 minutes ago' },
        { type: 'search', query: 'wedding saree', time: '12 minutes ago' },
      ],
      dailyStats: [
        { date: '2024-01-01', sessions: 45, users: 38 },
        { date: '2024-01-02', sessions: 52, users: 44 },
        { date: '2024-01-03', sessions: 38, users: 32 },
        { date: '2024-01-04', sessions: 67, users: 56 },
        { date: '2024-01-05', sessions: 73, users: 61 },
        { date: '2024-01-06', sessions: 89, users: 74 },
        { date: '2024-01-07', sessions: 95, users: 82 },
      ],
    };

    // Add a small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Mock API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate mock data' },
      { status: 500 }
    );
  }
}