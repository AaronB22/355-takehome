import SummaryBar from './components/SummaryBar';
import JobList from './components/JobList';
// import { applications } from './applications';
import { byNewest } from './statuses';
import { useEffect, useState } from 'react';
import FilterBar from './components/FilterBar';

/**
 * Stage 1: the tracker renders a fixed list of applications.
 *
 * Nothing here holds state. The list is sorted on the way through and the
 * summary counts are worked out from the same array, which is why they cannot
 * disagree with what is on screen.
 */
export default function App() {
	const [applications, setApplications] = useState([]);
	const [loading, setLoading]= useState("loading")
	const [filter, setFilter]= useState({});

	const applyFilters=(value, chip)=>{
		console.log(value, chip)
	}

	useEffect(() => {
		const controller = new AbortController();
		async function loadApplications() {
			try{
				const responce = await fetch("/applications.json");
				if (responce.ok) {
					const data = await responce.json();
					setApplications(data);
					setLoading("loaded")
				}
				else {
					setLoading("error");
					throw new Error(`Request failed: ${responce.status}`);
					
				}

			}
			catch(err){
				setLoading("error")
			}
		}
		loadApplications();
		return()=> controller.abort();
	}, [])
	const sorted = [...applications].sort(byNewest);

	return (
		<>
			<header className="site-header">
				<div className="container">
					<h1>Job Application Tracker</h1>
				</div>
			</header>

			<main className="container">
				<SummaryBar applications={sorted} />
				<FilterBar applyFilters={applyFilters}/>
				<div className="page-head">
					<h2>Applications</h2>
				</div>
				<JobList applications={sorted} loading={loading} />
			</main>
		</>
	);
}
