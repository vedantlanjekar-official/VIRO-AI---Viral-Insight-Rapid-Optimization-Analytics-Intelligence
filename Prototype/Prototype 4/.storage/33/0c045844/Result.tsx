import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Share2, RefreshCw, Flag, MapPin, Activity, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Result() {
  const mutations = [
    { position: 'S:484', original: 'E', predicted: 'K', probability: 92, effect: 'Immune evasion', risk: 'High' },
    { position: 'S:501', original: 'N', predicted: 'Y', probability: 88, effect: 'Increased binding affinity', risk: 'High' },
    { position: 'S:417', original: 'K', predicted: 'N', probability: 76, effect: 'Antibody escape', risk: 'Medium' },
    { position: 'N:203', original: 'R', predicted: 'K', probability: 65, effect: 'Structural stability', risk: 'Low' }
  ];

  const detailedMutationData = [
    {
      mutation: 'S:484 E→K',
      genomicLevel: {
        nucleotideSubstitution: 'A23403G',
        mutationType: 'Point mutation (Transition)',
        genomicRegion: 'Spike RBD',
        codonChange: 'GAA → AAA',
        synonymous: 'Non-synonymous'
      },
      probability: {
        aiScore: 0.92,
        historicalFrequency: 'High (observed in 45% of Delta variants)',
        fixationLikelihood: 'Very High (positive selection detected)'
      },
      selectivePressure: {
        dNdS: 2.4,
        conservationScore: 'Low (flexible region)',
        coEvolution: 'Often co-occurs with N501Y, L452R'
      },
      structuralConsequences: {
        deltaRMSD: '+0.8 Å',
        deltaRMSF: '+1.2 Å² (increased flexibility)',
        deltaGStability: '-1.5 kcal/mol (destabilizing)',
        sasaShift: '+15 Ų (increased exposure)',
        secondaryStructure: 'Loop conformation altered',
        interResidueContacts: '2 H-bonds lost, 1 salt bridge formed'
      },
      receptorBinding: {
        deltaKd: '+2.3 nM (enhanced binding)',
        interfaceAlteration: 'Electrostatic interaction with ACE2-E484',
        criticalResidues: 'Gain of K417-D30 contact'
      },
      immuneEvasion: {
        bCellEpitope: 'Disruption of RBD epitope cluster II',
        tCellEpitope: 'No significant HLA-binding change',
        glycosylationSite: 'No new N-X-S/T motif',
        epitopeMasking: '35% reduction in antibody accessibility'
      },
      viralFitness: {
        replicationEfficiency: '+18% (enhanced polymerase stability)',
        virionStability: 'pH stability improved (ΔpH50 = +0.4)',
        cpeIndex: '+12 (moderate increase in cytopathic effect)'
      },
      pathogenicity: {
        contribution: '23/100 pathogenicity score',
        tropismImpact: 'No significant tissue preference shift',
        viralLoadThreshold: '+0.8 log₁₀ copies/mL'
      },
      lineageEmergence: {
        newLineageProbability: '68%',
        phylogeneticPathway: 'B.1.617.2 → B.1.617.2.1 (AY.1)',
        coMutationSynergy: 'Synergistic with L452R (+15% fitness)'
      }
    },
    {
      mutation: 'S:501 N→Y',
      genomicLevel: {
        nucleotideSubstitution: 'A23063T',
        mutationType: 'Point mutation (Transversion)',
        genomicRegion: 'Spike RBD',
        codonChange: 'AAT → TAT',
        synonymous: 'Non-synonymous'
      },
      probability: {
        aiScore: 0.88,
        historicalFrequency: 'Very High (observed in 78% of Alpha/Beta variants)',
        fixationLikelihood: 'High (strong positive selection)'
      },
      selectivePressure: {
        dNdS: 3.1,
        conservationScore: 'Medium (moderately conserved)',
        coEvolution: 'Frequently co-occurs with E484K, K417N'
      },
      structuralConsequences: {
        deltaRMSD: '+1.1 Å',
        deltaRMSF: '+0.9 Ų (moderate flexibility increase)',
        deltaGStability: '-0.8 kcal/mol (slightly destabilizing)',
        sasaShift: '+22 Ų (increased hydrophobic exposure)',
        secondaryStructure: 'No significant change',
        interResidueContacts: '3 new π-π stacking interactions'
      },
      receptorBinding: {
        deltaKd: '+3.8 nM (significantly enhanced binding)',
        interfaceAlteration: 'Aromatic stacking with ACE2-Y41',
        criticalResidues: 'Enhanced Y501-Y41 interaction'
      },
      immuneEvasion: {
        bCellEpitope: 'Moderate disruption of neutralizing epitopes',
        tCellEpitope: 'New HLA-A*02:01 binding motif created',
        glycosylationSite: 'No change',
        epitopeMasking: '28% reduction in antibody accessibility'
      },
      viralFitness: {
        replicationEfficiency: '+25% (enhanced spike stability)',
        virionStability: 'Thermal stability improved (ΔTm = +2.3°C)',
        cpeIndex: '+18 (significant increase in cytopathic effect)'
      },
      pathogenicity: {
        contribution: '31/100 pathogenicity score',
        tropismImpact: 'Slight increase in upper respiratory tract tropism',
        viralLoadThreshold: '+1.2 log₁₀ copies/mL'
      },
      lineageEmergence: {
        newLineageProbability: '82%',
        phylogeneticPathway: 'Multiple independent emergences (convergent evolution)',
        coMutationSynergy: 'Highly synergistic with E484K (+28% fitness)'
      }
    }
  ];

  const drugCandidates = [
    {
      name: 'Compound-A-7821',
      smiles: 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O',
      bindingAffinity: -8.4,
      ic50: '12.5 nM',
      logP: 3.2,
      molecularWeight: 206.28,
      formula: 'C13H18O2',
      heavyAtoms: 15,
      rank: 1,
      score: 94
    },
    {
      name: 'Compound-B-3492',
      smiles: 'C1=CC=C(C=C1)C2=CC=C(C=C2)Cl',
      bindingAffinity: -7.9,
      ic50: '28.3 nM',
      logP: 4.1,
      molecularWeight: 188.65,
      formula: 'C12H9Cl',
      heavyAtoms: 14,
      rank: 2,
      score: 89
    },
    {
      name: 'Compound-C-5167',
      smiles: 'CC1=CC=C(C=C1)S(=O)(=O)N',
      bindingAffinity: -7.5,
      ic50: '45.7 nM',
      logP: 2.8,
      molecularWeight: 171.22,
      formula: 'C7H9NO2S',
      heavyAtoms: 11,
      rank: 3,
      score: 85
    }
  ];

  const modifications = [
    {
      oldFormula: 'C13H18O2',
      newFormula: 'C13H17O2F',
      changes: 'Fluorination at position 4 of the aromatic ring',
      improvements: 'Binding affinity +1.2 kcal/mol, predicted bioavailability ↑15%, enhanced metabolic stability',
      confidence: '±8%'
    },
    {
      oldFormula: 'C12H9Cl',
      newFormula: 'C12H9Cl2',
      changes: 'Additional chlorine substitution at meta position',
      improvements: 'Binding affinity +0.9 kcal/mol, lipophilicity optimized, ↑ membrane permeability',
      confidence: '±12%'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-[#0B2336]">Project Analysis Results</h1>
            <Badge className="bg-green-100 text-green-800">Processed</Badge>
          </div>
          <p className="text-[#4A6A7A]">SARS-CoV-2 Variant Analysis - Delta Sublineage</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Re-run
          </Button>
          <Button variant="outline" size="sm">
            <Flag className="h-4 w-4 mr-2" />
            Flag
          </Button>
        </div>
      </div>

      {/* Disclaimer */}
      <Alert className="border-yellow-300 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800">Calibration & Disclaimer</AlertTitle>
        <AlertDescription className="text-yellow-700 text-sm">
          Results are simulator outputs calibrated on public/reputable datasets and internal models. This application is a research simulator; outputs can be incorrect. Estimated accuracy: up to ~80% depending on data quality and model assumptions. Use results for research guidance only and validate experimentally before policy or clinical action.
        </AlertDescription>
      </Alert>

      {/* Tabs for Different Sections */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mutation">Mutation</TabsTrigger>
          <TabsTrigger value="drugs">Drug Candidates</TabsTrigger>
          <TabsTrigger value="modifications">Modifications</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3D Protein Structure */}
            <Card>
              <CardHeader>
                <CardTitle>3D Virus Protein Structure</CardTitle>
                <CardDescription>Interactive molecular visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg">
                  <img 
                    src="/assets/3d-virus-protein-structure.jpg" 
                    alt="3D Virus Protein Structure - SARS-CoV-2 Spike Protein"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#4A6A7A]">Residues</p>
                    <p className="font-semibold text-[#0B2336]">1273</p>
                  </div>
                  <div>
                    <p className="text-[#4A6A7A]">Molecular Weight</p>
                    <p className="font-semibold text-[#0B2336]">141.2 kDa</p>
                  </div>
                  <div>
                    <p className="text-[#4A6A7A]">RMSD vs Reference</p>
                    <p className="font-semibold text-[#0B2336]">1.8 Å</p>
                  </div>
                  <div>
                    <p className="text-[#4A6A7A]">Binding Energy</p>
                    <p className="font-semibold text-[#0B2336]">-8.4 kcal/mol</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Virus Description, Origin & Symptoms */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Virus Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-[#4A6A7A]">Lineage/Clade</p>
                    <p className="font-semibold text-[#0B2336]">B.1.617.2 (Delta)</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A6A7A]">Key Mutations</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary">L452R</Badge>
                      <Badge variant="secondary">T478K</Badge>
                      <Badge variant="secondary">P681R</Badge>
                      <Badge variant="secondary">D614G</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A6A7A]">Predicted Impact</p>
                    <p className="text-sm text-[#0B2336]">Enhanced receptor binding affinity, increased transmissibility, partial immune evasion</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Origin & Geolocation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-[#1E88E5] mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#0B2336]">Mumbai, Maharashtra, India</p>
                      <p className="text-sm text-[#4A6A7A]">19.0760°N, 72.8777°E</p>
                      <p className="text-sm text-[#4A6A7A]">Collected: 2025-10-15 14:30 UTC</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Symptoms & Clinical Correlates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-[#4A6A7A] mb-2">Predicted Symptom Clusters</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Fever</span>
                          <Badge>High confidence</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Cough</span>
                          <Badge>High confidence</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Fatigue</span>
                          <Badge>Medium confidence</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Loss of taste/smell</span>
                          <Badge variant="secondary">Low confidence</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-[#4A6A7A] mb-2">Observed Clinical Symptoms</p>
                      <p className="text-sm text-[#0B2336]">Fever (39.2°C), persistent dry cough, moderate fatigue, mild headache. No loss of taste or smell reported. Oxygen saturation: 94% on room air.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Deadliness Score */}
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle>Deadliness Score Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-red-600">73</div>
                  <p className="text-sm text-[#4A6A7A] mt-1">Deadliness Score</p>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>R₀ Impact</span>
                      <span className="font-semibold">85/100</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Binding Affinity Proxy</span>
                      <span className="font-semibold">78/100</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500" style={{ width: '78%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Immune Evasion Signal</span>
                      <span className="font-semibold">68/100</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: '68%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cytopathic Effect Index</span>
                      <span className="font-semibold">62/100</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '62%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <Alert>
                <AlertDescription className="text-sm">
                  <strong>Interpretation:</strong> Score indicates high transmissibility with moderate severity. Recommended priority: Enhanced surveillance and accelerated vaccine booster development targeting identified mutations.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Actionable Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Actionable Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 list-decimal list-inside">
                <li className="text-sm text-[#0B2336]">
                  <strong>Priority:</strong> Conduct in-vitro binding validation of Compound-A-7821 against spike protein
                </li>
                <li className="text-sm text-[#0B2336]">
                  <strong>Vaccine Update:</strong> Update vaccine epitope panel to include S:484K and S:501Y mutations
                </li>
                <li className="text-sm text-[#0B2336]">
                  <strong>Surveillance:</strong> Increase genomic surveillance in Maharashtra and neighboring states
                </li>
                <li className="text-sm text-[#0B2336]">
                  <strong>Clinical Monitoring:</strong> Track breakthrough infections in vaccinated populations
                </li>
                <li className="text-sm text-[#0B2336]">
                  <strong>Public Health:</strong> Implement enhanced contact tracing protocols in detected regions
                </li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mutation Tab */}
        <TabsContent value="mutation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Predicted Mutations</CardTitle>
              <CardDescription>AI-forecasted viral mutations with probability and impact analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Original</TableHead>
                    <TableHead>Predicted</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Predicted Effect</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mutations.map((mutation, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{mutation.position}</TableCell>
                      <TableCell className="font-mono font-semibold">{mutation.original}</TableCell>
                      <TableCell className="font-mono font-semibold text-[#1E88E5]">{mutation.predicted}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden w-20">
                            <div className="h-full bg-[#1E88E5]" style={{ width: `${mutation.probability}%` }} />
                          </div>
                          <span className="text-sm font-medium">{mutation.probability}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{mutation.effect}</TableCell>
                      <TableCell>
                        <Badge
                          variant={mutation.risk === 'High' ? 'destructive' : mutation.risk === 'Medium' ? 'default' : 'secondary'}
                        >
                          {mutation.risk}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">View in 3D</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Detailed Mutation Analysis Cards */}
          <div className="space-y-6">
            {detailedMutationData.map((data, index) => (
              <Card key={index} className="border-l-4 border-l-[#1E88E5]">
                <CardHeader>
                  <CardTitle className="text-xl">Detailed Analysis: {data.mutation}</CardTitle>
                  <CardDescription>Comprehensive genomic, structural, and evolutionary characterization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 1. Genomic-Level Mutation Description */}
                  <div>
                    <h4 className="font-semibold text-[#0B2336] mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
                      Genomic-Level Mutation Description
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Nucleotide Substitution</p>
                        <p className="text-sm font-semibold text-[#0B2336] font-mono">{data.genomicLevel.nucleotideSubstitution}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Mutation Type</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.genomicLevel.mutationType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Genomic Region</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.genomicLevel.genomicRegion}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Codon Change</p>
                        <p className="text-sm font-semibold text-[#0B2336] font-mono">{data.genomicLevel.codonChange}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Classification</p>
                        <Badge variant="secondary">{data.genomicLevel.synonymous}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* 2. Mutation Probability Metrics */}
                  <div>
                    <h4 className="font-semibold text-[#0B2336] mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">2</span>
                      Mutation Probability Metrics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-xs text-[#4A6A7A]">AI-Derived Probability Score</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500" style={{ width: `${data.probability.aiScore * 100}%` }} />
                          </div>
                          <span className="text-sm font-bold text-purple-600">{data.probability.aiScore}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Historical Frequency</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.probability.historicalFrequency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Fixation Likelihood</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.probability.fixationLikelihood}</p>
                      </div>
                    </div>
                  </div>

                  {/* 3. Selective Pressure & Evolutionary Indicators */}
                  <div>
                    <h4 className="font-semibold text-[#0B2336] mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">3</span>
                      Selective Pressure & Evolutionary Indicators
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-xs text-[#4A6A7A]">dN/dS Ratio</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.selectivePressure.dNdS}</p>
                        <Badge variant="outline" className="mt-1 text-xs">Positive Selection</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Conservation Score</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.selectivePressure.conservationScore}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Co-Evolution Pattern</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.selectivePressure.coEvolution}</p>
                      </div>
                    </div>
                  </div>

                  {/* 4. Protein Structural Consequences */}
                  <div>
                    <h4 className="font-semibold text-[#0B2336] mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">4</span>
                      Protein Structural Consequences
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-xs text-[#4A6A7A]">ΔRMSD</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.structuralConsequences.deltaRMSD}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">ΔRMSF</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.structuralConsequences.deltaRMSF}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">ΔG Stability</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.structuralConsequences.deltaGStability}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">SASA Shift</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.structuralConsequences.sasaShift}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Secondary Structure</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.structuralConsequences.secondaryStructure}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Inter-Residue Contacts</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.structuralConsequences.interResidueContacts}</p>
                      </div>
                    </div>
                  </div>

                  {/* 5. Receptor Binding Impact */}
                  <div>
                    <h4 className="font-semibold text-[#0B2336] mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">5</span>
                      Predicted Impact on Receptor Binding
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-xs text-[#4A6A7A]">ΔKd (Binding Affinity)</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.receptorBinding.deltaKd}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Interface Alteration</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.receptorBinding.interfaceAlteration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Critical Residues</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.receptorBinding.criticalResidues}</p>
                      </div>
                    </div>
                  </div>

                  {/* 6. Immune Evasion & Antigenicity */}
                  <div>
                    <h4 className="font-semibold text-[#0B2336] mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm font-bold">6</span>
                      Immune Evasion & Antigenicity Shifts
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-xs text-[#4A6A7A]">B-Cell Epitope</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.immuneEvasion.bCellEpitope}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">T-Cell Epitope</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.immuneEvasion.tCellEpitope}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Glycosylation Site</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.immuneEvasion.glycosylationSite}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Epitope Masking Index</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.immuneEvasion.epitopeMasking}</p>
                      </div>
                    </div>
                  </div>

                  {/* 7. Viral Fitness & Replication */}
                  <div>
                    <h4 className="font-semibold text-[#0B2336] mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">7</span>
                      Viral Fitness & Replication Potential
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Replication Efficiency</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.viralFitness.replicationEfficiency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Virion Stability</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.viralFitness.virionStability}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">CPE Index</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.viralFitness.cpeIndex}</p>
                      </div>
                    </div>
                  </div>

                  {/* 8. Pathogenicity Contribution */}
                  <div>
                    <h4 className="font-semibold text-[#0B2336] mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-bold">8</span>
                      Pathogenicity Contribution
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Pathogenicity Score Contribution</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-pink-500" style={{ width: `${parseInt(data.pathogenicity.contribution)}%` }} />
                          </div>
                          <span className="text-sm font-bold text-pink-600">{data.pathogenicity.contribution}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Tropism Impact</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.pathogenicity.tropismImpact}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Viral Load Threshold</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.pathogenicity.viralLoadThreshold}</p>
                      </div>
                    </div>
                  </div>

                  {/* 9. Lineage Emergence Forecasts */}
                  <div>
                    <h4 className="font-semibold text-[#0B2336] mb-3 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-sm font-bold">9</span>
                      Lineage Emergence Forecasts
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-xs text-[#4A6A7A]">New Lineage Probability</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-500" style={{ width: data.lineageEmergence.newLineageProbability }} />
                          </div>
                          <span className="text-sm font-bold text-teal-600">{data.lineageEmergence.newLineageProbability}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Phylogenetic Pathway</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.lineageEmergence.phylogeneticPathway}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#4A6A7A]">Co-Mutation Synergy</p>
                        <p className="text-sm font-semibold text-[#0B2336]">{data.lineageEmergence.coMutationSynergy}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Drug Candidates Tab */}
        <TabsContent value="drugs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Drug Candidates</CardTitle>
              <CardDescription>Ranked antiviral compounds with binding and pharmacological properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drugCandidates.map((drug, index) => (
                  <Card key={index} className="border-l-4 border-l-[#1E88E5]">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">#{drug.rank} - {drug.name}</CardTitle>
                          <CardDescription className="font-mono text-xs mt-1">{drug.smiles}</CardDescription>
                        </div>
                        <Badge className="bg-[#0B4F8C] text-white">Score: {drug.score}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-[#4A6A7A]">Binding Affinity (ΔG)</p>
                          <p className="font-semibold text-[#0B2336]">{drug.bindingAffinity} kcal/mol</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4A6A7A]">IC₅₀ (Predicted)</p>
                          <p className="font-semibold text-[#0B2336]">{drug.ic50}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4A6A7A]">logP</p>
                          <p className="font-semibold text-[#0B2336]">{drug.logP}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4A6A7A]">Molecular Weight</p>
                          <p className="font-semibold text-[#0B2336]">{drug.molecularWeight} g/mol</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4A6A7A]">Formula</p>
                          <p className="font-semibold text-[#0B2336] font-mono">{drug.formula}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4A6A7A]">Heavy Atoms</p>
                          <p className="font-semibold text-[#0B2336]">{drug.heavyAtoms}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">View Structure</Button>
                        <Button size="sm" variant="outline">Download SDF</Button>
                        <Button size="sm" variant="outline">Export Data</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Modifications Tab */}
        <TabsContent value="modifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Suggested Chemical Modifications</CardTitle>
              <CardDescription>Optimized molecular structures with predicted improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {modifications.map((mod, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardHeader>
                      <CardTitle className="text-lg">Modification Suggestion #{index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-[#4A6A7A] mb-2">Base Formula</p>
                          <p className="font-mono font-semibold text-[#0B2336] text-lg">{mod.oldFormula}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#4A6A7A] mb-2">Suggested Formula</p>
                          <p className="font-mono font-semibold text-green-600 text-lg">{mod.newFormula}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-[#4A6A7A] mb-2">Chemical Groups Changed</p>
                        <p className="text-sm text-[#0B2336]">{mod.changes}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#4A6A7A] mb-2">Predicted Improvements</p>
                        <p className="text-sm text-[#0B2336]">{mod.improvements}</p>
                      </div>
                      <div className="flex items-center gap-4 pt-2">
                        <Badge variant="outline" className="text-xs">
                          Confidence: {mod.confidence} accuracy
                        </Badge>
                        <Button size="sm" variant="outline">View Detailed Analysis</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}