import articlesData from "@/data/articles.json";
import type { Article, Comment } from "@/types/article";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isComment(value: unknown): value is Comment {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.author === "string" &&
    typeof value.text === "string" &&
    typeof value.createdAt === "string"
  );
}

function isArticle(value: unknown): value is Article {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.category === "string" &&
    typeof value.excerpt === "string" &&
    typeof value.content === "string" &&
    typeof value.author === "string" &&
    typeof value.publishedAt === "string" &&
    typeof value.imageUrl === "string" &&
    typeof value.readCount === "number" &&
    Number.isFinite(value.readCount) &&
    typeof value.likeCount === "number" &&
    Number.isFinite(value.likeCount) &&
    typeof value.shareCount === "number" &&
    Number.isFinite(value.shareCount) &&
    typeof value.commentCount === "number" &&
    Number.isFinite(value.commentCount) &&
    Array.isArray(value.comments) &&
    value.comments.every(isComment)
  );
}

export function parseArticles(input: unknown): Article[] {
  if (!Array.isArray(input)) {
    return [];
  }

  return input.filter(isArticle);
}

export function getArticles(): Article[] {
  return parseArticles(articlesData);
}
