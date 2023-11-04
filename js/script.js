fetch('https://asia-southeast2-annular-hexagon-401501.cloudfunctions.net/getAlluser')
  .then(response => response.json())
  .then(data => {
    const usernameCounts = data.reduce((count, { username }) => {
      count[username] = (count[username] || 0) + 1;
      return count;
    }, {});

    const labels = Object.keys(usernameCounts);
    const counts = Object.values(usernameCounts);

    // Hitung jumlah keseluruhan
    const totalUsers = counts.reduce((total, count) => total + count, 0);

    // Menambahkan persentase dari total keseluruhan
    const percentages = counts.map(count => ((count / totalUsers) * 100).toFixed(2) + '%');

    const barChartData = {
      labels: labels.concat(['Total']),
      datasets: [
        {
          label: 'Username Counts',
          data: counts.concat([totalUsers]),
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)', // Warna batang
          ],
        },
      ],
    };

    // Menampilkan grafik
    const barChartContext = document.getElementById('barChart').getContext('2d');
    new Chart(barChartContext, {
      type: 'bar',
      data: barChartData,
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false, // Menyembunyikan legenda karena hanya satu data
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                if (context.parsed.y !== totalUsers) {
                  return `Users: ${context.parsed.y} (${percentages[context.dataIndex]})`;
                } else {
                  return `Total Users: ${context.parsed.y}`;
                }
              },
            },
          },
        },
      },
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Tangani error di sini
  });
