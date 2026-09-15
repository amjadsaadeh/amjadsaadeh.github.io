---
title: Putting my Doorbell Detector together (first try)
date: 2026-06-01T14:11:58.856Z
description: Training is the essence of ML, the moment (or at least right before the moment) you see whether all your previous work on data will be successful.
tags:
  - doorbell detector
  - machine learning
  - audio
  - smart home
  - homeassistant
  - data collection
draft: true
---

It's been a while since my [last post](https://www.saadeh.dev/blog/002-doorbell-detector-datacollection/), but my doorbell detector is back.
Training is THE thing, even though it's just a fraction of the work.
But before we finally get to the training, we need to take care of data preprocessing first.

# Preprocessing

Preprocessing is the step before you feed the data into your training process.
It's sexier than the data collection and labeling work, typically requires domain knowledge, and highly influences the performance of your model.
There are two main goals of this stage:
1. Guide the model on what to look at: some modalities contain a lot of noise (i.e. data/information that does not help with what you want to achieve).
For sensor data this is typically physically driven, e.g. the static you get when you make a sound recording, or the imperfect color plane in an image.
But this could also be some variation in tabular data, e.g. the weight of persons in a medical trial varies up to a certain point, no matter what you do.
Noise is not bad in every respect, but it makes it harder to see the distinguishing patterns we want to find. So transforming the data in a way that helps to detect these
patterns is typically crucial.
2. Compress input data: you could argue this is a duplicate of 1., but let me explain. In order to make training on large data tractable, we want to feed in as little
data as possible. On the one hand, this helps to concentrate on the important aspects of the data; on the other hand, it saves computation and memory during training.

These decisions are called "feature engineering". "Feature" because the new values extracted from our raw data are called features.
"Engineering" because we engineer them.
What these features look like depends on the modality, the data distribution, and also the model you plan to use.
Which features to use is also something you continuously have to assess during training.

In this project I decided on [mel-frequency cepstrum features](https://en.wikipedia.org/wiki/Mel-frequency_cepstrum), mainly because they are designed to resemble human hearing.
In addition, they result in fewer features than a plain [STFT (Short-Time Fourier Transform)](https://en.wikipedia.org/wiki/Short-time_Fourier_transform), which saves processing time and space further down the pipeline.

I decided to make the predictions on 500ms chunks.
This additionally reduced the number of features and was also useful to keep latency low.
In the end I got 1298 chunks I could train on.

## Data balancing

Since I had a [highly skewed dataset](https://www.saadeh.dev/blog/002-doorbell-detector-datacollection/#first-load-of-data-incoming), I needed to account for this.
Otherwise my predictor would go for the high-volume class all the time, making it worse even though my metrics look good.
I decided to do the balancing at chunk level and went for the low-hanging fruit of dataset balancing: using all doorbell chunks and randomly sampling from the background chunks, so I got an even distribution over the doorbell and background classes.

# Training

Let's get to the meat: training.
There are plenty of options for how to train and what to train.
I decided to go with [XGBoost](https://xgboost.readthedocs.io/en/stable/), a widely used model type and library for machine learning.
I won't go into the details here, but the idea is to build a bunch of [decision trees](https://en.wikipedia.org/wiki/Decision_tree) in a smart way (called gradient boosting).
This way I (hopefully) get a proper predictor, which is able to determine the presence of a doorbell based on the features described above.

To keep track of changes, I introduced [MLflow](https://mlflow.org/) into my setup.
This is a tool to record training runs and save artifacts in a systematic fashion, and it provides nice APIs to do this automatically for me.
In addition, I also tracked dataset information.
This way I can, at least, track down the dataset responsible for specific results.

Due to my limited data, I didn't split the data into the classical train, validation and test datasets.
Instead I used [cross-validation](https://en.wikipedia.org/wiki/Cross-validation_(statistics)).
In short: I split my 1298 chunks into five sets and trained my model on four of these sets.
The fifth I used to obtain validation metrics.
I repeated this five times, so each subset is used as the validation set once.
Stable metrics over all runs indicate that the model-dataset combination is not prone to [overfitting](https://en.wikipedia.org/wiki/Overfitting), so it should be safe to train the model on the complete dataset for final deployment.

# Results

In the end, I ran the training on 1298 chunks (0.5s recordings) extracted from my dataset and used 25 boosted trees.
Due to my balancing, I got a 50:50 split between background and doorbell classes.
Finally, I got an [F1 score](https://en.wikipedia.org/wiki/F-score) of 0.99 and also a precision of 0.99.
These values are pretty good.
But here's the catch: it didn't work on my target platform.
Once deployed, the model always detected doorbells, no matter whether there was one or not.
I did some investigation, but didn't come to a conclusion before I temporarily abandoned this project.
My assumptions ranged from numerical instabilities in my preprocessing (it was a bit painful to get it running on the Raspberry Pi Zero, since a few libraries were not provided for armv6) to problems in my training procedure and data selection.
In the end I decided to go back to the drawing board.
