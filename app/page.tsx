"use client";

import { useState } from "react";
import SearchForm from "../components/SearchForm";
import Itinerary from "../components/Itinerary";

export default function HomePage() {
  const [itineraryData, setItineraryData] = useState<ItineraryData | null>(null);

  return (
    <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center shadow-xl ring-1 ring-white/6">
        <h1 className="text-3xl font-semibold mb-6 text-white">AI旅行助手</h1>
        <SearchForm setItineraryData={setItineraryData} />
        {itineraryData && <Itinerary data={itineraryData} />}
      </div>
    </div>
  );
}

// TypeScript 类型定义
export interface Activity {
  name: string;
  description: string;
  image?: string;
}

export interface DayItinerary {
  day: number;
  activities: Activity[];
}

export interface ItineraryData {
  destination: string;
  itinerary: DayItinerary[];
}