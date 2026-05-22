export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-center space-y-4 p-8">
        <h1 className="text-2xl font-bold text-white">Authentication Error</h1>
        <p className="text-white/60 max-w-md">
          Unable to complete sign in. Please try again or contact support if the
          problem persists.
        </p>
        <a
          href="/"
          className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-2 text-sm font-semibold text-white"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
