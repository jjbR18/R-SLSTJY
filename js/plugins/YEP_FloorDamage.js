//=============================================================================
// Yanfly Engine Plugins - Floor Damage
// YEP_FloorDamage.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_FloorDamage = true;

var Yanfly = Yanfly || {};
Yanfly.FloorDmg = Yanfly.FloorDmg || {};
Yanfly.FloorDmg.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 地形伤害☁️
 * @author Yanfly Engine Plugins
 *
 * @param Default Damage
 * @text 默认伤害
 * @type number
 * @min 1
 * @desc 这是图块伤害造成的默认伤害.
 * @default 10
 *
 * @param Flash Color
 * @text 完成颜色
 * @desc 默认情况下，这是用于所有图块伤害的显示颜色.
 * 按红、绿、蓝、不透明度插入它们，值从0-255
 * @default 255, 0, 0, 128
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个插件可以让玩家制作不同的图块产生不同伤害的效果，这意味着，
 * 有些图块可以造成超过默认设置的伤害，除此之外，
 * 你还可以设置伤害显示的颜色
 *
 * ============================================================================
 * 便签
 * ============================================================================
 *
 * 请在你的图块备注栏插入下面的命令
 *
 * Tileset Notetag:
 *
 *   <Floor Damage x: y>
 *   - x为地形标志0-7，y为造成的伤害，例如<Floor Damage 2: 
 *   将对2号标签的图块上的人物造成50点伤害，
 *   请注意你需要将图块设置为有害图块才可以生效
 *
 *   <Floor Flash x: r, g, b, o>
 *   - x为地形标志0-7，r,g,b,o为颜色值，分别为红色，绿色，蓝色，透明度。
 *   这个可以设置伤害显示的颜色，请注意你需要将图块设置为有害图块
 *   才可以生效
 *
 * ============================================================================
 * 疯狂模式-定制地板伤害
 * ============================================================================
 *
 * For those with JavaScript experience, you can make certain terrain tags deal
 * custom amounts of damage to your actors.
 *
 * Tileset Notetag:
 *
 *   <Custom Floor Damage x>
 *    value = actor.level;
 *   </Custom Floor Damage x>
 *   - 'x' is the terrain tag to mark the tileset with. By default, terrain
 *   tags are set to 0. They will go up as high as 7. 'y' will be the amount of
 *   damage dealt to each actor in the party. 'value' is the final damage value
 *   that will be added upon the <Floor Damage x: y> value. 'actor' will refer
 *   to the actor being damaged currently.
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

Yanfly.Parameters = PluginManager.parameters('YEP_FloorDamage');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.FloorDmgDefault = Number(Yanfly.Parameters['Default Damage']);
Yanfly.SetupParameters = function() {
  var array = String(Yanfly.Parameters['Flash Color']).split(',');
  for (var i = 0; i < array.length; ++i) {
    array[i] = parseInt(array[i].trim());
  }
  Yanfly.Param.FloorDmgFlash = array;
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.FloorDmg.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.FloorDmg.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_FloorDamage) {
    this.processFloorDmgNotetags1($dataTilesets);
    Yanfly._loaded_YEP_FloorDamage = true;
  }
  
  return true;
};

DataManager.processFloorDmgNotetags1 = function(group) {
  var note1a = /<(?:CUSTOM FLOOR DAMAGE|custom floor dmg)[ ](\d+)>/i;
  var note1b = /<\/(?:CUSTOM FLOOR DAMAGE|custom floor dmg)[ ](\d+)>/i;
  var note2 = /<FLOOR FLASH[ ](\d+):[ ](.*)>/i
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.floorDmg = [
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault,
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault,
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault,
      Yanfly.Param.FloorDmgDefault, Yanfly.Param.FloorDmgDefault
    ];
    obj.floorDmgFlash = [
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash,
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash,
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash,
      Yanfly.Param.FloorDmgFlash, Yanfly.Param.FloorDmgFlash
    ]
    var evalMode = 'none';
    var terrainId = 0;
    obj.floorDmgEval = ['', '', '', '', '', '', '', ''];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:FLOOR DAMAGE|floor dmg)[ ](\d+):[ ](\d+)>/i)) {
        var tag = parseInt(RegExp.$1).clamp(0, 7);
        var dmg = parseInt(RegExp.$2);
        obj.floorDmg[tag] = dmg;
      } else if (line.match(note1a)) {
        evalMode = 'custom floor damage';
        var terrainId = parseInt(RegExp.$1).clamp(0, 7);
      } else if (line.match(note1b)) {
        evalMode = 'none';
      } else if (evalMode === 'custom floor damage') {
        obj.floorDmgEval[terrainId] += line + '\n';
      } else if (line.match(note2)) {
        var tag = parseInt(RegExp.$1).clamp(0, 7);
        var array = String(RegExp.$2).split(',');
        for (var a = 0; a < array.length; ++a) {
          array[a] = parseInt(array[a].trim());
        }
        if (array.length === 4) obj.floorDmgFlash[tag] = array;
      }
    }
  }
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.basicFloorDamage = function() {
  var value = $gameMap.evaluateFloorDamage(this);
  return Math.ceil(value);
};

Game_Actor.prototype.performMapDamage = function() {
  if ($gameParty.inBattle()) return;
  var terrainTag = $gamePlayer.terrainTag();
  var tileset = $gameMap.tileset();
  var data = tileset.floorDmgFlash[terrainTag] || [255, 0, 0, 128];
  $gameScreen.startFlash(data, 8);
};

//=============================================================================
// Game_Map
//=============================================================================

Game_Map.prototype.evaluateFloorDamage = function(actor) {
  var terrainTag = $gamePlayer.terrainTag();
  var tileset = this.tileset();
  var value = tileset.floorDmg[terrainTag] || 10;
  var a = actor;
  var b = actor;
  var user = actor;
  var subject = actor;
  var target = actor;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = tileset.floorDmgEval[terrainTag] || 0;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'CUSTOM FLOOR DAMAGE ERROR');
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
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
