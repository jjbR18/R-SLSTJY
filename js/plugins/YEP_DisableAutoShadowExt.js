//=============================================================================
// Yanfly Engine Plugins - Disable Auto Shadow Extended
// YEP_DisableAutoShadowExt.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_DisableAutoShadowExt = true;

var Yanfly = Yanfly || {};
Yanfly.AutoShadowExt = Yanfly.AutoShadowExt || {};
Yanfly.AutoShadowExt.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 关闭图块自动阴影☁️
 * @author Yanfly Engine Plugins and Archeia
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV会自动从图块墙砖中添加阴影。
 * 默认情况下无法关闭它们。
 * 这个插件可让您决定是否要打开或关闭阴影，
 * 并且你可以设定特定的地图或图块启用或禁用阴影
 *
 * ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 将以下注释标记插入地图或平铺集的注释框中，以更改
 * 它们如何影响地图上的阴影。
 *  
 * 平铺集和地图注释标记：
 * 
 *   <Hide Shadows>
 *   <Show Shadows>
 *   - 这将隐藏/显示特定贴图或平铺集的阴影。
 * 如果在使用具有阴影相关注释标记的平铺集时地图
 * 具有阴影相关注释标记，则地图上的注释标记将具有优先级。
 * 如果map和tileset都没有与阴影相关的notetag，那么
 * 阴影状态将取决于插件参数中的设置。
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
 * @param DefaultShowShadows
 * @text 默认显示阴影
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show shadows by default?
 * YES - true     NO - false
 * @default true
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_DisableAutoShadowExt');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.AutoShowShadows = eval(Yanfly.Parameters['DefaultShowShadows']);

Yanfly.AutoShadowExt.DrawShadow = function() {
  if ($dataMap && $dataMap.note) {
    if ($dataMap.note.match(/<HIDE SHADOWS>/i)) return false;
    if ($dataMap.note.match(/<SHOW SHADOWS>/i)) return true;
  }
  if ($gameMap && $gameMap.tileset() && $gameMap.tileset().note) {
    if ($gameMap.tileset().note.match(/<HIDE SHADOWS>/i)) return false;
    if ($gameMap.tileset().note.match(/<SHOW SHADOWS>/i)) return true;
  }
  return Yanfly.Param.AutoShowShadows;
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.AutoShadowExt.Tilemap_drawSh = Tilemap.prototype._drawShadow;
Tilemap.prototype._drawShadow = function(bitmap, shBits, dx, dy) {
  if (!Yanfly.AutoShadowExt.DrawShadow()) return;
  Yanfly.AutoShadowExt.Tilemap_drawSh.call(this, bitmap, shBits, dx, dy);
};

Yanfly.AutoShadowExt.ShTileMap_drawSh =
  ShaderTilemap.prototype._drawShadow;
ShaderTilemap.prototype._drawShadow = function(layer, shBits, dx, dy) {
  if (!Yanfly.AutoShadowExt.DrawShadow()) return;
  Yanfly.AutoShadowExt.ShTileMap_drawSh.call(this, layer, shBits, dx, dy);
};

//=============================================================================
// End of File
//=============================================================================