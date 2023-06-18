//=============================================================================
// Yanfly Engine Plugins - Event Click Trigger
// YEP_EventClickTrigger.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventClickTrigger = true;

var Yanfly = Yanfly || {};
Yanfly.EvClTr = Yanfly.EvClTr || {};
Yanfly.EvClTr.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 事件点击触发★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 有没有想过可以点击一个事件并立即触发它
 * 而不必让你的玩家角色一直走到它
 * 触发前先检查一下？有了这个插件，你可以。通过设置
 * 特定事件的某些注释标签和/或评论标签，玩家现在可以
 * 只需在远处点击即可触发事件。
 * 
 *  ============================================================================
 * 注释标签和注释标签
 *  ============================================================================
 * 
 * 要从屏幕上的任何位置触发事件，请使用
 * notetags或comment tags，使它们可以单击。如果notetag是
 * 如果已使用，则无论是哪一页，这都将应用于整个事件。如果
 * 仅使用注释标记，它将仅应用于该特定事件页。
 * 
 * 事件注释标签和注释标签
 *
 *   <Click Trigger>
 *   - 这将导致事件可以从远处点击，而不需要玩家一直走到它前面来触发它。
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
// Game_Temp
//=============================================================================

Yanfly.EvClTr.Game_Temp_setDestination = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function(x, y) {
  if (!this.isClickableEventAtXy(x, y)) {
    Yanfly.EvClTr.Game_Temp_setDestination.call(this, x, y);
  }
};

Game_Temp.prototype.isClickableEventAtXy = function(x, y) {
  var events = $gameMap.eventsXy(x, y);
  var length = events.length;
  for (var i = 0; i < events.length; ++i) {
    var ev = events[i];
    if (ev && ev.isClickTriggered()) {
      ev.onMouseClickTrigger();
      return;
    }
  }
};

//=============================================================================
// TouchInput
//=============================================================================

Yanfly.EvClTr.TouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
    Yanfly.EvClTr.TouchInput_onMouseMove.call(this, event);
    this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
    this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.isClickTriggered = function() {
  if (this.event().note.match(/<Click Trigger>/i)) return true;
  if (this._isClickTriggerable === undefined) {
    this.setupEventClickTriggerCommentTags();
  }
  return this._isClickTriggerable;
};

Yanfly.EvClTr.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
  Yanfly.EvClTr.Game_Event_setupPage.call(this);
  this.setupEventClickTriggerCommentTags();
};

Game_Event.prototype.setupEventClickTriggerCommentTags = function() {
  if (!this.page()) return;
  this._isClickTriggerable = false;
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(/<Click Trigger>/i)) {
        this._isClickTriggerable = true;
      }
    }
  }
};

Game_Event.prototype.onMouseClickTrigger = function() {
  if (this.isClickTriggered()) {
    $gameTemp.clearDestination();
    this.start();
  }
};

//=============================================================================
// End of File
//=============================================================================