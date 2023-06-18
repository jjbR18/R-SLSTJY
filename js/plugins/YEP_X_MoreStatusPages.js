//=============================================================================
// Yanfly Engine Plugins - Status Menu Extension - More Status Menu Pages
// YEP_X_MoreStatusPages.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MoreStatusPages = true;

var Yanfly = Yanfly || {};
Yanfly.MSMP = Yanfly.MSMP || {};
Yanfly.MSMP.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 更多状态页面★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要YEP\u StatusMenuCore。确保此插件位于
 * 在插件列表的YEP\u StatusMenuCore下。
 * 
 * 有时，你会希望能够在每一方放置更多的信息
 * 成员的状态菜单页。此扩展菜单允许您创建尽可能多的
 * 自定义页面，你想和插入任何文本里面！用这个
 * 要创建自定义背景故事，有关演员的附加信息，
 * 还有更多！
 * 
 *  ============================================================================
 * 说明
 *  ============================================================================
 * 
 * 按照以下步骤将更多状态页添加到状态菜单列表：
 * 
 * 1.打开插件列表中的YEP\u StatusMenuCore插件。找那个
 * “Command Order”插件参数。
 * 
 * 2.在其内部，将文本“MorePages”放置在需要额外状态的位置
 * 要转到的菜单页。
 * 
 * 3.按OK并关闭插件管理器。
 * 
 * 4.保存游戏项目。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 将下面的记事本放在您想要的演员记事本框中
 * 向添加更多状态菜单页。
 * 
 * 演员标签：
 * 
 *   ========================================================================
 *
 *   <Status Menu Page: title>
 *    text
 *    text
 *   </Status Menu Page: title>
 *   - 将“title”替换为希望在命令窗口中显示的状态菜单页的标题。
 *     为您的额外状态菜单配置文件插入您认为合适的“文本”行。
 *     插入此notetag的多个设置将允许您在状态菜单中有更多的页面条目。
 *     注意：您可以对“文本”条目使用文本代码。
 *
 *   -- 例如 ---
 *
 *   <Status Menu Page: Origin>
 *    \n[1] 起源于德拉格诺夫王国，这个国家在过去存在了400年；
 *     人口是由人类和龙和平共处。
 *   </Status Menu Page: Origin>
 *
 *   <Status Menu Page: Discipline>
 *    \n[1] 坚信贵族的权利，即强者和有特权的人应该慷慨而高贵地对待
 *     那些没有特权的人。
 *   </Status Menu Page: Discipline>
 *
 *   ========================================================================
 *
 *   <Status Menu Page title Switch: x>
 *   <Status Menu Page title Switch: x, x, x>
 *   - 将“title”替换为希望此notetag影响的状态菜单页的标题。
 *     将“x”替换为必须打开的开关ID，以便此状态菜单页显示在参与者的
 *     状态菜单配置文件中。如果使用多个开关，
 *     则必须打开所有开关才能显示此状态菜单页。
 *
 *   -- 例如 ---
 *
 *   <Status Menu Page Origin Switch: 1>
 *   <Status Menu Page Discipline Switch: 5, 6, 7, 8, 9, 10>
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_StatusMenuCore && Yanfly.Status.version &&
  Yanfly.Status.version >= 1.02) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_MoreStatusPages');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.Variables = String(Yanfly.Parameters['Variables']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.MSMP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.MSMP.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_MoreStatusPages) {
    this.processMoreStatusMenuPagesNotetags1($dataActors);
    Yanfly._loaded_YEP_X_MoreStatusPages = true;
  }
  
  return true;
};

DataManager.processMoreStatusMenuPagesNotetags1 = function(group) {
  var note1 = /<STATUS MENU PAGE:[ ](.*)>/i;
  var note2 = /<\/STATUS MENU PAGE:[ ](.*)>/i;
  var note3 = /<STATUS MENU PAGE[ ](.*)[ ]SWITCH:[ ]*(\d+(?:\s*,\s*\d+)*)>/i
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.customStatusMenuPages = [];
    obj.customStatusMenuPagesData = {};
    obj.customStatusMenuPageRequirement = {};
    var evalMode = 'none';
    var pageKey = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        evalMode = 'custom status menu page';
        var pageKey = String(RegExp.$1);
        obj.customStatusMenuPages.push(pageKey);
        obj.customStatusMenuPagesData[pageKey] = [];
      } else if (line.match(note2)) {
        evalMode = 'none';
        pageKey = 'none';
      } else if (evalMode === 'custom status menu page') {
        obj.customStatusMenuPagesData[pageKey].push(line);
      } else if (line.match(note3)) {
        var pageKey = String(RegExp.$1);
        obj.customStatusMenuPageRequirement[pageKey] =
          obj.customStatusMenuPageRequirement[pageKey] || [];
        var array = JSON.parse('[' + RegExp.$2.match(/\d+/g) + ']');
        obj.customStatusMenuPageRequirement[pageKey] =
          obj.customStatusMenuPageRequirement[pageKey].concat(array);
      }
    }
  }
};

