'use client';
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { v4 as uuid } from 'uuid';

export default function UploadPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState('');

  async function handleUpload() {
    if (!file) return;
    if (file.size > 2_000_000) return setMsg('File bigger than 2 MB');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return setMsg('Not signed in');

    const id = uuid();
    const path = `${session.user.id}/${id}`;
    // 1) upload to Storage
    const { error: upErr } = await supabase
      .storage
      .from('vault')
      .upload(path, file, { upsert: false });
    if (upErr) return setMsg(upErr.message);

    // 2) insert metadata row
    const { error: dbErr } = await supabase
      .from('vault_files')
      .insert({
        id,
        user_id: session.user.id,
        object_path: path,
        filename: file.name,
        mime_type: file.type,
        size: file.size,
      });
    if (dbErr) return setMsg(dbErr.message);

    setMsg('Uploaded!');       // quick feedback
    setFile(null);             // clear picker
  }

  return (
    <div className="mb-8 border p-4 rounded bg-slate-800">
      <input
        type="file"
        accept=".jpg,.png,.gif,.svg,.txt,.md,.csv"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="mb-2 w-full"
      />
      <button
        onClick={handleUpload}
        className="bg-emerald-600 hover:bg-emerald-700 px-4 py-1 rounded text-white"
      >
        Upload
      </button>
      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </div>
  );
}