import { getStatsigValues } from '@/lib/statsig-helper';
import { StatsigUser } from 'statsig-node';

export async function POST(request: Request): Promise<Response> {
  const json = await request.json();

  if (!json || typeof json !== 'object') {
    return new Response(null, { status: 400 });
  }

  const body = json as { user: StatsigUser };
  const { data } = await getStatsigValues(body.user);
  return new Response(data);
}
