import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Bookmark, Share2, ExternalLink } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');

  const newsArticles = [
    {
      title: 'Novel Antiviral Compound Shows Promise Against Multiple Coronaviruses',
      summary: 'Researchers have identified a broad-spectrum antiviral that demonstrates efficacy against SARS-CoV-2 and related coronaviruses in preclinical studies.',
      source: 'Nature Medicine',
      date: '2025-11-10',
      tags: ['Antiviral Discovery', 'Coronaviruses'],
      credibility: 'Peer-reviewed',
      relevance: 95
    },
    {
      title: 'AI-Driven Protein Structure Prediction Accelerates Drug Design',
      summary: 'Machine learning models are revolutionizing how scientists predict protein folding, reducing drug discovery timelines from years to months.',
      source: 'Science',
      date: '2025-11-09',
      tags: ['Structural Biology', 'AI'],
      credibility: 'Peer-reviewed',
      relevance: 92
    },
    {
      title: 'WHO Reports Emerging Viral Variant in Southeast Asia',
      summary: 'New surveillance data indicates a viral mutation with enhanced transmissibility detected in multiple countries, prompting increased monitoring.',
      source: 'WHO',
      date: '2025-11-08',
      tags: ['Outbreaks', 'Genomics'],
      credibility: 'Government Notice',
      relevance: 88
    },
    {
      title: 'CRISPR-Based Antiviral Therapy Enters Phase II Clinical Trials',
      summary: 'Gene-editing technology shows potential for treating chronic viral infections with minimal side effects in early human trials.',
      source: 'The Lancet',
      date: '2025-11-07',
      tags: ['Antiviral Discovery', 'Clinical Trials'],
      credibility: 'Peer-reviewed',
      relevance: 90
    },
    {
      title: 'Genomic Surveillance Networks Expand Across Africa',
      summary: 'International collaboration establishes new sequencing facilities to improve early detection of viral mutations and outbreak response.',
      source: 'Nature',
      date: '2025-11-06',
      tags: ['Genomics', 'Outbreaks'],
      credibility: 'Peer-reviewed',
      relevance: 85
    },
    {
      title: 'Breakthrough in mRNA Vaccine Technology for Rapid Pandemic Response',
      summary: 'Scientists develop platform that can produce vaccine candidates within 48 hours of identifying a new pathogen.',
      source: 'Cell',
      date: '2025-11-05',
      tags: ['Vaccines', 'Biotechnology'],
      credibility: 'Peer-reviewed',
      relevance: 94
    },
    {
      title: 'Quantum Computing Applied to Molecular Dynamics Simulations',
      summary: 'New quantum algorithms enable unprecedented accuracy in predicting drug-protein interactions at the atomic level.',
      source: 'Nature Computational Science',
      date: '2025-11-04',
      tags: ['Structural Biology', 'Computational'],
      credibility: 'Peer-reviewed',
      relevance: 87
    },
    {
      title: 'Global Influenza Surveillance Reports Unusual Seasonal Patterns',
      summary: 'Epidemiological data shows atypical flu activity potentially linked to climate change and population movement.',
      source: 'CDC',
      date: '2025-11-03',
      tags: ['Outbreaks', 'Epidemiology'],
      credibility: 'Government Notice',
      relevance: 82
    },
    {
      title: 'Nanobody Therapeutics Show Enhanced Tissue Penetration',
      summary: 'Small antibody fragments demonstrate superior ability to reach viral reservoirs in difficult-to-treat infections.',
      source: 'Nature Biotechnology',
      date: '2025-11-02',
      tags: ['Antiviral Discovery', 'Therapeutics'],
      credibility: 'Peer-reviewed',
      relevance: 89
    },
    {
      title: 'Machine Learning Predicts Viral Evolution Patterns',
      summary: 'AI models trained on historical genomic data successfully forecast mutation trajectories with 80% accuracy.',
      source: 'PLOS Computational Biology',
      date: '2025-11-01',
      tags: ['Genomics', 'AI'],
      credibility: 'Peer-reviewed',
      relevance: 91
    },
    {
      title: 'Combination Therapy Overcomes Antiviral Resistance',
      summary: 'Dual-drug approach prevents emergence of resistant viral strains in long-term treatment studies.',
      source: 'Journal of Virology',
      date: '2025-10-31',
      tags: ['Antiviral Discovery', 'Clinical'],
      credibility: 'Peer-reviewed',
      relevance: 86
    },
    {
      title: 'Structural Analysis Reveals Universal Coronavirus Binding Site',
      summary: 'Cryo-EM studies identify conserved region across coronavirus family, opening path for pan-coronavirus therapeutics.',
      source: 'Science',
      date: '2025-10-30',
      tags: ['Structural Biology', 'Coronaviruses'],
      credibility: 'Peer-reviewed',
      relevance: 93
    }
  ];

  const getCredibilityColor = (credibility: string) => {
    switch (credibility) {
      case 'Peer-reviewed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Preprint':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Government Notice':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#0B2336] mb-2">Explore Research</h1>
        <p className="text-[#4A6A7A]">Latest biotech and virology research from trusted sources</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#4A6A7A]" />
              <Input
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="genomics">Genomics</SelectItem>
                <SelectItem value="antiviral">Antiviral Discovery</SelectItem>
                <SelectItem value="outbreaks">Outbreaks</SelectItem>
                <SelectItem value="structural">Structural Biology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* News Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles.map((article, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge className={getCredibilityColor(article.credibility)} variant="outline">
                  {article.credibility}
                </Badge>
                <span className="text-xs text-[#4A6A7A]">{article.date}</span>
              </div>
              <CardTitle className="text-lg group-hover:text-[#1E88E5] transition-colors">
                {article.title}
              </CardTitle>
              <CardDescription className="text-sm">{article.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#4A6A7A]">{article.source}</span>
                  <span className="text-[#0B4F8C] font-medium">Relevance: {article.relevance}%</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}