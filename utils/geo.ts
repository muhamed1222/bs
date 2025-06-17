import { createClient } from '@maxmind/geoip2-node';

const client = createClient({
  accountId: process.env.MAXMIND_ACCOUNT_ID!,
  licenseKey: process.env.MAXMIND_LICENSE_KEY!,
});

export async function getCountry(ip: string): Promise<string | null> {
  try {
    if (ip === 'unknown' || ip === '127.0.0.1') {
      return null;
    }

    const response = await client.country(ip);
    return response.country.names.ru || response.country.names.en || null;
  } catch (error) {
    console.error('Error getting country:', error);
    return null;
  }
}

export async function getCity(ip: string): Promise<string | null> {
  try {
    if (ip === 'unknown' || ip === '127.0.0.1') {
      return null;
    }

    const response = await client.city(ip);
    return response.city.names.ru || response.city.names.en || null;
  } catch (error) {
    console.error('Error getting city:', error);
    return null;
  }
} 