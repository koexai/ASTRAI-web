# Provenance and Methods

## Data Generation Overview

This document describes the complete workflow used to generate the Synthetic Supernova Light Curves Dataset with 421 daily measurements, from parameter space definition to final data validation.

## 1. Acquisition Sources

### Model Framework
- **Model Type**: Semi-analytical supernova light curve models
- **Physical Basis**: Multi-zone supernova explosion and radiative transfer models
- **Implementation**: Custom modeling pipeline developed for synthetic data generation
- **Generation Date**: August 2025

### Parameter Space Design
The synthetic dataset covers a systematic sampling of the supernova parameter space defined by four core physical quantities:

1. **Progenitor Radius** (solar radii)
   - Controls the initial size of the exploding star
   - Affects early-time light curve evolution and peak brightness

2. **Progenitor Mass** (solar masses)
   - Determines total ejecta mass and expansion velocity
   - Influences light curve width and late-time evolution

3. **Explosion Energy** (ergs)
   - Sets kinetic energy of the explosion
   - Controls expansion velocity and shock breakout properties

4. **Nickel-56 Percentage** (% of ejecta mass)
   - Determines radioactive heating power
   - Primary driver of peak luminosity and decline rate

## 2. Processing Pipeline

### Step 1: Parameter Sampling
- **Sampling Method**: Latin hypercube sampling for efficient parameter space coverage
- **Parameter Ranges**: Physically motivated bounds based on stellar evolution models
- **Range Validation**: All parameters checked against observational constraints
- **Correlations**: Independent sampling (no imposed parameter correlations)

### Step 2: Light Curve Generation
For each parameter set:
1. **Model Initialization**: Set up spherically symmetric ejecta structure
2. **Radiative Transfer**: Calculate photon diffusion through expanding ejecta
3. **Energy Sources**: Model radioactive decay heating (Ni-56 → Co-56 → Fe-56 chain)
4. **Thermal Evolution**: Compute temperature and ionization state evolution
5. **Flux Calculation**: Calculate bolometric luminosity and flux at Earth

### Step 3: Daily Temporal Sampling
- **Time Grid**: Daily intervals from day 1 to day 421 post-explosion
- **Total Points**: 421 daily samples per light curve
- **Sampling Strategy**: Model computed at higher temporal resolution, then sampled daily
- **Interpolation**: Cubic spline interpolation used when needed for daily grid
- **Boundary Handling**: Model extended beyond 421 days to avoid edge effects

### Step 4: Data Formatting
- **Normalization**: No flux normalization applied (preserves absolute model scaling)
- **Units**: Time in integer days, flux in arbitrary model units
- **Column Structure**: 421 columns named `day_0` through `day_420`
- **Storage Format**: Parquet with Snappy compression
- **File Organization**: Separate files for light curves and parameters

## 3. Quality Control and Validation

### Model Consistency Checks
1. **Energy Conservation**: Total radiated energy compared to input explosion energy
2. **Peak Timing**: Peak times consistent with diffusion time estimates
3. **Nickel Decay**: Late-time slopes match expected Ni-56/Co-56 decay rates
4. **Parameter Sensitivity**: Spot checks that parameter variations produce expected changes

### Data Integrity Validation
1. **Completeness**: Verify all light curves have 421 valid daily measurements
2. **Temporal Consistency**: Confirm uniform daily sampling across all curves
3. **Physical Bounds**: Check all flux values are positive and finite
4. **Format Verification**: Test Parquet file integrity and column naming

### Physical Validation
1. **Rise Times**: Early rise consistent with shock breakout physics
2. **Peak Luminosities**: Peak brightness scales appropriately with nickel mass
3. **Decline Rates**: Post-peak evolution follows expected trends
4. **Late-time Behavior**: Nebular phase decline matches radioactive decay

## 4. Software and Dependencies

### Core Modeling Code
- **Language**: Python 3.9+ with NumPy, SciPy
- **Custom Libraries**: Proprietary semi-analytical supernova modeling suite
- **Numerical Methods**: Finite difference integration, spline interpolation
- **Version Control**: Git repository with tagged release versions

### Data Processing Pipeline
- **Pandas**: v2.0+ for DataFrame operations
- **PyArrow**: v12+ for efficient Parquet I/O
- **SciPy**: Interpolation and numerical routines
- **Parallel Processing**: Multiprocessing for parameter space exploration

### Quality Assurance
- **Unit Testing**: Comprehensive test suite for all model components
- **Integration Tests**: End-to-end pipeline validation
- **Statistical Validation**: Automated checks for parameter distribution properties
- **Manual Review**: Visual inspection of representative light curve samples

## 5. Reproducibility Information

### Deterministic Generation
- **Random Seeds**: Fixed seeds for all stochastic components
- **Parameter Files**: Complete parameter space specification archived
- **Model Configuration**: All model settings and options documented
- **Environment**: Full software environment specification available

### Validation and Verification
- **Code Verification**: Unit tests for all numerical components
- **Model Validation**: Comparison with analytical limits and published results
- **Statistical Tests**: Parameter recovery and sensitivity analysis
- **Independent Review**: Subset verified by independent implementation

## 6. Usage Recommendations

### Appropriate Applications
- **Algorithm Development**: Testing ML algorithms with daily cadence data
- **Method Validation**: Benchmarking parameter estimation techniques  
- **Survey Planning**: Understanding detection and classification capabilities
- **Statistical Studies**: Large-sample supernova population analysis

### Limitations to Consider
- **Observational Realism**: Add noise and observational effects for realistic comparisons
- **Parameter Coverage**: Limited to 4-parameter subspace of full supernova diversity
- **Temporal Resolution**: Daily sampling may miss rapid variability
- **Model Fidelity**: Semi-analytical approximations vs. full radiation hydrodynamics

## Contact for Methods Questions

For detailed questions about the modeling approach, parameter choices, or validation procedures:
- **Email**: [info@koexai.com]
- **Subject Line**: "CS SF 421-Day Dataset - Methods Inquiry"
- **Documentation**: Additional technical documentation available upon request
