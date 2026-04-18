/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  // Bundle the SQLite file for serverless (db created during `pnpm build`).
  outputFileTracingIncludes: {
    '/**': ['./db/**/*'],
  },
}

export default nextConfig
