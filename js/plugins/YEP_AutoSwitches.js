//=============================================================================
// Yanfly Engine Plugins - Auto Switch
// YEP_AutoSwitch.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_AutoSwitches = true;

var Yanfly = Yanfly || {};
Yanfly.AutoSwitch = Yanfly.AutoSwitch || {};

//=============================================================================
 /*:
 * @plugindesc v1.00 自动开关☁️
 * @author Yanfly Engine Plugins
 *
 * @param Battle Switch
 * @text 战斗开关
 * @desc This switch will always be ON when the player is in battle.
 * @default 0
 *
 * @param Battle Test Switch
 * @text 作战测试开关
 * @desc 只有通过数据库的battle Test选项访问battle时，此开关才会打开。
 * @default 0
 *
 * @param Dash Switch
 * @text 冲刺开关
 * @desc 当玩家冲刺时，这个开关总是打开的。
 * @default 0
 *
 * @param Debug Switch
 * @text 调试开关
 * @desc 此开关将在试玩和战斗测试期间始终打开，否则将始终关闭。
 * @default 0
 *
 * @param Mobile Switch
 * @text 移动开关
 * @desc 在任何移动设备上播放时，此开关将始终打开，否则将始终关闭。
 * @default 0
 *
 * @param Mobile Chrome Switch
 * @text 移动 Chrome 开关
 * @desc 此开关将打开或关闭取决于是否在移动Chrome浏览器上播放。
 * @default 0
 *
 * @param Mobile Safari Switch
 * @text 移动 Safari 开关
 * @desc 此开关是否打开取决于是否在Mobile Safari浏览器上播放。
 * @default 0
 *
 * @param Non-Local Switch
 * @text 非局部开关
 * @desc 在手机或浏览器上播放时，此开关将始终打开，否则将始终关闭。
 * @default 0
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 这个插件允许你在特定情况下打开或者关闭开关。
 * 这些情况是可以帮我们更方便的来设定比较不常用的设定。
 * 例如判断游戏是否运行在调试模式或者在移动设备上允许。
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_AutoSwitches');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.AutoSwitches = {
  battle: Number(Yanfly.Parameters['Battle Switch']),
  btest: Number(Yanfly.Parameters['Battle Test Switch']),
  dash: Number(Yanfly.Parameters['Dash Switch']),
  debug: Number(Yanfly.Parameters['Debug Switch']),
  mobile: Number(Yanfly.Parameters['Mobile Switch']),
  mobileChrome: Number(Yanfly.Parameters['Mobile Chrome Switch']),
  mobileSafari: Number(Yanfly.Parameters['Mobile Safari Switch']),
  nonLocal: Number(Yanfly.Parameters['Non-Local Switch'])
};

//=============================================================================
// Utils
//=============================================================================

Utils.isMobileChrome = function() {
    var agent = navigator.userAgent;
    return agent.match(/Chrome/);
};

//=============================================================================
// Game_Switches
//=============================================================================

Yanfly.AutoSwitch.Game_Switches_value = Game_Switches.prototype.value;
Game_Switches.prototype.value = function(switchId) {
  if (switchId === Yanfly.Param.AutoSwitches.battle) {
    return this.battleAutoSwitch();
  } else if (switchId === Yanfly.Param.AutoSwitches.btest) {
    return this.dashAutoSwitch();
  } else if (switchId === Yanfly.Param.AutoSwitches.dash) {
    return this.dashAutoSwitch();
  } else if (switchId === Yanfly.Param.AutoSwitches.debug) {
    return this.debugAutoSwitch();
  } else if (switchId === Yanfly.Param.AutoSwitches.mobile) {
    return this.mobileAutoSwitch();
  } else if (switchId === Yanfly.Param.AutoSwitches.mobileChrome) {
    return this.mobileChromeAutoSwitch();
  } else if (switchId === Yanfly.Param.AutoSwitches.mobileSafari) {
    return this.mobileSafariAutoSwitch();
  } else if (switchId === Yanfly.Param.AutoSwitches.nonLocal) {
    return this.nonLocalAutoSwitch();
  } else {
    return Yanfly.AutoSwitch.Game_Switches_value.call(this, switchId);
  }
};

Game_Switches.prototype.battleAutoSwitch = function() {
  return $gameParty.inBattle();
};

Game_Switches.prototype.battleTestAutoSwitch = function() {
  return BattleManager.isBattleTest();
};

Game_Switches.prototype.dashAutoSwitch = function() {
  return $gamePlayer.isDashing();
};

Game_Switches.prototype.debugAutoSwitch = function() {
  return Utils.isNwjs() && Utils.isOptionValid('test');
};

Game_Switches.prototype.mobileAutoSwitch = function() {
  return Utils.isMobileDevice();
};

Game_Switches.prototype.mobileChromeAutoSwitch = function() {
  return Utils.isMobileChrome();
};

Game_Switches.prototype.mobileSafariAutoSwitch = function() {
  return Utils.isMobileSafari();
};

Game_Switches.prototype.nonLocalAutoSwitch = function() {
  return !Utils.isNwjs();
};

//=============================================================================
// End of File
//=============================================================================
