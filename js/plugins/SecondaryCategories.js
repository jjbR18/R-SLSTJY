//
//  拡張カテゴリ ver1.02
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['SecondaryCategories'] = 1.02;

/*:
 * @plugindesc ver1.02/アイテムにセカンダリカテゴリを設定できようにします。
 * @author Yana
 *
 * @param UseSubItemCategory
 * @desc 分类按钮为选中状态时，是否允许上下方向键进行切换？
 * @default true
 *
 * @param AllIncludesCategory
 * @desc 所有物品的类别名。
 * 在按类别指定时使用。
 * @default すべて
 *
 * @help------------------------------------------------------
 *  没有插件命令。
 * ------------------------------------------------------
 * ------------------------------------------------------
 *  使用方法
 * ------------------------------------------------------
 * 在物品备注栏内输入以下注释（二选一）
 * <分類:xxx>
 * <Category:xxx>
 * 
 * 这样，物品将作为其主分类（武器、护甲、物品）下的一个次级
 * 分类。分类可以是自定义的任何词语。一个物品可以有多个次级分类。
 * 
 * 此外，所有道具都拥有插件设置里的默认分类。
 *
 * 如果插件设置UseSubItemCategory为true，则当选中分类窗口时，
 * 您可以使用向上下方向键（或滚乱）切换主次分类。
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.02:170110-2
 * 武器と防具のコマンド名がカテゴリに登録されていなかったバグを修正。
 * ver1.01:170110-1
 * セカンダリカテゴリの選択をホイールでもできるように機能を追加
 * ver1.00:
 * 公開
 */

