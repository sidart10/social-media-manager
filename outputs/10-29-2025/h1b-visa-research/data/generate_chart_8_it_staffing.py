#!/usr/bin/env python3
"""
Generate Chart 8: IT Staffing Firms H-1B Data
Accurate horizontal bar chart with precise numbers
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

# Data from Robert Sterling's analysis (5-year totals)
companies = ['Cognizant', 'Infosys', 'TCS', 'Wipro', 'Capgemini']
applications = [93000, 61000, 60000, 40000, 30000]  # 5-year LCA totals
avg_salaries = [90000, 88000, 85000, 87000, 92000]  # Average base salaries

# Create figure with specific size for Twitter (16:9 aspect ratio)
fig, ax = plt.subplots(figsize=(15.36, 8.64), dpi=100)

# Create horizontal bars
y_pos = np.arange(len(companies))
bars = ax.barh(y_pos, applications, height=0.6, color='#DC2626', edgecolor='#991B1B', linewidth=2)

# Add application numbers inside bars (white text)
for i, (bar, apps) in enumerate(zip(bars, applications)):
    width = bar.get_width()
    ax.text(width * 0.5, bar.get_y() + bar.get_height()/2,
            f'{apps:,}',
            ha='center', va='center', color='white',
            fontsize=22, fontweight='bold', family='monospace')

# Add salary labels at end of bars
for i, (bar, salary) in enumerate(zip(bars, avg_salaries)):
    width = bar.get_width()
    ax.text(width + 2000, bar.get_y() + bar.get_height()/2,
            f'${salary//1000}k',
            ha='left', va='center', color='#991B1B',
            fontsize=24, fontweight='bold')

# Customize y-axis
ax.set_yticks(y_pos)
ax.set_yticklabels(companies, fontsize=26, fontweight='600')

# Customize x-axis
ax.set_xlabel('H-1B Applications (5-Year Total)', fontsize=20, fontweight='600', color='#1F2937')
ax.set_xlim(0, 105000)
ax.xaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'{int(x):,}'))
ax.tick_params(axis='x', labelsize=16)

# Add grid
ax.grid(axis='x', alpha=0.3, linestyle='--', linewidth=0.8, color='#E5E7EB')
ax.set_axisbelow(True)

# Title and subtitle
fig.suptitle('IT Staffing Firms: The Low-Wage H-1B Tier',
             fontsize=36, fontweight='bold', color='#1F2937', y=0.98)
ax.text(0.5, 1.05, '95%+ Indian workers  |  Contract model  |  5-year totals',
        transform=ax.transAxes, ha='center', fontsize=18,
        color='#6B7280', style='italic')

# Add annotation box
textstr = 'Average salaries: $80k-$92k\nData source: Robert Sterling analysis (Dec 2024)'
props = dict(boxstyle='round', facecolor='#FEF3C7', alpha=0.8, edgecolor='#F59E0B', linewidth=2)
ax.text(0.98, 0.05, textstr, transform=ax.transAxes, fontsize=12,
        verticalalignment='bottom', horizontalalignment='right', bbox=props)

# Remove top and right spines
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_linewidth(2)
ax.spines['bottom'].set_linewidth(2)

# Tight layout
plt.tight_layout()

# Save with high quality
output_path = '../images/chart-8-it-staffing-firms-python.png'
plt.savefig(output_path, dpi=150, bbox_inches='tight', facecolor='white', edgecolor='none')
print(f"Chart 8 saved to: {output_path}")

# Also display if running interactively
# plt.show()
