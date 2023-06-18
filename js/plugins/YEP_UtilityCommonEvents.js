//=============================================================================
// Yanfly Engine Plugins - Utility Common Events
// YEP_UtilityCommonEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_UtilityCommonEvents = true;

var Yanfly = Yanfly || {};
Yanfly.UCE = Yanfly.UCE || {};
Yanfly.UCE.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 实用公共事件(已翻译)
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @text 常规
 * @default
 *
 * @param Load Game Event
 * @text 加载游戏时运行
 * @parent ---General---
 * @type common_event
 * @default 0
 *
 * @param Battle Won Event
 * @text 战斗胜利时运行
 * @parent ---General---
 * @type common_event
 * @default 0
 *
 * @param Escape Battle Event
 * @text 战斗逃跑时运行
 * @parent ---General---
 * @type common_event
 * @default 0
 *
 * @param Close Menu Event
 * @text 关闭主菜单运行
 * @parent ---General---
 * @type common_event
 * @default 0

 * @param ---Vehicles---
 * @text 载具
 * @default
 *
 * @param Boat Enter Event
 * @text 进入小舟时运行
 * @parent ---Vehicles---
 * @type common_event
 * @default 0
 *
 * @param Boat Exit Event
 * @text 离开小舟时运行
 * @parent ---Vehicles---
 * @type common_event
 * @default 0
 *
 * @param Ship Enter Event
 * @text 进入大船时运行
 * @parent ---Vehicles---
 * @type common_event
 * @default 0
 *
 * @param Ship Exit Event
 * @text 离开大船时运行
 * @parent ---Vehicles---
 * @type common_event
 * @default 0
 *
 * @param Airship Enter Event
 * @text 进入飞艇时运行
 * @parent ---Vehicles---
 * @type common_event
 * @default 0
 *
 * @param Airship Exit Event
 * @text 退出飞艇时运行
 * @parent ---Vehicles---
 * @type common_event
 * @default 0
 *
 * @help
 * 插件更新:yanfly.moe/plugins/en/YEP_UtilityCommonEvents.js
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_UtilityCommonEvents');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.UtilCommonEvents = {
  load: Number(Yanfly.Parameters['Load Game Event']) || 0,
  battleWon: Number(Yanfly.Parameters['Battle Won Event']) || 0,
  battleEscape: Number(Yanfly.Parameters['Battle Escape Event']) || 0,
  closeMenu: Number(Yanfly.Parameters['Close Menu Event']) || 0,

  boatEnter: Number(Yanfly.Parameters['Boat Enter Event']) || 0,
  boatExit: Number(Yanfly.Parameters['Boat Exit Event']) || 0,
  shipEnter: Number(Yanfly.Parameters['Ship Enter Event']) || 0,
  shipExit: Number(Yanfly.Parameters['Ship Exit Event']) || 0,
  airshipEnter: Number(Yanfly.Parameters['Airship Enter Event']) || 0,
  airshipExit: Number(Yanfly.Parameters['Airship Exit Event']) || 0,
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.UCE.DataManager_loadGame = DataManager.loadGame;
DataManager.loadGame = function(savefileId) {
  var flag = Yanfly.UCE.DataManager_loadGame.call(this, savefileId);
  if (flag && Yanfly.Param.UtilCommonEvents['load'] > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.UtilCommonEvents['load']);
  }
  return flag;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.UCE.Game_System_onBattleWin = Game_System.prototype.onBattleWin;
Game_System.prototype.onBattleWin = function() {
  Yanfly.UCE.Game_System_onBattleWin.call(this);
  if (Yanfly.Param.UtilCommonEvents['battleWon'] > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.UtilCommonEvents['battleWon']);
  }
};

Yanfly.UCE.Game_System_onBattleEscape = Game_System.prototype.onBattleEscape;
Game_System.prototype.onBattleEscape = function() {
  Yanfly.UCE.Game_System_onBattleEscape.call(this);
  if (Yanfly.Param.UtilCommonEvents['battleEscape'] > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.UtilCommonEvents['battleEscape']);
  }
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.UCE.Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
Game_Player.prototype.getOnVehicle = function() {
  var success = Yanfly.UCE.Game_Player_getOnVehicle.call(this);
  if (success) {
    var events = Yanfly.Param.UtilCommonEvents;
    if (this._vehicleType === 'airship' && events.airshipEnter > 0) {
      $gameTemp.reserveCommonEvent(events.airshipEnter);
    } else if (this._vehicleType === 'ship' && events.shipEnter > 0) {
      $gameTemp.reserveCommonEvent(events.shipEnter);
    } else if (this._vehicleType === 'boat' && events.boatEnter > 0) {
      $gameTemp.reserveCommonEvent(events.boatEnter);
    }
  }
  return success;
};

Yanfly.UCE.Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
Game_Player.prototype.getOffVehicle = function() {
  var success = Yanfly.UCE.Game_Player_getOffVehicle.call(this);
  if (success) {
    var events = Yanfly.Param.UtilCommonEvents;
    if (this._vehicleType === 'airship' && events.airshipExit > 0) {
      $gameTemp.reserveCommonEvent(events.airshipExit);
    } else if (this._vehicleType === 'ship' && events.shipExit > 0) {
      $gameTemp.reserveCommonEvent(events.shipExit);
    } else if (this._vehicleType === 'boat' && events.boatExit > 0) {
      $gameTemp.reserveCommonEvent(events.boatExit);
    }
  }
  return success;
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.UCE.Scene_Menu_createCommandWindow =
  Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
  Yanfly.UCE.Scene_Menu_createCommandWindow.call(this);
  this._commandWindow.setHandler('cancel', this.closeMainMenu.bind(this));
};

Scene_Menu.prototype.closeMainMenu = function() {
  this.popScene();
  if (Yanfly.Param.UtilCommonEvents['closeMenu'] > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.UtilCommonEvents['closeMenu']);
  }
};

//=============================================================================
// End of File
//=============================================================================