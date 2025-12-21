import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // experimental: {
  //   serverActions: {
  //     bodySizeLimit: '10mb', // Adjust based on your expected PDF sizes
  //   },
  // },
  serverExternalPackages : ["pdf-parse"]
};

export default nextConfig;
