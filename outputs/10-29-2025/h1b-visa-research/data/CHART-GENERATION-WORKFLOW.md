# Data Visualization Chart Generation Workflow

**Created**: October 29, 2025
**Purpose**: Standard process for generating accurate, professional data visualization charts
**Method**: Python (accuracy) → AI Enhancement (visual polish)

---

## THE PROBLEM WITH PURE AI CHART GENERATION

**Issue**: AI image generators (gpt-image-1, nanobanana, etc.) can:
- Misinterpret numbers or get them slightly wrong
- Miss labels or data points
- Create visually appealing but inaccurate charts
- Hallucinate data that wasn't in the prompt

**Solution**: Generate base chart with Python (100% accurate), then enhance with AI (visual polish)

---

## THE TWO-STEP WORKFLOW

### Step 1: Generate Accurate Base Chart (Python + matplotlib)

**Tool**: Python 3 + matplotlib + seaborn
**Output**: Pixel-perfect accurate data visualization
**Saved to**: `{session-folder}/images/chart-X-name-python.png`

**Example Script Structure**:
```python
import matplotlib.pyplot as plt
import numpy as np

# Set professional style
plt.style.use('seaborn-v0_8-darkgrid')
plt.rcParams['figure.facecolor'] = 'white'

# Your precise data
companies = ['Amazon', 'Microsoft', 'Meta']
values = [10044, 5189, 5123]  # EXACT numbers

# Create chart
fig, ax = plt.subplots(figsize=(15.36, 8.64), dpi=100)  # 16:9 for Twitter
bars = ax.barh(companies, values)

# Add labels, formatting, etc.
# Save to session folder
plt.savefig('../images/chart-X-name-python.png', dpi=150, bbox_inches='tight')
```

**Key Requirements**:
- Use exact data from research
- Clear labels with proper formatting
- Appropriate size (15.36 x 8.64 for 16:9 Twitter)
- High DPI (150 minimum)
- Save to session `/images/` folder
- Descriptive filename

### Step 2: Enhance with AI Image-to-Image (nanobanana)

**Tool**: nanobanana (Gemini 2.5 Flash Image) - better for editing than gpt-image-1
**Input**: Python-generated base chart
**Output**: Visually polished chart with 100% accurate data
**Saved to**: `{session-folder}/images/chart-X-name-ENHANCED.png`

**Prompt Template**:
```
Enhance this professional data visualization bar chart showing [TOPIC].

Preserve ALL numbers exactly: [LIST EVERY DATA POINT]

Make design more polished and modern with vibrant [COLOR] bars, improved typography, clean professional aesthetic.

Keep title "[EXACT TITLE]" and subtitle "[EXACT SUBTITLE]".

Enhance visual appeal while maintaining data accuracy.
```

**MCP Call**:
```python
mcp__nanobanana__generate_image(
    prompt="[enhancement instructions]",
    input_image_path_1="session-folder/images/chart-X-python.png",
    mode="edit",
    n=1
)
```

**Then Immediately Move to Session Folder**:
```bash
cp ~/nanobanana-images/edit_*.png \
   {session-folder}/images/chart-X-name-ENHANCED.png
```

---

## CHART TYPE SPECIFIC GUIDES

### Horizontal Bar Charts (Company Comparisons)

**Python Script Checklist**:
- [ ] Data in descending order (largest to smallest)
- [ ] Bars colored appropriately (red for problematic, green for positive)
- [ ] Values labeled inside bars (white text, monospace font)
- [ ] Secondary metric at end of bars (salary, compensation)
- [ ] Grid lines for scale reference
- [ ] X-axis formatted with commas (93,000 not 93000)
- [ ] Title bold and clear
- [ ] Subtitle with context
- [ ] Source annotation box

**Enhancement Focus**:
- Vibrant bar colors with subtle gradients
- Improved contrast for readability
- Cleaner typography
- Professional aesthetic

### Funnel Diagrams (Multi-Stage Processes)

