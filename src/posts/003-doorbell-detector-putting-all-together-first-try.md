---
title: Putting my Doorbell Detector together (first try)
date: 2026-06-01T14:11:58.856Z
description: My first doorbell model scored an F1 of 0.95 on its test set and still detected doorbells all the time once deployed. Here is how I built it, and why that number was lying.
tags:
  - doorbell detector
  - machine learning
  - audio
  - smart home
  - homeassistant
  - xgboost
  - dvc
draft: true
---

It's been a while since my [last post](https://www.saadeh.dev/blog/002-doorbell-detector-datacollection/), but my doorbell detector is back.
This post covers my first attempt at turning the labeled recordings into a working detector, back in winter 2024/25: preprocessing, training, and deploying the model to my Raspberry Pi.
Spoiler: the model looked great on paper and was useless in my hallway.
The second half of this post is about why, something I only fully understood when I picked the project up again.

# From recordings to features

Raw audio is a poor input for a small model: 16,000 numbers per second, most of them noise that has nothing to do with doorbells.
So before training, you transform the data into a smaller set of values that still carry the pattern you care about.
These values are called features, and choosing them is called feature engineering.
It usually requires some domain knowledge and has a big influence on how well your model performs.
Fewer, better features also make training and inference cheaper, which matters a lot on a Raspberry Pi.

## MFCCs

