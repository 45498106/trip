global.util = {
    PI2: Math.PI * 2,

    get ratio() {
        return Math.max(
            global.game.view.width / global.setting.width,
            global.game.view.height / global.setting.height
        )
    }

}