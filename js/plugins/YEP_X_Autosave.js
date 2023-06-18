//=============================================================================
// Yanfly Engine Plugins - Save Core Extension - Autosave
// YEP_X_Autosave.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_Autosave = true;

var Yanfly = Yanfly || {};
Yanfly.Autosave = Yanfly.Autosave || {};
Yanfly.Autosave.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 自动存档☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 这个插件需要YEP\u SaveCore。确保此插件位于
 * 是的，在插件列表中有SaveCore。
 * 
 * 自动保存是目前标准RPG的一个常见特性。游戏会
 * 保存在特定的触发或改变地图，使玩家不会失去
 * 任何进展，以防他们忘记手动保存。这个插件添加了一个
 * 自动保存功能，让您控制何时自动保存或
 * 设置为在特定条件下自动执行。
 * 
 *  ============================================================================
 * 说明
 *  ============================================================================
 * 
 * 有三种方法可以使用这个插件进行自动保存。请读一下
 * 仔细决定哪一个最适合你的比赛。
 * 
 * ---
 *
 * Manual:
 * - 默认情况下，此插件不会自动保存。你呢，
 * 作为游戏开发人员，需要在不同的位置插入Plugin命令：Autosave
 * 要自动保存的点。这个给你最大的控制权
 * 结束你的比赛。
 * 
 * ---
 *
 * Autosave on Map Load:
 * - 这是一个插件参数。当设置为true时，游戏将自动保存
 * 每次加载地图场景时。这意味着进入一个新的地图，出来
 * 或是完成一场战斗。所有这三种情况都会导致
 * 要激活的自动保存功能。
 *
 * ---
 *
 * Autosave on Main Menu:
 * - 这是一个插件参数。当设置为true时，游戏将自动保存
 * 每次玩家从地图场景进入主菜单时。自动保存遗嘱
 * 没有发生任何关于主菜单的其他方式，这意味着
 * 主菜单中的“场景”项将不会激活自动保存。
 * 
 *  ---
 * 
 * 如果播放机禁用自动保存，则不会发生自动保存。如果你不想
 * 要使播放器能够禁用自动保存，可以设置插件
 * 参数“Show Option”为false。
 * 
 * 您可以同时使用这三种自动保存方法。你可以做的
 * 手动，加载地图时自动保存，调用主菜单时自动保存
 * 以获得最大的覆盖率。
 * 
 *  * 注意：虽然您可以同时使用这三种方法，但请注意
 * 玩家。有时候，保存一个游戏可能会导致一点延迟，这取决于保存的方式
 * 保存文件很大。自动保存也不例外。这件事
 * 无法通过插件修复。
 * 
 *  * 注意：至少在手动保存播放器之前，不会自动保存
 * 一次在游戏中。之后，Autosave将使用用于保存的插槽
 * 然后继续保存到它或播放器稍后移动到的任何保存槽。
 * 
 *  ============================================================================
 * 插件命令
 *  ============================================================================
 * 
 * 自动保存是由游戏开发者使用插件命令手动完成的。在那里
 * 还有其他可以控制自动保存的插件命令。
 * 
 * 插件命令：
 *
 *      Autosave
 *      - 这将使游戏自动保存在最后保存的文件
 * 播放机使用的插槽。如果玩家开始了一个新游戏
 * 如果还没存到槽里，什么都不会发生。如果禁用自动保存
 * 由播放器通过“选项”菜单禁用或由系统使用
 * 一个插件命令，也不会发生任何事情。
 *
 *      EnableAutosave
 *      DisableAutosave
 *      - 这将强制启用或禁用自动保存所做的游戏。
 * 这将不会绕过播放器的选项禁用自动保存如果尝试
 * 以启用它。玩家禁用自动保存的决定需要
 * 优先于游戏开发人员。如果你想把这个选项从
 * 播放器，请在插件参数中修改。
 *
 * ============================================================================
 * Options Core Settings - Adding the New Option
 * ============================================================================
 *
 * If you are using YEP_OptionsCore.js, you can add a new Option using this
 * plugin. Here's the following code/parameter settings you can use with it.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[231]Autosave
 *
 * Help Description:
 * Enables \c[4]Autosaving\c[0] for your game if ON.
 * You can still manually save your game.
 *
 * Symbol:
 * autosave
 *
 * Show/Hide:
 * show = Imported.AutosaveShowOpt;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 *
 * Default Config Code:
 * // Empty. Provided by this plugin.
 *
 * Save Config Code:
 * // Empty. Provided by this plugin.
 *
 * Load Config Code:
 * // Empty. Provided by this plugin.
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
 * @param ---Automatic---
 * @text ---保存---
 * @default
 *
 * @param OnMapLoad
 * @text 地图加载时自动保存
 * @parent ---Automatic---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Autosave whenever the map is loaded.
 * YES - true     NO - false
 * @default false
 *
 * @param OnMainMenu
 * @text 在主菜单上自动保存
 * @parent ---Automatic---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Autosave whenever main menu is called.
 * YES - true     NO - false
 * @default false
 *
 * @param ---Option Menu---
 * @text ---选项菜单---
 * @default
 *
 * @param Show Option
 * @text 显示选项
 * @parent ---Option Menu---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Give player the option to enable or disable Autosave?
 * YES - true     NO - false
 * @default true
 *
 * @param Option Name
 * @text 选择名称
 * @parent ---Option Menu---
 * @desc The option command text used in-game.
 * @default 自动保存
 *
 * @param Default
 * @text 默认自动保存
 * @parent ---Option Menu---
 * @desc Do you want Autosaving to be enabled by default?
 * YES - true     NO - false
 * @default true
 *
 * @param ---Visual---
 * @text ---视觉---
 * @default
 *
 * @param ShowAutosave
 * @text 显示自动保存消息
 * @parent ---Visual---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show a message when Autosave happens?
 * YES - true     NO - false
 * @default true
 *
 * @param AutosaveMsgSave
 * @text 保存时自动保存消息
 * @parent ShowAutosave
 * @desc Text used for the auto save message.
 * Can use text codes.
 * @default \i[83]自动保存完成！
 *
 * @param AutosaveMsgLoad
 * @text 加载时自动保存消息
 * @parent ShowAutosave
 * @desc Text used for the auto save message.
 * Can use text codes.
 * @default \i[83]自动保存已加载！
 *
 * @param MsgGradient1
 * @text 消息渐变1
 * @parent ShowAutosave
 * @desc 用于较软渐变颜色的十六进制颜色。
 * rgba(0, 0, 0, 0) Reference: Red, Green, Blue, Alpha
 * @default rgba(0, 0, 0, 0)
 *
 * @param MsgGradient2
 * @text 消息渐变2
 * @parent ShowAutosave
 * @desc 用于较软渐变颜色的十六进制颜色。
 * rgba(0, 0, 0, 0) Reference: Red, Green, Blue, Alpha
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param MsgGradientCode
 * @text 消息渐变码
 * @parent ShowAutosave
 * @type note
 * @desc 为那些想要调整渐变绘制方式的人编写的JavaScript代码。
 * （不懂JS还是推荐不要使用这个）.
 * @default "var textWidth = this.textWidthEx(this.message());\nvar half = this.textPadding() + Math.ceil(textWidth / 2);\nvar height = this.lineHeight();\nvar color1 = Yanfly.Param.AutosaveMsgColor1;\nvar color2 = Yanfly.Param.AutosaveMsgColor2;\nthis.contents.gradientFillRect(0, 0, half, height, color1, color2);\nthis.contents.gradientFillRect(half, 0, this.width - half, height, color2, color1);"
 *
 * @param MsgX
 * @text 消息X
 * @parent ShowAutosave
 * @desc X position of the message.
 * You can use code here.
 * @default Graphics.boxWidth - 180
 *
 * @param MsgY
 * @text 消息Y
 * @parent ShowAutosave
 * @desc Y position of the message.
 * You can use code here.
 * @default Graphics.boxHeight - this.fittingHeight(1) * 2
 *
 * @param MsgDuration
 * @text 消息持续时间
 * @parent ShowAutosave
 * @type number
 * @desc 以帧为单位的消息持续时间。
 * @default 120
 *
 * @param FadeSpeed
 * @text 消息淡入速度
 * @parent ShowAutosave
 * @desc 窗口的渐变速度。
 * Lower - slower     Higher - faster
 * @default 16
 *
 */
