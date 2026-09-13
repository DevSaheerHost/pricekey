import { NavLink } from "react-router-dom";

const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
    <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SettingsIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8}>
    <circle cx="12" cy="12" r="3.2" />
    <path
      d="M12 3.5v2M12 18.5v2M4.9 6.4l1.4 1.4M17.7 16.2l1.4 1.4M3.5 12h2M18.5 12h2M4.9 17.6l1.4-1.4M17.7 7.8l1.4-1.4"
      strokeLinecap="round"
    />
  </svg>
);

export default function BottomNav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
      isActive ? "text-accent" : "text-ink-faint"
    }`;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl px-2" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <NavLink to="/" end className={linkClass}>
          {({ isActive }) => (
            <>
              <HomeIcon active={isActive} />
              Home
            </>
          )}
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          {({ isActive }) => (
            <>
              <SettingsIcon active={isActive} />
              Settings
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
