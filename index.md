---
title: Wreathes by Magpie
layout: default
---

<div class="wreath-index">
    {% assign data_collection = site.collections | where: "label", "wreathes" | first %}
    {% assign data_list = data_collection.docs | sort: "position" %}

    {% for data in data_list %}
        {% capture main_image %}{{ data['mainImage'] }}{% endcapture %}

        <div class="wreath-thumb">
            <a href="{{ site.baseurl }}{{ data.url }}">
                {% include imageSizer content=main_image %}
                <h4>{{ data['title'] }}</h4>
            </a>
        </div>

    {% endfor %}

</div>
