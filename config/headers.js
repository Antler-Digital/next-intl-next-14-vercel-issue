let URL = '';

// NODE_ENV === 'production' on live AND preview
if (process.env.NODE_ENV === 'production') {
  if (process.env.VERCEL_ENV === 'preview') {
    URL = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  if (process.env.VERCEL_ENV === 'production') {
    URL = 'https://risk.wiserfunding.com';
  }
} else if (
  process.env.NODE_ENV === 'test' &&
  process.env.VERCEL_ENV === 'preview'
) {
  URL = `${process.env.VERCEL_URL}`;
} else if (process.env.CI && process.env.TEST_METHOD === 'playwright') {
  URL = `${process.env.VERCEL_URL}`;
} else {
  URL = 'http://localhost:3000';
}
const wiserfundingApiUrls =
  'api.wiserfunding.com api.senza-traffi.co.uk api.saggio-credito.co.uk';

/**
 *
 * Hubspot POST req:
 * at some point during load, a POST request is made to "js.hs-banner.com/cookie-banner-public" with the following payload:
 * {
 *   "bannerGeoLocation": "",
 *   "bannerPolicyId": 123456,
 *   "bannerType": "OPT_IN",
 *   "contentId": "",
 *   "portalId": 123456,
 *   "domainName": "alpha.wiserfunding.com" // assume the same request will be made on localhost when enabled
 * }
 *
 * "https://track.hubspot.com" & "https://forms.hubspot.com" are also blocked
 */

const SENTRY_ENV =
  process.env.NEXT_PUBLIC_GIT_BRANCH === 'main'
    ? 'production'
    : process.env.NEXT_PUBLIC_GIT_BRANCH === 'prerelease'
    ? 'staging'
    : process.env.NEXT_PUBLIC_GIT_BRANCH === 'development'
    ? 'development'
    : 'local';

const hubspotCookieBannerUrls =
  'js.hs-banner.com track.hubspot.com forms.hubspot.com';

const hubspotURLS = `js.hs-analytics.net/analytics/1670848200000/4623266.js js.hs-analytics.net js.hs-scripts.com js.hsleadflows.net/leadflows.js js.usemessages.com/conversations-embed.js js.hsadspixel.net/fb.js api.hubapi.com/hs-script-loader-public/v1/config/pixel/json api.hubspot.com ${hubspotCookieBannerUrls}`;

const ContentSecurityPolicy = `
  default-src 'self' vitals.vercel-insights.com o617053.ingest.sentry.io data: api.hubspot.com ${wiserfundingApiUrls} ${hubspotURLS};
  script-src 'self' re.fullstory.com edge.fullstory.com platform.twitter.com www.googletagmanager.com googleads.g.doubleclick.net ${hubspotURLS}; 
  style-src 'self' 'unsafe-inline';
  font-src 'self' fonts.googleapis.com;
  img-src 'self' ${wiserfundingApiUrls} data: syndication.twitter.com track.hubspot.com https://www.google.com/pagead/1p-user-list/866427713;
  child-src twitter.com embed.twitter.com www.google.com platform.twitter.com syndication.twitter.com ${wiserfundingApiUrls} knowledge.wiserfunding.com app.hubspot.com ${hubspotURLS};
  report-uri https://o617053.ingest.sentry.io/api/5750639/security/?sentry_key=a3e2fcdb07ad4a29b3ebd2ca38cac12d?sentry_environment=${SENTRY_ENV}
`;

const headers = {
  xdnsPrefetch: {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // Strict-Transport-Security
  strictTransportSecurity: {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  xssProtection: {
    key: 'X-XSS-Protection',
    // Enables XSS filtering. Rather than sanitizing the page, the browser will prevent rendering of the page if an attack is detected.
    value: '1; mode=block'
  },

  // access control headers
  // only allow domains deployed on
  accessControlAllowOrigin: {
    key: 'Access-Control-Allow-Origin',
    value: URL
  },
  // For optimum security the Cache-Control header should prevent
  // caching by downstream devices and the client itself, this
  // can be achieved by configuring the following HTTP header

  cacheControlHeader: {
    key: 'Cache-Control',
    value: 'no-cache, no-store'
  },
  // X-Frame-Options
  xFrameOption: {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  // Permissions-Policy
  // This specification defines a mechanism that allows developers to selectively enable and disable use of various browser features and APIs.
  permissionsPolicy: {
    key: 'Permissions-Policy',
    // empty () disables that feature
    value: 'camera=(), microphone=()'
  },
  // X-Content-Type-Options
  xContentTypeOptions: {
    key: 'X-Content-Type-Options',
    // The only valid value for this header is "X-Content-Type-Options: nosniff"
    value: 'nosniff'
  },
  // Referrer-Policy
  referrerPolicy: {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  // Content-Security-Policy
  contentSecurityPolicy: {
    key: 'Content-Security-Policy-Report-Only',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
};

const defaultHeaders = [
  headers.strictTransportSecurity,
  // don't load in development as its breaks the styling
  process.env.NODE_ENV === 'development' ? null : headers.contentSecurityPolicy,
  headers.permissionsPolicy,
  headers.xContentTypeOptions,
  headers.referrerPolicy,
  headers.xFrameOption,
  headers.xssProtection,
  headers.cacheControlHeader,
  headers.accessControlAllowOrigin
].filter(x => x);

const headersObject = defaultHeaders.reduce((_headers, { key, value }) => {
  return {
    ..._headers,
    [key]: value
  };
}, {});

module.exports = { defaultHeaders, headersObject };
