import React from "react";

export const getChartData = (priceHistory) => {
    return {
        labels: ['', '', '', '', '', '',
                 '', '', '', '', '', '',
                 '', '', '', '', '', '',
                 '', '', '', '', '', ''],
        datasets: [{
            data: priceHistory,
            borderCapStyle: 'round',
            borderJoinStyle: 'round',
            backgroundColor: 'rgba(38,132,254, 0)',
            borderColor: 'rgba(65,147,254, 1)',
            borderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 5,
            lineTension: 0.4,
        }]
    };
}

export const getChartOptions = () => {
    return {
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        },
        scales: {
            yAxes: [{
                display: false
            }],
            xAxes: [{
                display: false
            }]
        },
        legend: {
            display: false
        },
        title: {
            display: false
        },
        tooltips: {
            mode: 'x-axis',
            backgroundColor: 'rgba(255,255,255,0.8)',
            titleFontColor: 'rgba(65,147,254, 1)',
            bodyFontColor: 'rgba(65,147,254, 1)',
            displayColors: false,
            caretPadding: 5,
        }
    }
}
