//=============================================================================
// Yanfly Engine Plugins - Shop Menu Extension - Conditional Prices
// YEP_X_CondShopPrices.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_CondShopPrices = true;

var Yanfly = Yanfly || {};
Yanfly.CnShPr = Yanfly.CnShPr || {};
Yanfly.CnShPr.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 动态商店价格☁️
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要YEP\u ShopMenuCore。确保此插件位于
 * 在插件列表的YEP\u ShopMenuCore下。
  * 
  *  曾经想让某些商品的商店价格随着游戏的进展而变化吗，甚至可以
  *  有随时间变化的市场价。
  *  此插件允许您绑定基本价格，百分比，增加值等等！
  *  并且这可以都通过变量完成，你可以对游戏市场进行动态控制。
  * 
  *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 在你需要的物品、武器和/或盔甲中插入以下便签
 * 希望这些便签生效。
 * 
 * 物品、武器和护甲标签：
 * 
 *   <Base Price Variable: x>
 *   - 将项目的基价设置为此变量的值。
 * 这将替换数据库中设置的价格。
 *
 *   <Percent Price Variable: x>
 *   - 设置定义价格百分比修饰符的变量。
 * 如果变量的值为100，则百分比为100%。
 * 如果变量的值为50，则百分比为50%。
 * 如果变量的值为350，则百分比为350%。
 * 使用此notetag的倍数可使多个变量影响价格。
 * 这是在基价之后计算的。
 *
 *   <Increase Price Variable: x>
 *   - 设置定义价格固定增减的变量。
 * 如果变量的值是100，那么价格将增加100。
 * 如果变量的值是-200，那么价格将减少200。
 * 使用此notetag的倍数可使多个变量影响价格。
 * 这是在价格百分比修饰符之后计算的。
 *
 *   <Exact Price Variable: x>
 *   - 设置确定价格确切值的变量。
 * 如果变量的值为50，则价格变为50。
 * 如果变量的值为2000，则价格变为2000。
 * 这将忽略所有其他修改器。
 *
 *   <Price Minimum: x>
 *   <Price Maximum: x>
 *   - 设置价格可以达到的最小/最大值。这是用来
 * 防止一些价格急剧膨胀。
 *
 * ============================================================================
 * 计算顺序
 * ============================================================================
 *
 * 计算将按以下顺序进行：
 *  
 * 1.项目默认价格
 *  2. <Base Price Variable: x>
 * 3.由全局百分比变量plugin参数计算的百分比
 * 4.所有<Percent Price Variable:x>
 * 5.通过全局增量变量plugin参数计算的平增量
 * 6.所有<Increase Price Variable:x>
 * 7.如果<Exact Price Variable:x>存在，则覆盖所有
 * 8.运行全局价格定案插件参数代码
 * 9.以<Price Minimum:x>和<Price Maximum:x>结束
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Fixed a bug that would reset the global variables.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param GlobalPricePercVar
 * @text 全局价格%变量
 * @type variable
 * @desc 用于定义全局价格百分比的变量。
 * 如果你不想用的话就把它设为零。
 * @default 0
 *
 * @param GlobalPriceFlatVar
 * @text 全局价格+可变
 * @type variable
 * @desc 用于定义全局价格上涨的变量。
 * 如果你不想用的话就把它设为零。
 * @default 0
 *
 * @param GlobalPriceFinalize
 * @text 全局价格最终确定
 * @type note
 * @desc 在每个项目的价格计算结束时运行的JavaScript代码，
 * 用于确定价格。
 * @default "// The following variables can be used.\n// item - the item in question being analyzed\n// price - the finalized price of the item to be returned\n\n// Set price minimum and maximum.\nprice = price.clamp(0, $gameParty.maxGold());"
 *
 */
//=============================================================================

if (Imported.YEP_ShopMenuCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_CondShopPrices');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CnShPrGlobalPerc = Number(Yanfly.Parameters['GlobalPricePercVar']);
Yanfly.Param.CnShPrGlobalFlat = Number(Yanfly.Parameters['GlobalPriceFlatVar']);
Yanfly.Param.CnShPrFinalizePrice = new Function('item','price',
  JSON.parse(Yanfly.Parameters['GlobalPriceFinalize']) + '\nreturn price;');

//=============================================================================
// Game_System
//=============================================================================

Yanfly.CnShPr.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.CnShPr.Game_System_initialize.call(this);
  this.initConditionalShopPricesSettings();
};

