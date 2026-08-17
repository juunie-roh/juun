import type { MetadataRoute } from "next";

import { BASE_URL } from "@/utils/server/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1. 일반 유저 및 메이저 AI (기존 규칙 적용)
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/test/", "/api/"],
      },
      // 2. 메이저 AI를 제외한 기타 AI / 스크래핑 봇 차단
      {
        userAgent: [
          "Bytespider", // 바이트댄스 (틱톡) AI 봇
          "Amazonbot", // 아마존 크롤러
          "Claude-Web", // Anthropic 하위 일반 크롤러
          "cohere-ai", // 코히어 AI
          "OMgili", // AI 데이터 수집 플랫폼 (대표적 무단 수집기)
          "Omgilibot",
          "Diffbot", // AI 데이터 추출 봇
          "ImagesiftBot", // AI 학습용 이미지 수집 봇
          "PerplexityBot", // Perplexity (메이저 외 하위 봇 제어용)
          "YouBot", // You.com AI 검색
          "Search1Viser", // 일반 스크래핑 봇
          "WebReaper",
          "CCBot", // Common Crawl (수많은 AI가 학습용으로 쓰는 오픈 데이터셋)
        ],
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
