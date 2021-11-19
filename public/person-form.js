modules['person-form-js'] = function(_html) {
    console.log("Loaded Person Form JS")
    var _form = _html.find('.person-form')

    var eatblbody = _form.find('.ea-tbl tbody');
    var patblbody = _form.find('.pa-tbl tbody');


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

            var _html =
                `<tr>
                <td>
                <a href="javascript:" class='ui button icon ea-btn-remove'>
                    <i class='icon close'></i>
                    </a>
                </td>
                <td class='field'>
                    <input type='text' name='emailaddresses' value>
        
                </td>
            </tr>`;
            _html = $(_html);
            eatblbody.append(_html)
            _html.find('.ea-btn-remove').on('click', function() {

                removeEaTr($(this))

            })
            return false
        })

    $('.person-form .pa-btn-add').on('click',
        function() {
            // var btn = $(this)
            var ind = patblbody.find('tbody tr').length

            var _html =
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
            _html = $(_html)
            patblbody.append(_html)
            _html.find('.pa-btn-remove').on('click', function() {

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



    _form.on('submit', function(e) {


        e.preventDefault()
        var form = $(this)
        app.ajax({

            url: '/contact',
            type: 'POST',
            data: form.serializeToJSON({ associativeArrays: true }),
            success: function() {
                form.find('#msg').show().delay(3000).fadeOut()

            }

        })

    })

}