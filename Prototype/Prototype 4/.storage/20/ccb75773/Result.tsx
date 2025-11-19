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
                <div className="aspect-square bg-gradient-to-br from-[#EAF3FF] to-[#F2F5F8] rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-[#4A6A7A]">
                    <Activity className="h-16 w-16 mx-auto mb-3" />
                    <p className="font-medium">3D Molecular Viewer</p>
                    <p className="text-sm">Interactive WebGL visualization</p>
                  </div>
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

            {/* Virus Description & Origin */}
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
            </div>
          </div>

          {/* Symptoms & Clinical */}
          <Card>
            <CardHeader>
              <CardTitle>Symptoms & Clinical Correlates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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