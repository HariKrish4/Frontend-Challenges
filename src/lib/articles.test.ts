import { getArticles, parseArticles } from "./articles";

describe("parseArticles", () => {
  it("keeps only records that match the article shape", () => {
    const parsedArticles = parseArticles([
      {
        id: "1",
        title: "Title",
        category: "Category",
        excerpt: "Excerpt",
        content: "Content",
        author: "Author",
        publishedAt: "2026-04-28",
        imageUrl: "https://example.com/image.jpg",
        readCount: 1,
        likeCount: 2,
        shareCount: 3,
        commentCount: 1,
        comments: [
          {
            id: "c1",
            author: "Reader",
            text: "Comment",
            createdAt: "2026-04-28",
          },
        ],
      },
      {
        id: 2,
      },
    ]);

    expect(parsedArticles).toHaveLength(1);
    expect(parsedArticles[0]?.id).toBe("1");
  });

  it("returns an empty list for non-array input", () => {
    expect(parseArticles(null)).toEqual([]);
  });
});

describe("getArticles", () => {
  it("returns the validated article dataset", () => {
    expect(getArticles().length).toBeGreaterThan(0);
  });
});
