
$(document).ready(function () {
    GetFilesList();
    $('[data-toggle="popover"]').popover();
});
$('body').on('click', function (e) {
    //only buttons
    if ($(e.target).data('toggle') !== 'popover'
        && $(e.target).parents('.popover.in').length === 0) {
        $('[data-toggle="popover"]').popover('hide');
    }
});

var url = "http://games.soc.napier.ac.uk/";
var data2;
var count = 0;
function GetFilesList() {
    let jqxhr = $.getJSON(url + "scan.php", function (data) {
        $('#projectContainer').css("height", "540px");
        $('#projectContainer').isotope({ layoutMode: 'masonry' })
        console.log(data);
        data2 = data;
        count = data.length;
        data.forEach(function (element) {
            ParseFile(element);
            count--;
            if (count == 0) {
                $('#projectContainer').isotope('reLayout');
                setTimeout(function () {
                    console.log("Hello");
                    $('#projectContainer').isotope();
                }, 250);

            }
        }, this);
        //
    });
    jqxhr.fail(function (e) {
        console.log("error", e);
    });
}

function ParseFile(p) {
    if (pagefilter != "" && pagefilter !== undefined) {
        let b = false;
        for (i = 0; i < p.tags.length; i++) {
            if (p.tags[i] == pagefilter) {
                b = true;
                break;
            }
        }
        if (!b) { return; }
    }

    let img = "images/" + pagefilter + ".jpg";
    for (let i = 0; i < p.files.length; i++) {
        if (p.files[i].endsWith(".jpg") || p.files[i].endsWith(".png")) {
            img = (p.dir + "/" + p.files[i]).replace(/\\/g, "/");
            break;
        }
    }
    img = "<img src=" + url + img + " alt=" + p.title + "><p>" + p.title + "</p></img>";

    let href = [];
    if (p.files.length > 0) {
        href = FilterFiles(p.files, p.dir);
    }
    if (p.vidurl !== undefined && p.vidurl !== "") {
        href.push({ name: "Video Link", url: p.vidurl })
    }
    console.log(href);
    let newdiv = $('<li/>', {
        id: p.id,
        class: ("portfolio-item " + p.tags + " " + p.year).replace(/,/g, " "),
    }).append(
        $('<div/>', {
            class: "item-inner"
        })
            .append(href.length ? BuildDiv(img, href) : img)
        );
    $('#projectContainer').isotope('insert', newdiv);
    /*
    .appendTo('#projectContainer');
    $('#projectContainer').isotope({
        itemSelector : 'li',
        layoutMode : 'fitRows'
    });*/
}

function BuildDiv(frontcontent, backcontent) {
    let ul = "";
    for (let i = 0; i < backcontent.length; i++) {
        ul += "<a href=\"" + backcontent[i].url + "\">" + backcontent[i].name + "</a><br>";
    }
    let fdiv = $('<div/>', { class: "front" }).append(frontcontent);
    let bdiv = $('<div/>', { class: "back" }).append(ul);
    let flipper = $('<div/>', { class: "flipper" }).append(fdiv).append(bdiv);
    let flippCon = $('<div/>', { class: "flip-container" }).append(flipper);
    flippCon.on('touchstart', function () {
        $(this).classList.toggle('hover');
    });
    return flippCon;
}

function FilterFiles(files, filedir) {
    let filenames = [".pdf", ".doc", ".docx", ".ppt"]
    let ff = [];
    for (let i = 0; i < files.length; i++) {
        for (let j = 0; j < filenames.length; j++) {
            if (files[i].endsWith(filenames[j])) {
                let name = files[i].slice(0, -(filenames[j].length));
                if (name.toLowerCase() == "paper") { name = "Report"; }
                if (name.toLowerCase() == "report") { name = "Report"; }
                ff.push({ name: name, url: url + filedir + "/" + files[i] });
            }
        }
    }
    return ff;
}