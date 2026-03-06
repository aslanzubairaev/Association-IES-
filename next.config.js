/**
 * Настройки сборки Next.js.
 * Этот файл описывает параметры поведения проекта (сборка, оптимизации и т.д.).
 * Обычно человек здесь ничего не кликает — это технические настройки для разработчиков.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

module.exports = nextConfig;





