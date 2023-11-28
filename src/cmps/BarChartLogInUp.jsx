import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { utilService } from '../services/util.service';

export function BarChartLogInUp({ orders }) {
    const [ordersMap, setOrdersMap] = useState({});

    useEffect(() => {
        resetOrderMap();
    }, []);

    function resetOrderMap() {
        const orderDates = [];
        const rep = [];
        orders.forEach((order) => {
            const date = formatDate(order.checkIn);
            if (!orderDates.includes(date)) {
                orderDates.push(date);
                rep[rep.length] = 1;
            } else {
                const index = orderDates.indexOf(date);
                rep[index]++;
            }
        });
        setOrdersMap({ orderDates, rep });
    }

    function formatDate(date) {
        return new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(new Date(date));
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const backgroundColors = [
        'rgb(203, 30, 85)',
        'rgb(250, 50, 89)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(251, 132, 255)',
        'rgb(134, 132, 255)',
    ];

    const data = {
        labels: ordersMap.orderDates,
        datasets: [
            {
                label: 'Month',
                data: ordersMap.rep,
                backgroundColor: backgroundColors,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <section className='bar-chart-logInUp chart'>
             <h1>Revenue / month</h1>
            <Bar data={data} options={options} />
        </section>
    );
}



