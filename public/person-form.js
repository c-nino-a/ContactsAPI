$(function() {

    var eatbl = $('.person-form .ea-tbl')

    function removeEaTr(btn) {
        btn = $(btn)

        var tr = btn.closest('tr')

        tr.remove()
    }

    $('.person-form .ea-btn-add').on('click',
        function() {
            // var btn = $(this)

            var html =
                `<tr>
            <td>
              <a href="javascript:" class='ui button icon ea-btn-remove'>
                   <i class='icon close'></i>
                </a>
             </td>
             <td class='field'>
                <input type='text' name='emailaddresses' value>
    
            </td>
        </tr>`
            html = $(html)
            eatbl.append(html)
            html.find('.ea-btn-remove').on('click', function() {

                removeEaTr(this)

            })
        })

    $('.person-form .ea-btn-remove').on('click',
        function() {
            removeEaTr(this)

        })


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