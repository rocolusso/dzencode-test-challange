'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {Price , Product, Order, Guarantee} from './../../../lib/utils'


function formatDate(dateStr: string): string {
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')} / ${months[d.getMonth()]} / ${d.getFullYear()}`;
}

function getPrice(prices: Price[], symbol: string): string {
    const p = prices.find(p => p.symbol === symbol);
    return p ? `${p.value.toLocaleString()} ${p.symbol}` : '—';
}

export default function Products() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('All');
    const [selectedSpec, setSelectedSpec] = useState('All');
    const [itemToDelete, setItemToDelete] = useState<{
        id: number;
        title: string;
        serialNumber: number;
        photo: string;
    } | null>(null);

    const FALLBACK_IMG = 'https://via.placeholder.com/50';
    const getImageSrc = (photo: string) =>
        photo && (photo.startsWith('http') || photo.startsWith('/')) ? photo : FALLBACK_IMG;

    const handleDelete = () => {
        if (!itemToDelete) return;
        setProducts(prev => prev.filter(p => p.id !== itemToDelete.id));
        setItemToDelete(null);
    };

    useEffect(() => {
        fetch('/api/data')
            .then(res => res.json())
            .then(json => {
                setOrders(json.data.orders);
                setProducts(json.data.products);
            })
            .finally(() => setLoading(false));
    }, []);

    const uniqueTypes = [...new Set(products.map(p => p.type))];
    const uniqueSpecs = [...new Set(products.map(p => p.specification))];

    const filteredProducts = products.filter((product) => {
        const matchType = selectedType === 'All' || product.type === selectedType;
        const matchSpec = selectedSpec === 'All' || product.specification === selectedSpec;
        return matchType && matchSpec;
    });

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid px-0">
            <div className="d-flex flex-column flex-md-row align-items-md-center mb-4 gap-3">
                <h2 className="mb-0 fs-3 fs-md-2 me-md-4">
                    Продукты / {filteredProducts.length}
                </h2>

                <div className="d-flex flex-wrap gap-3 align-items-center">
                    <div className="d-flex align-items-center">
                        <label className="text-muted small me-2 flex-shrink-0">Тип:</label>
                        <select
                            className="form-select form-select-sm shadow-sm border-0"
                            style={{ minWidth: '150px' }}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="All">Все типы</option>
                            {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div className="d-flex align-items-center">
                        <label className="text-muted small me-2 flex-shrink-0">Спецификация:</label>
                        <select
                            className="form-select form-select-sm shadow-sm border-0"
                            style={{ minWidth: '150px' }}
                            value={selectedSpec}
                            onChange={(e) => setSelectedSpec(e.target.value)}
                        >
                            <option value="All">Все спецификации</option>
                            {uniqueSpecs.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column gap-2">
                {filteredProducts.length === 0 ? (
                    <div className="text-center text-muted p-5 bg-white rounded-3 shadow-sm">
                        Продукты с такими параметрами не найдены.
                    </div>
                ) : (
                    filteredProducts.map((item) => {
                        const isFree = item.isNew === 1;
                        const orderTitle = orders.find(o => o.id === item.order)?.title ?? '—';
                        return (
                            <div key={item.id} className="card border-0 shadow-sm p-3 bg-white rounded-3">
                                <div className="d-flex flex-wrap flex-xl-nowrap align-items-center gap-3 gap-xl-4 w-100">

                                    <div className="d-flex align-items-center flex-shrink-0">
                                        <span className={`me-3 fs-5 ${isFree ? 'text-success' : 'text-secondary'}`}>●</span>
                                        <Image
                                                src={getImageSrc(item.photo)}
                                                alt="product"
                                                className="border rounded"
                                                width={50}
                                                height={50}
                                                style={{ objectFit: 'cover' }}
                                            />
                                    </div>

                                    <div className="flex-grow-1 min-w-0" style={{ minWidth: '150px' }}>
                                        <div className="text-dark text-truncate text-decoration-underline" style={{ fontSize: '0.95rem', cursor: 'pointer' }}>
                                            {item.title}
                                        </div>
                                        <div className="text-muted mt-1" style={{ fontSize: '0.8rem' }}>
                                            SN: {item.serialNumber}
                                        </div>
                                    </div>

                                    <div className={`flex-shrink-0 ${isFree ? 'text-success' : 'text-dark'}`} style={{ width: '80px', fontSize: '0.9rem' }}>
                                        {isFree ? 'свободен' : 'занят'}
                                    </div>

                                    <div className="flex-shrink-0 text-muted d-none d-sm-block" style={{ fontSize: '0.8rem', width: '120px' }}>
                                        <div><small>с</small> {formatDate(item.guarantee.start)}</div>
                                        <div><small>по</small> {formatDate(item.guarantee.end)}</div>
                                    </div>

                                    <div className="flex-shrink-0 d-none d-md-block" style={{ fontSize: '0.9rem' }}>
                                        {isFree ? 'новый' : 'б/у'}
                                    </div>

                                    <div className="flex-shrink-0 text-md-end" style={{ minWidth: '120px' }}>
                                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>{getPrice(item.price, 'USD')}</div>
                                        <div className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{getPrice(item.price, 'UAH')}</div>
                                    </div>

                                    <div className="flex-grow-1 min-w-0 d-none d-lg-block" style={{ maxWidth: '200px' }}>
                                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>Спецификация</div>
                                        <div className="text-dark text-truncate" style={{ fontSize: '0.9rem' }}>
                                            {item.specification}
                                        </div>
                                    </div>

                                    <div className="flex-grow-1 min-w-0 d-none d-lg-block" style={{ maxWidth: '200px' }}>
                                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>Приход</div>
                                        <div className="text-dark text-truncate text-decoration-underline" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                                            {orderTitle}
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0 text-muted text-end d-none d-xl-block" style={{ fontSize: '0.8rem' }}>
                                        <div>{formatDate(item.date)}</div>
                                    </div>

                                    <button
                                        className="btn btn-link text-muted p-0 ms-auto flex-shrink-0 align-self-start align-self-xl-center"
                                        onClick={() => setItemToDelete({ id: item.id, title: item.title, serialNumber: item.serialNumber, photo: item.photo })}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            {itemToDelete && (
                <>
                    <div className="modal-backdrop bg-secondary opacity-75" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1040 }}></div>

                    <div className="modal d-block px-3" tabIndex={-1} style={{ zIndex: 1050, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', height: 'auto' }}>
                        <div className="modal-dialog modal-dialog-centered w-100 mx-auto" style={{ margin: '0' }}>
                            <div className="modal-content border-0 shadow-lg rounded-3 w-100">

                                <div className="modal-header border-0 pb-0 position-relative">
                                    <h5 className="modal-title fw-bold pe-4">Вы уверены, что хотите удалить этот продукт?</h5>
                                    <button type="button" className="btn-close position-absolute top-0 end-0 m-2 bg-white shadow-sm rounded-circle" onClick={() => setItemToDelete(null)}></button>
                                </div>

                                <div className="modal-body py-3 py-md-4">
                                    <div className="d-flex align-items-center">
                                        <span className="text-success me-2 me-md-3 d-none d-sm-block">●</span>
                                        <Image
                                                src={getImageSrc(itemToDelete.photo)}
                                                alt="thumbnail"
                                                className="border rounded me-2 me-md-3 flex-shrink-0"
                                                width={40}
                                                height={40}
                                                style={{ objectFit: 'cover' }}
                                            />
                                        <div className="min-w-0">
                                            <div className="text-dark text-truncate" style={{ fontSize: '0.9rem' }}>{itemToDelete.title}</div>
                                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>SN: {itemToDelete.serialNumber}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer bg-success border-0 d-flex flex-column flex-sm-row justify-content-end rounded-bottom gap-2 gap-sm-3" style={{ padding: '1rem 1.5rem' }}>
                                    <button type="button" className="btn text-white fw-bold text-uppercase w-100 w-sm-auto" onClick={() => setItemToDelete(null)}>
                                        Отменить
                                    </button>
                                    <button type="button" className="btn btn-light text-danger fw-bold rounded-pill px-4 shadow-sm d-flex align-items-center justify-content-center w-100 w-sm-auto" onClick={handleDelete}>
                                        <span className="me-2">🗑️</span> УДАЛИТЬ
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
