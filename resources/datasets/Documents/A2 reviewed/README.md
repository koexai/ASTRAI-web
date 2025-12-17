# Synthetic Supernova Light Curves Dataset with 7 parameters(Version 1.0.0)

## Summary

This dataset contains approximately 10,000 synthetic light curves generated using semi-analytical models for supernova research. Each light curve consists of 1,601 uniformly distributed temporal samples spanning 400 days with a 6-hour cadence. The dataset is designed to support machine learning applications in supernova classification and physical parameter estimation studies.

## Contents

```
datasets/A2/
├── light_curves.parquet    # Time series data (10,000 × 1,601 samples)
├── params.parquet          # Physical parameters (10,000 × 7 parameters)
├── metadata.json           # Machine-readable metadata
├── dictionary.csv          # Variable definitions and data dictionary
├── checksums_1.txt         # SHA-256 checksums for light_curves.parquet
├── checksums_2.txt         # SHA-256 checksums for params.parquet
├── citation.txt            # Citation information for dataset usage
├── provenance.md           # Data generation methodology and provenance
├── LICENSE_CC_BY_40.md     # Creative Commons BY 4.0 license
└── README.md               # This file
```


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
# light_curves.iloc[0] contains the first light curve (1,601 time points)
# params.iloc[0] contains the corresponding physical parameters
```

### Data Format

- **Time coverage**: 400 days from explosion start
- **Temporal resolution**: 6-hour uniform sampling
- **Total time points**: 1,601 per light curve
- **Flux units**: Arbitrary units (model-dependent scaling)
- **Missing values**: Encoded as NaN

## Structure and Formats

### File Formats
- **Format**: Apache Parquet (.parquet)
- **Encoding**: UTF-8
- **Compression**: Snappy (default Parquet compression)

### Temporal Conventions
- Time zero corresponds to explosion start
- Time points: [0, 6, 12, ..., 9600] hours (0 to 400 days)
- Flux values in arbitrary units (consistent within each model)

### Relationships Between Files
- Both files have the same number of rows (≈11,121)
- Row indices correspond between files (row i in light_curves.parquet corresponds to row i in params.parquet)
- No explicit key columns - relationship is implicit through row order

## Provenance and Methods

### Data Generation
- **Source**: Semi-analytical supernova models
- **Generation period**: 2025
- **Model type**: Physics-based synthetic light curve generator
- **Parameter space**: Systematic sampling of progenitor and circumstellar medium properties

### Physical Parameters
The seven physical parameters characterize:
1. **Progenitor properties**: radius, mass, energy
2. **Nucleosynthesis**: nickel percentage  
3. **Environment**: circumstellar medium radius and mass
4. **Model parameter**: slope parameter

### Processing Steps
1. Parameter space definition and sampling
2. Semi-analytical model execution for each parameter set
3. Temporal sampling at uniform 6-hour intervals
4. Quality control and validation checks
5. Data export to Parquet format

### Validation
- Model consistency checks applied to all generated light curves
- Parameter ranges validated against physical constraints
- Temporal sampling uniformity verified
- No missing or corrupted light curves detected

## Quality and Limitations

### Dataset Quality
- **Completeness**: 100% (no missing light curves)
- **Consistency**: All light curves follow same temporal grid
- **Coverage**: 400-day observation window for all objects

### Known Limitations
1. **Model approximations**: Semi-analytical models may not capture all physical complexity of real supernovae
2. **Parameter space**: Limited to specific ranges of progenitor and circumstellar medium configurations  
3. **Observational realism**: No observational noise, instrumental effects, or atmospheric conditions included
4. **Diversity**: Parameter sampling may not cover all possible supernova types

### Recommended Usage
- **Suitable for**: Algorithm development, method testing, proof-of-concept studies
- **Not recommended for**: Direct comparison with observational data without proper noise modeling and calibration
- **Best practices**: Add realistic noise models when comparing to observations; validate methods on observational data

## How to Cite

### Plain Text Citation
[Your Name]. (2025). Synthetic Supernova Light Curves Dataset (Version 1.0.0). Koexai Srl.

### BibTeX Entry
```bibtex
@dataset{sn_lc_syn_2025,
  author = {[Cosentino, S.]},
  title = {Synthetic Supernova Light Curves Dataset - 1601 Hourly flux},
  year = {2025},
  version = {1.0.0},
  publisher = {Koexai Srl},
}
```

## Contact

- **Project**: ASTRAI (Koexai S.r.l.) visit [https://astrai.koexai.com]
- **Email**: [info@koexai.com]
- **LinkedIn**:[https://www.linkedin.com/company/koexai/]

For questions about the dataset, model details, or usage recommendations, please contact the maintainer.
