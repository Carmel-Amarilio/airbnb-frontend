import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutStayNames({ orders }) {
    const [ordersMap, setOrdersMap] = useState({});

    useEffect(() => {
        resetOrderMap();
    }, []);

    function resetOrderMap() {
        const stayNames = [];
        const rep = [];
        orders.forEach((order) => {
            if (!stayNames.includes(order.stay.name)) {
                stayNames.push(order.stay.name);
                rep[rep.length] = 1;
            } else {
                const index = stayNames.indexOf(order.stay.name);
                rep[index]++;
            }
        });
        setOrdersMap({ stayNames, rep });
    }

    const data = {
        labels: ordersMap.stayNames,
        datasets: [
            {
                label: 'Amount of toys',
                data: ordersMap.rep,
                backgroundColor: [
                    'rgb(203, 30, 85)',
                    'rgb(250, 50, 89)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 159, 64)',
                    'rgb(251, 132, 255)',
                    'rgb(134, 132, 255)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
            },
        },
    };

    return (
        <section className='doughnut-toy-labels chart'>
            <h1>Reservations / listing</h1>
            <Doughnut data={data} options={options} />
        </section>
    );
}
