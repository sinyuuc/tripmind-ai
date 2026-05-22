"use client";

import { useState } from "react";
import type { TravelHistory } from "@/types";

interface HistoryListProps {
  history: TravelHistory[];
  onDelete: (id: string) => void;
}

export default function HistoryList({ history, onDelete }: HistoryListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这条记录吗？")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/history/${id}`, { method: "DELETE" });
      onDelete(id);
    } catch {
      // ignore
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div
          key={item.id}
          className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20"
        >
          {/* Header */}
          <div className="flex items-center">
            <button
              onClick={() => toggleExpand(item.id)}
              className="flex-1 p-5 text-left flex items-center justify-between min-w-0"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">
                  {item.ai_response.destination}
                </h3>
                <p className="text-sm text-white/60 mt-1 truncate">
                  {item.question}
                </p>
                <p className="text-xs text-white/40 mt-2">
                  {formatDate(item.created_at)}
                </p>
              </div>
              <svg
                className={`w-5 h-5 text-white/60 transition-transform duration-300 flex-shrink-0 ${
                  expandedId === item.id ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
              }}
              disabled={deletingId === item.id}
              className="mr-4 p-2 text-white/30 hover:text-red-400 transition disabled:opacity-50"
              title="删除"
            >
              {deletingId === item.id ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Expanded Content */}
          {expandedId === item.id && (
            <div className="px-5 pb-5 border-t border-white/10">
              <div className="mt-4 space-y-4">
                {item.ai_response.itinerary?.map((day) => (
                  <div
                    key={day.day}
                    className="bg-white/5 rounded-lg p-4"
                  >
                    <h4 className="font-medium text-white mb-3">
                      第 {day.day} 天
                    </h4>
                    <ul className="space-y-3">
                      {day.activities.map((activity, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                          {activity.image && (
                            <img
                              src={activity.image}
                              alt={activity.name}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div>
                            <p className="font-medium text-white">
                              {activity.name}
                            </p>
                            <p className="text-sm text-white/70">
                              {activity.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
