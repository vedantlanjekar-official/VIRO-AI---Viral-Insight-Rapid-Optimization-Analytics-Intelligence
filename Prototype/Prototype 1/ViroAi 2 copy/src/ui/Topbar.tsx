import { useAuth } from '../contexts/AuthContext';

export default function Topbar() {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;

    try {
      await signOut();
      // Redirect to home page after logout
      window.location.hash = '/';
      window.location.reload(); // Force page reload to clear any cached state
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out. Please try again.');
    }
  };

  return (
    <div className="topbar">
      <input className="search" placeholder="Search viruses, mutations, antidotes..." />
      <div className="profile">
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">⚙️</button>
        <div className="user">
          <img src="https://i.pravatar.cc/36?img=8" alt="User" />
          <span>Dr. Pranav Shinde</span>
          {user && (
            <button 
              className="logout-btn" 
              onClick={handleLogout}
              style={{
                marginLeft: '10px',
                padding: '4px 8px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              🚪 Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
