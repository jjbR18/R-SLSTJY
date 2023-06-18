//=============================================================================
// Yanfly Engine Plugins - Lunatic Pack - Action Beginning and End Effects
// YEP_Z_ActionBeginEnd.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Z_ActionBeginEnd = true;

var Yanfly = Yanfly || {};
Yanfly.LunActBegEnd = Yanfly.LunActBegEnd || {};
Yanfly.LunActBegEnd.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 行动效果增强☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 *导言
 *  ============================================================================
 * 
 * 此插件需要以下插件：
 * -战斗引擎核心
 * 
 * 将此插件放在插件管理器中上述插件的下面。
 * 
 * 有时，我们想在战斗中增加额外的效果。
 * 这些效果包括增加更多的血量，对系统应用新的状态
 * 用户在所有其他事情发生后，移除减益，播放
 * 动画，甚至直接吸收全部伤害的一小部分
 * 由本回合的行动处理。这个疯子包提供了一批新的
 * 你可以用来增强你的物品和技能，甚至
 * 国家的全球化。
 * 
 *  * 注 * ：此插件最好与RPG Maker MV版本1.5.0+一起使用。你可以
 * 仍然使用这个版本号较低的插件，但你会有很多
 * 没有它就很难改变插件参数。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 在技能、项目或状态的记事本框中插入以下记事本
 * 它会产生以下影响之一：
 * 
 *  ---
 * 
 * 技能、项目和状态标签：
 *
 *   <timing Action: effect>
 * - 此插件的大部分NoteTag将遵循上述格式。”“计时”将替换为“开始”或“结束”，
 * 而“效果”将替换为以下效果部分中的条目。 
 * 
 * 插入多个notetag条目以使您的技能/项目获得更多效果。如果存在多种效果，那么它们
 * 出现的顺序将是：技能/物品优先，
 * 根据状态优先级从最高优先级到最低优先级的顺序来设置状态效果。
 *
 * =-=-=-= Action TIMING =-=-=-=
 *
 *   <Begin Action: effect>
 * - 如果计时为“开始”，则此效果将在使用操作成本后发生。
 *
 *   <End Action: effect>
 * - 如果计时为“结束”，则将在当前操作结束时完成所有操作序列后发生。
 *
 * =-=-=-= Action EFFECTS =-=-=-=
 *
 *   --- Animation Effects ---
 *
 *   <timing Action: Animation x>
 *   <timing Action: Animation x, Mirror>
 *   <timing Action: Animation x, Delay y>
 *   <timing Action: Animation x, Mirror, Delay y>
 * - 这将使动画x在执行动作的用户上播放。
 * 如果将“镜像”插入效果线，则动画将被镜像。如果插入“Delay y”
 * 并用数值替换“y”，则在播放动画之前，动画将延迟y帧。
 * 建议：Yanfly
 *
 *   --- HP Effects ---
 *
 *   <timing Action: +x HP>
 *   <timing Action: -x HP>
 * - 将“效果”替换为上述格式。将“x”替换为您希望应用于用户的固定HP值。
 *   建议：Yanfly
 *
 *   <timing Action: +x HP%>
 *   <timing Action: -x HP%>
 * - 将“效果”替换为上述格式。将“x”替换为等于用户MaxHP的x%的HP以应用于用户。
 *   建议：Yanfly
 *
 *   <End Action: Drain x% Total HP Damage>
 * - 只能与结束操作一起使用。使用上述格式。将“x”替换为该用户通过
 * 此操作直接造成的所有总生命伤害的百分比，以恢复为生命值。
 *   建议：Yanfly
 *
 *   <End Action: Recoil x% Total HP Damage>
 * - 只能与结束操作一起使用。使用上述格式。将“x”替换为用户直接造成的
 * 所有总生命伤害的百分比，此操作将自动造成生命伤害。
 *   建议：Yanfly
 *
 *   --- MP Effects ---
 *
 *   <timing Action: +x MP>
 *   <timing Action: -x MP>
 * - 将“效果”替换为上述格式。将“x”替换为要应用于用户的统一MP量。
 *   建议：Yanfly
 *
 *   <timing Action: +x MP%>
 *   <timing Action: -x MP%>
 * - 将“效果”替换为上述格式。将“x”替换为等于要应用于用户的MaxMP的x%的MP。
 *   建议：Yanfly
 *
 *   <End Action: Drain x% Total MP Damage>
 * - 只能与结束操作一起使用。使用上述格式。将“x”替换为用户直接造成的
 * 所有MP伤害的百分比，此操作将恢复为MP。
 *   建议：Yanfly
 *
 *   <End Action: Recoil x% Total MP Damage>
 * - 只能与结束操作一起使用。使用上述格式。将“x”替换为用户直接造成的
 * 所有MP伤害的百分比，此操作将自动造成MP伤害。
 *   建议：Yanfly
 *
 *   --- TP Effects ---
 *
 *   <timing Action: +x TP>
 *   <timing Action: -x TP>
 * - 将“效果”替换为上述格式。将“x”替换为您希望应用于用户的固定HP值。
 *   建议：Yanfly
 *
 *   <timing Action: +x TP%>
 *   <timing Action: -x TP%>
 * - 将“效果”替换为上述格式。将“x”替换为等于用户MaxTP的x%的TP以应用于用户。
 *   建议：Yanfly
 *
 *   --- Buff/Debuff Effects ---
 *
 *   <timing Action: Add x Buff>
 *   <timing Action: Add x Buff, y Turns>
 *   <timing Action: Add x Debuff>
 *   <timing Action: Add x Debuff, y Turns>
 * - 将“效果”替换为上述格式。将“x”替换为以下任何参数：“MaxHP”、
 * “MaxMP”、“ATK”、“DEF”、“MAT”、“MDF”、“AGI”或“LUK”，
 * 以改变相应的状态。如果使用带有“y”回合的格式，
 * 则将“y”替换为希望buff或减益持续的回合数。如果不使用“y”，它将持续5圈。
 *   建议：Yanfly
 *
 *   <timing Action: Remove x Buff>
 *   <timing Action: Remove x Debuff>
 * - 将“效果”替换为上述格式。将“x”替换为以下任何参数：“MaxHP”、
 * “MaxMP”、“ATK”、“DEF”、“MAT”、“MDF”、“AGI”或“LUK”，
 * 以便在满足条件时从用户中移除相应的buff/debuff。如果不使用“y”，它将持续5圈。
 *   建议：Yanfly
 *
 *   --- State Effects ---
 *
 *   <timing Action: Add State x>
 * - 将“效果”替换为上述格式。将“x”替换为要添加到用户的状态ID。
 *   建议：Yanfly
 *
 *   <timing Action: Remove State x>
 * - 将“效果”替换为上述格式。将“x”替换为要从用户中删除的状态ID。
 *   建议：Yanfly
 *
 * ============================================================================
 * 疯狂模式-效果代码
 * ============================================================================
 *
 * For experienced users that know JavaScript and have RPG Maker MV 1.5.0+, you
 * can add new notetag effects that can be used by the plugin or alter the
 * effects of currently existing notetag effects from the plugin parameters
 * entry: Effect Code. It should look something like this:
 *
 * ---
 *
 * // ---------
 * // Animation
 * // ---------
 * if (data.match(/ANIMATION[ ](\d+)/i)) {
 *   var animationId = parseInt(RegExp.$1);
 *   var mirror = data.match(/MIRROR/i);
 *   if (data.match(/DELAY[ ](\d+)/i)) {
 *     var delay = parseInt(RegExp.$1);
 *   } else {
 *     var delay = 0;
 *   }
 *   user.startAnimation(animationId, mirror, delay);
 *
 * ...
 *
 * // -------------------------------
 * // Add new effects above this line
 * // -------------------------------
 * } else {
 *   skip = true;
 * }
 *
 * ---
 *
 * Here's what each of the variables used in this code bit refer to:
 *
 *   --------------------   ---------------------------------------------------
 *   Variable:              Refers to:
 *   --------------------   ---------------------------------------------------
 *   item                   The item being used by this action
 *   skill                  The skill being used by this action
 *
 *   isItem                 Returns true if action is an item
 *   isSkill                Returns true if action is a skill
 *
 *   a                      Returns the action user
 *   user                   Returns the action user
 *   subject                Returns the action user
 *
 *   b                      Returns the action's current target
 *   target                 Returns the action's current target
 *
 *   s[x]                   Return switch x (true/false)
 *   v[x]                   Return variable x's current value
 *
 *   user._result           The current results for the user
 *   target._result         The current results for the target
 *   userPreviousResult     The results for the user before any changes
 *   targetPreviousResult   The results for the target before any changes
 *
 *   totalHpDamage          The total amount of HP damage dealt this action
 *   totalMpDamage          The total amount of MP damage dealt this action
 *
 *   skip                   Default: false. If true, popups
 *
 * ---
 *
 * If you need to revert the Effect Code back to its original state, delete the
 * plugin from your plugin manager list and then add it again. The code will be
 * back to default.
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
 * @param Effect Code
 * @text 效果代码
 * @type note
 * @desc 疯狂模式：这是用于每个notetag的代码
 * 效果。有关此处使用的变量，请参阅帮助文件。
 * @default "// ---------\n// Animation\n// ---------\nif (data.match(/ANIMATION[ ](\\d+)/i)) {\n  var animationId = parseInt(RegExp.$1);\n  var mirror = data.match(/MIRROR/i);\n  if (data.match(/DELAY[ ](\\d+)/i)) {\n    var delay = parseInt(RegExp.$1);\n  } else {\n    var delay = 0;\n  }\n  user.startAnimation(animationId, mirror, delay);\n\n// --------------\n// Flat Gain/Loss\n// --------------\n} else if (data.match(/([\\+\\-]\\d+)[ ]HP/i)) {\n  value = parseInt(RegExp.$1);\n  user.gainHp(value);\n\n} else if (data.match(/([\\+\\-]\\d+)[ ]MP/i)) {\n  value = parseInt(RegExp.$1);\n  user.gainMp(value);\n\n} else if (data.match(/([\\+\\-]\\d+)[ ]TP/i)) {\n  value = parseInt(RegExp.$1);\n  user.gainTp(value);\n\n// --------------------\n// Percentile Gain/Loss\n// --------------------\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]HP/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  value = Math.round(user.mhp * rate);\n  user.gainHp(value);\n\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]MP/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  value = Math.round(user.mmp * rate);\n  user.gainMp(value);\n\n} else if (data.match(/([\\+\\-]\\d+)([%％])[ ]TP/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  value = Math.round(user.maxTp() * rate);\n  user.gainTp(value);\n\n// ------------------------\n// Add/Remove Buffs/Debuffs\n// ------------------------\n} else if (data.match(/ADD[ ](.*)[ ]BUFF/i)) {\n  var str = String(RegExp.$1).toUpperCase();\n  var paramId = DataManager.getParamId(str);\n  if (data.match(/(\\d+)[ ]TURN/i)) {\n    var turns = parseInt(RegExp.$1);\n  } else {\n    var turns = 5;\n  }\n  if (paramId >= 0) {\n    user.addBuff(paramId, turns);\n  } else {\n    skip = true;\n  }\n\n} else if (data.match(/REMOVE[ ](.*)[ ](?:BUFF|DEBUFF)/i)) {\n  var str = String(RegExp.$1).toUpperCase();\n  var paramId = DataManager.getParamId(str);\n  if (paramId >= 0) {\n    user.removeBuff(paramId);\n  } else {\n    skip = true;\n  }\n\n// -----------------\n// Add/Remove States\n// -----------------\n} else if (data.match(/ADD STATE[ ](\\d+)/i)) {\n  var stateId = parseInt(RegExp.$1);\n  user.addState(stateId);\n\n} else if (data.match(/REMOVE STATE[ ](\\d+)/i)) {\n  var stateId = parseInt(RegExp.$1);\n  if (user.isStateAffected(stateId)) {\n    user.removeState(stateId);\n  } else {\n    skip = true;\n  }\n\n// ------------\n// Drain/Recoil\n// ------------\n} else if (data.match(/(\\d+)([%％])[ ]TOTAL HP[ ](?:DMG|DAMAGE)/i)) {\n  if (totalHpDamage !== 0) {\n    rate = parseFloat(RegExp.$1) * 0.01;\n    value = Math.round(totalHpDamage * rate);\n    if (data.match(/DRAIN/i)) {\n      user.gainHp(value);\n    } else if (data.match(/RECOIL/i)) {\n      user.gainHp(-value);\n    } else {\n      skip = true;\n    }\n  }\n\n} else if (data.match(/(\\d+)([%％])[ ]TOTAL MP[ ](?:DMG|DAMAGE)/i)) {\n  if (totalMpDamage !== 0) {\n    rate = parseFloat(RegExp.$1) * 0.01;\n    value = Math.round(totalMpDamage * rate);\n    if (data.match(/DRAIN/i)) {\n      user.gainMp(value);\n    } else if (data.match(/RECOIL/i)) {\n      user.gainMp(-value);\n    } else {\n      skip = true;\n    }\n  }\n\n// -------------------------------\n// Add new effects above this line\n// -------------------------------\n} else {\n  skip = true;\n}"
 *
 */
