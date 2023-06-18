//=============================================================================
// Yanfly Engine Plugins - Merge Common Events
// YEP_MergeCommonEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MergeCommonEvents = true;

var Yanfly = Yanfly || {};
Yanfly.MerCoEv = Yanfly.MerCoEv || {};
Yanfly.MerCoEv.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 合并公共事件★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 对于那些使用标签和公共事件的复杂事件系统的用户，您可能已经
 * 注意到一个公共事件中的标签不会跳转到父公共事件中的任何标签。
 * 这个插件使得数据库名称中带有<merge>标记的公共事件
 * 将导入从中运行的所有子公共事件，并将其合并到当前列表中，
 * 就像公共事件合并到一个列表中一样。
 * 通过这样做，标签通过父公共事件连接起来，并且可以相互交互，
 * 而不仅仅是之前的公共事件实例本身。
 *
 * ============================================================================
 * Name Tags
 * ============================================================================
 *
 * <Merge>
 * - 只需将其插入到数据库中要将所有子公共事件合并到的任何公共事件
 * 的名称中。让我们看看这将如何使事情表现
 *
 * ---------------
 * Common Event 1:
 * ---------------
 * ◆Label：Top
 * ◆Common Event： 2
 * ◆Common Event： 3
 * ◆Label：Middle
 * ◆Common Event： 4
 * ◆Jump to Label：Top
 * ◆Label：End
 *
 * ---------------
 * Common Event 2:
 * ---------------
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 1
 * ◆Jump to Label：Middle
 *
 * ---------------
 * Common Event 3:
 * ---------------
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 2
 * ◆Jump to Label：Top
 *
 * ---------------
 * Common Event 4:
 * ---------------
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 3
 * ◆Jump to Label：End
 *
 * 如果名称中没有<merge>，公共事件将遍历并显示消息merge 1到3。
 * 子公共事件中标记事件的跳转将被忽略，
 * 因为它们自己的公共事件列表中没有标签。
 * 在那之后，这个事件将永远循环。
 *
 * 将<merge>添加到公共事件1的名称后，事件将以这种方式运行。
 *
 * ---------------
 * Common Event 1:
 * ---------------
 * ◆Label：Top
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 1
 * ◆Jump to Label：Middle
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 2
 * ◆Jump to Label：Top
 * ◆Label：Middle
 * ◆Text：None, Window, Bottom
 * ：    ：Merge 3
 * ◆Jump to Label：End
 * ◆Jump to Label：Top
 * ◆Label：End
 * 
 * 事件将显示“合并1”消息，跳到“中间”标签，显示“合并3”，
 * 然后跳到“结束”标签以结束事件。
 *
 * 警告：使用<merge>时，请小心导致
 * 返回先前使用的任何常见事件的常见事件，
 * 因为这可能会导致无限循环并锁定您的游戏。
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
// Game_Interpreter
//=============================================================================

// Common Event
Yanfly.MerCoEv.Game_Interpreter_command117 =
  Game_Interpreter.prototype.command117;
Game_Interpreter.prototype.command117 = function() {
    var commonEvent = $dataCommonEvents[this._params[0]];
    if (commonEvent && commonEvent.name.match(/<Merge>/i)) {
      var eventId = this.isOnCurrentMap() ? this._eventId : 0;
      var list = [];
      var id = this._params[0];
      this.mergeCommonEventList(list, id, 0);
      this.setupChild(list, eventId);
      return true;
    }
    return Yanfly.MerCoEv.Game_Interpreter_command117.call(this);
};

Game_Interpreter.prototype.mergeCommonEventList = function(list, id, indent) {
  var commonEvent = JsonEx.makeDeepCopy($dataCommonEvents[id]);
  for (var i = 0; i < commonEvent.list.length; ++i) {
    var ev = commonEvent.list[i];
    ev.indent += indent;
    if (ev.code === 117) {
      var commonEventId = ev.parameters[0];
      this.mergeCommonEventList(list, commonEventId, ev.indent);
    } else {
      list.push(ev);
    }
  }
};

//=============================================================================
// End of File
//=============================================================================