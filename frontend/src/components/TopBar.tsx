export function TopBar(props: { onRefresh: () => void; onLogout: () => void }) {
  const { onRefresh, onLogout } = props;

  return (
    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-slate-900" />
          <div>
            <div className="text-sm font-semibold leading-5">
              Incident Tracker
            </div>
            <div className="text-xs text-slate-500">Tickets dashboard</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={onRefresh}
            type="button"
          >
            Refresh
          </button>
          <button
            className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            onClick={onLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
