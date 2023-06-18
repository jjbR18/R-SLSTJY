//=============================================================================
// Yanfly Engine Plugins - Lunatic Pack - Passive Condition Cases
// YEP_Z_PassiveCases.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Z_PassiveCases = true;

var Yanfly = Yanfly || {};
Yanfly.LunPasCas = Yanfly.LunPasCas || {};
Yanfly.LunPasCas.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 被动状态激活条件☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要以下插件：
 * -自动被动状态
 * 
 * 被动状态可以是一个强大的游戏，但如果他们总是
 * 在整个战斗中都很活跃，他们可能有点太强大了。有时候，
 * 你会想限制你的被动状态的范围
 * 通过对他们施加有条件的情况而活跃。如果所有的被动式
 * 有条件的情况已经满足，那么被动的就会变成主动的。这个
 * 插件为您添加了大量的条件案例，您可以在
 * 你的游戏，并限制某些被动的状态，使其积极的影响
 * 任何时候。
 * 
 * *注*：此插件最好与RPG Maker MV版本1.5.0+一起使用。你可以
 * 仍然使用这个版本号较低的插件，但你会有很多
 * 没有它就很难改变插件参数。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 将以下NoteTag插入到州的notebox中，以使其成为被动的
 * 条件案例。
 * 
 * 状态注释标签：
 *
 *   <Passive Condition Cases>
 *    condition
 *    condition
 *   </Passive Condition Cases>
 *   - 使用上述格式为被动状态添加条件。
 * 在<Passive condition Cases>
 * 和</Passive Condition Cases>带有以下任一项的注释标签
 * 条件，以提示条件类型。可以插入多个
 * 使被动状态的条件需要满足更多的条件
 * 在他们活跃之前。
 *
 * =-=-=-= Conditions List =-=-=-=
 *
 *   --- Switch On/Off ---
 *
 *   Switch x On
 *   Switch x Off
 *   - 将“x”替换为数值。这将进行条件检查，如果
 * 事件开关x打开或关闭。如果满足条件检查，则
 * 如果满足其他条件，条件被动将变为主动。
 * 建议：Yanfly
 *
 *   --- Numerical Comparison Check ---
 *
 *   x >= y
 *   x <= y
 *   x > y
 *   x < y
 *   x != y
 *   x = y
 *   - 这需要条件进行简单的比较检查
 * 在x和y之间。这些数字比较将是“>=”、“<=”、“>”、“<”，
 *    '!=', 和“=”（即大于或等于，小于或等于，
 * 分别大于、小于、不等于和等于）。替换
 * “x”和“y”带有数字、百分比、“HP”、“MP”、“TP”、“HP%”、“MP%”，
 * “TP%”、“MAXHP”、“MAXMP”、“ATK”、“DEF”、“MAT”、“MDF”、“AGI”、“LUK”或
 * “变量X”用于比较。
 *
 *   如果正在检查某个百分比，则会像检查百分比一样进行检查
 * 他被送去了。例如，“50%”将是“50”。
 *
 *   SUGGESTED BY: Yanfly
 *
 *   --- Has/Not State ---
 *
 *   Has State x
 *   - 将“x”替换为要检查的状态的ID。如果用户是
 * 受此状态影响，则此条件被动将变为主动
 * 只要其他条件都满足。
 * 建议：Goldschuss
 *
 *   Not State x
 *   - 将“x”替换为要检查的状态的ID。如果用户是
 * 不受那个状态的影响，那么这个条件被动句就会变成
 * 只要满足所有其他条件，就会激活。
 * 建议：Goldschuss
 *
 *   --- Has/Not Buff/Debuff---
 *
 *   Has x Buff
 *   - 将“x”替换为“MAXHP”、“MAXMP”、“ATK”、“DEF”、“MAT”、“MDF”、“AGI”或
 * “LUK”。这将检查用户当前是否处于缓冲状态
 * 那个参数。如果用户是，则条件被动将变为
 * 只要满足所有其他条件，就会激活。
 * 建议：Yanfly
 *
 *   Has x Debuff
 *   - 将“x”替换为“MAXHP”、“MAXMP”、“ATK”、“DEF”、“MAT”、“MDF”、“AGI”或
 * “LUK”。这将检查用户当前是否已被删除
 * 那个参数。如果用户是，则条件被动将变为
 * 只要满足所有其他条件，就会激活。
 * 建议：Yanfly
 *
 *   Not x Buff
 *   - 将“x”替换为“MAXHP”、“MAXMP”、“ATK”、“DEF”、“MAT”、“MDF”、“AGI”或
 * “LUK”。这将检查用户当前是否未被缓冲
 * 在这个参数中。如果用户是，则条件被动将变为
 * 只要满足所有其他条件，就会激活。
 * 建议：Yanfly
 *
 *   Not x Debuff
 *   - 将“x”替换为“MAXHP”、“MAXMP”、“ATK”、“DEF”、“MAT”、“MDF”、“AGI”或
 * “LUK”。这将检查用户当前是否没有去毛刺
 * 在这个参数中。如果用户是，条件被动将变为
 * 只要满足所有其他条件，就会激活。
 * 建议：Yanfly
 *
 *   --- 总 Buffs/Debuffs ---
 *
 *   Total Buffs >= x
 *   Total Buffs <= x
 *   Total Buffs > x
 *   Total Buffs < x
 *   Total Buffs != x
 *   Total Buffs = x
 *   - 将“x”替换为要相对于该数字检查的数字值
 * 用户当前受影响的buff数量。如果转弯检查通过，则
 * 如果满足其他条件，条件被动将变为主动。 *   SUGGESTED  *   SUGGESTED BY: Alejandro SQ
 *
 *   Total Debuffs >= x
 *   Total Debuffs <= x
 *   Total Debuffs > x
 *   Total Debuffs < x
 *   Total Debuffs != x
 *   Total Debuffs = x
 *   - 将“x”替换为要相对于该数字检查的数字值
 * 用户当前受影响的减益次数。如果转弯检查通过，
 * 如果满足其他条件，条件被动将变为主动。 *   SUGGESTED BY: Alejandro SQ
 *
 *   --- 活的/死的 ---
 *
 *   Alive Actors/Enemies/Allies/Foes >= x
 *   Alive Actors/Enemies/Allies/Foes <= x
 *   Alive Actors/Enemies/Allies/Foes > x
 *   Alive Actors/Enemies/Allies/Foes < x
 *   Alive Actors/Enemies/Allies/Foes != x
 *   Alive Actors/Enemies/Allies/Foes = x
 *   - 将“x”替换为要相对于该数字检查的数字值
 * 政党中活着的演员，军队中的敌人，用户的盟友，或者
 * 用户的敌人。只使用上面四个关键字中的一个（'演员'，'敌人'，
 * “盟友”或“敌人”）。如果成员计数检查通过，则条件
 * 只要满足所有其他条件，被动将变为主动。
 * 建议：Yanfly
 *
 *   Dead Actors/Enemies/Allies/Foes >= x
 *   Dead Actors/Enemies/Allies/Foes <= x
 *   Dead Actors/Enemies/Allies/Foes > x
 *   Dead Actors/Enemies/Allies/Foes < x
 *   Dead Actors/Enemies/Allies/Foes != x
 *   Dead Actors/Enemies/Allies/Foes = x
 *   - 将“x”替换为要相对于该数字检查的数字值
 * 阵营中死去的演员、部队中的敌人、用户的盟友或
 * 用户的敌人。只使用上面四个关键字中的一个（'演员'，'敌人'，
 * “盟友”或“敌人”）。如果成员计数检查通过，则条件
 * 只要满足所有其他条件，被动将变为主动。
 * 建议：Yanfly
 *
 *   --- 转弯次数---
 *
 *   Battle Turns >= x
 *   Battle Turns <= x
 *   Battle Turns > x
 *   Battle Turns < x
 *   Battle Turns != x
 *   Battle Turns = x
 *   - 将“x”替换为要相对于该数字检查的数字值
 * 在战斗中经过的转折点。如果回合检查通过，条件
 * 只要满足所有其他条件，被动将变为主动。
 * 建议：Yanfly
 *
 *   --- 拥有武器/盔甲---
 *
 *   Has Weapon x
 *   - 用户必须是参与者，否则此条件返回false。替换
 * “x”与您要检查的武器ID，如果用户有。如果用户有
 * 它装备，条件将通过，并将成为活跃，只要
 * 满足所有其他条件。
 * 建议：Yanfly
 *
 *   Not Weapon x
 *   - 用户必须是参与者，否则此条件返回false。替换
 * “x”与您要检查的武器ID，如果用户不应该有。如果
 * 如果用户没有配备，则条件将通过并变为
 * 只要满足所有其他条件，就会激活。
 * 建议：Yanfly
 *
 *   Has Armor x
 *   - 用户必须是参与者，否则此条件返回false。替换
 * “x”与您要检查的用户是否拥有的装甲ID。如果用户有
 * 它装备，条件将通过，并将成为活跃，只要
 * 满足所有其他条件。
 * 建议：Yanfly
 *
 *   Not Armor x
 *   - 用户必须是参与者，否则此条件返回false。替换
 * “x”与您希望检查用户是否不应具有的装甲ID。如果
 * 如果用户没有配备，则条件将通过并变为
 * 只要满足所有其他条件，就会激活。
 * 建议：Yanfly
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
 * // -------------
 * // Switch On/Off
 * // -------------
 * if (data.match(/SWITCH[ ](\d+)[ ]ON/i)) {
 *   var switchId = parseInt(RegExp.$1);
 *   condition = $gameSwitches.value(switchId);
 * 
 * } else if (data.match(/SWITCH[ ](\d+)[ ]OFF/i)) {
 *   var switchId = parseInt(RegExp.$1);
 *   condition = !$gameSwitches.value(switchId);
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
 *   condition              Current condition setting. If it returns true, then
 *                          the current condition case passes. Otherwise, no.
 *                          The passive state needs all its condition cases to
 *                          to become an active passive state.
 *
 *   a                      Returns the action user
 *   user                   Returns the action user
 *   subject                Returns the action user
 *
 *   s[x]                   Return switch x (true/false)
 *   v[x]                   Return variable x's current value
 *
 *   skip                   Default: false. If true, returns the previous rate
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
 * @text 代码效果
 * @type note
 * @desc This is the code used for each of the notetag effects.
 * @default "// -------------\n// Switch On/Off\n// -------------\nif (data.match(/SWITCH[ ](\\d+)[ ]ON/i)) {\n  var switchId = parseInt(RegExp.$1);\n  condition = $gameSwitches.value(switchId);\n\n} else if (data.match(/SWITCH[ ](\\d+)[ ]OFF/i)) {\n  var switchId = parseInt(RegExp.$1);\n  condition = !$gameSwitches.value(switchId);\n\n// -------------\n// Has/Not State\n// -------------\n} else if (data.match(/HAS[ ]STATE[ ](\\d+)/i)) {\n  var stateId = parseInt(RegExp.$1);\n  condition = user.isStateAffected(stateId);\n\n} else if (data.match(/NOT[ ]STATE[ ](\\d+)/i)) {\n  var stateId = parseInt(RegExp.$1);\n  condition = !user.isStateAffected(stateId);\n\n// -------------------\n// Has/Not Buff/Debuff\n// -------------------\n} else if (data.match(/HAS[ ](.*)[ ]BUFF/i)) {\n  var str = String(RegExp.$1);\n  var paramId = DataManager.getParamId(str);\n  condition = user.isBuffAffected(paramId);\n\n} else if (data.match(/HAS[ ](.*)[ ]DEBUFF/i)) {\n  var str = String(RegExp.$1);\n  var paramId = DataManager.getParamId(str);\n  condition = user.isDebuffAffected(paramId);\n\n// --------------------\n// Has/Not Weapon/Armor\n// --------------------\n} else if (data.match(/HAS[ ]WEAPON[ ](\\d+)/i)) {\n  if (user.isActor()) {\n    var id = parseInt(RegExp.$1);\n    var item = $dataWeapons[id];\n    condition = user.hasWeapon(item);\n  } else {\n    condition = false;\n  }\n\n} else if (data.match(/NOT[ ]WEAPON[ ](\\d+)/i)) {\n  if (user.isActor()) {\n    var id = parseInt(RegExp.$1);\n    var item = $dataWeapons[id];\n    condition = !user.hasWeapon(item);\n  } else {\n    condition = false;\n  }\n\n} else if (data.match(/HAS[ ]ARMOR[ ](\\d+)/i)) {\n  if (user.isActor()) {\n    var id = parseInt(RegExp.$1);\n    var item = $dataArmors[id];\n    condition = user.hasArmor(item);\n  } else {\n    condition = false;\n  }\n\n} else if (data.match(/NOT[ ]ARMOR[ ](\\d+)/i)) {\n  if (user.isActor()) {\n    var id = parseInt(RegExp.$1);\n    var item = $dataArmors[id];\n    condition = !user.hasArmor(item);\n  } else {\n    condition = false;\n  }\n\n// ----------------------\n// Param Above/Below Stat\n// ----------------------\n} else if (data.match(/(.*)[ ](?:>|<|>=|<=|=|!=)[ ](.*)/i)) {\n  var check1 = String(RegExp.$1);\n  var check2 = String(RegExp.$2);\n  var value1 = DataManager.numberParameterCheck(check1, user);\n  var value2 = DataManager.numberParameterCheck(check2, user);\n  if (value1 !== null && value2 !== null) {\n    if (data.match(/>=/i)) {\n      condition = value1 >= value2;\n    } else if (data.match(/</i)) {\n      condition = value1 <= value2;\n    } else if (data.match(/>/i)) {\n      condition = value1 > value2;\n    } else if (data.match(/</i)) {\n      condition = value1 < value2;\n    } else if (data.match(/!=/i)) {\n      condition = value1 !== value2;\n    } else if (data.match(/=/i)) {\n      condition = value1 === value2;\n    } else {\n      skip = true;\n    }\n  } else {\n    condition = false;\n  }\n\n// -------------------------------\n// Add new effects above this line\n// -------------------------------\n} else {\n  skip = true;\n}"
 *
 */
//=============================================================================

Yanfly.PluginRequirements = function() {
  return Imported.YEP_AutoPassiveStates;
};

if (Yanfly.PluginRequirements()) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Z_PassiveCases');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LunPasCasEffect = JSON.parse(Yanfly.Parameters['Effect Code']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LunPasCas.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LunPasCas.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Z_PassiveCases) {
    this.processLunPasCasNotetags1($dataStates);
    Yanfly._loaded_YEP_Z_PassiveCases = true;
  }
  
  return true;
};

