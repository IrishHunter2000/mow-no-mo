import './App.css'
import Header from "./components/Header";
import Schedule from "./pages/Schedule";

function App() {

	return (
		<div className="min-h-screen w-full flex flex-col">
			<header className="sticky top-0 z-10 border-b border-gray-700 backdrop-blur">
				<Header />
			</header>
			<main className="flex-1 p-4">
        		<Schedule />
			</main>
		</div>
	)
}

export default App
