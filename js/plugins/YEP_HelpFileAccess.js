//=============================================================================
// Yanfly Engine Plugins - Help File Access
// YEP_HelpFileAccess.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_HelpFileAccess = true;

var Yanfly = Yanfly || {};
Yanfly.Help = Yanfly.Help || {};
Yanfly.Help.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 帮助文件链接☁️
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @text ---全局---
 * @default
 *
 * @param Help File Path
 * @text 帮助文件路径
 * @parent ---General---
 * @desc Path to the help file. Use a local path to an HTML file or
 * a URL for an online website.
 * @default /help/index.htm
 *
 * @param Enable F1 Key
 * @text 启用 F1 键
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the F1 key to open the help file?
 * ON - true     OFF - false
 * @default true
 *
 * @param ---Menu---
 * @text ---菜单---
 * @default
 *
 * @param Help Command
 * @text 帮助命令
 * @parent ---Menu---
 * @desc This is the text used for the menu command.
 * @default Help
 *
 * @param Auto Add Menu
 * @text 自动添加菜单
 * @parent ---Menu---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Automatically add the 'Help' command to the main menu?
 * NO - false     YES - true
 * @default true
 *
 * @param Show Command
 * @text 显示命令
 * @parent ---Menu---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Help command in the main menu by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Auto Place Command
 * @text 自动放置命令
 * @parent ---Menu---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Allow this plugin to decide the menu placement position?
 * NO - false     YES - true
 * @default true
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * Steam上的游戏并不提供给我们帮助手册的功能或链接，RMMV也毫不例外。
 * 不过，你可以使用这款插件来制作游戏内部链接帮助文件的功能，
 * 你可以使用F1键或内置菜单。
 *
 * 这个帮助文件可以链接到本地的目录或者在线的网址，有点像维基百科。
 * 你可以在帮助文件路径这个参数里面设置
 *
 * ============================================================================
 * 主菜单管理器-定位帮助命令
 * ============================================================================
 *
 * 对于那些想在主菜单设置帮助文件命令的人，你可以参考下面的格式
 *
 *       Name: Yanfly.Param.HelpCmd
 *     Symbol: help
 *       Show: $gameSystem.isShowHelpCommand()
 *    Enabled: true
 *        Ext: 
 *  Main Bind: this.commandHelp.bind(this)
 * Actor Bind: 
 *
 * 把这个插入主菜单管理的编辑器中，你可以在插件参数里自由设置
 *
 * 请记住打开自动添加菜单的参数开关
 *
 * ============================================================================
 * 插件命令
 * ============================================================================
 *
 * 你还可以使用下面的插件名来调整
 *
 * 插件命令
 *
 *   OpenHelp
 *   - 打开帮助文件
 *
 *   ShowMenuHelpCommand
 *   - 显示帮助文件菜单栏
 *
 *   HideMenuHelpCommand
 *   - 隐藏帮助文件菜单栏
 */
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_HelpFileAccess');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.HelpFilePath = String(Yanfly.Parameters['Help File Path']);
Yanfly.Param.HelpF1Key = eval(String(Yanfly.Parameters['Enable F1 Key']));

Yanfly.Param.HelpCmd = String(Yanfly.Parameters['Help Command']);
Yanfly.Param.HelpAutoAdd = eval(String(Yanfly.Parameters['Auto Add Menu']));
Yanfly.Param.HelpShow = eval(String(Yanfly.Parameters['Show Command']));
Yanfly.Param.HelpAutoPlace = String(Yanfly.Parameters['Auto Place Command']);
Yanfly.Param.HelpAutoPlace = eval(Yanfly.Param.HelpAutoPlace);

//=============================================================================
// Graphics
//=============================================================================

if (Yanfly.Param.HelpF1Key) {

Yanfly.Help.Graphics_onKeyDown = Graphics._onKeyDown;
Graphics._onKeyDown = function(event) {
  Yanfly.Help.Graphics_onKeyDown.call(this, event);
  if (!event.ctrlKey && !event.altKey && event.keyCode === 112) {
    Yanfly.AccessHelpFile();
  };
};

}; // Yanfly.Param.HelpF1Key

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Help.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.Help.Game_System_initialize.call(this);
  this.initHelp();
};

Game_System.prototype.initHelp = function() {
  this._helpCommandShow = Yanfly.Param.HelpShow;
};

Game_System.prototype.isShowHelpCommand = function() {
  if (this._helpCommandShow === undefined) this.initHelp();
  return this._helpCommandShow;
};

Game_System.prototype.setShowHelpCommand = function(value) {
  if (this._helpCommandShow === undefined) this.initHelp();
  this._helpCommandShow = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Help.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Help.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'OpenHelp') {
    Yanfly.AccessHelpFile();
  } else if (command === 'ShowMenuHelpCommand') {
    $gameSystem.setShowHelpCommand(true);
  } else if (command === 'HideMenuHelpCommand') {
    $gameSystem.setShowHelpCommand(false);
  }
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Yanfly.Help.Window_MenuCommand_addOriginalCommands =
  Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
  Yanfly.Help.Window_MenuCommand_addOriginalCommands.call(this);
  if (Yanfly.Param.HelpAutoAdd) this.addHelpCommand();
};

Window_MenuCommand.prototype.addHelpCommand = function() {
  if (!Yanfly.Param.HelpAutoPlace) return;
  if (!$gameSystem.isShowHelpCommand()) return;
  if (this.findSymbol('help') > -1) return;
  var text = Yanfly.Param.HelpCmd;
  this.addCommand(text, 'help', true);
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.Help.Scene_Menu_createCommandWindow =
  Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  Yanfly.Help.Scene_Menu_createCommandWindow.call(this);
  this._commandWindow.setHandler('help', this.commandHelp.bind(this));
};

Scene_Menu.prototype.commandHelp = function() {
  Yanfly.AccessHelpFile();
  this._commandWindow.activate();
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.AccessHelpFile = function() {
  if ($gameTemp.isPlaytest()) console.log('Opening Help File...');
  TouchInput.clear();
  Input.clear();
  var url = this.getHelpFileUrl();
  var win = window.open(url);
  if (win) {
    win.focus();
  } else if (Imported.YEP_ExternalLinks) {
    SceneManager.openPopupBlockerMessage();
  }
};

Yanfly.getHelpFileUrl = function() {
  var url = Yanfly.Param.HelpFilePath;
  if (url.match(/http/i)) {
    return url;
  } else {
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/,
    '/' + Yanfly.Param.HelpFilePath);
    if (path.match(/^\/([A-Z]\:)/)) path = path.slice(1);
    path = decodeURI(path);
    return path;
  }
};

//=============================================================================
// End of File
//=============================================================================