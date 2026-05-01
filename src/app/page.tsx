import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getArticles } from "@/lib/articles";
import type { Article } from "@/types/article";
import LogoutButton from "@/app/components/LogoutButton";
import LoginButton from "@/app/components/LoginButton";

const articles = getArticles();

const CATEGORY_COLORS: Record<string, string> = {
  "அறிவியல் மற்றும் தொழில்நுட்பம்": "bg-blue-100 text-blue-800",
  பொருளாதாரம்: "bg-green-100 text-green-800",
  விளையாட்டு: "bg-purple-100 text-purple-800",
  "கலை மற்றும் பண்பாடு": "bg-pink-100 text-pink-800",
  விவசாயம்: "bg-lime-100 text-lime-800",
  சுகாதாரம்: "bg-red-100 text-red-800",
  சுற்றுச்சூழல்: "bg-teal-100 text-teal-800",
  கல்வி: "bg-indigo-100 text-indigo-800",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ta-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArticleCard({ article }: { article: Article }) {
  const categoryClass =
    CATEGORY_COLORS[article.category] ?? "bg-saffron-100 text-saffron-dark";

  return (
    <Link
      href={`/articles/${article.id}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-saffron-light transition-all duration-200"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryClass}`}
        >
          {article.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h2 className="text-gray-900 font-bold text-base leading-snug line-clamp-2 group-hover:text-saffron transition-colors duration-150">
          {article.title}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-gray-600">{article.author}</span>
            <span>·</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
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
            <span>{article.readCount.toLocaleString("ta-IN")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoggedIn = Boolean(user);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b-4 border-saffron sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-saffron flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              விஜய<span className="text-saffron">பாரதம்</span>
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-saffron transition-colors">
              முகப்பு
            </a>
            <a href="#" className="hover:text-saffron transition-colors">
              அரசியல்
            </a>
            <a href="#" className="hover:text-saffron transition-colors">
              விளையாட்டு
            </a>
            <a href="#" className="hover:text-saffron transition-colors">
              தொழில்நுட்பம்
            </a>
            {!isLoggedIn ? <LoginButton /> : <LogoutButton />}
          </nav>
          <div className="sm:hidden">
            {!isLoggedIn ? <LoginButton /> : <LogoutButton />}
          </div>
        </div>
      </header>

      <div className="bg-saffron text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">
            உங்களின் நம்பகமான செய்தி மையம்
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            இந்தியாவின் சமீபத்திய செய்திகள்
          </h1>
          <p className="mt-2 text-white/80 text-sm sm:text-base max-w-xl">
            அரசியல், பொருளாதாரம், விளையாட்டு, கலை, அறிவியல் உள்ளிட்ட பல
            துறைகளின் ஆழமான செய்திகளை தமிழில் அறியுங்கள்.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            முன்னணி செய்திகள்
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({articles.length} செய்திகள்)
            </span>
          </h2>
          <span className="text-xs text-gray-400">
            {new Date().toLocaleDateString("ta-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <svg
              className="w-12 h-12 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <p className="text-lg font-medium">தற்போது செய்திகள் இல்லை</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-saffron text-white mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
