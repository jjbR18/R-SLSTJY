
function Window_Testing() {
    this.initialize.apply(this, arguments);
}
Window_Testing.prototype = Object.create(Window_Selectable.prototype);
Window_Testing.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.drawSomeText();
}

Window_Testing.prototype.drawSomeText = function() {
    var textW = 360;
    var textH = 0;
    this.drawText("喵喵喵喵", 0, 0, textW, 'left');
    textH += this.lineHeight();
    this.drawText("下面", 0, textH, textW, 'left');
    textH += this.lineHeight();
    this.drawText("哇", 0, textH, textW, 'center');
    textH += this.lineHeight();
    this.drawText("走你", 0, textH, textW, 'right');}

function Scene_Testing() {
    this.initialize.apply(this, arguments);
}
Scene_Testing.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Testing.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
Scene_Testing.prototype.create = function() {
Scene_MenuBase.prototype.create.call(this);
    this._commandWindow = new Window_Testing(0,470, 810, 150);
this.addWindow(this._commandWindow);
}
Scene_Testing.prototype.update = function() {
    if (Input.isTriggered('escape') || Input.isTriggered('cancel')) {
        this._commandWindow.hide();
        SceneManager.goto(Scene_Map);
    }
};
