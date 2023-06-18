//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Item Picture Images
// YEP_X_ItemPictureImg.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemPictureImg = true;

var Yanfly = Yanfly || {};
Yanfly.IPI = Yanfly.IPI || {};
Yanfly.IPI.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 更换物品图标☁️
 * @author Yanfly Engine Plugins
 *
 * @param Max Image Width
 * @text 最大图像宽度
 * @type number
 * @min 1
 * @desc Maximum image width for picture if used.
 * Not suggested to go above 144.
 * @default 128
 *
 * @param Max Image Height
 * @text 最大图像高度
 * @type number
 * @min 1
 * @desc Maximum image height for picture if used.
 * Not suggested to go above 144.
 * @default 128
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 这个插件需要YEP\u ItemCore。确保此插件位于插件列表中的YEP\u ItemCore下。
 * 
 * 对于那些使用YEP\u ItemCore并启用“Updated Scene Item”插件参数的用户，
 * 您可能已经注意到屏幕中央的大图标。有没有想过如果用图像来代替呢？
 * 这个插件将添加功能，使用图像从您的游戏的'图片'文件夹来表示项目，而
 * 不仅仅是图标。现在，你可以添加更多的方式来为你的游戏注入活力！
 * 
 *  ============================================================================
 * 便签
 *  ============================================================================
 * 
 * 在物品、武器和/或盔甲中插入以下便签
 * 以便在物品菜单中为它们提供独特的图像。
 * 
 * 物品、武器和护甲标签：
 *
 *   <Picture: filename>
 * - 这会将项目设置为使用游戏项目文件夹中“图片”文件夹中的“文件名”图像。
 * 对于“filename”，不要包含文件扩展名。
 * 如果您使用的是名为“Potion.png”的图像，
 * 只需将notetag中的文件名替换为“Potion”。
 * 所有内容都区分大小写。此notetag将默认色调设置为0。
 *
 *   <Picture Image: filename>
 * - 这会将项目设置为使用游戏项目文件夹中“图片”文件夹中的“文件名”图像。
 * 对于“filename”，不要包含文件扩展名。
 * 如果您使用的是名为“Potion.png”的图像，
 * 只需将notetag中的文件名替换为“Potion”。
 * 所有内容都区分大小写。这个标签不会改变色调。
 *
 *   <Picture Hue: x>
 * - 这会将项目的图片设置为使用色调x。
 * 改变色调将调整所用图片的颜色色调。
 * 使用0到360之间的值作为色调。
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

if (Imported.YEP_ItemCore) {
if (Yanfly.Item.version && Yanfly.Item.version >= 1.26) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ItemPictureImg');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ItemImageMaxWidth = Number(Yanfly.Parameters['Max Image Width']);
Yanfly.Param.ItemImageMaxHeight = Number(Yanfly.Parameters['Max Image Height']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.IPI.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.IPI.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_ItemPictureImg) {
    this.processItemImageNotetags1($dataItems);
    this.processItemImageNotetags1($dataWeapons);
    this.processItemImageNotetags1($dataArmors);
    Yanfly._loaded_YEP_X_ItemPictureImg = true;
  }
  
  return true;
};

DataManager.processItemImageNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.pictureImg = '';
    obj.pictureHue = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:PICTURE):[ ](.*)>/i)) {
        obj.pictureImg = String(RegExp.$1);
        obj.pictureHue = 0;
      } else if (line.match(/<(?:PICTURE IMAGE|PICTURE NAME):[ ](.*)>/i)) {
        obj.pictureImg = String(RegExp.$1);
      } else if (line.match(/<(?:PICTURE HUE):[ ](\d+)>/i)) {
        obj.pictureHue = parseInt(RegExp.$1).clamp(0, 360);
      }
    }
  }
};

//=============================================================================
// Item Manage
//=============================================================================

