import { NextRequest, NextResponse } from 'next/server';


// eslint-disable-next-line import/prefer-default-export
export async function GET(request: NextRequest) {
    const orders = [
        { id: 1, title: 'Order 1', date: '2017-06-29 12:09:33', description: 'desc' },
        { id: 2, title: 'Order 2', date: '2017-06-29 12:09:33', description: 'desc' },
        { id: 3, title: 'Order 3', date: '2017-06-29 12:09:33', description: 'desc' },
    ];

    const products = [
        {
            id: 1,
            serialNumber: 1234,
            isNew: 1,
            photo: '/assets/img/products/item1.png',
            title: 'Product 1',
            type: 'Monitors',
            specification: 'Specification 1',
            guarantee: { start: '2017-06-29 12:09:33', end: '2022-06-29 12:09:33' },
            price: [
                { value: 100, symbol: 'USD', isDefault: 0 },
                { value: 2600, symbol: 'UAH', isDefault: 1 },
            ],
            order: 1,
            date: '2017-06-29 12:09:33',
        },
        {
            id: 2,
            serialNumber: 5678,
            isNew: 0,
            photo: '/assets/img/products/item2.png',
            title: 'Product 2',
            type: 'Keyboards',
            specification: 'Specification 2',
            guarantee: { start: '2017-08-15 10:00:00', end: '2022-08-15 10:00:00' },
            price: [
                { value: 50, symbol: 'USD', isDefault: 0 },
                { value: 1300, symbol: 'UAH', isDefault: 1 },
            ],
            order: 1,
            date: '2017-08-15 10:00:00',
        },
        {
            id: 3,
            serialNumber: 9012,
            isNew: 1,
            photo: '/assets/img/products/item1.png',
            title: 'Product 3',
            type: 'Monitors',
            specification: 'Specification 2',
            guarantee: { start: '2017-09-12 09:00:00', end: '2022-09-12 09:00:00' },
            price: [
                { value: 200, symbol: 'USD', isDefault: 0 },
                { value: 5200, symbol: 'UAH', isDefault: 1 },
            ],
            order: 2,
            date: '2017-09-12 09:00:00',
        },
    ];


    return NextResponse.json(
        { data:{
            products,orders
            } },
        { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    );
}
