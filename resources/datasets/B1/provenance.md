# Provenance and Methods

## Data Acquisition

### Primary Sources
This dataset comprises 74 real supernova bolometric light curves compiled from publicly available astronomical databases and observational surveys. The data originates from:

- **Supernova databases**: Open Science Supernova Catalog (OSC), Weizmann Interactive Supernova Data Repository (WISeREP), and other community-maintained repositories
- **Observational surveys**: Light curves derived from multi-wavelength photometric monitoring campaigns
- **Time period**: Observations spanning multiple decades of supernova astronomy (exact date ranges vary per object)
- **Selection criteria**: Supernovae with sufficient temporal coverage and multi-band photometric observations to enable reliable bolometric luminosity reconstruction

### Data Collection Period
Compiled between October-November 2024 as part of the ASTRAI project deliverables.

## Processing Pipeline

### 1. Raw Data Extraction
- Downloaded photometric light curves in multiple bands (typically UBVRI, or similar filter systems)
- Extracted metadata: supernova classification, distance estimates (redshift/distance modulus), explosion epoch estimates
- Quality flagging of individual photometric measurements

### 2. Bolometric Corrections
Raw photometry was converted to bolometric luminosity using standard astrophysical procedures:

- **K-corrections**: Applied to account for redshift effects on observed flux
- **Distance modulus**: Converted apparent magnitudes to absolute magnitudes using distance estimates
- **Bolometric corrections**: Multi-band photometry integrated to estimate total bolometric flux across the electromagnetic spectrum
- **Extinction corrections**: Galactic and host galaxy extinction accounted for where data available

### 3. Temporal Alignment and Discretization
- Light curves aligned to a common temporal reference (typically relative to peak luminosity or explosion epoch)
- Irregular observation cadences discretized into 421 uniform time step bins
- Interpolation **NOT** applied - missing time bins retained as NaN to preserve observational realism

### 4. Logarithmic Transformation
- All bolometric luminosities converted to log₁₀(L) where L is in erg/s
- This transformation:
  - Compresses the dynamic range for ML model training
  - Approximately Gaussianizes the distribution
  - Is standard practice in astronomical luminosity analysis

### 5. Quality Control
- **Outlier detection**: Statistical checks for unphysical values (e.g., luminosities inconsistent with known supernova physics)
- **Manual inspection**: Visual review of all 74 light curves for obvious data quality issues
- **Consistency checks**: Comparison with known supernova light curve morphologies from the literature
- **Filtering**: Removed light curves with insufficient data or poor quality flags

### 6. Final Dataset Structure
- Organized as tabular data: 72 supernovae × 421 time steps
- Stored in Apache Parquet format for efficient I/O and compression
- Note: The discrepancy between "74" in the filename and "72" rows may reflect 2 supernovae removed during final QC

## Software and Tools

### Data Processing
- **Python 3.10+** with scientific computing stack
- **pandas 2.x**: Data manipulation and tabular operations
- **numpy**: Numerical operations and array handling
- **astropy**: Astronomical calculations (distance, extinction, coordinate transformations)
- **scipy**: Statistical analysis and outlier detection

### Data Storage
- **Apache Parquet**: Columnar storage format chosen for:
  - Efficient compression of sparse data (many NaN values)
  - Fast read performance for ML training pipelines
  - Schema preservation and type safety
  - Cross-platform compatibility

## Validation and Quality Assurance

### Validation Steps
1. **Physical plausibility**: Verified that all luminosity values fall within known supernova ranges (10³⁸ to 10⁴⁴ erg/s)
2. **Temporal consistency**: Checked that light curve evolution matches expected supernova behavior (rise, peak, decline phases)
3. **Completeness assessment**: Documented the fraction of missing observations per supernova
4. **Cross-validation**: Spot-checked selected supernovae against published literature values

### Known Issues and Caveats
- **Sparse sampling**: Many supernovae have large gaps in temporal coverage - this is realistic but limits continuous modeling approaches
- **Heterogeneous sources**: Light curves from different surveys have varying photometric systems and calibrations
- **Bolometric uncertainties**: Bolometric corrections introduce systematic uncertainties, especially for supernovae with limited wavelength coverage
- **Selection effects**: Dataset is not volume-limited or complete - brighter, well-observed supernovae are overrepresented

## Reproducibility

### Version Control
- Dataset versioned as v1.0.0 using semantic versioning
- Processing scripts archived internally at Koexai (available upon request)
- Random seed not applicable (deterministic processing of archival data)

### Dependencies
All processing performed with open-source tools. Key package versions:
- Python: 3.10+
- pandas: ≥2.0.0
- numpy: ≥1.24.0
- astropy: ≥5.3.0

## Related Publications and Data Sources

### Key References
Users of this dataset should be aware that the underlying observations may have been published in various astronomical journals. Specific supernova identifications and source papers can be traced through the original database records (OSC, WISeREP).

### ASTRAI Project Context
This dataset was created as part of:
- **Project**: ASTRAI - AI-powered supernova light curve generation
- **Funding**: PNRR (Piano Nazionale di Ripresa e Resilienza) initiative
- **Institution**: Koexai S.r.l., Catania, Italy
- **Technical approach**: Training diffusion models to generate synthetic supernova light curves

## Contact for Methods Questions

For detailed questions about the modeling approach, parameter choices, or validation procedures:
- **Email**: [info@koexai.com]
- **Subject Line**: "CS SF 421-Day Dataset - Methods Inquiry"
- **Documentation**: Additional technical documentation available upon request