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
        var grid_div = document.getElementById("related-posts");
        div = document.getElementById("post-related-container");

        var adiv, ah3, aa;

        for (i = 0; i < relatedPosts.length; i++) {
            adiv = document.createElement("div");
            ah3 = document.createElement("h3")
            adiv.setAttribute("class", "item-related");
            a = document.createElement("a");
            aa = document.createElement("a");
            
            a.setAttribute("target", "_blank");
            aa.setAttribute("target", "_blank");
            
            
            a.href = relatedPosts[i].link;
            aa.href = relatedPosts[i].link;
            a.title = relatedPosts[i].count + " " + (relatedPosts[i].count === 1 ? "categor??a" : "categor??as") + " en com??n";
            a.onclick = clickHandler;
            a.class = "link";
            span = document.createElement("img");
            if (relatedPosts[i].icon) {
                span.setAttribute("src", relatedPosts[i].icon.src);
            }
            a.appendChild(span);
            small = document.createElement("small");
            adiv.appendChild(a);
            aa.appendChild(document.createTextNode(relatedPosts[i].title));
            ah3.appendChild(aa);
            adiv.appendChild(ah3);
            grid_div.appendChild(adiv);
        }


        div.appendChild(grid_div);
        document.querySelector(".post").appendChild(div);
        //only works on noobstraducciones.blogspot.com, if not delete swScript and swButton
        swScript("#related-posts", "div", ".more-related", ".less-related", ".rel-post-script");
        swButton("#post-related-container", "less-related fancybox-button fancybox-button--arrow_left", "Anterior", "M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z", "0 0 24 24");
        swButton("#post-related-container", "more-related  fancybox-button fancybox-button--arrow_right", "Siguiente", "M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z", "0 0 24 24");
    };
    script = document.createElement("script");
    script.src = "/feeds/posts/summary?alt=json&callback=bloggerRelatedPosts_callback&max-results=" + config.maxPostsToFetch + "&q=" + encodeURIComponent('label:"' + postCategories.join('" | label:"') + '"');
    document.querySelector("head").appendChild(script);
})();
