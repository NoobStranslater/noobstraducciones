function liUpcomming(index, is_link, link, title, actvs, newvs, img_src){
    //ul principal
    var ulp = document.getElementsByClassName("upcoming-list")[index];

    //create necessary elements
    var li = document.createElement("li");

    var divp = document.createElement("div");
    divp.setAttribute("class", "upcoming-card zone");

    var img = document.createElement("img");
    img.src = img_src || "https://lh3.googleusercontent.com/-0zd7kdKg0Zw/Yr4r1kcIcnI/AAAAAAAABXI/ClGV5-8h5eElEz3AMbyUvZnlyxamqus0ACNcBGAsYHQ/s1600/comming-soon.jpeg";
    img.alt = "Próximamente";

    var div = document.createElement("div");
    div.setAttribute("class", "text");

    var h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(title));

    var ul = document.createElement("ul");
    ul.setAttribute("class", "list");
    var li1 = document.createElement("li");
    var strong1 = document.createElement("strong");
    if(is_link){
        var li2 = document.createElement("li");
        var strong2 = document.createElement("strong");
        strong1.appendChild(document.createTextNode("Versión Actual:  "));
        strong2.appendChild(document.createTextNode("Nueva Versión:  "));
        li2.appendChild(strong2);
        li2.appendChild(document.createTextNode(newvs));
    }
    else {
        strong1.appendChild(document.createTextNode("Versión:  "));
    }
    li1.appendChild(strong1);
    li1.appendChild(document.createTextNode(actvs));
    //puts
    ul.appendChild(li1);
    if(is_link){
        var a = document.createElement("a");
        a.href = link;
        a.setAttribute("target", "_blank")
        a.appendChild(h1);
        div.appendChild(a);
        ul.appendChild(li2);
    }
    else {
        div.appendChild(h1);
    }
    div.appendChild(ul);

    divp.appendChild(img);
    divp.appendChild(div);
    li.appendChild(divp);
    ulp.appendChild(li);
}
