import 'pixi.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.less'
import '../core/index.js'

document.addEventListener('contextmenu', event => {
    event.preventDefault()
})

if (module.hot) {
    module.hot.accept()
    module.hot.dispose(function() {
        location.reload()
    })
}