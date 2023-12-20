import { Link,useNavigate } from "react-router-dom";

export default function Header(props) {
    const navigate = useNavigate();

const signOut=()=>{
    localStorage.clear();
    window.location.replace('/');

}

    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                  <Link to="/dashboard">  <a  className="logo d-flex align-items-center">
                        <span className="d-none d-lg-block">Sleep App </span>
                    </a></Link>
                    
                </div>

            

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item d-block d-lg-none">
                            <a className="nav-link nav-icon search-bar-toggle " href="#">
                                <i className="bi bi-search"></i>
                            </a>
                        </li>

                     

                        <li className="nav-item dropdown pe-3">

                            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <img src="assets/image/profile.webp" alt="Profile" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">{props.userName}</span>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{props.userName}</h6>
                                    <span>{props.role}</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li onClick={()=>signOut()}>
                                    <a className="dropdown-item d-flex align-items-center" href="#">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </a>
                                </li>

                            </ul>
                        </li>

                    </ul>
                </nav>

            </header>
        </>
    )
}