"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { getArticles } from "@/lib/articles";
import type { Comment } from "@/types/article";

const articles = getArticles();

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ta-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Icons ────────────────────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="w-5 h-5"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

// ── Not Found ────────────────────────────────────────────────────────────────

function NotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-saffron-100 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-saffron"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        செய்தி கிடைக்கவில்லை
      </h1>
      <p className="text-gray-500 mb-6">
        நீங்கள் தேடிய செய்தி இல்லை அல்லது நீக்கப்பட்டுள்ளது.
      </p>
      <button
        onClick={onBack}
        className="bg-saffron hover:bg-saffron-dark text-white font-semibold px-6 py-2.5 rounded-full transition-colors"
      >
        முகப்பிற்கு திரும்பு
      </button>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id;
  const id = typeof rawId === "string" ? rawId : null;

  const article = id ? (articles.find((a) => a.id === id) ?? null) : null;

  const [likeCount, setLikeCount] = useState(article?.likeCount ?? 0);
  const [liked, setLiked] = useState(false);
  const [shareCount, setShareCount] = useState(article?.shareCount ?? 0);
  const [shareMsg, setShareMsg] = useState("");
  // Initialise read count at +1 to record this page view immediately
  const [readCount] = useState((article?.readCount ?? 0) + 1);
  const [comments, setComments] = useState<Comment[]>(article?.comments ?? []);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentText, setCommentText] = useState("");
  const commentsRef = useRef<HTMLDivElement>(null);

  if (!article) {
    return <NotFound onBack={() => router.push("/")} />;
  }

  const paragraphs = article.content.split("\n\n");

  function handleLike() {
    if (liked) {
      setLikeCount((c) => c - 1);
      setLiked(false);
    } else {
      setLikeCount((c) => c + 1);
      setLiked(true);
    }
  }

  async function handleShare() {
    setShareCount((c) => c + 1);
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: article?.title ?? "", url });
      } catch {
        // user cancelled — still count the intent
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShareMsg("இணைப்பு நகலெடுக்கப்பட்டது");
      setTimeout(() => setShareMsg(""), 2500);
    }
  }

  function scrollToComments() {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: commentAuthor.trim() || "அடையாளம் வெளியிடாதவர்",
      text: commentText.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentAuthor("");
    setCommentText("");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b-4 border-saffron sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-saffron transition-colors text-sm font-medium"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            முகப்பிற்கு திரும்பு
          </button>

          <span className="text-lg font-extrabold tracking-tight text-gray-900">
            விஜய<span className="text-saffron">பாரதம்</span>
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="bg-saffron text-white text-xs font-semibold px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-gray-400 text-xs">·</span>
          <span className="text-gray-500 text-xs">
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          {article.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
          <div className="w-9 h-9 rounded-full bg-saffron flex items-center justify-center text-white font-bold text-sm">
            {article.author[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {article.author}
            </p>
            <p className="text-xs text-gray-400">செய்தியாளர்</p>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>

        <article className="prose prose-gray max-w-none space-y-5 text-gray-700 leading-relaxed text-base sm:text-lg">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <div className="mt-10 mb-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-150 ${
              liked
                ? "bg-red-50 border-red-300 text-red-600"
                : "bg-white border-gray-200 text-gray-600 hover:border-saffron hover:text-saffron"
            }`}
          >
            <HeartIcon filled={liked} />
            <span>{likeCount.toLocaleString("ta-IN")}</span>
            <span className="hidden sm:inline">
              {liked ? "விருப்பப்பட்டது" : "விருப்பு"}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-saffron hover:text-saffron text-sm font-medium transition-all duration-150"
          >
            <ShareIcon />
            <span>{shareCount.toLocaleString("ta-IN")}</span>
            <span className="hidden sm:inline">பகிர்</span>
            {shareMsg && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2.5 py-1 rounded whitespace-nowrap">
                {shareMsg}
              </span>
            )}
          </button>

          <button
            onClick={scrollToComments}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-saffron hover:text-saffron text-sm font-medium transition-all duration-150"
          >
            <ChatIcon />
            <span>{comments.length.toLocaleString("ta-IN")}</span>
            <span className="hidden sm:inline">கருத்துகள்</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white text-gray-500 text-sm ml-auto">
            <EyeIcon />
            <span>{readCount.toLocaleString("ta-IN")}</span>
            <span className="hidden sm:inline">வாசிப்புகள்</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-saffron-100 my-8" />

        <section ref={commentsRef}>
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            கருத்துகள்
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({comments.length})
            </span>
          </h2>

          <form
            onSubmit={handleAddComment}
            className="bg-white border border-gray-200 rounded-2xl p-5 mb-8 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              உங்கள் கருத்தை பதிவு செய்யுங்கள்
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <label htmlFor="comment-author" className="sr-only">
                உங்கள் பெயர்
              </label>
              <input
                id="comment-author"
                type="text"
                placeholder="உங்கள் பெயர் (விருப்பம்)"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent"
              />
            </div>
            <label htmlFor="comment-text" className="sr-only">
              உங்கள் கருத்து
            </label>
            <textarea
              id="comment-text"
              placeholder="உங்கள் கருத்தை எழுதுங்கள்..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={3}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent resize-none mb-3"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-saffron hover:bg-saffron-dark text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors disabled:opacity-50"
                disabled={!commentText.trim()}
              >
                கருத்தை பதிவு செய்
              </button>
            </div>
          </form>

          {comments.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              <ChatIcon />
              <p className="mt-2 text-sm">
                இன்னும் கருத்துகள் இல்லை. முதலில் நீங்கள் பதிவிடுங்கள்!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-saffron-100 flex items-center justify-center text-saffron font-bold text-xs">
                      {c.author[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {c.author}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {formatDate(c.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-saffron text-white mt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-lg font-extrabold tracking-tight">
                விஜயபாரதம்
              </span>
              <p className="text-white/70 text-xs mt-0.5">
                உண்மையைச் சொல்வோம். இந்தியாவை கொண்டாடுவோம்.
              </p>
            </div>
            <p className="text-white/60 text-xs">
              © {new Date().getFullYear()} விஜயபாரதம் செய்திகள். அனைத்து
              உரிமைகளும் பாதுகாக்கப்பட்டவை.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
