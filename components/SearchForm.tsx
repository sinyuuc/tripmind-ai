"use client";

import { useState, FormEvent } from "react";
import { ItineraryData } from "../app/page";

interface SearchFormProps {
  setItineraryData: (data: ItineraryData) => void;
}

export default function SearchForm({ setItineraryData }: SearchFormProps) {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState<number>(3);
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, days, budget }),
      });
      const data = await response.json();
      if (!response.ok || data.error) {
        console.error("API调用失败:", data.error || response.statusText);
        return;
      }
      setItineraryData(data);
    } catch (error) {
      console.error("API调用失败:", error);
    }
  };

  return (
    <form
      className="max-w-md mx-auto bg-black/30 backdrop-blur-sm border border-white/6 p-6 rounded-2xl shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-white/90">目的地</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full bg-white/3 text-white placeholder-gray-400 border border-white/6 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/10 transition"
          placeholder="例如 Paris"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-white/90">天数</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="w-full bg-white/3 text-white placeholder-gray-400 border border-white/6 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/10 transition"
          min={1}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-white/90">预算（可选）</label>
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full bg-white/3 text-white placeholder-gray-400 border border-white/6 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/10 transition"
          placeholder="例如 1000 USD"
        />
      </div>
      <button className="w-full bg-gradient-to-r from-blue-500/90 to-indigo-500/90 hover:from-blue-400 hover:to-indigo-400 text-white py-2 rounded-full font-semibold shadow-sm transition">
        生成行程
      </button>
    </form>
  );
}