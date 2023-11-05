import React from 'react';
import AdminDashboard from './AdminDashboard';

function AdminLayout({ children, setUserRole, handleSignOut }) {
  return (
    <div>
      <AdminDashboard setUserRole={setUserRole} handleSignOut={handleSignOut} />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
