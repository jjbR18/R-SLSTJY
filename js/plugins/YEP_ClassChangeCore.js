//=============================================================================
// Yanfly Engine Plugins - Class Change Core
// YEP_ClassChangeCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ClassChangeCore = true;

var Yanfly = Yanfly || {};
Yanfly.CCC = Yanfly.CCC || {};
Yanfly.CCC.version = 1.13;

//=============================================================================
 /*:
 * @plugindesc v1.13 职业系统(已翻译)
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @text 通用
 * @default
 *
 * @param Class Command
 * @text 主菜单职业命令名称
 * @parent ---General---
 * @desc 主菜单显示职业命令的名称
 * @default 职业
 *
 * @param Auto Add Menu
 * @text 自动添加到主菜单
 * @parent ---General---
 * @desc 自动将职业命令添加到主菜单
 * @default true
 *
 * @param Show Command
 * @text 显示职业命令
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 默认情况下在主菜单中显示职业命令
 * @default true
 *
 * @param Enable Command
 * @text 启用职业命令
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc 默认情况下在主菜单中启用职业命令
 * @default true
 *
 * @param Auto Place Command
 * @text 自动放置命令
 * @parent ---General---
 * @type boolean
 * @on 自动
 * @off 手动
 * @desc 允许该插件自动确定主菜单放置位置
 * @default true
 *
 * @param Default Icon
 * @text 职业图标
 * @parent ---General---
 * @desc 所有职业默认图标
 * @default 78
 *
 * @param Maintain Levels
 * @text 保持等级
 * @parent ---General---
 * @type number
 * @min 0
 * @desc 变更职业后保持等级
 * @default true
 *
 * @param ---Command Window---
 * @text 职业命令窗口
 * @default
 *
 * @param Class Change Command
 * @text 主职业命令文本
 * @parent ---Command Window---
 * @default 职业
 *
 * @param Show Class Change
 * @text 显示主职业命令
 * @parent ---Command Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 *
 * @param Enable Class Change
 * @text 启用主职业命令
 * @parent ---Command Window---
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 *
 * @param Show Skill Learn
 * @text 显示学习技能命令
 * @parent ---Command Window---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc 需要插件:YEP_SkillLearnSystem,显示学习技能命令
 * @default true
 *
 * @param Finish Command
 * @text 返回命令文本
 * @parent ---Command Window---
 * @default 返回
 *
 * @param Text Alignment
 * @text 命令文本对齐方式
 * @parent ---Command Window---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @default center
 *
 * @param ---Window Settings---
 * @text 职业列表窗口
 * @default
 *
 * @param Current Class Color
 * @text 当前主职业文本颜色
 * @parent ---Window Settings---
 * @type number
 * @min 0
 * @max 31
 * @desc 角色当前主职业的文本颜色
 * @default 17
 *
 * @param Class Level Format
 * @text 职业等级文本格式
 * @parent ---Window Settings---
 * @default LV%1
 *
 * @param Class Level Font Size
 * @text 职业等级字体大小
 * @parent ---Window Settings---
 * @type number
 * @min 1
 * @default 20
 *
 * @help
 * 插件更新:yanfly.moe/plugins/en/YEP_ClassChangeCore.js
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 插件已修改
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 角色备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 除了当前的职业,该角色还将在游戏开始时解锁职业x
 * <Unlock Class: x>
 * <Unlock Class: x, x, x>
 * <Unlock Class: x to y>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 可以防止该角色变更主职业,这可以从插件命令中撤消
 * <Cannot Change Class>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 当该角色主职业ID为x的时候,行走图片将设置为'文件名'索引号为y
 * <Class x Character: 文件名 y>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 当该角色主职业ID为x的时候,脸部图片将设置为'文件名'索引号为y
 * <Class x Face: 文件名y>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 当该角色主职业ID为x的时候,SV战斗图将设置为'文件名'
 * <Class x Battler: 文件名>
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 职业备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 设置该职业图标
 * <Icon: x>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 设置该职业的自定义文本
 * <Help Description>
 * Text
 * Text
 * </Help Description>
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 插件命令:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 打开职业菜单
 * OpenClass
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 在主菜单中显示/隐藏职业命令
 * ShowClass
 * HideClass
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 在主菜单中启用/禁用职业命令
 * EnableClass
 * DisableClass
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 角色x解锁/隐藏职业y
 * UnlockClass x y
 * RemoveClass x y
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 启用/禁用角色x变更主职业
 * EnablePrimaryClassChange x
 * DisablePrimaryClassChange x
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ClassChangeCore');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.CCCCmdName = String(Yanfly.Parameters['Class Command']);
Yanfly.Param.CCCAutoAdd = eval(String(Yanfly.Parameters['Auto Add Menu']));
Yanfly.Param.CCCShowCmd = String(Yanfly.Parameters['Show Command']);
Yanfly.Param.CCCShowCmd = eval(Yanfly.Param.CCCShowCmd);
Yanfly.Param.CCCEnableCmd = String(Yanfly.Parameters['Enable Command']);
Yanfly.Param.CCCEnableCmd = eval(Yanfly.Param.CCCEnableCmd);
Yanfly.Param.CCCAutoPlace = String(Yanfly.Parameters['Auto Place Command']);
Yanfly.Param.CCCAutoPlace = eval(Yanfly.Param.CCCAutoPlace);
Yanfly.Icon.DefaultClass = Number(Yanfly.Parameters['Default Icon']);
Yanfly.Param.CCCMaintainLv = String(Yanfly.Parameters['Maintain Levels']);
Yanfly.Param.CCCMaintainLv = eval(Yanfly.Param.CCCMaintainLv);

Yanfly.Param.CCCClassCmd = String(Yanfly.Parameters['Class Change Command']);
Yanfly.Param.CCCShowClass = String(Yanfly.Parameters['Show Class Change']);
Yanfly.Param.CCCShowClass = eval(Yanfly.Param.CCCShowClass);
Yanfly.Param.CCCEnableClass = String(Yanfly.Parameters['Enable Class Change']);
Yanfly.Param.CCCEnableClass = eval(Yanfly.Param.CCCEnableClass);
Yanfly.Param.CCCShowLearn = String(Yanfly.Parameters['Show Skill Learn']);
Yanfly.Param.CCCShowLearn = eval(Yanfly.Param.CCCShowLearn);
Yanfly.Param.CCCFinishCmd = String(Yanfly.Parameters['Finish Command']);
Yanfly.Param.CCCTextAlign = String(Yanfly.Parameters['Text Alignment']);

Yanfly.Param.CCCClassColor = Number(Yanfly.Parameters['Current Class Color']);
Yanfly.Param.CCCLvFmt = String(Yanfly.Parameters['Class Level Format']);
Yanfly.Param.CCCLvFontSize = Number(Yanfly.Parameters['Class Level Font Size']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.CCC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.CCC.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Yanfly._loaded_YEP_ClassChangeCore) {
      this.processCCCNotetags1($dataClasses);
      this.processCCCNotetags2($dataActors);
      this.processCCCNotetags3($dataClasses);
      Yanfly._loaded_YEP_ClassChangeCore = true;
    }
    return true;
};

DataManager.processCCCNotetags1 = function(group) {
  if (Yanfly.ClassIdRef) return;
  Yanfly.ClassIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ClassIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processCCCNotetags2 = function(group) {
  var note1a = /<(?:UNLOCK CLASS|unlock classes):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note1b = /<(?:UNLOCK CLASS|unlock classes):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note2a = /<(?:CLASS)[ ](\d+)[ ](?:CHARACTER|SPRITE):[ ](.*)[ ](\d+)>/i;
  var note2b = /<(.*)[ ](?:CHARACTER|SPRITE):[ ](.*)[ ](\d+)>/i;
  var note3a = /<(?:CLASS)[ ](\d+)[ ](?:FACE):[ ](.*)[ ](\d+)>/i;
  var note3b = /<(.*)[ ](?:FACE):[ ](.*)[ ](\d+)>/i;
  var note4a = /<(?:CLASS)[ ](\d+)[ ](?:BATTLER):[ ](.*)>/i;
  var note4b = /<(.*)[ ](?:BATTLER):[ ](.*)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.unlockedClasses = [];
    obj.classCharacter = {};
    obj.classFace = {};
    obj.classBattler = {};
    obj.canChangeClass = true;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1a)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.unlockedClasses = obj.unlockedClasses.concat(array);
      } else if (line.match(note1b)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.unlockedClasses = obj.unlockedClasses.concat(range);
      } else if (line.match(note2a)) {
        var classId = parseInt(RegExp.$1);
        var filename = String(RegExp.$2);
        var index = parseInt(RegExp.$3);
        obj.classCharacter[classId] = [filename, index];
      } else if (line.match(note2b)) {
        var name = String(RegExp.$1).toUpperCase();
        var filename = String(RegExp.$2);
        var index = parseInt(RegExp.$3);
        var classId = Yanfly.ClassIdRef[name];
        if (classId) obj.classCharacter[classId] = [filename, index];
      } else if (line.match(note3a)) {
        var classId = parseInt(RegExp.$1);
        var filename = String(RegExp.$2);
        var index = parseInt(RegExp.$3);
        obj.classFace[classId] = [filename, index];
      } else if (line.match(note3b)) {
        var name = String(RegExp.$1).toUpperCase();
        var filename = String(RegExp.$2);
        var index = parseInt(RegExp.$3);
        var classId = Yanfly.ClassIdRef[name];
        if (classId) obj.classFace[classId] = [filename, index];
      } else if (line.match(note4a)) {
        var classId = parseInt(RegExp.$1);
        var filename = String(RegExp.$2);
        obj.classBattler[classId] = filename;
      } else if (line.match(note4b)) {
        var name = String(RegExp.$1).toUpperCase();
        var filename = String(RegExp.$2);
        var classId = Yanfly.ClassIdRef[name];
        if (classId) obj.classBattler[classId] = filename;
      } else if (line.match(/<(?:CANNOT CHANGE CLASS|CANT CHANGE CLASS)>/i)) {
        obj.canChangeClass = false;
      }
    }
    obj.unlockedClasses = obj.unlockedClasses.filter(Yanfly.Util.onlyUnique);
  }
};

DataManager.processCCCNotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.iconIndex = Yanfly.Icon.DefaultClass;
    obj.useNickname = false;
    obj.description = '';
    var descMode = false;
    obj.levelUnlockRequirements = {};
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:ICON):[ ](\d+)>/i)) {
        obj.iconIndex = parseInt(RegExp.$1);
      } else if (line.match(/<(?:HELP DESCRIPTION)>/i)) {
        descMode = true;
      } else if (line.match(/<\/(?:HELP DESCRIPTION)>/i)) {
        descMode = false;
      } else if (descMode) {
        obj.description += line + '\n';
      } else if (line.match(/<USE NICKNAME>/i)) {
        obj.useNickname = true;
      } else if (line.match(/<(?:LEVEL UNLOCK REQUIREMENTS)>/i)) {
        evalMode = 'level unlock requirements';
      } else if (line.match(/<\/(?:LEVEL UNLOCK REQUIREMENTS)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'level unlock requirements') {
        if (line.match(/CLASS[ ](\d+):[ ]LEVEL[ ](\d+)/i)) {
          var classId = parseInt(RegExp.$1);
          var level = parseInt(RegExp.$2);
          obj.levelUnlockRequirements[classId] = level;
        } else if (line.match(/(.*):[ ]LEVEL[ ](\d+)/i)) {
          var name = String(RegExp.$1).toUpperCase();
          var level = parseInt(RegExp.$2);
          var classId = Yanfly.ClassIdRef[name];
          if (classId) obj.levelUnlockRequirements[classId] = level;
        }
      }
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.CCC.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.CCC.Game_System_initialize.call(this);
    this.initClasses();
};

Game_System.prototype.initClasses = function() {
    this._showClass = Yanfly.Param.CCCShowCmd;
    this._enableClass = Yanfly.Param.CCCEnableCmd;
    this._showClassChange = Yanfly.Param.CCCShowClass;
    this._enableClassChange = Yanfly.Param.CCCEnableClass;
};

Game_System.prototype.isShowClass = function() {
    if (this._showClass === undefined) this.initClasses();
    return this._showClass;
};

Game_System.prototype.isEnableClass = function() {
    if (this._enableClass === undefined) this.initClasses();
    return this._enableClass;
};

Game_System.prototype.isShowClassEnabled = function() {
    if (this._showClassChange === undefined) this.initClasses();
    return this._showClassChange;
};

Game_System.prototype.isEnableClassEnabled = function() {
    if (this._enableClassChange === undefined) this.initClasses();
    return this._enableClassChange;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.CCC.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.CCC.Game_Actor_setup.call(this, actorId);
    this.initClasses();
};

Game_Actor.prototype.initClasses = function() {
    if (!this.actor().unlockedClasses) return;
    this._unlockedClasses = this.actor().unlockedClasses.slice();
    this.unlockClass(this._classId);
    this._unlockedClasses.sort(function(a, b) { return a - b });
};

Yanfly.CCC.Game_Actor_turnEndOnMap = Game_Actor.prototype.turnEndOnMap;
Game_Actor.prototype.turnEndOnMap = function() {
    $gameTemp._noUpdateUnlockedSkills = true;
    Yanfly.CCC.Game_Actor_turnEndOnMap.call(this);
    $gameTemp._noUpdateUnlockedSkills = undefined;
};

Yanfly.CCC.Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    this.updateUnlockedClassSkills();
    Yanfly.CCC.Game_Actor_refresh.call(this);
};

Game_Actor.prototype.unlockedClasses = function() {
    if (this._unlockedClasses === undefined) this.initClasses();
    this.checkLevelUnlockedClasses();
    var classes = this._unlockedClasses.sort(function(a, b) { return a - b });
    classes = classes.concat($gameParty.unlockedClasses());
    return classes.filter(Yanfly.Util.onlyUnique);
};

Game_Actor.prototype.unlockClass = function(classId) {
    if (this._unlockedClasses === undefined) this.initClasses();
    if (this._unlockedClasses.contains(classId)) return;
    this._unlockedClasses.push(classId);
    this._unlockedClasses.sort(function(a, b) { return a - b });
    this.refresh();
};

Game_Actor.prototype.removeClass = function(classId) {
    if (this._unlockedClasses === undefined) this.initClasses();
    if (!this._unlockedClasses.contains(classId)) return;
    if (classId === this._classId) return;
    var index = this._unlockedClasses.indexOf(classId);
    if (index >= 0) this._unlockedClasses.splice(index, 1);
    this.refresh();
};

Yanfly.CCC.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
    keepExp = Yanfly.Param.CCCMaintainLv;
    if (keepExp) {
      this._exp[classId] = this._exp[this._classId];
      keepExp = false;
    }
    Yanfly.CCC.Game_Actor_changeClass.call(this, classId, keepExp);
    //this.updateLearnedSkills(classId);
    if (!$gameParty.unlockedClasses().contains(classId)) {
      this.unlockClass(classId);
    }
    $gamePlayer.refresh();
};

Game_Actor.prototype.updateUnlockedClassSkills = function() {
    if ($gameTemp._noUpdateUnlockedSkills) return;
    if ($gameParty.inBattle()) return;
    var unlocked = this.unlockedClasses();
    var length = unlocked.length;
    for (var i = 0; i < length; ++i) {
      var classId = unlocked[i];
      this.updateLearnedSkills(classId);
    }
};

Game_Actor.prototype.updateLearnedSkills = function(classId) {
    if (!$dataClasses[classId]) return;
    $dataClasses[classId].learnings.forEach(function(learning) {
        if (this.classLevel(classId) >= learning.level) {
          this.learnSkill(learning.skillId);
        }
    }, this);
};

Game_Actor.prototype.classLevel = function(classId) {
    if (Yanfly.Param.CCCMaintainLv) return this.level;
    if (this._exp[classId] === undefined) this._exp[classId] = 0;
    var level = 1;
    for (;;) {
      if (level >= this.maxLevel()) break;
      if (this.expForLevel(level + 1) > this._exp[classId]) break;
      level++;
    }
    return level;
};

Yanfly.CCC.Game_Actor_setCharacterImage =
    Game_Actor.prototype.setCharacterImage;
Game_Actor.prototype.setCharacterImage = function(name, index) {
    if (name !== '') {
      this._priorityCharacterName = name;
      this._priorityCharacterIndex = index;
    } else {
      this._priorityCharacterName = undefined;
      this._priorityCharacterIndex = undefined;
      Yanfly.CCC.Game_Actor_setCharacterImage.call(this, name, index);
    }
};

Yanfly.CCC.Game_Actor_characterName = Game_Actor.prototype.characterName;
Game_Actor.prototype.characterName = function() {
    if (this._priorityCharacterName !== undefined) {
      return this._priorityCharacterName;
    }
    if (this.actor().classCharacter) {
      if (this.actor().classCharacter[this._classId] !== undefined) {
        return this.actor().classCharacter[this._classId][0];
      }
    }
    return Yanfly.CCC.Game_Actor_characterName.call(this);
};

Yanfly.CCC.Game_Actor_characterIndex = Game_Actor.prototype.characterIndex;
Game_Actor.prototype.characterIndex = function() {
    if (this._priorityCharacterIndex !== undefined) {
      return this._priorityCharacterIndex;
    }
    if (this.actor().classCharacter) {
      if (this.actor().classCharacter[this._classId] !== undefined) {
        return this.actor().classCharacter[this._classId][1];
      }
    }
    return Yanfly.CCC.Game_Actor_characterIndex.call(this);
};

Yanfly.CCC.Game_Actor_setFaceImage = Game_Actor.prototype.setFaceImage;
Game_Actor.prototype.setFaceImage = function(name, index) {
    if (name !== '') {
      this._priorityFaceName = name;
      this._priorityFaceIndex = index;
    } else {
      this._priorityFaceName = undefined;
      this._priorityFaceIndex = undefined;
      Yanfly.CCC.Game_Actor_setFaceImage.call(this, name, index);
    }
};

Yanfly.CCC.Game_Actor_faceName = Game_Actor.prototype.faceName;
Game_Actor.prototype.faceName = function() {
    if (this._priorityFaceName !== undefined) {
      return this._priorityFaceName;
    }
    if (this.actor().classFace) {
      if (this.actor().classFace[this._classId] !== undefined) {
        return this.actor().classFace[this._classId][0];
      }
    }
    return Yanfly.CCC.Game_Actor_faceName.call(this);
};

Yanfly.CCC.Game_Actor_faceIndex = Game_Actor.prototype.faceIndex;
Game_Actor.prototype.faceIndex = function() {
    if (this._priorityFaceIndex !== undefined) {
      return this._priorityFaceIndex;
    }
    if (this.actor().classFace) {
      if (this.actor().classFace[this._classId] !== undefined) {
        return this.actor().classFace[this._classId][1];
      }
    }
    return Yanfly.CCC.Game_Actor_faceIndex.call(this);
};

Yanfly.CCC.Game_Actor_setBattlerImage = Game_Actor.prototype.setBattlerImage;
Game_Actor.prototype.setBattlerImage = function(name) {
    if (name !== '') {
      this._priorityBattlerName = name;
    } else {
      this._priorityBattlerName = undefined;
      Yanfly.CCC.Game_Actor_setBattlerImage.call(this, name);
    }
};

Yanfly.CCC.Game_Actor_battlerName = Game_Actor.prototype.battlerName;
Game_Actor.prototype.battlerName = function() {
    if (this._priorityBattlerName !== undefined) {
      return this._priorityBattlerName;
    }
    if (this.actor().classBattler) {
      if (this.actor().classBattler[this._classId] !== undefined) {
        return this.actor().classBattler[this._classId];
      }
    }
    return Yanfly.CCC.Game_Actor_battlerName.call(this);
};

Game_Actor.prototype.checkLevelUnlockedClasses = function() {
    for (var i = 0; i < $dataClasses.length; ++i) {
      var item = $dataClasses[i];
      if (!item) continue;
      if (this._unlockedClasses.contains(item.id)) continue;
      if (Yanfly.Util.isEmptyObj(item.levelUnlockRequirements)) continue;
      if (!this.classUnlockLevelRequirementsMet(item)) continue;
      this.unlockClass(item.id);
    }
};

Game_Actor.prototype.classUnlockLevelRequirementsMet = function(item) {
    var classId;
    for (classId in item.levelUnlockRequirements) {
      var level = item.levelUnlockRequirements[classId];
      if (this.classLevel(classId) < level) return false;
    }
    return true;
};

Yanfly.CCC.Game_Actor_releaseUnequippableItems =
    Game_Actor.prototype.releaseUnequippableItems;
Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
    if (Yanfly.CCC.PreventReleaseItem) return;
    Yanfly.CCC.Game_Actor_releaseUnequippableItems.call(this, forcing);
};

Game_Actor.prototype.canChangeClass = function() {
    if (this._canChangeClass != undefined) {
        return this._canChangeClass;
    } else {
        this._canChangeClass = this.actor().canChangeClass;
        return this._canChangeClass;
    }
};

Game_Actor.prototype.setCanChangeClass = function(value) {
    this._canChangeClass = value;
};

//=============================================================================
// Game_Party
//=============================================================================

Yanfly.CCC.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    Yanfly.CCC.Game_Party_initialize.call(this);
    this.initClasses();
};

Game_Party.prototype.initClasses = function() {
    this._unlockedClasses = [];
    this._unlockedClasses.sort(function(a, b) { return a - b });
};

Game_Party.prototype.unlockedClasses = function() {
    if (this._unlockedClasses === undefined) this.initClasses();
    var classes = this._unlockedClasses.sort(function(a, b) { return a - b });
    return classes.filter(Yanfly.Util.onlyUnique);
};

Game_Party.prototype.unlockClass = function(classId) {
    if (this._unlockedClasses === undefined) this.initClasses();
    if (this._unlockedClasses.contains(classId)) return;
    this._unlockedClasses.push(classId);
    this._unlockedClasses.sort(function(a, b) { return a - b });
};

Game_Party.prototype.removeClass = function(classId) {
    if (this._unlockedClasses === undefined) this.initClasses();
    if (!this._unlockedClasses.contains(classId)) return;
    if (classId === this._classId) return;
    var index = this._unlockedClasses.indexOf(classId);
    if (index >= 0) this._unlockedClasses.splice(index, 1);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.CCC.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.CCC.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'OpenClass') {
      this.gotoSceneClass();
    } else if (command === 'ShowClass') {
      $gameSystem._showClass = true;
    } else if (command === 'HideClass') {
      $gameSystem._showClass = false;
    } else if (command === 'EnableClass') {
      $gameSystem._enableClass = true;
    } else if (command === 'DisableClass') {
      $gameSystem._enableClass = false;
    } else if (command === 'UnlockClass') {
      this.unlockClass(args);
    } else if (command === 'RemoveClass') {
      this.removeClass(args);
    } else if (command === 'EnablePrimaryClassChange') {
      this.setPrimaryClassChange(args, true);
    } else if (command === 'DisablePrimaryClassChange') {
      this.setPrimaryClassChange(args, false);
    }
};

Game_Interpreter.prototype.gotoSceneClass = function() {
    if (!$gameParty.inBattle()) {
      SceneManager.push(Scene_Class);
    }
    return true;
};

Game_Interpreter.prototype.unlockClass = function(args) {
    var actorId = parseInt(args[0]);
    var actor = $gameActors.actor(actorId);
    if (!actor) return;
    var classId = parseInt(args[1]);
    if (!$dataClasses[classId]) return;
    actor.unlockClass(classId);
};

Game_Interpreter.prototype.removeClass = function(args) {
    var actorId = parseInt(args[0]);
    var actor = $gameActors.actor(actorId);
    if (!actor) return;
    var classId = parseInt(args[1]);
    if (!$dataClasses[classId]) return;
    actor.removeClass(classId);
};

Game_Interpreter.prototype.setPrimaryClassChange = function(args, enable) {
    var actorId = parseInt(args[0]);
    var actor = $gameActors.actor(actorId);
    if (!actor) return;
    actor.setCanChangeClass(enable);
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
  width = width || 168;
  this.resetTextColor();
  var text = actor.currentClass().name;
  if (actor.currentClass().useNickname) {
    text = actor.nickname();
  }
  this.drawText(text, x, y, width);
};

//=============================================================================
// Window_SkillStatus
//=============================================================================

Yanfly.CCC.Window_SkillStatus_refresh =
    Window_SkillStatus.prototype.refresh;
Window_SkillStatus.prototype.refresh = function() {
    if (this._actor) {
      var bitmap = ImageManager.loadFace(this._actor.faceName());
      if (bitmap.width <= 0) {
        return setTimeout(this.refresh.bind(this), 5);
      }
    }
    Yanfly.CCC.Window_SkillStatus_refresh.call(this);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Yanfly.CCC.Window_MenuCommand_addOriginalCommands =
    Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    Yanfly.CCC.Window_MenuCommand_addOriginalCommands.call(this);
    if (Yanfly.Param.CCCAutoAdd) this.addClassCommand();
};

Window_MenuCommand.prototype.addClassCommand = function() {
    if (!Yanfly.Param.CCCAutoPlace) return;
    if (!$gameSystem.isShowClass()) return;
    if (this.findSymbol('class') > -1) return;
    var text = Yanfly.Param.CCCCmdName;
    var enabled = $gameSystem.isEnableClass();
    this.addCommand(text, 'class', enabled);
};

//=============================================================================
// Window_ClassCommand
//=============================================================================

function Window_ClassCommand() {
    this.initialize.apply(this, arguments);
}

Window_ClassCommand.prototype = Object.create(Window_Command.prototype);
Window_ClassCommand.prototype.constructor = Window_ClassCommand;

Window_ClassCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
};

Window_ClassCommand.prototype.windowWidth = function() {
    return 240;
};

Window_ClassCommand.prototype.numVisibleRows = function() {
    return 4;
};

Window_ClassCommand.prototype.itemTextAlign = function() {
    return Yanfly.Param.CCCTextAlign;
};

Window_ClassCommand.prototype.makeCommandList = function() {
    this.addClassCommand();
    this.addSkillLearnCommand();
    this.addCustomCommand();
    this.addFinishCommand();
};

Window_ClassCommand.prototype.addClassCommand = function() {
    if (!$gameSystem.isShowClassEnabled()) return;
    var enabled = this.isClassEnabled();
    this.addCommand(Yanfly.Param.CCCClassCmd, 'class', enabled);
};

Window_ClassCommand.prototype.isClassEnabled = function() {
    var actor = SceneManager._scene.actor();
    if (actor && !actor.canChangeClass()) return false;
    return $gameSystem.isEnableClassEnabled();
};

Window_ClassCommand.prototype.addSkillLearnCommand = function() {
    if (!Imported.YEP_SkillLearnSystem) return;
    if (!Yanfly.Param.CCCShowLearn) return;
    var name = Yanfly.Param.SLSCommand;
    if (Yanfly.Param.SLSIntegrate) name = TextManager.skill;
    var enabled = $gameSystem.isEnableLearnSkill();
    this.addCommand(name, 'learnSkill', enabled);
};

Window_ClassCommand.prototype.addCustomCommand = function() {
};

Window_ClassCommand.prototype.addFinishCommand = function() {
    this.addCommand(Yanfly.Param.CCCFinishCmd, 'cancel', true);
};

//=============================================================================
// Window_ClassList
//=============================================================================

function Window_ClassList() {
    this.initialize.apply(this, arguments);
}

Window_ClassList.prototype = Object.create(Window_Selectable.prototype);
Window_ClassList.prototype.constructor = Window_ClassList;

Window_ClassList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = null;
    this._data = [];
};

Window_ClassList.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
    this.refresh();
    this.resetScroll();
};

Window_ClassList.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_ClassList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_ClassList.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};

Window_ClassList.prototype.makeItemList = function() {
    if (this._actor) {
        var data = this._actor.unlockedClasses().slice();
    } else {
        var data = [];
    }
    this._data = [];
    for (var i = 0; i < data.length; ++i) {
      var classId = data[i];
      if ($dataClasses[classId] && !this._data.contains(classId)) {
        this._data.push(classId);
      }
    }
    this._data.sort(function(a, b) { return a - b });
};

Window_ClassList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};

Window_ClassList.prototype.isEnabled = function(item) {
    return true;
};

Window_ClassList.prototype.drawItem = function(index) {
    var item = $dataClasses[this._data[index]];
    if (!item) return;
    var rect = this.itemRect(index);
    this.changePaintOpacity(this.isEnabled(this._data[index]));
    this.drawClassName(item, rect.x, rect.y, rect.width);
    var rect = this.itemRectForText(index);
    this.drawClassLevel(item, rect.x, rect.y, rect.width);
    this.changePaintOpacity(true);
};

Window_ClassList.prototype.drawClassName = function(item, x, y, width) {
    this.resetFontSettings();
    var iconBoxWidth = Window_Base._iconWidth + 4;
    this.changeClassNameColor(item);
    this.drawIcon(item.iconIndex, x + 2, y + 2);
    var text = item.name;
    if (this._actor && item.useNickname) {
      text = this._actor.nickname();
    }
    this.drawText(text, x + iconBoxWidth, y, width - iconBoxWidth);
};

Window_ClassList.prototype.changeClassNameColor = function(item) {
    if (item === this._actor.currentClass()) {
      this.changeTextColor(this.textColor(Yanfly.Param.CCCClassColor));
    } else {
      this.changeTextColor(this.normalColor());
    }
};

Window_ClassList.prototype.drawClassLevel = function(item, x, y, width) {
    var level = Yanfly.Util.toGroup(this._actor.classLevel(item.id));
    var fmt = Yanfly.Param.CCCLvFmt;
    var text = fmt.format(level);
    this.resetFontSettings();
    this.changeTextColor(this.normalColor());
    this.contents.fontSize = Yanfly.Param.CCCLvFontSize;
    this.drawText(text, x, y, width, 'right');
};

Window_ClassList.prototype.updateHelp = function() {
    this.setHelpWindowItem($dataClasses[this.item()]);
    this.updateCompare();
};

Window_ClassList.prototype.updateCompare = function() {
    if (this._actor && this.item() && this._statusWindow) {
      var actor = JsonEx.makeDeepCopy(this._actor);
      if (this.isEnabled(this.item())) {
        Yanfly.CCC.PreventReleaseItem = true;
        actor.changeClass(this.item(), false);
        Yanfly.CCC.PreventReleaseItem = undefined;
      }
      this._statusWindow.setTempActor(actor);
    }
};

Window_ClassList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_ClassList.prototype.selectLast = function() {
    this._index = this._data.indexOf(this._actor._classId);
    this.select(this._index);
};

Window_ClassList.prototype.playOkSound = function() {
    if (SceneManager._scene instanceof Scene_Class) return;
    Window_Selectable.prototype.playOkSound.call(this);
};

//=============================================================================
// Window_StatCompare
//=============================================================================

function Window_StatCompare() {
    this.initialize.apply(this, arguments);
}

Window_StatCompare.prototype = Object.create(Window_Base.prototype);
Window_StatCompare.prototype.constructor = Window_StatCompare;

Window_StatCompare.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
    this._actor = null;
    this._tempActor = null;
    this.refresh();
};

Window_StatCompare.prototype.createWidths = function() {
    this._paramNameWidth = 0;
    this._paramValueWidth = 0;
    this._arrowWidth = this.textWidth('\u2192' + ' ');
    var buffer = this.textWidth(' ');
    for (var i = 0; i < 8; ++i) {
      var value1 = this.textWidth(TextManager.param(i));
      var value2 = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(i)));
      this._paramNameWidth = Math.max(value1, this._paramNameWidth);
      this._paramValueWidth = Math.max(value2, this._paramValueWidth);
    }
    this._bonusValueWidth = this._paramValueWidth;
    this._bonusValueWidth += this.textWidth('(+)') + buffer;
    this._paramNameWidth += buffer;
    this._paramValueWidth;
    if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth +
      this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
};

Window_StatCompare.prototype.setActor = function(actor) {
    if (this._actor === actor) return;
    this._actor = actor;
    this.createWidths();
    this.refresh();
};

Window_StatCompare.prototype.refresh = function() {
    this.contents.clear();
    if (!this._actor) return;
    for (var i = 0; i < 8; ++i) {
        this.drawItem(0, this.lineHeight() * i, i);
    }
};

Window_StatCompare.prototype.setTempActor = function(tempActor) {
    if (this._tempActor === tempActor) return;
    this._tempActor = tempActor;
    this.refresh();
};

Window_StatCompare.prototype.drawItem = function(x, y, paramId) {
    this.drawDarkRect(x, y, this.contents.width, this.lineHeight());
    this.drawParamName(y, paramId);
    this.drawCurrentParam(y, paramId);
    this.drawRightArrow(y);
    if (!this._tempActor) return;
    this.drawNewParam(y, paramId);
    this.drawParamDifference(y, paramId);
};

Window_StatCompare.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
    this.changePaintOpacity(true);
};

Window_StatCompare.prototype.drawParamName = function(y, paramId) {
    var x = this.textPadding();
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), x, y, this._paramNameWidth);
};

Window_StatCompare.prototype.drawCurrentParam = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
    this.resetTextColor();
    var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawRightArrow = function(y) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
};

Window_StatCompare.prototype.drawNewParam = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawParamDifference = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    if (diffvalue === 0) return;
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    var text = Yanfly.Util.toGroup(diffvalue);
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.CCC.Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    Yanfly.CCC.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('class', this.commandPersonal.bind(this));
};

Yanfly.CCC.Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
    if (this._commandWindow.currentSymbol() === 'class') {
      SceneManager.push(Scene_Class);
    } else {
      Yanfly.CCC.Scene_Menu_onPersonalOk.call(this);
    }
};

//=============================================================================
// Scene_Class
//=============================================================================

function Scene_Class() {
    this.initialize.apply(this, arguments);
}

Scene_Class.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Class.prototype.constructor = Scene_Class;

Scene_Class.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Class.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCommandWindow();
    this.createStatusWindow();
    this.createItemWindow();
    this.createCompareWindow();
    this.refreshActor();
};

Scene_Class.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_ClassCommand();
    var win = this._commandWindow;
    win.y = this._helpWindow.height;
    win.setHandler('class', this.commandClass.bind(this));
    win.setHandler('learnSkill', this.commandLearnSkill.bind(this));
    win.setHandler('cancel', this.popScene.bind(this));
    win.setHandler('pagedown', this.nextActor.bind(this));
    win.setHandler('pageup', this.previousActor.bind(this));
    this.addWindow(win);
};

Scene_Class.prototype.createStatusWindow = function() {
    var wx = this._commandWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._commandWindow.height;
    this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
};

Scene_Class.prototype.createItemWindow = function() {
    var wx = 0;
    var wy = this._statusWindow.y + this._statusWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ClassList(wx, wy, ww, wh);
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
};

Scene_Class.prototype.createCompareWindow = function() {
    var wx = this._itemWindow.width;
    var wy = this._itemWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = Graphics.boxHeight - wy;
    this._compareWindow = new Window_StatCompare(wx, wy, ww, wh);
    this._itemWindow.setStatusWindow(this._compareWindow);
    this.addWindow(this._compareWindow);
};

Scene_Class.prototype.refreshActor = function() {
    var actor = this.actor();
    this._commandWindow.refresh();
    this._statusWindow.setActor(actor);
    this._itemWindow.setActor(actor);
    this._compareWindow.setActor(actor);
};

Scene_Class.prototype.refreshWindows = function() {
    this._commandWindow.refresh();
    this._itemWindow.refresh();
    this._statusWindow.refresh();
    this._compareWindow.refresh();
};

Scene_Class.prototype.commandClass = function() {
    this._itemWindow.activate();
    this._itemWindow.refresh();
    this._itemWindow.selectLast();
};

Scene_Class.prototype.commandLearnSkill = function() {
    if (Yanfly.Param.SLSIntegrate) {
      SceneManager.push(Scene_Skill);
    } else {
      SceneManager.push(Scene_LearnSkill);
    }
};

Scene_Class.prototype.onItemOk = function() {
    SoundManager.playEquip();
    var classId = this._itemWindow.item();
    var hpRate = this.actor().hp / this.actor().mhp;
    var mpRate = this.actor().mp / Math.max(1, this.actor().mmp);
    this.actor().changeClass(classId, Yanfly.Param.CCCMaintainLv);
    var max = this.actor().isDead() ? 0 : 1;
    var hpAmount = Math.max(max, parseInt(this.actor().mhp * hpRate));
    this.actor().setHp(hpAmount);
    this.actor().setMp(parseInt(this.actor().mmp * mpRate));
    this._itemWindow.activate();
    this.refreshWindows();
};

Scene_Class.prototype.onItemCancel = function() {
    this._itemWindow.deselect();
    this._commandWindow.activate();
    this._helpWindow.setItem(null);
    this._itemWindow.refresh();
    this._compareWindow.setTempActor(null);
};

Scene_Class.prototype.onActorChange = function() {
    this.refreshActor();
    this._commandWindow.activate();
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

Yanfly.Util.isEmptyObj = function(obj) {
    var key;
    for (key in obj) {
      return false;
    }
    return true;
};

//=============================================================================
// End of File
//=============================================================================
