//=============================================================================
// Yanfly Engine Plugins - Lunatic Pack - State Protection
// YEP_Z_StateProtection.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Z_StateProtection = true;

var Yanfly = Yanfly || {};
Yanfly.LunStPro = Yanfly.LunStPro || {};
Yanfly.LunStPro.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 状态保护☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 此插件需要以下插件:
 * - Battle Engine Core
 * - Buffs & States Core
 *
 * 把这个插件放在插件管理器上面列出的插件下面。
 *
 * 这个插件允许你在你的状态中添加各种保护效果，
 * 让它们以更独特的方式减少HP或MP伤害，
 * 从切断一定比例的原始伤害，一旦达到特定的断点就完全阻止伤害，
 * 以特定的方式限制伤害，以及从致命伤害中幸存下来。
 * 如果这些效果中的任何一个触发，
 * 你也可以设置状态来执行特殊效果！
 *
 * *注*:此插件最好与RPG Maker MV版本1.5.0+一起使用。
 * 您仍然可以使用这个版本号较低的插件，但是如果没有它，
 * 您将很难更改插件参数。
 *
 * ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 在技能或项目的记事本框中插入以下记事本标签，为技能或项目添加一个记事本
 * 这些影响包括：
 * 
 *  ---
 * 
 * 状态注释标签：
 * 
 *   <Protection Animation: x>
 *   - 如果保护效果消失，它将在屏幕上显示动画x
 * 保护装置。此动画将代替默认动画播放
 * 动画以指示效果已发生。
 *
 *   <type Protection: effect>
 *   - 这个插件的大部分NoteTag都将遵循上述格式“遗嘱”类型
 * 替换为“HP”、“MP”或“Both”，以指示哪种损坏
 * 类型将受到保护。将“effect”替换为其中一个效果
 * 在下面找到。插入此notetag的多个条目以赋予它多个
 * 效果。效果的顺序将按插入顺序播放
 * 放进记事本里。
 *
 * =-=-=-= 保护效果 =-=-=-=
 *
 *   --- 减少伤害 ---
 *
 *   <type Protection: Damage Cut x%>
 *   - 将“x”替换为数字。将减少原物x%的伤害
 * 损坏值而不是当前值。
 * 建议：Yanfly
 *
 *   <type Protection: Damage Block -x>
 *   <type Protection: Damage Block +x>
 *   - 将“x”替换为您希望阻止（或增加）伤害的单位值。
 * 这是对损伤最终值的一个平级更改。
 * 建议：Yanfly
 *
 *   --- 伤害抵消器 ---
 *
 *   <type Protection: Damage Null x%>
 *   - 将“x”替换为目标的MaxHP/MaxMP的百分比值
 * 希望设置为断点。如果损伤值小于或等于
 * 到了临界点，伤害将无效并归零。
 * 建议：Yanfly
 *
 *   <type Protection: Damage Barrier x%>
 *   - 将“x”替换为目标的MaxHP/MaxMP的百分比值
 * 希望设置为断点。如果损坏值小于或
 * 等于断点，伤害将被取消并设置为零。
 * 建议：Yanfly
 *
 *   --- 损坏封盖器 ---
 *
 *   <type Protection: Damage Ceiling x%>
 *   - 将“x”替换为目标的MaxHP/MaxMP的百分比值
 * 希望设置为断点。如果当前伤害值高于
 * 断点，伤害值将成为断点。
 * 建议：Yanfly
 *
 *   <type Protection: Damage Floor x%>
 *   - 将“x”替换为目标的MaxHP/MaxMP的百分比值
 * 希望设置为断点。如果当前损坏值低于
 * 断点，伤害值将成为断点。
 * 建议：Yanfly
 *
 *   --- 死亡骗子---
 *
 *   <HP Protection: Guts x%>
 *   - 仅适用于HP类型。将“x”替换为成功率百分比
 * 你想让它生效。如果受影响的目标收到致命的
 * 攻击造成的伤害，目标有x%的几率
 * 只剩下1点生命就可以生存。如果
 * 目标还剩1点生命。
 * 建议：Yanfly
 *
 *   <HP Protection: True Guts x%>
 *   - 仅适用于HP类型。将“x”替换为成功率百分比
 * 你想让它生效。如果受影响的目标收到致命的
 * 攻击造成的伤害，目标有x%的几率
 * 只剩下1点生命就可以生存。不像一般的内脏，这个
 * 即使用户只剩1 HP，也保持有效。
 * 推荐人：Joshua Pactor
 *
 *   <HP Protection: Fatal Damage Absorbx %>
 *   - 仅适用于HP类型。将“x”替换为成功率百分比
 * 你想让它生效。如果受影响的目标收到致命的
 * 伤害作为这次攻击的结果，目标将受到如下伤害：
 * 恢复了健康。
 * 建议：Shaun Pattenden
 *
 *   --- 触发器 ---
 *
 *   <type Protection: Trigger Removal x%>
 *   - 如果此状态的任何保护效果已被触发/激活，
 * 然后将此状态作为效果发生的结果移除。替换“x”
 * 以您希望的成功率来实现此效果。
 * 建议：Yanfly
 * 
 *   <type Protection: Trigger Add x Buff>
 *   <type Protection: Trigger Add x Buff, y Turns>
 *   <type Protection: Trigger Add x Debuff>
 *   <type Protection: Trigger Add x Debuff, y Turns>
 *   - 如果此状态的任何保护效果已被触发/激活，
 * 然后为参数“x”添加buff/debuff。将“x”替换为“MaxHP”，
 * “MaxMP”、“ATK”、“DEF”、“MAT”、“MDF”、“AGI”或“LUK”。您可以替换“y”
 * 随着旋转次数的增加，buff/debuff将持续。如果您不使用
 * notetag变量，带有转弯计数，然后默认为5圈。
 * 建议：Yanfly
 *
 *   <type Protection: Trigger Remove x Buff>
 *   <type Protection: Trigger Remove x Debuff>
 *   - 如果此状态的任何保护效果已被触发/激活，
 * 然后移除参数“x”的buff/debuff。将“x”替换为“MaxHP”，
 * “MaxMP”、“ATK”、“DEF”、“MAT”、“MDF”、“AGI”或“LUK”。
 * 建议：Yanfly
 *
 *   <type Protection: Trigger Add State x>
 *   - 如果此状态的任何保护效果已被触发/激活，
 * 然后将状态“x”添加到目标上。将“x”替换为所需的状态ID
 * 应用于目标。
 * 建议：Yanfly
 *
 *   <type Protection: Trigger Remove State x>
 *   - 如果此状态的任何保护效果已被触发/激活，
 * 然后将状态“x”移到目标上。将“x”替换为所需的状态ID
 * 希望从目标中移除。
 * 建议：Yanfly
 *
 * =-=-=-= 示例 =-=-=-=
 *
 *   <HP Protection: Damage Cut 70%>
 *   - 这将减少受影响单位70%的生命伤害
 * 只有30%的伤害会通过。
 *
 *   <HP Protection: Damage Block -500>
 *   <HP Protection: Damage Null 20%>
 *   - 这将减少受影响单位受到的血量伤害500平
 * 首先。如果伤害小于单位最大生命值的20%，那么它将是
 * 完全无效。
 *
 *   <MP Protection: Damage Barrier 20%>
 *   - 如果受影响的单位受到MP伤害并且MP伤害大于
 * 单位最大伤害的20%，完全消除伤害。
 *
 *   <HP Protection: Damage Ceiling 30%>
 *   - 如果受影响的单位受到HP伤害并且HP伤害超过
 * 单位最大生命值的30%，那么伤害将降低到30%
 * 单位的最大马力。
 *
 *   <HP Protection: Guts 100%>
 *   <HP Protection: Trigger Removal 100%>
 *   - 如果受影响的单位受到致命的HP伤害
 * 减少，直到单位剩下1马力。在那一点上
 * 给予肠子效果的状态将被移除。
 *
 * ============================================================================
 * Lunatic Mode - Effect Code
 * ============================================================================
 *
 * For experienced users that know JavaScript and have RPG Maker MV 1.5.0+, you
 * can add new notetag effects that can be used by the plugin or alter the
 * effects of currently existing notetag effects from the plugin parameters
 * entry: Effect Code. It should look something like this:
 *
 * ---
 *
 * // ----------------
 * // Damage Reduction
 * // ----------------
 * if (data.match(/DAMAGE CUT[ ](\d+)([%％])/i)) {
 *   rate = parseFloat(RegExp.$1) * 0.01;
 *   blocked = originalValue * rate;
 *   value -= blocked;
 *   value = Math.max(value, 0);
 *
 * } else if (data.match(/DAMAGE BLOCK[ ]([\+\-]\d+)/i)) {
 *   blocked = parseInt(RegExp.$1);
 *   value -= blocked;
 *   value = Math.max(value, 0);
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
 *   state                  The state this effect belongs to
 *   stateId                The state ID this effect belongs to
 *
 *   value                  The HP/MP damage being affected by this effect. Any
 *                          changes made to this value will be permanent unless
 *                          the effect is skipped.
 *
 *   originalValue          The original HP/MP damage before any of the protect
 *                          state effects have been applied.
 *
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
 *   animation              The animation to be played.
 *
 *   triggered              Returns if any of this state's protection effects
 *                          have been triggered (true) or not (false)
 *
 *   skip                   Default: false. If true, skips popups & animations
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
 * Version 1.01:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---General---
 * @text ---全局---
 * @default
 *
 * @param Effect Code
 * @text 效果代码
 * @parent ---General---
 * @type note
 * @desc LUNATIC MODE: This is the code used for each of the notetag
 * effects. Refer to the help file for variables used here.
 * @default "// ----------------\n// Damage Reduction\n// ----------------\nif (data.match(/DAMAGE CUT[ ](\\d+)([%％])/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  blocked = originalValue * rate;\n  value -= blocked;\n  value = Math.max(value, 0);\n\n} else if (data.match(/ELEMENT[ ](\\d+)[ ]CUT[ ](\\d+)([%％])/i)) {\n  var eleId = parseInt(RegExp.$1);\n  if (Imported.YEP_ElementCore) {\n    var match = this.getItemElements().contains(eleId);\n  } else {\n    var match = this.item().damage.elementId === eleId;\n  }\n  if (match) {\n    rate = parseFloat(RegExp.$2) * 0.01;\n    blocked = originalValue * rate;\n    value -= blocked;\n    value = Math.max(value, 0);\n  } else {\n    skip = true;\n  }\n\n} else if (data.match(/DAMAGE BLOCK[ ]([\\+\\-]\\d+)/i)) {\n  blocked = parseInt(RegExp.$1);\n  value -= blocked;\n  value = Math.max(value, 0);\n\n// -----------------\n// Damage Nullifiers\n// -----------------\n} else if (data.match(/DAMAGE NULL[ ](\\d+)([%％])/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  if (this.isHpEffect()) {\n    var breakpoint = Math.round(target.mhp * rate);\n  } else if (this.isHpEffect()) {\n    var breakpoint = Math.round(targer.mmp * rate);\n  } else {\n    skip = true;\n  }\n  if (!skip && value <= breakpoint) {\n    value = 0;\n  } else {\n    skip = true;\n  }\n\n} else if (data.match(/DAMAGE BARRIER[ ](\\d+)([%％])/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  if (this.isHpEffect()) {\n    var breakpoint = Math.round(target.mhp * rate);\n  } else if (this.isHpEffect()) {\n    var breakpoint = Math.round(target.mmp * rate);\n  } else {\n    skip = true;\n  }\n  if (!skip && value >= breakpoint) {\n    value = 0;\n  } else {\n    skip = true;\n  }\n\n// --------------\n// Damage Cappers\n// --------------\n} else if (data.match(/DAMAGE CEILING[ ](\\d+)([%％])/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  if (this.isHpEffect()) {\n    var breakpoint = Math.round(target.mhp * rate);\n  } else if (this.isHpEffect()) {\n    var breakpoint = Math.round(target.mmp * rate);\n  } else {\n    skip = true;\n  }\n  if (!skip) {\n    value = Math.min(value, breakpoint);\n  }\n\n} else if (data.match(/DAMAGE FLOOR[ ](\\d+)([%％])/i)) {\n  rate = parseFloat(RegExp.$1) * 0.01;\n  if (this.isHpEffect()) {\n    var breakpoint = Math.round(target.mhp * rate);\n  } else if (this.isHpEffect()) {\n    var breakpoint = Math.round(target.mmp * rate);\n  } else {\n    skip = true;\n  }\n  if (!skip) {\n    value = Math.max(value, breakpoint);\n  }\n\n// --------------\n// Death Cheaters\n// --------------\n} else if (data.match(/TRUE GUTS[ ](\\d+)([%％])/i)) {\n  skip = true;\n  if (this.isHpEffect()) {\n    if (value > target.hp) {\n      rate = parseFloat(RegExp.$1) * 0.01;\n      if (Math.random() < rate) {\n        skip = false;\n        value = target.hp - 1;\n      }\n    }\n  }\n\n} else if (data.match(/GUTS[ ](\\d+)([%％])/i)) {\n  skip = true;\n  if (this.isHpEffect() && target.hp > 1) {\n    if (value > target.hp) {\n      rate = parseFloat(RegExp.$1) * 0.01;\n      if (Math.random() < rate) {\n        skip = false;\n        value = target.hp - 1;\n      }\n    }\n  }\n\n} else if (data.match(/ABSORB FATAL DAMAGE[ ](\\d+)([%％])/i)) {\n  skip = true;\n  if (this.isHpEffect()) {\n    if (value > target.hp) {\n      rate = parseFloat(RegExp.$1) * 0.01;\n      if (Math.random() < rate) {\n        skip = false;\n        value *= -1;\n      }\n    }\n  }\n\n// -------------------\n// Protection Triggers\n// -------------------\n} else if (data.match(/TRIGGER REMOVAL[ ](\\d+)([%％])/i)) {\n  skip = true;\n  if (triggered) {\n    rate = parseFloat(RegExp.$1) * 0.01;\n    if (Math.random() < rate) {\n      skip = false;\n      target.removeState(stateId);\n    }\n  }\n\n} else if (data.match(/TRIGGER ADD[ ](.*)[ ]BUFF,[ ](\\d+)[ ]TURN/i)) {\n  skip = true;\n  if (triggered) {\n    skip = false;\n    var str = String(RegExp.$1).toUpperCase();\n    var turns = parseInt(RegExp.$2);\n    var paramId = DataManager.getParamId(str);\n    target.addBuff(paramId, turns);\n  }\n\n} else if (data.match(/TRIGGER ADD[ ](.*)[ ]BUFF/i)) {\n  skip = true;\n  if (triggered) {\n    skip = false;\n    var str = String(RegExp.$1).toUpperCase();\n    var turns = 5;\n    var paramId = DataManager.getParamId(str);\n    target.addBuff(paramId, turns);\n  }\n\n} else if (data.match(/TRIGGER ADD[ ](.*)[ ]DEBUFF,[ ](\\d+)[ ]TURN/i)) {\n  skip = true;\n  if (triggered) {\n    skip = false;\n    var str = String(RegExp.$1).toUpperCase();\n    var turns = parseInt(RegExp.$2);\n    var paramId = DataManager.getParamId(str);\n    target.addDebuff(paramId, turns);\n  }\n\n} else if (data.match(/TRIGGER ADD[ ](.*)[ ]DEBUFF/i)) {\n  skip = true;\n  if (triggered) {\n    skip = false;\n    var str = String(RegExp.$1).toUpperCase();\n    var turns = 5;\n    var paramId = DataManager.getParamId(str);\n    target.addDebuff(paramId, turns);\n  }\n\n} else if (data.match(/TRIGGER REMOVE[ ](.*)[ ](?:BUFF|DEBUFF)/i)) {\n  skip = true;\n  if (triggered) {\n    skip = false;\n    var str = String(RegExp.$1).toUpperCase();\n    var paramId = DataManager.getParamId(str);\n    target.removeBuff(paramId);\n  }\n\n} else if (data.match(/TRIGGER ADD STATE[ ](\\d+)/i)) {\n  skip = true;\n  if (triggered) {\n    skip = false;\n    var stateId = parseInt(RegExp.$1);\n    user.addState(stateId);\n  }\n\n} else if (data.match(/TRIGGER REMOVE STATE[ ](\\d+)/i)) {\n  skip = true;\n  if (triggered) {\n    skip = false;\n    var stateId = parseInt(RegExp.$1);\n    user.removeState(stateId);\n  }\n\n// -------------------------------\n// Add new effects above this line\n// -------------------------------\n} else {\n  skip = true;\n}"
 *
 * @param Protection Animation
 * @text 保护动画
 * @parent ---Animations---
 * @type animation
 * @desc Animation to play when reward involves protecting HP/MP.
 * @default 53
 *
 */
//=============================================================================

Yanfly.PluginRequirements = function() {
  return Imported.YEP_BattleEngineCore &&
         Imported.YEP_BuffsStatesCore;
};

if (Yanfly.PluginRequirements()) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Z_StateProtection');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LunStProEffect = JSON.parse(Yanfly.Parameters['Effect Code']);

Yanfly.Param.LunStProAni = 
  Number(Yanfly.Parameters['Protection Animation']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LunStPro.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LunStPro.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Z_StateProtection) {
    this.processLunStProNotetags1($dataStates);
    Yanfly._loaded_YEP_Z_StateProtection = true;
  }
  
  return true;
};

