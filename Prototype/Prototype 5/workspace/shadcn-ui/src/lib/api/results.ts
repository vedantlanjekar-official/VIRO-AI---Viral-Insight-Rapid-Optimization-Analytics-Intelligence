/**
 * Results API
 */

import { apiClient } from './client';

type JsonObject = Record<string, any>;

export interface MutationResult {
  id: number;
  project_id: number;
  mutation_position: string;
  original_amino_acid: string;
  predicted_amino_acid: string;
  probability?: number | null;
  effect?: string | null;
  risk_level?: string | null;
  genomic_level?: JsonObject;
  probability_metrics?: JsonObject;
  selective_pressure?: JsonObject;
  structural_consequences?: JsonObject;
  receptor_binding?: JsonObject;
  immune_evasion?: JsonObject;
  viral_fitness?: JsonObject;
  pathogenicity?: JsonObject;
  lineage_emergence?: JsonObject;
  created_at: string;
}

export interface DrugCandidateResult {
  id: number;
  project_id: number;
  drug_name: string;
  smiles?: string | null;
  binding_affinity?: number | null;
  ic50?: string | null;
  logp?: number | null;
  molecular_weight?: number | null;
  formula?: string | null;
  heavy_atoms?: number | null;
  rank: number;
  score: number;
  molecular_identity?: JsonObject;
  binding_metrics?: JsonObject;
  interaction_map?: JsonObject;
  structural_stability?: JsonObject;
  physicochemical?: JsonObject;
  adme?: JsonObject;
  toxicology?: JsonObject;
  comparative_scores?: JsonObject;
  ensemble_analysis?: JsonObject;
  resistance_vulnerability?: JsonObject;
  chemical_diversity?: JsonObject;
  created_at: string;
}

export interface ModificationResult {
  id: number;
  project_id: number;
  base_formula?: string | null;
  modified_formula?: string | null;
  changes?: string | null;
  improvements?: string | null;
  confidence?: number | null;
  modification_identity?: JsonObject;
  structural_effects?: JsonObject;
  physicochemical_changes?: JsonObject;
  binding_affinity_effects?: JsonObject;
  electronic_effects?: JsonObject;
  stability_degradation?: JsonObject;
  solubility_permeability?: JsonObject;
  adme_shifts?: JsonObject;
  toxicity_signatures?: JsonObject;
  synthetic_feasibility?: JsonObject;
  comparative_scoring?: JsonObject;
  created_at: string;
}

export interface StructureData {
  residues_count?: number;
  molecular_weight_kda?: number;
  pdb_file_path?: string;
  [key: string]: any;
}

export interface ProjectResults {
  project: JsonObject;
  mutations: MutationResult[];
  drugs: DrugCandidateResult[];
  modifications: ModificationResult[];
  structure_data?: StructureData | null;
}

export const resultsApi = {
  getProjectResults: (projectId: number) => apiClient.get<ProjectResults>(`/projects/${projectId}/results`),

  getMutations: (projectId: number) => apiClient.get<MutationResult[]>(`/projects/${projectId}/mutations`),

  getDrugs: (projectId: number) => apiClient.get<DrugCandidateResult[]>(`/projects/${projectId}/drugs`),

  getModifications: (projectId: number) =>
    apiClient.get<ModificationResult[]>(`/projects/${projectId}/modifications`),
};
