import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [], // Temporarily removed rehype-pretty-code
  },
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withNextIntl(withMDX(nextConfig));