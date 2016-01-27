$(document).ready(function() {
    var url = "http://www.freecodecamp.com/news/hot";


    function success(json) {
        var i;
        var keys = Object.keys(json[0]);
        console.log(keys);

        // fetch info from json and populate content shells
        var id, headline, link, descr, upVotes, author, image, storyLink, date, authorLink;
        for (i = 0; i < json.length; i = i + 1) {

            headline = "<span class='headline'>" + json[i].headline + "</span>";

            link = json[i].link;

            if (json[i].metaDescription === "") {
                descr = "Description missing. <br> But I bet it's worth a look!";
            } else {
                descr = json[i].metaDescription;
            }

            // if article picture is missing, replace with author profile pic
            if (json[i].image === "") {
                image = json[i].author.picture;
            } else {
                image = json[i].image;
            }

            author = json[i].author.username;
            upVotes = json[i].upVotes.length;

            // get date and truncate
            date = new Date(json[i].timePosted);

            function convDate(val) {
                val = val.toString().split(" ").splice(0, 3).join(" ");
                return val;
            }
            date = convDate(date);

            id = json[i].author.userId;
            authorLink = "http://www.freecodecamp.com/" + id;


            //construction block for content --> change to something more readable

            var outerdivs = "<a href='"+ link +"'><div class='content' id=content" + i + "><div class='front'><div class='upvote'><i class='fa fa-arrow-circle-up'> " + upVotes + "</i></div><div class='image'></div><div class='headcont'>" + headline + "</div><div class='contfooter'><span class='ctn-foot-text'>Author: " + author + ",<br> Date: " + date + "</span></div></div><div class='back'><span class='description'>" + descr + "</span></div></div></a>";


            // populate content shells
            $(".container").append(outerdivs);
            $("#content" + i + ">.front>.headcont").html(headline);
            $("#content" + i + ">.front>.image").css("background", "url(" + image + ") " + "center center no-repeat");
            $("#content" + i + ">.front>.image").css("background-size", "cover");

        }

    }

    $.getJSON(url, success);


});

$(".content").flip();

//["id", "headline", "timePosted", "link", "metaDescription", "description", "rank", "upVotes", "author", "image", "storyLink"]
