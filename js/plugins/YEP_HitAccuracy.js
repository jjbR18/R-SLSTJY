//=============================================================================
// Yanfly Engine Plugins - Hit Accuracy
// YEP_HitAccuracy.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_HitAccuracy = true;

var Yanfly = Yanfly || {};
Yanfly.HA = Yanfly.HA || {};
Yanfly.HA.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 命中率☁️
 * @author Yanfly Engine Plugins
 *
 * @param ---公式---
 * @default
 *
 * @param Accuracy Formula
 * @text 精度公式
 * @desc 用于确定技能命中率的公式.
 * Variables: skillHitRate, userHitRate, targetEvadeRate
 * @default skillHitRate * (userHitRate - targetEvadeRate)
 *
 * @param Evade Formula
 * @text 闪避公式
 * @desc 用于确定技能是否被闪避的公式.
 * Variables: skillHitRate, userHitRate, targetEvadeRate
 * @default 0
 *
 * @param ---用户命中率---
 * @default
 *
 * @param User Physical Hit
 * @text 用户物理命中
 * @desc 用于确定玩家物理攻击命中率的公式
 * @default user.hit
 *
 * @param User Magical Hit
 * @text 用户魔法命中
 * @desc 用于确定用玩家技能命中率的公式
 * @default 1.00
 *
 * @param User Certain Hit
 * @text 用户命中率
 * @desc 用于玩家某些命中攻击的命中率的公式.
 * @default 1.00
 *
 * @param ---目标闪避率---
 * @default
 *
 * @param Target Physical Evade
 * @text 目标物理闪避
 * @desc 用于确定目标对物理攻击的闪避率的公式
 * @default target.eva
 *
 * @param Target Magical Evade
 * @text 目标魔法闪避
 * @desc 用于确定目标对技能的闪避避率的公式
 * @default target.mev
 *
 * @param Target Certain Evade
 * @text 目标闪避率
 * @desc 用于确定目标对某些命中动作的躲闪率的公式。
 * @default 0.00
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 默认来说，MC的行动公式是繁杂的，我们将先验证技能精准性，在验证目标躲避率
 * 。这意味着即使玩家拥有1000%的伤害精准，技能仍然有可能被5%的躲避率躲避。
 * 这个插件提供了行动精准公式的调整。在插件默认设置里面，精准性将会被更简便
 * 的公式计算
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * 这个插件是即插即用。但是，如果你想调整你想要的公式，可以调整插件参数
 *
 * skillHitRate - 技能成功率.
 *
 * userHitRate - This is the accuracy rate of the user. If it's a physical
 * action, by default, HIT is used. If it's a magical action, by default, there
 * will be a 100% modifier from it, meaning it doesn't行动成功率
 *
 * targetEvadeRate - This is the evasion rate of the target. If it's a physical
 * action, the EVA stat is used by default. If it's a magical action, the MEV
 * stat is 目标躲避率
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.01:
 * - Made a correction to the calculation of the skillhitrate so that it's a
 * proper float value instead.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_HitAccuracy');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.HAHitFormula = String(Yanfly.Parameters['Accuracy Formula']);
Yanfly.Param.HAEvaFormula = String(Yanfly.Parameters['Evade Formula']);

Yanfly.Param.HAUserPhysical = String(Yanfly.Parameters['User Physical Hit']);
Yanfly.Param.HAUserMagical = String(Yanfly.Parameters['User Magical Hit']);
Yanfly.Param.HAUserCertain = String(Yanfly.Parameters['User Certain Hit']);

Yanfly.Param.HATarPhysical = String(Yanfly.Parameters['Target Physical Evade']);
Yanfly.Param.HATarMagical = String(Yanfly.Parameters['Target Magical Evade']);
Yanfly.Param.HATarCertain = String(Yanfly.Parameters['Target Certain Evade']);

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.itemHit = function(target) {
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var skillHitRate = this.item().successRate * 0.01;
    var userHitRate = this.userHitRate(target);
    var targetEvadeRate = this.targetEvadeRate(target);
    var code = Yanfly.Param.HAHitFormula;
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM HIT FORMULA ERROR');
      return false;
    }
};

Game_Action.prototype.itemEva = function(target) {
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var skillHitRate = this.item().successRate * 0.01;
    var userHitRate = this.userHitRate(target);
    var targetEvadeRate = this.targetEvadeRate(target);
    var code = Yanfly.Param.HAEvaFormula;
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM EVA FORMULA ERROR');
      return false;
    }
};

Game_Action.prototype.userHitRate = function(target) {
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (this.isPhysical()) {
      var code = Yanfly.Param.HAUserPhysical;
    } else if (this.isMagical()) {
      var code = Yanfly.Param.HAUserMagical;
    } else {
      var code = Yanfly.Param.HAUserCertain;
    }
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM HIT RATE FORMULA ERROR');
      return 0;
    }
};

Game_Action.prototype.targetEvadeRate = function(target) {
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    if (this.isPhysical()) {
      var code = Yanfly.Param.HATarPhysical;
    } else if (this.isMagical()) {
      var code = Yanfly.Param.HATarMagical;
    } else {
      var code = Yanfly.Param.HATarCertain;
    }
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM EVA RATE FORMULA ERROR');
      return 0;
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
// End of File
//=============================================================================
