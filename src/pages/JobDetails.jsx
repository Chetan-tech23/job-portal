import { useParams, useNavigate } from "react-router-dom";
import { jobs } from "../mockData/jobs";
import BottomNav from "../components/BottomNav";

export default function JobDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const job = jobs.find((j) => j.id === id);

  if (!job) return <div className="section">Job not found.</div>;

  return (
    <>
      <div className="section row">
        <button onClick={() => nav(-1)} className="list">
          ◀️
        </button>
        <h3 style={{ marginLeft: 8 }}>Job Description</h3>
      </div>

      <div className="card section">
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{job.title}</div>
          <div className="small">
            {job.company} | {job.country}
          </div>
          <div style={{ marginTop: 6 }} className="small">
            {job.salaryBand}
          </div>
        </div>

        <div
          className="chips"
          style={{ justifyContent: "center", marginTop: 12 }}
        >
          <span className="chip">{job.seniority}</span>
          <span className="chip">{job.type}</span>
          {job.remote && <span className="chip">Remote</span>}
        </div>
      </div>

      <div className="section">
        <div className="card">
          <h3>Job Description</h3>
          <p className="small" style={{ lineHeight: 1.6 }}>
            {job.description}
          </p>
          <h3 style={{ marginTop: 10 }}>Key Responsibilities</h3>
          <ul>
            {job.responsibilities.map((r, i) => (
              <li key={i} className="small">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="section">
        <button className="btn-primary">Apply Now</button>
      </div>

      <BottomNav />
    </>
  );
}
