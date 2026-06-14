import type { Park } from "../types/park";
import { useAppStore } from "../state/appStore";

type ParkCardProps = {
  park: Park;
};

function ParkCard({ park }: ParkCardProps) {
  const { addPlace, removePlace, isSaved } = useAppStore();

  const isPlaceSaved = isSaved(park.id);

  return (
    <article className="park-card">
      <header className="park-card-header">
        <h2 className="park-card-title">{park.name}</h2>
        <p className="park-card-country">
          {park.country} · {park.region}
        </p>
      </header>

      <p className="park-card-description">{park.description}</p>

      <div className="park-card-meta">
        <span className="park-badge">
          Best season: <strong>{park.bestSeason}</strong>
        </span>

        <div className="park-activities">
          {park.activities.map((activity) => (
            <span key={activity} className="activity-chip">
              {activity}
            </span>
          ))}
        </div>
      </div>

      <button id="save-place-button"
        type="button"
        className="park-trip-button"
        onClick={() =>
          isPlaceSaved ? removePlace(park.id) : addPlace(park)
        }
      >
        {isPlaceSaved ? "Saved ✓ (Remove)" : "Save place"}
      </button>
    </article>
  );
}

export default ParkCard;