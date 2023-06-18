//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Message Eval Text
// YEP_X_MessageEvalText.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageEvalText = true;

var Yanfly = Yanfly || {};
Yanfly.MsgEval = Yanfly.MsgEval || {};
Yanfly.MsgEval.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 信息代码文本★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要YEP\u MessageCore。确保此插件位于
 * 是的，插件列表中有MessageCore。
 * 
 * 这是一个小插件，它为
 * 这样人们就可以运行JavaScript代码并将其显示为文本。
 * 这可以用来进行计算的飞行，而不需要使用
 * 在显示金额之前更改变量事件或确定
 * 一种字符串将被显示，而不会产生过多的条件
 * 分支事件。
 * 
 *  ============================================================================
 * 文本代码
 *  ============================================================================
 * 
 * \evalText<<code>>
 * - 将“code”替换为JavaScript代码。它会在里面运行代码，然后
 * 返回运行的代码的最后一行。这里有一些
 * 您可以使用的示例：
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 * 示例：
 *
 * ---
 *
 * \evalText<<$gameActors.actor(1).atk + $gameActors.actor(2).atk>>
 * - 显示参与者1的ATK和参与者2的ATK之和。
 *
 * ---
 *
 * \evalText<<Math.min(1000, $gameParty.gold())>>
 * - 显示“1000”或参与方的金币计数，具体取决于当前较小的金币计数。
 *
 * ---
 *
 * \evalText<<['His','Her','Its'][\v[123]]>>
 * - 根据变量123的值，如果变量123的值等于0，则显示“His”，如果值
 *    等于1，则显示“Her”，如果值等于2，则显示“Its”。
 *
 * ---
 *
 * \evalText<<['Abel','Brandon','Chris'][$gameVariables.value(456)]>>
 * - 根据变量456的值，如果变量456的值等于0，则显示'Abel'，如果值
 *    等于1，则显示'Brandon'，如果值等于2，则显示'Chris'。
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

if (Imported.YEP_MessageCore) {

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.MsgEval.Window_Base_convertEscCharacters =
  Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
  var text = Yanfly.MsgEval.Window_Base_convertEscCharacters.call(this, text);
  if (Imported.YEP_X_MessageMacros1) text = this.convertMacroText(text);
  text = text.replace(/\\/g, '\x1b');
  text = text.replace(/\x1b\x1b/g, '\\');
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
    return $gameVariables.value(parseInt(arguments[1]));
  }.bind(this));
  text = text.replace(/\x1bEVALTEXT<<(.*?)>>/gi, function() {
    return eval(arguments[1]);
  }.bind(this));
  return text;
};

Window_Base.prototype.battler = function() {
  if ($gameParty.inBattle()) {
    if (BattleManager.actor()) return BattleManager.actor();
    if (BattleManager._subject) return BattleManager._subject;
  }
  if (SceneManager._scene._actor) return SceneManager._scene._actor;
  return $gameParty.members()[0];
};

//=============================================================================
// Error Message
//=============================================================================
} else {

Imported.YEP_X_MessageEvalText = false;
var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_MessageEvalText without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}
//=============================================================================
// End of File
//=============================================================================