ItemManager.getItemPictureImageFilename = function(item) {
  if (!item) return '';
  if (item.pictureImg === undefined) {
    if (item.baseItemId) {
      var baseItem = DataManager.getBaseItem(item);
      item.pictureImg = baseItem.pictureImg;
    } else {
      return '';
    }
  }
  if (item.pictureHue === undefined) {
    if (item.baseItemId) {
      var baseItem = DataManager.getBaseItem(item);
      item.pictureHue = baseItem.pictureHue;
    } else {
      return item.pictureHue = 0;
    }
  }
  return item.pictureImg;
};

ItemManager.getItemPictureImage = function(item) {
  if (!item) return new Bitmap(1, 1);
  var filename = this.getItemPictureImageFilename(item);
  var hue = item.pictureHue;
  return ImageManager.loadPicture(filename, hue);
};

ItemManager.effectIUSPictureHue = function(item, filename, hue) {
  if (filename !== undefined) {
    item.pictureImg = filename;
  }
  if (hue !== undefined) {
    item.pictureHue = hue;
  }
};

ItemManager.applyAugmentSetPictureImg = function(mainItem, img, slot, add) {
    mainItem.augmentPictureImg = mainItem.augmentPictureImg || [];
    if (add) {
      mainItem.augmentPictureImg[slot] = img;
    } else {
      mainItem.augmentPictureImg[slot] = undefined;
    }
    var baseImg = DataManager.getBaseItem(mainItem).pictureImg;
    var id = this.getAugmentFirstValue(mainItem.augmentPictureImg, baseImg);
    mainItem.pictureImg = id;
};

ItemManager.applyAugmentSetPictureHue = function(mainItem, Hue, slot, add) {
    mainItem.augmentPictureHue = mainItem.augmentPictureHue || [];
    if (add) {
      mainItem.augmentPictureHue[slot] = Hue;
    } else {
      mainItem.augmentPictureHue[slot] = undefined;
    }
    var baseHue = DataManager.getBaseItem(mainItem).pictureHue;
    var id = this.getAugmentFirstValue(mainItem.augmentPictureHue, baseHue);
    mainItem.pictureHue = id;
};

//=============================================================================
// Require Yanfly.Param.ItemSceneItem
//=============================================================================

if (Yanfly.Param.ItemSceneItem) {

//=============================================================================
// Window_ItemStatus
//=============================================================================

Yanfly.IPI.Window_ItemStatus_drawItemIcon =
  Window_ItemStatus.prototype.drawItemIcon;
Window_ItemStatus.prototype.drawItemIcon = function() {
  if (this.itemHasPictureImage()) {
    this.readyItemPictureImage(this._item);
  } else {
    Yanfly.IPI.Window_ItemStatus_drawItemIcon.call(this);
  }
};

Window_ItemStatus.prototype.itemHasPictureImage = function() {
  if (!this._item) return false;
  var filename = ItemManager.getItemPictureImageFilename(this._item);
  return filename !== '';
};

Window_ItemStatus.prototype.readyItemPictureImage = function(item) {
  if (item !== this._item) return;
  var bitmap = ItemManager.getItemPictureImage(item);
  if (bitmap.width <= 0) {
    return setTimeout(this.readyItemPictureImage.bind(this, item), 250);
  } else {
    this.drawItemPictureImage(bitmap);
  }
};

Window_ItemStatus.prototype.drawItemPictureImage = function(bitmap) {
  var pw = bitmap.width;
  var ph = bitmap.height;
  var sx = 0;
  var sy = 0;
  var dw = pw;
  var dh = ph;
  if (dw > Yanfly.Param.ItemImageMaxWidth) {
    var rate = Yanfly.Param.ItemImageMaxWidth / dw;
    dw = Math.floor(dw * rate);
    dh = Math.floor(dh * rate);
  }
  if (dh > Yanfly.Param.ItemImageMaxHeight) {
    var rate = Yanfly.Param.ItemImageMaxHeight / dh;
    dw = Math.floor(dw * rate);
    dh = Math.floor(dh * rate);
  }
  var dx = (Window_Base._faceWidth - dw) / 2;
  var dy = (Window_Base._faceHeight - dh) / 2;
  this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
};

}; // Yanfly.Param.ItemSceneItem

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_ItemPictureImg requires YEP_ItemCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_ItemCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Yanfly.Item.version
}; // Imported.YEP_ItemCore