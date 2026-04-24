import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 엄격한 모드 활성화 (개발 중 잠재적 문제 감지)
  reactStrictMode: true,

  // 이미지 최적화 설정
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 성능 최적화
  swcMinify: true,
  compress: true,

  // 헤더 설정 (캐싱 등)
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // 리다이렉트 설정 (필요시)
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
