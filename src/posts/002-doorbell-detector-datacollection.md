---
title: Doorbell Detector Data Collection
date: 2026-06-01T14:11:58.856Z
description: Data collection is a crucial step for ML project. In the second post of my doorbell detector series I will cover my first attempts and the coldstart problem.
tags:
  - doorbell detector
  - machine learning
  - audio
  - smart home
  - homeassistant
  - data collection
draft: true
---

In my [previous post](https://www.saadeh.dev/blog/001-doorbell-detector-introduction/) I covered the motivation for this project and sketched out my first ideas.
This post is going to dive into my first attempt of data collection, including my considerations, some insights into the data and the tools I used for labeling.

# The role of data

Collecting data is arguably one of the most important continuous tasks during the machine learning lifecycle.
Without proper data, training might be useless or at least less effective, since data is the base input for this process.
However, the biggest question is: how do I get this data?

# The Cold Start Problem

This question is the primary challenge of the "Cold Start Problem". This term was originally coined for recommender systems, but also fits into a general machine learning context.
How do I get the data I need to provide the function I want to realize?
There are a few options for mitigating this, ranging from manual data collection and labeling to synthetic data generation.
In my case I decided on a hybrid approach.

# My Data Collection Process

My strategy involved the following steps:

1. Create records of my doorbell
2. Create records of the background noise
3. Create records of my doorbell with background noise

Looks like a simple three step approach and it's fairly naive. It didn't consider edge cases, but for the first try it was enough.
I wanted to have a rough estimator at the beginning based on simple handmade rules to continuously collect data.
Afterwards I planned to check the classifications, relabel them manually if necessary and start with training of my first model.
So, what handmade rule should I build for data collection?

# Dive into the data

To get a grip on the data I picked some examples and visualized them with a few statistical measurements.
They look like this:

![Doorbell recording without noise](images/002/doorbell-1.png)

The dashed red line is the start of the jingle, I also added the mean (dashed megenta) and the standard deviation (dashed yellow) with a sliding window of 100ms.
The base rule was found pretty quickly: always keep about 1s of recording in a buffer (so nothing is missed) and as soon as the mean surpasses a threshold, start recording for 6 seconds.

The plot above looks quite appealing, but I also got some doorbell recordings with noise:

![Doorbell recording with noise](images/002/doosbell-noisy.png)

I cannot remember what it was, but the characteristics of the doorbell isn't visible anymore, at least in this vizualization.
In a spectrogram it may look different.

However, I got my threshold based rule. Simple, nice and a lot potential for false positives, i.e. detecting doorbells, which are not there.
That was something I just counted for, because the "more data the better".
Well, lets see what happened later.

# Labeling

I worked with [CVAT](https://www.cvat.ai/) Community Edition before to manage image data, so it was not qualified for my purpose.
So I searched for an alternative and settled on [Label Studio](https://labelstud.io/), since it also supported audio data and was open source.
After taking a deeper look at the versatile [label templates](https://labelstud.io/templates/), I would also consider it for future computer vision projects.

I setup my Label Studio instance as a docker within an LXC container on my homeserver, so I keep the complete setup within my local network.
This decision is mainly driven by privacy, even though having microphones sending data to the cloud has become less scary since the rise of Alexa.
Another aspect is the regular presence of music in my household, so copyright issues might also be a problem when it comes to hosting my dataset publicly.

# Capture Device -> Labeling Instance

As mentioned in my [previous post](https://www.saadeh.dev/blog/001-doorbell-detector-introduction/) I use an Raspberry Pi Zero W with a microphone hat.
So, how do I transport recordings to my Label Studio instance?
I decided to use an SMB share, since it's already provided by my router.
It's been mounted to both, the Microphone SBC and the Label Studio host container, and synced via Label Studio's [local storage sync](https://labelstud.io/guide/storage_local).

# First load of data incoming

As already mentioned, I decided to go with a simple threshold approach for data collection.
So I prepared the Raspberry Pi Zero with the microphone hat (which was an odyssey itself, but that's another story) and placed my recording script.
For some time it worked quite well — typical false positives were voices and slamming doors.
However, it worked until my vacuum robot hit, which generated a big amount of data just with noise.
Luckily I was aware of this and used the Label Studio API to automatically label all these records as background, but the distribution looked like this in the end:

![Data distribution](images/002/data-distribution.png)

Internally I distinguished between different doorbell types, which is why I chose the stacked histogram for visualization.
You may see the heavy skew in my dataset, which left me struggling during training, but this is something for the next post.
