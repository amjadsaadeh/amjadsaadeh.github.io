---
title: Doorbell Detector Introduction
date: 2026-05-07T08:59:50.306Z
description: This is the first post of an (hoepfully) upcoming series about my doorbell detection system.
tags:
    - doorbell detector
    - machine learning
    - audio
    - smart home
    - homeassistant
draft: true
---

This is not a polished success story, in fact, at the time of writing this, the story is not even finished. It's a step-by-step approach to a side project I work occasianlly on and may give interesting insights to you.

## Motivation

Like any project there is a motivation behing this idea. A few year ago I moved to a flat with a garden and during summer I got confronted with a new (first world) "problem": during gardening I cannot hear the doorbell anymore, e.g. when a package arrives.
Another issue is that during focus work and while listening to music I also reguarly missed the doorbell.
So, there are multiple ways to handle this on a non-technical level: not wearing noise cancelling headphones, live with the gardening aspect. But what's the point in accepting the status quo if you belive you can throw a technical solution on this problem.

## Sounding the technical approaches

The basic idea is to have a system to detect the doorbell has been triggered and to send a notification to my smartphone or my currently running PC.
Since I already got a homessisastant instance running, sending a notification is not a problem. But how do I detect the doorbell?

Back then I researched and sketched a few technical approaches:

1. **Replacing the bell system**: There are smart bell systems in the market, which replace the built in doorbell system or attach a new one.
    Since the flat is rented and not owned, replacing the bell system wasn't a suitable alternative.
2. **Attach a sensor for the wire**: Another approach are sensors, which attach directly to the doorbell wires. This is less intrusive then replacing the whole system,
    but fails at the same blocker as before: I don't own the flat.
3. **Using the sound**: Doorbells emit, by their nature, sound when triggered. Placing a microphone nearby and writing an algorithm to catch this sound is
    non-intrusive and should provide the necessary information to trigger a notification, gotcha.

With the decision for option 3 I started to plan for it.

## Selection of recording device

Hardware selection was pretty easy. I got an old raspberry pi zero w with an reSpearker 2 Mic Pi-Hat from an old undocumented project
(my try to build an alexa alternative with snips.ai). In addition, all necessary steps should run locally, either on my homeserver or at the rapsberry pi itself.

## Planning consideration

I decided for a technical approach and I decided for the recording hardware. Now I needed to decide on how to build this.
In a rational world, when I need to think about things like roadmaps, risks und ROI I would've done a few more planning, get approval and do reviews.
But it's a side project, it's completly up to me. No deadline, no necessaty to rationalize my decision. I can just pick what I want.
So I decided to go down the machine learning road and create a semi-self improving system for my doorbell detector.
This was a major deviation from my typical workflow to start easy and then decide to bump the complexity if neccessary.

So proceed with the architecture and *let the overengineering hit in*.

## The virtous circle of machine learning
