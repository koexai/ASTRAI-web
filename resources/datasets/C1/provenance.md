# Provenance and Methods: Synthetic Supernova Light Curves Dataset

## Overview

This document provides a comprehensive description of how the synthetic supernova light curves dataset was generated. The methodology combines regression-based parameter extraction with a novel curve-to-curve diffusion approach to produce physically plausible synthetic supernova observations.

## Data Sources and Acquisition

### Primary Training Data

**Source**: `train_preprocessed.csv` and `validation_preprocessed.csv`
- **Content**: Real supernova light curve observations with associated physical parameters
- **Structure**: 1601 temporal points + 7 physical parameters per supernova
- **Temporal sampling**: 6-hour intervals over ~400 days
- **Parameters**: raggio, massa, energia, nichel, Mcsm, rcsm, slope

**Data Preprocessing**: 
- Features normalized for regression model input
- Targets (parameters) kept in original scale
- No missing value imputation required (preprocessed data)

### Pre-trained Models

**Regression Model**: `Best_mlp_res_for_diffusion.pth`
- **Architecture**: Compound model with 7 separate MLPs
- **Input**: 1601-point light curves (normalized)
- **Output**: 7 physical parameters
- **Training**: Supervised learning on real supernova data
- **Purpose**: Extract physical parameters from light curves

**Diffusion Model**: `best_curve_to_curve_diffusion.pth`
- **Architecture**: UNet with parameter conditioning
- **Training approach**: Curve-to-curve translation with physical parameter conditioning
- **Timesteps**: 200 denoising steps
- **Input**: Noisy curves + 7 physical parameters
- **Output**: Refined light curves

## Generation Pipeline

### Step 1: Synthetic Template Creation

Templates are created using the `synthetic` strategy in `create_template_curves_for_inference()`:

**Mathematical Model**:
```python
# Rise phase (exponential growth)
rise_part = peak_intensity * (1 - exp(-t / rise_time))

# Decay phase (exponential decay)  
decay_part = peak_intensity * exp(-(t - peak_time) / decay_time)
```

**Randomized Parameters**:
- `peak_time`: Uniform random in [200, 800] temporal points
- `peak_intensity`: Uniform random in [0.5, 2.0]
- `rise_time`: Uniform random in [50, 200] points
- `decay_time`: Uniform random in [300, 800] points

**Additional Variability**:
- Gaussian noise (σ = 0.1) added to base template
- Amplitude scaling: Normal(1.0, 0.15) clipped to [0.7, 1.3]
- Smooth calibration errors: Cumulative sum of Normal(0, 0.015)

### Step 2: Parameter Extraction

For each synthetic template:

1. **Normalization**: Apply same normalization used during regression training
2. **Parameter prediction**: Pass through trained regression model
3. **Output**: 7-dimensional parameter vector per template

**Regression Model Architecture**:
```
CompoundModel:
  ├── MLP_1: 1601 → 1024 → 1 (raggio)
  ├── MLP_2: 1601 → 1024 → 1 (massa)
  ├── MLP_3: 1601 → 1024 → 1 (energia)
  ├── MLP_4: 1601 → 1024 → 1 (nichel)
  ├── MLP_5: 1601 → 1024 → 1 (Mcsm)
  ├── MLP_6: 1601 → 1024 → 1 (rcsm)
  └── MLP_7: 1601 → 1024 → 1 (slope)
```

Each MLP uses:
- 7 residual blocks with LeakyReLU activation
- BatchNorm1d normalization  
- Dropout (p=0.4) during training
- Depth: 7 layers per parameter

### Step 3: Parameter Modification

To increase diversity:
```python
param_noise = torch.randn_like(template_params) * 0.1
modified_params = template_params + param_noise
```

This ensures generated curves don't exactly match template parameters, creating variability while maintaining physical consistency.

### Step 4: Diffusion-Based Refinement

**Reverse Diffusion Process**:

1. **Initialization**: 
   ```python
   x = input_curves + torch.randn_like(input_curves) * 0.3
   ```