Game_System.prototype.initConditionalShopPricesSettings = function() {
  if (!$gameVariables) return;
  this._initiatedConditionalShopPriceVariables = true;
  if (Yanfly.Param.CnShPrGlobalPerc > 0 && !this._setupCnShPrGlobalPerc) {
    $gameVariables.setValue(Yanfly.Param.CnShPrGlobalPerc, 100);
    this._setupCnShPrGlobalPerc = true;
  }
  if (Yanfly.Param.CnShPrGlobalFlat > 0 && !this._setupCnShPrGlobalFlat) {
    $gameVariables.setValue(Yanfly.Param.CnShPrGlobalFlat, 0);
    this._setupCnShPrGlobalFlat = true;
  }
};

Game_System.prototype.getGlobalPriceRate = function() {
  if (this._initiatedConditionalShopPriceVariables === undefined) {
    this.initConditionalShopPricesSettings();
  }
  if (Yanfly.Param.CnShPrGlobalPerc > 0) {
    return $gameVariables.value(Yanfly.Param.CnShPrGlobalPerc) / 100;
  } else {
    return 1;
  }
};

Game_System.prototype.getGlobalPriceFlat = function() {
  if (this._initiatedConditionalShopPriceVariables === undefined) {
    this.initConditionalShopPricesSettings();
  }
  if (Yanfly.Param.CnShPrGlobalFlat > 0) {
    return $gameVariables.value(Yanfly.Param.CnShPrGlobalFlat);
  } else {
    return 0;
  }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.CnShPr.Scene_Map_createDisplayObjects =
  Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
  Yanfly.CnShPr.Scene_Map_createDisplayObjects.call(this);
  $gameSystem.initConditionalShopPricesSettings();
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

Yanfly.CnShPr.Window_ShopBuy_price = Window_ShopBuy.prototype.price;
Window_ShopBuy.prototype.price = function(item) {
  var price = Yanfly.CnShPr.Window_ShopBuy_price.call(this, item);
  price = this.processConditionalShopPrices(item, price);
  return price;
};

Window_ShopBuy.prototype.processConditionalShopPrices = function(item, price) {
  if (item.baseItemId) {
    var note = DataManager.getBaseItem(item).note;
  } else {
    var note = item.note;
  }
  var notedata = note.split(/[\r\n]+/);
  // Base
  if (note.match(/<Base Price Variable:[ ](\d+)>/i)) {
    price = $gameVariables.value(Number(RegExp.$1));
  }
  // Rates
  price *= $gameSystem.getGlobalPriceRate();
  for (var i = 0; i < notedata.length; i++) {
    if (notedata[i].match(/<Percent Price Variable:[ ](\d+)>/i)) {
      price *= $gameVariables.value(Number(RegExp.$1)) / 100;
    }
  }
  // Flats
  price += $gameSystem.getGlobalPriceFlat();
  for (var i = 0; i < notedata.length; i++) {
    if (notedata[i].match(/<Increase Price Variable:[ ](\d+)>/i)) {
      price += $gameVariables.value(Number(RegExp.$1));
    }
  }
  // Exact
  if (note.match(/<Exact Price Variable:[ ](\d+)>/i)) {
    price = $gameVariables.value(Number(RegExp.$1));
  }
  // Finalize
  price = Yanfly.Param.CnShPrFinalizePrice.call(this, item, price);
  // Maximum/Minimum
  if (note.match(/<Price (?:Min|Minimum):[ ](\d+)>/i)) {
    price = Math.max(Number(RegExp.$1), price);
  }
  if (note.match(/<Price (?:Max|Maximum):[ ](\d+)>/i)) {
    price = Math.min(Number(RegExp.$1), price);
  }
  // Done
  return Math.max(0, Math.round(price));
};

//=============================================================================
// End of File
//=============================================================================

} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_CondShopPrices without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_ShopMenuCore