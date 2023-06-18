//=============================================================================
// Yanfly Engine Plugins - Extension Plugin - Tick Based Regeneration
// YEP_X_TickBasedRegen.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_TickBasedRegen = true;

var Yanfly = Yanfly || {};
Yanfly.TBR = Yanfly.TBR || {};

//=============================================================================
 /*:
 * @plugindesc v1.03 时间刻度★
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * 导言
 *  ============================================================================
 * 
 * 此插件需要YEP\u BattleEngineCore.js和YEP\u BuffsStatesCore.js。
 * 确保此插件位于中列出的两个插件下
 * 插件列表。
 * 
 * 对于那些使用战斗引擎核心运行基于Tick的战斗系统的人来说
 * （即主动回合战或冲锋回合战），这将自动设置
 * 你的状态为转弯结束计时使用基于时间的系统，但反过来，
 * 使再生效果单独发生。
 * 
 * 这意味着，如果哈罗德收到低恢复，然后50滴答之后，
 * 接受高治疗回复，哈罗德不会同时回复生命。
 * 相反，他将分别为低恢复和高恢复再生
 * 治疗再生。
 * 
 * 对于不关闭末端系统但仍使用
 * 再生效果，这些效果也会以打勾的方式产生。
 * 
 * 疯狂模式从buff&amp;States核心插件中恢复效果
 * 与常规per相反，周期定时系统也起作用
 * 演员转身系统。
 * 
 * 如果重新应用状态，再生计数器也将重置
 * 与州的转弯计数器同步。
 * 
 * 如果一个战斗员处于被动状态，那么该战斗员的再生效果将
 * 每次战斗开始时重置，战斗结束时清除。为了
 * 例如，如果您为
 * 打勾的状态是100，在战斗开始时，所有的被动状态都会出现
 * 重置为100并且必须在再生效果触发前达到0。
 * 
 *  * 注意：只有状态在基于记号的再生中起作用。马力/马力/马力
 * 从演员、职业、敌人、武器或盔甲的特征中获得重生
 * 数据库对象条目将在战斗结束时出现。
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Added anti-crash method for actors that are joining mid-party.
 *
 * Version 1.02:
 * - Fixed a bug that caused HP/MP/TP regeneration from non-states to not
 * function properly. They will now occur at turn end.
 *
 * Version 1.01:
 * - Fixed a bug that caused tick-based states to not trigger Leave effects.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore && Imported.YEP_BuffsStatesCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Param.BECTimeStates = 'true';

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.TBR.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    this._cacheStatesLength = undefined;
    this._cacheStatesIndex = [];
    Yanfly.TBR.Game_BattlerBase_refresh.call(this);
};

Yanfly.TBR.Game_BattlerBase_traitObjects =
    Game_BattlerBase.prototype.traitObjects;
Game_BattlerBase.prototype.traitObjects = function() {
    if ($gameTemp._tickBasedTraits) return [];
    return Yanfly.TBR.Game_BattlerBase_traitObjects.call(this);
};

Yanfly.TBR.Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
Game_Battler.prototype.regenerateHp = function() {
    if (BattleManager.timeBasedStates()) $gameTemp._tickBasedTraits = true;
    Yanfly.TBR.Game_Battler_regenerateHp.call(this);
    $gameTemp._tickBasedTraits = undefined;
};

Yanfly.TBR.Game_Battler_regenerateMp = Game_Battler.prototype.regenerateMp;
Game_Battler.prototype.regenerateMp = function() {
    if (BattleManager.timeBasedStates()) $gameTemp._tickBasedTraits = true;
    Yanfly.TBR.Game_Battler_regenerateMp.call(this);
    $gameTemp._tickBasedTraits = undefined;
};

Yanfly.TBR.Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp;
Game_Battler.prototype.regenerateTp = function() {
    if (BattleManager.timeBasedStates()) $gameTemp._tickBasedTraits = true;
    Yanfly.TBR.Game_Battler_regenerateTp.call(this);
    $gameTemp._tickBasedTraits = undefined;
};

Game_BattlerBase.prototype.updateStateTicks = function() {
    if (this.isDead()) return;
    var needRefresh = false;
    var length = this._cacheStatesLength || this.states().length;
    this._cachePassiveTicks = this._cachePassiveTicks || {};
    this._cacheStatesIndex = this._cacheStatesIndex || [];
    for (var i = 0; i < length; ++i) {
      if (!this._cacheStatesIndex[i]) {
        var state = this.states()[i];
        if (state) this._cacheStatesIndex[i] = this.states()[i].id;
      }
      var stateId = this._cacheStatesIndex[i];
      var state = $dataStates[stateId];
      if (!state) continue;
      if (state.autoRemovalTiming === 2 && this._stateTurns[stateId]) {
        var value = BattleManager.tickRate() / Yanfly.Param.BECTurnTime;
        var shown1 = Math.ceil(this._stateTurns[stateId]);
        this._stateTurns[stateId] -= value;
        var shown2 = Math.ceil(this._stateTurns[stateId]);
      } else {
        if (!this._cachePassiveTicks[stateId]) {
          this._cachePassiveTicks[stateId] = Yanfly.Param.BECTurnTime;
        }
        var value = BattleManager.tickRate() / Yanfly.Param.BECTurnTime;
        var shown1 = Math.ceil(this._cachePassiveTicks[stateId]);
        this._cachePassiveTicks[stateId] -= value;
        var shown2 = Math.ceil(this._cachePassiveTicks[stateId]);
      }
      if (shown1 !== shown2) {
        this.updateStateTickRegen(state);
        needRefresh = true;
      }
      if (state.autoRemovalTiming === 2) {
        if (this._stateTurns[stateId] && this._stateTurns[stateId] <= 0) {
          $gameTemp._customLeaveEffectEval = true;
          this.removeState(stateId);
          $gameTemp._customLeaveEffectEval = undefined;
        }
      }
    }
    if (needRefresh) this.refresh();

};

Game_BattlerBase.prototype.updateStateTickRegen = function(state) {
    this.clearResult();
    this.regenerateHpTick(state);
    this.regenerateMpTick(state);
    this.regenerateTpTick(state);
    this.startDamagePopup();
    this.clearResult();
    this.regenerateStateEffects(state.id);
    this.clearResult();
};

Game_BattlerBase.prototype.getStateTickTraits = function(state, code, dataId) {
    var length = state.traits.length;
    var value = 0;
    for (var i = 0; i < length; ++i) {
      var trait = state.traits[i];
      if (trait.code === code && trait.dataId === dataId) {
        value += trait.value;
      }
    }
    return value;
};

Game_BattlerBase.prototype.regenerateHpTick = function(state) {
    var rate = this.getStateTickTraits(state, 22, 7);
    var value = Math.floor(this.mhp * rate);
    value = Math.max(value, -this.maxSlipDamage());
    if (value !== 0) {
      this.clearResult();
      this.gainHp(value);
      this.startDamagePopup();
      this.clearResult();
    }
};

Game_BattlerBase.prototype.regenerateMpTick = function(state) {
    var rate = this.getStateTickTraits(state, 22, 8);
    var value = Math.floor(this.mmp * rate);
    if (value !== 0) {
      this.clearResult();
      this.gainMp(value);
      this.startDamagePopup();
      this.clearResult();
    }
};

Game_BattlerBase.prototype.regenerateTpTick = function(state) {
    var rate = this.getStateTickTraits(state, 22, 9);
    var value = Math.floor(this.maxTp() * rate);
    if (value !== 0) this.gainSilentTp(value);
};

Yanfly.TBR.Game_BattlerBase_resetStateCounts =
    Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    Yanfly.TBR.Game_BattlerBase_resetStateCounts.call(this, stateId);
    var state = $dataStates[stateId];
    if (state && state.reapplyRules !== 0) {
      this._cachePassiveTicks = this._cachePassiveTicks || {};
      this._cachePassiveTicks[stateId] = Yanfly.Param.BECTurnTime;
    }
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.TBR.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    this._cachePassiveTicks = {};
    Yanfly.TBR.Game_Battler_onBattleStart.call(this);
};

Yanfly.TBR.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    this._cachePassiveTicks = {};
    Yanfly.TBR.Game_Battler_onBattleEnd.call(this);
};

Yanfly.TBR.Game_Battler_onRegenerateStateEffects =
    Game_Battler.prototype.onRegenerateStateEffects;
Game_Battler.prototype.onRegenerateStateEffects = function() {
    if (BattleManager.timeBasedStates()) return;
    Yanfly.TBR.Game_Battler_onRegenerateStateEffects.call(this);
};

//=============================================================================
// End of File
//=============================================================================
};