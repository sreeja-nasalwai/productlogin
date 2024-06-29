import { Link } from 'react-router-dom';
import { useAuth } from "./AuthProvider";

function HeaderComponent() {
    const { logOut } = useAuth();

    const handleLogout = () => {
        console.log("Logout button clicked");
        logOut();
    };
    return (
        <header>
            <div className="px-3 py-2 bg-light text-dark border-bottom position-sticky">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-decoration-none"></a>
                        <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                            <li>
                                <Link to="/product" className="btn btn-light text-dark me-2">Product</Link>
                            </li>
                            
                            <li>
                                <Link to="/home" className="btn btn-light text-dark me-2">Home</Link>
                            </li>
                            <li>
                                <Link to="/login" className="btn btn-light text-dark me-2">Login</Link>
                            </li>
                            
                            <li>
                            <button onClick={handleLogout} className="btn btn-light text-dark me-2">Logout</button>
                            </li>
                            <li>
                                <Link to="/signup" className="btn btn-light text-dark me-2">SignUp</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="px-3 py-2 border-bottom mb-3">
                <div className="container d-flex flex-wrap justify-content-center">
                    <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto" role="search">
                        <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                    </form>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponent;
