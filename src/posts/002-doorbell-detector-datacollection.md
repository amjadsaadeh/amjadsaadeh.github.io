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

In my [previous post](https://www.saadeh.dev/blog/001-doorbell-detector-introduction/) I covered the monivation for this porject and sketeched out my first ideas.
This post is going to dive into my first attempt of data collection, including my considerations, some insights into the data and the tools I used for labeling.

# The role of data

Collecting data is reasonably one of the most important continous tasks during machine learning lifescycle.
Without proper data, training might be useless or at lest less effective.
