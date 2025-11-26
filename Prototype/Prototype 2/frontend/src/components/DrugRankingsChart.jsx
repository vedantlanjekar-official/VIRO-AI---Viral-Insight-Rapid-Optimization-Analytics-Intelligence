import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DrugRankingsChart({ candidates }) {
  // Take top 10 and sort by affinity
  const topCandidates = candidates.slice(0, 10);

  const data = {
    labels: topCandidates.map(drug => drug.drug_name),
    datasets: [
      {
        label: 'Predicted Affinity Score',
        data: topCandidates.map(drug => drug.predicted_affinity * 100),
        backgroundColor: topCandidates.map((_, index) => {
          // Gradient from blue to purple based on ranking
          const hue = 220 - (index * 15); // From blue (220) to purple
          return `hsla(${hue}, 70%, 55%, 0.8)`;
        }),
        borderColor: topCandidates.map((_, index) => {
          const hue = 220 - (index * 15);
          return `hsla(${hue}, 70%, 45%, 1)`;
        }),
        borderWidth: 2,
        borderRadius: 6
      }
    ]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const drug = topCandidates[context.dataIndex];
            return [
              `Affinity: ${context.parsed.x.toFixed(1)}%`,
              `IC50: ${drug.estimated_ic50_nm.toFixed(1)} nM`,
              `Binding: ${drug.binding_strength}`
            ];
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Predicted Affinity Score (%)'
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default DrugRankingsChart;

