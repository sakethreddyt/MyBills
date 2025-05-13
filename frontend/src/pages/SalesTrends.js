const downloadDataAsCSV = () => {
  let csvContent = 'Date,Sales\n';
  chartData.labels.forEach((label, index) => {
    csvContent += `${label},${chartData.datasets[0].data[index]}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'sales-trends.csv';
  link.click();
};