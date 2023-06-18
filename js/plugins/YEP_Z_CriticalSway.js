//=============================================================================
// Yanfly Engine Plugins - Lunatic Pack - Custom Critical Rates
// YEP_Z_CriticalSway.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Z_CriticalSway = true;

var Yanfly = Yanfly || {};
Yanfly.LunCriSway = Yanfly.LunCriSway || {};
Yanfly.LunCriSway.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 暴击影响设置☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要以下插件：
 * -战斗引擎核心
 * -损坏核心
 * -关键控制
 * 
 * 将此插件放在插件管理器中上述插件的下面。
 * 
 * 有没有想过在确定暴击的方式上有更多的变化
 * 在你的游戏里？这个插件可以让你控制致命一击
 * 游戏中技能、物品和状态的比率！受其影响的用户可以
 * 根据他们自己的HP值或
 * 敌人的！或者是把暴击率和元素联系起来的想法
 * 动作速度也一样？你也可以改变暴击率
 * 用户或目标的状态、增益或减益的数量！
 * 
 **注* ：此插件最好与RPG Maker MV版本1.5.0+一起使用。你可以
 * 仍然使用这个版本号较低的插件，但你会有很多
 * 没有它就很难改变插件参数。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 在技能或项目的记事本框中插入以下记事本标签，为技能或项目添加一个记事本
 * 这些影响包括：
 * 
 *  ---
 * 
 * 技能、物品、状态标签：
 * 
  *     <Custom Critical Rate: effect>
 * -此插件的大部分NoteTag将遵循上述格式。替换
 * “效果”与下面效果部分的以下条目之一。
 * 插入多个条目以赋予您的技能/项目/状态多种效果。
 * 如果有多个效果可以改变暴击率，它们将
 * 先按技能/项目的顺序，然后按项目的优先顺序
 * 用户状态。具有相同notetag效果的多个条目可以与
 * 除非另有说明。
 *
 *   <Custom Critical Rate: effect, nonstackable>
 * -使用上述notetag格式，并在末尾粘贴“nonstackable”
 * 的效果将使它与相同的其他修饰符不可堆叠
 * 类型。因此，只有具有类似效果的第一个条目才会被删除
 * 不管效果是强是弱。
 * 它将先按技能/项目的顺序进行，然后按优先级进行
 * 用户状态的顺序。并不是所有的效果都是不可叠加的。
 * 下面列出的效果将表明它们是否会变得不可堆叠。
 * 
 * =-=-=-=影响条件=-=-=-=
 * 
 * ---用户参数率---
 *
 *   <Custom Critical Rate: x Pride y%>
 *   <Custom Critical Rate: x Pride y%, nonstackable>
 * -将“x”替换为“HP”、“MP”或“TP”。这将使用攻击者的
 * 当前生命值，MP值，或TP值作为暴击率修正值。替换“y”
 * 用一个百分比来表示你希望这个修饰符有多重要。
 * 攻击者的HP、MP或TP值越高，修正值越高。
 * 建议：Yanfly
 *
 *   <Custom Critical Rate: x Crisis y%>
 *   <Custom Critical Rate: x Crisis y%, nonstackable>
 * -将“x”替换为“HP”、“MP”或“TP”。这将使用攻击者的
 * 当前生命值，MP值，或TP值作为暴击率修正值。替换“y”
 * 用一个百分比来表示你希望这个修饰符有多重要。
 * 攻击者的HP、MP或TP值越高，修正值越高。
 * 建议：Yanfly
 *
 *   --- Target Param Rate ---
 *
 *   <Custom Critical Rate: x Hero y%>
  *    <Custom Critical Rate: x Hero y%, nonstackable>
 * -将“x”替换为“HP”、“MP”或“TP”。这将使用防御者的
 * 当前生命值，MP值，或TP值作为暴击率修正值。替换“y”
 * 用一个百分比来表示你希望这个修饰符有多重要。
 * 防御者的生命值、MP值或TP值越高，修正值越高。
 * 建议：Yanfly
 *
 *   <Custom Critical Rate: x Bully y%>
 *   <Custom Critical Rate: x Bully y%, nonstackable>
 * -将“x”替换为“HP”、“MP”或“TP”。这将使用防御者的
 * 当前生命值，MP值，或TP值作为暴击率修正值。替换“y”
 * 用一个百分比来表示你希望这个修饰符有多重要。
 * 防御者的生命值、MP值或TP值越高，修正值越高。
 * 建议：Yanfly
 *
 *   --- Element Rate ---
 *
 *   <Custom Critical Rate: Element Rate x%>
 *   <Custom Critical Rate: Element Rate x%, nonstackable>
 * -如果当前操作附加了元素，则此效果将
 * 根据目标对目标的伤害率调整暴击率
 * 动作的元素。将“x”替换为
 * 希望元素率影响暴击率。
 * 建议：Yanfly
 *
 *   --- State Modifiers ---
 *
 *   <Custom Critical Rate: User States +x%>
 *   <Custom Critical Rate: User States -x%>
 *   <Custom Critical Rate: User States +x%, nonstackable>
 *   <Custom Critical Rate: User States -x%, nonstackable>
 * -根据事件数更改当前操作的临界速率
 * 用户拥有的状态。更改的金额将由百分比决定
 * “x”用于增加/减少每个状态的当前暴击率。
 * 建议：Yanfly
 *
 *   <Custom Critical Rate: Target States +x%>
 *   <Custom Critical Rate: Target States -x%>
 *   <Custom Critical Rate: Target States +x%, nonstackable>
 *   <Custom Critical Rate: Target States -x%, nonstackable>
 * -根据事件数更改当前操作的临界速率
 * 说明目标有。更改的金额将由
 * 百分比'x'增加/减少每个状态的当前暴击率。
 * 建议：Yanfly
 *
 *   --- Buff Modifiers ---
 *
 *   <Custom Critical Rate: User Buffs +x%>
 *   <Custom Critical Rate: User Buffs -x%>
 *   <Custom Critical Rate: User Buffs +x%, nonstackable>
 *   <Custom Critical Rate: User Buffs -x%, nonstackable>
 * -根据事件数更改当前操作的临界速率
 * 用户拥有的buff类型。更改的金额将由
 * 百分比'x'增加/减少当前每buff的暴击率
 * 类型。这不包括每个buff的堆栈。
 * 建议：Yanfly
 *
 *   <Custom Critical Rate: Target States +x%>
 *   <Custom Critical Rate: Target States -x%>
 *   <Custom Critical Rate: Target States +x%, nonstackable>
 *   <Custom Critical Rate: Target States -x%, nonstackable>
 * -根据事件数更改当前操作的临界速率
 * 目标拥有的buff类型。更改的金额将由
 * 百分比'x'增加/减少当前每buff的暴击率
 * 类型。这不包括每个buff的堆栈。
 * 建议：Yanfly
 *
 *   --- Debuff Modifiers ---
 *
 *   <Custom Critical Rate: User Buffs +x%>
 *   <Custom Critical Rate: User Buffs -x%>
 *   <Custom Critical Rate: User Buffs +x%, nonstackable>
 *   <Custom Critical Rate: User Buffs -x%, nonstackable>
 * -根据事件数更改当前操作的临界速率
 * 删除用户拥有的类型。更改的金额将由
 * 百分比'x'增加/减少当前暴击率每减益
 * 类型。这不包括每次减益的叠加。
 * 建议：Yanfly
 *
 *   <Custom Critical Rate: Target States +x%>
 *   <Custom Critical Rate: Target States -x%>
 *   <Custom Critical Rate: Target States +x%, nonstackable>
 *   <Custom Critical Rate: Target States -x%, nonstackable>
 * -根据事件数更改当前操作的临界速率
 * 目标具有的去毛刺类型。变更金额由
 * 百分比“x”以增加/降低当前的每次去毛刺临界命中率
 * 类型。这不包括每次去毛刺的堆栈。
 * 建议：Yanfly
 *
 * =-=-=-= Effect EXAMPLES =-=-=-=
 *
 *   <Custom Critical Rate: TP Pride 50%>
 * -这将提高用户的暴击率相对于用户的
 * 当前TP率高达50%（每1个TP将增加0.5%的暴击率）。
 *
 *   <Custom Critical Rate: HP Crisis 200%>
 *   <Custom Critical Rate: HP Hero 50%>
 * -这将提高用户的暴击率的基础上有多低
 * 用户的当前HP以及目标的当前HP有多高。每
 * 1%HP用户丢失，暴击率增加2%
 * 目标每有1%的生命值，暴击率也会增加
 * 减少0.5%。
 *
 *   <Custom Critical Rate: Element Rate 100%>
 * -这将改变用户对目标的暴击率，如果
 * 目前的行动是基本的。如果目标对元素弱200%，
 * 那么暴击率也会提高200%。如果目标
 * 对元素有50%的抵抗力，那么暴击率也会
 * 调低50%。
 *
 *   <Custom Critical Rate: Target States +5%>
 * -这将使目标受影响的每个状态的用户暴击率提高5%。
 *
 *   <Custom Critical Rate: User Buffs +3%>
 *   <Custom Critical Rate: Target Debuffs +6%>
 * -这将提高用户的暴击率为3%，每buff的
 * 用户拥有，目标每减一次6%。
 *
 * ============================================================================
 * 疯狂模式-效果代码
 * ============================================================================
 *
 * 对于熟悉JavaScript并拥有RPG Maker mv1.5.0+的经验丰富的用户，您可以
 * 可以添加可由插件使用的新notetag效果或更改
 * 来自插件参数的当前现有notetag效果的效果
 * 条目：效果代码。应该是这样的：
 *
 * ---
 *
 * // ---------------
 * // User Param Rate
 * // ---------------
 * if (data.match(/(.*)[ ]PRIDE[ ](\d+)([%％])/i)) {
 *   var param = String(RegExp.$1).toUpperCase();
 *   var modifier = parseFloat(RegExp.$2) * 0.01;
 *   if (param === 'HP') {
 *     var paramRate = user.hpRate();
 *     if (nonstack) {
 *       stackCheck = this._stackHpPride;
 *       this._stackHpPride = true;
 *     }
 *   } else if (param === 'MP') {
 *     var paramRate = user.mpRate();
 *     if (nonstack) {
 *       stackCheck = this._stackMpPride;
 *       this._stackMpPride = true;
 *     }
 *   } else if (param === 'TP') {
 *     var paramRate = user.tpRate();
 *     if (nonstack) {
 *       stackCheck = this._stackTpPride;
 *       this._stackTpPride = true;
 *     }
 *   } else {
 *     skip = true;
 *   }
 *   rate += paramRate * modifier;
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
 * 以下是此代码位中使用的每个变量所指的内容：
 *
 *   --------------------   ---------------------------------------------------
 *   Variable:              Refers to:
 *   --------------------   ---------------------------------------------------
 *   rate                   The current critical hit rate to be returned
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
 *   nonstack               Returns if effect's nonstacking or not (true/false)
 *   stackCheck             If true, it will autoskip the current effect
 *
 *   skip                   Default: false. If true, returns the previous rate
 *
 * ---
 *
 *如果需要将效果代码还原回其原始状态，请删除
 * 插件从插件管理器列表，然后再添加它。代码将是
 * 返回默认值。
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
 * @desc LUNATIC MODE: This is the code used for each of the notetag
 * effects. Refer to the help file for variables used here.
 * @default "// ---------------\n// User Param Rate\n// ---------------\nif (data.match(/(.*)[ ]PRIDE[ ](\\d+)([%％])/i)) {\n  var param = String(RegExp.$1).toUpperCase();\n  var modifier = parseFloat(RegExp.$2) * 0.01;\n  if (param === 'HP') {\n    var paramRate = user.hpRate();\n    if (nonstack) {\n      stackCheck = this._stackHpPride;\n      this._stackHpPride = true;\n    }\n  } else if (param === 'MP') {\n    var paramRate = user.mpRate();\n    if (nonstack) {\n      stackCheck = this._stackMpPride;\n      this._stackMpPride = true;\n    }\n  } else if (param === 'TP') {\n    var paramRate = user.tpRate();\n    if (nonstack) {\n      stackCheck = this._stackTpPride;\n      this._stackTpPride = true;\n    }\n  } else {\n    skip = true;\n  }\n  rate += paramRate * modifier;\n\n} else if (data.match(/(.*)[ ]CRISIS[ ](\\d+)([%％])/i)) {\n  var param = String(RegExp.$1).toUpperCase();\n  var modifier = parseFloat(RegExp.$2) * 0.01;\n  if (param === 'HP') {\n    var paramRate = 1 - user.hpRate();\n    if (nonstack) {\n      stackCheck = this._stackHpCrisis;\n      this._stackHpCrisis = true;\n    }\n  } else if (param === 'MP') {\n    var paramRate = 1 - user.mpRate();\n    if (nonstack) {\n      stackCheck = this._stackMpCrisis;\n      this._stackMpCrisis = true;\n    }\n  } else if (param === 'TP') {\n    var paramRate = 1 - user.tpRate();\n    if (nonstack) {\n      stackCheck = this._stackTpCrisis;\n      this._stackTpCrisis = true;\n    }\n  } else {\n    skip = true;\n  }\n  rate += paramRate * modifier;\n\n// -----------------\n// Target Param Rate\n// -----------------\n} else if (data.match(/(.*)[ ]HERO[ ](\\d+)([%％])/i)) {\n  var param = String(RegExp.$1).toUpperCase();\n  var modifier = parseFloat(RegExp.$2) * 0.01;\n  if (param === 'HP') {\n    var paramRate = target.hpRate();\n    if (nonstack) {\n      stackCheck = this._stackHpHero;\n      this._stackHpHero = true;\n    }\n  } else if (param === 'MP') {\n    var paramRate = target.mpRate();\n    if (nonstack) {\n      stackCheck = this._stackMpHero;\n      this._stackMpHero = true;\n    }\n  } else if (param === 'TP') {\n    var paramRate = target.tpRate();\n    if (nonstack) {\n      stackCheck = this._stackTpHero;\n      this._stackTpHero = true;\n    }\n  } else {\n    skip = true;\n  }\n  rate += paramRate * modifier;\n\n} else if (data.match(/(.*)[ ]BULLY[ ](\\d+)([%％])/i)) {\n  var param = String(RegExp.$1).toUpperCase();\n  var modifier = parseFloat(RegExp.$2) * 0.01;\n  if (param === 'HP') {\n    var paramRate = 1 - target.hpRate();\n    if (nonstack) {\n      stackCheck = this._stackHpBully;\n      this._stackHpBully = true;\n    }\n  } else if (param === 'MP') {\n    var paramRate = 1 - target.mpRate();\n    if (nonstack) {\n      stackCheck = this._stackMpBully;\n      this._stackMpBully = true;\n    }\n  } else if (param === 'TP') {\n    var paramRate = 1 - target.tpRate();\n    if (nonstack) {\n      stackCheck = this._stackTpBully;\n      this._stackTpBully = true;\n    }\n  } else {\n    skip = true;\n  }\n  rate += paramRate * modifier;\n\n// ------------\n// Element Rate\n// ------------\n} else if (data.match(/ELEMENT RATE[ ](\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackAddElementRate;\n    this._stackAddElementRate = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var eleRate = this.calcElementRate(target);\n  rate *= eleRate * modifier;\n\n// ---------------\n// State Modifiers\n// ---------------\n} else if (data.match(/USER STATES[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackUserStates;\n    this._stackUserStates = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = user.states().length;\n  rate += total * modifier;\n\n} else if (data.match(/TARGET STATES[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackTargetStates;\n    this._stackTargetStates = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = target.states().length;\n  rate += total * modifier;\n\n// --------------\n// Buff Modifiers\n// --------------\n} else if (data.match(/USER BUFFS[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackUserBuffs;\n    this._stackUserBuffs = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = user.totalBuffs();\n  rate += total * modifier;\n\n} else if (data.match(/USER DEBUFFS[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackUserDebuffs;\n    this._stackUserDebuffs = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = user.totalDebuffs();\n  rate += total * modifier;\n\n// ----------------\n// Debuff Modifiers\n// ----------------\n} else if (data.match(/TARGET BUFFS[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackTargetBuffs;\n    this._stackTargetBuffs = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = target.totalBuffs();\n  rate += total * modifier;\n\n} else if (data.match(/TARGET DEBUFFS[ ]([\\+\\-]\\d+)([%％])/i)) {\n  if (nonstack) {\n    stackCheck = this._stackTargetDebuffs;\n    this._stackTargetDebuffs = true;\n  }\n  var modifier = parseFloat(RegExp.$1) * 0.01;\n  var total = target.totalDebuffs();\n  rate += total * modifier;\n\n// -------------------------------\n// Add new effects above this line\n// -------------------------------\n} else {\n  skip = true;\n}"
 *
 */
//=============================================================================

Yanfly.PluginRequirements = function() {
  return Imported.YEP_BattleEngineCore &&
         Imported.YEP_DamageCore &&
         Imported.YEP_X_CriticalControl;
};

if (Yanfly.PluginRequirements()) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Z_CriticalSway');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LunCriSwayEffect = JSON.parse(Yanfly.Parameters['Effect Code']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LunCriSway.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LunCriSway.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Z_CriticalSway) {
    this.processLunCriSwayNotetags1($dataSkills);
    this.processLunCriSwayNotetags1($dataItems);
    this.processLunCriSwayNotetags1($dataStates);
    Yanfly._loaded_YEP_Z_CriticalSway = true;
  }
  
  return true;
};

