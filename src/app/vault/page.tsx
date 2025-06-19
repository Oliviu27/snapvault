import FileList from "./FileList";
import LogoutButton from "./LogoutButton";
import UploadPanel from "./UploadPanel";

export default function VaultPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 p-6 text-white relative overflow-hidden">
      {/* Logout Button - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LogoutButton />
      </div>

      {/* Ocean waves background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600 to-transparent"></div>
        <div className="absolute bottom-8 left-0 right-0 h-16 bg-gradient-to-t from-blue-500 to-transparent animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Pirate Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-amber-300 drop-shadow-lg">
            🏴‍☠️ SnapVault ⚓️
          </h1>
          <p className="text-xl text-blue-200 font-medium">
            Arrr! Store yer precious digital treasures here, matey! 💰
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-2xl">
            <span>🦜</span>
            <span>⚔️</span>
            <span>🗺️</span>
            <span>💎</span>
            <span>🏆</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-1">
          {/* Upload Treasure Chest */}
          <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/60 backdrop-blur-sm border-4 border-amber-600/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">📦</span>
              <h2 className="text-2xl font-bold text-amber-200">
                Add Treasure to Yer Chest
              </h2>
            </div>
            <div className="bg-amber-950/30 rounded-xl border border-amber-700/50">
              <UploadPanel />
            </div>
          </div>

          {/* File List Treasure Inventory */}
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/80 backdrop-blur-sm border-4 border-slate-600/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">🗃️</span>
              <h2 className="text-2xl font-bold text-slate-200">
                Treasure Inventory
              </h2>
              <span className="text-2xl ml-auto">💰</span>
            </div>
            <div className="bg-slate-900/40 rounded-xl p-6 border border-slate-600/30">
              <FileList />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-300/70">
          <p className="text-sm">
            🌊 Sail the digital seas safely with SnapVault 🌊
          </p>
        </div>
      </div>
    </main>
  );
}
