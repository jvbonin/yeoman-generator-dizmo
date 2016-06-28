assert = require('assert')

window.showBack = ->
    dizmo.showBack()
    return

assert.ok typeof window.showBack == 'function'

window.showFront = ->
    dizmo.showFront()
    return

assert.ok typeof window.showBack == 'function'

window.document.addEventListener 'dizmoready', ->

    document.getElementById('done').onclick = ->
        dizmo.showFront()
        return

    return
