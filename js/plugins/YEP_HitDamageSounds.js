//=============================================================================
// Yanfly Engine Plugins - Hit Damage Sounds
// YEP_HitDamageSounds.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_HitDamageSounds = true;

var Yanfly = Yanfly || {};
Yanfly.HDS = Yanfly.HDS || {};
Yanfly.HDS.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 伤害音效☁️
 * @author Yanfly Engine Plugins + Chickie Collaboration
 *
 * @param ---Settings---
 * @text ---设置---
 * @default
 *
 * @param Only Sound
 * @text 只有声音
 * @parent ---Settings---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Play 有无护甲？如果没有，将播放默认的撞击声
 * YES - true     NO - false
 * @default false
 *
 * @param ---护甲类型---
 * @default
 *
 * @param Armor Type 1
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default Blow1, 90, 100, 0
 *
 * @param Armor Type 2
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default Blow2, 90, 100, 0
 *
 * @param Armor Type 3
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default Blow3, 90, 100, 0
 *
 * @param Armor Type 4
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default Hammer, 90, 100, 0
 *
 * @param Armor Type 5
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 6
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 7
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 8
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 9
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 10
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 11
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 12
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 13
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 14
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 15
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 16
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 17
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 18
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 19
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 20
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 21
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 22
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 23
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 24
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 25
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 26
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 27
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 28
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 29
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 30
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 31
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 32
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 33
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 34
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 35
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 36
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 37
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 38
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 39
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 40
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 41
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 42
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 43
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 44
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 45
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 46
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 47
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 48
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 49
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 50
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 51
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 52
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 53
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 54
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 55
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 56
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 57
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 58
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 59
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 60
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 61
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 62
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 63
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 64
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 65
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 66
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 67
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 68
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 69
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 70
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 71
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 72
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 73
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 74
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 75
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 76
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 77
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 78
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 79
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 80
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 81
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 82
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 83
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 84
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 85
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 86
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 87
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 88
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 89
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 90
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 91
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 92
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 93
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 94
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 95
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 96
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 97
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 98
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 99
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @param Armor Type 100
 * @parent ---Armor Types---
 * @desc The sound used for this armor type. Leave empty to not use.
 * Format: filename, volume, pitch, pan
 * @default 
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 不同类型的盔甲被击中时发出不同的声音。当
 * 演员被攻击击中并受到伤害，他们将发挥良好的效果
 * 根据他们所穿的盔甲（布与金属）。敌人可以
 * 当它们被击中时，也会播放不同的音效（即粘液和粘液）
 * 机器人）。使用这个插件，使你的盔甲和敌人更活泼的时候
 * 他们对损害作出反应。
 * 
 * 这是一个由Chickie和Yanfly合作的插件，以确保兼容性
 * 使用Yanfly引擎插件库。
 * 
 *  ============================================================================
 * 说明
 *  ============================================================================
 * 
 * 更改插件参数，使默认命中伤害的声音效果
 * 特殊装甲类型。这些装甲类型可以在数据库>类型中找到
 * 在RPG Maker MV项目的数据库中找到的选项卡。如果一个护甲类型被留下
 * 空的话，当演员是空的时候，它不会播放一个特殊的命中伤害音效
 * 被破坏性的动作击中。
 * 
 * 如果护甲有命中伤害音效，则会播放。否则，
 * 将播放常规伤害音效。如果一个演员有多个作品
 * 对于不同命中伤害声音的盔甲，将随机播放一个声音
 * 从盔甲的选择。
 * 
 * 敌人也可以在受到打击时播放打击伤害音效。然而，
 * 它们被击中时只能有一种音效。
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 将以下便签插入盔甲和/或敌方便签盒，以便
 * 它们被击中时发出不同的声音。
 * 
 * 盔甲和敌方便签
 *
 *   <Hit Damage Sound: filename>
 *   <Hit Damage Sound: filename, volume>
 *   <Hit Damage Sound: filename, volume, pitch>
 *   <Hit Damage Sound: filename, volume, pitch, pan>
 * - 使盔甲或敌人在被击中时播放'filename'。
 * 插入文件名时，文件名必须区分大小写，并且不能包含扩展名。
 * 如果使用“volume”和“pitch”变量，则它们必须是介于0和100之间的整数。
 * “pan”变量可以是介于-100和100之间的整数值（如果使用的话）。
 *
 * 示例：
 *
 *   <Hit Damage Sound: Fire1>
 *   <Hit Damage Sound: Fire2, 80>
 *   <Hit Damage Sound: Fire3, 80, 130, 20>
 *
 * 在上面的例子中，盔甲碎片或敌人被击中时会播放火焰声音效果。
 * 这将覆盖默认设置。
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
// Parameter Variables
//=============================================================================