//=============================================================================
// Window_StatusCommand
//=============================================================================

Yanfly.MSMP.Window_StatusCommand_createCommand =
  Window_StatusCommand.prototype.createCommand;
Window_StatusCommand.prototype.createCommand = function(command) {
  Yanfly.MSMP.Window_StatusCommand_createCommand.call(this, command);
  command = command.toUpperCase();
  if (['MOREPAGES', 'MOREPAGE'].contains(command)) {
    this.addMoreStatusMenuPages();
  }
};

Yanfly.MSMP.Window_StatusCommand_setActor =
  Window_StatusCommand.prototype.setActor;
Window_StatusCommand.prototype.setActor = function(actor) {
  var prevActor = this._actor;
  Yanfly.MSMP.Window_StatusCommand_setActor.call(this, actor);
  this.clearCommandList();
  this.makeCommandList();
  this.refresh();
};

Window_StatusCommand.prototype.addMoreStatusMenuPages = function() {
  if (!this._actor) {
    return;
  }
  var order = this._actor.actor().customStatusMenuPages;
  if (!order) return;
  for (var i = 0; i < order.length; i++) {
    var pageKey = order[i];
    if (this.isShowStatusMenuPage(pageKey)) {
      this.addCommand(pageKey, 'morePages', true, pageKey);
    }
  }
};

Window_StatusCommand.prototype.isShowStatusMenuPage = function(pageKey) {
  var data = this._actor.actor().customStatusMenuPageRequirement[pageKey] || [];
  if (data.length <= 0) return true;
  for (var i = 0; i < data.length; i++) {
    var switchId = data[i];
    if (!$gameSwitches.value(switchId)) {
      return false;
    }
  }
  return true;
};

//=============================================================================
// Window_StatusInfo
//=============================================================================

Yanfly.MSMP.Window_StatusInfo_setSymbol =
  Window_StatusInfo.prototype.setSymbol;
Window_StatusInfo.prototype.setSymbol = function(symbol) {
  Yanfly.MSMP.Window_StatusInfo_setSymbol.call(this, symbol);
  if (this._symbol === 'morePages') {
    this.refresh();
  }
};

Yanfly.MSMP.Window_StatusInfo_drawInfoContents =
  Window_StatusInfo.prototype.drawInfoContents;
Window_StatusInfo.prototype.drawInfoContents = function(symbol) {
  if (symbol === 'morePages') {
    this.drawAllItems();
  } else {
    Yanfly.MSMP.Window_StatusInfo_drawInfoContents.call(this, symbol);
  }
};

Yanfly.MSMP.Window_StatusInfo_maxItems = Window_StatusInfo.prototype.maxItems;
Window_StatusInfo.prototype.maxItems = function() {
  if (this._symbol === 'morePages') {
    var pageKey = SceneManager._scene._commandWindow.currentExt();
    return this._actor.actor().customStatusMenuPagesData[pageKey].length;
  } else {
    return Yanfly.MSMP.Window_StatusInfo_maxItems.call(this);
  }
};

Yanfly.MSMP.Window_StatusInfo_drawItem = Window_StatusInfo.prototype.drawItem;
Window_StatusInfo.prototype.drawItem = function(index) {
  Yanfly.MSMP.Window_StatusInfo_drawItem.call(this);
  if (this._symbol === 'morePages') {
    this.drawMoreStatusPageContent(index);
  }
};

Window_StatusInfo.prototype.drawMoreStatusPageContent = function(index) {
  var pageKey = SceneManager._scene._commandWindow.currentExt();
  var data = this._actor.actor().customStatusMenuPagesData[pageKey];
  var text = data[index];
  var rect = this.itemRectForText(index);
  this.drawTextEx(text, rect.x, rect.y);
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_MoreStatusPages requires YEP_StatusMenuCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_StatusMenuCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // YEP_StatusMenuCore