import { useEffect, useState } from "react";

export default function UpdateClientModal({ client, setModal }: { client: any, setModal: (client: any) => void }) {
    const [formData, setFormData]: any = useState(null);
    const excludedFields = ["id", "created_at"];

    useEffect(() => {
        setFormData(client); // clone for editing
    }, [client])

    useEffect(() => {
        if (client) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = ""
        };
    }, [client]);

    const formatLabel = (key: string) => {
        return key.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }

    const handleUpdate = () => {
        // const updated = schedule.map((item) =>
        //     item.id === formData.id ? formData : item
        // );
        // console.log(updated)
        console.log(formData);

        // setSchedule(updated);
        setModal(false);
    };

	return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">

            {/* Modal box */}
            <div className="bg-neutral-900 w-full max-w-lg rounded-xl max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="p-4 border-b border-neutral-700 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Update Entry</h2>
                    <button onClick={() => setModal(false)}>✕</button>
                </div>

                {/* Body */}
                <div className="p-4 overflow-y-auto flex flex-col gap-3">
                    {Object.entries(client)
                        .filter(([key]) => !excludedFields.includes(key))
                        .map(([key, value]) => (
                            <div key={key} className="flex flex-row items-center text-left gap-1">
                                <label className="w-40 text-sm text-gray-400">{formatLabel(key)}</label>
                                <input
                                    className="w-full p-2 rounded bg-neutral-800"
                                    value={value != null ? String(value) : ""}
                                    onChange={(e) =>
                                        setFormData({ ...formData, [key]: e.target.value })
                                    }
                                />
                            </div>
                        ))
                    }
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-neutral-700 flex justify-end gap-2">
                    <button onClick={() => { setModal(false)}} className="px-4 py-2 bg-gray-600 rounded">
                        Cancel
                    </button>
                    <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                        Update
                    </button>
                </div>
            </div>
        </div>
	)
}
