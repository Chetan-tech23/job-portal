import { useState, useEffect } from "react";
import { jobs } from "../mockData/jobs";
import JobCard from "../components/JobCard";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const [showAllSuggested, setShowAllSuggested] = useState(false);
  const [showAllRecommended, setShowAllRecommended] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce - wait 300ms after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Filter jobs by debounced search query
  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const suggested = filteredJobs.filter((j) => j.suggested);
  const recommended = filteredJobs.filter((j) => j.recommended);

  const visibleSuggested = showAllSuggested ? suggested : suggested.slice(0, 3);
  const visibleRecommended = showAllRecommended
    ? recommended
    : recommended.slice(0, 3);

  return (
    <>
      <header className="section">
        <h2>Let's Find Job</h2>
        <input
          className="input"
          placeholder="Search Job"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      {/* Suggested Section */}
      <section className="section">
        <div className="space-between">
          <h3>Suggested for you</h3>
          {suggested.length > 3 && (
            <div
              className="link"
              onClick={() => setShowAllSuggested(!showAllSuggested)}
            >
              {showAllSuggested ? "Show Less" : "View All"}
            </div>
          )}
        </div>
        <div className="list">
          {visibleSuggested.length > 0 ? (
            visibleSuggested.map((j) => <JobCard key={j.id} job={j} />)
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </section>

      {/* Recommended Section */}
      <section className="section">
        <div className="space-between">
          <h3>Recommended for you</h3>
          {recommended.length > 3 && (
            <div
              className="link"
              onClick={() => setShowAllRecommended(!showAllRecommended)}
            >
              {showAllRecommended ? "Show Less" : "View All"}
            </div>
          )}
        </div>
        <div className="list">
          {visibleRecommended.length > 0 ? (
            visibleRecommended.map((j) => <JobCard key={j.id} job={j} />)
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </section>

      <BottomNav />
    </>
  );
}
