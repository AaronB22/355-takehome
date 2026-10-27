import JobCard from './JobCard';

/**
 * The list of applications, or a message saying why it is empty.
 *
 * "No applications yet" and "nothing matched your filters" are different
 * situations and a student staring at a blank page cannot tell them apart, so
 * the caller passes the wording that fits.
 */
export default function JobList({ applications, emptyMessage = 'No applications yet.', loading }) {
	if (applications.length === 0&&loading==="loaded") {
		return <p className="empty">{emptyMessage}</p>;
	}
	switch (loading) {
		case "loading":
			return (
				<p className='loading'>
					Loading data
				</p>
			)
		
		case "loaded":
			return (
				<ul className="job-list">
					{applications.map((application) => (
						// The key is the application's own id. The array index would be
						// reused by a different application as soon as the list is filtered
						// or sorted, and React would keep the wrong DOM node.
						<JobCard key={application.id} application={application} />
					))}
				</ul>
			);
			

		default:
			return (
				<p className='error'>
					Could not load applications {loading}
				</p>
			)
	}

}
