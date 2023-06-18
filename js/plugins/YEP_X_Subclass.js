//=============================================================================
// Yanfly Engine Plugins - Class Change Core Extension - Subclass
// YEP_X_Subclass.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_Subclass = true;

var Yanfly = Yanfly || {};
Yanfly.Subclass = Yanfly.Subclass || {};
Yanfly.Subclass.version = 1.11

//=============================================================================
 /*:
 * @plugindesc v1.11 副职业系统(已翻译)
 * @author Yanfly Engine Plugins
 *
 * @param ---Class Menu---
 * @text 副职业命令窗口
 * @default
 *
 * @param Subclass Command
 * @text 副职业命令文本
 * @parent ---Class Menu---
 * @default 副职业
 *
 * @param Show Command
 * @text 显示副职业命令
 * @parent ---Class Menu---
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 *
 * @param Enable Command
 * @text 启用副职业命令
 * @parent ---Class Menu---
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 *
 * @param Name Format
 * @text 名称文本格式
 * @parent ---Class Menu---
 * @desc 显示主职业/副职业文本格式
 * %1-主职业     %2-副职业
 * @default %1/%2
 *
 * @param Subclass Color
 * @text 当前副职业文本颜色
 * @parent ---Class Menu---
 * @type number
 * @min 0
 * @max 31
 * @desc 角色当前副职业的文本颜色
 * @default 5
 *
 * @param ---Parameters---
 * @text 参数
 * @default
 *
 * @param MaxHP
 * @text MHP增加比率
 * @parent ---Parameters---
 * @desc 拥有副职业后MHP增加比率(1+x) 默认x=0.1
 * @default 0.10
 *
 * @param MaxMP
 * @text MMP增加比率
 * @parent ---Parameters---
 * @type number
 * @decimals 2
 * @min 0
 * @desc 拥有副职业后MMP增加比率(1+x) 默认x=0.1
 * @default 0.10
 *
 * @param ATK
 * @text ATK增加比率
 * @parent ---Parameters---
 * @type number
 * @decimals 2
 * @min 0
 * @desc 拥有副职业后ATK增加比率(1+x) 默认x=0.2
 * @default 0.20
 *
 * @param DEF
 * @text DEF增加比率
 * @parent ---Parameters---
 * @type number
 * @decimals 2
 * @min 0
 * @desc 拥有副职业后DEF增加比率(1+x) 默认x=0.2
 * @default 0.20
 *
 * @param MAT
 * @text MAT增加比率
 * @parent ---Parameters---
 * @type number
 * @decimals 2
 * @min 0
 * @desc 拥有副职业后MAT增加比率(1+x) 默认x=0.2
 * @default 0.20
 *
 * @param MDF
 * @text MDF增加比率
 * @parent ---Parameters---
 * @type number
 * @decimals 2
 * @min 0
 * @desc 拥有副职业后MDF增加比率(1+x) 默认x=0.2
 * @default 0.20
 *
 * @param AGI
 * @text AGI增加比率
 * @parent ---Parameters---
 * @type number
 * @decimals 2
 * @min 0
 * @desc 拥有副职业后AGI增加比率(1+x) 默认x=0.2
 * @default 0.20
 *
 * @param LUK
 * @text LUK增加比率
 * @parent ---Parameters---
 * @type number
 * @decimals 2
 * @min 0
 * @desc 拥有副职业后LUK增加比率(1+x) 默认x=0.2
 * @default 0.20
 *
 * @param EXP
 * @text EXP增加比率
 * @parent ---Parameters---
 * @type number
 * @decimals 2
 * @min 0
 * @desc 拥有副职业后EXP增加比率(1+x) 默认x=0.25
 * @default 0.25
 *
 * @param JP
 * @text JP增加比率
 * @parent ---Parameters---
 * @type number
 * @decimals 2
 * @min 0
 * @desc 拥有副职业后JP增加比率(1+x) 默认x=0.25
 * @default 0.25
 *
 * @param ---Traits---
 * @text 特征继承
 * @default
 *
 * @param Skill Types
 * @text 继承技能类型
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承技能类型
 * @default true
 *
 * @param Added Skills
 * @text 继承技能
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承学习的技能
 * @default true
 *
 * @param Param Rates
 * @text 继承通常能力值
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承通常能力值
 * @default false
 *
 * @param X-Param Values
 * @text 继承追加能力值
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承追加能力值
 * @default false
 *
 * @param S-Param Rates
 * @text 继承特殊能力值
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承特殊能力值
 * @default false
 *
 * @param Element Rates
 * @text 继承元素承受率
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承元素承受率
 * @default false
 *
 * @param Debuff Rates
 * @text 继承弱化有效率
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承弱化有效率
 * @default false
 *
 * @param State Rates
 * @text 继承状态有效率
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承状态有效率
 * @default false
 *
 * @param State Resist
 * @text 继承状态免疫
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承状态免疫
 * @default false
 *
 * @param Attack Element
 * @text 继承攻击时元素
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承攻击时元素
 * @default false
 *
 * @param Attack State
 * @text 继承攻击时状态
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承攻击时状态
 * @default false
 *
 * @param Weapons
 * @text 继承武器类型
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承装备的武器类型
 * @default false
 *
 * @param Armors
 * @text 继承护甲类型
 * @parent ---Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 从副职业继承装备的护甲类型
 * @default false
 *
 * @help
 * 插件更新:yanfly.moe/plugins/en/YEP_X_Subclass.js
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 确保该插件在插件列表中位于YEP_ClassChangeCore下方
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 角色备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 该角色默认的副职业设置为x
 * <Subclass: x>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 可以防止该角色变更副职业,这可以从插件命令中撤消
 * <Cannot Change Subclass>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 该角色不能选择主职业x
 * <Restrict Class: x>
 * <Restrict Class: x, x, x>
 * <Restrict Class: x to y>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 该角色不能选择副职业x
 * <Restrict Subclass: x>
 * <Restrict Subclass: x, x, x>
 * <Restrict Subclass: x to y>
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 职业备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 该职业只可以作为主职业
 * <Primary Only>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 该职业只可以作为副职业
 * <Subclass Only>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 如果该职业是主职业,并且副职业是x,则职业的名称将会显示为y
 * 例如职业组合是武士/魔法师,可以显示为魔剑士
 * <Subclass x Combo Name: y>
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 技能/道具备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 该技能/道具只可以被主职业x使用,对敌人无效
 * 不满足条件时,如果是技能则处于禁用状态,如果是道具,则处于隐藏状态
 * <Require Class: x>
 * <Require Class: x, x, x>
 * <Require Class: x to y>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 该技能/道具只可以被副职业x使用,对敌人无效
 * 不满足条件时,如果是技能则处于禁用状态,如果是道具,则处于隐藏状态
 * <Require Subclass: x>
 * <Require Subclass: x, x, x>
 * <Require Subclass: x to y>
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 插件命令:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 在职业菜单中显示/隐藏副职业命令
 * ShowSubclass
 * HideSubclass
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 在职业菜单中启用/禁用副职业命令
 * EnableSubclass
 * DisableSubclass
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 该角色x的副职业变更为职业y,用0替代y则移除角色x的副职业
 * ChangeSubclass x y
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 启用/禁用角色x变更副职业
 * EnableSubclassChange x
 * DisableSubclassChange x
 */