//=============================================================================

if (Imported.YEP_SaveCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_Autosave');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.AutosaveOnMapLoad = eval(String(Yanfly.Parameters['OnMapLoad']));
Yanfly.Param.AutosaveOnMainMenu = eval(String(Yanfly.Parameters['OnMainMenu']));

Yanfly.Param.AutosaveShowOpt = eval(String(Yanfly.Parameters['Show Option']));
Yanfly.Param.AutosaveOptionCmd = String(Yanfly.Parameters['Option Name']);
Yanfly.Param.AutosaveDefault = eval(String(Yanfly.Parameters['Default']));

Yanfly.Param.AutosaveShowMsg = eval(String(Yanfly.Parameters['ShowAutosave']));
Yanfly.Param.AutosaveMsgSave = String(Yanfly.Parameters['AutosaveMsgSave']);
Yanfly.Param.AutosaveMsgLoad = String(Yanfly.Parameters['AutosaveMsgLoad']);
Yanfly.Param.AutosaveMsgColor1 = String(Yanfly.Parameters['MsgGradient1']);
Yanfly.Param.AutosaveMsgColor2 = String(Yanfly.Parameters['MsgGradient2']);
Yanfly.Param.AutosaveMsgCode = JSON.parse(Yanfly.Parameters['MsgGradientCode']);
Yanfly.Param.AutosaveMsgX = String(Yanfly.Parameters['MsgX']);
Yanfly.Param.AutosaveMsgY = String(Yanfly.Parameters['MsgY']);
Yanfly.Param.AutosaveMsgDur = Number(Yanfly.Parameters['MsgDuration']) || 120;
Yanfly.Param.AutosaveMsgFade = Number(Yanfly.Parameters['FadeSpeed']) || 16;

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.autosave = Yanfly.Param.AutosaveDefault;

Yanfly.Autosave.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.Autosave.ConfigManager_makeData.call(this);
  config.autosave = this.autosave;
  return config;
};

