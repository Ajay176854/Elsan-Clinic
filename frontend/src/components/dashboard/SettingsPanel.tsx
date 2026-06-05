export default function SettingsPanel() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Clinic Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp API Key (Meta)</label>
          <input type="password" value="************************" readOnly className="w-full border border-slate-300 rounded p-2 bg-slate-50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Cloudinary URL</label>
          <input type="text" value="cloudinary://api_key:api_secret@elsan-clinic" readOnly className="w-full border border-slate-300 rounded p-2 bg-slate-50" />
        </div>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-semibold">Save Configuration</button>
      </div>
    </div>
  );
}
