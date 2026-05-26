import Layout from "./Layout";

function SettingsPage({darkMode}) {
    return (
        <Layout title="Settings">
            <div className="bg-white p-6 rounded-3xl border" >
                <h2 className="text-2xl font-bold text-green-700 mb-6">
                    Settings
                </h2>
                <p className="text-slate-600">Settings page coming soon...</p>
            </div>
        </Layout>
    );
}

export default SettingsPage;
