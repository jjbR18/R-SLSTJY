//=============================================================================
// Yanfly Engine Plugins - Event Hitbox Resize
// YEP_EventHitboxResize.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventHitboxResize = true;

var Yanfly = Yanfly || {};
Yanfly.EvHbRs = Yanfly.EvHbRs || {};
Yanfly.EvHbRs.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 事件触发器范围★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 事件通常有一个1x1磁贴大的hitbox。然而，在某些情况下，你会
 * 最终想要有一个更大的物体来与之互动或者想要
 * 将事件触发区域的范围扩大一定量。此插件
 * 允许您通过notetag和/或
 * 注释标记。
 * 
 *  ============================================================================
 * 注释标签和注释标签
 *  ============================================================================
 * 
 * 要使事件的hitbox变大，请使用notetag或comment标记
 * 应用hitbox放大。如果使用了notetag，这将应用于
 * 不管页面是什么。如果使用了注释标记，它将
 * 覆盖notetag的任何设置。
 * 
 * 事件注释标签和注释标签：
 *
 *   <Hitbox Up: x>
 *   <Hitbox Left: x>
 *   <Hitbox Right: x>
 *   <Hitbox Down: x>
 *   - 这将使hitbox向上、向左、向右或向下扩展x。
 *     为x插入的值将使hitbox向该方向扩展那么多个tile。
 *     如果使用了这些notetag中的任何一个，
 *     它将使事件不可移动，
 *     除非移动类型设置为“Through”，
 *     否则无法移动，从而允许它通过任何东西。
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

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.EvHbRs.Game_CharacterBase_pos = Game_CharacterBase.prototype.pos;
Game_CharacterBase.prototype.pos = function(x, y) {
  if (this._addedHitboxUp !== undefined) {
    return this.isWithinHitboxes(x, y);
  } else {
    return Yanfly.EvHbRs.Game_CharacterBase_pos.call(this, x, y);
  }
};

Game_CharacterBase.prototype.isWithinHitboxes = function(x, y) {
  var left = this.x - this._addedHitboxLeft;
  var right = this.x + this._addedHitboxRight;
  var up = this.y - this._addedHitboxUp;
  var down = this.y + this._addedHitboxDown;
  return left <= x && x <= right && up <= y && y <= down;
};

Yanfly.EvHbRs.Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function(x, y, d) {
  if (this._addedHitboxUp || this._addedHitboxLeft || this._addedHitboxRight ||
    this._addedHitboxDown) return this.isThrough();
  return Yanfly.EvHbRs.Game_CharacterBase_canPass.call(this, x, y, d);
};

Yanfly.EvHbRs.Game_CharBase_canPassDia =
  Game_CharacterBase.prototype.canPassDiagonally;
Game_CharacterBase.prototype.canPassDiagonally = function(x, y, horz, vert) {
  if (this._addedHitboxUp || this._addedHitboxLeft || this._addedHitboxRight ||
    this._addedHitboxDown) return this.isThrough();
  return Yanfly.EvHbRs.Game_CharBase_canPassDia.call(this, x, y, horz, vert);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EvHbRs.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
  Yanfly.EvHbRs.Game_Event_setupPage.call(this);

  this._addedHitboxUp = 0;
  this._addedHitboxLeft = 0;
  this._addedHitboxRight = 0;
  this._addedHitboxDown = 0;

  this.setupEventHitboxResizeNotetags();
  this.setupEventHitboxResizeCommentTags();
};

Game_Event.prototype.setupEventHitboxResizeNotetags = function() {
  if (this.event().note === '') return;
  if (this.event().note.match(/<Hitbox (?:HEIGHT|UP):[ ](\d+)>/i)) {
    this._addedHitboxUp = parseInt(RegExp.$1);
  }
  if (this.event().note.match(/<Hitbox Left:[ ](\d+)>/i)) {
    this._addedHitboxLeft = parseInt(RegExp.$1);
  }
  if (this.event().note.match(/<Hitbox Right:[ ](\d+)>/i)) {
    this._addedHitboxRight = parseInt(RegExp.$1);
  }
  if (this.event().note.match(/<Hitbox Down:[ ](\d+)>/i)) {
    this._addedHitboxDown = parseInt(RegExp.$1);
  }
};

Game_Event.prototype.setupEventHitboxResizeCommentTags = function() {
  if (!this.page()) return;
  
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(/<Hitbox (?:HEIGHT|UP):[ ](\d+)>/i)) {
        this._addedHitboxUp = parseInt(RegExp.$1);
      } else if (ev.parameters[0].match(/<Hitbox Left:[ ](\d+)>/i)) {
        this._addedHitboxLeft = parseInt(RegExp.$1);
      } else if (ev.parameters[0].match(/<Hitbox Right:[ ](\d+)>/i)) {
        this._addedHitboxRight = parseInt(RegExp.$1);
      } else if (ev.parameters[0].match(/<Hitbox Down:[ ](\d+)>/i)) {
        this._addedHitboxDown = parseInt(RegExp.$1);
      }
    }
  }
};

//=============================================================================
// End of File
//=============================================================================