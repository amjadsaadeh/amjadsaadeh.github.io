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

It's been a while from my [last port](https://www.saadeh.dev/blog/002-doorbell-detector-datacollection/), but my doorbell detector is back.
So, training is THE thing, even though it's just a fraction of the work.
But before we finally get to the training, we need to take care about data preprocessing first.

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

In this project I decided for [mel ceptrum features](https://en.wikipedia.org/wiki/Mel-frequency_cepstrum), mainly because it should resemble human hearing.
In addition it results in less features than default [STFT (Shot Time Fourier Transform)](https://en.wikipedia.org/wiki/Short-time_Fourier_transform), which saves processing time and space further down the pipeline.

I decided to do the predictions on 500ms chunks.
This additionally reduced the number of features and was also useful to keep latency low.
In the end I got 1298 chunks I can train on.

## Data balancing

Since I got a [highly skewed dataset](https://www.saadeh.dev/blog/002-doorbell-detector-datacollection/#first-load-of-data-incoming) I needed to account for this. 
Otherwise my predictor will shoot for the high volume class all the time making it worse even my metrics looks good.
I decided do balancing in chunk level and went for the low hanging fruits on dataset balancing: using all doorbell chunks and sample randomly from the background chunks, so I got an even distribution over the doorbell and background class.

# Training

Lets get to the meat: training.
There are a plenty of options on how to train and what to train.
I decided to go with [XGBoost](https://xgboost.readthedocs.io/en/stable/), a widely used model type and library for machine learning.
I won't point out the details here, but the idea is to build a bunch of [decision trees](https://en.wikipedia.org/wiki/Decision_tree) in a smart way (called gradient boosting).
This way I (hopefully) get a proper predictor, which is able to determine the presence of a doorbell based in the features decribed above.

To keep track of changes I introduced [MLFlow](https://mlflow.org/) into my setup.
This is a tool to record training runs and save artifacts in a systematic fashion and is provides nice APIs to automatically do this for me.
In addition I also tracked dataset information to make also 
This way I can, at least, track down the dataset responsible for specific results.

Due to my limited data I didn't split the data into the classical train, validation and test dataset.
Instead I used [cross-validation](https://en.wikipedia.org/wiki/Cross-validation_(statistics)).
In short: I split my 1298 chunks into five sets and trained my model on four of these sets.
The fiths I used to obtrain validation metrics.
I repeated this 5 times, so each subset is used as validation sets once.
Stable metrics over all runs indicate that the model-dataset-combination is not prune to [overfitting](https://en.wikipedia.org/wiki/Overfitting), so it should be safe to train the model on the complete dataset for final deployment.

# Results

I run the training in the end on 1298 chunks (0.5s recordings) extracted from my dataset and used 25 boosted trees.
Due to my balancing I got a 50:50 split between background and doorbell classes.
Finally I got an [F1 Score](https://en.wikipedia.org/wiki/F-score) of 0.99 and also a precision of 0.99.
These values are pretty good.
NBt here's the catch: It didn't work out on my target platform.
Once deployed, the model always detected doorbells no matter if there was one or not.
I did some investigation, but didn't came to a conclusion before I temporarly abandoned this project.
My assumptions ranged from numirical instabilities in my preprocessing (it was a bit painful to get is running on the raspberry pi zero, since a few libraries where not provided for armv6) to problems in my training procedure and data selection-
In the end I decided to get back to the drawing board.
