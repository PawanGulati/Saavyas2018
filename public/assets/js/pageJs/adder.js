
jQuery(document).ready(function($) {
    var sum = 0;
    $('#pakker :checkbox').click(function() {
        sum = 0;
        $('#pakker :checkbox:checked').each(function(idx, elm) {
            sum += parseInt(elm.value, 10);
        });
        
        $('#sum').html(sum);
    
    });
    
});
