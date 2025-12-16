# ASTRAI: Advanced Supernova Transient Research with Artificial Intelligence. 
## Overview

This dataset contains bolometric light curves for 74 real supernovae, designed for training and validating machine learning models in supernova analysis and classification tasks. The data represents the evolution of bolometric luminosity over time for various supernova events.

## Dataset Structure

### Format
- **File**: `74_SNE_bolometric_real.parquet`
- **Format**: Apache Parquet (optimised for analytical queries)
- **Dimensions**: 72 supernovae × 421 time bins

### Data Organisation

The dataset is structured as a sparse matrix where:
- **Rows**: Individual supernova events (72 total)
- **Columns**: Discrete time steps (0-420, representing temporal evolution)
- **Values**: Bolometric luminosity measurements (likely in units of 10^43 erg/s or log scale)

### Sparsity Characteristics

The dataset exhibits significant sparsity, reflecting the realistic observational constraints of supernova monitoring:

- **Data completeness**: 6.32% (1,916 measurements out of 30,312 possible values)
- **Observations per supernova**:
  - Minimum: 7 data points
  - Maximum: 62 data points
  - Mean: 26.6 data points
  - Median: 24.0 data points

This sparsity pattern mimics real-world observational challenges including weather conditions, telescope availability, and survey cadence limitations.

## Physical Properties

### Luminosity Range

The bolometric luminosity values span several orders of magnitude, capturing the diverse energetic evolution of different supernova types:

- **Minimum**: 0.011 × 10^43 erg/s
- **Maximum**: 31.903 × 10^43 erg/s
- **Mean**: 1.419 × 10^43 erg/s

This range encompasses both Type Ia and core-collapse supernovae, with their characteristic peak luminosities and decay timescales.

### Temporal Coverage

The 421 time bins provide comprehensive coverage of the supernova evolution from early rise through late-time decay phases. Each column index represents a discrete temporal epoch, allowing the reconstruction of complete light curve morphologies.

## Data Quality

### Missing Data

Missing values (NaN) are intentionally preserved to reflect:
- Observational gaps due to instrumental constraints
- Cadence limitations of survey programs
- Pre-maximum and post-maximum temporal coverage variations
- Signal-to-noise thresholds in photometric measurements

### Representative Examples

Example light curve coverage patterns:

1. **Supernova 0**: 28 observations spanning time bins 9-125
2. **Supernova 1**: 44 observations spanning time bins 39-187  
3. **Supernova 2**: 54 observations spanning time bins 2-171

## Machine Learning Applications

This dataset is suitable for various astrophysical ML tasks:

### Supervised Learning
- Supernova type classification (Ia vs core-collapse)
- Peak magnitude prediction
- Rise/decline time estimation
- Explosion parameter inference

### Time Series Analysis
- Light curve interpolation and extrapolation
- Phase determination
- Feature extraction (rise time, decline rate, peak luminosity)
- Temporal pattern recognition

### Generative Models
- Synthetic light curve generation
- Data augmentation for sparse observations
- Missing data imputation
- Variability characterisation

### Transfer Learning
- Pre-training on real data for photometric simulations
- Domain adaptation between different survey cadences
- Representation learning for transient classification

## Usage Example

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load the dataset
df = pd.read_parquet('74_SNE_bolometric_real.parquet')

# Extract a single light curve
sn_idx = 2  # Example supernova
light_curve = df.iloc[sn_idx].dropna()

# Time axis (column indices represent temporal bins)
times = light_curve.index.astype(int).values
luminosities = light_curve.values

# Plot
plt.figure(figsize=(10, 6))
plt.plot(times, luminosities, 'o-', markersize=4)
plt.xlabel('Time Bin')
plt.ylabel('Bolometric Luminosity (10$^{43}$ erg/s)')
plt.title(f'Supernova {sn_idx} - Bolometric Light Curve')
plt.grid(True, alpha=0.3)
plt.show()

# Dataset statistics
print(f"Total supernovae: {len(df)}")
print(f"Time bins: {len(df.columns)}")
print(f"Average observations per SN: {df.notna().sum(axis=1).mean():.1f}")
print(f"Data completeness: {df.notna().sum().sum() / df.size * 100:.2f}%")
```

## Data Preprocessing Recommendations

### Handling Missing Data

Several strategies can be employed depending on the application:

1. **Gaussian Process Interpolation**: Ideal for smooth interpolation respecting observational uncertainties
2. **Cubic Spline Fitting**: Fast and efficient for well-sampled regions
3. **Neural Network Imputation**: Leverages learned patterns from complete observations
4. **Forward-fill / Backward-fill**: Simple baseline for exploratory analysis

### Normalisation

Consider the following normalisation approaches:

- **Peak normalisation**: Scale each light curve by its maximum value (useful for morphology studies)
- **Standardisation**: Zero mean, unit variance (recommended for neural network training)
- **Log-scale transformation**: Compress dynamic range for luminosity-based features

### Temporal Alignment

For comparative studies, light curves can be aligned by:
- Peak luminosity epoch (t_max)
- Rise time to maximum
- Explosion time (requires external metadata)

## Technical Notes

### File Format

The Parquet format provides:
- Efficient columnar compression (ideal for sparse data)
- Fast read performance for large-scale analysis
- Schema preservation with automatic type inference
- Direct compatibility with Pandas, Dask, and Apache Arrow

### Memory Considerations

Loading the full dataset requires approximately 250 KB RAM (sparse format). For batch processing of large datasets, consider:
- Memory-mapped file access
- Chunked reading strategies
- Dask DataFrame for out-of-core computation

## Citation

If you use this dataset in your research, please cite:

```bibtex
@dataset{astrai_2025,
  title={ASTRAI: Advanced Supernova Transient Research with Artificial Intelligence},
  author={koexai team},
  year={2025},
  publisher={Koexai S.r.l.},
  note={74 real supernova bolometric light curves for machine learning applications}
}
```

## Project Context

This dataset is part of the **ASTRAI** (Advanced Supernova Transient Research with Artificial Intelligence) project at Koexai S.r.l., focused on developing advanced machine learning techniques for supernova analysis, including:

- Automated light curve classification
- Early-type prediction from incomplete data
- Cosmological parameter estimation
- Multi-wavelength integration with spectroscopic observations
- Generative AI for supernovae light curves

## Data Provenance

The bolometric light curves are derived from multi-band photometric observations compiled from major transient surveys, with bolometric corrections applied using established physical models. Each light curve represents integrated flux across the electromagnetic spectrum.

## License

CC BY 4.0.

## Contact

For questions, bug reports, or collaboration inquiries:
- **Project**: ASTRAI (Koexai S.r.l.)
- **Email**: [info@koexai.com]
- **LinkedIn**:[https://www.linkedin.com/company/koexai/]

---

**Version**: 1.0  
**Last Updated**: 2025 
**Maintainer**: ASTRAI Development Team