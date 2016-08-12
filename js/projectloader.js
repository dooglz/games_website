
$(document).ready(function() {
    GetFilesList();
});

var data2;
var count =0;
function GetFilesList() {
    let jqxhr = $.getJSON("scan.php", function(data) {
        $('#projectContainer').css("height","540px");
        $('#projectContainer').isotope({ layoutMode: 'masonry' })
        console.log(data);
        data2 = data;
        count = data.length;
        data.forEach(function(element) {
            ParseFile(element);
            count--;
            if(count == 0){
                $('#projectContainer').isotope('reLayout');
            }
        }, this);
        //
    });
    jqxhr.fail(function(e) {
        console.log("error", e);
    });
}

function ParseFile(p){
    if(pagefilter != "" && pagefilter !== undefined){
        let b = false;
        for(i =0; i < p.tags.length; i++){
            if(p.tags[i] == pagefilter){
                b = true;
                break;
            }
        }
        if(!b){return;}
    }

    let img = "images/"+pagefilter+".jpg";
    for(let i =0; i < p.files.length; i++){
        if(p.files[i].endsWith(".jpg") || p.files[i].endsWith(".png")){
            img = (p.dir+"/"+p.files[i]).replace(/\\/g,"/");
            break;
        }
    }
    let href = null;
    for(let i =0; i < p.files.length; i++){
        if(p.files[i].endsWith(".pdf")){
            href = ("/"+p.dir+"/"+(p.files[i])).replace(/\\/g,"/");
            break;
        }
    }

    let newdiv = $('<li/>', {
        id: p.id,
        class: ("portfolio-item "+p.tags+" "+p.year).replace(/,/g," "),
    }).append(
        $('<div/>', {
            class: "item-inner"
        })
        .append(
            href ? ("<a href="+href+"><img src="+img+" alt="+p.title+"><p>"+p.title+"</p></img></a>") : ("<img src="+img+" alt="+p.title+"><p>"+p.title+"</p></img>")
        )
    );
    $('#projectContainer').isotope( 'insert', newdiv );
    /*
    .appendTo('#projectContainer');
    $('#projectContainer').isotope({
        itemSelector : 'li',
        layoutMode : 'fitRows'
    });*/
}
