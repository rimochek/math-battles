import type { NextConfig } from "next"
import withNextIntl from "next-intl/plugin"

const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default withNextIntl()(nextConfig)
