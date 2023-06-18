//=============================================================================
// Yanfly Engine Plugins - Main Menu Manager Extension - Actor Events
// YEP_X_MenuActorEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MenuActorEvents = true;

var Yanfly = Yanfly || {};
Yanfly.MMAE = Yanfly.MMAE || {};
Yanfly.MMAE.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 主菜单角色事件★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要YEP\u MainMenuManager。确保此插件位于
 * 在插件列表的YEP\ u MainMenuManager下。
 * 
 * 这个插件可以让你创建主菜单命令来播放不同的常用命令
 * 事件取决于选择的参与者。多种组合可以
 * 取决于玩家选择的关键字和演员
 * 运行公共事件。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 记事本只用于演员。它们不适用于班级或任何
 * 其他数据库对象。
 *  
 * 演员标签：
 * 
 *   <Menu keyword Event: x>
 *   - 将“keyword”替换为要与此notetag关联的主菜单管理器命令扩展
 *     项设置中使用的确切关键字。
 *   - 将“x”替换为要运行的公共事件的确切ID。 *
 * ============================================================================
 * 主菜单管理器-定位Actor公共事件命令
 * ============================================================================
 *
 * 对于使用主菜单管理器并希望将行命令放置在所需位置的用户，请
 * 使用以下格式：
 *
 *       Name: 'Insert Command Name Here'
 *     Symbol: ActorEvent
 *       Show: true
 *    Enabled: true
 *        Ext: 'Insert Keyword Here'
 *  Main Bind: this.commandPersonal.bind(this)
 * Actor Bind: 
 *
 * 在主菜单管理器插槽中插入上述设置。如果您将精确的设置复制到
 * 需要的位置，它将在使用插件参数的所有命名、启用、禁用、
 * 隐藏和显示效果时显示在那里。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 */
//=============================================================================

if (Imported.YEP_MainMenuManager) {

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.MMAE.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
  var symbol = this._commandWindow.currentSymbol();
  if (symbol.match(/ActorEvent/i)) {
    this.processActorEvent();
  } else {
    Yanfly.MMAE.Scene_Menu_onPersonalOk.call(this);
  }
};

Scene_Menu.prototype.processActorEvent = function() {
    var ext = this._commandWindow.currentExt().toUpperCase();
    var actor = $gameParty.menuActor();
    var notedata = actor.actor().note.split(/[\r\n]+/);
    for (var i = 0; i < notedata.length; ++i) {
        var line = notedata[i];
        if (line.match(/<Menu (.*) Event: (\d+)>/i)) {
            var checkExt = String(RegExp.$1).trim().toUpperCase();
            var commonEventId = Number(RegExp.$2);
            if (checkExt === ext && commonEventId) {
              $gameTemp.reserveCommonEvent(commonEventId);
              return this.popScene();
            }
        }
    }
    this._statusWindow.activate();
};

//=============================================================================
// End of File
//=============================================================================

} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_MenuActorEvents without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

};