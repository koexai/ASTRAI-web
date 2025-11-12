# Provenance and Methods

## Data Generation Overview

This document describes the complete workflow used to generate the Synthetic Supernova Light Curves Dataset, from parameter space definition to final data validation.

## 1. Acquisition Sources

### Model Framework
- **Model Type**: Semi-analytical supernova light curve models
- **Physical Basis**: Multi-zone supernova explosion and radiative transfer models
- **Implementation**: Custom modeling pipeline developed for synthetic data generation
- **Generation Date**: August 2025

### Parameter Space Design
The synthetic dataset covers a systematic sampling of the supernova parameter space defined by seven key physical quantities:

1. **Progenitor Properties**
   - Progenitor radius (solar radii)
   - Progenitor mass (solar masses) 
   - Explosion energy (ergs)

2. **Nucleosynthesis**
   - Nickel-56 percentage (% of total ejecta mass)

3. **Circumstellar Environment**
   - Circumstellar medium (CSM) radius (parsecs)
   - CSM mass (solar masses)

4. **Model Parameters**
   - Slope parameter (dimensionless, controls light curve evolution)

## 2. Processing Pipeline

### Step 1: Parameter Sampling
- **Sampling Method**: Latin hypercube sampling for efficient parameter space coverage
- **Sample Size**: ~10,000 parameter combinations
- **Range Validation**: All parameters checked against physically reasonable bounds
- **Dependencies**: Parameter correlations based on stellar evolution constraints

### Step 2: Light Curve Generation
For each parameter set:
1. **Model Initialization**: Set up multi-zone ejecta structure
2. **Radiative Transfer**: Calculate photon diffusion through expanding ejecta
3. **Energy Deposition**: Model radioactive decay heating (primarily Ni-56 → Co-56 → Fe-56)
4. **CSM Interaction**: Include circumstellar medium effects when applicable
5. **Temporal Evolution**: Compute flux evolution over 400-day period

### Step 3: Temporal Sampling
- **Time Grid**: Uniform 6-hour intervals from t=0 to t=400 days
- **Total Points**: 1,601 time samples per light curve
- **Interpolation**: Linear interpolation used when model output timesteps don't align with sampling grid
- **Boundary Conditions**: Extrapolation avoided; model run time extended to cover full 400-day window

### Step 4: Data Formatting
- **Normalization**: No flux normalization applied (preserves model-dependent scaling)
- **Units**: Time in hours from explosion, flux in arbitrary model units
- **Storage Format**: Apache Parquet with Snappy compression
- **Structure**: Separate files for light curves and parameters to optimize different access patterns

## 3. Quality Control and Validation

### Model Consistency Checks
1. **Energy Conservation**: Verify total radiated energy consistent with input explosion energy
2. **Causality**: Check that light curve features appear at physically reasonable times
3. **Monotonicity**: Validate that decline phases follow expected radioactive decay timescales
4. **Parameter Sensitivity**: Spot check that parameter variations produce expected light curve changes

### Data Integrity Validation
1. **Completeness**: Verify all 10,000 light curves successfully generated
2. **Temporal Consistency**: Check uniform 6-hour sampling across all light curves  
3. **Range Validation**: Confirm all flux values are finite and positive
4. **Format Verification**: Test Parquet file integrity and loading

### Physical Validation
1. **Peak Times**: Compare peak times with analytical estimates
2. **Decline Rates**: Validate late-time decline matches Ni-56 decay rate where appropriate
3. **Luminosity Scales**: Check absolute luminosities fall within expected ranges for given parameters
4. **Color Evolution**: For multi-band models, verify reasonable color evolution

## 4. Known Model Limitations and Assumptions

### Semi-Analytical Approximations
- **Spherical Symmetry**: All models assume spherically symmetric explosions
- **Homogeneous Mixing**: Perfect mixing of radioactive material assumed in most zones
- **LTE Conditions**: Local thermodynamic equilibrium assumed for opacity calculations
- **Gray Opacity**: Simplified opacity treatment may not capture all spectral features

### Parameter Space Constraints
- **Progenitor Types**: Limited to specific stellar evolution tracks
- **CSM Properties**: Simple density profiles assumed for circumstellar material
- **Explosion Mechanism**: Explosion energy treated as free parameter rather than outcome of physics
- **Metallicity**: Fixed metallicity assumed (not varied in parameter space)

### Temporal Limitations
- **Pre-explosion**: No modeling of pre-explosion variability or precursor activity
- **Very Early Times**: First few hours may be less reliable due to model initialization
- **Very Late Times**: After ~300 days, nebular phase approximations become less accurate

## 5. Software and Dependencies

### Core Modeling Code
- **Language**: Python 3.9+ with NumPy, SciPy
- **Custom Modules**: Proprietary semi-analytical supernova modeling pipeline
- **Version Control**: All code versions tracked and archived

### Data Processing
- **Pandas**: v1.5+ for data manipulation
- **PyArrow**: v10+ for Parquet file handling
- **Interpolation**: SciPy interpolate module for temporal resampling

### Quality Assurance
- **Testing Framework**: pytest for unit tests
- **Validation Scripts**: Custom validation pipeline with automated checks
- **Manual Review**: Statistical sampling of 10% of light curves for visual inspection

## 6. Reproducibility Information

### Deterministic Generation
- **Random Seed**: Fixed seed used for parameter sampling to ensure reproducibility
- **Model Parameters**: All model configuration files archived
- **Software Versions**: Complete environment specification available

### Verification
- **Independent Implementation**: Subset of models verified against independent code base  
- **Literature Comparison**: Selected cases compared with published analytical solutions
- **Cross-Validation**: Parameter recovery tests performed using subset of data

## Contact for Methods Questions

For detailed questions about the modeling approach, parameter choices, or validation procedures, contact:
- **Email**: [your.email@koexai.com]  
- **Subject Line**: "SN Light Curves Dataset - Methods Inquiry"
