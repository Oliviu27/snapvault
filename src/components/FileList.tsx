'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

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
        .from('vault_files')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setRows(data as Row[]);
    }
    load();
  }, []);

  if (!rows.length) return <p className="text-slate-400">No files yet.</p>;

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-slate-400">
          <th>Name</th><th>Size</th><th>Date</th><th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id} className="border-t border-slate-700">
            <td>{row.filename}</td>
            <td>{(row.size/1024).toFixed(1)} KB</td>
            <td>{new Date(row.created_at).toLocaleString()}</td>
            <td>
              <a
                className="underline"
                href={supabase.storage.from('vault')
                  .getPublicUrl(row.object_path).data.publicUrl}
                download
              >
                Download
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
