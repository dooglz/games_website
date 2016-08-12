
$(document).ready(function() {
    GetFilesList();
});

var data2;
function GetFilesList() {
    let jqxhr = $.getJSON("scan.php", function(data) {
       $('#projectContainer').css("height","540px");

        console.log(data);
        data2 = data;
        data.forEach(function(element) {
            ParseFile(element);
        }, this);
    });
    jqxhr.fail(function(e) {
        console.log("error", e);
    });
}

function ParseFile(p){
    
    let newdiv = $('<li/>', {
        id: p.id,
        class: ("portfolio-item "+p.tags+" "+p.year).replace(/,/g," "),
    }).append(
        $('<div/>', {
            class: "item-inner"
        }).append(
            $('<img/>', {
                src: "images/physics.jpg",
                alt: p.title
            })
        ).append("<h5>"+p.title+"</h5>")
    );
    $('#projectContainer').isotope( 'insert', newdiv );
    /*
    .appendTo('#projectContainer');
    $('#projectContainer').isotope({
        itemSelector : 'li',
        layoutMode : 'fitRows'
    });*/
}
