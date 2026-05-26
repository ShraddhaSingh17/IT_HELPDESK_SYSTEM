import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";

function ActivityLogs({ ticketId, darkMode }) {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const res = await axios.get(
                `${API_BASE_URL}/get_logs.php?ticket_id=${ticketId}`,
            );

            setLogs(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={`mt-6 transition ${
                darkMode ? "text-white" : "text-slate-800"
            }`}>
            <h3 className="text-lg font-bold text-green-700 mb-4">
                Activity Timeline
            </h3>

            <div className="space-y-3">
                {logs.map((log) => (
                    <div
                        key={log.id}
                        cclassName={`p-3 rounded-xl border transition ${
                            darkMode
                                ? "bg-slate-800 border-slate-700 text-white"
                                : "bg-slate-100 border-slate-200 text-slate-800"
                        }`}>
                        <p className="text-sm">
                            <b>{log.name}</b> {log.action}
                        </p>

                        <p
                            className={`text-xs ${
                                darkMode ? "text-slate-400" : "text-gray-500"
                            }`}>
                            {log.created_at}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ActivityLogs;
