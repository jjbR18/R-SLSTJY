//=============================================================================
// Yanfly Engine Plugins - Battle System - Standard Turn Battle
// YEP_X_BattleSysSTB.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_BattleSysSTB = true;

var Yanfly = Yanfly || {};
Yanfly.STB = Yanfly.STB || {};
Yanfly.STB.version = 1.03;

//=============================================================================
 /*:
 * @plugindesc v1.03 标准回合制战斗系统☁️
 * @author Yanfly Engine Plugins
 *
 * @param ---全局---
 * @default
 *
 * @param Action Speed
 * @text 动作速度
 * @parent ---General---
 * @desc This is the formula used for an action's base speed.
 * Default: agi + Math.randomInt(Math.floor(5 + agi / 4))
 * @default agi
 *
 * @param Delay Status Adjust
 * @text 延迟状态调整
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Delay the time it takes for the Status Window to move towards
 * the center. YES - true     NO - false
 * @default true
 *
 * @param ---逃跑---
 * @default
 *
 * @param Escape Ratio
 * @text 逃跑率
 * @parent ---Escape---
 * @desc How STB calculates escape ratios.
 * Default: 0.5 * $gameParty.agility() / $gameTroop.agility()
 * @default 0.125 * $gameParty.agility() / $gameTroop.agility()
 *
 * @param Fail Escape Boost
 * @text 失败+逃跑率
 * @parent ---Escape---
 * @desc Each time the player fails escape, increase the success
 * rate by this much. Default: 0.1
 * @default 0.025
 *
 * @param ---转弯顺序---
 * @default
 *
 * @param Show Turn Window
 * @text 显示转弯窗口
 * @parent ---Turn Order---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the turn order window?
 * YES - true     NO - false
 * @default false
 *
 * @param Turn Window X
 * @parent ---Turn Order---
 * @desc The turn order window's x position.
 * You can use a formula.
 * @default Graphics.boxWidth - width
 *
 * @param Turn Window Y
 * @parent ---Turn Order---
 * @desc The turn order window's y position.
 * You can use a formula.
 * @default this.fittingHeight(2)
 *
 * @param Turn Window Width
 * @parent ---Turn Order---
 * @desc The turn order window's width.
 * You can use a formula.
 * @default 200
 *
 * @param Turn Window Height
 * @parent ---Turn Order---
 * @desc The turn order window's height.
 * You can use a formula.
 * @default Graphics.boxHeight - statusHeight - this.fittingHeight(2)
 *
 * @param Current Battler Color
 * @text 当前战场颜色
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @max 31
 * @desc The text color used for the current battler.
 * @default 6
 *
 * @param Actor Battler Color
 * @text 角色战斗颜色
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @max 31
 * @desc The text color used for the actors.
 * @default 4
 *
 * @param Enemy Battler Color
 * @text 敌人战斗颜色
 * @parent ---Turn Order---
 * @type number
 * @min 0
 * @max 31
 * @desc The text color used for the enemies.
 * @default 2
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要YEP\u BattleEngineCore。确保此插件位于插件列表中
 *的YEP\u BattleEngineCore下。
 * 
 * 要使用STB系统，请转到Battle Engine核心插件，并将参数中的“默认系统”
 *设置更改为“STB”。
 * 
 * 标准转弯作战系统的功能与默认转弯作战系统的结构无关。
 * 行动顺序由战斗员的AGI值决定，它们从最高到最低。
 * 但是，在回合开始时不会选择动作。相反，当每个战斗者的回合出现时，
 * 回合进行，动作被选择，然后立即执行。
 * 
 * 每个战斗员每个战斗回合只能有一个动作，这意味着一个战斗员的回合数不能
 * 是另一个战斗员的两倍，即使该战斗员的敏捷值是另一个战斗员的两倍。这是
 * 为了防止任何来自滴答声作战系统的平衡问题，
 * 因为它们往往比回合作战系统更难平衡。
 * 
 * 由于标准回合战斗系统的性质，在数据库中找到的物品或技能的行动速度值将
 * 被禁用，因为它不能在回合顺序中推进战斗者的行动速度值。
 * 
 *  ============================================================================
 * 插件命令
 *  ============================================================================
 * 
 * 要将您的战斗系统更改为标准回合战斗（如果不是默认的战斗系统），
 *您可以使用以下插件命令：
 *
 * Plugin Command:
 *   setBattleSys STB      将战斗系统设置为标准回合战斗。
 *   setBattleSys DTB      将战斗系统设置为默认回合战斗。
 *
 * 使用上面的插件命令，你可以在默认的战斗系统和标准的回合战斗之间切换！
 *
 * ============================================================================
 * 便签
 * ============================================================================
 *
 * 以下是与机顶盒系统相关并影响机顶盒系统的注释标签。
 *
 * 技能和物品标签：
 *
 *   <STB Help>
 *    text
 *    text
 *   </STB Help>
 * 对于那些计划使用多个作战系统的人来说，有时在使用STB时，
 * 你的技能表现可能会有所不同。
 * 如果是这样，在启用STB时，使用此notetag将允许技能和项目
 *显示不同的帮助文本。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.02:
 * - Instant Cast compatibility update.
 *
 * Version 1.01:
 * - Fixed a bug that caused escaping to crash the game if not using STB.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {
if (Yanfly.BEC.version && Yanfly.BEC.version >= 1.42) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_BattleSysSTB');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.STBActionSpeed = String(Yanfly.Parameters['Action Speed']);
Yanfly.Param.STBDelayStatus = String(Yanfly.Parameters['Delay Status Adjust']);
Yanfly.Param.STBDelayStatus = eval(Yanfly.Param.STBDelayStatus);

Yanfly.Param.STBEscapeRatio = String(Yanfly.Parameters['Escape Ratio']);
Yanfly.Param.STBEscapeBoost = String(Yanfly.Parameters['Fail Escape Boost']);

Yanfly.Param.STBShowWindow = String(Yanfly.Parameters['Show Turn Window']);
Yanfly.Param.STBShowWindow = eval(Yanfly.Param.STBShowWindow);
Yanfly.Param.STBWindowX = String(Yanfly.Parameters['Turn Window X']);
Yanfly.Param.STBWindowY = String(Yanfly.Parameters['Turn Window Y']);
Yanfly.Param.STBWindowW = String(Yanfly.Parameters['Turn Window Width']);
Yanfly.Param.STBWindowH = String(Yanfly.Parameters['Turn Window Height']);
Yanfly.Param.STBWinSubject = Number(Yanfly.Parameters['Current Battler Color']);
Yanfly.Param.STBWinActor = Number(Yanfly.Parameters['Actor Battler Color']);
Yanfly.Param.STBWinEnemy = Number(Yanfly.Parameters['Enemy Battler Color']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.STB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.STB.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_BattleSysSTB) {
    this.processSTBNotetags1($dataSkills);
    this.processSTBNotetags1($dataItems);
    Yanfly._loaded_YEP_X_BattleSysSTB = true;
  }
  
  return true;
};

DataManager.processSTBNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var evalMode = 'none';
    obj.stbHelp = undefined;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:STB HELP)>/i)) {
        evalMode = 'stb help';
        obj.stbHelp = '';
      } else if (line.match(/<\/(?:STB HELP)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'stb help') {
        obj.stbHelp += line + '\n';
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

BattleManager.isSTB = function() {
  return this.isBattleSystem('stb');
};

Yanfly.STB.BattleManager_isTurnBased = BattleManager.isTurnBased;
BattleManager.isTurnBased = function() {
  if (this.isSTB()) return true;
  return Yanfly.STB.BattleManager_isTurnBased.call(this);
};

Yanfly.STB.BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
  if (this.isSTB()) {
    var code = Yanfly.Param.STBEscapeRatio;
    try {
      this._escapeRatio = eval(code);
    } catch (e) {
      this._escapeRatio = 0;
      Yanfly.Util.displayError(e, code, 'STB ESCAPE RATIO ERROR');
    }
    var code = Yanfly.Param.STBEscapeBoost;
    try {
      this._escapeFailBoost = eval(code);
    } catch (e) {
      this._escapeFailBoost = 0;
      Yanfly.Util.displayError(e, code, 'STB ESCAPE BOOST ERROR');
    }
  } else {
    this._escapeFailBoost = 0.1;
    Yanfly.STB.BattleManager_makeEscapeRatio.call(this);
  }
};

Yanfly.STB.BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
  Yanfly.STB.BattleManager_startInput.call(this);
  if (this.isSTB() && this._phase !== 'turn') this.startTurn();
};

Yanfly.STB.BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
  if (this._stbFailedEscape) {
    this.stbFailedEscape();
  } else {
    Yanfly.STB.BattleManager_startTurn.call(this);
  }
};

BattleManager.stbFailedEscape = function() {
  this._stbFailedEscape = false;
  $gameParty.requestMotionRefresh();
};

Yanfly.STB.BattleManager_processTurn = BattleManager.processTurn;
BattleManager.processTurn = function() {
  var subject = this._subject;
  SceneManager._scene.refreshSTBTurnOrderWindow();
  if (this.isSTB() && subject.isActor()) {
    this.startSTBInput();
  } else {
    Yanfly.STB.BattleManager_processTurn.call(this);
  }
};

BattleManager.startSTBInput = function() {
  this._phase = 'input';
  var battler = this._subject;
  BattleManager.changeActor(battler.index(), 'undecided');
  if (!battler.canInput()) {
    battler.makeActions();
    this.startAction();
  }
};

Yanfly.STB.BattleManager_selectPreviousCommand =
  BattleManager.selectPreviousCommand;
BattleManager.selectPreviousCommand = function() {
  if (this.isSTB()) {
    this._activeSTBActor = this._actorIndex;
    this._subject = null;
    this.changeActor(-1, 'undecided');
  } else {
    Yanfly.STB.BattleManager_selectPreviousCommand.call(this);
  }
};

Yanfly.STB.BattleManager_displayEscapeFailureMessage =
  BattleManager.displayEscapeFailureMessage;
BattleManager.displayEscapeFailureMessage = function() {
  Yanfly.STB.BattleManager_displayEscapeFailureMessage.call(this);
  if (this.isSTB()) {
    this.endAction();
    this._stbFailedEscape = true;
  }
};

BattleManager.stbSetSubject = function() {
  BattleManager.changeActor(this._activeSTBActor, 'undecided');
  this._subject = this.actor();
};

Yanfly.STB.BattleManager_selectNextCommand = BattleManager.selectNextCommand;
BattleManager.selectNextCommand = function() {
  if (this.isSTB()) {
    if (this._subject) {
      this.startAction();
    } else {
      this.stbSetSubject();
      this.startSTBInput();
    }
  } else {
    Yanfly.STB.BattleManager_selectNextCommand.call(this);
  }
};

Yanfly.STB.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
  if (Imported.YEP_InstantCast) this.detectStbInstantCast();
  Yanfly.STB.BattleManager_startAction.call(this);
};

Yanfly.STB.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
  if (this.isSTB()) {
    this.endSTBAction();
  } else {
    Yanfly.STB.BattleManager_endAction.call(this);
  }
};

BattleManager.endSTBAction = function() {
  this._phase = 'turn';
  if (this._stbInstantCast) {
    this._stbInstantCast = false;
    return Yanfly.BEC.BattleManager_endAction.call(this);
  }
  if (this._subject) {
    this._performedBattlers.push(this._subject);
    this._subject.spriteStepBack();
    this._subject.onAllActionsEnd();
    this._subject.removeCurrentAction();
  }
  if (this._processingForcedAction) {
    this._phase = this._preForcePhase;
  }
  if (this.loadPreForceActionSettings()) return;
  this._subject = null;
  Yanfly.BEC.BattleManager_endAction.call(this);
};

BattleManager.detectStbInstantCast = function() {
  this._stbInstantCast = false;
  if (!this.isSTB()) return;
  if (!this._subject) return;
  if (!this._subject.currentAction()) return;
  if (!this._subject.currentAction().item()) return;
  var item = this._subject.currentAction().item();
  this._stbInstantCast = this._subject.isInstantCast(item);
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.STB.Game_Action_speed = Game_Action.prototype.speed;
Game_Action.prototype.speed = function() {
  if (BattleManager.isSTB()) {
    var user = this.subject(); var a = user;
    var maxhp = user.mhp; var mhp = user.mhp; var hp = user.hp;
    var maxmp = user.mmp; var mmp = user.mmp; var mp = user.mp;
    var maxtp = user.maxTp(); var mtp = user.maxTp(); var tp = user.tp;
    var atk = user.atk; var def = user.def; var mat = user.mat;
    var int = user.mat; var mdf = user.mdf; var res = user.res;
    var agi = user.agi; var luk = user.luk;
    var code = Yanfly.Param.STBActionSpeed;
    try {
      var speed = eval(code);
    } catch (e) {
      var speed = agi;
      Yanfly.Util.displayError(e, code, 'STB ACTION SPEED FORMULA ERROR');
    }
    return speed;
  } else {
    return Yanfly.STB.Game_Action_speed.call(this);
  }
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.STB.Scene_Battle_createHelpWindow =
  Scene_Battle.prototype.createHelpWindow;
Scene_Battle.prototype.createHelpWindow = function() {
  if (BattleManager.isSTB()) this.createSTBTurnOrderWindow();
  Yanfly.STB.Scene_Battle_createHelpWindow.call(this);
};

Scene_Battle.prototype.createSTBTurnOrderWindow = function() {
  if (!Yanfly.Param.STBShowWindow) return;
  var statusWindow = this._statusWindow;
  this._stbTurnOrderWindow = new Window_STB_TurnOrder(statusWindow);
  this.addWindow(this._stbTurnOrderWindow);
};

Scene_Battle.prototype.refreshSTBTurnOrderWindow = function() {
  if (!this._stbTurnOrderWindow) return;
  this._stbTurnOrderWindow.refresh();
};

Yanfly.STB.Scene_Battle_commandFight = Scene_Battle.prototype.commandFight;
Scene_Battle.prototype.commandFight = function() {
  if (BattleManager.isSTB()) {
    BattleManager.stbSetSubject();
    BattleManager.startSTBInput();
  } else {
    Yanfly.STB.Scene_Battle_commandFight.call(this);
  }
};

Yanfly.STB.Scene_Battle_commandEscape = Scene_Battle.prototype.commandEscape;
Scene_Battle.prototype.commandEscape = function() {
  if (BattleManager.isSTB()) {
    BattleManager.processEscape();
  } else {
    Yanfly.STB.Scene_Battle_commandEscape.call(this);
  }
};

if (Yanfly.Param.STBDelayStatus) {

Yanfly.STB.Scene_Battle_updateWindowPositions =
    Scene_Battle.prototype.updateWindowPositions;
Scene_Battle.prototype.updateWindowPositions = function() {
    if (BattleManager.isSTB()) return this.updateWindowPositionsSTB();
    Yanfly.STB.Scene_Battle_updateWindowPositions.call(this);
};

Scene_Battle.prototype.updateWindowPositionsSTB = function() {
  if (this._STBWindowPosCount === undefined) this._STBWindowPosCount = 0;
  if (this._partyCommandWindow.active) {
    this._STBWindowPosCount = 16;
    var statusX = 0;
    statusX = this._partyCommandWindow.width;
    if (this._statusWindow.x < statusX) {
      this._statusWindow.x += 16;
      if (this._statusWindow.x > statusX) this._statusWindow.x = statusX;
    }
    if (this._statusWindow.x > statusX) {
      this._statusWindow.x -= 16;
      if (this._statusWindow.x < statusX) this._statusWindow.x = statusX;
    }
  } else if (this._actorCommandWindow.active) {
    this._STBWindowPosCount = 16;
    Yanfly.STB.Scene_Battle_updateWindowPositions.call(this);
  } else {
    if (--this._STBWindowPosCount > 0) return;
    Yanfly.STB.Scene_Battle_updateWindowPositions.call(this);
  }
};

}; // Yanfly.Param.STBDelayStatus

//=============================================================================
// Window_Help
//=============================================================================

Yanfly.STB.Window_Help_setItem = Window_Help.prototype.setItem;
Window_Help.prototype.setItem = function(item) {
    if (this.meetSTBConditions(item)) return this.setText(item.stbHelp);
    Yanfly.STB.Window_Help_setItem.call(this, item);
};

Window_Help.prototype.meetSTBConditions = function(item) {
    if (!item) return false;
    if (!BattleManager.isSTB()) return false;
    return item.stbHelp !== undefined;
};

//=============================================================================
// Window_STB_TurnOrder
//=============================================================================

function Window_STB_TurnOrder() {
  this.initialize.apply(this, arguments);
}

Window_STB_TurnOrder.prototype = Object.create(Window_Base.prototype);
Window_STB_TurnOrder.prototype.constructor = Window_STB_TurnOrder;

Window_STB_TurnOrder.prototype.initialize = function(statusWindow) {
  if (statusWindow) {
    var statusHeight = statusWindow.height;
  } else {
    statusHeight = this.fittingHeight(4);
  }
  var code = Yanfly.Param.STBWindowW;
  try {
    var width = eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'STB TURN ORDER WINDOW WIDTH ERROR');
    var width = 200;
  }
  var code = Yanfly.Param.STBWindowH;
  try {
    var height = eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'STB TURN ORDER WINDOW HEIGHT ERROR');
    var height = Graphics.boxHeight - statusHeight - this.fittingHeight(2);
  }
  var code = Yanfly.Param.STBWindowX;
  try {
    var x = eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'STB TURN ORDER WINDOW X ERROR');
    var x = Graphics.boxWidth - width;
  }
  var code = Yanfly.Param.STBWindowY;
  try {
    var y = eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'STB TURN ORDER WINDOW Y ERROR');
    var y = this.fittingHeight(2);
  }
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  this.opacity = 0;
  this.refresh();
};

Window_STB_TurnOrder.prototype.refresh = function() {
  this.getTurnOrderData();
  this.drawTurnOrders();
};

Window_STB_TurnOrder.prototype.getTurnOrderData = function() {
  if (!BattleManager._actionBattlers) return;
  if (!BattleManager._performedBattlers) return;
  var array = BattleManager._actionBattlers;
  this._actionBattlers = array.filter(Yanfly.Util.onlyUnique);
  array = BattleManager._performedBattlers;
  this._performedBattlers = array.filter(Yanfly.Util.onlyUnique);
};

Window_STB_TurnOrder.prototype.drawTurnOrders = function() {
  if (!this._actionBattlers) return;
  if (!this._performedBattlers) return;
  this.contents.clear();
  var dy = 0;
  dy = this.drawPerformedActors(dy);
  dy = this.drawSubject(dy);
  dy = this.drawActionActors(dy);
};

Window_STB_TurnOrder.prototype.drawPerformedActors = function(dy) {
  var dx = this.textPadding();
  var dw = this.contents.width - this.textPadding() * 2;
  this.resetFontSettings();
  this.changePaintOpacity(false);
  var array = this._performedBattlers;
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var battler = array[i];
    if (!battler) continue;
    if (battler.isDead()) continue;
    if (battler === BattleManager._subject) continue;
    if (battler.isActor()) {
      this.changeTextColor(this.textColor(Yanfly.Param.STBWinActor));
    } else {
      this.changeTextColor(this.textColor(Yanfly.Param.STBWinEnemy));
    }
    var text = this.getBattlerName(battler);
    this.drawText(text, dx, dy, dw);
    dy += this.lineHeight();
  }
  return dy;
};

Window_STB_TurnOrder.prototype.drawSubject = function(dy) {
  if (!BattleManager._subject) return dy;
  if (BattleManager._subject.isDead()) return dy;
  var dx = this.textPadding();
  var dw = this.contents.width - this.textPadding() * 2;
  this.resetFontSettings();
  this.changePaintOpacity(true);
  this.changeTextColor(this.textColor(Yanfly.Param.STBWinSubject));
  var battler = BattleManager._subject;
  var text = this.getBattlerName(battler);
  this.drawText(text, dx, dy, dw);
  dy += this.lineHeight();
  return dy;
};

Window_STB_TurnOrder.prototype.drawActionActors = function(dy) {
  var dx = this.textPadding();
  var dw = this.contents.width - this.textPadding() * 2;
  this.resetFontSettings();
  this.changePaintOpacity(true);
  var array = this._actionBattlers;
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    var battler = array[i];
    if (!battler) continue;
    if (battler.isDead()) continue;
    if (battler === BattleManager._subject) continue;
    if (this._performedBattlers.contains(battler)) continue;
    if (battler.isActor()) {
      this.changeTextColor(this.textColor(Yanfly.Param.STBWinActor));
    } else {
      this.changeTextColor(this.textColor(Yanfly.Param.STBWinEnemy));
    }
    var text = this.getBattlerName(battler);
    this.drawText(text, dx, dy, dw);
    dy += this.lineHeight();
  }
  return dy;
};

Window_STB_TurnOrder.prototype.getBattlerName = function(battler) {
  if (Imported.YEP_EnemyLevels && battler.isEnemy()) {
    var text = Yanfly.ELV.Game_Enemy_name.call(battler);
  } else {
    var text = battler.name();
  }
  return text;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

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

Yanfly.Util.onlyUnique = function(value, index, self) {
  return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
} else { // Yanfly.BEC.version

var text = '================================================================\n';
text += 'YEP_X_BattleSysSTB requires YEP_BattleEngineCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_BattleEngineCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // Yanfly.BEC.version
}; // YEP_BattleEngineCore