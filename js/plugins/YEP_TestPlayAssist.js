//=============================================================================
// Yanfly Engine Plugins - Test Play Assist
// YEP_TestPlayAssist.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_TestPlayAssist = true;

var Yanfly = Yanfly || {};
Yanfly.TPA = Yanfly.TPA || {};
Yanfly.TPA.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 测试助手☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 试玩你的游戏会很费时。每一秒你花在
 * 标题屏幕，每次你不小心选择继续而不是
 * 新游戏，打开FPS计数器所需的时间，等等。而每个
 * 其中一部分只需要很少的时间，额外浪费的时间增加了
 * 快起来。这个插件将让你访问各种功能，将目标
 * 帮助你节省更多的时间来测试你的游戏。这些
 * 功能只会在测试播放期间出现，不会在最终版本中运行
 * 游戏的版本。
 *  
 * 以下所有选项都是可选的，可以打开/关闭：
 * 
 * Auto New Game
 * - 这将自动开始一个新的游戏，每次你打测试玩。
 *    这样，您就可以避免意外地选择Continue选项，
 *    立即转到您放置的起始玩家位置，并测试您需要执行的任何操作。
 * 
 * On Switches
 * - 这是一个开关列表，每次在试玩期间开始新游戏时，开关都会自动打开。
 *    这有助于激活/绕过某些事件、启动并行公共事件等。
 * 
 * Common event
 * - 每次在测试游戏中开始新游戏时运行一个特定的公共事件。
 *    这几乎可以用于任何事情，从增加党员，给党一定的武器，整平党，等等。
 * 
 * Startup Code
 * - 对于那些知道JavaScript的人来说，
 *    这段代码将在一个新游戏的开始测试时运行。
 *    默认情况下，此插件包含的代码将为数据库中不是关键项或隐藏项的
 *    每个项添加10倍，以便更好地进行测试。
 * 
 * Show FPS
 * - 通常，人们会按F2键来显示FPS表。
 *    启用此插件参数将在每次启用时自动打开它，以节省您的时间。
 * 
 * Full Screen
 * - 这将自动全屏游戏启动时，
 *    在测试发挥加快任何时候你必须测试全屏游戏，而不需要按F4键。
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
 * @param AutoStart
 * @text 试玩-自动新游戏
 * @type boolean
 * @on YES
 * @off NO
 * @desc Automatically start a new game on test play?
 * @default false
 *
 * @param OnSwitches
 * @text 测试播放开关
 * @type switch[]
 * @desc Turns all of the following switches when a new game is
 * started during test play.
 * @default []
 *
 * @param CommonEvent
 * @text 试玩-常见事件
 * @type common_event
 * @desc Plays this common event whenever New Game is started during
 * test play. Leave this at zero to not use this function.
 * @default 0
 *
 * @param StartCode
 * @text 测试播放-启动代码
 * @type note
 * @desc Runs the following code upon starting up a new game during
 * test play. Remove all the code inside if you want.
 * @default "// Get 10x of each regular item. Exclude key/hidden items.\nfor (var i = 1; i < $dataItems.length; ++i) {\n  var item = $dataItems[i];\n  if (!item) continue;\n  if (item.itypeId !== 1) continue;\n  if (item.name.trim().length <= 0) continue;\n  $gameParty.gainItem(item, 10);\n}"
 *
 * @param AutoFPS
 * @text 试玩-显示FPS
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show FPS when you launch the test play client.
 * @default false
 *
 * @param AutoFullScr
 * @text 测试播放-全屏
 * @type boolean
 * @on YES
 * @off NO
 * @desc Automatically full screen the game client during test play.
 * @default false
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_TestPlayAssist');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.DSUAAutoNewGame = eval(Yanfly.Parameters['AutoStart']) || false;
Yanfly.Param.DSUAOnSwitches = JSON.parse(Yanfly.Parameters['OnSwitches']) || "";
Yanfly.Param.DSUACommonEvent = Number(Yanfly.Parameters['CommonEvent']) || 0;
Yanfly.Param.DSUAStartCode = JSON.parse(Yanfly.Parameters['StartCode']) || "";
Yanfly.Param.DSUAAutoFPS = eval(Yanfly.Parameters['AutoFPS']) || false;
Yanfly.Param.DSUAAutoFullScr = eval(Yanfly.Parameters['AutoFullScr']) || false;

if (Utils.isNwjs() && Utils.isOptionValid('test')) {

//=============================================================================
// DataManager
//=============================================================================

Yanfly.TPA.DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
  Yanfly.TPA.DataManager_setupNewGame.call(this);
  this.setupNewGameTestPlayAssist();
};

DataManager.setupNewGameTestPlayAssist = function() {
  // Switch On
  for (var i = 0; i < Yanfly.Param.DSUAOnSwitches.length; ++i) {
    var switchId = Number(Yanfly.Param.DSUAOnSwitches[i]);
    if (switchId > 0) {
      $gameSwitches.setValue(switchId, true);
    }
  }
  // Common Event
  if (Yanfly.Param.DSUACommonEvent > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.DSUACommonEvent);
  }
  // Startup Code
  eval(Yanfly.Param.DSUAStartCode);
};

//=============================================================================
// Scene_Boot
//=============================================================================

Yanfly.TPA.Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
  if (this.isAutoStartNewGame()) {
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
  } else {
    Yanfly.TPA.Scene_Boot_start.call(this);
  }
  if (Yanfly.Param.DSUAAutoFPS) Graphics._switchFPSMeter();
  if (Yanfly.Param.DSUAAutoFullScr) Graphics._requestFullScreen();
};

Scene_Boot.prototype.isAutoStartNewGame = function() {
  return Yanfly.Param.DSUAAutoNewGame &&
         !DataManager.isBattleTest() &&
         !DataManager.isEventTest();
};

}; // (Utils.isNwjs() && Utils.isOptionValid('test'))

//=============================================================================
// End of File
//=============================================================================