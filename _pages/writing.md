---
title: "Writing"
permalink: /writing/
author_profile: false
---

<h2 id="science-articles">Science articles</h2>

{% assign science_articles = site.pages | where: 'layout', 'scicomm' | sort: 'path' | reverse %}
{% for article in science_articles %}
<div class="writing-article">
  <p><a href="{{ article.url | relative_url }}"><strong>{{ article.title | escape }}</strong></a><br>
  <em>{{ article.subtitle | escape }}</em></p>
</div>
{% endfor %}

<h2 id="books">Books</h2>

### *Se questo è un popolo*

I wrote this collection of poems in solidarity with the Palestinian people. It was published by La Memoria del Mondo. All profits from the book are donated to [Fondazione Soleterre](https://soleterre.org/), which provides medical care and psychological support in Palestine.

The book can be found [here](https://www.lamemoriadelmondo.it/scheda.php?isbn=9791282297066).
