const path = require('path');

/* eslint-disable require-await */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // See: https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
  output: 'standalone',
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    scrollRestoration: true,
    // this includes files from the monorepo base one directory up
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noai, noimageai',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // We want to rewrite the sandbox route in production
      // to point at the public directory that our playroom assets are built to
      // We leverage a rewrite here instead of a redirect in order to preserve
      // a "pretty" url for the main playroom editor.
      ...(process.env.NODE_ENV !== 'production'
        ? [
            {
              source: '/playroom/:path*',
              destination: 'http://localhost:9000/:path*',
            },
          ]
        : []),
    ];
  },

  async redirects() {
    return [
      // We run a redirect to port 9000 for non prod environments
      // as playroom files aren't built to the public directory in dev mode.
      // We redirect to /preview/index.html here because Playroom's webpack is configured
      // to generate an html file for the preview page that reaches for assets in the root directory via a relative path.
      // In this case we don't care about a pretty url, and want to make absolutely certain that the browser is pointing to preview/index.html
      // such that it resolves the relative asset requests correctly.
      {
        source: '/playroom',
        destination: '/playroom/index.html',
        permanent: true,
      },
      {
        source: '/playroom/preview',
        destination: '/playroom/preview/index.html',
        permanent: true,
      },
      {
        source: '/components/get-started',
        destination: '/components',
        permanent: true,
      },
      {
        source: '/foundations/foundations/:slug',
        destination: '/foundations/:slug',
        permanent: true,
      },
      {
        source: '/foundations/content/:slug',
        destination: '/content/:slug',
        permanent: true,
      },
      {
        source: '/design/space',
        destination: '/design/layout',
        permanent: true,
      },
      {
        source: '/foundations/design/:slug',
        destination: '/design/:slug',
        permanent: true,
      },
      {
        source: '/foundations/patterns/:slug',
        destination: '/patterns/:slug',
        permanent: true,
      },
      {
        source: '/foundations/patterns/layout',
        destination: '/foundations/patterns/page-layouts',
        permanent: true,
      },
      {
        source: '/foundations/foundations/designing-apps',
        destination: 'https://shopify.dev/apps/design-guidelines',
        permanent: true,
      },
      {
        source: '/foundations/content/app-release-notes',
        destination: 'https://shopify.dev/apps/design-guidelines',
        permanent: true,
      },
      {
        source: '/tokens/all-tokens',
        destination: '/tokens/color',
        permanent: true,
      },
      {
        source: '/tokens',
        destination: '/tokens/color',
        permanent: true,
      },
      {
        source: '/legal/license',
        destination: 'https://github.com/Shopify/polaris/blob/main/LICENSE.md',
        permanent: true,
      },
      {
        source: '/patterns/error-messages',
        destination: '/content/error-messages',
        permanent: true,
      },
      {
        source: '/patterns/help-content',
        destination: '/content/help-content',
        permanent: true,
      },
      {
        source: '/patterns/loading',
        destination: '/patterns-legacy/loading',
        permanent: true,
      },
      {
        source: '/patterns/new-badge',
        destination: '/patterns-legacy/new-badge',
        permanent: true,
      },
      {
        source: '/patterns/pickers',
        destination: '/patterns-legacy/pickers',
        permanent: true,
      },
      {
        source: '/patterns/text-fields',
        destination: '/patterns-legacy/text-fields',
        permanent: true,
      },
      {
        source: '/patterns-legacy',
        destination: '/patterns#legacy',
        permanent: true,
      },
      {
        source: '/coming-soon',
        destination: '/coming-soon/view-transitions',
        permanent: false,
      },
      {
        source: '/content/product-content',
        destination: '/content/fundamentals',
        permanent: true,
      },
      {
        source: '/content/actionable-language',
        destination: '/content/fundamentals',
        permanent: true,
      },
      {
        source: '/content/help-content',
        destination: '/content/fundamentals',
        permanent: true,
      },
      {
        source: '/content/help-documentation',
        destination: '/content/fundamentals',
        permanent: true,
      },
      {
        source: '/content/voice-and-tone',
        destination: '/content/fundamentals',
        permanent: true,
      },
      {
        source: '/content/merchant-to-customer',
        destination: '/content/fundamentals',
        permanent: true,
      },
      ...whatsNew,
      ...actions,
      ...deprecated,
      ...feedbackIndicators,
      ...imagesAndIcons,
      ...layoutAndStructure,
      ...lists,
      ...navigation,
      ...overlays,
      ...selectionAndInput,
      ...stylelintPolaris,
      ...tables,
      ...tokens,
      ...typography,
      ...utilities,
    ];
  },
};

module.exports = nextConfig;
