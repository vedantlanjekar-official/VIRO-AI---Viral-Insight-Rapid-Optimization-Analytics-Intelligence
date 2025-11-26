import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, TrendingUp, Zap, Database, Activity, DollarSign, Dna, Microscope, FlaskConical, Brain, Sparkles, BarChart3, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    role: '',
    message: ''
  });

  const problems = [
    {
      icon: TrendingUp,
      title: 'Unpredictable Viral Mutations',
      description: 'Viruses evolve rapidly, so VIRO-AI predicts future mutations before they appear.',
      color: 'text-red-600'
    },
    {
      icon: Zap,
      title: 'Slow Drug & Vaccine Development',
      description: 'Traditional development is too slow, so VIRO-AI accelerates antidote discovery using AI models.',
      color: 'text-orange-600'
    },
    {
      icon: Shield,
      title: 'Clinical Trial Risk & Ethical Issues',
      description: 'Early human testing is dangerous, so VIRO-AI simulates drug effects virtually to reduce fatalities.',
      color: 'text-green-600'
    },
    {
      icon: Database,
      title: 'Fragmented Genomic & Clinical Data',
      description: 'Biological data is scattered, so VIRO-AI integrates all datasets into a unified computational pipeline.',
      color: 'text-purple-600'
    },
    {
      icon: Activity,
      title: 'Poor Outbreak Forecasting',
      description: 'Current systems react late, so VIRO-AI predicts outbreaks using mutation-aware epidemiological models.',
      color: 'text-yellow-600'
    },
    {
      icon: DollarSign,
      title: 'High Cost & Low Accessibility of Bioinformatics',
      description: 'Advanced simulations need expensive infrastructure, so VIRO-AI provides scalable GPU-cloud access.',
      color: 'text-cyan-600'
    }
  ];

  const processSteps = [
    {
      icon: Database,
      title: 'Data Input & Upload',
      description: 'Users upload viral genomes, protein structures, or clinical datasets through a secure portal.'
    },
    {
      icon: Brain,
      title: 'AI Processing & Mutation Prediction',
      description: 'The engine analyzes sequences, predicts future mutations, and models structural changes.'
    },
    {
      icon: FlaskConical,
      title: 'Drug Generation & Optimization',
      description: 'Generative AI designs antidotes and optimizes molecules using docking and QM/MM refinement.'
    },
    {
      icon: Microscope,
      title: 'Clinical Simulation & Risk Scoring',
      description: 'In-silico models simulate drug effects, toxicity, and compute the Deadliness Score for each variant.'
    },
    {
      icon: BarChart3,
      title: 'Interactive Dashboard Output',
      description: 'Results appear through 3D visualizations, outbreak forecasts, and ranked antidote candidates.'
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Predictive Viral Mutation Forecasting',
      description: 'AI models forecast future mutations before they appear in real-world surveillance.',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Deadliness & Pathogenicity Scoring',
      description: 'A proprietary score quantifies how dangerous each predicted mutation could become.',
      color: 'text-red-600'
    },
    {
      icon: Sparkles,
      title: 'AI-Driven Drug & Antidote Generation',
      description: 'Generative models design new antiviral molecules and antibodies in minutes.',
      color: 'text-purple-600'
    },
    {
      icon: FlaskConical,
      title: 'Smart Chemical Optimization of Lead Drugs',
      description: 'QM/MM simulations suggest precise chemical tweaks to boost drug potency and safety.',
      color: 'text-green-600'
    },
    {
      icon: Microscope,
      title: 'In-Silico Clinical Trial Simulator',
      description: 'Digital-twin models simulate drug effects, toxicity, and immune responses without human risk.',
      color: 'text-orange-600'
    },
    {
      icon: Activity,
      title: 'Symptom & Preventive Measure Prediction',
      description: 'Maps mutations to clinical outcomes and suggests tailored preventive strategies.',
      color: 'text-cyan-600'
    },
    {
      icon: Dna,
      title: '3D Molecular Visualization Engine',
      description: 'Interactive GPU-rendered interface for protein folding, docking, and molecular interactions.',
      color: 'text-indigo-600'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Outbreak Forecasting',
      description: 'SEIR + AI-enhanced epidemiology predicts spread patterns and issues early alerts.',
      color: 'text-pink-600'
    }
  ];

  const teamMembers = [
    {
      name: 'Sairaj Jadhav',
      email: 'sairajjadhav433@gmail.com',
      phone: '+91 935 686 0010'
    },
    {
      name: 'Vedant Lanjekar',
      email: 'vedantlanjekar456@gmail.com',
      phone: '+91 9076027036'
    },
    {
      name: 'Mrigyisha Sawant',
      email: 'mrigyishasawant@gmail.com',
      phone: '+91 788 768 1402'
    },
    {
      name: 'Yash Wase',
      email: 'yashwase13@gmail.com',
      phone: '+91 749 948 9664'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#EAF3FF]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dna className="h-8 w-8 text-[#0B4F8C]" />
            <span className="text-2xl font-bold text-[#0B2336]">VIRO-AI</span>
          </div>
          <Button onClick={() => navigate('/login')} className="bg-[#1E88E5] hover:bg-[#0B4F8C]">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold text-[#0B2336] mb-6">
          VIRO-AI
        </h1>
        <h2 className="text-3xl font-semibold text-[#0B4F8C] mb-8">
          Viral Insight & Rapid Optimization – Analytics Intelligence
        </h2>
        <p className="text-lg text-[#4A6A7A] max-w-4xl mx-auto leading-relaxed">
          VIRO-AI is a cloud-native computational virology platform that unifies genomic surveillance, protein modeling, generative drug design, and epidemiological forecasting. It converts viral sequence data into actionable insights to accelerate antivirals, guide public-health response, and support research workflows.
        </p>
      </section>

      {/* Problems We Solve */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-[#0B2336] mb-12">
          Problems We Solve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-[#1E88E5]">
              <CardHeader>
                <problem.icon className={`h-12 w-12 ${problem.color} mb-4`} />
                <CardTitle className="text-[#0B2336]">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#4A6A7A]">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How Our System Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#0B2336] mb-12">
            How Our System Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#EAF3FF] flex items-center justify-center mb-4">
                  <step.icon className="h-10 w-10 text-[#0B4F8C]" />
                </div>
                <div className="w-16 h-16 rounded-full bg-[#1E88E5] text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-[#0B2336] mb-2">{step.title}</h3>
                <p className="text-sm text-[#4A6A7A]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-[#0B2336] mb-12">
          Key Features & USPs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className={`h-10 w-10 ${feature.color} mb-3`} />
                <CardTitle className="text-[#0B2336] text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#4A6A7A]">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#0B2336] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-[#0B2336]">Request a Demo</CardTitle>
                <CardDescription>Fill out the form and we'll get back to you soon</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization *</Label>
                    <Input
                      id="organization"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="researcher">Researcher</SelectItem>
                        <SelectItem value="clinician">Clinician</SelectItem>
                        <SelectItem value="data-scientist">Data Scientist</SelectItem>
                        <SelectItem value="pharma">Pharma Partner</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <p className="text-xs text-[#4A6A7A]">
                    For institutional or government access, please indicate 'Gov't / Institutional' in message.
                  </p>
                  <Button type="submit" className="w-full bg-[#1E88E5] hover:bg-[#0B4F8C]">
                    Request a Demo
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Team Information */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">Our Team</h3>
              <div className="space-y-6">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="pt-6">
                      <h4 className="text-xl font-semibold text-white mb-3">{member.name}</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/90">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${member.email}`} className="hover:text-[#1E88E5] transition-colors">
                            {member.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <Phone className="h-4 w-4" />
                          <a href={`tel:${member.phone}`} className="hover:text-[#1E88E5] transition-colors">
                            {member.phone}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B2336] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-white/70">
          <p>&copy; 2025 VIRO-AI. All rights reserved.</p>
          <p className="mt-2 text-sm">Predictive Virology • Antidote Design • Outbreak Forecasting</p>
        </div>
      </footer>
    </div>
  );
}