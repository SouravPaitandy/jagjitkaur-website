import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const getAnalyticsData = async () => {
  try {
    // Initialize Google Analytics Data API (GA4)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    const analyticsData = google.analyticsdata('v1beta');
    const authClient = await auth.getClient();

    // Current date and 30 days ago
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

    // Get basic metrics
    const response = await analyticsData.properties.runReport({
      auth: authClient,
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
        ],
        dimensions: [
          { name: 'date' }
        ],
      },
    });

    // Get page views by page
    const pageResponse = await analyticsData.properties.runReport({
      auth: authClient,
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: 'screenPageViews' }],
        dimensions: [{ name: 'pagePath' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      },
    });

    // Get device categories
    const deviceResponse = await analyticsData.properties.runReport({
      auth: authClient,
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: 'sessions' }],
        dimensions: [{ name: 'deviceCategory' }],
      },
    });

    // Get traffic sources
    const sourceResponse = await analyticsData.properties.runReport({
      auth: authClient,
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: 'sessions' }],
        dimensions: [{ name: 'source' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 5,
      },
    });

    // Process the data
    const metrics = response.data.rows?.[0]?.metricValues || [];
    const totalUsers = metrics[0]?.value || '0';
    const totalSessions = metrics[1]?.value || '0';
    const totalPageViews = metrics[2]?.value || '0';
    const bounceRate = Math.round(parseFloat(metrics[3]?.value || '0') * 100);

    // Process daily data
    const dailyStats = response.data.rows?.map(row => ({
      date: row.dimensionValues[0].value,
      users: parseInt(row.metricValues[0].value),
      sessions: parseInt(row.metricValues[1].value),
    })) || [];

    // Process top pages
    const topPages = pageResponse.data.rows?.map(row => [
      row.dimensionValues[0].value,
      row.metricValues[0].value
    ]) || [];

    // Process device stats
    const deviceStats = deviceResponse.data.rows?.map(row => [
      row.dimensionValues[0].value,
      row.metricValues[0].value
    ]) || [];

    // Process traffic sources
    const trafficSources = sourceResponse.data.rows?.map(row => [
      row.dimensionValues[0].value,
      row.metricValues[0].value
    ]) || [];

    return {
      users: totalUsers,
      sessions: totalSessions,
      pageviews: totalPageViews,
      bounceRate,
      dailyStats,
      topPages,
      deviceStats,
      trafficSources,
      recentEvents: [
        { type: 'add_to_cart', product: 'Product interaction tracked', time: 'Real-time' },
        { type: 'page_view', product: 'Page views tracked', time: 'Real-time' },
      ],
    };

  } catch (error) {
    console.error('Analytics API Error:', error);
    return {
      users: '0',
      sessions: '0',
      pageviews: '0',
      bounceRate: 0,
      dailyStats: [],
      topPages: [],
      deviceStats: [],
      trafficSources: [],
      recentEvents: [],
      error: error.message
    };
  }
};

export async function GET() {
  try {
    const data = await getAnalyticsData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}