//=============================================================================
// Yanfly Engine Plugins - FPS Synch Option
// YEP_FpsSynchOption.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SynchFpsOption = true;

var Yanfly = Yanfly || {};
Yanfly.FpsSynch = Yanfly.FpsSynch || {};
Yanfly.FpsSynch.version = 1.03;

//=============================================================================
 /*:
 * @plugindesc v1.03 帧数同步选项☁️
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @text 命令名称
 * @desc Command name used inside of the Options menu.
 * @default 帧数同步
 *
 * @param Default Setting
 * @text 默认设置
 * @type boolean
 * @on ON
 * @off OFF
 * @desc The default setting of the Synch Monitor FPS.
 * OFF - false (Recommended)  ON - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 该插件将与RPG Maker MV 1.1.0及以上版本一起使用。
 *
 * MV是基于帧来更新的。通常这样表现不错，因为大多数玩家的FPS都在60，
 * 但是有些玩家超过60就会非常不舒服
 *
 * MV升级到1.1.0后，基于时间流来行走，这就强制玩家在60fps游戏。
 * 实际上，这样是有效果的，对于他们能够超过60fps来说，这样就可以保证游戏
 *
 * 可是对于一些老旧设备，不能支持MV到60fps的时候，游戏将会卡顿。
 *
 * 这个插件可以让设置菜单能够开启同步选项。
 * 这样，玩家就可以选择是否基于时间流来运行游戏
 *
 * ============================================================================
 * Options Core Settings - Adding the New Options
 * ============================================================================
 *
 * If you are using YEP_OptionsCore.js, you can add a new Option using this
 * plugin. Here's the following code/parameter settings you can use with it.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[302]Synch Monitor FPS
 *
 * Help Description:
 * Turn this ON if your monitor runs above 60 FPS
 * to synchronize the game to run at 60 FPS.
 *
 * Symbol:
 * synchFps
 *
 * Show/Hide:
 * show = Imported.YEP_SynchFpsOption;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 *
 * Default Config Code:
 * // Empty. Provided by this plugin.
 *
 * Save Config Code:
 * // Empty. Provided by this plugin.
 *
 * Load Config Code:
 * // Empty. Provided by this plugin.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Compatibility update with YEP_OptionsCore.js.
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.01:
 * - The plugin is now prevented if the project's core files are under version
 * RPG Maker MV 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.1.0') {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_FpsSynchOption');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.FpsSynchCmd = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.FpsSDefault = eval(String(Yanfly.Parameters['Default Setting']));

//=============================================================================
// MainCode
//=============================================================================

ConfigManager.synchFps = Yanfly.Param.FpsSDefault;

Yanfly.FpsSynch.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.FpsSynch.ConfigManager_makeData.call(this);
    config.synchFps = this.synchFps;
    return config;
};

Yanfly.FpsSynch.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.FpsSynch.ConfigManager_applyData.call(this, config);
    this.synchFps = this.readConfigFpsSynch(config, 'synchFps');
};

ConfigManager.readConfigFpsSynch = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return Yanfly.Param.FpsSDefault;
    }
};

//=============================================================================
// SceneManager
//=============================================================================

SceneManager.updateMainFluidTimestep = SceneManager.updateMain;

SceneManager.updateMain = function() {
    if (ConfigManager.synchFps) {
      this.updateMainFluidTimestep();
    } else {
      this.updateMainNoFpsSynch();
    }
};

SceneManager.updateMainNoFpsSynch = function() {
    this.updateInputData();
    this.changeScene();
    this.updateScene();
    this.renderScene();
    this.requestUpdate();
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.FpsSynch.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Yanfly.FpsSynch.Window_Options_addGeneralOptions.call(this);
    if (!Imported.YEP_OptionsCore) {
      this.addCommand(Yanfly.Param.FpsSynchCmd, 'synchFps');
    }
};

//=============================================================================
// Version Compatibility Update
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run FPS Synch ';
text += 'Options while your project files are lower than version 1.1.0. \n\n';
text += 'Please visit this thread for instructions on how to update your ';
text += 'project files to 1.1.0 or higher: \n\n';
text += 'http://forums.rpgmakerweb.com/index.php?/topic/';
text += '71400-rpg-maker-mv-v134-update/';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.1.0')

//=============================================================================
// End of File
//=============================================================================
