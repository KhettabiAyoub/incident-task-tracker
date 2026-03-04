export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
      {message}
    </div>
  );
}
