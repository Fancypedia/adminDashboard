document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://us-central1-testlogin-366704.cloudfunctions.net/allprod';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const totalStock = data.reduce((total, item) => total + item.stock, 0);
            const soldStock = 5000 - totalStock;

            const ctx = document.getElementById('barangChart').getContext('2d');

            const barangChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Stock Available', 'Stock Sold', 'Total Stock'],
                    datasets: [{
                        label: 'Stock',
                        data: [totalStock, soldStock, 5000],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(75, 192, 192, 0.6)' // Warna baru untuk jumlah keseluruhan
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(75, 192, 192, 1)' // Warna baru untuk jumlah keseluruhan
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Stock Overview',
                            font: {
                                size: 18
                            }
                        },
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 15,
                                padding: 15
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        animateScale: true
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