//=============================================================================

if (Imported.YEP_ClassChangeCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_Subclass');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SubclassCmd = String(Yanfly.Parameters['Subclass Command']);
Yanfly.Param.SubclassShowCmd = String(Yanfly.Parameters['Show Command']);
Yanfly.Param.SubclassEnableCmd = String(Yanfly.Parameters['Enable Command']);
Yanfly.Param.SubclassFmt = String(Yanfly.Parameters['Name Format']);
Yanfly.Param.SubclassColor = Number(Yanfly.Parameters['Subclass Color']);

Yanfly.Subclass.Param = {};
Yanfly.Subclass.Param[0] = Number(Yanfly.Parameters['MaxHP']);
Yanfly.Subclass.Param[1] = Number(Yanfly.Parameters['MaxMP']);
Yanfly.Subclass.Param[2] = Number(Yanfly.Parameters['ATK']);
Yanfly.Subclass.Param[3] = Number(Yanfly.Parameters['DEF']);
Yanfly.Subclass.Param[4] = Number(Yanfly.Parameters['MAT']);
Yanfly.Subclass.Param[5] = Number(Yanfly.Parameters['MDF']);
Yanfly.Subclass.Param[6] = Number(Yanfly.Parameters['AGI']);
Yanfly.Subclass.Param[7] = Number(Yanfly.Parameters['LUK']);
Yanfly.Param.SubclassExp = Number(Yanfly.Parameters['EXP']);
Yanfly.Param.SubclassJp = Number(Yanfly.Parameters['JP']);

Yanfly.Param.SubclassSType = eval(String(Yanfly.Parameters['Skill Types']));
Yanfly.Param.SubParamRates = eval(String(Yanfly.Parameters['Param Rates']));
Yanfly.Param.SubXParamVal = eval(String(Yanfly.Parameters['X-Param Values']));
Yanfly.Param.SubSParamRates = eval(String(Yanfly.Parameters['S-Param Rates']));
Yanfly.Param.SubSEleRates = eval(String(Yanfly.Parameters['Element Rates']));
Yanfly.Param.SubDebuffRates = eval(String(Yanfly.Parameters['Debuff Rates']));
Yanfly.Param.SubStateRates = eval(String(Yanfly.Parameters['Debuff Rates']));
Yanfly.Param.SubStateRes = eval(String(Yanfly.Parameters['State Resist']));
Yanfly.Param.SubAttackEle = eval(String(Yanfly.Parameters['Attack Element']));
Yanfly.Param.SubAttackState = eval(String(Yanfly.Parameters['Attack State']));
Yanfly.Param.SubAddedSkills = eval(String(Yanfly.Parameters['Added Skills']));
Yanfly.Param.SubclassWeapons = eval(String(Yanfly.Parameters['Weapons']));
Yanfly.Param.SubclassArmors = eval(String(Yanfly.Parameters['Armors']));

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Subclass.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Subclass.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_Subclass) {
    DataManager.processSubclassNotetags1($dataActors);
    DataManager.processSubclassNotetags2($dataClasses);
    DataManager.processSubclassNotetags3($dataSkills);
    DataManager.processSubclassNotetags3($dataItems);
    Yanfly._loaded_YEP_X_Subclass = true;
  }
  return true;
};

