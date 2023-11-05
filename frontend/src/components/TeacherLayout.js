import React from 'react';
import TeacherDashboard from './TeacherDashboard';

function TeacherLayout({ children, setUserRole, handleSignOut }) {
  return (
    <div>
      <TeacherDashboard setUserRole={setUserRole} handleSignOut={handleSignOut} />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default TeacherLayout;