DataManager.processLunStProNotetags1 = function(group) {
  var notetag1 = /<(.*)[ ](?:PROTECT|PROTECTION):[ ](.*)>/i;
  var notetag2 = /<(?:PROTECT|PROTECTION)[ ](?:ANI|ANIMATION):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.hpProtectionEffects = [];
    obj.mpProtectionEffects = [];
    obj.protectAnimation = Yanfly.Param.LunStProAni;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(notetag1)) {
        var data1 = String(RegExp.$1);
        var data2 = String(RegExp.$2);
        if (data1.match(/HP/i)) {
          obj.hpProtectionEffects.push(data2);
        } else if (data2.match(/MP/i)) {
          obj.mpProtectionEffects.push(data2);
        } else if (data2.match(/BOTH/i)) {
          obj.hpProtectionEffects.push(data2);
          obj.mpProtectionEffects.push(data2);
        }
      } else if (line.match(notetag2)) {
        obj.protectAnimation = parseInt(RegExp.$1);
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
// Game_Action
//=============================================================================

Yanfly.LunStPro.Game_Action_onReact =
  Game_Action.prototype.onReactStateEffects;
Game_Action.prototype.onReactStateEffects = function(target, value) {
  var states = target.states();
  var length = states.length;
  var originalValue = value;
  for (var i = 0; i < length; ++i) {
    var state = states[i];
    if (!state) continue;
    value = this.processStProtectEffects(target, state, value, originalValue);
  }
  value = Yanfly.LunStPro.Game_Action_onReact.call(this, target, value);
  return value;
};

Game_Action.prototype.processStProtectEffects = 
function(target, state, value, originalValue) {
  if (!state) return value;
  if (this.isHpEffect() && value > 0) {
    var effects = state.hpProtectionEffects;
  } else if (this.isMpEffect() && value > 0) {
    var effects = state.mpProtectionEffects;
  } else {
    return value;
  }
  var length = effects.length;
  this._protectionStateTriggered = false;
  if (length <= 0) return value;
    for (var i = 0; i < length; ++i) {
      var data = effects[i];
      value = this.lunaticStateProtectEval(target, state, value, data,
        originalValue);
    }
  return Math.round(value);
};

Game_Action.prototype.lunaticStateProtectEval = 
function(target, state, value, data, originalValue) {
  var prevValue = value;
  var stateId = state.id;
  var item = this.item();
  var skill = this.item();
  var isSkill = DataManager.isSkill(skill);
  var isItem = DataManager.isSkill(item);
  var user = this.subject();
  var a = user;
  var subject = user;
  var b = target;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var userPreviousResult = JsonEx.makeDeepCopy(user._result);
  var targetPreviousResult = JsonEx.makeDeepCopy(target._result);
  var triggered = this._protectionStateTriggered;
  var skip = false;
  var rate = 1;
  var blocked = 0;

  var animation = state.protectAnimation;

  var code = Yanfly.Param.LunStProEffect;
  try {
    eval(code)
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'LUNATIC STATE PROTECTION ERROR');
  }

  if (user.isDead()) user.performCollapse();
  if (target.isDead()) target.performCollapse();
  user._result = userPreviousResult;
  target._result = targetPreviousResult;

  if (!skip) {
    if (animation > 0) target.startAnimation(animation);
    this._protectionStateTriggered = true;
  } else if (skip) {
    return prevValue;
  }

  return value;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
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

// ----------------
// Damage Reduction
// ----------------
if (data.match(/DAMAGE CUT[ ](\d+)([%％])/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  blocked = originalValue * rate;
  value -= blocked;
  value = Math.max(value, 0);

} else if (data.match(/ELEMENT[ ](\d+)[ ]CUT[ ](\d+)([%％])/i)) {
  var eleId = parseInt(RegExp.$1);
  if (Imported.YEP_ElementCore) {
    var match = this.getItemElements().contains(eleId);
  } else {
    var match = this.item().damage.elementId === eleId;
  }
  if (match) {
    rate = parseFloat(RegExp.$2) * 0.01;
    blocked = originalValue * rate;
    value -= blocked;
    value = Math.max(value, 0);
  } else {
    skip = true;
  }

} else if (data.match(/DAMAGE BLOCK[ ]([\+\-]\d+)/i)) {
  blocked = parseInt(RegExp.$1);
  value -= blocked;
  value = Math.max(value, 0);

// -----------------
// Damage Nullifiers
// -----------------
} else if (data.match(/DAMAGE NULL[ ](\d+)([%％])/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  if (this.isHpEffect()) {
    var breakpoint = Math.round(target.mhp * rate);
  } else if (this.isHpEffect()) {
    var breakpoint = Math.round(targer.mmp * rate);
  } else {
    skip = true;
  }
  if (!skip && value <= breakpoint) {
    value = 0;
  } else {
    skip = true;
  }

} else if (data.match(/DAMAGE BARRIER[ ](\d+)([%％])/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  if (this.isHpEffect()) {
    var breakpoint = Math.round(target.mhp * rate);
  } else if (this.isHpEffect()) {
    var breakpoint = Math.round(target.mmp * rate);
  } else {
    skip = true;
  }
  if (!skip && value >= breakpoint) {
    value = 0;
  } else {
    skip = true;
  }

// --------------
// Damage Cappers
// --------------
} else if (data.match(/DAMAGE CEILING[ ](\d+)([%％])/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  if (this.isHpEffect()) {
    var breakpoint = Math.round(target.mhp * rate);
  } else if (this.isHpEffect()) {
    var breakpoint = Math.round(target.mmp * rate);
  } else {
    skip = true;
  }
  if (!skip) {
    value = Math.min(value, breakpoint);
  }

} else if (data.match(/DAMAGE FLOOR[ ](\d+)([%％])/i)) {
  rate = parseFloat(RegExp.$1) * 0.01;
  if (this.isHpEffect()) {
    var breakpoint = Math.round(target.mhp * rate);
  } else if (this.isHpEffect()) {
    var breakpoint = Math.round(target.mmp * rate);
  } else {
    skip = true;
  }
  if (!skip) {
    value = Math.max(value, breakpoint);
  }

// --------------
// Death Cheaters
// --------------
} else if (data.match(/TRUE GUTS[ ](\d+)([%％])/i)) {
  skip = true;
  if (this.isHpEffect()) {
    if (value > target.hp) {
      rate = parseFloat(RegExp.$1) * 0.01;
      if (Math.random() < rate) {
        skip = false;
        value = target.hp - 1;
      }
    }
  }

} else if (data.match(/GUTS[ ](\d+)([%％])/i)) {
  skip = true;
  if (this.isHpEffect() && target.hp > 1) {
    if (value > target.hp) {
      rate = parseFloat(RegExp.$1) * 0.01;
      if (Math.random() < rate) {
        skip = false;
        value = target.hp - 1;
      }
    }
  }

} else if (data.match(/ABSORB FATAL DAMAGE[ ](\d+)([%％])/i)) {
  skip = true;
  if (this.isHpEffect()) {
    if (value > target.hp) {
      rate = parseFloat(RegExp.$1) * 0.01;
      if (Math.random() < rate) {
        skip = false;
        value *= -1;
      }
    }
  }

// -------------------
// Protection Triggers
// -------------------
} else if (data.match(/TRIGGER REMOVAL[ ](\d+)([%％])/i)) {
  skip = true;
  if (triggered) {
    rate = parseFloat(RegExp.$1) * 0.01;
    if (Math.random() < rate) {
      skip = false;
      target.removeState(stateId);
    }
  }

} else if (data.match(/TRIGGER ADD[ ](.*)[ ]BUFF,[ ](\d+)[ ]TURN/i)) {
  skip = true;
  if (triggered) {
    skip = false;
    var str = String(RegExp.$1).toUpperCase();
    var turns = parseInt(RegExp.$2);
    var paramId = DataManager.getParamId(str);
    target.addBuff(paramId, turns);
  }

} else if (data.match(/TRIGGER ADD[ ](.*)[ ]BUFF/i)) {
  skip = true;
  if (triggered) {
    skip = false;
    var str = String(RegExp.$1).toUpperCase();
    var turns = 5;
    var paramId = DataManager.getParamId(str);
    target.addBuff(paramId, turns);
  }

} else if (data.match(/TRIGGER ADD[ ](.*)[ ]DEBUFF,[ ](\d+)[ ]TURN/i)) {
  skip = true;
  if (triggered) {
    skip = false;
    var str = String(RegExp.$1).toUpperCase();
    var turns = parseInt(RegExp.$2);
    var paramId = DataManager.getParamId(str);
    target.addDebuff(paramId, turns);
  }

} else if (data.match(/TRIGGER ADD[ ](.*)[ ]DEBUFF/i)) {
  skip = true;
  if (triggered) {
    skip = false;
    var str = String(RegExp.$1).toUpperCase();
    var turns = 5;
    var paramId = DataManager.getParamId(str);
    target.addDebuff(paramId, turns);
  }

} else if (data.match(/TRIGGER REMOVE[ ](.*)[ ](?:BUFF|DEBUFF)/i)) {
  skip = true;
  if (triggered) {
    skip = false;
    var str = String(RegExp.$1).toUpperCase();
    var paramId = DataManager.getParamId(str);
    target.removeBuff(paramId);
  }

} else if (data.match(/TRIGGER ADD STATE[ ](\d+)/i)) {
  skip = true;
  if (triggered) {
    skip = false;
    var stateId = parseInt(RegExp.$1);
    user.addState(stateId);
  }

} else if (data.match(/TRIGGER REMOVE STATE[ ](\d+)/i)) {
  skip = true;
  if (triggered) {
    skip = false;
    var stateId = parseInt(RegExp.$1);
    user.removeState(stateId);
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
text += 'YEP_Z_StateProtection without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Yanfly.PluginRequirements