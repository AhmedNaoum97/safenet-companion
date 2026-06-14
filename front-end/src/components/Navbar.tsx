import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">SafeNet Companion 🤖</div>

        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Safety Chat
          </NavLink>

          <NavLink
            to="/learn"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Learn
          </NavLink>

          <NavLink
            to="/detox"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Digital Detox
          </NavLink>

          <NavLink
            to="/resources"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Resources
          </NavLink>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;