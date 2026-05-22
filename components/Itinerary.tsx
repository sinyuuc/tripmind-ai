import type { ItineraryData } from "@/types";

interface ItineraryProps {
  data: ItineraryData;
}

export default function Itinerary({ data }: ItineraryProps) {
  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4 text-left">
      <h2 className="text-2xl font-semibold mb-2 text-white/90">{data.destination} 的推荐行程</h2>
      {data.itinerary?.map((dayItem) => (
        <div
          key={dayItem.day}
          className="mb-4 p-4 bg-black/30 border border-white/6 rounded-xl backdrop-blur-sm"
        >
          <h3 className="text-lg font-medium mb-3 text-white">第 {dayItem.day} 天</h3>
          <ul className="space-y-3">
            {dayItem.activities.map((act, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                {act.image && (
                  <img
                    src={act.image}
                    alt={act.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}
                <div>
                  <p className="font-semibold text-white">{act.name}</p>
                  <p className="text-white/70">{act.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}