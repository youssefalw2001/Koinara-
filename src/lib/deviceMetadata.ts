export type DeviceMetadata = {
  userAgent: string;
  platform: string;
  brands: Array<{ brand: string; version: string }>;
  language: string;
  languages: string[];
  timezone: string;
  timezoneOffset: number;
  screen: {
    width: number;
    height: number;
    pixelRatio: number;
  };
  viewport: {
    width: number;
    height: number;
  };
  touchEnabled: boolean;
  colorScheme: 'dark' | 'light';
  doNotTrack: string | null;
  localHour: number;
  capturedAt: string;
};

export function getDeviceMetadata(): DeviceMetadata {
  const nav = navigator as Navigator & {
    userAgentData?: {
      platform?: string;
      brands?: Array<{ brand: string; version: string }>;
    };
  };

  return {
    userAgent: navigator.userAgent,
    platform: nav.userAgentData?.platform || navigator.platform || 'unknown',
    brands: nav.userAgentData?.brands || [],
    language: navigator.language,
    languages: Array.from(navigator.languages || []),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio || 1,
    },
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    touchEnabled: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    doNotTrack: navigator.doNotTrack,
    localHour: new Date().getHours(),
    capturedAt: new Date().toISOString(),
  };
}

export function summarizeDevice(metadata: DeviceMetadata | Record<string, unknown>) {
  const userAgent = String(metadata.userAgent || '');
  const isIphone = /iphone/i.test(userAgent);
  const isAndroid = /android/i.test(userAgent);
  const isSafari = /safari/i.test(userAgent) && !/chrome|crios/i.test(userAgent);
  const isChrome = /chrome|crios/i.test(userAgent);

  const device = isIphone ? 'iPhone' : isAndroid ? 'Android' : 'Mobile/Desktop';
  const browser = isSafari ? 'Safari' : isChrome ? 'Chrome' : 'Browser';

  return `${device} / ${browser}`;
}
