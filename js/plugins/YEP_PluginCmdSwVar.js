//=============================================================================
// Yanfly Engine Plugins - Plugin Commands - Switches & Variables Access
// YEP_PluginCmdSwVar.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_PluginCmdSwVar = true;

var Yanfly = Yanfly || {};
Yanfly.PCSV = Yanfly.PCSV || {};
Yanfly.PCSV.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 开关变量控制插件命令★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 插件命令是RPG Maker MV较为重要的功能。
 * 它们提供了自定义插件功能的方法，并且没有脚本调用那么复杂性。
 * 但是，插件命令本身并不太灵活，因为插入命令字符串的值往往是固定的。
 * 此插件允许您使用变量和开关使插件命令值更灵活。
 * ============================================================================
 * 说明
 * ============================================================================
 *
 * 当您创建一个插件命令事件，您希望数据变得更加动态时，请使用
 * 以下插件命令替换代码来生成新效果：
 *
 * ---
 *
 * Variables: 
 *
 *  v[x]
 *  - 用变量x的值替换v [x]。
 *
 *  Examples:
 *
 *  Quest Add v[8]
 *  - YEP_QuestJournal’s Quest将使用变量8来确定要添加的任务
 *
 *  gainJp v[11] v[12]
 *  - YEP_JobPoints将使用变量11来确定actorId，
 * 以将变量12的值作为JP值
 *
 * ---
 *
 * Switches:
 *
 *  {s[x] ? OnText : OffText}
 *  - 取决于Switch x，替换{}括号内的所有内容。
 * 如果Switch x为ON，则它将替换为'OnText'字符串。
 * 如果Switch x为OFF，则它将替换为'OffText'字符串。
 *
 *  Examples:
 *
 *  EventTimer {s[1] ? Pause : Resume}
 *  - YEP_EventTimerControl插件命令现在将在开关1打开时暂停，
 * 在交换机1关闭时恢复
 *
 *  ForceAdvantage {s[2] ? Preemptive : Surprise}
 *  - YEP_ForceAdvantage插件命令现在将在开关2打开时
 * 提供抢先攻击，或者如果开关2关闭则给予敌人突然攻击优势。
 *
 * ---
 *
 * 合并:
 *
 *  您可以将变量和开关组合在一起，以使用这两种类型的更复杂的插件命令。
 *
 *  Examples:
 *
 *  ShowIconBalloon v[15] on {s[5] ? Player : Event v[16]}
 *  - YEP_IconBalloons插件命令,当开关5打开时，
 * 显示变量15的图标，当开关5关闭时，显示变量16的图标。
 *
 *  Quest v[20] {s[10] ? Show : Hide} Reward v[21]
 *  - YEP_QuestJournal插件命令,当开关10打开时，
 * 显示变量20的任务，当开关10关闭时，显示变量21的任务。
 *
 * ---
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
 */
//=============================================================================

//=============================================================================
// MainCode
//=============================================================================

Yanfly.PCSV.Game_Interpreter_command356 = Game_Interpreter.prototype.command356;
Game_Interpreter.prototype.command356 = function() {
  var originalString = this._params[0];
  this.processPluginCommandSwitchVariables();
  var value = Yanfly.PCSV.Game_Interpreter_command356.call(this);
  this._params[0] = originalString;
  return value;
};

Game_Interpreter.prototype.processPluginCommandSwitchVariables = function() {
  // Set text variable
  var text = this._params[0];
  // Switch Replacement
  text = text.replace(/\{S\[(\d+)\][ ]\?[ ](.*)[ ]:[ ](.*)\}/gi, function() {
    var text1 = String(arguments[2]);
    var text2 = String(arguments[3]);
    return $gameSwitches.value(parseInt(arguments[1])) ? text1 : text2;
  }.bind(this));
  // Variable Replacement v[x]
  text = text.replace(/V\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/V\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/V\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  // Set Parameters to text string
  this._params[0] = text;
};

//=============================================================================
// End of File
//=============================================================================