import { useEffect, useState } from "react";
import ScheduleItem from "../components/ScheduleItem";
import { useData } from "../context/DataContext";
import { Search } from "lucide-react";

export default function Schedule() {
    const { schedule } = useData();
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timeout);
    }, [search]);

    const filteredSchedule = schedule.filter((item) => {
        const query = debouncedSearch.toLowerCase();

        return (
            (item.name || "").toLowerCase().includes(query) ||
            (item.address || "").toLowerCase().includes(query)
        );
    });

	if (!schedule.length) return <p>Loading schedule...</p>;

    return (
		<div className="flex flex-col justify-center items-center">
            <div className="w-3/4 relative mb-4">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by name or address..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-blue-500"
                />
            </div>
            {/* Schedule List */}
            {!filteredSchedule?.length
                ? <p>No games found.</p>
                : <div className="w-full flex flex-col justify-center gap-4">
                    {filteredSchedule.map((client, idx) => (
                        <div key={idx}>
                            <ScheduleItem client={client} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}
