---
title: Doorbell Detector Introduction
date: 2026-05-19T08:57:06.187Z
description: This is the first post of an (hoepfully) upcoming series about my doorbell detection system.
tags:
  - doorbell detector
  - machine learning
  - audio
  - smart home
  - homeassistant
draft: false
---

This is not a polished success story — in fact, at the time of writing this, the story is not even finished. It's a step-by-step approach to a side project I occasionally work on, and it may give you some interesting insights.

## Motivation

Like any project, there is a motivation behind this idea. A few years ago, I moved to a flat with a garden, and during summer I was confronted with a new (first world) "problem": during gardening, I couldn't hear the doorbell anymore — e.g. when a package arrives.
Another issue was that during focus work and while listening to music, I also regularly missed the doorbell.
So, there are multiple ways to handle this on a non-technical level: not wearing noise cancelling headphones, or just living with the gardening aspect. But what's the point in accepting the status quo if you believe you can throw a technical solution at this problem?

## Sounding out the technical approaches

The basic idea is to have a system that detects when the doorbell has been triggered and sends a notification to my smartphone or my currently running PC.
Since I already have a Home Assistant instance running, sending a notification is not a problem. But how do I detect the doorbell?

Back then I researched and sketched a few technical approaches:

1. **Replacing the bell system**: There are smart bell systems on the market, which replace the built-in doorbell system or attach a new one.
    Since the flat is rented and not owned, replacing the bell system wasn't a suitable alternative.
2. **Attaching a sensor to the wire**: Another approach is to use sensors that attach directly to the doorbell wires. This is less intrusive than replacing the whole system,
    but fails for the same reason as before: I don't own the flat.
3. **Using the sound**: Doorbells emit, by their nature, sound when triggered. Placing a microphone nearby and writing an algorithm to catch this sound is
    non-intrusive and should provide the necessary information to trigger a notification, gotcha.

Having decided on option 3, I started to plan for it.

## Selection of recording device

Hardware selection was pretty easy. I got an old Raspberry Pi Zero W with a ReSpeaker 2 Mic Pi-Hat from an old undocumented project
(my attempt to build an Alexa alternative with snips.ai). In addition, all necessary steps should run locally, either on my homeserver or on the Raspberry Pi itself.

You may ask: the Pi Zero W has 512 MB RAM and a single-core 1 GHz ARM11 — can it run any machine learning model?
Well, that's part of my journey. The probability is high that it's not capable of running neural networks, but it's always a matter of scale.
Running small models or different model types (e.g. XGBoost) should work, but is subject to validation.

## Planning consideration

I decided on a technical approach, and I decided on the recording hardware. Now I needed to decide how to build this.
In a rational world, when I need to think about things like roadmaps, risks and ROI, I would've done more planning, gotten approval and done reviews.
But it's a side project — it's completely up to me. No deadline, no necessity to rationalize my decision. I can just pick what I want.
So I decided to go down the machine learning road and create a semi-self-improving system for my doorbell detector.
This was a major deviation from my typical workflow of starting easy and then bumping up the complexity if necessary.
So, why did I do this? There are easier approaches to handle this problem, e.g. template matching or bandpass filters.
In the long run, I think the ML approach will be more robust in my environment, e.g. multiple bell sounds and changing background sounds.
In addition, the ML approach is more interesting to me.

So let's proceed with the architecture and *let the overengineering kick in*.

## Framing the problem

How do I tackle this with machine learning? First, what type of problem is this? I'm trying to distinguish my doorbell sounds from everything else the microphone picks up. Since I have three different doorbells (front door, flat door, garden door), this is a [multiclass classification problem](https://developers.google.com/machine-learning/crash-course/classification/multiclass) with four mutually exclusive classes: `front_door`, `flat_door`, `garden_door`, and `ambient` — where `ambient` covers everything else, from silence to speech to the vacuum robot. The classifier operates on fixed-length audio windows (more on the exact window size in a later post). A side benefit of the multi-class framing: I also know which door to answer.

## The ML lifecycle

The point of machine learning is to learn, somehow directly, from data.
It means fewer assumptions about the nature of data — well, another set of assumptions, to be precise.
However, the basic idea is to collect data and feed it into a training procedure, and as a result you get a working system that does what you want for a specific problem.
In a perfect world, this is a one-shot task, but things change, edge cases pop up, and the environment changes.
In this example, I have a wide variety of ambient noises, ranging from the default white noise introduced by the microphone, through speech, all the way to the vacuum robot doing its regular routine.
What happens to the sound when I change the interior of the hallway?

Here's the ML lifecycle:

<style>
.dd-lifecycle {
  --dd-bg-elevated: #161b22;
  --dd-fg: #e6edf3;
  --dd-muted: #6e7681;
  --dd-accent: #5ddcb4;
  --dd-accent-2: #f0883e;
  --dd-border: #30363d;

  position: relative;
  margin: 32px auto;
  max-width: 460px;
  padding: 24px 18px 22px;
  background: var(--dd-bg);
  border: 1px solid var(--dd-border);
  border-radius: 4px;
  font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  color: var(--dd-fg);
  line-height: 1.4;
}
.dd-lifecycle *,
.dd-lifecycle *::before,
.dd-lifecycle *::after { box-sizing: border-box; }

