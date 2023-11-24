import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="NavBar">
      <ul
        className="menu"
        style={{
          justifyContent: "space-evenly",
          listStyle: "none",
          padding: 0,
          display: "flex",
        }}
      >
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">LoginForm</NavLink>
        </li>
        <li>
          <NavLink to="/currency">Currency Converter</NavLink>
        </li>
        <li>
          <NavLink to="/country">Country Selection</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact us</NavLink>
        </li>
        <li>
          <NavLink to="/landscapes">Landscapes</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
