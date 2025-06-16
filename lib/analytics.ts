import { supabase } from './supabase';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  lastUpdated: string;
}

interface AnalyticsRecord {
  visitor_id: string;
  timestamp: string;
  page: string;
}

let analyticsData: AnalyticsData = {
  pageViews: 0,
  uniqueVisitors: 0,
  lastUpdated: new Date().toISOString(),
};

export const trackPageView = async (page: string) => {
  try {
    const { error } = await supabase
      .from('analytics')
      .insert([
        {
          page,
          timestamp: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.warn('Error tracking page view:', error);
    }

    // Всегда обновляем локальные данные
    analyticsData.pageViews++;
    analyticsData.lastUpdated = new Date().toISOString();
  } catch (error) {
    console.warn('Error in trackPageView:', error);
    // В случае ошибки все равно обновляем локальные данные
    analyticsData.pageViews++;
    analyticsData.lastUpdated = new Date().toISOString();
  }
};

export const syncFromCloud = async () => {
  try {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) {
      console.warn('Error syncing analytics:', error);
      return analyticsData;
    }

    if (data && data.length > 0) {
      const records = data as AnalyticsRecord[];
      analyticsData = {
        pageViews: records.length,
        uniqueVisitors: new Set(records.map((item) => item.visitor_id)).size,
        lastUpdated: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.warn('Error in syncFromCloud:', error);
  }
  return analyticsData;
};

export const getAnalyticsData = () => analyticsData; 