import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      // Ecwid product images CDN
      {
        protocol: 'https',
        hostname: 'd2j6dbq0eux0bg.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '*.ecwid.com',
      },
      {
        protocol: 'https',
        hostname: 'ecwid.com',
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
