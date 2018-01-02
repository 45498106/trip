import 'bootstrap/dist/css/bootstrap.min.css'
import './index.less'
import core from '../core'

document.addEventListener('contextmenu', event => {
    event.preventDefault()
})

if (module.hot) {
    module.hot.accept()
    module.hot.dispose(function() {
        location.reload()
    })
}