---
title: Wreathes by Magpie
layout: default
---

<div class="wreath-index">
{% assign data_collection = site.collections | where: "label", "wreathes" | first %}
{% assign data_list = data_collection.docs | sort: "position" %}

{% for data in data_list %}

{% capture main_image %}{{ data['image'] }}{% endcapture %}

<div class="wreath-thumb">
    <h2>
        <a href="{{ site.baseurl }}{{ data.url }}">{{ data['title'] }}</a>
        </h2>
    {% include imageSizer content=main_image %}
</div>

{% endfor %}

</div>