2. **Iterative Denoising** (200 steps):
   ```python
   for t_step in reversed(range(200)):
       combined_input = x + 0.1 * template_curves  # Template guidance
       x = diffusion.p_sample(combined_input, t, modified_params)
   ```

3. **Template Influence**: 10% weighted combination maintains connection to original template while allowing significant refinement

**UNet Architecture Details**:
- **Input channels**: 1 (light curve)
- **Conditioning**: 7 physical parameters injected at multiple levels
- **Time embedding**: Sinusoidal positional encoding (128D → 256D)
- **Parameter embedding**: 7D → 64D → 128D → 256D
- **Encoder**: 3 downsampling layers with GroupNorm + SiLU
- **Decoder**: 3 upsampling layers with skip connections
- **Output**: Predicted noise for current denoising step

## Quality Assurance

### Model Validation

**Diffusion Training**:
- **Loss function**: MSE between predicted and true noise
- **Validation monitoring**: Loss tracked on separate validation set  
- **Early stopping**: Best model saved based on validation loss
- **Gradient clipping**: Max norm = 0.5 to prevent instability

**Parameter Consistency**:
- Generated curves maintain relationship to conditioning parameters
- Parameter ranges stay within physically reasonable bounds
- No systematic bias observed in parameter distribution

### Statistical Validation

**Temporal Structure**:
- All curves exhibit proper supernova-like evolution (rise + decay)
- Peak timing varies appropriately with physical parameters
- Decay rates consistent with underlying physics

**Diversity Assessment**:
- Generated curves span wide range of morphologies
- No obvious mode collapse or repetitive patterns
- Parameter space coverage verified through sampling

## Processing Environment

### Software Versions
- **PyTorch**: 2.0+
- **Python**: 3.12
- **NumPy**: Latest stable
- **Pandas**: Latest stable  
- **CUDA**: Available for GPU acceleration

### Computational Resources
- **Training**: GPU-accelerated (CUDA-enabled)
- **Generation**: Batch processing with 50 samples per batch
- **Memory**: Sufficient for 5000 × 1601 arrays plus model weights

### Random Seeding
- No fixed random seed used to maximize diversity
- Each generation run produces unique synthetic data
- Reproducibility available through seed specification if needed

## Limitations and Assumptions

### Model Limitations

1. **Training Data Dependency**: Generated diversity limited by original training data coverage
2. **Parameter Space**: Cannot extrapolate beyond training parameter ranges  
3. **Physical Approximations**: Uses learned approximations rather than first-principles physics
4. **Template Influence**: Synthetic templates may bias certain curve characteristics

### Methodological Assumptions

1. **Physical Parameter Completeness**: 7 parameters assumed sufficient for supernova characterization
2. **Temporal Sampling**: 6-hour resolution assumed adequate for supernova evolution
3. **Noise Model**: Training data noise characteristics assumed representative
4. **Statistical Independence**: Generated curves treated as independent samples

### Validation Constraints

1. **Ground Truth**: No perfect ground truth for synthetic data quality assessment
2. **Rare Events**: Limited ability to validate rare supernova phenomena
3. **Long-term Behavior**: Extrapolation beyond ~400 days not validated
4. **Systematic Effects**: Potential systematic biases difficult to detect without extensive validation

## Future Improvements

### Potential Enhancements

1. **Physics Integration**: Incorporate more rigorous physical constraints
2. **Noise Modeling**: Add realistic observational noise and systematic effects
3. **Extended Parameters**: Include additional physical or observational parameters
4. **Validation Framework**: Develop comprehensive synthetic data validation metrics
5. **Active Learning**: Use generated data to improve model training iteratively

### Research Directions

1. **Domain Adaptation**: Adapt to different supernova surveys or instruments
2. **Multi-wavelength**: Extend to multiple photometric bands
3. **Spectroscopic**: Generate corresponding spectral evolution
4. **Population Synthesis**: Generate statistically representative supernova populations


