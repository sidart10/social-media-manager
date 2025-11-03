#!/usr/bin/env python3
"""
Generate Chart 9: Tech Companies H-1B Data
Accurate horizontal bar chart with precise FY 2025 numbers and total compensation
"""

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

# Set style for professional appearance
plt.style.use('seaborn-v0_8-darkgrid')
plt.rcParams['figure.facecolor'] = 'white'
plt.rcParams['axes.facecolor'] = 'white'
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = ['Inter', 'Arial', 'DejaVu Sans']

# Data from USCIS FY 2025 approvals
companies = ['Amazon', 'Microsoft', 'Meta', 'Apple', 'Google']
approvals_fy25 = [10044, 5189, 5123, 4202, 4181]  # FY 2025 actual approvals
total_comp = [300, 320, 380, 350, 360]  # Total compensation in thousands (base + equity + bonus)

# Create figure with specific size for Twitter (16:9 aspect ratio)
fig, ax = plt.subplots(figsize=(15.36, 8.64), dpi=100)

# Create horizontal bars
y_pos = np.arange(len(companies))
bars = ax.barh(y_pos, approvals_fy25, height=0.6, color='#10B981', edgecolor='#059669', linewidth=2)

# Add approval numbers inside bars (white text)
for i, (bar, apps) in enumerate(zip(bars, approvals_fy25)):
    width = bar.get_width()
    ax.text(width * 0.5, bar.get_y() + bar.get_height()/2,
            f'{apps:,}',
            ha='center', va='center', color='white',
            fontsize=22, fontweight='bold', family='monospace')

# Add total compensation labels at end of bars
for i, (bar, comp) in enumerate(zip(bars, total_comp)):
    width = bar.get_width()
    ax.text(width + 300, bar.get_y() + bar.get_height()/2,
            f'${comp}k+',
            ha='left', va='center', color='#065F46',
            fontsize=24, fontweight='bold')

# Customize y-axis
ax.set_yticks(y_pos)
ax.set_yticklabels(companies, fontsize=26, fontweight='600')

# Customize x-axis
ax.set_xlabel('H-1B Approvals (FY 2025)', fontsize=20, fontweight='600', color='#1F2937')
ax.set_xlim(0, 12000)
ax.xaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'{int(x):,}'))
ax.tick_params(axis='x', labelsize=16)

# Add grid
ax.grid(axis='x', alpha=0.3, linestyle='--', linewidth=0.8, color='#E5E7EB')
ax.set_axisbelow(True)

# Title and subtitle
fig.suptitle('Tech Giants: The High-Wage H-1B Tier',
             fontsize=36, fontweight='bold', color='#1F2937', y=0.98)
ax.text(0.5, 1.05, '30-50% Indian workers  |  Direct employees + equity  |  FY 2025',
        transform=ax.transAxes, ha='center', fontsize=18,
        color='#6B7280', style='italic')

# Add annotation box
textstr = 'Total comp = base + equity + bonus\nData source: USCIS FY 2025 approvals'
props = dict(boxstyle='round', facecolor='#D1FAE5', alpha=0.8, edgecolor='#10B981', linewidth=2)
ax.text(0.98, 0.05, textstr, transform=ax.transAxes, fontsize=12,
        verticalalignment='bottom', horizontalalignment='right', bbox=props)

# Add comparison note
comparison_text = 'vs IT Staffing: $80k-$92k total comp (no equity)'
ax.text(0.02, 0.05, comparison_text, transform=ax.transAxes, fontsize=11,
        verticalalignment='bottom', horizontalalignment='left',
        color='#DC2626', fontweight='600', style='italic')

# Remove top and right spines
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_linewidth(2)
ax.spines['bottom'].set_linewidth(2)

# Tight layout
plt.tight_layout()

# Save with high quality
output_path = '../images/chart-9-tech-companies-python.png'
plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white', edgecolor='none')
print(f"Chart 9 saved to: {output_path}")

# Also display if running interactively
# plt.show()
