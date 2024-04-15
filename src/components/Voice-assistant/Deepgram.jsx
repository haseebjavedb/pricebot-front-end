import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function TranscriptionForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [combinedText, setCombinedText] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Initialize form fields with values from location state
  useEffect(() => {
    if (location.state) {
      setName(location.state.name || '');
      setTitle(location.state.title || '');
      setEmail(location.state.email || '');
      setText(location.state.text || '');
      setSummary(location.state.summary || '');
    }
  }, [location.state]);

  // Combine text and summary into one field
  useEffect(() => {
    setCombinedText(`${text}\n\nSummary:\n${summary}`);
  }, [text, summary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/sendEmail`, {
        title,
        name,
        email,
        transcriptionText: combinedText,
      });
      setSuccess(true);
      // Redirect to Voice Assistant page after 5 seconds
      setTimeout(() => {
        navigate('/Voice-Assistant');
      }, 5000);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const back = () => {
    navigate('/Voice-Assistant');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-2">
          {/* Sidebar Column */}
          {/* Sidebar content can be added here */}
        </div>
        <div className="col-md-7">
          {/* Main Content Column */}
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Transcription Details</h2>
              {success ? (
                <p className="text-center">Transcription sent to {email} successfully!</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="transcription" className="form-label">
                      Transcription Text:
                    </label>
                    <textarea
                      id="transcription"
                      value={combinedText}
                      onChange={(e) => setCombinedText(e.target.value)}
                      className="form-control"
                      rows={10}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
                    {loading ? "Bitte warten..." : "Send Transcription"}
                  </button>
                  <button className="btn btn-danger ms-2 mt-4" onClick={back}>
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TranscriptionForm;
