'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RealTimeClock from './RealTimeClock';
import SocketClient from './SocketClient';

const menuItems = [
    { name: 'ПРИХОД', path: '/' },
    { name: 'ГРУППЫ', path: '/groups' },
    { name: 'ПРОДУКТЫ', path: '/products' },
    { name: 'ПОЛЬЗОВАТЕЛИ', path: '/users' },
    { name: 'НАСТРОЙКИ', path: '/settings' },
];

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            <button
                className="btn p-1 d-md-none"
                onClick={() => setIsOpen(true)}
                aria-label="Открыть меню"
                style={{ lineHeight: 1 }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>


            <div
                onClick={() => setIsOpen(false)}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.45)',
                    zIndex: 1040,
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                    transition: 'opacity 0.3s ease',
                }}
            />


            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                width: '280px',
                background: '#fff',
                zIndex: 1050,
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.25rem 1.5rem',
                boxShadow: '4px 0 20px rgba(0,0,0,0.12)',
            }}>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center text-success fw-bold fs-5">
                        <span className="me-2">🛡️</span> INVENTORY
                    </div>
                    <button className="btn-close" onClick={() => setIsOpen(false)} aria-label="Закрыть" />
                </div>


                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control bg-light border-0"
                        placeholder="Поиск"
                        aria-label="Поиск"
                    />
                </div>


                <nav className="mb-auto">
                    <ul className="nav flex-column gap-1 list-unstyled">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link href={item.path} className="nav-link text-decoration-none px-0 py-2 sidebar-link">
                                        <span className={`fw-bold pb-1 ${isActive ? 'text-success border-bottom border-success' : 'text-dark'}`}>
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>


                <div className="border-top pt-3 mt-3 d-flex flex-column gap-3">
                    <SocketClient />
                    <RealTimeClock />
                </div>
            </div>
        </>
    );
}
