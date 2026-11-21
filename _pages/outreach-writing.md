---
title: "Outreach & Writing"
permalink: /outreach-writing/
author_profile: false
---

I enjoy talking with people. And I enjoy talking with people about astronomy, the climate crisis, and science more broadly. I’ve given talks in schools and at public science events, and I’m also a [Climate Fresk](https://climatefresk.org/world/) facilitator.

If you’d like to organize an event together, [contact me](mailto:efrem.maconi@univie.ac.at)!

<details class="selected-talks">
  <summary><strong>Selected talks &amp; events</strong></summary>
  <h3>2026</h3>
  <ul>
    <li><strong>Debunking the myths of climate change denialism</strong> · Event<span><em>Lange Nacht der Forschung, University of Vienna, Austria</em></span></li>
    <li><strong>The Galactic Journey of the Solar System</strong> · Talk<span><em>Nachts auf der Sternwarte, University of Vienna, Austria</em></span></li>
  </ul>
  <h3>2025</h3>
  <ul>
    <li><strong>The climate crisis from an astronomical perspective</strong> · Talk<span><em>Middle school, Italy</em></span></li>
  </ul>
  <h3>2024</h3>
  <ul>
    <li><strong>Astronomy for climate change</strong> · Event<span><em>Lange Nacht der Sternwarte, University of Vienna, Austria</em></span></li>
    <li><strong>Climate Fresk</strong> · Workshop<span><em>University of Vienna, Austria</em></span></li>
    <li><strong>Climate Fresk</strong> · Workshop<span><em>High school, Italy</em></span></li>
    <li><strong>The climate crisis: raising awareness among younger generations</strong> · Talk<span><em>Middle school, Italy</em></span></li>
  </ul>
  <h3>2023</h3>
  <ul>
    <li><strong>The life cycle of stars</strong> · Talk<span><em>Middle school, Italy</em></span></li>
  </ul>
</details>

<h2 id="outreach-articles">Outreach articles</h2>

{% assign science_articles = site.pages | where: 'layout', 'scicomm' | sort: 'path' | reverse %}
{% for article in science_articles %}
<div class="writing-article">
  {% if article.cover %}
  <a class="writing-article__cover" href="{{ article.url | relative_url }}" aria-label="{{ article.title | escape }}">
    <img src="{{ article.cover | relative_url }}" alt="{{ article.cover_alt | escape }}" loading="lazy">
  </a>
  {% endif %}
  <p><a href="{{ article.url | relative_url }}"><strong>{{ article.title | escape }}</strong></a><br>
  <em>{{ article.subtitle | escape }}</em></p>
</div>
{% endfor %}

<h2 id="books">Books</h2>

<div class="writing-article writing-book">
  <a class="writing-article__cover" href="https://www.lamemoriadelmondo.it/scheda.php?isbn=9791282297066" aria-label="Se questo è un popolo">
    <img src="{{ '/image/copertina-SeQuestoPopolo.png' | relative_url }}" alt="Copertina di Se questo è un popolo" loading="lazy">
  </a>
  <div class="writing-article__text">
    <h3><a href="https://www.lamemoriadelmondo.it/scheda.php?isbn=9791282297066"><em>Se questo è un popolo</em></a></h3>
    <p>A collection of poems in solidarity with the Palestinian people. It was published by La Memoria del Mondo. All profits from the book are donated to <a href="https://soleterre.org/">Fondazione Soleterre</a>, which provides medical care and psychological support in Palestine.</p>
  </div>
</div>
