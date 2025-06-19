import FileList from "./FileList";
import LogoutButton from "./LogoutButton";
import UploadPanel from "./UploadPanel";

export default function VaultPage() {
  return (
    <main className="min-h-screen bg-[#1b263b] p-6 text-white">
      <h1 className="text-3xl mb-4">🏴‍☠️ SnapVault</h1>
      <UploadPanel />
      <FileList />
      <LogoutButton />
    </main>
  );
}
