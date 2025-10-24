import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com", // S3 이미지 허용
    ],
  },
};

export default nextConfig;