(function() {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('SecondaryCategories');
    var useSubItemCategory = parameters['UseSubItemCategory'] === 'true';
    var allIncludesCategory = parameters['AllIncludesCategory'];

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.itemSecondaryCategories = function(item) {
        if (!item) return [];
        if (item._secondaryCategories) return item._secondaryCategories;
        item._secondaryCategories = [allIncludesCategory];
        var texts = item.note.split('\n');
        for (var i =0,max=texts.length;i<max;i++) {
            var text = texts[i];
            if (text.match(/<(?:分類|Category):(.+)>/)) {
                var cn = RegExp.$1;
                item._secondaryCategories.push(cn);
            }
        }
        if (this.isItemEx(item) && item.itypeId === 1){
            item._secondaryCategories.push(TextManager.item);
        } else if (this.isWeaponEx(item)) {
            var wtype = $dataSystem.weaponTypes[item.wtypeId];
            if (wtype) item._secondaryCategories.push(wtype);
            var etype = $dataSystem.equipTypes[item.etypeId];
            item._secondaryCategories.push(etype);
            var weapon = TextManager.weapon;
            if (item._secondaryCategories.indexOf(weapon) < 0) item._secondaryCategories.push(weapon);
        } else if (this.isArmorEx(item)) {
            var atype = $dataSystem.armorTypes[item.atypeId];
            item._secondaryCategories.push(atype);
            var etype = $dataSystem.equipTypes[item.etypeId];
            item._secondaryCategories.push(etype);
            var armor = TextManager.armor;
            if (item._secondaryCategories.indexOf(armor) < 0) item._secondaryCategories.push(armor);
        } else if (this.isItemEx(item) && item.itypeId === 2) {
            item._secondaryCategories.push(TextManager.keyItem);
        }
        return item._secondaryCategories;
    };
    
    DataManager.isItemEx = function(item) {
        if (!item._type) this.initItemType(item);
        return item._itemType === 0;
    };
    
    DataManager.isWeaponEx = function(item) {
        if (!item._type) this.initItemType(item);
        return item._itemType === 1;
    };
    
    DataManager.isArmorEx = function(item) {
        if (!item._type) this.initItemType(item);
        return item._itemType === 2;
    };
    
    DataManager.isSkillEx = function(item) {
        if (!item._type) this.initItemType(item);
        return item._itemType === 3;
    };
    
    DataManager.initItemType = function(item) {
        item._itemType = -1;
        if (DataManager.isItem(item))   item._itemType = 0;
        if (DataManager.isWeapon(item)) item._itemType = 1;
        if (DataManager.isArmor(item))  item._itemType = 2;
        if (DataManager.isSkill(item))  item._itemType = 3;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    if (useSubItemCategory) {

        var __WICategory_initialize = Window_ItemCategory.prototype.initialize;
        Window_ItemCategory.prototype.initialize = function () {
            this._subIndex = [0, 0, 0, 0, 0];
            __WICategory_initialize.call(this);
        };

        Window_ItemCategory.prototype.cursorUp =function(wrap) {
            if (this.isOpenAndActive() && (this._list.length < 5 || this.index() > 0)) {
                    this.backSubCategory();
                    this._stayCount = -5;
            }
        };

        Window_ItemCategory.prototype.cursorDown = function(wrap) {
            if (this.isOpenAndActive() && (this._list.length < 5 || this.index() > 0)) {
                this.forwardSubCategory();
                this._stayCount = -5;
            }
        };

        Window_ItemCategory.prototype.drawItem = function (index) {
            if (this._subIndex[index] === 0) {
                Window_HorzCommand.prototype.drawItem.call(this, index);
            } else {
                var rect = this.itemRectForText(index);
                var align = this.itemTextAlign();
                this.resetTextColor();
                this.changePaintOpacity(this.isCommandEnabled(index));
                this.drawText(this.subCommandName(index), rect.x, rect.y, rect.width, align);
            }
        };

        Window_ItemCategory.prototype.subCommandName = function (index) {
            if (!this._categories) this.initCategories();
            return this._categories[index][this._subIndex[index]];
        };

        Window_ItemCategory.prototype.initCategories = function () {
            this._categories = [[], [], [], [], []];
            var n = 0;
            if (Imported['LimitPossession'] && $gameParty.reserveItems().length > 0) n = 1;
            this.allItems().forEach(function (item) {
                var sc = DataManager.itemSecondaryCategories(item);
                var id = -1;
                if (DataManager.isItemEx(item))     id = n;
                if (DataManager.isWeaponEx(item))   id = n+1;
                if (DataManager.isArmorEx(item))    id = n+2;
                if (id === n && item.itypeId === 2) id = n+3;
                for (var i = 0, max = sc.length; i < max; i++) {
                    if (sc[i] === allIncludesCategory) continue;
                    if (sc[i] === TextManager.item) continue;
                    if (sc[i] === TextManager.keyItem) continue;
                    if (sc[i] === TextManager.weapon) continue;
                    if (sc[i] === TextManager.armor) continue;
                    if (!this._categories[id].contains(sc[i])) {
                        this._categories[id].push(sc[i]);
                    }
                }
            }.bind(this));
            this._categories[n].sort();
            this._categories[n+1].sort();
            this._categories[n+2].sort();
            this._categories[n+3].sort();
            this._categories[n].unshift('');
            this._categories[n+1].unshift('');
            this._categories[n+2].unshift('');
            this._categories[n+3].unshift('');
            this._subIndex = [0, 0, 0, 0, 0];
        };

        Window_ItemCategory.prototype.allItems = function() {
            return $gameParty.allItems();
        };

        Window_ItemCategory.prototype.categorySize = function (index) {
            if (!this._categories) this.initCategories();
            return this._categories[index].length;
        };

        Window_ItemCategory.prototype.currentSubCategory = function () {
            if (!this._categories) this.initCategories();
            var index = this.index();
            return this._categories[index][this._subIndex[index]];
        };

        Window_ItemCategory.prototype.forwardSubCategory = function () {
            var max = this.categorySize(this.index());
            if (max === 1) return;
            this._subIndex[this.index()] = (this._subIndex[this.index()] + 1) % max;
            this._itemWindow.setSubCategory(this.currentSubCategory());
            SoundManager.playCursor();
            this.refresh();
        };

        Window_ItemCategory.prototype.backSubCategory = function () {
            var max = this.categorySize(this.index());
            if (max === 1) return;
            this._subIndex[this.index()] = (this._subIndex[this.index()] + (max - 1)) % max;
            this._itemWindow.setSubCategory(this.currentSubCategory());
            SoundManager.playCursor();
            this.refresh();
        };

        Window_ItemCategory.prototype.scrollDown = function() {
            this.forwardSubCategory();
        };

        Window_ItemCategory.prototype.scrollUp = function() {
            this.backSubCategory();
        };

        Window_ItemCategory.prototype.select = function(index) {
            Window_HorzCommand.prototype.select.call(this, index);
            if (this._itemWindow) this._itemWindow.setSubCategory(this.currentSubCategory());
        };

        ////////////////////////////////////////////////////////////////////////////////////

        var __WIList_includes = Window_ItemList.prototype.includes;
        Window_ItemList.prototype.includes = function (item) {
            var result = __WIList_includes.call(this, item);
            if (result && this._subCategory) {
                var sc = DataManager.itemSecondaryCategories(item);
                result = result && sc.contains(this._subCategory);
            }
            return result;
        };

        Window_ItemList.prototype.setSubCategory = function (category) {
            if (this._subCategory !== category) {
                this._subCategory = category;
                this.refresh();
                this.resetScroll();
            }
        };

        ////////////////////////////////////////////////////////////////////////////////////
    }
}());