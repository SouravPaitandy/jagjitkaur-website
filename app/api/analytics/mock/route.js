import { NextResponse } from 'next/server';

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
        ['google', '1245'],
        ['direct', '892'],
        ['instagram', '567'],
        ['facebook', '234'],
        ['whatsapp', '189'],
        ['youtube', '98'],
      ],
      recentEvents: [
        { type: 'add_to_cart', product: 'Elegant Banarasi Saree', time: '2 minutes ago' },
        { type: 'add_to_wishlist', product: 'Silk Kurti Set', time: '3 minutes ago' },
        { type: 'whatsapp_click', product: 'Product Page', time: '5 minutes ago' },
        { type: 'search', product: 'Wedding Saree', time: '7 minutes ago' },
        { type: 'add_to_cart', product: 'Designer Lehenga', time: '9 minutes ago' },
      ],
      dailyStats: [
        { date: '2024-01-01', sessions: 145, users: 123 },
        { date: '2024-01-02', sessions: 189, users: 156 },
        { date: '2024-01-03', sessions: 167, users: 134 },
        { date: '2024-01-04', sessions: 234, users: 198 },
        { date: '2024-01-05', sessions: 267, users: 223 },
        { date: '2024-01-06', sessions: 298, users: 245 },
        { date: '2024-01-07', sessions: 321, users: 267 },
      ],
      isLive: false,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(mockData);
  } catch (error) {
    console.error('Mock API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate mock data',
        users: '0',
        sessions: '0',
        pageviews: '0',
        bounceRate: 0,
        topPages: [],
        deviceStats: [],
        trafficSources: [],
        recentEvents: [],
        dailyStats: [],
        isLive: false,
      },
      { status: 500 }
    );
  }
}