Yanfly.HDS.setupParameters = function() {
  Yanfly.Parameters = PluginManager.parameters('YEP_HitDamageSounds');
  Yanfly.Param = Yanfly.Param || {};
  Yanfly.Param.HitDamageSoundsOnly = String(Yanfly.Parameters['Only Sound']);
  Yanfly.Param.HitDamageSoundsOnly = eval(Yanfly.Param.HitDamageSoundsOnly);
  Yanfly.Param.HitDamageSounds = [null];

  for (var i = 1; i < 101; ++i) {
    var str = String(Yanfly.Parameters['Armor Type ' + i]);
    if (str.length <= 0) continue;
    str = str.split(',');
    
    var sound = {
      name:   String(str[0].trim()),
      volume: parseInt(str[1].trim()),
      pitch:  parseInt(str[2].trim()),
      pan:    parseInt(str[3].trim())
    };

    Yanfly.Param.HitDamageSounds[i] = sound;
    AudioManager.loadStaticSe(sound);
  }
};
Yanfly.HDS.setupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.HDS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.HDS.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_HitDamageSounds) {
    this.processHDSNotetags1($dataArmors);
    this.processHDSNotetags1($dataEnemies);
    Yanfly._loaded_YEP_HitDamageSounds = true;
  }
  
  return true;
};

DataManager.processHDSNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    if (obj.atypeId) {
      obj.hitDamageSound = Yanfly.Param.HitDamageSounds[obj.atypeId];
    }

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<HIT DAMAGE SOUND:[ ](.*)>/i)) {
        var data = String(RegExp.$1).split(',');
        obj.hitDamageSound = this.processHitDamageSoundData(data);
      }
    }
  }
};

DataManager.processHitDamageSoundData = function(data) {
  if (data[0] === '') return;
  var sound = {
    name: String(data[0].trim())
  }
  sound['volume'] = data[1] ? parseInt(data[1].trim()) : 90;
  sound['pitch'] = data[2] ? parseInt(data[2].trim()) : 100;
  sound['pan'] = data[3] ? parseInt(data[3].trim()) : 0;
  return sound;
};

//=============================================================================
// SoundManager
//=============================================================================

Yanfly.HDS.SoundManager_playEnemyDamage = SoundManager.playEnemyDamage;
SoundManager.playEnemyDamage = function() {
  if (!!$gameTemp.getHitDamageBattler()) {
    this.playHitDamageSound();
  } else {
    Yanfly.HDS.SoundManager_playEnemyDamage.call(this);
  }
};

Yanfly.HDS.SoundManager_playActorDamage = SoundManager.playActorDamage;
SoundManager.playActorDamage = function() {
  if (!!$gameTemp.getHitDamageBattler()) {
    this.playHitDamageSound();
  } else {
    Yanfly.HDS.SoundManager_playActorDamage.call(this);
  }
};

SoundManager.playHitDamageSound = function() {
  var battler = $gameTemp.getHitDamageBattler();
  if (battler.isActor()) {
    this.playActorHitDamageSound();
  } else if (battler.isEnemy()) {
    this.playEnemyHitDamageSound();
  }
};

SoundManager.playActorHitDamageSound = function() {
  var battler = $gameTemp.getHitDamageBattler();
  var sounds = this.getBattlerArmorSounds(battler);
  if (sounds.length > 0) {
    var sound = sounds[Math.floor(Math.random() * sounds.length)];
    AudioManager.playStaticSe(sound);
    if (!Yanfly.Param.HitDamageSoundsOnly) {
      Yanfly.HDS.SoundManager_playEnemyDamage.call(this);
    }
  } else {
    Yanfly.HDS.SoundManager_playActorDamage.call(this);
  }
};

SoundManager.getBattlerArmorSounds = function(battler) {
  var armors = battler.armors();
  var array = [];
  var length = armors.length;
  for (var i = 0; i < length; ++i) {
    var armor = armors[i];
    if (armor.hitDamageSound) {
      array.push(armor.hitDamageSound);
    }
  }
  return array;
};

SoundManager.playEnemyHitDamageSound = function() {
  var battler = $gameTemp.getHitDamageBattler();
  if (battler.enemy().hitDamageSound) {
    AudioManager.playStaticSe(battler.enemy().hitDamageSound);
    if (!Yanfly.Param.HitDamageSoundsOnly) {
      Yanfly.HDS.SoundManager_playEnemyDamage.call(this);
    }
  } else {
    Yanfly.HDS.SoundManager_playEnemyDamage.call(this);
  }
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.setHitDamageBattler = function(battler) {
  this._hitDamageBattler = battler;
};

Game_Temp.prototype.getHitDamageBattler = function() {
  return this._hitDamageBattler;
};

Game_Temp.prototype.clearHitDamageBattler = function() {
  this._hitDamageBattler = undefined;
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.HDS.Game_Actor_performDamage = Game_Actor.prototype.performDamage;
Game_Actor.prototype.performDamage = function() {
  $gameTemp.setHitDamageBattler(this);
  Yanfly.HDS.Game_Actor_performDamage.call(this);
  $gameTemp.clearHitDamageBattler();
};

//=============================================================================
// Game_Enemy
//=============================================================================

Yanfly.HDS.Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
Game_Enemy.prototype.performDamage = function() {
  $gameTemp.setHitDamageBattler(this);
  Yanfly.HDS.Game_Enemy_performDamage.call(this);
  $gameTemp.clearHitDamageBattler();
};

//=============================================================================
// End of File
//=============================================================================