//=============================================================================

Yanfly.PluginRequirements = function() {
  return Imported.YEP_BattleEngineCore;
};

if (Yanfly.PluginRequirements()) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Z_ActionBeginEnd');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LunActBegEndEffect = JSON.parse(Yanfly.Parameters['Effect Code']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LunActBegEnd.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LunActBegEnd.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Z_ActionBeginEnd) {
    this.processLunActBegEndNotetags1($dataSkills);
    this.processLunActBegEndNotetags1($dataItems);
    this.processLunActBegEndNotetags1($dataStates);
    Yanfly._loaded_YEP_Z_ActionBeginEnd = true;
  }
  
  return true;
};

DataManager.processLunActBegEndNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.lunaticActionBegin = [];
    obj.lunaticActionEnd = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(.*)[ ](?:ACTION|ACTIONS):[ ](.*)>/i)) {
        var data1 = String(RegExp.$1);
        var data2 = String(RegExp.$2);
        if (data1.match(/BEGIN/i)) {
          obj.lunaticActionBegin.push(data2);
        } else if (data1.match(/END/i)) {
          obj.lunaticActionEnd.push(data2);
        }
      }
    }
  }
};

DataManager.getParamId = function(str) {
  switch (str.toUpperCase()) {
  case 'HP':
  case 'MAXHP':
  case 'MAX HP':
    return 0;
    break;
  case 'MP':
  case 'MAXMP':
  case 'MAX MP':
  case 'SP':
  case 'MAXSP':
  case 'MAX SP':
    return 1;
    break;
  case 'ATK':
  case 'STR':
    return 2;
    break;
  case 'DEF':
    return 3;
    break;
  case 'MAT':
  case 'INT':
  case 'SPI':
    return 4;
    break;
  case 'MDF':
  case 'RES':
    return 5;
    break;
  case 'AGI':
  case 'SPD':
    return 6;
    break;
  case 'LUK':
    return 7;
    break;
  default:
    return -1;
    break;
  }
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.clearLunaticActionValues = function() {
  this._totalHpDamage = 0;
  this._totalMpDamage = 0;
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.LunActBegEnd.Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
  Yanfly.LunActBegEnd.Game_Battler_useItem.call(this, item);
  $gameTemp.clearLunaticActionValues();
  this.processLunaticBeginEndAction('begin');
};

Yanfly.LunActBegEnd.Game_Battler_performActionEnd =
  Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
  this.processLunaticBeginEndAction('end');
  $gameTemp.clearLunaticActionValues();
  Yanfly.LunActBegEnd.Game_Battler_performActionEnd.call(this);
};

