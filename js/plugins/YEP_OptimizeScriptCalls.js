//=============================================================================
// Yanfly Engine Plugins - Optimize Script Calls
// YEP_OptimizeScriptCalls.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_OptimizeScriptCalls = true;

var Yanfly = Yanfly || {};
Yanfly.OptSC = Yanfly.OptSC || {};
Yanfly.OptSC.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 优化脚本调用★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 脚本调用，不管是设置变量，条件分支，
 * 或者实际的脚本调用本身，在
 * 他们中的很多人都是接连跑的。这个插件将优化脚本调用
 * 常见事件中的用法，并使它们成为专用函数
 * 为了更好的表现。
 * 
 * 这只适用于常见事件，如地图事件和部队事件，
 * 事件列表将当场生成，而不是
 * 在玩家离开地图或结束时继续存储在缓存中
 * 战斗。这也不适用于要维护的移动路由脚本调用
 * 与移动路线核心兼容。
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
// DataManager
//=============================================================================

Yanfly.OptSC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.OptSC.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_OptimizeScriptCalls) {
    this.processOptimizeScriptCalls();
    Yanfly._loaded_YEP_OptimizeScriptCalls = true;
  }
  
  return true;
};

DataManager.processOptimizeScriptCalls = function() {
  var commonEvents = $dataCommonEvents;
  var length = commonEvents.length;
  for (var i = 1; i < length; ++i) {
    var commonEvent = commonEvents[i];
    var list = commonEvent.list;
    this.prepareOptimizedScriptCalls(list);
  }
};

DataManager.prepareOptimizedScriptCalls = function(list) {
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    // Conditional Branch
    if (ev._cachedFunction) continue;
    if (ev.code === 111 && ev.parameters[0] === 12) {
      ev._cachedFunction = new Function('return ' + ev.parameters[1]);
    // Control Variable
    } else if (ev.code === 122 && ev.parameters[3] === 4) {
      ev._cachedFunction = new Function('return ' + ev.parameters[4]);
    // Script Call
    } else if (ev.code === 355) {
      var script = ev.parameters[0] + '\n';
      var j = i + 1;
      while (list[j].code === 655) {
        script += list[j].parameters[0] + '\n';
        ++j;
      }
      ev._cachedFunction = new Function(script);
    }
  }
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Conditional Branch
Yanfly.OptSC.Game_Interpreter_command111 =
    Game_Interpreter.prototype.command111;
Game_Interpreter.prototype.command111 = function() {
  if (this.currentCommand()._cachedFunction) {
    var result = false;
    result = !!this.currentCommand()._cachedFunction.call(this);
    this._branch[this._indent] = result;
    if (this._branch[this._indent] === false) this.skipBranch();
    return true;
  } else {
    return Yanfly.OptSC.Game_Interpreter_command111.call(this);
  }
};

// Control Variable
Yanfly.OptSC.Game_Interpreter_command122 =
    Game_Interpreter.prototype.command122;
Game_Interpreter.prototype.command122 = function() {
  if (this.currentCommand()._cachedFunction) {
    var value = this.currentCommand()._cachedFunction.call(this);
    for (var i = this._params[0]; i <= this._params[1]; i++) {
      this.operateVariable(i, this._params[2], value);
    }
    return true;
  } else {
    return Yanfly.OptSC.Game_Interpreter_command122.call(this);
  }
};

// Script Call
Yanfly.OptSC.Game_Interpreter_command355 = 
    Game_Interpreter.prototype.command355;
Game_Interpreter.prototype.command355 = function() {
  if (this.currentCommand()._cachedFunction) {
    this.currentCommand()._cachedFunction.call(this);
    return true;
  } else {
    return Yanfly.OptSC.Game_Interpreter_command355.call(this);
  }
};

//=============================================================================
// End of File
//=============================================================================