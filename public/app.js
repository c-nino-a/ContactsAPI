$.ajaxSetup({
    beforeSend: function() {

        $('#loading').show()
    },

    complete: function() {
        $('#loading').fadeOut()
    },
    error: function() {
        $('#loading').hide()
    }
})





$(function() {

    $('.people-tbl tbody tr').on('click', function() {

        var tr = $(this)
        var id = tr.data('id')
        $.ajax({
            url: '/contact/' + id,
            success: function(html) {
                $('#content').html(html)
            }
        })

    })

    $('.people-tbl tbody tr .p-btn-remove').on('click', function(e) {

        var btn = $(this)
        var tr = btn.closest('tr')
        var id = tr.data('id')
        var children = tr.children()
        var firstname = children.eq(1).html()
        var lastname = children.eq(2).html()

        if (confirm(`Are you sure about deleting ${firstname} ${lastname}?`)) {
            $.ajax({
                url: '/contact/' + id,
                type: 'DELETE',
                success: function() {
                    tr.remove()
                    $("#content").empty()
                }

            })

            alert("Entry deleted.")
        }



        return false
    })

    $('.people-tbl thead tr .p-btn-add').on('click', function() {


        $.ajax({
            url: '/contact/new',
            success: function(html) {
                $('#content').html(html)

            }
        })
    })


})