**Python Script Checklist**:
- [ ] Stages arranged top to bottom or left to right
- [ ] Each stage labeled with exact numbers
- [ ] Drop-off percentages between stages
- [ ] Color gradient showing progression
- [ ] Clear arrows or connectors
- [ ] Annotations for key insights

**Enhancement Focus**:
- Smooth transitions between stages
- Eye-catching color gradients
- Clear hierarchy

### Pie Charts (Proportions)

**Python Script Checklist**:
- [ ] Percentages labeled clearly
- [ ] Exact numbers included
- [ ] Legend or direct labels
- [ ] Colors with high contrast
- [ ] Annotation for key insight

**Enhancement Focus**:
- Clean segment boundaries
- Readable labels at any size
- Modern flat design

---

## EXECUTION EXAMPLE: H-1B Charts 8 & 9

### Chart 8: IT Staffing Firms

**Step 1: Python Generation**
```bash
python3 generate_chart_8_it_staffing.py
# Output: ../images/chart-8-it-staffing-firms-python.png
```

**Data Used**:
- Cognizant: 93,000 applications, $90k salary
- Infosys: 61,000 applications, $88k salary
- TCS: 60,000 applications, $85k salary
- Wipro: 40,000 applications, $87k salary
- Capgemini: 30,000 applications, $92k salary

**Step 2: AI Enhancement**
```python
mcp__nanobanana__generate_image(
    prompt="Enhance... Preserve ALL numbers exactly: Cognizant 93,000 $90k...",
    input_image_path_1="images/chart-8-it-staffing-firms-python.png",
    mode="edit"
)
# Then move to: images/chart-8-it-staffing-ENHANCED.png
```

**Result**: ✅ Accurate data + professional visual polish

### Chart 9: Tech Companies

**Step 1: Python Generation**
```bash
python3 generate_chart_9_tech_companies.py
# Output: ../images/chart-9-tech-companies-python.png
```

**Data Used**:
- Amazon: 10,044 approvals, $300k+ total comp
- Microsoft: 5,189 approvals, $320k+ total comp
- Meta: 5,123 approvals, $380k+ total comp
- Apple: 4,202 approvals, $350k+ total comp
- Google: 4,181 approvals, $360k+ total comp

**Step 2: AI Enhancement**
```python
mcp__nanobanana__generate_image(
    prompt="Enhance... Preserve ALL numbers exactly: Amazon 10,044 $300k+...",
    input_image_path_1="images/chart-9-tech-companies-python.png",
    mode="edit"
)
# Then move to: images/chart-9-tech-companies-ENHANCED.png
```

**Result**: ✅ Accurate data + professional visual polish

---

## WHEN TO USE EACH APPROACH

### Use Python → AI Enhancement When:
- Data accuracy is CRITICAL (statistics, research, fact-checking)
- Complex charts (multi-series, many data points)
- Precise numerical comparisons
- Professional/editorial content
- Charts that will be scrutinized

### Use Pure AI Generation When:
- Conceptual diagrams (flows, processes)
- Illustrative charts (not precise data)
- Quick mockups or prototypes
- Visual metaphors
- Decorative infographics

### Use Pure Python (No AI) When:
- Scientific publications
- Academic papers
- Internal reports where aesthetics less important
- Maximum data integrity required

---

## DEPENDENCIES

### Python Environment Setup

**Create venv in session data folder**:
```bash
cd {session-folder}/data
python3 -m venv venv
source venv/bin/activate
pip install matplotlib seaborn numpy
```

**Required Libraries**:
- matplotlib (chart generation)
- seaborn (styling)
- numpy (data handling)

**Note**: Use venv to avoid system package conflicts

### MCP Tools

**For Enhancement**:
- **nanobanana** (preferred) - Better at preserving data in edits
- **gpt-image-1** (backup) - If nanobanana unavailable

---

## QUALITY CHECKLIST

### Before AI Enhancement:
- [ ] Python chart has ALL data points correct
- [ ] Numbers formatted properly (commas, decimals)
- [ ] Labels clear and readable
- [ ] Appropriate size for platform (16:9 for Twitter)
- [ ] Saved to session `/images/` folder
- [ ] Descriptive filename used

