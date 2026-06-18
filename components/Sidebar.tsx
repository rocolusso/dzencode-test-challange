'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: 'ПРИХОД', path: '/' },
        { name: 'ГРУППЫ', path: '/groups' },
        { name: 'ПРОДУКТЫ', path: '/products' },
        { name: 'ПОЛЬЗОВАТЕЛИ', path: '/users' },
        { name: 'НАСТРОЙКИ', path: '/settings' },
    ];

    return (
        <div className="bg-white border-end d-none d-md-flex flex-column justify-content-center align-items-center py-4" style={{ width: '250px', flexShrink: 0, zIndex: 10 }}>
            <div className="position-relative mb-5 text-center">

                <Image
                    src="/assets/img/user.png"
                    alt="Profile"
                    className="rounded-circle shadow-sm"
                    width={100}
                    height={100}
                    objectFit="cover"
                />
                <button
                    className="btn btn-light btn-sm position-absolute rounded-circle shadow"
                    style={{ bottom: '0', right: '0', width: '32px', height: '32px' }}
                >
                    ⚙️
                </button>
            </div>


            <ul className="nav flex-column w-100 text-center">
                {menuItems.map((item, index) => {

                    const isActive = pathname === item.path;

                    return (
                        <li className="nav-item mb-2" key={index}>
                            <Link href={item.path} className="nav-link text-decoration-none sidebar-link">
                                <span className={`fw-bold pb-1 ${isActive ? 'text-success border-bottom border-success' : 'text-dark'}`}>
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
