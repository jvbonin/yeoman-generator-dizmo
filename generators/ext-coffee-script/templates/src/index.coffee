showBack = ->
    dizmo.showBack()
    return

if typeof assert != 'undefined'
    assert typeof showBack == 'function'

showFront = ->
    dizmo.showFront()
    return

if typeof assert != 'undefined'
    assert typeof showFront == 'function'

window.document.addEventListener 'dizmoready', ->

    document.getElementById('done').onclick = ->
        dizmo.showFront()
        return

    return
