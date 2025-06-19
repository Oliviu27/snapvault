import { FileList } from "../../components";

export default function VaultPage() {
  return (
    <main className="min-h-screen bg-[#1b263b] p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mb-8">🏴‍☠️ SnapVault</h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
            {/* <UploadPanel /> */}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Your Files</h2>
            <div className="bg-slate-800 rounded-lg p-6">
              <FileList />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
