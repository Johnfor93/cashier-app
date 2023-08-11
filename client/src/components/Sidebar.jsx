import { Outlet, Link } from "react-router-dom";
import "./Sidebar.css";

const sidebar = () => {
  return (
    <div className="d-flex min-vw-100">
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark min-vh-100 sidebar">
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg className="bi pe-none me-2" width="40" height="32">
            {/* <use xlink:href="#bootstrap" /> */}
          </svg>
          <span className="fs-4">Toko Tunas Jaya</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <Link to="/" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                {/* <use xlink:href="#speedometer2" /> */}
              </svg>
              Kasir
            </Link>
          </li>
          <li>
            <Link to="/transaksi" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                {/* <use xlink:href="#table" /> */}
              </svg>
              Transaksi
            </Link>
          </li>
          <li>
            <Link to="/product" className="nav-link text-white">
              <svg className="bi pe-none me-2" width="16" height="16">
                {/* <use xlink:href="#grid" /> */}
              </svg>
              Products
            </Link>
          </li>
        </ul>
      </div>
      <div className="pages w-100">
        <Outlet />
      </div>
    </div>
  );
};

export default sidebar;
