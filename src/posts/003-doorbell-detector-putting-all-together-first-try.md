---
title: Putting my Doorbell Detector together (first try)
date: 2026-06-01T14:11:58.856Z
description: Training is the essence on ML, the moment (or at least right before the moment) you see if all your previous work on data will be sucessful.
tags:
  - doorbell detector
  - machine learning
  - audio
  - smart home
  - homeassistant
  - data collection
draft: true
---

So, training is THE thing, even though it's just a fraction of the work. But before we finally get to the training, we need to take care about data preprocessing first.

# Preprocessing

Preprocessing is the step before you put the data into your training process.
It's more sexy than the data collection and labeling work and typically requires domain knowledge and highly influences the performance of your model.
There are two main goals of this stage:
1. guide the model on what to look at: some modalities provide a lot of noise (i.e. data/information which do not provide benefit on what to achive).
For sensor data this is typically physically driven, e.g. the static you get when you do a sound recording, the non perfect color plane color in an image.
But this could be also some variation in tabular data, e.g. the weight of persons in a medical trial varies up to a certain point, no matter what you are doing.
Noise is not bad in all points, but it makes it harder to see the differential pattern we want to find. So changing the data in a way we can help to sense these
patterns is typically crucial.
2. compress input data: you can argue this is a duplicate of 1., but let me explain. In order to make training on large data tractable we want to put as little
data as possible. This helps on the one side to concentrate on the important aspects of the data, on the other side it saves computation and memory during training.

These decisions are called "feature engineering". "Feature" because these new values extracted from out raw data are called features.
"Engineering" because we engineer them.
How these features look like depends on the modality, the data distribution and also on the model you plan to use.
Which features to take is also a continous task to assess during training.

In this project I decided for [mel ceptrum features](https://en.wikipedia.org/wiki/Mel-frequency_cepstrum), mainly because I heard about it and that it resembles 
human like hearing by giving low frequency components more weight.
