export default function MedicalInsights() {
  return (
    <div className="page-content">
      <section className="section white">
        <div className="container">
          <a href="#/" className="back-button">← Back to Home</a>
          <h1>AI-Driven Medical Insights</h1>
          <p className="lead">
            AI-powered diagnostic support and treatment recommendations based on comprehensive clinical data analysis and machine learning algorithms.
          </p>
          
          <div className="content-grid">
            <div className="content-block">
              <h3>Diagnostic Support</h3>
              <p>AI algorithms analyze medical images, lab results, and patient histories to provide diagnostic suggestions, reducing misdiagnosis rates and improving patient outcomes.</p>
            </div>
            
            <div className="content-block">
              <h3>Treatment Optimization</h3>
              <p>Personalized treatment recommendations based on patient-specific data, genetic profiles, and historical treatment outcomes to maximize therapeutic effectiveness.</p>
            </div>
            
            <div className="content-block">
              <h3>Clinical Decision Support</h3>
              <p>Real-time clinical decision support tools that help healthcare providers make informed decisions faster, reducing medical errors and improving care quality.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
