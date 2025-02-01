import { NextRequest, NextResponse } from 'next/server';
import { getCustomDomainConfigs } from './lib/statsig-helper';

function authenticate(req: NextRequest) {
  const env = process.env.NEXT_PUBLIC_ENV || 'development';
  const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || 'flipteam';
  const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS || 'flipteam123';
  const authHeader = req.headers.get('authorization');

  const isEnvRequireAuth = env !== 'production' && env !== 'development';

  if (!isEnvRequireAuth) {
    return true;
  }

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false;
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
  const [username, password] = credentials.split(':');

  return username === BASIC_AUTH_USER && password === BASIC_AUTH_PASS;
}

export async function middleware(req: NextRequest) {
  if (!authenticate(req)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Staging Environment"',
      },
    });
  }

  const customDomainConfigs = await getCustomDomainConfigs();

  const domain = req.nextUrl.hostname;
  const path = req.nextUrl.pathname;

  const customDomainConfig = customDomainConfigs.get<Record<string, string> | null>(domain, null);

  if (!customDomainConfig) {
    return NextResponse.next();
  }

  const customPath = customDomainConfig[path];
  if (!customPath) {
    return NextResponse.next();
  }

  const clonedUrl = req.nextUrl.clone();

  clonedUrl.pathname = customPath;

  return NextResponse.rewrite(clonedUrl);
}
