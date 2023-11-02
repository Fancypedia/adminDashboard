// All javascript code in this project for now is just for demo DON'T RELY ON IT

const random = (max = 100) => {
  return Math.round(Math.random() * max) + 20
}

const randomData = () => {
  return [
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
    random(),
  ]
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const cssColors = (color) => {
  return getComputedStyle(document.documentElement).getPropertyValue(color)
}

const getColor = () => {
  return window.localStorage.getItem('color') ?? 'cyan'
}

const colors = {
  primary: cssColors(`--color-${getColor()}`),
  primaryLight: cssColors(`--color-${getColor()}-light`),
  primaryLighter: cssColors(`--color-${getColor()}-lighter`),
  primaryDark: cssColors(`--color-${getColor()}-dark`),
  primaryDarker: cssColors(`--color-${getColor()}-darker`),
}

// Mengambil data dari API
fetch('https://us-central1-testlogin-366704.cloudfunctions.net/allprod')
  .then(response => response.json())
  .then(data => {
    // Mengubah data API sesuai kebutuhan untuk grafik
    const products = data.map(item => ({
      name: item.name,
      price: item.price,
      stock: item.stock,
    }));

    // Mengambil label dan value dari data produk
    const productNames = products.map(product => product.name);
    const productPrices = products.map(product => product.price);

    // Membuat grafik Bar Chart dengan data yang sudah diambil
   new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [
          {
            data: productPrices,
            backgroundColor: colors.primary,
            hoverBackgroundColor: colors.primaryDark,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              gridLines: false,
              ticks: {
                beginAtZero: true,
                stepSize: 50,
                fontSize: 12,
                fontColor: '#97a4af',
                fontFamily: 'Open Sans, sans-serif',
                padding: 10,
              },
            },
          ],
          xAxes: [
            {
              gridLines: false,
              ticks: {
                fontSize: 12,
                fontColor: '#97a4af',
                fontFamily: 'Open Sans, sans-serif',
                padding: 5,
              },
              categoryPercentage: 0.5,
              maxBarThickness: '10',
            },
          ],
        },
        cornerRadius: 2,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      },
    });
  })
  .catch(error => {
    console.error('Ada masalah saat mengambil data:', error);
    // Tindakan penanganan kesalahan jika diperlukan
  });


fetch('https://asia-southeast2-annular-hexagon-401501.cloudfunctions.net/getAlluser')
.then(response => response.json())
.then(data => {
  const labels = data.map(entry => entry.username);
  const values = data.map(entry => entry.password.length);
  new Chart(document.getElementById('doughnutChart'), {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)', // Warna pertama
            'rgba(54, 162, 235, 0.7)', // Warna kedua
            'rgba(255, 206, 86, 0.7)' // Warna ketiga
            // ...Tambahkan warna lebih banyak jika diperlukan
          ],
          hoverBackgroundColor: 'lightblue', // Warna saat hover (ganti sesuai kebutuhan)
          borderWidth: 0,
          weight: 0.5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  });
})
.catch(error => {
  console.error('Ada masalah saat mengambil data:', error);
  // Tindakan penanganan kesalahan jika diperlukan
});

// Mengambil data dari API
fetch('https://us-central1-testlogin-366704.cloudfunctions.net/getAllcommned')
  .then(response => response.json())
  .then(data => {
    // Mengubah data API sesuai kebutuhan untuk grafik
    const comments = data.data.map(item => ({
      username: item.username,
      commentLength: item.comment.length, // Menggunakan panjang komentar sebagai contoh data grafik
    }));

    // Mengambil label dan value dari data komentar
    const usernames = comments.map(comment => comment.username);
    const commentLengths = comments.map(comment => comment.commentLength);

    // Membuat grafik Bar Chart dengan data yang sudah diambil
    new Chart(document.getElementById('activeUsersChart'), {
      type: 'bar',
      data: {
        labels: usernames,
        datasets: [
          {
            data: commentLengths,
            backgroundColor: colors.primary,
            borderWidth: 0,
            categoryPercentage: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              display: false,
              gridLines: false,
            },
          ],
          xAxes: [
            {
              display: false,
              gridLines: false,
            },
          ],
          ticks: {
            padding: 10,
          },
        },
        cornerRadius: 2,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          prefix: 'Users',
          bodySpacing: 4,
          footerSpacing: 4,
          hasIndicator: true,
          mode: 'index',
          intersect: true,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
      },
    });
  })
  .catch(error => {
    console.error('Ada masalah saat mengambil data:', error);
    // Tindakan penanganan kesalahan jika diperlukan
  });


// Mengambil data dari API
fetch('https://asia-southeast2-testlogin-366704.cloudfunctions.net/bismillahcontentall')
  .then(response => response.json())
  .then(data => {
    // Mengubah data API sesuai kebutuhan untuk grafik
    const contents = data.map(item => ({
      ID: item.ID,
      content: item.content.length, // Menyesuaikan contoh penggunaan panjang konten sebagai data grafik
    }));

    // Mengambil label dan value dari data konten
    const contentIDs = contents.map(content => content.ID);
    const contentLengths = contents.map(content => content.content);

    // Membuat grafik Line Chart dengan data yang sudah diambil
     new Chart(document.getElementById('lineChart'), {
      type: 'line',
      data: {
        labels: contentIDs,
        datasets: [
          {
            data: contentLengths,
            fill: false,
            borderColor: colors.primary,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: false,
              ticks: {
                beginAtZero: false,
                stepSize: 50,
                fontSize: 12,
                fontColor: '#97a4af',
                fontFamily: 'Open Sans, sans-serif',
                padding: 20,
              },
            },
          ],
          xAxes: [
            {
              gridLines: false,
            },
          ],
        },
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          hasIndicator: true,
          intersect: false,
        },
      },
    });
  })
  .catch(error => {
    console.error('Ada masalah saat mengambil data:', error);
    // Tindakan penanganan kesalahan jika diperlukan
  });


let randomUserCount = 0

const usersCount = document.getElementById('usersCount')

const fakeUsersCount = () => {
  randomUserCount = random()
  activeUsersChart.data.datasets[0].data.push(randomUserCount)
  activeUsersChart.data.datasets[0].data.splice(0, 1)
  activeUsersChart.update()
  usersCount.innerText = randomUserCount
}

setInterval(() => {
  fakeUsersCount()
}, 1000)
