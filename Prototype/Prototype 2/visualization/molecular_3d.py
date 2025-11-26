# molecular_3d.py
"""
3D Molecular Visualization for Virus-Drug Interactions
Shows protein structure and drug binding
"""

import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
import os

class Molecular3DVisualizer:
    """
    Creates 3D visualizations of protein-drug interactions.
    Hackathon version: Simplified but visually impressive.
    """
    
    def __init__(self):
        self.fig = None
        self.ax = None
    
    def visualize_interaction(self, virus_name, protein_name, drug_name, 
                             ic50_nm, save_path=None):
        """
        Create 3D visualization of virus protein and drug interaction.
        
        Args:
            virus_name: Name of virus
            protein_name: Target protein
            drug_name: Drug name
            ic50_nm: Binding affinity
            save_path: Path to save image
        """
        print(f"\n[3D VIZ] Creating visualization for {drug_name} binding to {virus_name} {protein_name}...")
        
        # Create figure
        self.fig = plt.figure(figsize=(14, 10))
        self.ax = self.fig.add_subplot(111, projection='3d')
        
        # 1. Draw protein structure (simplified as alpha helix + beta sheets)
        self._draw_protein_structure()
        
        # 2. Draw drug molecule
        self._draw_drug_molecule()
        
        # 3. Draw binding site
        self._draw_binding_site()
        
        # 4. Draw interaction lines
        self._draw_interactions()
        
        # 5. Add labels and title
        self._add_labels(virus_name, protein_name, drug_name, ic50_nm)
        
        # 6. Style the plot
        self._style_plot()
        
        # Save or show
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"[SAVED] 3D visualization: {save_path}")
        else:
            plt.show()
        
        return self.fig
    
    def _draw_protein_structure(self):
        """Draw simplified protein structure."""
        # Alpha helix (represented as spiral)
        theta = np.linspace(0, 8*np.pi, 200)
        x_helix = 3 * np.cos(theta)
        y_helix = 3 * np.sin(theta)
        z_helix = np.linspace(-10, 10, 200)
        
        self.ax.plot(x_helix, y_helix, z_helix, 
                    color='#2E86AB', linewidth=4, alpha=0.7, 
                    label='Protein α-helix')
        
        # Beta sheets (represented as planes)
        x_sheet = np.linspace(-5, 5, 10)
        y_sheet = np.linspace(-8, -5, 10)
        X, Y = np.meshgrid(x_sheet, y_sheet)
        Z = np.zeros_like(X)
        
        self.ax.plot_surface(X, Y, Z, alpha=0.3, color='#A23B72', 
                            label='β-sheet')
        
        # Protein backbone points
        backbone_x = x_helix[::20]
        backbone_y = y_helix[::20]
        backbone_z = z_helix[::20]
        
        self.ax.scatter(backbone_x, backbone_y, backbone_z, 
                       c='#2E86AB', s=50, alpha=0.6, marker='o')
    
    def _draw_drug_molecule(self):
        """Draw drug molecule as atomic spheres."""
        # Drug positioned in binding pocket
        drug_center = np.array([2, 2, 0])
        
        # Simplified drug structure (aromatic rings + functional groups)
        atom_positions = [
            drug_center + np.array([0, 0, 0]),      # Central atom
            drug_center + np.array([1, 0, 0.5]),    # Ring atom 1
            drug_center + np.array([0.5, 0.8, 0]),  # Ring atom 2
            drug_center + np.array([-0.5, 0.8, 0]), # Ring atom 3
            drug_center + np.array([-1, 0, 0.5]),   # Ring atom 4
            drug_center + np.array([0, -1, 0]),     # Functional group
        ]
        
        atom_colors = ['#FF6B35', '#F7931E', '#F7931E', '#F7931E', '#F7931E', '#C1292E']
        atom_sizes = [200, 150, 150, 150, 150, 100]
        
        for pos, color, size in zip(atom_positions, atom_colors, atom_sizes):
            self.ax.scatter(*pos, c=color, s=size, alpha=0.9, 
                          edgecolors='black', linewidth=1.5)
        
        # Bonds between atoms
        for i in range(len(atom_positions)-1):
            self.ax.plot([atom_positions[i][0], atom_positions[i+1][0]],
                        [atom_positions[i][1], atom_positions[i+1][1]],
                        [atom_positions[i][2], atom_positions[i+1][2]],
                        'k-', linewidth=2, alpha=0.6)
        
        # Add drug label
        self.ax.text(drug_center[0], drug_center[1], drug_center[2]+2, 
                    'DRUG', fontsize=12, weight='bold', color='#FF6B35')
    
    def _draw_binding_site(self):
        """Draw binding site cavity."""
        # Binding pocket (represented as a semi-transparent sphere)
        u = np.linspace(0, 2 * np.pi, 20)
        v = np.linspace(0, np.pi, 20)
        
        pocket_center = np.array([2, 2, 0])
        pocket_radius = 3
        
        x = pocket_radius * np.outer(np.cos(u), np.sin(v)) + pocket_center[0]
        y = pocket_radius * np.outer(np.sin(u), np.sin(v)) + pocket_center[1]
        z = pocket_radius * np.outer(np.ones(np.size(u)), np.cos(v)) + pocket_center[2]
        
        self.ax.plot_surface(x, y, z, color='yellow', alpha=0.15, 
                            linewidth=0, label='Binding Pocket')
        
        # Pocket rim
        self.ax.plot(x[10], y[10], z[10], 'gold', linewidth=2, alpha=0.5)
    
    def _draw_interactions(self):
        """Draw interaction lines between drug and protein."""
        # Key interactions (hydrogen bonds, hydrophobic contacts)
        drug_center = np.array([2, 2, 0])
        
        # Interaction points on protein
        interaction_points = [
            np.array([3, 3, 2]),    # H-bond 1
            np.array([1, 3, -1]),   # H-bond 2
            np.array([3, 1, 1]),    # Hydrophobic
        ]
        
        interaction_types = ['H-bond', 'H-bond', 'Hydrophobic']
        colors = ['cyan', 'cyan', 'green']
        
        for point, int_type, color in zip(interaction_points, interaction_types, colors):
            # Draw dashed line
            self.ax.plot([drug_center[0], point[0]],
                        [drug_center[1], point[1]],
                        [drug_center[2], point[2]],
                        color=color, linestyle='--', linewidth=2, 
                        alpha=0.7, label=int_type)
            
            # Draw interaction point
            self.ax.scatter(*point, c=color, s=100, alpha=0.8, 
                          marker='*', edgecolors='black')
    
    def _add_labels(self, virus_name, protein_name, drug_name, ic50_nm):
        """Add title and labels."""
        # Main title
        title = f"3D Molecular Docking: {drug_name} → {virus_name} {protein_name}"
        self.ax.set_title(title, fontsize=16, weight='bold', pad=20)
        
        # Binding info
        binding_text = f"Predicted IC50: {ic50_nm:.1f} nM"
        if ic50_nm < 10:
            strength = "STRONG BINDER"
            color = 'green'
        elif ic50_nm < 100:
            strength = "MEDIUM BINDER"
            color = 'orange'
        else:
            strength = "WEAK BINDER"
            color = 'red'
        
        self.ax.text2D(0.02, 0.98, binding_text, transform=self.ax.transAxes,
                      fontsize=12, verticalalignment='top',
                      bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))
        
        self.ax.text2D(0.02, 0.93, f"Binding Strength: {strength}", 
                      transform=self.ax.transAxes,
                      fontsize=11, color=color, weight='bold',
                      verticalalignment='top')
    
    def _style_plot(self):
        """Style the 3D plot."""
        # Axes labels
        self.ax.set_xlabel('X (Å)', fontsize=10, labelpad=10)
        self.ax.set_ylabel('Y (Å)', fontsize=10, labelpad=10)
        self.ax.set_zlabel('Z (Å)', fontsize=10, labelpad=10)
        
        # Set limits
        self.ax.set_xlim([-10, 10])
        self.ax.set_ylim([-10, 10])
        self.ax.set_zlim([-12, 12])
        
        # Grid
        self.ax.grid(True, alpha=0.3)
        
        # Background
        self.ax.xaxis.pane.fill = False
        self.ax.yaxis.pane.fill = False
        self.ax.zaxis.pane.fill = False
        
        # Legend (no duplicates)
        handles, labels = self.ax.get_legend_handles_labels()
        by_label = dict(zip(labels, handles))
        self.ax.legend(by_label.values(), by_label.keys(), 
                      loc='upper right', fontsize=9)
        
        # View angle
        self.ax.view_init(elev=20, azim=45)


# === DEMO ===
if __name__ == "__main__":
    print("\n" + "="*80)
    print("VIRO-AI 3D MOLECULAR VISUALIZATION - DEMO")
    print("="*80)
    
    visualizer = Molecular3DVisualizer()
    
    # Create visualization
    virus = "SARS-CoV-2"
    protein = "Spike Protein"
    drug = "Glecaprevir"
    ic50 = 2.8
    
    # Save path
    output_dir = "Viroai_DataBase/Reports/3d-visualizations"
    os.makedirs(output_dir, exist_ok=True)
    output_file = f"{output_dir}/{virus}_{drug}_binding.png"
    
    fig = visualizer.visualize_interaction(virus, protein, drug, ic50, 
                                          save_path=output_file)
    
    print(f"\n[OK] 3D visualization complete!")
    print(f"[INFO] View saved image at: {output_file}")

