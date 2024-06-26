import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported for API requests
import logo from "/assets/logo.jpeg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = () => {
  const [selectedModel, setSelectedModel] = useState("AI Model");
  const [latestPdfData, setLatestPdfData] = useState([]); // Corrected state variable name for storing the latest PDF data
  const [historyData, setHistoryData] = useState([]);
  const { id } = useParams(); // Get the ID from URL params
  const navigate =useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/fetchData`
        );
        console.log(response.data);
        setLatestPdfData(response.data.message);
      } catch (error) {
        console.error("Error fetching latest PDF data:", error);
      }
    };

    const fetchDataById = async (id) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/fetchDataById/${id}`
        );
        return response.data;
        console.log(response);
      } catch (error) {
        console.error("Error fetching data by ID:", error);
        return null;
      }
    };

    fetchData();

    // Restoring the model selection from localStorage
    const storedModel = localStorage.getItem("selectedModel");
    if (storedModel) {
      setSelectedModel(storedModel);
    }

    // TODO: Implement fetchHistoryData or similar function to populate historyData
    // fetchHistoryData().then(data => setHistoryData(data));
  }, []);

  function logout() {
    localStorage.clear();
    window.location.reload();
    // navigate('/registration'); // Changed 'location.reload()' to 'window.location.reload()' for clarity
  }

  async function handleHistoryItemClick(id, title) {
    try {
      const data = await fetchDataById(id);
      console.log("Clicked on:", title);
    } catch (error) {
      console.error("Error fetching data by ID:", error);
    }
  }

  return (
    <nav className="pc-sidebar" style={{backgroundColor:'#002244'}}>
      <div className="navbar-wrapper">
        <div className="m-header">
          <a href="/" className="b-brand text-primary">
            <img
              style={{ height: "50px", width: "50px" }}
              src={logo}
              className="img-fluid logo-lg"
              alt="logo"
            />
          </a>
        </div>
        <div className="navbar-content">
          {/* <div className="card pc-user-card">
            <div
              style={{
                backgroundColor: "rgba(1,150,69,0.4)",
                borderRadius: "10px",
              }}
              className="card-body"
            > */}
          {/* <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <img
                    src="../assets/images/user/avatar-1.jpg"
                    alt="user-image"
                    className="user-avtar wid-45 rounded-circle"
                  />
                </div>
                <div className="flex-grow-1 ms-3 me-2">
                  <h6 className="mb-0">Jonh Smith</h6>
                  <small>Administrator</small>
                </div>
                <a
                  className="btn btn-icon btn-link-secondary avtar"
                  data-bs-toggle="collapse"
                  href="#pc_sidebar_userlink"
                >
                  <svg className="pc-icon">
                    <use xlinkHref="#custom-sort-outline"></use>
                  </svg>
                </a>
              </div> */}
          {/* <div
                className="collapse pc-user-links"
                id="pc_sidebar_userlink"
              ></div>
            </div>
          </div> */}

          <ul className="pc-navbar">
            <li className="pc-item pc-caption"></li>
            <li className="pc-item pc-hasmenu">
              <a href="#!" className="pc-link">
                <span className="pc-micon"></span>
                <h1 style={{ marginLeft: "40px" , color:'white'}}> Tools</h1>
                <span className="pc-arrow">
                  <i data-feather="chevron-right"></i>
                </span>
              </a>
              <ul className="pc-submenu">
                <li className="pc-item">
                  <Link className="pc-link" to="/">
                   <span style={{   color:'white'}}>  Datei-Upload</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="pc-item">
              <Link to="/" className="pc-link">
                {/* Assuming you have an SVG sprite or a similar setup to use icons */}
                <svg className="pc-icon" style={{color:'white'}}>
                  <use xlinkHref="#custom-story"></use>
                </svg>
                <span className="pc-mtext " style={{  color:'white' , paddingLeft:'7px' , marginTop:'100px'}}>Datei-Upload</span>
              </Link>
            </li>

            {/* 
            <li className="pc-item">
              <a href="" className="pc-link">
                <span className="pc-micon">
                  <svg className="pc-icon">
                    <use xlinkHref="#custom-fatrows"></use>
                  </svg>
                </span>
                <span className="pc-mtext">Herunterladen</span>
              </a>
            </li> */}

            {/* Dropdown Tab for History */}
            <li className="pc-item pc-hasmenu">
              <div
                className="card"
                style={{
                  maxHeight: "230px",
                  overflowY: "auto",
                  backgroundColor: "transparent",
                }}
              >
                {/* <div className="card-header">
                  <h5 className="card-title">History</h5>
                </div>
                <ul
                  className="list-group list-group-flush"
                  style={{ backgroundColor: "transparent" }}
                >
                  {Array.isArray(latestPdfData) &&
                    latestPdfData.map((data, index) => (
                      <li key={index} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6
                            className="mb-0"
                            onClick={() =>
                              handleHistoryItemClick(data.id, data.title)
                            }
                          >
                            <Link
                              to={`/History/${data.id}`}
                              className="text-decoration-none"
                              style={{ color: "#333" }}
                            >
                              {data.title}
                            </Link>
                          </h6>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() =>
                              handleHistoryItemClick(data.id, data.title)
                            }
                          >
                            <Link
                              to={`/History/${data.id}`}
                              className="text-decoration-none"
                              style={{ color: "#333" }}
                            >
                              View
                            </Link>
                          </button>
                        </div>
                      </li>
                    ))}
                </ul> */}
              </div>
            </li>
          </ul>
          <div style={{ paddingLeft: "60px" }}>
            <a
              href="/registration"
              onClick={logout}
              style={{
                textDecoration: "none",
                color: "#333",
                fontSize: "16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
             
              <span style={{ color: 'white', paddingLeft: '20px', paddingTop: '23rem' }}>
  Ausloggen
</span>

            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
