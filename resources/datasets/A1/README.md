# Synthetic Supernova Light Curves Dataset - 421 Days (Version 1.0.0)

## Summary

This dataset contains synthetic light curves generated using semi-analytical models for supernova research. Each light curve consists of 421 daily flux measurements covering 421 consecutive days of supernova evolution. The dataset includes four corresponding physical parameters for each simulated supernova: progenitor radius, mass, explosion energy, and nickel-56 percentage. The dataset is designed to support machine learning applications in supernova classification and physical parameter estimation with daily cadence observations.

## Contents

```
datasets/A1/
├── light_curves.parquet     # Time series data (N × 421 days)
├── params.parquet          # Physical parameters (N × 4 parameters)
├── metadata.json           # Machine-readable metadata
├── README.md              # This file
└── data_dictionary.csv    # Variable definitions
```

### File Descriptions

- **light_curves.parquet**: Contains synthetic supernova light curves with 421 daily measurements each
- **params.parquet**: Corresponding physical parameters for each light curve (4 parameters per supernova)
- **data_dictionary.csv**: Detailed descriptions of all variables in both files

## Quick Start

### Loading the Data

```python
import pandas as pd
import pyarrow.parquet as pq

# Load light curves
light_curves = pd.read_parquet('light_curves.parquet')
print(f"Light curves shape: {light_curves.shape}")

# Load physical parameters  
params = pd.read_parquet('params.parquet')
print(f"Parameters shape: {params.shape}")

# Each row corresponds to one supernova
# light_curves.iloc[0] contains the first light curve (421 daily points)
# params.iloc[0] contains the corresponding physical parameters
```

### Example Usage

```python
import matplotlib.pyplot as plt

# Plot first light curve
days = range(1, 422)  # Day 1 to day 421
plt.figure(figsize=(10, 6))
plt.plot(days, light_curves.iloc[0].values)
plt.xlabel('Days since explosion')
plt.ylabel('Flux (arbitrary units)')
plt.title('Example Synthetic Supernova Light Curve')
plt.grid(True)
plt.show()

# Display corresponding parameters
print("Physical parameters for this light curve:")
print(f"Progenitor radius: {params.iloc[0]['radius']} solar radii")
print(f"Progenitor mass: {params.iloc[0]['mass']} solar masses")
print(f"Explosion energy: {params.iloc[0]['energy']} ergs")
print(f"Nickel percentage: {params.iloc[0]['nickel']}%")
```

## Structure and Formats

### File Formats
- **Format**: Apache Parquet (.parquet)
- **Encoding**: UTF-8
- **Compression**: Snappy (default Parquet compression)

### Temporal Conventions
- **Time coverage**: 421 consecutive days from explosion start
- **Sampling**: Daily measurements (day 1, day 2, ..., day 421)
- **Time reference**: Day 1 corresponds to explosion start
- **Flux units**: Arbitrary units (consistent within each model)
- **Missing values**: Encoded as NaN

### Column Structure
**light_curves.parquet**:
- Columns: `day_1`, `day_2`, `day_3`, ..., `day_421`
- Each column represents flux at that specific day post-explosion

**params.parquet**:
- `radius`: Progenitor radius (solar radii)
- `mass`: Progenitor mass (solar masses)  
- `energy`: Explosion energy (ergs)
- `nickel`: Nickel-56 percentage (% of total ejecta mass)

### Relationships Between Files
- Both files have the same number of rows
- Row indices correspond between files (row i in light_curves.parquet corresponds to row i in params.parquet)
- No explicit key columns - relationship is implicit through row order

## Provenance and Methods

### Data Generation
- **Source**: Semi-analytical supernova models
- **Generation period**: 2025
- **Model type**: Physics-based synthetic light curve generator
- **Parameter space**: Systematic sampling of core progenitor properties

### Physical Parameters
The four physical parameters characterize essential supernova properties:
1. **Progenitor radius** (solar radii): Size of the pre-explosion star
2. **Progenitor mass** (solar masses): Total mass of the progenitor
3. **Explosion energy** (ergs): Kinetic energy imparted to the ejecta
4. **Nickel-56 percentage** (%): Fraction of ejecta mass in radioactive nickel

### Processing Steps
1. Parameter space definition and sampling for four core parameters
2. Semi-analytical model execution for each parameter set
3. Daily flux computation over 421-day period
4. Quality control and validation checks
5. Data export to Parquet format

### Validation
- Model consistency checks applied to all generated light curves
- Parameter ranges validated against physically reasonable bounds
- Daily sampling uniformity verified across all light curves
- Peak times and decay rates checked for physical consistency

## Quality and Limitations

### Dataset Quality
- **Completeness**: 100% (no missing light curves or daily measurements)
- **Consistency**: All light curves follow same 421-day temporal grid
- **Coverage**: Complete 421-day observation window for all objects

### Known Limitations
1. **Daily sampling**: May miss rapid variability features occurring on sub-daily timescales
2. **Model approximations**: Semi-analytical models may not capture all physical complexity of real supernovae
3. **Simplified parameter space**: Only four core parameters varied; other properties held constant
4. **No observational effects**: No observational noise, instrumental effects, weather gaps, or detection limits
5. **Limited diversity**: Parameter combinations may not cover all possible supernova subtypes

### Recommended Usage
- **Suitable for**: Algorithm development with daily cadence observations, method testing for survey-like data
- **Not recommended for**: High-time-resolution studies, direct comparison with observational data without noise modeling
- **Best practices**: Add realistic observational effects when comparing to survey data; validate methods on real observations

## Data Statistics

### Temporal Coverage
- **Duration**: 421 days per light curve
- **Sampling**: Daily cadence (24-hour intervals)
- **Completeness**: No missing days in any light curve

### Parameter Ranges
Parameter ranges are physically motivated and span typical supernova progenitor properties:
- **Radius**: [specific range] solar radii
- **Mass**: [specific range] solar masses
- **Energy**: [specific range] ergs  
- **Nickel**: [specific range]% of ejecta mass

## How to Cite

### Plain Text Citation
[Your Name]. (2025). Synthetic Supernova Light Curves Dataset - 421 Days (Version 1.0.0). Koexai Srl.

### BibTeX Entry
```bibtex
@dataset{sn_lc_421d_2025,
  author = {[Your Name]},
  title = {Synthetic Supernova Light Curves Dataset - 421 Days},
  year = {2025},
  version = {1.0.0},
  publisher = {Koexai Srl},
  note = {Synthetic supernova light curves with 421 daily measurements and 4 physical parameters}
}
```

## Contact

- **Maintainer**: [Your Name]
- **Email**: [your.email@koexai.com]
- **Organization**: Koexai Srl
- **Website**: https://koexai.com

For questions about the dataset, model details, or usage recommendations, please contact the maintainer.