DataManager.processSubclassNotetags1 = function(group) {
  var note1a = /<(?:RESTRICT CLASS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note1b = /<(?:RESTRICT CLASS):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note2a = /<(?:RESTRICT SUBCLASS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2b = /<(?:RESTRICT SUBCLASS):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note3 = /<(?:CANNOT CHANGE SUBCLASS|CANT CHANGE SUBCLASS)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.subclassId = 0;
    obj.restrictClassChange = [];
    obj.restrictSubclassChange = [];
    obj.canChangeSubclass = true;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:SUBCLASS):[ ](\d+)>/i)) {
        obj.subclassId = parseInt(RegExp.$1);
      } else if (line.match(note1a)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.restrictClassChange = obj.restrictClassChange.concat(array);
      } else if (line.match(note1b)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.restrictClassChange = obj.restrictClassChange.concat(range);
      } else if (line.match(note2a)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.restrictSubclassChange = obj.restrictSubclassChange.concat(array);
      } else if (line.match(note2b)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.restrictSubclassChange = obj.restrictSubclassChange.concat(range);
      } else if (line.match(note3)) {
        obj.canChangeSubclass = false;
      }
    }
  }
};

DataManager.processSubclassNotetags2 = function(group) {
  var note1a = /<(?:SUBCLASS)[ ](\d+)[ ](?:COMBO NAME):[ ](.*)>/i;
  var note1b = /<(.*)[ ](?:COMBO NAME):[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.primaryAllowed = true;
    obj.subclassAllowed = true;
    obj.subclassComboName = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:PRIMARY ONLY)>/i)) {
        obj.primaryAllowed = true;
        obj.subclassAllowed = false;
      } else if (line.match(/<(?:SUBCLASS ONLY)>/i)) {
        obj.primaryAllowed = false;
        obj.subclassAllowed = true;
      } else if (line.match(note1a)) {
        var classId = parseInt(RegExp.$1);
        var className = String(RegExp.$2);
        obj.subclassComboName[classId] = className;
      } else if (line.match(note1b)) {
        var name = String(RegExp.$1).toUpperCase();
        var className = String(RegExp.$2);
        var classId = Yanfly.ClassIdRef[name];
        if (classId) obj.subclassComboName[classId] = className;
      }
    }
  }
};

