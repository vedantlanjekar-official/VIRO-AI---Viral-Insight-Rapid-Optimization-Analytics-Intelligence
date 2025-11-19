import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function DeadlinessChart({ deadlinessScore }) {
  const data = {
    labels: ['Transmissibility', 'Immune Evasion', 'Mortality Rate', 'Infection Severity'],
    datasets: [
      {
        label: 'Risk Factors',
        data: [
          deadlinessScore.transmissibility,
          deadlinessScore.immune_evasion,
          deadlinessScore.mortality_rate,
          deadlinessScore.infection_severity
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: function(value) {
            return value;
          }
        },
        pointLabels: {
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed.r}/100`;
          }
        }
      }
    }
  };

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <Radar data={data} options={options} />
    </div>
  );
}

export default DeadlinessChart;