DataManager.processLunCriSwayNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.customCriticalRates = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<CUSTOM[ ](?:CRITICAL|CRIT)[ ]RATE:[ ](.*)>/i)) {
        var data = String(RegExp.$1);
        obj.customCriticalRates.push(data);
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

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.LunCriSway.Game_Action_itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target) {
  if (!this.item().damage.critical) return 0;
  var rate = Yanfly.LunCriSway.Game_Action_itemCri.call(this, target);
  rate = this.applyCustomCriticalRates(target, rate);
  return rate;
};

Game_Action.prototype.applyCustomCriticalRates = function(target, rate) {
  var effects = [];
  effects = effects.concat(this.item().customCriticalRates);
  var states = this.subject().states();
  var length = states.length;
  for (var i = 0; i < length; ++i) {
    var state = states[i];
    if (state && state.customCriticalRates) {
      effects = effects.concat(state.customCriticalRates);
    }
  }
  var length = effects.length;
  for (var i = 0; i < length; ++i) {
    var data = effects[i];
    rate = this.customCritRateEval(target, rate, data);
  }
  return rate;
};

Game_Action.prototype.customCritRateEval = function(target, rate, data) {
  var prevRate = rate;
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

  var nonstack = data.match(/(?:NONSTACK|NON-STACK|NO STACK)/i)
  var stackCheck = false;

  var skip = false;

  var code = Yanfly.Param.LunCriSwayEffect;
  try {
    eval(code)
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'LUNATIC CUSTOM CRITICAL RATES ERROR');
  }

  if (user.isDead()) user.performCollapse();
  if (target.isDead()) target.performCollapse();
  user._result = userPreviousResult;
  target._result = targetPreviousResult;

  if (nonstack && stackCheck) skip = true;

  if (skip) {
    return prevRate
  } else {
    return rate;
  }
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

