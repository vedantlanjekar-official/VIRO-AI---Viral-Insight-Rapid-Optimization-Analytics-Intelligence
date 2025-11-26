import { useState } from 'react';

export default function ReportsPanel() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reports = [
    {
      id: 1,
      title: "Viral Mutation Analysis - September 2025",
      type: "Monthly Report",
      date: "2025-09-27",
      status: "Published",
      size: "2.4 MB",
      downloads: 1247,
      summary: "Comprehensive analysis of viral mutations detected in the past month, including emergence patterns and geographic distribution."
    },
    {
      id: 2,
      title: "Antidote Efficacy Assessment Q3 2025",
      type: "Quarterly Report",
      date: "2025-09-15",
      status: "Published",
      size: "5.1 MB",
      downloads: 892,
      summary: "Detailed evaluation of antidote candidates, clinical trial results, and effectiveness metrics across different viral strains."
    },
    {
      id: 3,
      title: "Global Surveillance Weekly Brief",
      type: "Weekly Report",
      date: "2025-09-25",
      status: "Published",
      size: "856 KB",
      downloads: 2156,
      summary: "Latest surveillance data from global monitoring networks, including new variant detections and outbreak alerts."
    },
    {
      id: 4,
      title: "Machine Learning Predictions Update",
      type: "Technical Report",
      date: "2025-09-20",
      status: "Draft",
      size: "3.7 MB",
      downloads: 0,
      summary: "Updated ML model predictions for viral evolution, including confidence intervals and validation metrics."
    },
    {
      id: 5,
      title: "Protein Structure Analysis Report",
      type: "Research Report",
      date: "2025-09-18",
      status: "Under Review",
      size: "4.2 MB",
      downloads: 0,
      summary: "In-depth structural analysis of key viral proteins, binding site predictions, and therapeutic target identification."
    }
  ];

  const reportMetrics = {
    monthly: {
      totalReports: 12,
      totalDownloads: 15420,
      avgSize: "2.8 MB",
      lastUpdated: "2025-09-27"
    },
    quarterly: {
      totalReports: 4,
      totalDownloads: 8950,
      avgSize: "4.1 MB",
      lastUpdated: "2025-09-15"
    },
    weekly: {
      totalReports: 52,
      totalDownloads: 67890,
      avgSize: "1.2 MB",
      lastUpdated: "2025-09-25"
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return '#4ecdc4';
      case 'Draft': return '#ffd93d';
      case 'Under Review': return '#ff9f43';
      default: return '#ccc';
    }
  };

  return (
    <div className="panel-body">
      <div className="reports-header" style={{marginBottom: '20px'}}>
        <h3>Research Reports</h3>
        <p>Generate, access, and manage research reports and analytics</p>
      </div>

      {/* Report Metrics */}
      <div className="metrics-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '25px'
      }}>
        {Object.entries(reportMetrics).map(([period, metrics]) => (
          <div
            key={period}
            onClick={() => setSelectedPeriod(period)}
            style={{
              padding: '15px',
              border: selectedPeriod === period ? '2px solid #4ecdc4' : '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: selectedPeriod === period ? '#4ecdc420' : '#fff',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            <div style={{fontSize: '12px', color: '#666', textTransform: 'capitalize', marginBottom: '8px'}}>
              {period} Reports
            </div>
            <div style={{fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '5px'}}>
              {metrics.totalReports}
            </div>
            <div style={{fontSize: '11px', color: '#666'}}>
              {metrics.totalDownloads} downloads
            </div>
          </div>
        ))}
      </div>

      {/* Generate New Report */}
      <div style={{
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px'}}>
          <span style={{fontSize: '20px'}}>📝</span>
          <div>
            <strong style={{fontSize: '14px'}}>Generate New Report</strong>
            <div style={{fontSize: '12px', color: '#666'}}>Create custom reports based on current data</div>
          </div>
        </div>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#4ecdc4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            🦠 Mutation Report
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#6bcf7f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            💊 Drug Analysis
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#ff9f43',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            📊 Statistical Summary
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="reports-list">
        <h4 style={{marginBottom: '15px', color: '#333'}}>Recent Reports</h4>
        {reports.map(report => (
          <div key={report.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '10px',
            backgroundColor: '#fff'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px'}}>
              <div style={{flex: 1}}>
                <h5 style={{color: '#333', margin: '0 0 5px 0', fontSize: '14px'}}>
                  {report.title}
                </h5>
                <div style={{display: 'flex', gap: '15px', fontSize: '11px', color: '#666', marginBottom: '8px'}}>
                  <span>{report.type}</span>
                  <span>{report.date}</span>
                  <span>{report.size}</span>
                  {report.status === 'Published' && (
                    <span>{report.downloads} downloads</span>
                  )}
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span style={{
                  padding: '3px 8px',
                  backgroundColor: getStatusColor(report.status),
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  {report.status}
                </span>
              </div>
            </div>
            
            <p style={{fontSize: '12px', color: '#555', lineHeight: '1.4', marginBottom: '10px'}}>
              {report.summary}
            </p>
            
            <div style={{display: 'flex', gap: '8px'}}>
              {report.status === 'Published' && (
                <>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#4ecdc4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}>
                    📥 Download
                  </button>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#6bcf7f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}>
                    👁️ Preview
                  </button>
                </>
              )}
              {report.status === 'Draft' && (
                <button style={{
                  padding: '6px 12px',
                  backgroundColor: '#ffd93d',
                  color: '#666',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}>
                  ✏️ Edit Draft
                </button>
              )}
              <button style={{
                padding: '6px 12px',
                backgroundColor: '#f8f9fa',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer'
              }}>
                📋 Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Export Options */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{marginBottom: '10px'}}>
          <strong style={{fontSize: '14px'}}>📤 Bulk Export Options</strong>
        </div>
        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
          <button style={{
            padding: '6px 12px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            Export as PDF
          </button>
          <button style={{
            padding: '6px 12px',
            backgroundColor: '#4ecdc4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            Export as CSV
          </button>
          <button style={{
            padding: '6px 12px',
            backgroundColor: '#6bcf7f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}>
            Create Archive
          </button>
        </div>
      </div>
    </div>
  );
}