DataManager.processSubclassNotetags3 = function(group) {
  var note1a = /<(?:REQUIRE CLASS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note1b = /<(?:REQUIRE CLASS):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note2a = /<(?:REQUIRE SUBCLASS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2b = /<(?:REQUIRE SUBCLASS):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.requiredClasses = [];
    obj.requiredSubclasses = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1a)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.requiredClasses = obj.requiredClasses.concat(array);
      } else if (line.match(note1b)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.requiredClasses = obj.requiredClasses.concat(range);
      } else if (line.match(note2a)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.requiredSubclasses = obj.requiredSubclasses.concat(array);
      } else if (line.match(note2b)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.requiredSubclasses = obj.requiredSubclasses.concat(range);
      }
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Subclass.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.Subclass.Game_System_initialize.call(this);
    this.initSubclasses();
};

Game_System.prototype.initSubclasses = function() {
    this._showSubclass = eval(Yanfly.Param.SubclassShowCmd);
    this._enableSubclass = eval(Yanfly.Param.SubclassEnableCmd);
};

Game_System.prototype.isShowSubclass = function() {
    if (this._showSubclass === undefined) this.initSubClasses();
    return this._showSubclass;
};

Game_System.prototype.isEnableSubclass = function() {
    if (this._enableSubclass === undefined) this.initSubClasses();
    return this._enableSubclass;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.piSubclassTraits = function(code, id) {
  if (!this.subclass()) return 1;
  var r = 1;
  for (var i = 0; i < this.subclass().traits.length; ++i) {
    var trait = this.subclass().traits[i];
    if (trait.code !== code) continue;
    if (trait.dataId !== id) continue;
    r *= trait.value;
  }
  return r;
};

Game_BattlerBase.prototype.sumSubclassTraits = function(code, id) {
  if (!this.subclass()) return 0;
  var r = 0;
  for (var i = 0; i < this.subclass().traits.length; ++i) {
    var trait = this.subclass().traits[i];
    if (trait.code !== code) continue;
    if (trait.dataId !== id) continue;
    r += trait.value;
  }
  return r;
};

Game_BattlerBase.prototype.addSubclassTraitSet = function(array, code) {
  if (!this.subclass()) return array;
  for (var i = 0; i < this.subclass().traits.length; ++i) {
    var trait = this.subclass().traits[i];
    if (trait.code === code) array.push(trait.dataId);
  }
  return array;
};

Yanfly.Subclass.Game_BattlerBase_addedSkillTypes =
    Game_BattlerBase.prototype.addedSkillTypes;
Game_BattlerBase.prototype.addedSkillTypes = function() {
  var array = Yanfly.Subclass.Game_BattlerBase_addedSkillTypes.call(this);
  if (this.isActor() && Yanfly.Param.SubclassSType) {
    this.addSubclassTraitSet(array, Game_BattlerBase.TRAIT_STYPE_ADD);
  }
  return array.filter(Yanfly.Util.onlyUnique);
};

Yanfly.Subclass.Game_BattlerBase_paramRate = 
    Game_BattlerBase.prototype.paramRate;
Game_BattlerBase.prototype.paramRate = function(paramId) {
  var rate = Yanfly.Subclass.Game_BattlerBase_paramRate.call(this, paramId);
  if (this.isActor() && Yanfly.Param.SubParamRates) {
    rate *= this.piSubclassTraits(Game_BattlerBase.TRAIT_PARAM, paramId);
  }
  return rate;
};

Yanfly.Subclass.Game_BattlerBase_xparam = Game_BattlerBase.prototype.xparam;
Game_BattlerBase.prototype.xparam = function(xparamId) {
  var value = Yanfly.Subclass.Game_BattlerBase_xparam.call(this, xparamId);
  if (this.isActor() && Yanfly.Param.SubXParamVal) {
    value += this.sumSubclassTraits(Game_BattlerBase.TRAIT_XPARAM, xparamId);
  }
  return value;
};

Yanfly.Subclass.Game_BattlerBase_sparam = Game_BattlerBase.prototype.sparam;
Game_BattlerBase.prototype.sparam = function(sparamId) {
  var rate = Yanfly.Subclass.Game_BattlerBase_sparam.call(this, sparamId);
  if (this.isActor() && Yanfly.Param.SubSParamRates) {
    rate *= this.piSubclassTraits(Game_BattlerBase.TRAIT_SPARAM, sparamId);
  }
  return rate;
};

Yanfly.Subclass.Game_BattlerBase_elementRate =
    Game_BattlerBase.prototype.elementRate;
Game_BattlerBase.prototype.elementRate = function(eleId) {
  var rate = Yanfly.Subclass.Game_BattlerBase_elementRate.call(this, eleId);
  if (this.isActor() && Yanfly.Param.SubSEleRates) {
    rate *= this.piSubclassTraits(Game_BattlerBase.TRAIT_ELEMENT_RATE, eleId);
  }
  return rate;
};

Yanfly.Subclass.Game_BattlerBase_debuffRate =
    Game_BattlerBase.prototype.debuffRate;
Game_BattlerBase.prototype.debuffRate = function(paramId) {
  var rate = Yanfly.Subclass.Game_BattlerBase_debuffRate.call(this, paramId);
  if (this.isActor() && Yanfly.Param.SubDebuffRates) {
    rate *= this.piSubclassTraits(Game_BattlerBase.TRAIT_DEBUFF_RATE, paramId);
  }
  return rate;
};

Yanfly.Subclass.Game_BattlerBase_stateRate =
    Game_BattlerBase.prototype.stateRate;
Game_BattlerBase.prototype.stateRate = function(stateId) {
  var rate = Yanfly.Subclass.Game_BattlerBase_stateRate.call(this, stateId);
  if (this.isActor() && Yanfly.Param.SubStateRates) {
    rate *= this.piSubclassTraits(Game_BattlerBase.TRAIT_STATE_RATE, stateId);
  }
  return rate;
};

Yanfly.Subclass.Game_BattlerBase_stateResistSet =
    Game_BattlerBase.prototype.stateResistSet;
Game_BattlerBase.prototype.stateResistSet = function() {
    var array = Yanfly.Subclass.Game_BattlerBase_stateResistSet.call(this);
    if (this.isActor() && Yanfly.Param.SubStateRes) {
      this.addSubclassTraitSet(array, Game_BattlerBase.TRAIT_STATE_RESIST);
    }
    return array;
};

Yanfly.Subclass.Game_BattlerBase_attackElements =
    Game_BattlerBase.prototype.attackElements;
Game_BattlerBase.prototype.attackElements = function() {
    var array = Yanfly.Subclass.Game_BattlerBase_attackElements.call(this);
    if (this.isActor() && Yanfly.Param.SubAttackEle) {
      this.addSubclassTraitSet(array, Game_BattlerBase.TRAIT_ATTACK_ELEMENT);
    }
    return array;
};

Yanfly.Subclass.Game_BattlerBase_attackStates =
    Game_BattlerBase.prototype.attackStates;
Game_BattlerBase.prototype.attackStates = function() {
    var array = Yanfly.Subclass.Game_BattlerBase_attackStates.call(this);
    if (this.isActor() && Yanfly.Param.SubAttackState) {
      this.addSubclassTraitSet(array, Game_BattlerBase.TRAIT_ATTACK_STATE);
    }
    return array;
};

Yanfly.Subclass.Game_BattlerBase_addedSkills =
    Game_BattlerBase.prototype.addedSkills;
Game_BattlerBase.prototype.addedSkills = function() {
    var array = Yanfly.Subclass.Game_BattlerBase_addedSkills.call(this);
    if (this.isActor() && Yanfly.Param.SubAddedSkills) {
      this.addSubclassTraitSet(array, Game_BattlerBase.TRAIT_SKILL_ADD);
    }
    return array;
};

Yanfly.Subclass.Game_BattlerBase_Wtype =
    Game_BattlerBase.prototype.isEquipWtypeOk;
Game_BattlerBase.prototype.isEquipWtypeOk = function(wtypeId) {
    var value = Yanfly.Subclass.Game_BattlerBase_Wtype.call(this, wtypeId);
    if (value) return true;
    var array = [];
    if (this.isActor() && Yanfly.Param.SubclassWeapons) {
      this.addSubclassTraitSet(array, Game_BattlerBase.TRAIT_EQUIP_WTYPE);
    }
    return array.contains(wtypeId);
};

Yanfly.Subclass.Game_BattlerBase_Atype =
    Game_BattlerBase.prototype.isEquipAtypeOk;
Game_BattlerBase.prototype.isEquipAtypeOk = function(atypeId) {
    var value = Yanfly.Subclass.Game_BattlerBase_Atype.call(this, atypeId);
    if (value) return true;
    var array = [];
    if (this.isActor() && Yanfly.Param.SubclassArmors) {
      this.addSubclassTraitSet(array, Game_BattlerBase.TRAIT_EQUIP_ATYPE);
    }
    return array.contains(atypeId);
};

Yanfly.Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
Game_BattlerBase.prototype.canUse = function(item) {
    if (!item) return false;
    if (this.isActor()) {
      if (!this.meetsClassCanUseRequirements(item)) return false;
    }
    return Yanfly.Game_BattlerBase_canUse.call(this, item);
};

Game_BattlerBase.prototype.meetsClassCanUseRequirements = function(item) {
    if (item.requiredClasses && item.requiredClasses.length > 0) {
      if (!item.requiredClasses.contains(this._classId)) return false;
    }
    if (item.requiredSubclasses && item.requiredSubclasses.length > 0) {
      if (!this.subclass()) return false;
      if (!item.requiredSubclasses.contains(this._subclassId)) return false;
    };
    return true;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Subclass.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.Subclass.Game_Actor_setup.call(this, actorId);
    this.initSubclasses();
};

Game_Actor.prototype.initSubclasses = function() {
    if (this.actor().subclassId === this._classId) return;
    this.setSubclass(this.actor().subclassId);
    if (this._subclassId > 0) this.unlockClass(this._subclassId);
};

Game_Actor.prototype.subclass = function() {
    if (this._subclassId === undefined) this.initSubclasses();
    return $dataClasses[this._subclassId];
};

Game_Actor.prototype.className = function() {
    if (!this.subclass()) {
      if (this.currentClass().useNickname) {
        return this.nickname();
      } else {
        return this.currentClass().name;
      }
    }
    if (this.currentClass().subclassComboName[this._subclassId]) {
      var text = this.currentClass().subclassComboName[this._subclassId];
    } else {
      var name1 = this.currentClass().name;
      if (this.currentClass().useNickname) {
        name1 = this.nickname();
      }
      var name2 = this.subclass().name;
      if (this.subclass().useNickname) {
        name2 = this.nickname();
      }
      var fmt = Yanfly.Param.SubclassFmt;
      var text = fmt.format(name1, name2);
    }
    return text;
};

Yanfly.Subclass.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    if (this._subclassId === classId) this._subclassId = 0;
    Yanfly.Subclass.Game_Actor_changeClass.call(this, classId, keepExp);
};