// ---------------
// User Param Rate
// ---------------
if (data.match(/(.*)[ ]PRIDE[ ](\d+)([%％])/i)) {
  var param = String(RegExp.$1).toUpperCase();
  var modifier = parseFloat(RegExp.$2) * 0.01;
  if (param === 'HP') {
    var paramRate = user.hpRate();
    if (nonstack) {
      stackCheck = this._stackHpPride;
      this._stackHpPride = true;
    }
  } else if (param === 'MP') {
    var paramRate = user.mpRate();
    if (nonstack) {
      stackCheck = this._stackMpPride;
      this._stackMpPride = true;
    }
  } else if (param === 'TP') {
    var paramRate = user.tpRate();
    if (nonstack) {
      stackCheck = this._stackTpPride;
      this._stackTpPride = true;
    }
  } else {
    skip = true;
  }
  rate += paramRate * modifier;

} else if (data.match(/(.*)[ ]CRISIS[ ](\d+)([%％])/i)) {
  var param = String(RegExp.$1).toUpperCase();
  var modifier = parseFloat(RegExp.$2) * 0.01;
  if (param === 'HP') {
    var paramRate = 1 - user.hpRate();
    if (nonstack) {
      stackCheck = this._stackHpCrisis;
      this._stackHpCrisis = true;
    }
  } else if (param === 'MP') {
    var paramRate = 1 - user.mpRate();
    if (nonstack) {
      stackCheck = this._stackMpCrisis;
      this._stackMpCrisis = true;
    }
  } else if (param === 'TP') {
    var paramRate = 1 - user.tpRate();
    if (nonstack) {
      stackCheck = this._stackTpCrisis;
      this._stackTpCrisis = true;
    }
  } else {
    skip = true;
  }
  rate += paramRate * modifier;

// -----------------
// Target Param Rate
// -----------------
} else if (data.match(/(.*)[ ]HERO[ ](\d+)([%％])/i)) {
  var param = String(RegExp.$1).toUpperCase();
  var modifier = parseFloat(RegExp.$2) * 0.01;
  if (param === 'HP') {
    var paramRate = target.hpRate();
    if (nonstack) {
      stackCheck = this._stackHpHero;
      this._stackHpHero = true;
    }
  } else if (param === 'MP') {
    var paramRate = target.mpRate();
    if (nonstack) {
      stackCheck = this._stackMpHero;
      this._stackMpHero = true;
    }
  } else if (param === 'TP') {
    var paramRate = target.tpRate();
    if (nonstack) {
      stackCheck = this._stackTpHero;
      this._stackTpHero = true;
    }
  } else {
    skip = true;
  }
  rate += paramRate * modifier;

} else if (data.match(/(.*)[ ]BULLY[ ](\d+)([%％])/i)) {
  var param = String(RegExp.$1).toUpperCase();
  var modifier = parseFloat(RegExp.$2) * 0.01;
  if (param === 'HP') {
    var paramRate = 1 - target.hpRate();
    if (nonstack) {
      stackCheck = this._stackHpBully;
      this._stackHpBully = true;
    }
  } else if (param === 'MP') {
    var paramRate = 1 - target.mpRate();
    if (nonstack) {
      stackCheck = this._stackMpBully;
      this._stackMpBully = true;
    }
  } else if (param === 'TP') {
    var paramRate = 1 - target.tpRate();
    if (nonstack) {
      stackCheck = this._stackTpBully;
      this._stackTpBully = true;
    }
  } else {
    skip = true;
  }
  rate += paramRate * modifier;

// ------------
// Element Rate
// ------------
} else if (data.match(/ELEMENT RATE[ ](\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackAddElementRate;
    this._stackAddElementRate = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var eleRate = this.calcElementRate(target);
  rate *= eleRate * modifier;

// ---------------
// State Modifiers
// ---------------
} else if (data.match(/USER STATES[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackUserStates;
    this._stackUserStates = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = user.states().length;
  rate += total * modifier;

} else if (data.match(/TARGET STATES[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackTargetStates;
    this._stackTargetStates = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = target.states().length;
  rate += total * modifier;

// --------------
// Buff Modifiers
// --------------
} else if (data.match(/USER BUFFS[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackUserBuffs;
    this._stackUserBuffs = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = user.totalBuffs();
  rate += total * modifier;

} else if (data.match(/USER DEBUFFS[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackUserDebuffs;
    this._stackUserDebuffs = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = user.totalDebuffs();
  rate += total * modifier;

// ----------------
// Debuff Modifiers
// ----------------
} else if (data.match(/TARGET BUFFS[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackTargetBuffs;
    this._stackTargetBuffs = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = target.totalBuffs();
  rate += total * modifier;

} else if (data.match(/TARGET DEBUFFS[ ]([\+\-]\d+)([%％])/i)) {
  if (nonstack) {
    stackCheck = this._stackTargetDebuffs;
    this._stackTargetDebuffs = true;
  }
  var modifier = parseFloat(RegExp.$1) * 0.01;
  var total = target.totalDebuffs();
  rate += total * modifier;

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
text += 'YEP_Z_CriticalSway without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Yanfly.PluginRequirements