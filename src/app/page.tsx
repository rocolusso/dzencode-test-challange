'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
interface Price {
    value: number;
    symbol: string;
    isDefault: number;
}

interface Product {
    id: number;
    serialNumber: number;
    isNew: number;
    photo: string;
    title: string;
    type: string;
    specification: string;
    guarantee: { start: string; end: string };
    price: Price[];
    order: number;
    date: string;
}

interface Order {
    id: number;
    title: string;
    date: string;
    description: string;
}

export default function Incomes() {
    const [selectedIncome, setSelectedIncome] = useState<number | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [itemToDelete, setItemToDelete] = useState<{
        id: number;
        itemType: 'order' | 'product';
        name: string;
        subtitle: string;
        photo: string;
    } | null>(null);

    const FALLBACK_IMG = 'https://via.placeholder.com/50';
    const getImageSrc = (photo: string) =>
        photo && (photo.startsWith('http') || photo.startsWith('/')) ? photo : FALLBACK_IMG;

    const handleDelete = () => {
        if (!itemToDelete) return;
        if (itemToDelete.itemType === 'order') {
            setOrders(prev => prev.filter(o => o.id !== itemToDelete.id));
            setProducts(prev => prev.filter(p => p.order !== itemToDelete.id));
            if (selectedIncome === itemToDelete.id) setSelectedIncome(null);
        } else {
            setProducts(prev => prev.filter(p => p.id !== itemToDelete.id));
        }
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

    const formatDate = (dateStr: string) => {
        const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, '0')} / ${months[d.getMonth()]} / ${d.getFullYear()}`;
    };

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

            <div className="d-flex align-items-center mb-4">
                <button className="btn btn-success rounded-circle d-flex align-items-center justify-content-center me-2 me-md-3 shadow-sm" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                    <span className="fs-5">+</span>
                </button>
                <h2 className="mb-0 fs-3 fs-md-2">Приходы / {products.length}</h2>
            </div>

            <div className="row g-3">

                <div className={`${selectedIncome ? "d-none d-md-block col-md-4 col-lg-4" : "col-12"}`}>
                    <div className="d-flex flex-column gap-3">
                        {orders.map((order) => {
                            const orderProducts = products.filter(p => p.order === order.id);
                            return (
                            <div
                                key={order.id}
                                onClick={() => setSelectedIncome(order.id)}
                                className={`card border-0 shadow-sm flex-row align-items-center p-2 p-md-3 cursor-pointer ${selectedIncome === order.id ? 'bg-light' : 'bg-white'}`}
                                style={{ cursor: 'pointer', transition: '0.2s' }}
                            >
                                <div className="border rounded-circle p-2 me-2 me-md-3 d-flex justify-content-center align-items-center bg-light flex-shrink-0" style={{ width: '45px', height: '45px' }}>
                                    <span>📋</span>
                                </div>

                                <div className="me-3 text-center flex-shrink-0">
                                    <div className="fs-5 fw-bold">{orderProducts.length}</div>
                                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>Продукта</div>
                                </div>

                                <div className="flex-grow-1 text-muted d-none d-sm-block" style={{ fontSize: '0.8rem' }}>
                                    <div>{formatDate(order.date)}</div>
                                </div>

                                {!selectedIncome && (
                                    <>
                                        <div className="flex-grow-1 mx-2 mx-md-3 text-dark text-truncate" style={{ maxWidth: '250px' }}>
                                            {order.title}
                                        </div>
                                        <button
                                            className="btn btn-link text-muted p-0 flex-shrink-0"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setItemToDelete({
                                                    id: order.id,
                                                    itemType: 'order',
                                                    name: order.title,
                                                    subtitle: `${formatDate(order.date)} • ${orderProducts.length} продукта`,
                                                    photo: '',
                                                });
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </>
                                )}

                                {selectedIncome === order.id && (
                                    <div className="text-muted ms-2 d-none d-md-block">›</div>
                                )}
                            </div>
                            );
                        })}
                    </div>
                </div>


                {selectedIncome && (
                    <div className="col-12 col-md-8 col-lg-8">
                        <div className="card border-0 shadow-sm p-3 p-md-4 position-relative">

                            <button
                                className="btn btn-sm btn-outline-secondary d-md-none mb-3 w-100"
                                onClick={() => setSelectedIncome(null)}
                            >
                                &larr; Назад к списку
                            </button>

                            <button
                                className="btn-close position-absolute top-0 end-0 m-3 bg-light rounded-circle p-2 shadow-sm d-none d-md-block"
                                onClick={() => setSelectedIncome(null)}
                            ></button>

                            <h4 className="mb-4 pe-md-4 fs-5 fs-md-4">{orders.find(o => o.id === selectedIncome)?.title}</h4>

                            <div className="d-flex align-items-center mb-3 cursor-pointer text-success">
                                <span className="bg-success text-white rounded-circle d-inline-flex justify-content-center align-items-center me-2 flex-shrink-0" style={{ width: '24px', height: '24px' }}>+</span>
                                <span>Добавить продукт</span>
                            </div>

                            <div className="d-flex flex-column gap-2 mt-2">
                                {products.filter(p => p.order === selectedIncome).map((product) => (
                                    <div key={product.id} className="d-flex align-items-center p-2 border-top gap-3">
                                        <span className={`flex-shrink-0 ${product.isNew ? 'text-success' : 'text-secondary'}`}>●</span>

                                        <Image
                                            src={getImageSrc(product.photo)}
                                            alt="product"
                                            className="border rounded flex-shrink-0"
                                            width={40}
                                            height={40}
                                            style={{ objectFit: 'cover' }}
                                        />

                                        <div className="flex-grow-1" style={{ minWidth: 0 }}>
                                            <div className="text-dark" style={{ fontSize: '0.95rem' }}>{product.title}</div>
                                            <div className="text-muted" style={{ fontSize: '0.8rem' }}>SN: {product.serialNumber}</div>
                                        </div>

                                        <div className={`flex-shrink-0 ms-auto ${product.isNew ? 'text-success' : 'text-secondary'}`} style={{ fontSize: '0.85rem' }}>
                                            {product.isNew ? 'Свободен' : 'Занят'}
                                        </div>

                                        <button
                                            className="btn btn-link text-muted p-0 ms-auto ms-sm-2 flex-shrink-0"
                                            onClick={() => setItemToDelete({
                                                id: product.id,
                                                itemType: 'product',
                                                name: product.title,
                                                subtitle: `SN: ${product.serialNumber}`,
                                                photo: product.photo,
                                            })}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>


            {itemToDelete && (
                <>
                    <div className="modal-backdrop bg-secondary opacity-75" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1040 }}></div>

                    <div className="modal d-block px-3" tabIndex={-1} style={{ zIndex: 1050, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '600px', height: 'auto' }}>
                        <div className="modal-dialog modal-dialog-centered w-100 mx-auto" style={{ margin: '0' }}>
                            <div className="modal-content border-0 shadow-lg rounded-3 w-100">

                                <div className="modal-header border-0 pb-0 position-relative">

                                    <h5 className="modal-title fw-bold pe-4">Вы уверены, что хотите удалить этот {itemToDelete.itemType === 'order' ? 'приход' : 'продукт'}?</h5>
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

                                            <div className="text-dark text-truncate" style={{ fontSize: '0.9rem' }}>{itemToDelete.name}</div>
                                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>{itemToDelete.subtitle}</div>
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