Game_Battler.prototype.processLunaticBeginEndAction = function(type) {
  if (!$gameParty.inBattle()) return;
  var action = BattleManager._action;
  if (!action) return;
  var item = action.item();
  if (!item) return;
  var effects = this.getLunaticBeginEndActionEffects(type, item);
  action.processLunaticBeginEndActions(effects);
};

Game_Battler.prototype.getLunaticBeginEndActionEffects = function(type, item) {
  var effects = [];
  var states = this.states();
  var length = states.length;
  if (type === 'begin') {
    effects = effects.concat(item.lunaticActionBegin);
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (state && state.lunaticActionBegin) {
        effects = effects.concat(state.lunaticActionBegin);
      }
    }
  } else if (type === 'end') {
    effects = effects.concat(item.lunaticActionEnd);
    for (var i = 0; i < length; ++i) {
      var state = states[i];
      if (state && state.lunaticActionEnd) {
        effects = effects.concat(state.lunaticActionEnd);
      }
    }
  }
  return effects;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.LunActBegEnd.Game_Action_executeHpDamage =
  Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
  $gameTemp._totalHpDamage += value;
  Yanfly.LunActBegEnd.Game_Action_executeHpDamage.call(this, target, value);
};

Yanfly.LunActBegEnd.Game_Action_executeMpDamage =
  Game_Action.prototype.executeMpDamage;
