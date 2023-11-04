fetch('https://asia-southeast2-testlogin-366704.cloudfunctions.net/bismillahcontentall')
  .then(response => response.json())
  .then(data => {
    // Show data in table
    const dataRows = document.getElementById('dataRows');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="border p-2">${item.ID}</td>
        <td class="border p-2">${item.content}</td>
        <td class="border p-2">${item.image}</td>
        <td class="border p-2">${item.description}</td>
      `;
      dataRows.appendChild(row);
    });

    // Generate unique ID counts for bar chart
    const idCounts = data.reduce((acc, { ID }) => {
      acc[ID] = (acc[ID] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(idCounts);
    const counts = Object.values(idCounts);

    new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'ID Counts',
            data: counts,
            backgroundColor: 'rgba(54, 162, 235, 0.7)', // Bar color
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Handle errors here
  });
