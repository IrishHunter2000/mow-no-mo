import { useState } from 'react';
import './App.css'
import Header from "./components/Header";
import Schedule from "./pages/Schedule";
import AddClient from './pages/AddClient';

const titles: Record<string, string> = {
	schedule: "Schedule | Standoff",
	update: "Update Entry | Standoff",
};

function App() {
	const [page, setPage] = useState("schedule");

	const updatePage = (event: string) => {
		document.title = titles[event] ?? "Standoff Tournament Analytics";
		setPage(event);
	}

	return (
		<div className="min-h-screen w-full flex flex-col">
			<header className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur">
				<Header page={page} setPage={updatePage} />
			</header>
			<main className="flex-1 p-4">
				{page === "schedule" && <Schedule />}
				{page === "update" && <AddClient />}
			</main>
		</div>
	)
}

export default App
