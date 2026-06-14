import { useMemo, useState } from "react";
import ParkCard from "../components/ParkCard";
import { parks } from "../data/parks";

function DigitalDetox() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [activity, setActivity] = useState("all");

  const regions = useMemo(() => {
    const unique = Array.from(new Set(parks.map((p) => p.region)));
    unique.sort((a, b) => a.localeCompare(b));
    return ["all", ...unique];
  }, []);

  const activities = useMemo(() => {
    const unique = Array.from(new Set(parks.flatMap((p) => p.activities)));
    unique.sort((a, b) => a.localeCompare(b));
    return ["all", ...unique];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return parks.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      const matchesRegion = region === "all" || p.region === region;
      const matchesActivity =
        activity === "all" || p.activities.includes(activity);

      return matchesQuery && matchesRegion && matchesActivity;
    });
  }, [query, region, activity]);

  return (
    <main className="page">
      <header className="page-header">
        <h1>Digital Detox</h1>
        <p>
          Explore parks, outdoor places, and activities that help you recharge,
          reconnect, and spend healthier time away from screens.
        </p>
      </header>

      <section className="parks-toolbar">
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search places or descriptions..."
          id="search-input"
        />

        <select className="safenet-select" value={region} onChange={(e) => setRegion(e.target.value)}>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r === "all" ? "All regions" : r}
            </option>
          ))}
        </select>

        <select className="safenet-select" value={activity} onChange={(e) => setActivity(e.target.value)}>
          {activities.map((a) => (
            <option key={a} value={a}>
              {a === "all" ? "All activities" : a}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="btn"
          onClick={() => {
            setQuery("");
            setRegion("all");
            setActivity("all");
          }}
        >
          Reset
        </button>
      </section>

      <p id="results-count" style={{ marginTop: "0.5rem" }}>
        Showing <strong>{filtered.length}</strong> of{" "}
        <strong>{parks.length}</strong>
      </p>

      {filtered.length === 0 ? (
        <section className="empty">
          <h2>No matches</h2>
          <p>Try changing your search or clearing filters.</p>
        </section>
      ) : (
        <section className="parks-grid">
          {filtered.map((park) => (
            <ParkCard key={park.id} park={park} />
          ))}
        </section>
      )}
    </main>
  );
}

export default DigitalDetox;