Game_Action.prototype.executeMpDamage = function(target, value) {
  $gameTemp._totalMpDamage += value;
  Yanfly.LunActBegEnd.Game_Action_executeMpDamage.call(this, target, value);
};

Yanfly.LunActBegEnd.apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
  Yanfly.LunActBegEnd.apply.call(this, target);
  if (target) $gameTemp._lastActionTarget = target;
};

Game_Action.prototype.processLunaticBeginEndActions = function(effects) {
  var length = effects.length;
  for (var i = 0; i < length; ++i) {
    var data = effects[i];
    this.processLunaticBeginEndActionEval(data);
  }
  $gameTemp._lastActionTarget = undefined;
};

Game_Action.prototype.processLunaticBeginEndActionEval = function(data) {
  var item = this.item();
  var skill = this.item();
  var isSkill = DataManager.isSkill(skill);
  var isItem = DataManager.isSkill(item);
  var user = this.subject();
  var a = user;
  var subject = user;
  var target = $gameTemp._lastActionTarget || user;
  var b = target;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;

  var totalHpDamage = $gameTemp._totalHpDamage;
  var totalMpDamage = $gameTemp._totalMpDamage;

  var userPreviousResult = JsonEx.makeDeepCopy(user._result);
  var targetPreviousResult = JsonEx.makeDeepCopy(target._result);
  var skip = false;
  var value = 0;
  var rate = 1;

  a.clearResult();
  b.clearResult();

  var code = Yanfly.Param.LunActBegEndEffect;
  try {
    eval(code)
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'LUNATIC ACTION BEGIN END ERROR');
  }

  if (skip) {
    if (user.isDead()) user.performCollapse();
    if (target.isDead()) target.performCollapse();
    user._result = userPreviousResult;
    target._result = targetPreviousResult;
    return;
  } else {
    if (user.result() && user.result().hpDamage !== 0) {
      user.startDamagePopup();
    } else if (user.result() && user.result().mpDamage !== 0) {
      user.startDamagePopup();
    }
  }

  if (user.isDead()) user.performCollapse();
  if (target.isDead()) target.performCollapse();
  user._result = userPreviousResult;
  target._result = targetPreviousResult;
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

