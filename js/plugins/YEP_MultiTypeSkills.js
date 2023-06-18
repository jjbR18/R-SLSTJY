//=============================================================================
// Yanfly Engine Plugins - Multi-Type Skills
// YEP_MultiTypeSkills.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MultiTypeSkills = true;

var Yanfly = Yanfly || {};
Yanfly.MTS = Yanfly.MTS || {};
Yanfly.MTS.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 多技能类型★
 * @author Yanfly Engine Plugins + Tigress Collaboration
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 在RPG制造者MV中，每个技能只能指定一种技能类型。这意味着
 * 滚动时每个技能只能出现在一个技能类型库下
 * 通过技能列表。然而，在传统的RPG中，我们有时会看到技巧
 * 可以存在于多种技能类型中。一个“治愈”咒语可能出现在这两种情况下
 * “白魔法”和“红魔法”同时出现。此插件启用
 * 提供多种技能类型的可能性。
 * 
 * 这是一个由Tigress和Yanfly合作的插件，以确保兼容性
 * 使用Yanfly引擎插件库。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 将这些便签插入您希望拥有的技能便签框中
 * 多种技能类型。
 * 
 * 技能标签：
 *
 *   <Skill Type: x>
 *   <Skill Types: x, x, x>
 *   <Skill Types: x to y>
 *   - 为修改后的技能提供多个x（或y）技能类型。
 * 这将自动包括编辑器放置的技能类型。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// DataManager
// ----------------------------------------------------------------------------
// Notetags added by Yanfly
//=============================================================================

Yanfly.MTS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.MTS.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_MultiTypeSkills) {
    this.processMTSNotetags1($dataSkills);
    Yanfly._loaded_YEP_MultiTypeSkills = true;
  }
  
  return true;
};

DataManager.processMTSNotetags1 = function(group) {
  var note1 = /<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<SKILL[ ](?:TYPE|TYPES):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.skillTypes = [obj.stypeId];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.skillTypes = obj.skillTypes.concat(array);
      } else if (line.match(note2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.skillTypes = obj.skillTypes.concat(range);
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.MTS.Game_BattlerBase_msC =
  Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
  var value = Yanfly.MTS.Game_BattlerBase_msC.call(this, skill);
  if (!value) return false;
  if (skill && skill.skillTypes) {
    var length = skill.skillTypes;
    for (var n = 0; n < length; n++) {
      if (this.isSkillTypeSealed(skill.skillTypes[n])) {
        return false;
      }
    }
  }
  return true;
};

//=============================================================================
// Window_SkillList
//=============================================================================

Window_SkillList.prototype.matchSkillType = function(item) {
  if (item) {
    if (item.stypeId === this._stypeId) {
      return true;
    } else if (item.skillTypes && item.skillTypes.contains(this._stypeId)) {
      return true;
    }
  }
  return false;
};

if (Imported.YEP_SkillCore) {

Window_SkillList.prototype.includes = function(item) {
  if (this._actor) {
    if (!this._actor.noHiddenSkillConditionsMet(item)) return false;
  }
  return this.matchSkillType(item);
};

} else { // No YEP Skill Core

Window_SkillList.prototype.includes = function(item) {
  return item && this.matchSkillType(item);
};

} // Imported.YEP_SkillCore

//=============================================================================
// Utilities
// ----------------------------------------------------------------------------
// Provided by Yanfly
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
  var result = [];
  for (var i = n; i <= m; ++i) result.push(i);
  return result;
};

//=============================================================================
// End of File
//=============================================================================