Game_Actor.prototype.setSubclass = function(classId) {
    if (this._classId === classId) return;
    this.unlockClass(classId);
    this._subclassId = classId;
    this.refresh();
};

Game_Actor.prototype.changeSubclass = function(classId) {
    if (this._classId === classId) return;
    this.unlockClass(classId);
    if (this._subclassId === classId) classId = 0;
    this.setSubclass(classId);
};

Yanfly.Subclass.Game_Actor_paramBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
    var value = Yanfly.Subclass.Game_Actor_paramBase.call(this, paramId);
    value += Math.floor(this.subclassParamBase(paramId));
    return value;
};

Game_Actor.prototype.subclassParamBase = function(paramId) {
    if (!this.subclass()) return 0;
    var rate = Yanfly.Subclass.Param[paramId];
    if (!rate) return 0;
    if (this.subclass().baseParamFormula) {
      var formula = this.subclass().baseParamFormula[paramId];
      if (formula !== '') {
        return this.classBaseParamFormula(formula, paramId) * rate;
      }
    }
    var level = this.classLevel(this._subclassId);
    if (level > 99) {
      var i = this.subclass().params[paramId][99];
      var j = this.subclass().params[paramId][98];
      i += (i - j) * (level - 99);
      var value = i;
    } else {
      var value = this.subclass().params[paramId][level];
    }
    return value * rate;
};

