        // JavaScript source code
/*
 * Blogger Related Posts Widget v1.0.4
 * https://github.com/salmanarshad2000/blogger-related-posts-widget
 * Copyright (c) 2012-2015 Salman Arshad
 * Released under the MIT license
 */
(function () {
    if (document.querySelector === undefined) {
        return;
    }

    var config = {}, postLink, postCategories = [], i, links, script;
    config.maxPostsToFetch = (typeof bloggerRelatedPosts_config === "object" && bloggerRelatedPosts_config.maxPostsToFetch) || 100;
    config.maxPostsToDisplay = (typeof bloggerRelatedPosts_config === "object" && bloggerRelatedPosts_config.maxPostsToDisplay) || max_posts;
    postLink = document.querySelector("link[rel=canonical]").href;
    if (/\x2F\d{4}\x2F\d{2}\x2F/.test(postLink) === false) {
        return;
    }
    var splited = []
    var label = ""
    for (i = 0, links = document.querySelectorAll("a[rel=tag]"); i < links.length; i++) {
        splited = links[i].href.split('label/')
        if (splited[1].indexOf('?') == -1) { label = splited[1] }
        else { label = splited[1].substr(0, splited[1].indexOf('?')) }
        postCategories.push(decodeURIComponent(label));
    }
    bloggerRelatedPosts_callback = function (data) {
        var relatedPosts = [], i, j, k, entries, item, links, categories, clickHandler, div, a, span, atitle, atitlelimit;
        atitlelimit = 43;
        for (i = 0, entries = data.feed.entry; i < entries.length; i++) {
            atitle = entries[i].title.$t;
            if (atitle.length > atitlelimit) {
                atitle = atitle.substr(0, atitlelimit);
                atitle = atitle + "...";
            }
            item = {
                title: atitle,
                updated: new Date(entries[i].updated.$t),
                categories: [],
                count: 0
            };
            for (j = 0, links = entries[i].link; j < links.length; j++) {
                if (links[j].rel === "alternate") {
                    item.link = links[j].href;
                    break;
                }
            }
            if (item.link === postLink) {
                continue;
            }
            for (j = 0, categories = entries[i].category; j < categories.length; j++) {
                item.categories.push(categories[j].term);
                for (k = 0; k < postCategories.length; k++) {
                    if (postCategories[k] === categories[j].term) {
                        item.count++;
                        break;
                    }
                }
            }
            let thumbnail = entries[i].media$thumbnail && entries[i].media$thumbnail.url;
            if (thumbnail) {
                thumbnail = thumbnail.replace("s72-c", img_size);
            } else if (entries[i].content.$t.match(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/)) {
                thumbnail = entries[i].content.$t.match(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/)[0];
            } else {
                thumbnail = "https://placeholder.pics/svg/300/DEDEDE/555555/Image%20Not%20Loaded";
            }
            if (thumbnail) {
                item.icon = {
                    src: thumbnail
                };
            }
            relatedPosts.push(item);
        }
        relatedPosts.sort(function (item1, item2) {
            return (item2.count - item1.count) || (item2.updated - item1.updated);
        });
        relatedPosts = relatedPosts.slice(0, config.maxPostsToDisplay);
        clickHandler = function () {
            if (typeof ga === "function") {
                var link = this;
                ga("send", {
                    hitType: "event",
                    eventCategory: "Blogger Related Posts",
                    eventAction: "Related Post Clicked",
                    eventLabel: link.href,
                    hitCallback: function () {
                        location.href = link.href;
                    }
                });
                return false;
            }
        };

        var adiv, img, gdiv;
        adiv = document.getElementsByClassName("carousel__item");
        for (i = 0; i < relatedPosts.length; i++) {
            gdiv = document.createElement("div");
            span = document.createElement("span");

            gdiv.setAttribute("class", "gallery__title");

            a = document.createElement("a");
            a.setAttribute("class", "gallery__href");
            a.setAttribute("target", "_blank");

            span.setAttribute("class", "rel__title skin-font");
            span.appendChild(document.createTextNode(relatedPosts[i].title));
            
            gdiv.appendChild(span);
            
            a.href = relatedPosts[i].link;
            a.title = relatedPosts[i].count + " " + (relatedPosts[i].count === 1 ? "categoría" : "categorías") + " en común";
            a.setAttribute("alt", relatedPosts[i].title);
            a.onclick = clickHandler;
            
            
            img = document.createElement("img");
            if (relatedPosts[i].icon) {
                img.setAttribute("src", relatedPosts[i].icon.src);
            }

            a.appendChild(img);
            a.appendChild(gdiv);

            adiv.item(i).appendChild(a);
        }


        //div.appendChild(grid_div);
        document.querySelector(".post").appendChild(document.getElementById("post-related-container"));
    };
    script = document.createElement("script");
    script.src = "/feeds/posts/summary?alt=json&callback=bloggerRelatedPosts_callback&max-results=" + config.maxPostsToFetch + "&q=" + encodeURIComponent('label:"' + postCategories.join('" | label:"') + '"');
    document.querySelector("head").appendChild(script);
})();
