import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import { seedUser } from "../mockData/user";

export default function Profile() {
  const [user, setUser] = useState(seedUser);
  const [edit, setEdit] = useState(false);

  // load from localStorage first time
  useEffect(() => {
    const cached = localStorage.getItem("user");
    if (cached) setUser(JSON.parse(cached));
  }, []);

  // save on change
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const onChange = (path, value) => {
    setUser((prev) => {
      const next = structuredClone(prev);
      const [a, b] = path.split(".");
      next[a][b] = value;
      return next;
    });
  };

  const onExpChange = (id, field, value) => {
    setUser((prev) => {
      const next = structuredClone(prev);
      const expIndex = next.experience.findIndex((e) => e.id === id);
      if (expIndex !== -1) {
        next.experience[expIndex][field] = value;
      }
      return next;
    });
  };

  return (
    <>
      {/* Header */}
      <div className="section space-between">
        <h3>Profile</h3>
        <div className="space-between" style={{ gap: 12 }}>
          <div className="small">{user.progress}/100</div>
          <div className="link" onClick={() => setEdit(!edit)}>
            {edit ? "Save" : "Edit"}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="card section">
        <h3>Contact Info</h3>
        <div className="list">
          <Field
            label="Country"
            value={user.contact.country}
            edit={edit}
            onChange={(v) => onChange("contact.country", v)}
          />
          <Field
            label="City"
            value={user.contact.city}
            edit={edit}
            onChange={(v) => onChange("contact.city", v)}
          />
          <Field
            label="Phone"
            value={user.contact.phone}
            edit={edit}
            onChange={(v) => onChange("contact.phone", v)}
          />
          <Field
            label="Email"
            value={user.contact.email}
            edit={edit}
            onChange={(v) => onChange("contact.email", v)}
          />
        </div>
      </div>

      {/* About Me */}
      <div className="card section">
        <h3>About Me</h3>
        {edit ? (
          <textarea
            className="input"
            style={{ borderRadius: 14, height: 96 }}
            value={user.about}
            onChange={(e) => setUser({ ...user, about: e.target.value })}
          />
        ) : (
          <p className="small" style={{ lineHeight: 1.6 }}>
            {user.about}
          </p>
        )}
      </div>

      {/* Experience */}
      <div className="card section">
        <h3>Experience</h3>
        <div className="list">
          {user.experience.map((exp) => (
            <div
              key={exp.id}
              className="card"
              style={{ padding: 12, background: "#222345" }}
            >
              {edit ? (
                <>
                  <input
                    className="input"
                    value={exp.role}
                    onChange={(e) =>
                      onExpChange(exp.id, "role", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    value={exp.company}
                    onChange={(e) =>
                      onExpChange(exp.id, "company", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    value={exp.location}
                    onChange={(e) =>
                      onExpChange(exp.id, "location", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    value={exp.from}
                    onChange={(e) =>
                      onExpChange(exp.id, "from", e.target.value)
                    }
                  />
                  <input
                    className="input"
                    value={exp.to}
                    onChange={(e) => onExpChange(exp.id, "to", e.target.value)}
                  />
                </>
              ) : (
                <>
                  <div style={{ fontWeight: 600 }}>{exp.role}</div>
                  <div className="small">
                    {exp.company} | {exp.location}
                  </div>
                  <div className="small">
                    {exp.from} - {exp.to}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="card section">
        <h3>Education</h3>
        <div className="list">
          {user.education.map((edu) => (
            <div
              key={edu.id}
              className="card"
              style={{ padding: 12, background: "#2a2a4a" }}
            >
              <div style={{ fontWeight: 600 }}>{edu.degree}</div>
              <div className="small">
                {edu.institution} | {edu.year}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </>
  );
}

function Field({ label, value, edit, onChange }) {
  return (
    <div className="space-between">
      <div className="small" style={{ opacity: 0.9 }}>
        {label}
      </div>
      {edit ? (
        <input
          className="input"
          style={{ maxWidth: 220 }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}
