import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Welcome to swagger-no-5</h1>
      <div className="flex gap-4">
        <Link
          href="/sign-in"
          className="px-4 py-2 bg-purple-700 text-white rounded-xl hover:bg-purple-900 transition"
        >
          log in
        </Link>
        <Link
          href="/sign-up"
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
        >
          Registration
        </Link>
      </div>
      <div className="flex justify-center mt-5">
        <Link
          className="py-4 px-7 border rounded-xl border-gray-300 cursor-pointer"
          href="/swagger"
        >
          Try Swagger
        </Link>
      </div>
    </div>
  );
}
