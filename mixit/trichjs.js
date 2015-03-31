$(function(){
    $('#Grid').mixitup();
});
            
$(document).ready(function(){
    $("#menu-toggle").click(function(){
        $("#menu").slideToggle();
        $(this).toggleClass("icon-reorder icon-caret-up")
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

            $('#about').onclick(function(){
                $('#Grid').mixitup('filter','all');
            });
            $('#about').onclick(function(){
                $('#Grid').mixitup('filter','about');
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