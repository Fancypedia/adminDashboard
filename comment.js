document.addEventListener("DOMContentLoaded", function() {
    // Fungsi untuk mendapatkan data dari API
    async function getDataFromAPI() {
      try {
        const response = await fetch('https://us-central1-testlogin-366704.cloudfunctions.net/getAllcommned');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Fungsi untuk memproses data dan membuat grafik
    async function createCommentChart() {
      const data = await getDataFromAPI();
  
      if (data && data.status && data.data) {
        const commentData = data.data;
  
        const commentCounts = {};
        let totalComments = 0;
  
        commentData.forEach(comment => {
          if (comment.username in commentCounts) {
            commentCounts[comment.username]++;
          } else {
            commentCounts[comment.username] = 1;
          }
          totalComments++;
        });
  
        // Menambahkan jumlah total komentar ke dalam HTML
        const totalCommentsElement = document.getElementById('totalComments');
        totalCommentsElement.textContent = `Total Comments: ${totalComments}`;
  
        // Membuat data untuk grafik
        const labels = Object.keys(commentCounts);
        const series = labels.map(label => commentCounts[label]);
  
        // Konfigurasi grafik menggunakan ApexCharts
        const options = {
          series: [{
            data: series
          }],
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: labels
          }
        };
  
        // Membuat grafik menggunakan ApexCharts
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
      }
    }
  
    // Memanggil fungsi untuk membuat grafik komentar
    createCommentChart();
  });
      