.dd-lifecycle .stages {
  position: relative;
  padding-right: 36px;
}

.dd-lifecycle .stage {
  background: var(--dd-bg-elevated);
  border: 1px solid var(--dd-border);
  border-radius: 3px;
  padding: 12px 14px;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  row-gap: 3px;
  align-items: baseline;
}
.dd-lifecycle .stage.feedback-source {
  border-color: rgba(240, 136, 62, 0.55);
}
.dd-lifecycle .stage-num {
  color: var(--dd-muted);
  font-size: 10px;
  grid-row: 1;
  grid-column: 1;
}
.dd-lifecycle .stage-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--dd-fg);
  grid-row: 1;
  grid-column: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
.dd-lifecycle .stage-name .gt {
  color: var(--dd-accent);
  margin-right: 6px;
}
.dd-lifecycle .stage-comment {
  color: var(--dd-muted);
  font-size: 11px;
  grid-row: 2;
  grid-column: 1 / span 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.dd-lifecycle .connector {
  height: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dd-lifecycle .connector-line {
  width: 1.4px;
  height: 12px;
  background: var(--dd-accent);
  opacity: 0.7;
}
.dd-lifecycle .connector-arrow {
  color: var(--dd-accent);
  font-size: 9px;
  line-height: 1;
  margin-top: 1px;
  opacity: 0.85;
}

.dd-lifecycle .feedback-annotation {
  margin-top: 10px;
  text-align: right;
  font-size: 10px;
  color: var(--dd-accent-2);
  padding-right: 4px;
  letter-spacing: 0.02em;
}

.dd-lifecycle .bracket {
  position: absolute;
  top: 28px;
  bottom: 50px;
  right: 14px;
  width: 18px;
  border-top: 1.5px solid var(--dd-accent-2);
  border-right: 1.5px solid var(--dd-accent-2);
  border-bottom: 1.5px solid var(--dd-accent-2);
  pointer-events: none;
}
.dd-lifecycle .bracket::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -6px;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-right: 6px solid var(--dd-accent-2);
}

.dd-lifecycle .caption {
  margin: 18px 0 0 0;
  color: var(--dd-muted);
  font-size: 12px;
  line-height: 1.55;
}
.dd-lifecycle .caption .triangle {
  color: var(--dd-accent-2);
  margin-right: 6px;
}
.dd-lifecycle .caption strong {
  color: var(--dd-fg);
  font-weight: 500;
}
</style>

<div class="dd-lifecycle">
  <div class="stages">
    <div class="stage">
      <span class="stage-num">01</span>
      <span class="stage-name"><span class="gt">&gt;</span>collect</span>
      <span class="stage-comment">// record audio</span>
    </div>
<div class="connector"><div class="connector-line"></div><span class="connector-arrow">▼</span>
</div>

<div class="stage">
    <span class="stage-num">02</span>
    <span class="stage-name"><span class="gt">&gt;</span>label</span>
    <span class="stage-comment">// ring vs. ambient</span>
</div>
<div class="connector"><div class="connector-line"></div><span class="connector-arrow">▼</span></div>

<div class="stage">
    <span class="stage-num">03</span>
    <span class="stage-name"><span class="gt">&gt;</span>train</span>
    <span class="stage-comment">// classifier on features</span>
</div>
<div class="connector"><div class="connector-line"></div><span class="connector-arrow">▼</span></div>

<div class="stage">
    <span class="stage-num">04</span>
    <span class="stage-name"><span class="gt">&gt;</span>evaluate</span>
    <span class="stage-comment">// held-out test set</span>
</div>
<div class="connector"><div class="connector-line"></div><span class="connector-arrow">▼</span></div>

<div class="stage">
    <span class="stage-num">05</span>
    <span class="stage-name"><span class="gt">&gt;</span>deploy</span>
    <span class="stage-comment">// on the microphone sbc</span>
</div>
<div class="connector"><div class="connector-line"></div><span class="connector-arrow">▼</span></div>

<div class="stage feedback-source">
    <span class="stage-num">06</span>
    <span class="stage-name"><span class="gt">&gt;</span>monitor</span>
    <span class="stage-comment">// log misses &amp; false positives</span>
</div>

<div class="feedback-annotation">// goto 01 with new data</div>

<div class="bracket"></div>
  </div>

  <p class="caption">
    <span class="triangle">▸</span><strong>The orange edge is the whole point.</strong> Production failures &mdash; missed rings, false positives &mdash; feed back as new training data. Each pass costs less than the last because the tooling, labels and harness already exist.
  </p>
</div>

In essence, it's a feedback loop of regular model performance evaluation, leading to more and better data, which should also lead to better model performance.
After an initial bootstrap phase, the system should improve step by step, with less work required for data curation and labeling.

## Summary

In this post, I described the starting point for my doorbell detection system, ranging from my motivation through external constraints to my initial design decisions.
The next post in this series will take up these points and dive deeper into the *cold start problem* of machine learning projects.