//=============================================================================
// Default Effect Code
//=============================================================================

if (false) {

// ---------
// Animation
// ---------
if (data.match(/ANIMATION[ ](\d+)/i)) {
  var animationId = parseInt(RegExp.$1);
  var mirror = data.match(/MIRROR/i);
  if (data.match(/DELAY[ ](\d+)/i)) {
    var delay = parseInt(RegExp.$1);
  } else {
    var delay = 0;
  }
  user.startAnimation(animationId, mirror, delay);

// --------------
// Flat Gain/Loss
// --------------
} else if (data.match(/([\+\-]\d+)[ ]HP/i)) {
  value = parseInt(RegExp.$1);
  user.gainHp(value);

} else if (data.match(/([\+\-]\d+)[ ]MP/i)) {
  value = parseInt(RegExp.$1);
  user.gainMp(value);

} else if (data.match(/([\+\-]\d+)[ ]TP/i)) {
  value = parseInt(RegExp.$1);
  user.gainTp(value);

// --------------------
// Percentile Gain/Loss
// --------------------
} else if (data.match(/([\+\-]\d+)([%％])[ ]HP/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  value = Math.round(user.mhp * rate);
  user.gainHp(value);

} else if (data.match(/([\+\-]\d+)([%％])[ ]MP/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  value = Math.round(user.mmp * rate);
  user.gainMp(value);

} else if (data.match(/([\+\-]\d+)([%％])[ ]TP/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  value = Math.round(user.maxTp() * rate);
  user.gainTp(value);

// ------------------------
// Add/Remove Buffs/Debuffs
// ------------------------
} else if (data.match(/ADD[ ](.*)[ ]BUFF/i)) {
  var str = String(RegExp.$1).toUpperCase();
  var paramId = DataManager.getParamId(str);
  if (data.match(/(\d+)[ ]TURN/i)) {
    var turns = parseInt(RegExp.$1);
  } else {
    var turns = 5;
  }
  if (paramId >= 0) {
    user.addBuff(paramId, turns);
  } else {
    skip = true;
  }

} else if (data.match(/REMOVE[ ](.*)[ ](?:BUFF|DEBUFF)/i)) {
  var str = String(RegExp.$1).toUpperCase();
  var paramId = DataManager.getParamId(str);
  if (paramId >= 0) {
    user.removeBuff(paramId);
  } else {
    skip = true;
  }

// -----------------
// Add/Remove States
// -----------------
} else if (data.match(/ADD STATE[ ](\d+)/i)) {
  var stateId = parseInt(RegExp.$1);
  user.addState(stateId);

} else if (data.match(/REMOVE STATE[ ](\d+)/i)) {
  var stateId = parseInt(RegExp.$1);
  if (user.isStateAffected(stateId)) {
    user.removeState(stateId);
  } else {
    skip = true;
  }

// ------------
// Drain/Recoil
// ------------
} else if (data.match(/(\d+)([%％])[ ]TOTAL HP[ ](?:DMG|DAMAGE)/i)) {
  if (totalHpDamage !== 0) {
    rate = parseFloat(RegExp.$1) * 0.01;
    value = Math.round(totalHpDamage * rate);
    if (data.match(/DRAIN/i)) {
      user.gainHp(value);
    } else if (data.match(/RECOIL/i)) {
      user.gainHp(-value);
    } else {
      skip = true;
    }
  }

} else if (data.match(/(\d+)([%％])[ ]TOTAL MP[ ](?:DMG|DAMAGE)/i)) {
  if (totalMpDamage !== 0) {
    rate = parseFloat(RegExp.$1) * 0.01;
    value = Math.round(totalMpDamage * rate);
    if (data.match(/DRAIN/i)) {
      user.gainMp(value);
    } else if (data.match(/RECOIL/i)) {
      user.gainMp(-value);
    } else {
      skip = true;
    }
  }

// -------------------------------
// Add new effects above this line
// -------------------------------
} else {
  skip = true;
}

}; // Default Effect Code

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_Z_ActionBeginEnd without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Yanfly.PluginRequirements