DataManager.processLunPasCasNotetags1 = function(group) {
  var note1 = /<(?:PASSIVE CONDITION CASE|PASSIVE CONDITION CASES)>/i;
  var note2 = /<\/(?:PASSIVE CONDITION CASE|PASSIVE CONDITION CASES)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.passiveCondition = obj.passiveCondition || '';
    obj.passiveConditionCases = [];
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        evalMode = 'passive condition case';
      } else if (line.match(note2)) {
        evalMode = 'none';
        obj.passiveCondition = obj.passiveCondition || '\n\n';
      } else if (evalMode === 'passive condition case') {
        obj.passiveConditionCases.push(line);
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

DataManager.numberParameterCheck = function(check, user) {
  // --------
  // HP/MP/TP
  // --------
  if (check.toUpperCase() === 'HP') {
    return user.hp;

  } else if (check.toUpperCase() === 'MP') {
    return user.mp;

  } else if (check.toUpperCase() === 'TP') {
    return user.tp;

  // -----------
  // HP%/MP%/TP%
  // -----------
  } else if (check.toUpperCase() === 'HP%') {
    return user.hpRate() * 100;

  } else if (check.toUpperCase() === 'MP%') {
    return user.mpRate() * 100;

  } else if (check.toUpperCase() === 'TP%') {
    return user.tpRate() * 100;

  // ------------
  // Battle Turns
  // ------------
  } else if (check.toUpperCase().match(/BATTLE TURN/i)) {
    return $gameTroop.turnCount();

  // -------------------
  // Total Buffs/Debuffs
  // -------------------
  } else if (check.toUpperCase().match(/TOTAL BUFF/i)) {
    return user.totalBuffs();

  } else if (check.toUpperCase().match(/TOTAL DEBUFF/i)) {
    return user.totalDebuffs();

  // --------------------------------
  // Alive Actors/Enemies/Allies/Foes
  // --------------------------------
  } else if (check.toUpperCase().match(/ALIVE ACTORS/i)) {
    return $gameParty.aliveMembers();

  } else if (check.toUpperCase().match(/ALIVE ENEMIES/i)) {
    return $gameTroop.aliveMembers();

  } else if (check.toUpperCase().match(/ALIVE ALLIES/i)) {
    var unit = user.friendsUnit();
    return unit.aliveMembers();

  } else if (check.toUpperCase().match(/ALIVE FOES/i)) {
    var unit = user.opponentsUnit();
    return unit.aliveMembers();

  // -------------------------------
  // Dead Actors/Enemies/Allies/Foes
  // -------------------------------
  } else if (check.toUpperCase().match(/DEAD ACTORS/i)) {
    return $gameParty.deadMembers();

  } else if (check.toUpperCase().match(/DEAD ENEMIES/i)) {
    return $gameTroop.deadMembers();

  } else if (check.toUpperCase().match(/DEAD ALLIES/i)) {
    var unit = user.friendsUnit();
    return unit.deadMembers();

  } else if (check.toUpperCase().match(/DEAD FOES/i)) {
    var unit = user.opponentsUnit();
    return unit.deadMembers();

  // --------
  // Variable
  // --------
  } else if (check.match(/(?:VAR|VARIABLE)[ ](\d+)/i)) {
    return $gameVariables.value(parseInt(RegExp.$1));

  // -----------------
  // Percentage/Number
  // -----------------
  } else if (check.match(/(\d+)([%％])/i)) {
    return parseFloat(RegExp.$1);

  } else if (check.match(/(\d+)/i)) {
    return parseInt(RegExp.$1);

  // ---------------
  // Everything Else
  // ---------------
  } else {
    var paramId = DataManager.getParamId(check);
    if (param >= 0) {
      return user.param(paramId);
    }
  }
  return null;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.totalBuffs = function() {
  var value = 0;
  for (var i = 0; i < 8; ++i) {
    if (this.isBuffAffected(i)) value += 1;
  }
  return value;
};

Game_BattlerBase.prototype.totalDebuffs = function() {
  var value = 0;
  for (var i = 0; i < 8; ++i) {
    if (this.isDebuffAffected(i)) value += 1;
  }
  return value;
};

Yanfly.LunPasCas.Game_BattlerBase_psc =
  Game_BattlerBase.prototype.passiveStateConditions;
Game_BattlerBase.prototype.passiveStateConditions = function(state) {
  var condition = Yanfly.LunPasCas.Game_BattlerBase_psc.call(this, state);
  if (!condition) return false;

  this._checkPassiveStateCondition = this._checkPassiveStateCondition || [];
  this._checkPassiveStateCondition.push(state.id);

  var cases = state.passiveConditionCases || [];
  var length = cases.length;
  for (var i = 0; i < length; ++i) {
    var data = cases[i];
    if (!this.passiveConditionCaseEval(state, data)) {
      var index = this._checkPassiveStateCondition.indexOf(state.id);
      this._checkPassiveStateCondition.splice(index, 1);
      return false;
    }
  }

  var index = this._checkPassiveStateCondition.indexOf(state.id);
  this._checkPassiveStateCondition.splice(index, 1);

  return true;
};

Game_BattlerBase.prototype.passiveConditionCaseEval = function(state, data) {
  var condition = true;
  var stateId = state.id;
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;

  var skip = false;
  var value = 0;
  var rate = 1;

  var code = Yanfly.Param.LunPasCasEffect;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'PASSIVE CONDITION CASES EFFECT ERROR');
  }
  if (skip) return true;
  return condition;
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

// -------------
// Switch On/Off
// -------------
if (data.match(/SWITCH[ ](\d+)[ ]ON/i)) {
  var switchId = parseInt(RegExp.$1);
  condition = $gameSwitches.value(switchId);

} else if (data.match(/SWITCH[ ](\d+)[ ]OFF/i)) {
  var switchId = parseInt(RegExp.$1);
  condition = !$gameSwitches.value(switchId);

// -------------
// Has/Not State
// -------------
} else if (data.match(/HAS[ ]STATE[ ](\d+)/i)) {
  var stateId = parseInt(RegExp.$1);
  condition = user.isStateAffected(stateId);

} else if (data.match(/NOT[ ]STATE[ ](\d+)/i)) {
  var stateId = parseInt(RegExp.$1);
  condition = !user.isStateAffected(stateId);

// -------------------
// Has/Not Buff/Debuff
// -------------------
} else if (data.match(/HAS[ ](.*)[ ]BUFF/i)) {
  var str = String(RegExp.$1);
  var paramId = DataManager.getParamId(str);
  condition = user.isBuffAffected(paramId);

} else if (data.match(/HAS[ ](.*)[ ]DEBUFF/i)) {
  var str = String(RegExp.$1);
  var paramId = DataManager.getParamId(str);
  condition = user.isDebuffAffected(paramId);

// --------------------
// Has/Not Weapon/Armor
// --------------------
} else if (data.match(/HAS[ ]WEAPON[ ](\d+)/i)) {
  if (user.isActor()) {
    var id = parseInt(RegExp.$1);
    var item = $dataWeapons[id];
    condition = user.hasWeapon(item);
  } else {
    condition = false;
  }

} else if (data.match(/NOT[ ]WEAPON[ ](\d+)/i)) {
  if (user.isActor()) {
    var id = parseInt(RegExp.$1);
    var item = $dataWeapons[id];
    condition = !user.hasWeapon(item);
  } else {
    condition = false;
  }

} else if (data.match(/HAS[ ]ARMOR[ ](\d+)/i)) {
  if (user.isActor()) {
    var id = parseInt(RegExp.$1);
    var item = $dataArmors[id];
    condition = user.hasArmor(item);
  } else {
    condition = false;
  }

} else if (data.match(/NOT[ ]ARMOR[ ](\d+)/i)) {
  if (user.isActor()) {
    var id = parseInt(RegExp.$1);
    var item = $dataArmors[id];
    condition = !user.hasArmor(item);
  } else {
    condition = false;
  }

// ----------------------
// Param Above/Below Stat
// ----------------------
} else if (data.match(/(.*)[ ](?:>|<|>=|<=|=|!=)[ ](.*)/i)) {
  var check1 = String(RegExp.$1);
  var check2 = String(RegExp.$2);
  var value1 = DataManager.numberParameterCheck(check1, user);
  var value2 = DataManager.numberParameterCheck(check2, user);
  if (value1 !== null && value2 !== null) {
    if (data.match(/>=/i)) {
      condition = value1 >= value2;
    } else if (data.match(/</i)) {
      condition = value1 <= value2;
    } else if (data.match(/>/i)) {
      condition = value1 > value2;
    } else if (data.match(/</i)) {
      condition = value1 < value2;
    } else if (data.match(/!=/i)) {
      condition = value1 !== value2;
    } else if (data.match(/=/i)) {
      condition = value1 === value2;
    } else {
      skip = true;
    }
  } else {
    condition = false;
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
text += 'YEP_Z_PassiveCases without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Yanfly.PluginRequirements