//=============================================================================
// Yanfly Engine Plugins - Shop Menu Extension - Hide/Show Shop Items
// YEP_X_HideShowShopItems.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_HideShowShopItems = true;

var Yanfly = Yanfly || {};
Yanfly.HSSI = Yanfly.HSSI || {};
Yanfly.HSSI.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 有条件显示/隐藏商品(已翻译)
 * @author Yanfly Engine Plugins
 *
 * @help
 * 插件更新:yanfly.moe/plugins/en/YEP_X_HideShowShopItems.js
 * 确保该插件在插件列表中位于YEP_ShopMenuCore下方。
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * ※注意1:没有隐藏条件的物品会默认为隐藏状态。
 * ※注意2:插入多个备注可以增加该物品在商店中隐藏的条件。
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 道具/武器/防具备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 如果开关"x"为开/关,该物品在商店中隐藏,否则该物品在商店中显示:
 * <Shop Hide if Switch On: x> / <Shop Hide if Switch Off: x>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 任意1个开关"x"为开/关,该物品都会在商店中隐藏,否则该物品在商店中显示:
 * <Shop Hide if Any Switch On: x>
 * <Shop Hide if Any Switch On: x, x, x>
 * <Shop Hide if Any Switch Off: x>
 * <Shop Hide if Any Switch Off: x, x, x>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 必须全部开关"x"为开/关,该物品才会在商店中隐藏,否则该物品在商店中显示:
 * <Shop Hide if All Switches On: x>
 * <Shop Hide if All Switches On: x, x, x>
 * <Shop Hide if All Switches Off: x>
 * <Shop Hide if All Switches Off: x, x, x>
 *
 * @param ShowFinalization
 * @text 最终隐藏/显示条件
 * @type note
 * @desc 为每个物品运行javascript代码,用于检查该物品是否将在全局范围内显示或隐藏。
 * @default "//可以使用的变量:item-正在计算的物品。\n\n//如果所检查的物品的名称为空,则不显示该物品。\nif (item.name.trim() === '') {\n  return false;\n}"
 *
 */
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_HideShowShopItems');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.HSSIFinalizeCode = new Function('item',
  JSON.parse(Yanfly.Parameters['ShowFinalization']) + '\nreturn true;');

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.HSSI.Scene_Shop_prepare = Scene_Shop.prototype.prepare;
Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
  goods = JsonEx.makeDeepCopy(goods);
  Yanfly.HSSI.Scene_Shop_prepare.call(this, goods, purchaseOnly);
  this.adjustHideShowGoods();
};

Scene_Shop.prototype.adjustHideShowGoods = function() {
  var length = this._goods.length;
  for (var i = 0; i < length; ++i) {
      var good = this._goods[i];
      if (this.isGoodShown(good)) continue;
      this._goods[i][0] = -1;
  }
};

Scene_Shop.prototype.isGoodShown = function(good) {
  // Get Database Item
  var item = null;
  switch (good[0]) {
  case 0:
    item = $dataItems[good[1]];
    break;
  case 1:
    item = $dataWeapons[good[1]];
    break;
  case 2:
    item = $dataArmors[good[1]];
    break;
  }
  if (!item) return false;
  if (!item.note) return false;
  // Check Notetags
  var notedata = item.note.split(/[\r\n]+/);
  var length = notedata.length;
  for (var i = 0; i < length; ++i) {
    var line = notedata[i];

    // <Shop Hide If Switch On: x>
    if (line.match(/<SHOP HIDE IF (?:SWITCH|SWITCHES) ON:[ ](\d+)>/i)) {
      var hide = $gameSwitches.value(Number(RegExp.$1));
      if (hide) return false;

    // <Shop Hide If Switch Off: x>
    } else if (line.match(/<SHOP HIDE IF (?:SWITCH|SWITCHES) OFF:[ ](\d+)>/i)) {
      var hide = !$gameSwitches.value(Number(RegExp.$1));
      if (hide) return false;

    // <Shop Hide If Any Switch On: x, x, x>
    } else if (line.match(/<SHOP HIDE IF ANY (?:SWITCH|SWITCHES) ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      var hide = false;
      for (var a = 0; a < array.length; ++a) {
        var switchId = array[a];
        if ($gameSwitches.value(switchId)) hide = true;
      }
      if (hide) return false;

    // <Shop Hide If Any Switch Off: x, x, x>
    } else if (line.match(/<SHOP HIDE IF ANY (?:SWITCH|SWITCHES) OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      var hide = false;
      for (var a = 0; a < array.length; ++a) {
        var switchId = array[a];
        if (!$gameSwitches.value(switchId)) hide = true;
      }
      if (hide) return false;

    // <Shop Hide If All Switches On: x, x, x>
    } else if (line.match(/<SHOP HIDE IF ALL (?:SWITCH|SWITCHES) ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      var hide = true;
      for (var a = 0; a < array.length; ++a) {
        var switchId = array[a];
        if (!$gameSwitches.value(switchId)) hide = false;
      }
      if (hide) return false;

    // <Shop Hide If All Switches Off: x, x, x>
    } else if (line.match(/<SHOP HIDE IF ALL (?:SWITCH|SWITCHES) OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
      var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      var hide = true;
      for (var a = 0; a < array.length; ++a) {
        var switchId = array[a];
        if ($gameSwitches.value(switchId)) hide = false;
      }
      if (hide) return false;

    // End
    }
  }
  // Return true otherwise
  return Yanfly.Param.HSSIFinalizeCode.call(this, item);
};

//=============================================================================
// End of File
//=============================================================================