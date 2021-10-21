$(function() {


    $('.person-form').on('submit', function(e) {


        e.preventDefault()
        var form = $(this)
        $.ajax({

            url: '/contact',
            type: 'POST',
            data: form.serialize(),
            success: function() {
                form.find('#msg').show().delay(3000).fadeOut()

            }

        })

    })




})