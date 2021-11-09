$(function() {

    var eatbl = $('.person-form .ea-tbl')
    var patbl = $('.person-form .pa-tbl')

    function removeEaTr(btn) {
        btn = $(btn)
        var tr = btn.closest('tr')
        tr.remove()
    }

    function removePaTr(btn) {
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

                removeEaTr($(this))

            })
            return false
        })

    $('.person-form .pa-btn-add').on('click',
        function() {
            // var btn = $(this)
            var ind = patbl.find('tbody tr').length

            var html =
                `<tr>
                <td>
                    <a href='javascript:' class='ui button icon pa-btn-remove'>
                        <i class='icon close'></i>
                    </a>
                </td>
                <td class='field'>
                    <input type="hidden" name="postaladdresses[${ind}].id" value=>
                    <input type='text ' name='postaladdresses[${ind}].street ' value=></td>
                <td class='field'>
                    <input type='text ' name='postaladdresses[${ind}].city ' value=>
                </td>
                <td class='field'>
                    <input type='text ' name='postaladdresses[${ind}].zipcode ' value=>
                </td>

            </tr>`
            html = $(html)
            patbl.append(html)
            html.find('.pa-btn-remove').on('click', function() {

                removePaTr($(this))

            })
            return false
        })


    $('.person-form .ea-btn-remove').on('click',
        function() {
            removeEaTr(this)

        })

    $('.pa-btn-remove').on("click",
        function() {
            removePaTr($(this))
        })



    $('.person-form').on('submit', function(e) {


        e.preventDefault()
        var form = $(this)
        $.ajax({

            url: '/contact',
            type: 'POST',
            data: form.serializeToJSON({ associativeArrays: true }),
            success: function() {
                form.find('#msg').show().delay(3000).fadeOut()

            }

        })

    })




})