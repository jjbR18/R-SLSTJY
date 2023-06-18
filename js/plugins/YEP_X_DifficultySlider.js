//=============================================================================
// Yanfly Engine Plugins - Enemy Levels Extension - Difficulty Slider
// YEP_X_DifficultySlider.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_DifficultySlider = true;

var Yanfly = Yanfly || {};
Yanfly.DSlider = Yanfly.DSlider || {};
Yanfly.DSlider.version = 1.03;

//=============================================================================
 /*:
 * @plugindesc v1.03 游戏难度设置☁️
 * @author Yanfly Engine Plugins
 *
 * @param ---Options---
 * @text ---选项---
 * @default
 *
 * @param Command Text
 * @text 命令文本
 * @parent ---Options---
 * @desc How the command appears in the options menu.
 * @default 难度
 *
 * @param Default Show
 * @text 默认显示
 * @parent ---Options---
 * @type boolean
 * @desc Show the command by default? If off, defaults to 100.
 * ON - true     OFF - false
 * @default true
 *
 * @param --Settings---
 * @text ---设置---
 * @default
 *
 * @param Default Difficulty
 * @text 默认难度
 * @parent ---Settings---
 * @desc This is the default difficulty value.
 * @type Number
 * @default 100
 *
 * @param Minimum Difficulty
 * @text 最小难度
 * @parent ---Settings---
 * @desc This is the minimum difficulty value.
 * @type Number
 * @default 50
 *
 * @param Maximum Difficulty
 * @text 最大难度
 * @parent ---Settings---
 * @desc This is the maximum difficulty value.
 * @type Number
 * @default 200
 *
 * @param Change Increment
 * @text 变更增量
 * @parent ---Settings---
 * @desc This is the amount the difficulty changes per increment
 * @type Number
 * @default 25
 *
 * @param ---Formulas---
 * @text ---公式---
 * @default
 *
 * @param Base Level Formula
 * @text 基本难度公式
 * @parent ---Formulas---
 * @desc The formula used to determine the base level.
 * level - current level     multiplier - multiplier value
 * @default level * multiplier / 100
 *
 * @param Maximum Level Formula
 * @text 最高难度公式
 * @parent ---Formulas---
 * @desc The formula used to determine the maximum level.
 * level - current level     multiplier - multiplier value
 * @default level * multiplier / 100
 *
 * @param Minimum Level Formula
 * @text 最低难度公式
 * @parent ---Formulas---
 * @desc The formula used to determine the minimum level.
 * level - current level     multiplier - multiplier value
 * @default level * multiplier / 100
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要YEP\u EnemyLevels。
 * 确保此插件位于插件列表中的YEP\u EnemyLevels下。
 * 
 * 有时，玩家希望能够增加或减少
 * 你的游戏的难度在他们自己的协议。难度滑块变为
 * 安装此插件后，可从游戏的选项菜单访问此功能。
 * 在那里，玩家可以改变游戏中出现的敌人的等级
 * 在一定范围内战斗（由开发者自己设定）。
 * 
 * 难度滑块只会改变敌人的等级而不会改变任何东西
 * 否则。因此，200%的难度只意味着水平提高了200%
 * 但不一定要增加200%的ATK，例如。敌人的ATK
 * 价值将基于其ATK在200%的原始水平。
 * 
 * 如果在游戏中禁用了难度滑块，那么级别乘数
 * 将恢复到100%。您可以随意启用和禁用此功能
 * 通过插件命令。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 有一个notetag可以用于难度滑块插件。
 * 
 * 敌方便签：
 *
 *   <Unaffected by Difficulty Slider>
 *   - 这将使敌人的等级不受难度滑块的影响，
 * 这意味着敌人将始终处于其当前计算水平的100%。
 * 
 *  ============================================================================
 * 插件命令
 *  ============================================================================
 * 
 * 对于那些希望从选项菜单中显示/隐藏难度滑块的用户
 * 游戏中途，您可以使用以下插件命令进行控制：
 * 
 * 插件命令：
 *
 *   ShowDifficultySlider
 *   - 这将显示难度滑块并启用它，使其适用于游戏中所有没有未受影响的便签的敌人。
 *
 *   HideDifficultySlider
 *   - 这将隐藏难度滑块和禁用滑块的影响，敌人的水平在游戏中。
 *
 * ============================================================================
 * 附加信息
 * ============================================================================
 *
 * For those who wish to use the Difficulty Slider in script calls, you can
 * find out the value the player has set using:
 *
 *   ConfigManager.difficultySlider
 *
 * This value will return a whole number. A difficulty setting of 100% will
 * yield 100 and a difficulty setting of 200% will yield 200. Therefore, if you
 * wish to make a check that appears only on higher difficulties, you can use
 * the following:
 *
 *   if (ConfigManager.difficultySlider >= 200) {
 *     // Do stuff
 *   }
 *
 * Have fun!
 *
 * ============================================================================
 * Options Core Settings - Adding the New Options
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
 * \i[87]Enemy Difficulty
 *
 * Help Description:
 * Determines the level strength of enemies.
 *
 * Symbol:
 * difficultySlider
 *
 * Show/Hide:
 * if (Imported.YEP_X_DifficultySlider) {
 *   show = $gameSystem.showDifficultySlider();
 * } else {
 *   show = false;
 * }
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
 * var value = this.getConfigValue(symbol);
 * var rate = value / Yanfly.Param.DSliderMaxDif;
 * var gaugeColor1 = this.textColor(28);
 * var gaugeColor2 = this.textColor(29);
 * this.drawOptionsGauge(index, rate, gaugeColor1, gaugeColor2);
 * this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'center');
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value += Yanfly.Param.DSliderChange;
 * if (value > Yanfly.Param.DSliderMaxDif) value = Yanfly.Param.DSliderMinDif;
 * value = value.clamp(Yanfly.Param.DSliderMinDif, Yanfly.Param.DSliderMaxDif);
 * this.changeValue(symbol, value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value += Yanfly.Param.DSliderChange;
 * value = value.clamp(Yanfly.Param.DSliderMinDif, Yanfly.Param.DSliderMaxDif);
 * this.changeValue(symbol, value);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * value -= Yanfly.Param.DSliderChange;
 * value = value.clamp(Yanfly.Param.DSliderMinDif,
 * Yanfly.Param.DSliderMaxDif);
 * this.changeValue(symbol, value);
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
 * Version 1.03:
 * - Compatibility update for YEP_OptionsCore.js.
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.01:
 * - Bug fixed: Error with pressing right on the difficulty slider causing
 * the game to crash unexpectedly.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_EnemyLevels) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_DifficultySlider');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.DSliderOptionsCmd = String(Yanfly.Parameters['Command Text']);
Yanfly.Param.DSliderShow = eval(String(Yanfly.Parameters['Default Show']));

Yanfly.Param.DSliderDefDif = Number(Yanfly.Parameters['Default Difficulty']);
Yanfly.Param.DSliderMinDif = Number(Yanfly.Parameters['Minimum Difficulty']);
Yanfly.Param.DSliderMaxDif = Number(Yanfly.Parameters['Maximum Difficulty']);
Yanfly.Param.DSliderChange = Number(Yanfly.Parameters['Change Increment']);

Yanfly.Param.DSliderBase = String(Yanfly.Parameters['Base Level Formula']);
Yanfly.Param.DSliderMax = String(Yanfly.Parameters['Maximum Level Formula']);
Yanfly.Param.DSliderMin = String(Yanfly.Parameters['Maximum Level Formula']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.DSlider.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.DSlider.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_DifficultySlider) {
    this.processDSliderNotetags1($dataEnemies);
    Yanfly._loaded_YEP_DifficultySlider = true;
  }
  
  return true;
};

DataManager.processDSliderNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.difficultySliderAffected = true;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<UNAFFECTED BY DIFFICULTY SLIDER>/i)) {
        obj.difficultySliderAffected = false;
      }
    }
  }
};

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.difficultySlider = Yanfly.Param.DSliderDefDif;

Yanfly.DSlider.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
  var config = Yanfly.DSlider.ConfigManager_makeData.call(this);
  config.difficultySlider = this.difficultySlider;
  return config;
};

Yanfly.DSlider.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
  Yanfly.DSlider.ConfigManager_applyData.call(this, config);
  this.difficultySlider = this.readConfigDifficultySlider(config,
    'difficultySlider');
};

ConfigManager.readConfigDifficultySlider = function(config, name) {
  var value = config[name];
  if (value !== undefined) {
    return Number(value).clamp(Yanfly.Param.DSliderMinDif,
      Yanfly.Param.DSliderMaxDif);
  } else {
    return Yanfly.Param.DSliderDefDif.clamp(Yanfly.Param.DSliderMinDif,
      Yanfly.Param.DSliderMaxDif);
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.DSlider.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.DSlider.Game_System_initialize.call(this);
  this.initDifficultySliderSettings();
};

Game_System.prototype.initDifficultySliderSettings = function() {
  this._showDifficultySlider = Yanfly.Param.DSliderShow;
};

Game_System.prototype.showDifficultySlider = function() {
  if (this._showDifficultySlider === undefined) {
    this.initDifficultySliderSettings();
  }
  return this._showDifficultySlider;
};

Game_System.prototype.setDifficultySlider = function(value) {
  if (this._showDifficultySlider === undefined) {
    this.initDifficultySliderSettings();
  }
  this._showDifficultySlider = value;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.isDifficultySliderAffected = function() {
  return this.enemy().difficultySliderAffected && 
    $gameSystem.showDifficultySlider();
};

Yanfly.DSlider.Game_Enemy_setupMinimumLevel =
  Game_Enemy.prototype.setupMinimumLevel;
Game_Enemy.prototype.setupMinimumLevel = function() {
  var level = Yanfly.DSlider.Game_Enemy_setupMinimumLevel.call(this);
  if (this.isDifficultySliderAffected()) {
    var multiplier = ConfigManager.difficultySlider
    var code = Yanfly.Param.DSliderMin;
    try {
      level = eval(code);
    } catch (e) {
      level = level * multiplier / 100;
      Yanfly.Util.displayError(e, code, 
        'DIFFICULTY SLIDER MINIMUM LEVEL ERROR');
    }
  }
  return parseInt(level);
};

Yanfly.DSlider.Game_Enemy_setupMaximumLevel =
  Game_Enemy.prototype.setupMaximumLevel;
Game_Enemy.prototype.setupMaximumLevel = function() {
  var level = Yanfly.DSlider.Game_Enemy_setupMaximumLevel.call(this);
  if (this.isDifficultySliderAffected()) {
    var multiplier = ConfigManager.difficultySlider
    var code = Yanfly.Param.DSliderMax;
    try {
      level = eval(code);
    } catch (e) {
      level = level * multiplier / 100;
      Yanfly.Util.displayError(e, code, 
        'DIFFICULTY SLIDER MAXIMUM LEVEL ERROR');
    }
  }
  return parseInt(level);
};

Yanfly.DSlider.Game_Enemy_getSetupLevel = Game_Enemy.prototype.getSetupLevel;
Game_Enemy.prototype.getSetupLevel = function() {
  var level = Yanfly.DSlider.Game_Enemy_getSetupLevel.call(this);
  if (this.isDifficultySliderAffected()) {
    var multiplier = ConfigManager.difficultySlider
    var code = Yanfly.Param.DSliderBase;
    try {
      level = eval(code);
    } catch (e) {
      level = level * multiplier / 100;
      Yanfly.Util.displayError(e, code, 
        'DIFFICULTY SLIDER BASE LEVEL ERROR');
    }
  }
  return parseInt(level);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.DSlider.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.DSlider.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowDifficultySlider') {
    $gameSystem.setDifficultySlider(true);
  } else if (command === 'HideDifficultySlider') {
    $gameSystem.setDifficultySlider(false);
  }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.DSlider.Window_Options_addGeneralOptions =
  Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
  Yanfly.DSlider.Window_Options_addGeneralOptions.call(this);
  if (Imported.YEP_OptionsCore) return;
  if ($gameSystem.showDifficultySlider()) this.addDifficultySliderOptions();
};

Window_Options.prototype.addDifficultySliderOptions = function() {
  this.addCommand(Yanfly.Param.DSliderOptionsCmd, 'difficultySlider');
};

Yanfly.DSlider.Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
  var symbol = this.commandSymbol(index);
  var value = this.getConfigValue(symbol);
  if (symbol === 'difficultySlider') {
    return Yanfly.Util.toGroup(value) + '%';
  } else {
    return Yanfly.DSlider.Window_Options_statusText.call(this, index);
  }
};

if (!Imported.YEP_OptionsCore) {

Yanfly.DSlider.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'difficultySlider') {
    var value = this.getConfigValue(symbol);
    value += Yanfly.Param.DSliderChange;
    if (value > Yanfly.Param.DSliderMaxDif) value = Yanfly.Param.DSliderMinDif;
    value = value.clamp(Yanfly.Param.DSliderMinDif,
      Yanfly.Param.DSliderMaxDif);
    this.changeValue(symbol, value);
  } else {
    Yanfly.DSlider.Window_Options_processOk.call(this);
  }
};

Yanfly.DSlider.Window_Options_cursorRight = 
  Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'difficultySlider') {
    var value = this.getConfigValue(symbol);
    value += Yanfly.Param.DSliderChange;
    value = value.clamp(Yanfly.Param.DSliderMinDif,
      Yanfly.Param.DSliderMaxDif);
    this.changeValue(symbol, value);
  } else {
    Yanfly.DSlider.Window_Options_cursorRight.call(this, wrap);
  }
};

Yanfly.DSlider.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
  var index = this.index();
  var symbol = this.commandSymbol(index);
  if (symbol === 'difficultySlider') {
    var value = this.getConfigValue(symbol);
    value -= Yanfly.Param.DSliderChange;
    value = value.clamp(Yanfly.Param.DSliderMinDif,
      Yanfly.Param.DSliderMaxDif);
    this.changeValue(symbol, value);
  } else {
    Yanfly.DSlider.Window_Options_cursorLeft.call(this, wrap);
  }
};

}; // Imported.YEP_OptionsCore


//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {

Yanfly.Util.toGroup = function(inVal) {
  return inVal;
}

}; // Yanfly.Util.toGroup

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_DifficultySlider requires YEP_EnemyLevels to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_EnemyLevels plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_EnemyLevels