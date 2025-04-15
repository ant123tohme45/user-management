import { useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard"); // Redirect to the home page
  };

  return (
    <div className="notfound-main">
      <h1 className="nf-header">404</h1>
      <p className="page-nf-text">Page Not Found</p>
      <button onClick={handleGoHome} className="back-btn">
        Go back to Dashboard
      </button>
    </div>
  );
};

export default PageNotFound;
