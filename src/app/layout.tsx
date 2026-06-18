import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Sidebar from './../../components/Sidebar';
import Topbar from './../../components/Topbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html data-scroll-behavior="smooth">
      <body>
      <div className="d-flex flex-column" style={{ backgroundColor: '#f0f3f5', height: '100vh', overflow: 'hidden' }}>

          <Topbar />

          <div className="d-flex flex-grow-1" style={{ overflow: 'hidden', minHeight: 0 }}>

              <Sidebar />

              <main className="flex-grow-1 p-4" style={{ overflowY: 'auto', overflowX: 'hidden', minWidth: 0 }}>
                  {children}
              </main>

          </div>
      </div>
      </body>
      </html>
  );
}