I decided on [mel-frequency cepstral coefficients (MFCCs)](https://en.wikipedia.org/wiki/Mel-frequency_cepstrum).
In short: split the audio into short frames, compute the spectrum of each frame, map the frequency axis onto the mel scale (which resembles how humans perceive pitch), take the logarithm, and compress the result into a handful of coefficients.
They describe the rough shape of the spectrum per frame and are much more compact than a plain [STFT (Short-Time Fourier Transform)](https://en.wikipedia.org/wiki/Short-time_Fourier_transform), which saves processing time and space further down the pipeline.

My settings, computed with [librosa](https://librosa.org/): 16 kHz audio, 13 coefficients, a 512-sample FFT window and librosa's default hop of 512 samples, so one frame every 32 ms.

In hindsight, MFCCs were not an obvious fit.
They were designed for speech and deliberately smooth away fine pitch detail, while a doorbell chime is pretty much defined by its pitch.
I'll come back to that in a later post.

## Windows

A doorbell recording is 6–7 seconds long, but I wanted a decision every fraction of a second.
So I cut the labeled regions from Label Studio into short windows and trained the model to classify each window.
I tried 100 ms, 200 ms and 500 ms windows, and 500 ms gave the best results.
A new window started every 30 ms, so neighbouring windows overlapped heavily.
That squeezed a lot of training examples out of a few recordings, and it will come back to bite me later.

XGBoost, the model I used (more on it below), has no notion of time or frequency: it expects one flat row of numbers per example.
So each 500 ms window, 15 frames × 13 coefficients, was flattened into a vector of 195 features.

One detail that turned out to be important: I computed the MFCCs once per full recording and then sliced the windows out of the result, because that was much faster than computing features for every window separately.

## Data balancing

Since I had a [highly skewed dataset](https://www.saadeh.dev/blog/002-doorbell-detector-datacollection/#first-load-of-data-incoming), I needed to account for this.
Otherwise the model can simply predict "background" most of the time and still get good-looking metrics.

First, I merged my three doorbells (front door, flat door, garden door) into a single "bell" class, since for now I only need to know *that* someone is ringing.
Then I went for the low-hanging fruit: keep all bell windows and randomly sample the same number of background windows.
That left me with 6,700 windows, 3,350 per class.

# Training

Let's get to the meat: training.
I went with [XGBoost](https://xgboost.readthedocs.io/en/stable/), a widely used library for gradient boosting.
The idea is to build a bunch of small [decision trees](https://en.wikipedia.org/wiki/Decision_tree) one after another, each one correcting the mistakes of the ones before it.

It was a pragmatic choice: it works well on small tabular datasets, trains in seconds, and the trained model is a small file that is cheap to evaluate.
The last point mattered, because the model had to run on a Raspberry Pi Zero W.
A pretrained audio neural network would have been the obvious alternative, but not on that hardware.

The final model used 25 trees with a maximum depth of 6 and a learning rate of 0.1.
I didn't run a proper hyperparameter search: I tried 5, 10, 20 and 25 trees along with the different window sizes and kept the combination with the best score.

To keep all of this reproducible, I set it up as a [DVC](https://dvc.org/) pipeline: fetch labels from Label Studio, download the audio, extract features, cut and balance the windows, train.
All parameters live in a single `params.yaml`, and DVC versions the data and features alongside the code, so every result can be traced back to the exact dataset it was trained on.
Metrics, loss curves and the confusion matrix were logged with [DVCLive](https://dvc.org/doc/dvclive).

For evaluation I kept it simple: a random, stratified 80/20 split of the windows.
Train on 80%, measure on the remaining 20%.

# Results

On the test set of 1,340 windows, the model reached an [F1 score](https://en.wikipedia.org/wiki/F-score) of 0.95, with precision and recall at 0.95 as well.
Broken down:

- 647 background windows classified correctly, 23 falsely flagged as bell
- 626 bell windows detected, 44 missed

Pretty good for a first try, so I deployed it.

# Deployment

On the Pi, a script read 500 ms of audio at a time from the microphone, computed the MFCCs, ran the model and saved a 7-second clip whenever the predicted doorbell probability crossed a threshold.
So the model replaced the loudness threshold from my [last post](https://www.saadeh.dev/blog/002-doorbell-detector-datacollection/) as a smarter trigger for data collection.
Getting there was painful: the Pi Zero W runs on ARMv6, and a few of the libraries I needed were not provided for it, so I needed to compile a few of them manually.

But here's the catch: it didn't work.
Once deployed, the model detected doorbells all the time, no matter whether there was one or not.
I did some investigation, but didn't come to a conclusion before I temporarily abandoned the project.

# Why 0.95 was lying

When I picked the project up again, I looked at this first attempt with fresh eyes.
None of the following problems showed up in the metrics, and any one of them is enough to open a gap between a test set and a real hallway.
The Pi ran a modified version of the script, so I can't say for sure which of them hit hardest.

## My test set contained the answers

A new window started every 30 ms, so two neighbouring windows share 470 of their 500 ms.
With a random split, almost every test window has a near-identical twin in the training data.
The model doesn't need to recognize a doorbell to score well; it only needs to recognize the recording.
The fix is to split by recording, so all windows of one recording end up on the same side of the split.

## A balanced test set hides false alarms

The test set was 50:50, but real life is almost entirely background.
23 of 670 background windows were flagged as bell, a false positive rate of 3.4%.
Scoring a window every 500 ms means 7,200 windows per hour, so that's roughly 250 false alarms per hour, and that's if the live audio looked exactly like my test data.
Precision and F1 on a balanced test set tell you nothing about this.

## The model had never heard silence

Every recording in my dataset exists because it crossed the loudness threshold of my data collector: doorbells, voices, slamming doors, the vacuum robot.
All of it loud.
On the Pi, the model scored every window, and most of them were a quiet hallway, something it had never seen during training, not even as background.
Decision trees can't say "I don't know" to inputs like that; they return whatever their splits happen to produce.

## Training and device computed different features

In training, I computed the MFCCs over a whole recording and sliced the windows out of it.
On the Pi, the script computed them on each isolated 500 ms window.
That sounds equivalent, but it isn't:

- **The frames don't line up.** A slice starts at a frame boundary of the full recording, while the Pi's window starts wherever the audio happens to start, up to 32 ms off.
- **The dynamic range is clipped differently.** librosa cuts off everything more than 80 dB below the loudest point *of the audio it's given*. For a full recording that's the loudest moment of the clip; for a 500 ms window it's the loudest moment within that window.
- **Even the shape differs.** Slicing gives 15 frames per window (195 features), computing on a 500 ms window gives 16 frames (208 features).

When I recently re-ran both variants on my recordings, the same audio produced MFCCs that differed by 15% on median, and by up to 85%.
Once I aligned the frames and switched off the clipping, the difference dropped to exactly zero, so these two effects are the whole story.
This is a classic case of train/serve skew: the model receives different numbers in production than it was trained on, and in the worst case nothing crashes to tell you.

# What I learned

- Split by recording, not by window, whenever examples overlap or come from the same source.
- Evaluate on a realistic class ratio, or at least report the false positive rate and translate it into false alarms per hour.
- Make sure the background class covers everything the model will hear live, including silence.
- Use one feature-extraction code path for training and inference, and check that both produce the same numbers for the same audio.
- A good metric on a test set is a hypothesis, not a result, until the model runs where it's supposed to.

# What's next

So I went back to the drawing board.
When I resumed the project, I rebuilt the pipeline around these lessons: splits grouped by recording, longer windows, external noise recordings for a more diverse background class, experiment tracking with MLflow, and a look at other features than MFCCs.
That's the topic of the next post.