Yanfly.Autosave.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.Autosave.ConfigManager_applyData.call(this, config);
  this.autosave = config['autosave'] || Yanfly.Param.AutosaveDefault;
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Autosave.DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
  Yanfly.Autosave.DataManager_setupNewGame.call(this);
  StorageManager.setCurrentAutosaveSlot(this._lastAccessedId);
  $gameTemp._autosaveNewGame = true;
  $gameTemp._autosaveLoading = false;
};

Yanfly.Autosave.DataManager_saveGame = DataManager.saveGameWithoutRescue;
DataManager.saveGameWithoutRescue = function(savefileId) {
  var value = Yanfly.Autosave.DataManager_saveGame.call(this, savefileId);
  $gameTemp._autosaveNewGame = false;
  $gameTemp._autosaveLoading = false;
  StorageManager.setCurrentAutosaveSlot(savefileId);
  return value;
};

Yanfly.Autosave.DataManager_loadGame = DataManager.loadGameWithoutRescue;
DataManager.loadGameWithoutRescue = function(savefileId) {
  var value = Yanfly.Autosave.DataManager_loadGame.call(this, savefileId);
  $gameTemp._autosaveNewGame = false;
  $gameTemp._autosaveLoading = true;
  StorageManager.setCurrentAutosaveSlot(savefileId);
  return value;
};

//=============================================================================
// StorageManager
//=============================================================================

StorageManager.getCurrentAutosaveSlot = function() {
  return this._currentAutosaveSlot;
};

StorageManager.setCurrentAutosaveSlot = function(savefileId) {
  this._currentAutosaveSlot = savefileId;
};

StorageManager.performAutosave = function() {
  if ($gameMap.mapId() <= 0) return;
  if ($gameTemp._autosaveNewGame) return;
  if (!$gameSystem.canAutosave()) return;
  SceneManager._scene.performAutosave();
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Autosave.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.Autosave.Game_System_initialize.call(this);
  this.initAutosave();
};

Game_System.prototype.initAutosave = function() {
  this._allowAutosave = true;
};

Game_System.prototype.canAutosave = function() {
  if (this._allowAutosave === undefined) this.initAutosave();
  return this._allowAutosave;
};

