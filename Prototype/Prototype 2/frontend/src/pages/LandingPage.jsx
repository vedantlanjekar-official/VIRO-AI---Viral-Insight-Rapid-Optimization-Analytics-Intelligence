import { useNavigate } from 'react-router-dom';
import { Activity, Zap, Beaker, TrendingUp, Shield, Database, ArrowRight, Check, FlaskConical } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Activity className="h-8 w-8 text-blue-600" />,
      title: 'Mutation Prediction',
      description: 'Predict next viral mutations with 87% confidence using advanced ML algorithms.',
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Deadliness Assessment',
      description: 'Comprehensive risk scoring based on transmissibility, severity, and mortality.',
    },
    {
      icon: <Beaker className="h-8 w-8 text-blue-600" />,
      title: 'Drug Discovery',
      description: 'Rank 190+ antiviral compounds by binding affinity and effectiveness.',
    },
    {
      icon: <FlaskConical className="h-8 w-8 text-blue-600" />,
      title: '3D Visualization',
      description: 'Interactive molecular viewer showing drug-protein interactions in 3D.',
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: 'AI Modifications',
      description: 'Get AI-suggested chemical modifications to improve drug efficacy.',
    },
    {
      icon: <Database className="h-8 w-8 text-blue-600" />,
      title: 'Clinical Insights',
      description: 'Predict symptoms, complications, and clinical outcomes.',
    },
  ];

  const projectCards = [
    {
      title: 'Fight COVID-19',
      virus: 'SARS-CoV-2',
      description: 'Track Omicron variants, predict mutations, and find effective treatments.',
      deadliness: 68,
      icon: '🦠',
      color: 'from-red-50 to-red-100',
      borderColor: 'border-red-300',
    },
    {
      title: 'Combat Influenza',
      virus: 'Influenza',
      description: 'Seasonal flu analysis, vaccine effectiveness, and mutation tracking.',
      deadliness: 45,
      icon: '🤧',
      color: 'from-yellow-50 to-yellow-100',
      borderColor: 'border-yellow-300',
    },
    {
      title: 'Contain Ebola',
      virus: 'Ebola',
      description: 'Outbreak prediction, treatment optimization, and risk assessment.',
      deadliness: 82,
      icon: '☣️',
      color: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-300',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Upload Data',
      description: 'Upload virus sequence (FASTA) or choose from our database of supported viruses.',
      icon: <Database className="h-6 w-6" />,
    },
    {
      step: '2',
      title: 'AI Analysis',
      description: 'Our ML models analyze mutation patterns, binding affinities, and clinical data.',
      icon: <Activity className="h-6 w-6" />,
    },
    {
      step: '3',
      title: 'Get Results',
      description: 'Receive comprehensive 7-section report with predictions and recommendations.',
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      step: '4',
      title: 'Export & Share',
      description: 'Download results as PDF/CSV and share with your research team.',
      icon: <Zap className="h-6 w-6" />,
    },
  ];

  const stats = [
    { label: 'Antiviral Compounds', value: '190+' },
    { label: 'Viruses Supported', value: '3' },
    { label: 'Predictions Run', value: '10K+' },
    { label: 'Accuracy Rate', value: '95%' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b-2 border-blue-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-blue-600">Viro-AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="btn-outline text-sm px-4 py-2"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="btn-primary text-sm px-4 py-2"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32 relative overflow-hidden">
        {/* DNA Pattern Background */}
        <div className="absolute inset-0 bg-dna-pattern opacity-30"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white border-2 border-blue-300 rounded-full px-4 py-2 mb-8 shadow-sm">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">AI-Powered Viral Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Predict Mutations,
              <br />
              <span className="text-blue-600">Discover Cures</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Advanced machine learning platform for viral threat assessment, mutation prediction, and drug discovery. Get comprehensive insights in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => navigate('/signup')}
                className="btn-primary flex items-center space-x-2 px-8 py-4 text-lg"
              >
                <span>Start Analysis</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn-secondary px-8 py-4 text-lg"
              >
                View Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative DNA Helix */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-10">
          <svg width="200" height="100" viewBox="0 0 200 100" className="text-blue-600">
            <path d="M0,50 Q50,20 100,50 T200,50" stroke="currentColor" strokeWidth="4" fill="none" />
            <path d="M0,50 Q50,80 100,50 T200,50" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive viral analysis toolkit powered by cutting-edge machine learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card group hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps to comprehensive viral analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {step.step}
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200">
                      <ArrowRight className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                    </div>
                  )}
                </div>
                <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                  <div className="flex items-center justify-center text-blue-600 mb-3">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Cards Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Supported Viruses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Analyze and predict outcomes for major viral threats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectCards.map((project, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${project.color} border-2 ${project.borderColor} rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="text-5xl mb-4">{project.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <div className="badge-blue mb-4">{project.virus}</div>
                <p className="text-gray-700 mb-6">{project.description}</p>
                
                {/* Deadliness Score */}
                <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Deadliness Score</span>
                    <span className="text-lg font-bold text-gray-900">{project.deadliness}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        project.deadliness >= 70 ? 'bg-red-500' : 
                        project.deadliness >= 50 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${project.deadliness}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => navigate('/signup')}
                  className="w-full mt-6 btn-primary flex items-center justify-center space-x-2"
                >
                  <span>Analyze Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Viro-AI?</h2>
              <p className="text-xl text-blue-100">
                Built for researchers, by researchers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Real-time mutation prediction with 87% accuracy',
                'Comprehensive 7-section analysis reports',
                '190+ pre-validated antiviral compounds',
                'Interactive 3D molecular visualization',
                'AI-suggested drug modifications',
                'Export to PDF, CSV, and JSON formats',
                'Cloud-based result storage',
                'Fast predictions under 2 seconds',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-blue-500 rounded-full p-1 mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-blue-50">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="card-grey text-center max-w-3xl mx-auto py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Analyzing?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join researchers worldwide using Viro-AI for viral threat intelligence
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/signup')}
                className="btn-primary px-8 py-4 text-lg flex items-center space-x-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn-outline px-8 py-4 text-lg"
              >
                Explore Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t-2 border-blue-200 py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">Viro-AI</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-600 mb-1">Viro-AI v1.0 - Drug-Virus Binding Affinity Prediction</p>
              <p className="text-sm text-gray-500">For research and educational purposes only</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;


