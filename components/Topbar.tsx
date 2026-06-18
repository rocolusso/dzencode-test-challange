import React from 'react';
import RealTimeClock from './RealTimeClock';
import SocketClient from './SocketClient';
import MobileMenu from './MobileMenu';

export default function Topbar() {
    return (
        <header className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center shadow-sm">


            <div className="d-flex align-items-center text-success fw-bold">
                <span className="me-2 fs-4">🛡️</span>
                INVENTORY
            </div>


            <div className="flex-grow-1 mx-5 d-none d-md-block" style={{ maxWidth: '400px' }}>
                <input
                    type="text"
                    className="form-control bg-light border-0"
                    placeholder="Поиск"
                    aria-label="Поиск"
                />
            </div>


            <div className="d-flex align-items-center gap-3">
                <div className="d-none d-md-block">
                    <SocketClient />
                </div>
                <div className="text-end d-none d-md-block">
                    <RealTimeClock />
                </div>

                <MobileMenu />
            </div>

        </header>
    );
}
