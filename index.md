---
title: Wreathes by Magpie
layout: default
---

<div class="wreathes">

    {% assign data_collection = site.collections | where: "label", "wreathes" | first %}
    {% assign data_list = data_collection.docs | sort: "weight" %}

    {% for data in data_list %}

    {% capture main_image %}{{ data['mainImage'] }}{% endcapture %}

    <h2><a href="{{ site.baseurl }}{{ data.url }}">{{ data['title'] }}</a></h2>
    {% include imageSizer content=main_image %}


    {% endfor %}
</div>
