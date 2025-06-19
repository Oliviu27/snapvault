"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { v4 as uuid } from "uuid";

export default function UploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  async function handleUpload() {
    if (!file) return;
    if (file.size > 2_000_000) return setMsg("File bigger than 2 MB");
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return setMsg("Not signed in");

    const id = uuid();
    const path = `${session.user.id}/${id}`;
    // 1) upload to Storage
    const { error: upErr } = await supabase.storage
      .from("vault")
      .upload(path, file, { upsert: false });
    if (upErr) return setMsg(upErr.message);

    // 2) insert metadata row
    const { error: dbErr } = await supabase.from("vault_files").insert({
      id,
      user_id: session.user.id,
      object_path: path,
      filename: file.name,
      mime_type: file.type,
      size: file.size,
    });
    if (dbErr) return setMsg(dbErr.message);

    setMsg("Uploaded!"); // quick feedback
    setFile(null); // clear picker
  }

  return (
    <div className="p-6">
      <div className="border-2 border-dashed border-amber-400/50 rounded-xl p-8 bg-gradient-to-br from-amber-900/20 to-amber-800/30 hover:border-amber-300 transition-colors">
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">⚱️</div>
          <p className="text-amber-200 font-medium">
            Drop yer treasure here, ye scallywag!
          </p>
          <p className="text-amber-300/70 text-sm mt-1">
            Maps, doubloons, and digital booty welcomed ⚔️
          </p>
        </div>

        <input
          type="file"
          accept=".jpg,.png,.gif,.svg,.txt,.md,.csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full p-3 bg-slate-800/50 border-2 border-amber-600/30 rounded-lg text-amber-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-600 file:text-white file:font-medium file:cursor-pointer hover:file:bg-amber-700 focus:outline-none focus:border-amber-500"
        />

        <div className="text-center">
          <button
            onClick={handleUpload}
            disabled={!file}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-gray-600 disabled:to-gray-700 px-8 py-3 rounded-lg text-white font-bold text-lg shadow-lg transform transition-all hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center mx-auto"
          >
            <span className="mr-2">⚓️</span>
            {file ? `Stash "${file.name}"` : "Choose Treasure First!"}
            <span className="ml-2">💰</span>
          </button>
        </div>

        {msg && (
          <div className="mt-4 p-3 rounded-lg bg-slate-800/50 border border-amber-600/30">
            <p className="text-center text-amber-200 font-medium">
              {msg === "Uploaded!"
                ? "🎉 Treasure safely stashed! 🎉"
                : msg === "File bigger than 2 MB"
                  ? "⚠️ That treasure be too heavy, matey! (Max 2MB)"
                  : msg === "Not signed in"
                    ? "🏴‍☠️ Ye need to prove yer identity first!"
                    : `💀 Blimey! ${msg}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
