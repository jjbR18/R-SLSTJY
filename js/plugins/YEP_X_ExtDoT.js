//=============================================================================
// Yanfly Engine Plugins - Buffs & States Extension - Extended Damage Over Time
// YEP_X_ExtDoT.js
//=============================================================================

if (Imported.YEP_BattleEngineCore && Imported.YEP_BuffsStatesCore) {

var Imported = Imported || {};
Imported.YEP_X_ExtDoT = true;

var Yanfly = Yanfly || {};
Yanfly.EDoT = Yanfly.EDoT || {};
Yanfly.EDoT.version = 1.03;

//=============================================================================
 /*:
 * @plugindesc v1.03 持续伤害和治疗☁️
 * @author Yanfly Engine Plugins + Tigress Collaboration
 *
 * @param ---Defaults---
 * @text ---默认值---
 * @default
 *
 * @param Regen Animation
 * @text 雨动画
 * @parent ---Defaults---
 * @type animation
 * @desc 创建重生成状态时，这将是默认动画。
*保持0不播放动画。
 * @default 46
 *
 * @param DoT Animation
 * @text 点动画
 * @type animation
 * @desc 创建点状态时，这将是默认动画。
*保持0不播放动画。
 * @default 59
 *
 * @param Default Variance
 * @text 默认方差
 * @type number
 * @desc This is the default variance value for Extended DoT formulas.
 * Leave at 0 for no variance.
 * @default 20
 *
 * @param Default Element
 * @text 默认元素
 * @type number
 * @desc This is the default element used for Extended DoT formulas.
 * Leave at 0 for no element.
 * @default 0
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要YEP\u BattleEngineCore和YEP\u BuffsStatesCore。制造
 * 确定这个插件位于YEP\u BattleEngineCore和
 * 是的，BuffsStatesCore在插件列表中。
 * 
 * RPG Maker MV不提供使用自定义公式的能力
 * 随时间的伤害或愈合状态效果。这个插件，通过
 * Yanfly的buff&amp;States核心，将允许使用公式来创建自定义
 * 随时间变化的伤害或治疗值，随时间变化的动画，变化
 * 控制和基本速率方面。
 * 
 * 这是一个由Tigress和Yanfly合作的插件，以确保兼容性
 * 使用Yanfly引擎插件库。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 将以下便签插入到您的州中，以实现各自的目标
 * 损伤随时间的影响。
 * 
 * 状态注释标签：
 *
 *    ---
 *
 *   <Regen Animation: x>
 *   <DoT Animation: x>
 *   - 这将使状态随着时间的推移播放动画x以恢复/伤害，如果
 *     随着时间的推移，通过延长的伤害造成任何治疗或伤害
 *     下面使用的公式。
 *
 *   示例：
 *     <Regen Animation: 41>  // 重新生成时播放动画41
 *     <DoT Animation: 59>    // 出现点时播放动画59
 *
 *   * 注意：只有与下列其中一项一起使用时，才会出现动画
 *                公式和公式不产生0值。
 *
 *   ---
 *
 *   <Regen Formula: x>
 *   - 这将使受影响的战斗者每回合回复x点生命。你可以
 *      使用公式或数值代替“x”。
 *
 *   示例：
 *     <Regen Formula: 100>        // 每回合回复100点生命
 *     <Regen Formula: a.mdf * 2>  // 恢复HP等于原点的MDF
 *
 *   ---
 *
 *   <DoT Formula: x>
 *   - 这将使受影响的战斗者每回合受到x点生命伤害。你可以
 *      使用公式或数值代替“x”。
 *
 *   示例：
 *     <DoT Formula: 100>        // 每回合造成100点生命
 *     <DoT Formula: a.mat * 2>  // 伤害血量等于原点的垫子
 *
 *   ---
 *
 *   <Regen Element: x>
 *   <DoT Element: x>
 *   - 这将使此状态造成的治疗/伤害成为元素“x”。
 *     这将考虑目标的基本速率
 *     那个元素。如果留空，则不存在元素修饰符。
 *
 *   示例：
 *     <Regen Element: 4>   // 治疗效果将受到元素4的影响。
 *     <DoT Element: 5>     // 造成的伤害将受到元素5的影响。
 *
 *   ---
 *
 *   <Regen Variance: x%>
 *   <DoT Variance: x%>
 *   - 希望点效果具有的方差量。将x替换为
 *     百分比值。如果为空，则插件中的设置
 *     默认情况下将使用参数。
 *
 *   示例：
 *     <Regen Variance: 10%>   // 回复将有10%的治疗方差
 *     <DoT Variance: 20%>     // DoT将有20%的伤害差异
 *
 * ============================================================================
 * 疯狂模式-自定义点公式
 * ============================================================================
 *
 * For those with JavaScript experience and would like to create more complex
 * formulas for custom damage/healing over time states, you can use these
 * following notetags below.
 *
 * State Notetags:
 *
 *   ---
 *
 *   <Custom DoT Formula>
 *    if (a.isActor()) {
 *      value = a.level * 100;
 *      variance = 20;
 *      element = 1;
 *    } else {
 *      value = a.hp / 50;
 *      variance = 10;
 *      element = 2;
 *    }
 *   </Custom DoT Formula>
 *   - The damage to be dealt will be equal to the 'value'. This is the base
 *   damage dealt primarily by the formula alone. The finalized damage to be
 *   dealt will be affected by the 'variance' and 'element' values, which can
 *   be changed within this formula, too. If 'variance' or 'element' are left
 *   out of the formula, they will take on their default values. If you are
 *   going to make a healing effect, use the notetag below this one.
 *
 *   ---
 *
 *   <Custom Regen Formula>
 *    if (a.isActor()) {
 *      value = a.level * 8;
 *      variance = 15;
 *      element = 3;
 *    } else {
 *      value = a.hp / 2;
 *      variance = 5;
 *      element = 4;
 *    }
 *   </Custom Regen Formula>
 *   - The healing to be dealt will be equal to the 'value'. This is the base
 *   heal dealt primarily by the formula alone. The finalized healing to be
 *   dealt will be affected by the 'variance' and 'element' values, which can
 *   be changed within this formula, too. If 'variance' or 'element' are left
 *   out of the formula, they will take on their default values. If you are
 *   going to make a damaging effect, use the notetag above this one.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.6.1.
 *
 * Version 1.02:
 * - Made DoT effects battle only to prevent errors and crashes.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ExtDoT');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EDoTRegenAni = Number(Yanfly.Parameters['Regen Animation']);
Yanfly.Param.EDoTDamageAni = Number(Yanfly.Parameters['DoT Animation']);
Yanfly.Param.EDoTDefVariance = Number(Yanfly.Parameters['Default Variance']);
Yanfly.Param.EDoTDefElement = Number(Yanfly.Parameters['Default Element']);

//=============================================================================
// DataManager
// ----------------------------------------------------------------------------
// Notetags added by Yanfly
//=============================================================================

Yanfly.EDoT.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.EDoT.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ExtDoT) {
    this.processEDoTNotetags1($dataStates);
    Yanfly._loaded_YEP_X_ExtDoT = true;
  }
  
  return true;
};

DataManager.processEDoTNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.dotAnimation = 0;
    obj.dotElement = Yanfly.Param.EDoTDefElement;
    obj.dotVariance = Yanfly.Param.EDoTDefVariance;
    var evalMode = 'none';
    obj.dotFormula = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:REGEN|DOT) ANIMATION:[ ](\d+)>/i)) {
        obj.dotAnimation = parseInt(RegExp.$1);
      } else if (line.match(/<(?:REGEN|REGENERATE) FORMULA:[ ](.*)>/i)) {
        var formula = String(RegExp.$1);
        obj.dotFormula = 'value = Math.max(0, ' + formula + ');\n';
        obj.dotFormula += 'healing = true;'
        if (obj.dotAnimation === 0) {
          obj.dotAnimation = Yanfly.Param.EDoTRegenAni;
        }
      } else if (line.match(/<(?:DOT|DAMAGE OVER TIME) FORMULA:[ ](.*)>/i)) {
        var formula = String(RegExp.$1);
        obj.dotFormula = 'value = Math.max(0, ' + formula + ');\n';
        obj.dotFormula += 'healing = false;'
        if (obj.dotAnimation === 0) {
          obj.dotAnimation = Yanfly.Param.EDoTDamageAni;
        }
      } else if (line.match(/<(?:REGEN|DOT) VARIANCE:[ ](\d+)([%％])>/i)) {
        obj.dotVariance = parseInt(RegExp.$1);
      } else if (line.match(/<(?:REGEN|DOT) ELEMENT:[ ](\d+)>/i)) {
        obj.dotElement = parseInt(RegExp.$1);
      } else if (line.match(/<(?:CUSTOM REGEN FORMULA)>/i)) {
        evalMode = 'custom dot formula';
      } else if (line.match(/<\/(?:CUSTOM REGEN FORMULA)>/i)) {
        obj.dotFormula += 'healing = true';
        evalMode = 'none';
      } else if (line.match(/<(?:CUSTOM DOT FORMULA)>/i)) {
        evalMode = 'custom dot formula';
      } else if (line.match(/<\/(?:CUSTOM DOT FORMULA)>/i)) {
        obj.dotFormula += 'healing = false';
        evalMode = 'none';
      } else if (evalMode === 'custom dot formula') {
        obj.dotFormula += line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_Battler
// ----------------------------------------------------------------------------
// Compatibility with YEP_BuffsStatesCore
//=============================================================================

Yanfly.EDoT.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
  if (this.isAlive() && $gameParty.inBattle()) {
    this.processDamageOverTimeStates();
  }
  Yanfly.EDoT.Game_Battler_regenerateAll.call(this);
};

Game_Battler.prototype.processDamageOverTimeStates = function() {
  if (!$gameParty.inBattle()) return;
  var result = JsonEx.makeDeepCopy(this._result);
  var states = this.states();
  while (states.length > 0) {
    var state = states.shift();
    if (state) {
      this.processDamageOverTimeStateEffect(state);
    }
  }
  this._result = result;
};

Game_Battler.prototype.processDamageOverTimeStateEffect = function(state) {
  var stateId = state.id;
  var state = $dataStates[stateId];
  if (!state) return;
  if (state.dotFormula === '') return;
  var a = this.stateOrigin(stateId);
  var b = this;
  var user = this;
  var target = this;
  var origin = this.stateOrigin(stateId);
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var healing = false;
  var variance = state.dotVariance;
  var element = state.dotElement;
  var code = state.dotFormula;
  try {
    eval(code);
    if (healing) {
      value = Math.abs(Math.max(0, value));
    } else {
      value = Math.abs(Math.max(0, value)) * -1;
    }
    value = this.applyDamageOverTimeVariance(value, variance);
    value = this.applyDamageOverTimeElement(value, element);
    value = Math.round(value);
    if (value !== 0) {
      this.clearResult();
      this.gainHp(value);
      this.startDamagePopup();
      if (state.dotAnimation > 0) {
        this.startAnimation(state.dotAnimation);
      }
      if (this.isDead()) {
        this.performCollapse();
      }
      this.clearResult();
    }
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM DOT ' + stateId + ' CODE ERROR');
  }
};

Game_Battler.prototype.applyDamageOverTimeVariance = function(damage, vari) {
  if (vari === 0) return damage;
  var variance = vari;
  var amp = Math.floor(Math.max(Math.abs(damage) * variance / 100, 0));
  var v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;
  return damage >= 0 ? damage + v : damage - v;
};

Game_Battler.prototype.applyDamageOverTimeElement = function(damage, element) {
  if (element === 0) return damage;
  return damage * this.elementRate(element);
};

//=============================================================================
// Utilities
// ----------------------------------------------------------------------------
// From Yanfly's Utility Library
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
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_ExtDoT requires YEP_BattleEngineCore and ';
text += 'YEP_BuffsStatesCoreto be at the latest version to run properly. '
text += '\n\nPlease go to www.yanfly.moe and update to the latest version for ';
text += 'the YEP_BattleEngineCore and YEP_BuffsStatesCore plugins.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_BuffsStatesCore