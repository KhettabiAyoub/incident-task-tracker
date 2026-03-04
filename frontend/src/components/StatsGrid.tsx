export function StatsGrid(props: {
  stats: { total: number; todo: number; doing: number; done: number };
}) {
  const { stats } = props;

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="text-xs text-slate-500">Visible</div>
        <div className="mt-1 text-2xl font-semibold">{stats.total}</div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="text-xs text-slate-500">TODO</div>
        <div className="mt-1 text-2xl font-semibold">{stats.todo}</div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="text-xs text-slate-500">DOING</div>
        <div className="mt-1 text-2xl font-semibold">{stats.doing}</div>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="text-xs text-slate-500">DONE</div>
        <div className="mt-1 text-2xl font-semibold">{stats.done}</div>
      </div>
    </div>
  );
}