Game_Actor.prototype.restrictClassChange = function(classId) {
    return this.actor().restrictClassChange.contains(classId);
};

Game_Actor.prototype.restrictSubclassChange = function(classId) {
    return this.actor().restrictSubclassChange.contains(classId);
};

Yanfly.Subclass.Game_Actor_gainExp = Game_Actor.prototype.gainExp;
Game_Actor.prototype.gainExp = function(exp) {
    this.gainExpSubclass(exp);
    Yanfly.Subclass.Game_Actor_gainExp.call(this, exp);
};

Game_Actor.prototype.gainExpSubclass = function(exp) {
    if (!this.subclass()) return;
    exp *= Yanfly.Param.SubclassExp;
    var curExp = this._exp[this._subclassId] || 0;
    var newExp = curExp + Math.round(exp * this.finalExpRate());
    this._exp[this._subclassId] = Math.max(newExp, 0);
};

Game_Actor.prototype.canChangeSubclass = function() {
    if (this._canChangeSubclass != undefined) {
        return this._canChangeSubclass;
    } else {
        this._canChangeSubclass = this.actor().canChangeSubclass;
        return this._canChangeSubclass;
    }
};

Game_Actor.prototype.setCanChangeSubclass = function(value) {
    this._canChangeSubclass = value;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Subclass.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.Subclass.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'ShowSubclass') {
      $gameSystem._showSubclass = true;
    } else if (command === 'HideSubclass') {
      $gameSystem._showSubclass = false;
    } else if (command === 'EnableSubclass') {
      $gameSystem._enableSubclass = true;
    } else if (command === 'DisableSubclass') {
      $gameSystem._enableSubclass = false;
    } else if (command === 'ChangeSubclass') {
      this.changeSubclass(args);
    } else if (command === 'EnableSubclassChange') {
      this.setSubclassChange(args, true);
    } else if (command === 'DisableSubclassChange') {
      this.setSubclassChange(args, false);
    }
};

