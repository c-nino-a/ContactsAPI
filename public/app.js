var modules = {}

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
            // $.ajax({
            //     url: '/contact/' + id,
            //     success: function(html) {
            //         $('#content').html(html)
            //     }
            // })
        location.hash = 'contact/' + id;

    })

    $('.people-tbl tbody tr .p-btn-remove').on('click', function(e) {

        var btn = $(this)
        var tr = btn.closest('tr')
        var id = tr.data('id')
        var children = tr.children()
        var firstname = children.eq(0).html()
        var lastname = children.eq(1).html()

        if (confirm(`Are you sure about deleting ${firstname} ${lastname}?`)) {
            app.ajax({
                url: '/delete/' + id,
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


        app.ajax({
            url: '/contact/new',
            success: function(html) {
                $('#content').html(html)

            }
        })
    })

    window.onhashchange = function() {
        var hash = location.hash.replace('#', '');
        if (!hash) return;
        app.ajax({
            url: hash,
            success: function(html) {
                $('#content').html(html)
                $('#content').fadeIn()
            }
        })

    }
})

var app = (function() {

    function bindScripts(html) {

        var scriptAttr = html.parent().find('[js-modules]');

        if (!scriptAttr[0]) return;

        for (var i = 0; i < scriptAttr.length; i++) {

            item = scriptAttr[i];

            item = $(item)

            var scriptName = item.attr('js-modules');

            item.removeAttr('js-modules');

            // if (!scriptName) throw 'scriptname is empty';
            if (scriptName) {

                for (var name of scriptName.split(' ')) {

                    var target = modules[name];

                    if (!target) return

                    target(item);
                }
            }
        }
    }

    return {

        ajax: function(options) {

            if (options.success) {

                var success = options.success

                options.success = function(response, textStatus, xhr) {

                    var ishtml = /<\/?[a-z][\s\S]*>/i.test(response)

                    if (ishtml) {

                        response = $(response)
                    }

                    success(response, textStatus, xhr)

                    if (ishtml) {

                        bindScripts(response)
                    }
                }
            }

            $.ajax(options)
        }
    }
})()