# Real Supernova Bolometric Light Curves Dataset (Version 1.0.0)

## Summary

This dataset contains 74 real supernova bolometric light curves compiled from observational astronomy data. Each light curve captures the temporal evolution of bolometric luminosity - the total energy output across all wavelengths - throughout the supernova event. The data is formatted as a time series with 421 temporal observation bins, where values represent log₁₀(luminosity) in erg/s.

This dataset was created for the **ASTRAI project** at Koexai S.r.l., specifically to train and validate deep learning models (diffusion models) that generate synthetic supernova light curves. It preserves realistic observational characteristics including sparse sampling, missing data, and irregular temporal coverage.

## Contents

```
dataset/
├── 74_SNE_bolometric_real.parquet     # Main data file (72 supernovae × 421 time steps)
├── checksums.txt                      # SHA-256 checksums for light_curves.parquet
├── README.md                          # This file
├── metadata.json                      # Machine-readable structured metadata
├── dictionary.csv                     # Data dictionary defining column structure
├── provenance.md                      # Detailed data acquisition and processing methods
└── LICENSE                            # CC-BY-4.0 license text
```

## Quick Start

### Loading the Data

**Python with pandas:**
```python
import pandas as pd

# Read the parquet file
df = pd.read_parquet('74_SNE_bolometric_real.parquet')

# Display basic information
print(f"Shape: {df.shape}")  # (72, 421)
print(f"Columns: {df.columns.tolist()}")  # [0, 1, 2, ..., 420]

# Extract a single supernova light curve
supernova_0 = df.iloc[0].values  # Array of 421 luminosity values (may contain NaN)

# Count non-missing observations per supernova
observations_per_sn = df.notna().sum(axis=1)
print(f"Average observations per SN: {observations_per_sn.mean():.1f}")
```

**Python with PyArrow:**
```python
import pyarrow.parquet as pq

# Read the parquet file
table = pq.read_table('74_SNE_bolometric_real.parquet')
df = table.to_pandas()
```

### Data Structure
- **Rows (74)**: Individual supernova events
- **Columns (421)**: Temporal bins representing sequential time steps
- **Values**: log₁₀(L) where L is bolometric luminosity in erg/s
- **Missing data**: NaN indicates no observation at that time step for that supernova

### Typical Luminosity Range
- Minimum: log₁₀(L) ≈ 0.663 (approximately 4.6 × 10³⁸ erg/s)
- Maximum: log₁₀(L) ≈ 7.831 (approximately 6.8 × 10⁴³ erg/s)
- This range encompasses typical Type Ia and core-collapse supernova peak luminosities

## Structure and Formats

### File Format
- **Primary format**: Parquet (`.parquet`)
- **Encoding**: UTF-8
- **Compression**: Snappy compression (default for Parquet)
- **Schema**: 421 columns, all of type `float64`

### Column Naming Convention
Columns are indexed numerically from `0` to `420`, representing sequential time steps in the light curve evolution. The exact temporal mapping (e.g., days since explosion) may vary per supernova.

### Missing Value Convention
`NaN` (Not a Number) values indicate missing observations. This is realistic for astronomical time series where observational cadence is irregular, weather conditions affect visibility, or certain epochs were not observed.

### Units and Conventions
- **Luminosity**: Values are logarithmic, log₁₀(L), where L is in erg/s
- **To convert to linear scale**: `L_linear = 10**L_log` (in erg/s)
- **Time steps**: Represent discretized temporal bins; exact time-to-bin mapping requires consultation of individual supernova metadata (not included in this dataset)

### Data Dictionary
See `dictionary.csv` for detailed column definitions.

## Provenance and Methods

### Data Sources
Compiled from public supernova databases:
- Open Supernova Catalog (OSC)
- Weizmann Interactive Supernova Data Repository (WISeREP)
- Published multi-band photometric observations

### Processing Steps
1. **Photometric data extraction**: Multi-band light curves collected
2. **Bolometric corrections**: Converted from filtered photometry to total bolometric luminosity using standard astrophysical corrections
3. **Distance corrections**: Applied distance modulus to convert to absolute luminosities
4. **Temporal binning**: Irregular observations discretized into 421 uniform time bins
5. **Logarithmic transformation**: Applied log₁₀ transformation for ML-friendly dynamic range
6. **Quality control**: Visual inspection and outlier filtering

For comprehensive processing details, see `provenance.md`.

### Tools Used
- Python 3.10+ with pandas, numpy, astropy
- Apache Parquet for data storage
- Standard astronomical analysis libraries

## Quality and Limitations

### Validation
- ✓ Physical plausibility checks: All luminosities within known supernova ranges
- ✓ Manual inspection: Visual review of all 72 light curves
- ✓ Consistency verification: Cross-checked against published supernova literature

### Known Limitations
1. **Sparse sampling**: Many supernovae have significant gaps in temporal coverage (reflected as NaN values)
2. **Selection bias**: Dataset is not volume-complete; brighter, well-observed supernovae are overrepresented
3. **Heterogeneous quality**: Light curves from different surveys have varying photometric precision
4. **Bolometric uncertainties**: Systematic uncertainties in bolometric corrections, especially for limited wavelength coverage
5. **Temporal alignment imperfect**: Discretization may not perfectly capture all supernovae on a common time axis

## Licence and Citation

### Licence
This dataset is released under **Creative Commons Attribution 4.0 International (CC-BY-4.0)**.

You are free to:
- **Share**: Copy and redistribute the material in any medium or format
- **Adapt**: Remix, transform, and build upon the material for any purpose, even commercially

Under the following terms:
- **Attribution**: You must give appropriate credit, provide a link to the license, and indicate if changes were made

Full license text: https://creativecommons.org/licenses/by/4.0/


## Project Context

This dataset was created as part of the **ASTRAI** (Artificial Intelligence for Supernova Time-series Analysis) project at **Koexai S.r.l.**, funded through Italy's PNRR (Piano Nazionale di Ripresa e Resilienza) initiative.

**Project goals:**
- Develop diffusion models for generating realistic synthetic supernova light curves
- Advance AI applications in time-domain astrophysics
- Create tools for augmenting limited observational datasets

**Institution:**  
Koexai S.r.l.  
Via Josemaria Escrivá 6  
Catania, Sicily, Italy  
Website: https://www.koexai.com

## Contact

- **Project**: ASTRAI (Koexai S.r.l.) visit [https://astrai.koexai.com]
- **Email**: [info@koexai.com]
- **LinkedIn**:[https://www.linkedin.com/company/koexai/]

For questions about the dataset, model details, or usage recommendations, please contact the maintainer.
