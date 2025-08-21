import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <Link
      to={`/job/${job.id}`}
      className="link"
      style={{ textDecoration: "none" }}
    >
      <div className="card">
        <div className="space-between">
          <div>
            <div style={{ fontWeight: 600 }}>{job.title}</div>
            <div className="small">
              {job.company} | {job.location}
            </div>
          </div>
          <div className="small">⭐</div>
        </div>

        <div className="chips">
          <span className="chip">{job.seniority}</span>
          <span className="chip">{job.type}</span>
          <span className="chip">{job.range}</span>
        </div>

        <div className="small" style={{ marginTop: 8 }}>
          {job.postedAgo}
        </div>
      </div>
    </Link>
  );
}
