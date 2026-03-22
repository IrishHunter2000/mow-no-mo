import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { DataContextType } from "../types/types";

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [schedule, setSchedule] = useState<any[]>([]);

    useEffect(() => {
        loadSchedule();
    }, []);

    const loadSchedule = async () => {
        const { data, error } = await supabase
            .from("client_list")
            .select("*")
            .order("id", { ascending: true });
        console.log(data);

        if (error) return console.error(error);
        setSchedule(data);
    }

    return (
        <DataContext.Provider value={{ schedule }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useData must be used inside <DataProvider>");
    return ctx;
};
