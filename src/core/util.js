global.util = {
    get ratio() {
        return Math.max(
            global.game.view.width / global.setting.width,
            global.game.view.height / global.setting.height
        )
    }
}