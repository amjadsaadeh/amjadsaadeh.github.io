---
title: Putting my Doorbell Detector together (first try)
date: 2026-09-16T07:43:09.075Z
description: Almost everyone (at least in my developer bubble) is talking about AI changing the way to write code.
    This post is my approach to this topic, a story about drifting from sceptic to enthusiastic and the constant inevitability of change in this profession.
tags:
  - claude
  - ai agents
  - ai assisted coding
  - software engineering
draft: true
---

There are many anecdotes and experience reports like that out there, mostly quite skewed to "that's awesome" or "that's terrible".
This story is neither of both or both at the same time.
It is a story of building trust into tooling, technology and the transformation of my own profession.
It's mostly chronological, but I won't warrant for this.
This post is a condensed writeup of my AI coding experience until now (autumn 2026).

# Start

I am working with machine learning and AI more or less since beginning 2017, mainly in the domain of image processing.
I was aware of the basics of NLP and some of the models, but it was just not my domain.
In addition, generative AI was to me mainly a gimmick, I didn't see much value in it.
Most of my work and interest were about providing a better interpretation of the "senses" of the computer system.
Then late 2022 ChatGPT came to market...
And it did nothing to me.
It was text, it was generative, I remembered an interview with Sam Altman from 2019 saying "GPT2 is too dangerous to release" just to get it a few months later in GitHub.
I was fighting to get a proper SoC to run interesting models in a car, not ridiculously large cloud models.
It was an interesting case study for a chat bot to me, nothing more.
It was a pretty miserable boomer attitude for a millennial (no offense 😅).
It took me about half a year to find the first real use case, but not in my domain, it was in the domain of my wife.

# First touch

The months went by, more or less untouched by any gen AI.
It is hard not to be exposed to related news and announcements to this field if you got any interest in AI.
I generated scripts, some of them worked, some not and needed rework.
Nothing fancy.

In mid 2024 I decided to give it a shot to a small, but pretty important task.
I needed to create a baseline for a benchmark of image stitching capabilities (that might be an interesting story in its own, I should note this).
Therefore I asked a Llama 3 model via Hugging Face Chat for a low level OpenCV C++ implementation.
In hindsight: probably a bad choice of model and environment.
However, it was awful.
OpenCV versions got mixed, the Python API has been used in my C++ implementation and I got into these famous fixing loops, where the fix of a problem introduced another bug fixed before.

# The inevitable second try

This experience just ruined the idea of AI assisted coding completely for me.
It took me almost a year to retry in a completely different context.
In spring 2025 I became aware of Cursor.
I decided to give it a try and it was okay.
Not completely overwhelming, I still got stuck in fix loops, but I didn't need to rework the code that often.
I created a pretty simple app with Rust backend (a language I can barely read) and JS frontend.
It worked, the work itself was fun, it gave me the feeling to create something, not to babysit a chat bot.
It was also the first time I was willing to pay for such a product.

I transferred my learnings to my work.
We have GitHub Copilot licenses for each developer here and step by step I learned what it takes to get proper results, where AI excels and where the limits are.
It was a neat tool.

# The inflection point

Some say in late 2025 there was an inflection point for AI coding tools.
In hindsight I would say this is true, even though I felt the change to be more subtle.
It was Antigravity which caught me back then.
I needed some assistance for a private project (a nutrition analyzer software) to get on speed.
Well, and it sped me up to an extent I didn't expect.
Stuff mostly just worked.
It did it in a way I wanted to.
I didn't need to anticipate for quirks.
It took me a few days to get stuff done I would've needed months before.
Ok, it was a hobby project, no need for architecture reviews or certifications, but it was still impressive.
No need to waste hours in aligned UI elements, I just wrote what I wanted and I got it.
Not only speed, also quality was better: proper tests, CI, automated deployment.
Right on my fingertips.

# My ChatGPT moment

It was a really good experience, but it got limits.
Token limits.
It took me a while to get used to this new kind of resource.
Time for implementation wasn't the main bottleneck anymore.
It were time to test, time to decide and the amount of tokens left.
In order to improve some of these resources I switched to Claude Code, mainly to run it in a remote machine in my home network.
As a side effect I was able to run and orchestrate implementation via my smartphone, either in my local machine or in a Claude cloud environment.

One day I just wanted to update my personal website.
I got a design I tediously made beginning 2025 with Webstudio.
It was, well, selfmade in a sense of "not ugly", but far from beautiful.
I just pasted a few screenshots of this design into Claude and asked for an interactive version of it, filled with some information about me.
I left it working on my second screen while taking care about other stuff.
After a while the chat window split vertically and just showed me the result.
I was quite stunned by the result.
It looked similar enough to my idea, but way better.
Far way better (it took me a while until I realized that this was a quite generic style Claude created for almost every website).
I cannot say why this exactly was so impressive to me, probably my inner teenager, who started development with web development, finally got the website he ever dreamed of.
But that was, ironically, my ChatGPT moment, almost 3 years after the original one.

# The floodgate breaks

Frankly speaking, I was pretty cautious in using AI.
Even with my background and my knowledge it was hard to "trust", the trust needed to be built.
It's not like I am letting everything run completely on autopilot after that.
I got enough examples on "rogue" agents running into the wrong direction or token burner exercises (especially during refactoring).
But the idea of letting code instead of coding myself gained some sort of trust.
Being in charge without knowing each line of code got used to me.
If we are honest, it never has been different.
Colleagues or predecessors always left code we used or we need to maintain, when there was a problem we need to dive into it.
It's one of the first core lectures in my professional life: you need to navigate foreign code.
In my opinion: if a human wrote it or a machine doesn't matter pretty much.

Leveraging AI through this period gave me a different feeling on what it means to be a software engineer.
In retrospective and from an emotional point of view I need to admit: writing code was never the main motivation to me.
Building cool stuff was.
It was being proud of the artifact I created, not of the process behind.
You may say: I always got a product centric mindset.

