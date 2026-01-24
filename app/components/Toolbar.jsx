export default function Toolbar({
  columns,
  setColumns,
  limit,
  setLimit,
  sort,
  setSort,
}) {
  return (
    <div className="flex justify-between items-center mb-6 text-sm">
      {/* VIEW */}
      <div className="flex items-center gap-2">
        <span>VIEW AS</span>
        {[2, 3, 4].map((c) => (
          <button
            key={c}
            onClick={() => setColumns(c)}
            className={`border px-2 ${
              columns === c ? "bg-black text-white" : ""
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* SORT + LIMIT */}
      <div className="flex gap-4">
        <select
          value={limit}
          onChange={(e) => setLimit(+e.target.value)}
          className="border px-2"
        >
          {[10, 15, 20, 30, 50].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-2"
        >
          <option value="best">Best selling</option>
          <option value="price-asc">Price, low to high</option>
          <option value="price-desc">Price, high to low</option>
          <option value="az">Alphabetically, A-Z</option>
          <option value="za">Alphabetically, Z-A</option>
          <option value="new">Date, new to old</option>
        </select>
      </div>
    </div>
  );
}
