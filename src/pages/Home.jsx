import { jobs } from "../mockData/jobs";
import JobCard from "../components/JobCard";
import BottomNav from "../components/BottomNav";

export default function Home(){
  const suggested = jobs.filter(j => j.suggested);
  const recommended = jobs.filter(j => j.recommended);

  return (
    <>
      <header className="section">
        <h2>Let’s Find Job</h2>
        <input className="input" placeholder="Search Job" />
      </header>

      <section className="section">
        <div className="space-between">
          <h3>Suggested for you</h3>
          <a className="small link" href="#all">View All</a>
        </div>
        <div className="list">
          {suggested.map(j => <JobCard key={j.id} job={j} />)}
        </div>
      </section>

      <section className="section">
        <div className="space-between">
          <h3>Recommended for you</h3>
          <a className="small link" href="#all">View All</a>
        </div>
        <div className="list">
          {recommended.map(j => <JobCard key={j.id} job={j} />)}
        </div>
      </section>

      <BottomNav />
    </>
  );
}
