//=============================================================================
// Yanfly Engine Plugins - Move Route Extension - Extended Move Pack 1
// YEP_X_ExtMovePack1.js
//=============================================================================

if (Imported.YEP_MoveRouteCore) {

var Imported = Imported || {};
Imported.YEP_X_ExtMovePack1 = true;

var Yanfly = Yanfly || {};
Yanfly.EMvP1 = Yanfly.EMvP1 || {};
Yanfly.EMvP1.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 移动路径拓展包1★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 这个插件需要Move Route Core插件的支持，
 * 请置于Move Route Core下面
 *
 * 这个插件为移动系统添加了额外的移动路径方式，
 * 包括贴着墙面行走，直行遇到障碍物转弯，透明度调整，图像调整等。
 *
 * ============================================================================
 * 说明-其他简化移动路线
 * ============================================================================
 *
 * 如果你想使用这个插件来制作特定路线，你可以按照下面的步骤
 * 
 * 1. 打开你想移动的事件
 * 2.选择移动命令或者自定义移动
 * 3.选择 “Script…”
 * 4.输入下面的命令
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * HUG LEFT WALL
 * HUG RIGHT WALL
 *
 * AVOID HUG LEFT WALL
 * AVOID HUG RIGHT WALL
 *
 * CRASH HUG LEFT WALL
 * CRASH HUG RIGHT WALL
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 事件将会沿着墙边移动，如果没有墙面他会转个可以移动的方向
 *
 * Avoid命令是禁止事件碰撞玩家
 *
 * Crash命令是允许事件碰撞玩家
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Hug Left Wall
 *          Hug Right Wall
 *          Avoid Hug Left Wall
 *          Avoid Hug Right Wall
 *          Crash Hug Left Wall
 *          Crash Hug Right Wall
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * INDEX: x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 改变事件图像，索引值在0-7之间
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Index: 5
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * INDEX: +x
 * INDEX: -x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 改变事件图像，索引值在0-7之间
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Index: +1
 *          Index: -2
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * MOVE UP UNTIL STOP
 * MOVE LEFT UNTIL STOP
 * MOVE RIGHT UNTIL STOP
 * MOVE DOWN UNTIL STOP
 * MOVE UPPER LEFT UNTIL STOP
 * MOVE UPPER RIGHT UNTIL STOP
 * MOVE LOWER LEFT UNTIL STOP
 * MOVE LOWER RIGHT UNTIL STOP
 *
 * AVOID MOVE UP UNTIL STOP
 * AVOID MOVE LEFT UNTIL STOP
 * AVOID MOVE RIGHT UNTIL STOP
 * AVOID MOVE DOWN UNTIL STOP
 * AVOID MOVE UPPER LEFT UNTIL STOP
 * AVOID MOVE UPPER RIGHT UNTIL STOP
 * AVOID MOVE LOWER LEFT UNTIL STOP
 * AVOID MOVE LOWER RIGHT UNTIL STOP
 *
 * CRASH MOVE UP UNTIL STOP
 * CRASH MOVE LEFT UNTIL STOP
 * CRASH MOVE RIGHT UNTIL STOP
 * CRASH MOVE DOWN UNTIL STOP
 * CRASH MOVE UPPER LEFT UNTIL STOP
 * CRASH MOVE UPPER RIGHT UNTIL STOP
 * CRASH MOVE LOWER LEFT UNTIL STOP
 * CRASH MOVE LOWER RIGHT UNTIL STOP
 *
 * MOVE FORWARD UNTIL STOP
 * AVOID MOVE FORWARD UNTIL STOP
 * CRASH MOVE FORWARD UNTIL STOP
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 事件将会直行直到遇到障碍物，然后在执行下一段移动命令
 *
 * Avoid命令是禁止事件碰撞玩家
 *
 * Crash命令是允许事件碰撞玩家
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Move Right Until Stop
 *          Avoid Move Left Until Stop
 *          Crash Move Forward Until Stop
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * OPACITY: +x
 * OPACITY: -x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 改变图像透明度
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Opacity: +50
 *          Opacity: -30
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * OPACITY: +x%
 * OPACITY: -x%
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 改变图像透明度
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Opacity: +10%
 *          Opacity: -20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * OPACITY: x%
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * 设置头像透明度
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Opacity: 50%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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
// Game_Character
//=============================================================================

Yanfly.EMvP1.Game_Character_processMoveRouteScriptCall =
  Game_Character.prototype.processMoveRouteScriptCall;
Game_Character.prototype.processMoveRouteScriptCall = function(line) {
  // EXTENDED MOVE PACK 1 ADDITIONS
  if (line === 'EXTENDED MOVE PACK 1') {
    return;
  // HUG LEFT WALL
  } else if (line.match(/(?:HUG LEFT|HUG LEFT WALL)/i)) {
    var collision = this.checkCollisionKeywords(line);
    this.processMoveHugWall('left', collision);
  // HUG RIGHT WALL
  } else if (line.match(/(?:HUG RIGHT|HUG RIGHT WALL)/i)) {
    var collision = this.checkCollisionKeywords(line);
    this.processMoveHugWall('right', collision);
  // INDEX: X
  } else if (line.match(/INDEX:[ ](\d+)/i)) {
    var value = parseInt(RegExp.$1);
    this.processIndexSet(value);
  // INDEX: +/-X
  } else if (line.match(/INDEX:[ ]([\+\-]\d+)/i)) {
    var value = parseInt(RegExp.$1);
    this.processIndexAdjust(value);
  // MOVE UNTIL WALL
  } else if (line.match(/MOVE[ ](.*)[ ](?:UNTIL WALL|UNTIL STOP)/i)) {
    var text = String(RegExp.$1);
    var collision = this.checkCollisionKeywords(line);
    this.processMoveUntilStop(text, collision);
  // OPACITY: /-X%
  } else if (line.match(/OPACITY:[ ](\d+)([%％])/i)) {
    var rate = parseInt(RegExp.$1) * 0.01;
    var value = Math.round(255 * rate);
    this.processOpacitySet(value);
  // OPACITY: +/-X%
  } else if (line.match(/OPACITY:[ ]([\+\-]\d+)([%％])/i)) {
    var rate = parseInt(RegExp.$1) * 0.01;
    var value = Math.round(255 * rate);
    this.processOpacityAdjust(value);
  // OPACITY: +/-X
  } else if (line.match(/OPACITY:[ ]([\+\-]\d+)/i)) {
    var value = parseInt(RegExp.$1);
    this.processOpacityAdjust(value);
  // ELSE
  } else {
    Yanfly.EMvP1.Game_Character_processMoveRouteScriptCall.call(this, line);
  }
};

Game_Character.prototype.processMoveHugWall = function(wall, collision) {
  collision = collision || false;
  var left = {}
  left[1] = 3;
  left[2] = 6;
  left[3] = 9;
  left[4] = 2;
  left[6] = 8;
  left[7] = 1;
  left[8] = 4;
  left[9] = 7;
  var right = {};
  right[1] = 7;
  right[2] = 4;
  right[3] = 1;
  right[4] = 8;
  right[6] = 2;
  right[7] = 9;
  right[8] = 6;
  right[9] = 3;
  if (wall === 'left') {
    var mainDir = left[this.direction()];
    var oppositeDir = right[this.direction()];
  } else if (wall === 'right') {
    var mainDir = right[this.direction()];
    var oppositeDir = left[this.direction()];
  } else {
    return;
  }
  if (collision) $gameTemp._moveAllowPlayerCollision = true;
  if (this.canPass(this.x, this.y, mainDir)) {
    if (wall === 'left') {
      this.turnLeft90();
    } else {
      this.turnRight90();
    }
  } else if (!this.canPass(this.x, this.y, this.direction())) {
    if (this.canPass(this.x, this.y, oppositeDir)) {
      if (wall === 'left') {
        this.turnRight90();
      } else {
        this.turnLeft90();
      }
    } else {
      this.turn180();
    }
  }
  if (this.canPass(this.x, this.y, this.direction())) {
    $gameTemp._moveAllowPlayerCollision = false;
    this.moveForward();
  }
  $gameTemp._moveAllowPlayerCollision = false;
};

Game_Character.prototype.processMoveUntilStop = function(line, collision) {
  var direction = 0;
  if (line.match(/UPPER RIGHT/i)) {
    direction = 9;
  } else if (line.match(/UPPER LEFT/i)) {
    direction = 7;
  } else if (line.match(/LOWER RIGHT/i)) {
    direction = 4;
  } else if (line.match(/LOWER LEFT/i)) {
    direction = 1;
  } else if (line.match(/UP/i)) {
    direction = 8;
  } else if (line.match(/RIGHT/i)) {
    direction = 6;
  } else if (line.match(/LEFT/i)) {
    direction = 4;
  } else if (line.match(/DOWN/i)) {
    direction = 2;
  } else if (line.match(/FORWARD/i)) {
    direction = this.direction();
  } else {
    return;
  }
  if (collision) $gameTemp._moveAllowPlayerCollision = true;
  if (this.canPass(this.x, this.y, direction)) {
    $gameTemp._moveAllowPlayerCollision = false;
    this.moveStraight(direction);
    this._moveRouteIndex -= 1;
  }
  $gameTemp._moveAllowPlayerCollision = false;
};

Game_Character.prototype.processOpacitySet = function(value) {
  this._opacity = Math.round(value);
  this._opacity = this._opacity.clamp(0, 255);
};

Game_Character.prototype.processOpacityAdjust = function(value) {
  this._opacity += Math.round(value);
  this._opacity = this._opacity.clamp(0, 255);
};

Game_Character.prototype.processIndexSet = function(value) {
  if (ImageManager.isBigCharacter(this._characterName)) return;
  var charName = this._characterName;
  value = value.clamp(0, 7);
  this.setImage(charName, value);
};

Game_Character.prototype.processIndexAdjust = function(value) {
  if (ImageManager.isBigCharacter(this._characterName)) return;
  var charName = this._characterName;
  value = this._characterIndex + value;
  value = value.clamp(0, 7);
  this.setImage(charName, value);
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_ExtMovePack1 requires YEP_MoveRouteCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_MoveRouteCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // Imported.YEP_MoveRouteCore