//=============================================================================
// Yanfly Engine Plugins - Enemy Levels Extension - Map Levels
// YEP_X_MapEnemyLevels.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MapEnemyLevels = true;

var Yanfly = Yanfly || {};
Yanfly.MapEL = Yanfly.MapEL || {};
Yanfly.MapEL.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 地图敌方等级★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 此插件需要Yep emyLevels。
 * 确保此插件位于插件列表中的Yep eu EnemyLevels下。
 *
 * 对于那些使用敌人等级插件的人，
 * 您可能已经注意到它只允许您根据队伍的等级调整等级。
 * 如果你能根据地图设置级别，那不是很好吗？这个插件允许你这样做。
 * 您可以为在此地图或某个范围内遇到的所有敌人设置等级。
 *
 * *注意：如果您运行的是Yep_x_Difficulty Slider，
 * 请将此插件放在插件管理器列表中Yep_x_Difficulty Slider的上方，
 * 以获得最大的兼容性。
 *
 * ============================================================================
 * 便签
 * ============================================================================
 *
 * 将以下注释标记插入地图的注释框以设置所需的敌人等级设置。
 *  
 * 地图注释标记：
 *
 *   <Enemy Level Base: x>
 *   - 将“x”替换为要为地图上遇到的敌人设置的等级。
 *     之后将应用Yep-Enemy
 *
 *   <Enemy Level Base Variable: x>
 *   - 将“x”替换为变量，该变量的值将确定在地图上遇到的敌人的等级。
 *     之后将应用Yep-Enemy
 *
 *   <Enemy Level Range: x to y>
 *   - 对于地图上遇到的敌人，将“x”替换为最小等级，“y”替换为最大等级。
 *     之后将应用Yep-Enemy
 *
 *   <Enemy Level Range Variables: x to y>
 *   - 将“x”替换为其值将确定最小等级的变量，
 *     “y”替换为其值将确定地图上遇到的敌人的最大等级的变量。
 *     之后将应用Yep-Enemy。
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
 */
//=============================================================================

if (Imported.YEP_EnemyLevels) {

//=============================================================================
// Game_Enemy
//=============================================================================

Yanfly.MapEL.Game_Enemy_setupMinimumLevel = Game_Enemy.prototype.setupMinimumLevel;
Game_Enemy.prototype.setupMinimumLevel = function() {
  if ($dataMap && $dataMap.note) {
    var note = $dataMap.note;
    if (note.match(/<ENEMY LEVEL BASE:[ ](\d+)>/i)) {
        return Number(RegExp.$1);
    } else if (note.match(/<ENEMY LEVEL BASE (?:VAR|VARIABLE):[ ](\d+)>/i)) {
        return $gameVariables.value(Number(RegExp.$1));
    } else if (note.match(/<ENEMY LEVEL RANGE:[ ](\d+)[ ]TO[ ](\d+)>/i)) {
        return Number(RegExp.$1);
        return Math.floor(Math.random() * (max - min + 1) + min);
    } else if (note.match(/<ENEMY LEVEL RANGE (?:VAR|VARIABLE|VARIABLES):[ ](\d+)[ ]TO[ ](\d+)>/i)) {
        return $gameVariables.value(Number(RegExp.$1));
    }
  }
  return Yanfly.MapEL.Game_Enemy_setupMinimumLevel.call(this);
};

Yanfly.MapEL.Game_Enemy_setupMaximumLevel = Game_Enemy.prototype.setupMaximumLevel;
Game_Enemy.prototype.setupMaximumLevel = function() {
  if ($dataMap && $dataMap.note) {
    var note = $dataMap.note;
    if (note.match(/<ENEMY LEVEL BASE:[ ](\d+)>/i)) {
        return Number(RegExp.$1);
    } else if (note.match(/<ENEMY LEVEL BASE (?:VAR|VARIABLE):[ ](\d+)>/i)) {
        return $gameVariables.value(Number(RegExp.$1));
    } else if (note.match(/<ENEMY LEVEL RANGE:[ ](\d+)[ ]TO[ ](\d+)>/i)) {
        return Number(RegExp.$2);
    } else if (note.match(/<ENEMY LEVEL RANGE (?:VAR|VARIABLE|VARIABLES):[ ](\d+)[ ]TO[ ](\d+)>/i)) {
        return $gameVariables.value(Number(RegExp.$2));
    }
  }
  return Yanfly.MapEL.Game_Enemy_setupMaximumLevel.call(this);
};

Yanfly.MapEL.Game_Enemy_getSetupLevel = Game_Enemy.prototype.getSetupLevel;
Game_Enemy.prototype.getSetupLevel = function() {
  if ($dataMap && $dataMap.note) {
    var note = $dataMap.note;
    if (note.match(/<ENEMY LEVEL BASE:[ ](\d+)>/i)) {
        return Number(RegExp.$1);
    } else if (note.match(/<ENEMY LEVEL BASE (?:VAR|VARIABLE):[ ](\d+)>/i)) {
        return $gameVariables.value(Number(RegExp.$1));
    } else if (note.match(/<ENEMY LEVEL RANGE:[ ](\d+)[ ]TO[ ](\d+)>/i)) {
        var min = Number(RegExp.$1);
        var max = Number(RegExp.$2);
        return Math.floor(Math.random() * (max - min + 1) + min);
    } else if (note.match(/<ENEMY LEVEL RANGE (?:VAR|VARIABLE|VARIABLES):[ ](\d+)[ ]TO[ ](\d+)>/i)) {
        var min = $gameVariables.value(Number(RegExp.$1));
        var max = $gameVariables.value(Number(RegExp.$2));
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
  return Yanfly.MapEL.Game_Enemy_getSetupLevel.call(this);
};

//=============================================================================
// End of File
//=============================================================================

} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_EnemyLevels without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_ShopMenuCore