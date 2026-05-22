import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Next.js 14 Starter
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          App Router · TypeScript · Tailwind · Auth.js · Prisma · Docker
        </p>

        {session ? (
          <div className="space-y-4">
            <p className="text-green-600 font-medium">
              Welcome back, {session.user?.name ?? session.user?.email}!
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard" className="btn-primary">Dashboard →</Link>
              <Link href="/api/auth/signout" className="btn-secondary">Sign Out</Link>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <Link href="/login" className="btn-primary">Sign In</Link>
            <Link href="/register" className="btn-secondary">Create Account</Link>
          </div>
        )}

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
          {features.map((f) => (
            <div key={f.title} className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-sm">{f.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const features = [
  { icon: "⚡", title: "App Router", desc: "Next.js 14 with Server Components and streaming" },
  { icon: "🔐", title: "Auth.js v5", desc: "Google, GitHub, email/password authentication" },
  { icon: "🗄️", title: "Prisma ORM", desc: "Type-safe database access with migrations" },
  { icon: "🎨", title: "Tailwind CSS", desc: "Utility-first styling with dark mode" },
  { icon: "🐳", title: "Docker", desc: "Multi-stage Dockerfile + Compose for dev/prod" },
  { icon: "✅", title: "TypeScript", desc: "Full type safety end-to-end" },
];
