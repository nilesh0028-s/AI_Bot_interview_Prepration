import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from "../../redux/auth/authThunks";



export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(state => state.auth)
  const wrapperRef = useRef(null)
  const dispatch=useDispatch()
  const handlesubmit = () => {
    dispatch(logoutUser())
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="ce-navbar">
      <div className="ce-navbar-inner">
        <div className="ce-logo">
          <div className="ce-logo-icon">
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <span className="ce-logo-text">Cognitive Edge</span>
        </div>
        <nav className="ce-nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#prepare">Get Started</a>
        </nav>
        <div className="ce-nav-actions">
          <div className="ce-avatar-wrapper" ref={wrapperRef}>
            <div className="ce-avatar" onClick={() => setOpen(!open)}>
              <span className="material-symbols-outlined">person</span>
            </div>

            {open && (
              <div className="ce-profile-popup">
                <div className="ce-profile-info">
                  <div className="ce-profile-avatar">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div>
                    <p className="ce-profile-name">{user?.username}</p>
                    <p className="ce-profile-email">{user?.email}</p>
                  </div>
                </div>
                <hr className="ce-profile-divider" />
                <button className="ce-signout-btn"
                onClick={handlesubmit}>
                  <span className="material-symbols-outlined">logout</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
