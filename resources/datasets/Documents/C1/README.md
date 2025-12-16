# Synthetic Supernova Light Curves Dataset (Version 1.0.0)

## Summary

This dataset contains 5000 synthetic supernova light curves generated using a state-of-the-art curve-to-curve diffusion model. Each light curve represents the luminosity evolution of a supernova over approximately 400 days, sampled every 6 hours for a total of 1601 data points per curve. The synthetic data was created using a machine learning pipeline that combines regression-based parameter extraction with diffusion-based curve generation, trained on real supernova observations.

The primary purpose is to provide high-quality synthetic training data for machine learning models, data augmentation for limited observational datasets, and testing of astrophysical analysis algorithms.

## Contents

```
synthetic_supernova_dataset/
├── README.md                           # This file
├── metadata.json                       # Machine-readable metadata
├── generated_supernovae.parquet        # Main dataset (Parquet format)
├── data_dictionary.csv                # Variable definitions
├── provenance.md                      # Detailed generation methodology
└── supplementary/
    ├── generation_statistics.txt       # Dataset statistics
    └── model_architecture_diagram.png  # Diffusion model workflow
```
## Structure and Formats

### File Formats
- **Primary**: Parquet format for efficient storage and fast loading
- **Encoding**: UTF-8
- **Compression**: Snappy compression for Parquet

### Data Organization
- **Rows**: 5000 synthetic supernova light curves
- **Columns**: 1601 temporal measurements per light curve
- **Column naming**: Sequential integers from "0" to "1600"
- **Time sampling**: 6-hour intervals (0.25 days)
- **Total timespan**: ~400 days per light curve

### Temporal Conventions
- **Column "0"**: t = 0 hours (day 0)
- **Column "1"**: t = 6 hours (day 0.25)
- **Column "N"**: t = N × 6 hours (day N × 0.25)
- **Column "1600"**: t = 9600 hours (day 400)

### Missing Values
- **Expected**: None (synthetic data is complete by design)
- **Representation**: N/A (not applicable to synthetic generation)

## Provenance and Methods

### Generation Pipeline Overview

1. **Template Creation**: Synthetic light curve templates generated using mathematical models with randomized physical parameters
2. **Parameter Extraction**: Trained regression model extracts 7 physical parameters from templates
3. **Parameter Modification**: Small random variations added to parameters for diversity
4. **Diffusion Generation**: 200-step reverse diffusion process refines templates into realistic curves

### Key Components

- **Regression Model**: `Best_mlp.pth` (compound model with 7 MLPs)
- **Diffusion Model**: `best_curve_to_curve_diffusion.pth` (UNet architecture as backbone)
- **Training Data**: Real supernova observations from `train_preprocessed.csv`
- **Template Strategy**: Synthetic templates with realistic supernova temporal evolution

### Physical Parameters (7D conditioning)

The generation process is conditioned on seven physical parameters that characterize supernova properties:
1. **raggio**: Explosion radius parameter
2. **massa**: Progenitor mass parameter  
3. **energia**: Explosion energy parameter
4. **nichel**: Nickel mass parameter (affects radioactive decay)
5. **Mcsm**: Circumstellar medium mass parameter
6. **rcsm**: Circumstellar medium radius parameter
7. **slope**: Light curve decay slope parameter

### Software and Libraries

- **Deep Learning**: PyTorch 2.0+
- **Data Processing**: pandas, numpy
- **Visualization**: matplotlib
- **Model Architecture**: Custom UNet with parameter conditioning

For detailed methodology, see `provenance.md`.

## Quality and Limitations

### Validation and Quality Control

- **Model Validation**: Diffusion model trained with monitored convergence on validation set
- **Parameter Consistency**: Generated curves respect input physical parameter constraints
- **Temporal Structure**: All curves maintain proper supernova-like temporal evolution
- **Statistical Validation**: Generated distribution compared to training data characteristics

### Dataset Statistics

- **Total Samples**: 5000 light curves
- **Temporal Resolution**: 6 hours (high precision for supernova evolution)
- **Coverage**: Full supernova evolution from early rise to late decay phases
- **Diversity**: Wide range of physical parameter combinations

### Known Limitations

1. **Training Data Dependency**: Generated curves limited to patterns present in original training data
2. **Rare Events**: May not capture extremely rare or exotic supernova phenomena  
3. **Observational Effects**: No instrumental noise, weather effects, or observational biases included
4. **Parameter Space**: Synthetic diversity constrained by training data parameter distribution
5. **Physical Accuracy**: While physically motivated, some generated curves may have subtle non-physical features

### Recommended Usage

**Suitable for:**
- Machine learning model training and validation
- Data augmentation for limited supernova datasets
- Algorithm development and testing
- Educational purposes and demonstrations

## How to Cite

### Plain Text Citation

```
Giuseppe et al. (2025). Synthetic Supernova Light Curves Dataset (Version 1.0.0). 
Generated using curve-to-curve diffusion model.
```

### BibTeX Citation

```bibtex
@dataset{luca2025synth,
  author={Luca et al.},
  title={Synthetic Supernova Light Curves Dataset},
  year={2025},
  version={1.0.0},
  note={Generated using curve-to-curve diffusion model},
  howpublished={Available at: [repository URL]}
}
```

## License and Contact

### License
[License to be specified - placeholder for LICENSE file]

### Contact Information

- **Project**: ASTRAI (Koexai S.r.l.)
- **Email**: [info@koexai.com]
- **LinkedIn**:[https://www.linkedin.com/company/koexai/]

### Acknowledgments

This dataset was generated using machine learning models trained on observational supernova data. We acknowledge the astronomical community for providing the foundational observations that made this synthetic dataset possible.

### Support

For questions about the dataset, methodology, or technical issues, please contact the dataset creator. For bug reports or feature requests, please provide:

1. Clear description of the issue
2. Steps to reproduce
3. Expected vs. actual behavior
4. System information (OS, Python version, etc.)

---
