"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState, useCallback } from "react";
import type { TravelHistory } from "@/types";
import HistoryList from "@/components/HistoryList";

function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function HistoryPage() {
  const [history, setHistory] = useState<TravelHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("travel_history")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Failed to fetch travel history:", fetchError);
      setError(fetchError.message);
    } else {
      setHistory((data as TravelHistory[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="container mx-auto max-w-4xl py-8">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            旅行历史记录
          </h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-black/60 border border-white/10 rounded-xl p-5 animate-pulse"
              >
                <div className="h-6 bg-white/10 rounded w-1/3 mb-3" />
                <div className="h-4 bg-white/10 rounded w-2/3 mb-2" />
                <div className="h-3 bg-white/10 rounded w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <div className="container mx-auto max-w-4xl py-8">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            旅行历史记录
          </h1>
          <div className="text-center py-16">
            <p className="text-white/60 text-lg mb-4">加载失败</p>
            <p className="text-white/40 mb-4">{error}</p>
            <button
              onClick={fetchHistory}
              className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white"
            >
              重试
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          旅行历史记录
        </h1>

        {history.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg mb-4">暂无旅行记录</p>
            <p className="text-white/40">开始规划你的第一次旅行吧！</p>
          </div>
        ) : (
          <HistoryList history={history} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