### After AI Enhancement:
- [ ] ALL numbers match Python version (verify visually)
- [ ] No data points missing
- [ ] Labels still readable
- [ ] Visual polish improved (colors, contrast, clarity)
- [ ] Moved to session `/images/` folder
- [ ] Filename: `chart-X-name-ENHANCED.png`

### Before Using in Content:
- [ ] Spot-check 3-5 random data points against source
- [ ] Verify title and subtitle preserved
- [ ] Check readability at Twitter thumbnail size
- [ ] Confirm colors appropriate for message (red=warning, green=positive)

---

## FILE ORGANIZATION STANDARD

**All files for chart generation stay in session folder**:

```
{session-folder}/
├── data/
│   ├── generate_chart_8.py          # Python script
│   ├── generate_chart_9.py          # Python script
│   ├── venv/                         # Virtual environment (gitignored)
│   └── raw_data.csv                  # Source data if needed
└── images/
    ├── chart-8-name-python.png       # Base version (Python)
    ├── chart-8-name-ENHANCED.png     # Enhanced version (AI) ← USE THIS
    ├── chart-9-name-python.png
    └── chart-9-name-ENHANCED.png     # ← USE THIS
```

**Keep Both Versions**:
- `-python.png`: Backup with guaranteed accuracy
- `-ENHANCED.png`: Polished version for posting

---

## TROUBLESHOOTING

### Issue: Python chart looks basic/ugly
**Solution**: That's expected. AI enhancement will fix aesthetics.

### Issue: AI enhancement changed numbers
**Solution**:
1. Check if difference is visual (2.5k displayed as 2,500) vs actual wrong number
2. If wrong: Use Python version (it's accurate)
3. If visual only: Acceptable
4. Try regenerating with more explicit "PRESERVE EXACTLY" instructions

### Issue: matplotlib not installed
**Solution**:
```bash
cd {session-folder}/data
python3 -m venv venv
source venv/bin/activate
pip install matplotlib seaborn
```

### Issue: Enhanced chart in wrong location
**Solution**: Always move immediately after generation:
```bash
cp ~/nanobanana-images/edit_*.png {session-folder}/images/chart-X-ENHANCED.png
```

---

## COST & TIME ESTIMATES

**Per Chart**:
- Python generation: FREE, ~30 seconds
- AI enhancement: ~$0.039 (nanobanana), ~10-15 seconds
- Total time: ~1 minute per chart
- Total cost: ~$0.04 per chart

**For 10 Charts**:
- Time: ~10 minutes (including script writing)
- Cost: ~$0.40

**Compare to Pure AI**:
- Pure AI: ~$0.04-0.08 per chart, but risk of inaccurate data
- Python + AI: ~$0.04 per chart, guaranteed accuracy

**Winner**: Python + AI (same cost, better accuracy)

---

## FUTURE IMPROVEMENTS

### Potential Enhancements:
1. Create reusable chart template library
2. Add interactive charts (plotly) for web
3. Automated data validation layer
4. Chart style presets (Twitter, LinkedIn, YouTube thumbnails)
5. Batch generation scripts for multiple charts

### Template Library Structure:
```
{project-root}/bmad/modules/chart-templates/
├── horizontal_bar.py
├── vertical_bar.py
├── pie_chart.py
├── funnel_diagram.py
├── timeline.py
└── multi_series_line.py
```

---

## UPDATED AGENT INSTRUCTION

**Add to instructions.md**:

```markdown
### Chart Generation Protocol

When generating data visualization charts:

1. **ALWAYS use Python + AI Enhancement workflow** for data charts
2. Python generates base with 100% accurate data
3. AI enhances visual polish via image-to-image
4. Save both versions to `{session-folder}/images/`
5. Use ENHANCED version for posting, keep Python as backup

Exception: Use pure AI only for conceptual/illustrative diagrams.
```

---

**WORKFLOW DOCUMENTED**

This is now the standard for all future data chart generation in Jarvis workflows.
