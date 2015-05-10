$(document).ready(function(){
    var text = ["a Father", "a Designer", "a Founder", "a Dreamer", "a Marketer", "an Entrepreneur", "a Coder", "T.Rich"];
    var counter = 0;
    var elem = document.getElementById("changeText");
    setInterval(change, 5000);
    function change() {
     elem.innerHTML = text[counter];
        counter++;
        if(counter >= text.length) { counter = 0; }
    }
});

$(function(){
    $('#Grid').mixitup();
});
            
$(document).ready(function(){
    $('.aboutme').toggle("slow"); 
    $('.myventures').hide("slow");
    $('.contactme').hide("slow");
    $("#menu-toggle").click(function(){

        $("#main-menu").toggle({ direction: $('left').val() }, 1000);
        $(this).toggleClass("fa-reorder fa-chevron-circle-left")
    });
    $('#Grid').each(function(){
        var $ul = $(this);
        var $liArr = $ul.children('li');
        $liArr.sort(function(a,b){
            var temp = parseInt( Math.random()*10 );
            var isOddOrEven = temp%2;
            var isPosOrNeg = temp>5 ? 1 : -1;
            return( isOddOrEven*isPosOrNeg );
        })
        .appendTo($ul);            
    });

            $('#about').click(function(){
                $('.aboutme').toggle("slow");
                $('.maintitle').hide("slow");
                $('.myventures').hide("slow");
                $('.contactme').hide("slow");
            });
            $('#ventures').click(function(){
                $('.myventures').toggle("slow");
                $('.aboutme').hide("slow");
                $('.contactme').hide("slow");
                $('.maintitle').hide("slow");
            });
            $('#contact').click(function(){
                $('.contactme').toggle("slow");
                $('.maintitle').hide("slow");
                $('.myventures').hide("slow");
                $('.aboutme').hide("slow");
            });
            $('#logos').onclick(function(){
                $('#Grid').mixitup('filter','logo');
            });
            $('#web').onclick(function(){
                $('#Grid').mixitup('filter','web');
            });
            $('#mobile').onclick(function(){
                $('#Grid').mixitup('filter','mobile');
            });
            $('#print').onclick(function(){
                $('#Grid').mixitup('filter','print');
            });
            $('#clothing').onclick(function(){
                $('#Grid').mixitup('filter','clothing');
            });
            $('#contact').onclick(function(){
                $('#Grid').mixitup('filter','contact');
            });
            $('#ventures').onclick(function(){
                $('#Grid').mixitup('filter','ventures');
            });
            $('#mycode').onclick(function(){
                $('#Grid').mixitup('filter','mycode');
            });

});


$('#openBtn').click(function(){
    $('#myModal').modal({show:true})
});