Game_Interpreter.prototype.changeSubclass = function(args) {
    if (!args) return;
    var actorId = parseInt(args[0]);
    var subclassId = parseInt(args[1]);
    var actor = $gameActors.actor(actorId);
    if (actor) actor.setSubclass(subclassId);
};

Yanfly.Subclass.Game_Interpreter_command315 = 
    Game_Interpreter.prototype.command315;
Game_Interpreter.prototype.command315 = function() {
    var value = this.operateValue(this._params[2], this._params[3],
      this._params[4]);
    this.iterateActorEx(this._params[0], this._params[1], function(actor) {
      actor.gainExpSubclass(value);
    }.bind(this));
    return Yanfly.Subclass.Game_Interpreter_command315.call(this);
};

Game_Interpreter.prototype.setSubclassChange = function(args, enable) {
    var actorId = parseInt(args[0]);
    var actor = $gameActors.actor(actorId);
    if (!actor) return;
    actor.setCanChangeSubclass(enable);
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
    width = width || 168;
    this.resetTextColor();
    this.drawText(actor.className(), x, y, width);
};

//=============================================================================
// Window_ClassCommand
//=============================================================================

Yanfly.Subclass.Window_ClassCommand_addClassCommand =
    Window_ClassCommand.prototype.addClassCommand;
Window_ClassCommand.prototype.addClassCommand = function() {
    Yanfly.Subclass.Window_ClassCommand_addClassCommand.call(this);
    this.addSubclassCommand();
};

Window_ClassCommand.prototype.addSubclassCommand = function() {
    if (!$gameSystem.isShowSubclass()) return;
    var enabled = this.isSubclassEnabled();
    this.addCommand(Yanfly.Param.SubclassCmd, 'subclass', enabled);
};

Window_ClassCommand.prototype.isSubclassEnabled = function() {
    var actor = SceneManager._scene.actor();
    if (actor && !actor.canChangeSubclass()) return false;
    return $gameSystem.isEnableSubclass();
};

//=============================================================================
// Window_ClassList
//=============================================================================

Yanfly.Subclass.Window_ClassList_isEnabled =
    Window_ClassList.prototype.isEnabled;
Window_ClassList.prototype.isEnabled = function(item) {
    if (!this.checkSubclassEnabled(item)) return false;
    return Yanfly.Subclass.Window_ClassList_isEnabled.call(this, item);
};

