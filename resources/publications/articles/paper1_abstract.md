# ASTRAI: Advanced Supernova Transient Research with Artificial Intelligence

## Abstract

Rapidly increasing data volumes from high cadence surveys, and the still larger streams anticipated from the Legacy Survey of Space and Time (LSST), pose a major challenge for timely and accurate analysis of Supernovae (SNe).

Traditional approaches based on semi-analytical or hydrodynamical models, while physically grounded, hinder the large-scale characterisation of transient events.

We present a novel machine learning approach with two stages: a generative model produces synthetic light curves (LCs) to augment sparse or incomplete datasets for low-interacting hydrogen-rich (H-rich) SNe events and deep learning models characterise LCs by regressing fundamental physical parameters. The characterisation stage uses an ensemble of neural networks, each specialised to regress a single parameter, improving interpretability, modularity and robustness.

To account for observational systematics, we employ data augmentation strategies that mimic realistic noise and cadence conditions.

Benchmarking against semi-analytical and hydrodynamical simulations demonstrates that the proposed generative method recovers LCs with error comparable to or smaller than observational noise, while achieving inference speeds orders of magnitude faster than traditional modelling pipelines (with a throughput beyond $10^5$ LCs per second on a single GPU hardware).

This could enable large-scale characterisation of H-rich SNe within modern and upcoming survey data streams, preparing the scientific community to handle the massive LCs flow expected from LSST.
