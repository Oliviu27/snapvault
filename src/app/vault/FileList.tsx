"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Row = {
  id: string;
  filename: string;
  size: number;
  mime_type: string;
  created_at: string;
  object_path: string;
};

export default function FileList() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("vault_files")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setRows(data as Row[]);
    }
    load();
  }, []);

  async function getUrl(path: string) {
    const { data, error } = await supabase.storage
      .from("vault")
      .createSignedUrl(path, 60); // 60-second token
    return error ? null : data.signedUrl;
  }

  if (!rows.length)
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🏴‍☠️</div>
        <p className="text-amber-300 text-lg font-medium">
          Yer treasure chest be empty, matey!
        </p>
        <p className="text-slate-400 text-sm mt-2">
          Start stowin some digital booty above ⚔️
        </p>
      </div>
    );

  return (
    <div className="overflow-hidden rounded-lg border-2 border-amber-600/30 bg-gradient-to-br from-slate-800/40 to-slate-900/60">
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-amber-900/50 to-amber-800/50 border-b-2 border-amber-600/30">
          <tr className="text-left text-amber-200">
            <th className="px-4 py-3 font-bold">
              <span className="mr-2">📜</span>Treasure Name
            </th>
            <th className="px-4 py-3 font-bold">
              <span className="mr-2">⚖️</span>Weight
            </th>
            <th className="px-4 py-3 font-bold">
              <span className="mr-2">🗓️</span>Date Stashed
            </th>
            <th className="px-4 py-3 font-bold">
              <span className="mr-2">⚓️</span>Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              className={`border-t border-slate-600/30 hover:bg-amber-900/20 transition-colors ${
                index % 2 === 0 ? "bg-slate-800/20" : "bg-slate-700/20"
              }`}
            >
              <td className="px-4 py-3 text-slate-200 font-medium">
                <div className="flex items-center">
                  <span className="mr-2 text-amber-400">💰</span>
                  {row.filename}
                </div>
              </td>
              <td className="px-4 py-3 text-slate-300">
                {(row.size / 1024).toFixed(1)} KB
              </td>
              <td className="px-4 py-3 text-slate-300">
                {new Date(row.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <button
                  className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium rounded-lg transition-all transform hover:scale-105 text-xs shadow-md border border-amber-500/50"
                  onClick={async () => {
                    const url = await getUrl(row.object_path);
                    if (url) window.open(url, "_blank");
                  }}
                >
                  <span className="mr-1">🏴‍☠️</span>
                  Plunder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