Window_ClassList.prototype.checkSubclassEnabled = function(item) {
    if (SceneManager._scene instanceof Scene_Class) {
      var win = SceneManager._scene._commandWindow;
      if (!win) return true;
      if (!this.active) return true;
      if (win.currentSymbol() === 'class') {
        if ($dataClasses[item]) {
          if (!$dataClasses[item].primaryAllowed) return false;
        }
        if (this._actor.restrictClassChange(item)) return false;
      } else if (win.currentSymbol() === 'subclass') {
        if (item === this._actor.currentClass().id) return false;
        if ($dataClasses[item]) {
          if (!$dataClasses[item].subclassAllowed) return false;
        }
        if (this._actor.restrictSubclassChange(item)) return false;
      }
    }
    return true;
};

Yanfly.Subclass.Window_ClassList_changeClassNameColor =
    Window_ClassList.prototype.changeClassNameColor;
Window_ClassList.prototype.changeClassNameColor = function(item) {
    if (item === this._actor.subclass()) {
      this.changeTextColor(this.textColor(Yanfly.Param.SubclassColor));
    } else {
      Yanfly.Subclass.Window_ClassList_changeClassNameColor.call(this, item);
    }
};

Yanfly.Subclass.Window_ClassList_selectLast =
    Window_ClassList.prototype.selectLast;
Window_ClassList.prototype.selectLast = function() {
    var win = SceneManager._scene._commandWindow;
    if (win && win.currentSymbol() === 'subclass' && this._actor.subclass()) {
      this.selectLastSubclass();
    } else {
      Yanfly.Subclass.Window_ClassList_selectLast.call(this);
    }
};

Window_ClassList.prototype.selectLastSubclass = function() {
    this._index = this._data.indexOf(this._actor._subclassId);
    this.select(this._index);
};

Yanfly.Subclass.Window_ClassList_updateCompare =
    Window_ClassList.prototype.updateCompare;
Window_ClassList.prototype.updateCompare = function() {
    var win = SceneManager._scene._commandWindow;
    if (win && win.currentSymbol() === 'subclass') {
      this.updateSubclassCompare();
    } else {
      Yanfly.Subclass.Window_ClassList_updateCompare.call(this);
    }
};

Window_ClassList.prototype.updateSubclassCompare = function() {
    if (this._actor && this.item() && this._statusWindow) {
      var actor = JsonEx.makeDeepCopy(this._actor);
      if (this.isEnabled(this.item())) {
        Yanfly.CCC.PreventReleaseItem = true;
        actor.changeSubclass(this.item());
        Yanfly.CCC.PreventReleaseItem = undefined;
      }
      this._statusWindow.setTempActor(actor);
    }
};

//=============================================================================
// Scene_Class
//=============================================================================

Yanfly.Subclass.Scene_Class_createCommandWindow =
    Scene_Class.prototype.createCommandWindow;
Scene_Class.prototype.createCommandWindow = function() {
    Yanfly.Subclass.Scene_Class_createCommandWindow.call(this);
    var win = this._commandWindow;
    win.setHandler('subclass', this.commandClass.bind(this));
};

Yanfly.Subclass.Scene_Class_onItemOk = Scene_Class.prototype.onItemOk;
Scene_Class.prototype.onItemOk = function() {
    if (this._commandWindow.currentSymbol() === 'class') {
      Yanfly.Subclass.Scene_Class_onItemOk.call(this);
    } else {
      this.onSubclassOk();
    }
};

Scene_Class.prototype.onSubclassOk = function() {
    SoundManager.playEquip();
    var classId = this._itemWindow.item();
    var hpRate = this.actor().hp / this.actor().mhp;
    var mpRate = this.actor().mp / Math.max(1, this.actor().mmp);
    this.actor().changeSubclass(classId);
    var max = this.actor().isDead() ? 0 : 1;
    var hpAmount = Math.max(max, parseInt(this.actor().mhp * hpRate));
    this.actor().setHp(hpAmount);
    this.actor().setMp(parseInt(this.actor().mmp * mpRate));
    this._itemWindow.activate();
    this.refreshWindows();
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

//=============================================================================
// End of File
//=============================================================================
};