Game_System.prototype.setAutosave = function(value) {
  if (this._allowAutosave === undefined) this.initAutosave();
  this._allowAutosave = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Autosave.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Autosave.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command.match(/EnableAutosave/i)) {
    $gameSystem.setAutosave(true);
  } else if (command.match(/DisableAutosave/i)) {
    $gameSystem.setAutosave(false);
  } else if (command.match(/Autosave/i)) {
    StorageManager.performAutosave();
  }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.Autosave.Window_Options_addGeneralOptions =
  Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
  Yanfly.Autosave.Window_Options_addGeneralOptions.call(this);
  if (!Imported.YEP_OptionsCore && Yanfly.Param.AutosaveShowOpt) {
    this.addCommand(Yanfly.Param.AutosaveOptionCmd, 'autosave');
  }
};

//=============================================================================
// Window_Autosave
//=============================================================================

function Window_Autosave() {
  this.initialize.apply(this, arguments);
}

Window_Autosave.prototype = Object.create(Window_Base.prototype);
Window_Autosave.prototype.constructor = Window_Autosave;

Window_Autosave.prototype.initialize = function() {
  var width = this.windowWidth();
  var height = this.windowHeight();
  var x = eval(Yanfly.Param.AutosaveMsgX);
  var y = eval(Yanfly.Param.AutosaveMsgY);
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this.opacity = 0;
  this.contentsOpacity = 0;
  this._showCount = 0;
  this.refresh();
  if ($gameTemp._autosaveLoading) {
    this.reveal();
    $gameTemp._autosaveLoading = false;
  }
};

Window_Autosave.prototype.standardPadding = function() {
  return 0;
};

Window_Autosave.prototype.windowWidth = function() {
  return Graphics.boxWidth;
};

Window_Autosave.prototype.windowHeight = function() {
  return this.fittingHeight(1);
};

Window_Autosave.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  if (this._showCount > 0) {
    this.updateFadeIn();
    this._showCount--;
  } else {
    this.updateFadeOut();
  }
};

Window_Autosave.prototype.updateFadeIn = function() {
  this.contentsOpacity += Yanfly.Param.AutosaveMsgFade;
};

Window_Autosave.prototype.updateFadeOut = function() {
  this.contentsOpacity -= Yanfly.Param.AutosaveMsgFade;
};

Window_Autosave.prototype.reveal = function() {
  if (!Yanfly.Param.AutosaveShowMsg) return;
  if (this._showCount > 0) return;
  this._showCount = Yanfly.Param.AutosaveMsgDur;
  this.refresh();
};

Window_Autosave.prototype.message = function() {
  if ($gameTemp._autosaveLoading) {
    return Yanfly.Param.AutosaveMsgLoad;
  } else {
    return Yanfly.Param.AutosaveMsgSave;
  }
};

Window_Autosave.prototype.refresh = function() {
  this.contents.clear();
  this.drawGradient();
  this.drawTextEx(this.message(), this.textPadding(), 0);
};

Window_Autosave.prototype.drawGradient = function() {
  eval(Yanfly.Param.AutosaveMsgCode);
};

Window_Autosave.prototype.textWidthEx = function(text) {
  return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Scene_Base
//=============================================================================

Scene_Base.prototype.performAutosave = function() {
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.Autosave.Scene_Map_createAllWindows =
  Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
  Yanfly.Autosave.Scene_Map_createAllWindows.call(this);
  this.createAutosaveMessageWindow();
};

Scene_Map.prototype.createAutosaveMessageWindow = function() {
  this._autosaveMsgWindow = new Window_Autosave();
  this.addChild(this._autosaveMsgWindow);
};

Yanfly.Autosave.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
  Yanfly.Autosave.Scene_Map_onMapLoaded.call(this);
  if (Yanfly.Param.AutosaveOnMapLoad) StorageManager.performAutosave();
};

Yanfly.Autosave.Scene_Map_callMenu = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function() {
  Yanfly.Autosave.Scene_Map_callMenu.call(this);
  if (Yanfly.Param.AutosaveOnMainMenu) StorageManager.performAutosave();
};

Scene_Map.prototype.performAutosave = function() {
  if ($gameMap.mapId() <= 0) return;
  if ($gameTemp._autosaveNewGame) return;
  if (!$gameSystem.canAutosave()) return;
  $gameSystem.onBeforeSave();
  DataManager.saveGameWithoutRescue(StorageManager.getCurrentAutosaveSlot());
  if (this._autosaveMsgWindow) this._autosaveMsgWindow.reveal();
};

//=============================================================================
// Save Core Check
//=============================================================================
} else {

Imported.YEP_X_Autosave = false;
var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_Autosave without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}
//=============================================================================
// End of File
//=============================================================================