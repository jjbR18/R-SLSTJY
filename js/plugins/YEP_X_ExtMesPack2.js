//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Extended Message Pack 2
// YEP_X_ExtMesPack2.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ExtMesPack2 = true;

var Yanfly = Yanfly || {};
Yanfly.EMP2 = Yanfly.EMP2 || {};
Yanfly.EMP2.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 拓展信息包2☁️
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
 * 这个插件利用文本代码将重要信息传递给用户
 * 玩家。它可以运送大量的物品，武器和盔甲
 * 玩家拥有的各种参数，额外的参数，和特殊的
 * 角色和敌人的参数。新的文本代码还允许您
 * 根据条件方式的两个数字比较更改文本颜色
 * 为文本上色。除了条件颜色，文本也可以
 * 基于开关值或自定义条件显示。
 * 
 * 注意：这个插件与RPG Maker mv1.5.0+配合使用效果最好。RPG的低版本
 * makermv仍然可以使用这个插件，但是你不能完全使用它
 * 舒适地利用插件参数特性。
 * 
 *  ============================================================================
 * 文本代码
 *  ============================================================================
 * 
 * 通过在消息中使用某些文本代码，可以替换游戏
 * 它们具有以下特性：
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Quantity    Effect:
 *  \qi[x]      - 返回参与方当前拥有的项目x的数量。
 *  \qw[x]      - 返回该方当前拥有的武器x的数量。
 *  \qa[x]      - 返回该方当前拥有的护甲数量x。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
*比较效果：基于x和y更改文本颜色。默认值：
 *  \compare<x:y>    - x >= y = Green   x < y = Red
 *  \compare1<x:y>   - x >= y = Red     x < y = White
 *  \compare2<x:y>   - x >= y = Yellow  x < y = White
 *  \compare3<x:y>   - x >= y = Green   x < y = White
 *  \compare4<x:y>   - x >= y = Blue    x < y = Purple
 *  \compare5<x:y>   - x >= y = White   x < y = Grey
 *  \compare6<x:y>   - x >= y = White   x < y = Red
 *  \compare7<x:y>   - x >= y = White   x < y = Purple
 *  \compare8<x:y>   - x >= y = White   x < y = Dark Blue
 *  \compare9<x:y>   - x >= y = White   x < y = Brown
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
*大小写效果：根据条件返回不同的字符串。
 *
 *  \caseSwitch{s?x:y}  -如果开关s打开，则返回文本x。
 *                                 如果开关s关闭，则返回文本y。
 *
 *  \caseEval{e?x:y}    -如果eval code e为true，则返回文本x。
 *                                如果评估代码e为false，则返回文本y。
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  ActorParam  Effect:
 *  \amhp[x]       - 返回actor x的MaxHP值。
 *  \ahp[x]       - 返回actor x的当前HP值。
 *  \ahp%[x]       - 返回参与者x的生命值。
 *  \ammp[x]       - 返回actor x的MaxMP值。
 *  \amp[x]       - 返回actor x的当前MP值。
 *  \amp%[x]       - 返回参与者x的MP速率。
 *  \amtp[x]       - 返回actor x的MaxTP值。
 *  \atp[x]       - 返回actor x的当前TP值。
 *  \atp%[x]       - 返回参与者x的TP速率。
 *  \aatk[x]       - 返回参与者x的ATK值。攻击
 *  \adef[x]       - 返回actor x的DEF值。防守
 *  \amat[x]       - 返回参与者x的MAT值。魔法攻击
 *  \amdf[x]       - 返回actor x的MDF值。魔法防御
 *  \aagi[x]       - 返回actor x的AGI值。敏捷性
 *  \aluk[x]       - 返回参与者x的LUK值。运气
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  ActorXParam  Effect:
 *  \ahit[x]       - 返回演员x的命中率。命中率
 *  \aeva[x]       - 返回演员x的EVA率。回避率
 *  \acri[x]       - 返回参与者x的CRI速率。临界速率
 *  \acev[x]       - 返回参与者x的CEV速率。临界逃逸率
 *  \amev[x]       - 返回参与者x的MEV速率。魔法闪避率
 *  \amrf[x]       - 返回参与者x的MRF率。魔法反射率
 *  \acnt[x]       - 返回参与者x的CNT速率。反击率
 * \ahrg[x]       -返回参与者x的HRG速率。HP再生率
 * \amrg[x]       -返回参与者x的MRG速率。MP再生率
 * \atrg[x]       -返回参与者x的TRG rate。TP再生率
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  ActorSParam  Effect:
 * \atgr[x]       -返回参与者x的TGR速率。目标利率
 * \agrd[x]       -返回参与者x的GRD速率。保护率
 * \arec[x]       -返回参与者x的REC rate。回收率
 * \apha[x]       -返回参与者x的PHA速率。药理学率
 * \amcr[x]       -返回参与者x的MCR速率。MP成本率
 * \atcr[x]       -返回参与者x的TCR速率。TP费率
 * \apdr[x]       -返回参与者x的PDR速率。物理损伤率
 * \amdr[x]       -返回参与者x的MDR率。魔法伤害率
 * \afdr[x]       -返回参与者x的FDR速率。楼面损坏率
 * \aexr[x]       -返回参与者x的EXR率。经验率
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  EnemyParam  Effect:
 * \emhp[x]       -返回敌人x的MaxHP值。
 * \ehp[x]       -返回敌人x的当前生命值。
 * \ehp%[x]       -返回敌人x的生命值。
 * \emmp[x]       -返回敌人x的MaxMP值。
 * \emp[x]       -返回敌人x的当前MP值。
 * \emp%[x]       -返回敌人x的MP值。
 * \emtp[x]       -返回敌人x的MaxTP值。
 * \etp[x]       -返回敌人x的当前TP值。
 * \etp%[x]       -返回敌人x的TP速率。
 * \eatk[x]       -返回敌人x的ATK值。攻击
 * \edef[x]       -返回敌人x的DEF值。防守
 * \emat[x]       -返回敌人x的MAT值。魔法攻击
 * \emdf[x]       -返回敌人x的MDF值。魔法防御
 * \eagi[x]       -返回敌人x的AGI值。敏捷性
 * \eluk[x]       -返回敌人x的LUK值。运气
 * \eexp[x]       -返回敌人x的经验值。经验
 * \egold[x]       -返回敌人x的金币值。黄金
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  EnemyXParam  Effect:
 * \ehit[x]       -返回敌人x的命中率。命中率
 * \eeva[x]       -返回敌人x的EVA率。回避率
 * \ecri[x]       -返回敌人x的CRI速率。临界速率
 * \ecev[x]       -返回敌人x的CEV速率。临界逃逸率
 * \emev[x]       -返回敌人x的MEV速率。魔法闪避率
 * \emrf[x]       -返回敌人x的MRF速率。幻觉反射率
 * \ecnt[x]       -返回敌人x的CNT速率。反击率
 * \ehrg[x]       -返回敌人x的HRG速率。HP再生率
 * \emrg[x]       -返回敌人x的MRG速率。MP再生率
 * \etrg[x]       -返回敌人x的TRG速率。TP再生率
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  EnemySParam  Effect:
 * \etgr[x]       -返回敌人x的TGR速率。目标利率
 * \egrd[x]       -返回敌人x的GRD rate。保护率
 * \erec[x]       -返回敌人x的REC rate。回收率
 * \epha[x]       -返回敌人x的PHA速率。药理学率
 * \emcr[x]       -返回敌人x的MCR率。MP成本率
 * \etcr[x]       -返回敌人x的TCR率。TP费率
 * \epdr[x]       -返回敌人x的PDR速率。物理损伤率
 * \emdr[x]       -返回敌人x的MDR率。魔法伤害率
 * \efdr[x]       -返回敌人x的FDR速率。楼面损坏率
 * \eexr[x]       -返回敌人x的EXR率。经验率
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * 疯狂模式-文本代码结构
 * ============================================================================
 *
 * 对于那些有JavaScript经验并希望自定义
 * 这个插件提供的文本代码的行为，你可以改变用于
 * 插件参数中的每个文本代码。
 *
 * 在插件参数中存在每个文本代码都是
 * 由游戏内消息函数转换。参考变量
 * 显示在每个代码顶部的注释中，以了解
 * 变量被使用以及它们是如何被使用的。
 *
 * 默认情况下：
 *
 *   x
 *   - 指插入到文本代码中的x变量。这可能是
 *      数字或字符串，取决于文本代码。
 *
 *   y
 *   - 指插入到文本代码中的y变量。这可能是
 *     字符串的数目，取决于文本代码。
 *
 *   text
 *   - 指将由消息系统显示的文本。这是使用上述文本代码的最终结果。
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
 * @param ---Quantity Text Codes---
 * @text ---数量文本代码---
 * @default
 *
 * @param TextCode QI
 * @text \qi[x]
 * @parent ---Quantity Text Codes---
 * @type note
 * @desc Text code to return the quantity of item x.
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar item = $dataItems[x];\nif (Imported.YEP_ItemCore && DataManager.isIndependent(item)) {\n  var quantity = $gameParty.numIndependentItems(item);\n} else {\n  var quantity = $gameParty.numItems(item);\n}\ntext = this.groupDigits(quantity);"
 *
 * @param TextCode QW
 * @text \qw[x]
 * @parent ---Quantity Text Codes---
 * @type note
 * @desc Text code to return the quantity of weapon x.
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar weapon = $dataWeapons[x];\nif (Imported.YEP_ItemCore && DataManager.isIndependent(weapon)) {\n  var quantity = $gameParty.numIndependentItems(weapon);\n} else {\n  var quantity = $gameParty.numItems(weapon);\n}\ntext = this.groupDigits(quantity);"
 *
 * @param TextCode QA
 * @text \qa[x]
 * @parent ---Quantity Text Codes---
 * @type note
 * @desc Text code to return the quantity of armor x.
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar armor = $dataArmors[x];\nif (Imported.YEP_ItemCore && DataManager.isIndependent(armor)) {\n  var quantity = $gameParty.numIndependentItems(armor);\n} else {\n  var quantity = $gameParty.numItems(armor);\n}\ntext = this.groupDigits(quantity);"
 *
 * @param ---Compare Text Codes---
 * @text ---比较文本代码---
 * @default
 *
 * @param TextCode Compare
 * @text \compare<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = Green   x < y = Red
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 24;\n} else if (x < y) {\n  var colorId = 25;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare1
 * @text \compare1<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = Red   x < y = White
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 2;\n} else if (x < y) {\n  var colorId = 0;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare2
 * @text \compare2<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = Yellow   x < y = White
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 14;\n} else if (x < y) {\n  var colorId = 0;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare3
 * @text \compare3<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = Green   x < y = White
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 3;\n} else if (x < y) {\n  var colorId = 0;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare4
 * @text \compare4<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = Blue   x < y = Purple
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 4;\n} else if (x < y) {\n  var colorId = 0;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare5
 * @text \compare5<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = White   x < y = Grey
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 0;\n} else if (x < y) {\n  var colorId = 7;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare6
 * @text \compare6<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = White   x < y = Red
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 0;\n} else if (x < y) {\n  var colorId = 25;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare7
 * @text \compare7<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = White   x < y = Purple
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 0;\n} else if (x < y) {\n  var colorId = 13;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare8
 * @text \compare8<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = White   x < y = Dark Blue
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 0;\n} else if (x < y) {\n  var colorId = 9;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param TextCode Compare9
 * @text \compare9<x:y>
 * @parent ---Compare Text Codes---
 * @type note
 * @desc Determine what kind of color to use when comparing x and y.
 * Defaults: x >= y = White   x < y = Brown
 * @default "// Variables:\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\nif (x >= y) {\n  var colorId = 0;\n} else if (x < y) {\n  var colorId = 20;\n}\ntext = '\\x1bc[' + colorId + ']';"
 *
 * @param ---Case Text Codes---
 * @text ---案例文本代码---
 * @default
 *
 * @param TextCode CaseSwitch
 * @text \caseSwitch{s?x:y}
 * @parent ---Case Text Codes---
 * @type note
 * @desc Text code used to display conditional text revolving around
 * the inserted switch s.
 * @default "// Variables:\n//   s - The switch ID (number) to be checked.\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\ntext = (s) ? x : y;"
 *
 * @param TextCode CaseEval
 * @text \caseEval{e?x:y}
 * @parent ---Case Text Codes---
 * @type note
 * @desc Text code used to display conditional text revolving around
 * the inserted eval code e.
 * @default "// Variables:\n//   e - The eval code to be checked.\n//   x - The 1st value inserted into the text code.\n//   y - The 2nd value inserted into the text code.\n//   text - The text to be returned.\n\ntext = (e) ? x : y;"
 *
 * @param ---Actor Param Codes---
 * @text ---参与者参数代码---
 * @default
 *
 * @param ---Actor Params---
 * @text Parameters
 * @parent ---Actor Param Codes---
 * @default
 *
 * @param ---Actor XParams---
 * @text X Parameters
 * @parent ---Actor Param Codes---
 * @default
 *
 * @param ---Actor SParams---
 * @text S Parameters
 * @parent ---Actor Param Codes---
 * @default
 *
 * @param TextCode ALvl
 * @text \alvl[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the LVL of actor x.
 * LVL: Level
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.level;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AMhp
 * @text \amhp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MHP of actor x.
 * MHP: MaxHP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mhp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AHp
 * @text \ahp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the HP of actor x.
 * HP: Current HP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.hp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AHp%
 * @text \ahp%[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the HP rate of actor x.
 * HP Rate: Current HP / MaxHP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.hpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMmp
 * @text \ammp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MMP of actor x.
 * MMP: MaxMP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mmp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AMp
 * @text \amp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the  MP of actor x.
 * MP: Current MP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AMp%
 * @text \amp%[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MP rate of actor x.
 * MP Rate: Current MP / MaxMP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMtp
 * @text \amtp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MTP of actor x.
 * MTP: MaxTP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.maxTp();\ntext = this.groupDigits(value);"
 *
 * @param TextCode ATp
 * @text \atp[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the TP of actor x.
 * TP: Current TP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.tp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode ATp%
 * @text \atp%[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the TP rate of actor x.
 * TP Rate: Current TP / MaxTP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.tpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AAtk
 * @text \aatk[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the ATK of actor x.
 * ATK: Attack
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.atk;\ntext = this.groupDigits(value);"
 *
 * @param TextCode ADef
 * @text \adef[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the DEF of actor x.
 * DEF: Defense
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.def;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AMat
 * @text \amat[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MAT of actor x.
 * MAT: Magic Attack
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mat;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AMdf
 * @text \amdf[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the MDF of actor x.
 * MDF: Magic Defense
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mdf;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AAgi
 * @text \aagi[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the AGI of actor x.
 * AGI: Agility
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.agi;\ntext = this.groupDigits(value);"
 *
 * @param TextCode ALuk
 * @text \aluk[x]
 * @parent ---Actor Params---
 * @type note
 * @desc Text code to return the LUK of actor x.
 * LUK: Luck
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.luk;\ntext = this.groupDigits(value);"
 *
 * @param TextCode AHit
 * @text \ahit[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the HIT rate of actor x.
 * HIT: Hit Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.hit;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AEva
 * @text \aeva[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the EVA rate of actor x.
 * EVA: Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.eva;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ACri
 * @text \acri[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the CRI rate of actor x.
 * CRI: Critical Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.cri;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ACev
 * @text \acev[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the CEV rate of actor x.
 * CEV: Critical Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.cev;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMev
 * @text \amev[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the MEV rate of actor x.
 * MEV: Magic Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mev;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMrf
 * @text \amrf[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the MRF rate of actor x.
 * MRF: Magic Reflection Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mrf;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ACnt
 * @text \acnt[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the CNT rate of actor x.
 * CNT: Counter Attack Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.cnt;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AHrg
 * @text \ahrg[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the HRG rate of actor x.
 * HRG: HP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.hrg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMrg
 * @text \amrg[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the MRG rate of actor x.
 * MRG: MP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mrg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ATrg
 * @text \atrg[x]
 * @parent ---Actor XParams---
 * @type note
 * @desc Text code to return the TRG rate of actor x.
 * TRG: TP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.trg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ATgr
 * @text \atgr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the TGR rate of actor x.
 * TGR: Target Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.tgr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AGrd
 * @text \agrd[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the GRD rate of actor x.
 * GRD: Guard Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.grd;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ARec
 * @text \arec[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the REC rate of actor x.
 * REC: Recovery Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.rec;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode APha
 * @text \apha[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the PHA rate of actor x.
 * PHA: Pharmacology Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.pha;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMcr
 * @text \amcr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the MCR rate of actor x.
 * MCR: MP Cost Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mcr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ATcr
 * @text \atcr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the TCR rate of actor x.
 * TCR: TP Charge Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.tcr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode APdr
 * @text \apdr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the PDR rate of actor x.
 * PDR: Physical Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.pdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AMdr
 * @text \amdr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the MDR rate of actor x.
 * MDR: Magical Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.mdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AFdr
 * @text \afdr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the FDR rate of actor x.
 * FDR: Floor Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.fdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode AExr
 * @text \aexr[x]
 * @parent ---Actor SParams---
 * @type note
 * @desc Text code to return the EXR rate of actor x.
 * EXR: Experience Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar actor = $gameActors.actor(x);\nvar value = actor.exr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param ---Enemy Param Codes---
 * @text ---敌方参数代码---
 * @default
 *
 * @param ---Enemy Params---
 * @text Parameters
 * @parent ---Enemy Param Codes---
 * @default
 *
 * @param ---Enemy XParams---
 * @text X Parameters
 * @parent ---Enemy Param Codes---
 * @default
 *
 * @param ---Enemy SParams---
 * @text S Parameters
 * @parent ---Enemy Param Codes---
 * @default
 *
 * @param TextCode ELvl
 * @text \elvl[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the LVL of enemy x.
 * LVL: Level
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nif (Imported.YEP_EnemyLevels) {\n  var enemy = $gameTroop.members()[x];\n  var value = enemy.level;\n  text = this.groupDigits(value);\n} else {\n  text = $gameParty.highestLevel();\n}"
 *
 * @param TextCode EMhp
 * @text \emhp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MHP of enemy x.
 * MHP: MaxHP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mhp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EHp
 * @text \ehp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the HP of enemy x.
 * HP: Current HP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.hp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EHp%
 * @text \ehp%[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the HP rate of enemy x.
 * HP Rate: Current HP / MaxHP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.hpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMmp
 * @text \emmp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MMP of enemy x.
 * MMP: MaxMP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mmp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EMp
 * @text \emp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the  MP of enemy x.
 * MP: Current MP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EMp%
 * @text \emp%[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MP rate of enemy x.
 * MP Rate: Current MP / MaxMP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMtp
 * @text \emtp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MTP of enemy x.
 * MTP: MaxTP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.maxTp();\ntext = this.groupDigits(value);"
 *
 * @param TextCode ETp
 * @text \etp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the TP of enemy x.
 * TP: Current TP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.tp;\ntext = this.groupDigits(value);"
 *
 * @param TextCode ETp%
 * @text \etp%[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the TP rate of enemy x.
 * TP Rate: Current TP / MaxTP
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.tpRate();\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EAtk
 * @text \eatk[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the ATK of enemy x.
 * ATK: Attack
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.atk;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EDef
 * @text \edef[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the DEF of enemy x.
 * DEF: Defense
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.def;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EMat
 * @text \emat[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MAT of enemy x.
 * MAT: Magic Attack
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mat;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EMdf
 * @text \emdf[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the MDF of enemy x.
 * MDF: Magic Defense
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mdf;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EAgi
 * @text \eagi[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the AGI of enemy x.
 * AGI: Agility
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.agi;\ntext = this.groupDigits(value);"
 *
 * @param TextCode ELuk
 * @text \eluk[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the LUK of enemy x.
 * LUK: Luck
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.luk;\ntext = this.groupDigits(value);"
 *
 * @param TextCode EExp
 * @text \eexp[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the EXP of enemy x.
 * EXP: Experience Points
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.exp();\ntext = this.groupDigits(value);"
 *
 * @param TextCode EGold
 * @text \egold[x]
 * @parent ---Enemy Params---
 * @type note
 * @desc Text code to return the GOLD of enemy x.
 * GOLD: gold
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.gold();\ntext = this.groupDigits(value);"
 *
 * @param TextCode EHit
 * @text \ehit[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the HIT rate of enemy x.
 * HIT: Hit Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.hit;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EEva
 * @text \eeva[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the EVA rate of enemy x.
 * EVA: Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.eva;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ECri
 * @text \ecri[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the CRI rate of enemy x.
 * CRI: Critical Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.cri;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ECev
 * @text \ecev[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the CEV rate of enemy x.
 * CEV: Critical Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.cev;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMev
 * @text \emev[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the MEV rate of enemy x.
 * MEV: Magic Evasion Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mev;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMrf
 * @text \emrf[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the MRF rate of enemy x.
 * MRF: Magic Reflection Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mrf;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ECnt
 * @text \ecnt[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the CNT rate of enemy x.
 * CNT: Counter Attack Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.cnt;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EHrg
 * @text \ehrg[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the HRG rate of enemy x.
 * HRG: HP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.hrg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMrg
 * @text \emrg[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the MRG rate of enemy x.
 * MRG: MP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mrg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ETrg
 * @text \etrg[x]
 * @parent ---Enemy XParams---
 * @type note
 * @desc Text code to return the TRG rate of enemy x.
 * TRG: TP Regeneration Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.trg;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ETgr
 * @text \etgr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the TGR rate of enemy x.
 * TGR: Target Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.tgr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EGrd
 * @text \egrd[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the GRD rate of enemy x.
 * GRD: Guard Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.grd;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ERec
 * @text \erec[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the REC rate of enemy x.
 * REC: Recovery Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.rec;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EPha
 * @text \epha[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the PHA rate of enemy x.
 * PHA: Pharmacology Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.pha;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMcr
 * @text \emcr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the MCR rate of enemy x.
 * MCR: MP Cost Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mcr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode ETcr
 * @text \etcr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the TCR rate of enemy x.
 * TCR: TP Charge Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.tcr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EPdr
 * @text \epdr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the PDR rate of enemy x.
 * PDR: Physical Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.pdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EMdr
 * @text \emdr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the MDR rate of enemy x.
 * MDR: Magical Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.mdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EFdr
 * @text \efdr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the FDR rate of enemy x.
 * FDR: Floor Damage Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.fdr;\ntext = Math.floor(value * 100) + '%';"
 *
 * @param TextCode EExr
 * @text \eexr[x]
 * @parent ---Enemy SParams---
 * @type note
 * @desc Text code to return the EXR rate of enemy x.
 * EXR: Experience Rate
 * @default "// Variables:\n//   x - The value inserted into the text code.\n//   text - The string to be shown in the message window.\n\nvar enemy = $gameTroop.members()[x];\nvar value = enemy.exr;\ntext = Math.floor(value * 100) + '%';"
 *
 */
//=============================================================================

if (Imported.YEP_MessageCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ExtMesPack2');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Lunatic = Yanfly.Lunatic || {};

Yanfly.SetupParameters = function() {
  Yanfly.Lunatic.Msg = Yanfly.Lunatic.Msg || {};

  Yanfly.Lunatic.Msg.TcQI = JSON.parse(Yanfly.Parameters['TextCode QI']);
  Yanfly.Lunatic.Msg.TcQW = JSON.parse(Yanfly.Parameters['TextCode QW']);
  Yanfly.Lunatic.Msg.TcQA = JSON.parse(Yanfly.Parameters['TextCode QA']);

  Yanfly.Lunatic.Msg.TcCm0 = JSON.parse(Yanfly.Parameters['TextCode Compare']);
  Yanfly.Lunatic.Msg.TcCm1 = JSON.parse(Yanfly.Parameters['TextCode Compare1']);
  Yanfly.Lunatic.Msg.TcCm2 = JSON.parse(Yanfly.Parameters['TextCode Compare2']);
  Yanfly.Lunatic.Msg.TcCm3 = JSON.parse(Yanfly.Parameters['TextCode Compare3']);
  Yanfly.Lunatic.Msg.TcCm4 = JSON.parse(Yanfly.Parameters['TextCode Compare4']);
  Yanfly.Lunatic.Msg.TcCm5 = JSON.parse(Yanfly.Parameters['TextCode Compare5']);
  Yanfly.Lunatic.Msg.TcCm6 = JSON.parse(Yanfly.Parameters['TextCode Compare6']);
  Yanfly.Lunatic.Msg.TcCm7 = JSON.parse(Yanfly.Parameters['TextCode Compare7']);
  Yanfly.Lunatic.Msg.TcCm8 = JSON.parse(Yanfly.Parameters['TextCode Compare8']);
  Yanfly.Lunatic.Msg.TcCm9 = JSON.parse(Yanfly.Parameters['TextCode Compare9']);

  Yanfly.Lunatic.Msg.TcCSwitch = 
    JSON.parse(Yanfly.Parameters['TextCode CaseSwitch']);
  Yanfly.Lunatic.Msg.TcCaseEval = 
    JSON.parse(Yanfly.Parameters['TextCode CaseEval']);

  Yanfly.Lunatic.Msg.TcALvl = JSON.parse(Yanfly.Parameters['TextCode ALvl']);
  Yanfly.Lunatic.Msg.TcAMhp = JSON.parse(Yanfly.Parameters['TextCode AMhp']);
  Yanfly.Lunatic.Msg.TcAHp = JSON.parse(Yanfly.Parameters['TextCode AHp']);
  Yanfly.Lunatic.Msg.TcAHpp = JSON.parse(Yanfly.Parameters['TextCode AHp%']);
  Yanfly.Lunatic.Msg.TcAMmp = JSON.parse(Yanfly.Parameters['TextCode AMmp']);
  Yanfly.Lunatic.Msg.TcAMp = JSON.parse(Yanfly.Parameters['TextCode AMp']);
  Yanfly.Lunatic.Msg.TcAMpp = JSON.parse(Yanfly.Parameters['TextCode AMp%']);
  Yanfly.Lunatic.Msg.TcATmp = JSON.parse(Yanfly.Parameters['TextCode AMtp']);
  Yanfly.Lunatic.Msg.TcATp = JSON.parse(Yanfly.Parameters['TextCode ATp']);
  Yanfly.Lunatic.Msg.TcATpp = JSON.parse(Yanfly.Parameters['TextCode ATp%']);
  Yanfly.Lunatic.Msg.TcAatk = JSON.parse(Yanfly.Parameters['TextCode AAtk']);
  Yanfly.Lunatic.Msg.TcAdef = JSON.parse(Yanfly.Parameters['TextCode ADef']);
  Yanfly.Lunatic.Msg.TcAmat = JSON.parse(Yanfly.Parameters['TextCode AMat']);
  Yanfly.Lunatic.Msg.TcAmdf = JSON.parse(Yanfly.Parameters['TextCode AMdf']);
  Yanfly.Lunatic.Msg.TcAagi = JSON.parse(Yanfly.Parameters['TextCode AAgi']);
  Yanfly.Lunatic.Msg.TcAluk = JSON.parse(Yanfly.Parameters['TextCode ALuk']);

  Yanfly.Lunatic.Msg.TcAhit = JSON.parse(Yanfly.Parameters['TextCode AHit']);
  Yanfly.Lunatic.Msg.TcAeva = JSON.parse(Yanfly.Parameters['TextCode AEva']);
  Yanfly.Lunatic.Msg.TcAcri = JSON.parse(Yanfly.Parameters['TextCode ACri']);
  Yanfly.Lunatic.Msg.TcAcev = JSON.parse(Yanfly.Parameters['TextCode ACev']);
  Yanfly.Lunatic.Msg.TcAmev = JSON.parse(Yanfly.Parameters['TextCode AMev']);
  Yanfly.Lunatic.Msg.TcAmrf = JSON.parse(Yanfly.Parameters['TextCode AMrf']);
  Yanfly.Lunatic.Msg.TcAcnt = JSON.parse(Yanfly.Parameters['TextCode ACnt']);
  Yanfly.Lunatic.Msg.TcAhrg = JSON.parse(Yanfly.Parameters['TextCode AHrg']);
  Yanfly.Lunatic.Msg.TcAmrg = JSON.parse(Yanfly.Parameters['TextCode AMrg']);
  Yanfly.Lunatic.Msg.TcAtrg = JSON.parse(Yanfly.Parameters['TextCode ATrg']);

  Yanfly.Lunatic.Msg.TcAtgr = JSON.parse(Yanfly.Parameters['TextCode ATgr']);
  Yanfly.Lunatic.Msg.TcAgrd = JSON.parse(Yanfly.Parameters['TextCode AGrd']);
  Yanfly.Lunatic.Msg.TcArec = JSON.parse(Yanfly.Parameters['TextCode ARec']);
  Yanfly.Lunatic.Msg.TcApha = JSON.parse(Yanfly.Parameters['TextCode APha']);
  Yanfly.Lunatic.Msg.TcAmcr = JSON.parse(Yanfly.Parameters['TextCode AMcr']);
  Yanfly.Lunatic.Msg.TcAtcr = JSON.parse(Yanfly.Parameters['TextCode ATcr']);
  Yanfly.Lunatic.Msg.TcApdr = JSON.parse(Yanfly.Parameters['TextCode APdr']);
  Yanfly.Lunatic.Msg.TcAmdr = JSON.parse(Yanfly.Parameters['TextCode AMdr']);
  Yanfly.Lunatic.Msg.TcAfdr = JSON.parse(Yanfly.Parameters['TextCode AFdr']);
  Yanfly.Lunatic.Msg.TcAexr = JSON.parse(Yanfly.Parameters['TextCode AExr']);
  
  Yanfly.Lunatic.Msg.TcELvl = JSON.parse(Yanfly.Parameters['TextCode ELvl']);
  Yanfly.Lunatic.Msg.TcEMhp = JSON.parse(Yanfly.Parameters['TextCode EMhp']);
  Yanfly.Lunatic.Msg.TcEHp = JSON.parse(Yanfly.Parameters['TextCode EHp']);
  Yanfly.Lunatic.Msg.TcEHpp = JSON.parse(Yanfly.Parameters['TextCode EHp%']);
  Yanfly.Lunatic.Msg.TcEMmp = JSON.parse(Yanfly.Parameters['TextCode EMmp']);
  Yanfly.Lunatic.Msg.TcEMp = JSON.parse(Yanfly.Parameters['TextCode EMp']);
  Yanfly.Lunatic.Msg.TcEMpp = JSON.parse(Yanfly.Parameters['TextCode EMp%']);
  Yanfly.Lunatic.Msg.TcETmp = JSON.parse(Yanfly.Parameters['TextCode EMtp']);
  Yanfly.Lunatic.Msg.TcETp = JSON.parse(Yanfly.Parameters['TextCode ETp']);
  Yanfly.Lunatic.Msg.TcETpp = JSON.parse(Yanfly.Parameters['TextCode ETp%']);
  Yanfly.Lunatic.Msg.TcEatk = JSON.parse(Yanfly.Parameters['TextCode EAtk']);
  Yanfly.Lunatic.Msg.TcEdef = JSON.parse(Yanfly.Parameters['TextCode EDef']);
  Yanfly.Lunatic.Msg.TcEmat = JSON.parse(Yanfly.Parameters['TextCode EMat']);
  Yanfly.Lunatic.Msg.TcEmdf = JSON.parse(Yanfly.Parameters['TextCode EMdf']);
  Yanfly.Lunatic.Msg.TcEagi = JSON.parse(Yanfly.Parameters['TextCode EAgi']);
  Yanfly.Lunatic.Msg.TcEluk = JSON.parse(Yanfly.Parameters['TextCode ELuk']);

  Yanfly.Lunatic.Msg.TcEexp = JSON.parse(Yanfly.Parameters['TextCode EExp']);
  Yanfly.Lunatic.Msg.TcEgold = JSON.parse(Yanfly.Parameters['TextCode EGold']);

  Yanfly.Lunatic.Msg.TcEhit = JSON.parse(Yanfly.Parameters['TextCode EHit']);
  Yanfly.Lunatic.Msg.TcEeva = JSON.parse(Yanfly.Parameters['TextCode EEva']);
  Yanfly.Lunatic.Msg.TcEcri = JSON.parse(Yanfly.Parameters['TextCode ECri']);
  Yanfly.Lunatic.Msg.TcEcev = JSON.parse(Yanfly.Parameters['TextCode ECev']);
  Yanfly.Lunatic.Msg.TcEmev = JSON.parse(Yanfly.Parameters['TextCode EMev']);
  Yanfly.Lunatic.Msg.TcEmrf = JSON.parse(Yanfly.Parameters['TextCode EMrf']);
  Yanfly.Lunatic.Msg.TcEcnt = JSON.parse(Yanfly.Parameters['TextCode ECnt']);
  Yanfly.Lunatic.Msg.TcEhrg = JSON.parse(Yanfly.Parameters['TextCode EHrg']);
  Yanfly.Lunatic.Msg.TcEmrg = JSON.parse(Yanfly.Parameters['TextCode EMrg']);
  Yanfly.Lunatic.Msg.TcEtrg = JSON.parse(Yanfly.Parameters['TextCode ETrg']);

  Yanfly.Lunatic.Msg.TcEtgr = JSON.parse(Yanfly.Parameters['TextCode ETgr']);
  Yanfly.Lunatic.Msg.TcEgrd = JSON.parse(Yanfly.Parameters['TextCode EGrd']);
  Yanfly.Lunatic.Msg.TcErec = JSON.parse(Yanfly.Parameters['TextCode ERec']);
  Yanfly.Lunatic.Msg.TcEpha = JSON.parse(Yanfly.Parameters['TextCode EPha']);
  Yanfly.Lunatic.Msg.TcEmcr = JSON.parse(Yanfly.Parameters['TextCode EMcr']);
  Yanfly.Lunatic.Msg.TcEtcr = JSON.parse(Yanfly.Parameters['TextCode ETcr']);
  Yanfly.Lunatic.Msg.TcEpdr = JSON.parse(Yanfly.Parameters['TextCode EPdr']);
  Yanfly.Lunatic.Msg.TcEmdr = JSON.parse(Yanfly.Parameters['TextCode EMdr']);
  Yanfly.Lunatic.Msg.TcEfdr = JSON.parse(Yanfly.Parameters['TextCode EFdr']);
  Yanfly.Lunatic.Msg.TcEexr = JSON.parse(Yanfly.Parameters['TextCode EExr']);
};
Yanfly.SetupParameters();

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.EMP2.Window_Base_convertExtraEscapeCharacters =
  Window_Base.prototype.convertExtraEscapeCharacters;
Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
  text = this.convertItemQuantitiesCodes(text);
  text = this.convertActorParameterCodes(text);
  text = this.convertEnemyParameterCodes(text);
  text = Yanfly.EMP2.Window_Base_convertExtraEscapeCharacters.call(this, text);
  text = this.convertColorCompare(text);
  text = this.convertCaseText(text);
  return text;
};

Window_Base.prototype.groupDigits = function(number) {
  return Yanfly.Util.forceGroup(number);
};

Window_Base.prototype.convertItemQuantitiesCodes = function(text) {
  text = text.replace(/\x1bQI\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = 1;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcQI);
    return text;
  }.bind(this));

  text = text.replace(/\x1bQW\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = 1;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcQW);
    return text;
  }.bind(this));

  text = text.replace(/\x1bQA\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = 1;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcQA);
    return text;
  }.bind(this));

  return text;
};

Window_Base.prototype.convertActorParameterCodes = function(text) {
  text = text.replace(/\x1bALVL\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcALvl);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMHP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAMhp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAHP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAHp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAHP%\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAHpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMMP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAMmp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAMp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMP%\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAMpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMTP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcATmp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bATP\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcATp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bATP%\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcATpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAATK\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAatk);
    return text;
  }.bind(this));

  text = text.replace(/\x1bADEF\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAdef);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMAT\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAmat);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMDF\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAmdf);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAAGI\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAagi);
    return text;
  }.bind(this));

  text = text.replace(/\x1bALUK\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAluk);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAHIT\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAhit);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAEVA\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAeva);
    return text;
  }.bind(this));

  text = text.replace(/\x1bACRI\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAcri);
    return text;
  }.bind(this));

  text = text.replace(/\x1bACEV\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAcev);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMEV\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAmev);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMRF\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAmrf);
    return text;
  }.bind(this));

  text = text.replace(/\x1bACNT\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAcnt);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAHRG\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAhrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMRG\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAmrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bATRG\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAtrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bATGR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAtgr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAGRD\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAgrd);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAREC\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcArec);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAPHA\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcApha);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMCR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAmcr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bATCR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAtcr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAPDR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcApdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAMDR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAmdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAFDR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAfdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bAEXR\[(\d+)\]/gi, function() {
    var x = arguments[1];
    if (x <= 0) x = $gameParty.members()[0].actorId;
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcAexr);
    return text;
  }.bind(this));
  
  return text;
};

Window_Base.prototype.convertEnemyParameterCodes = function(text) {
  if (!$gameParty.inBattle()) return text;
  text = text.replace(/\x1bELVL\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcELvl);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMHP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEMhp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEHP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEHp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEHP%\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEHpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMMP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEMmp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEMp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMP%\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEMpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMTP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcETmp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bETP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcETp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bETP%\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcETpp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEATK\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEatk);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEDEF\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEdef);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMAT\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEmat);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMDF\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEmdf);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEAGI\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEagi);
    return text;
  }.bind(this));

  text = text.replace(/\x1bELUK\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEluk);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEEXP\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEexp);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEGOLD\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEgold);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEHIT\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEhit);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEEVA\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEeva);
    return text;
  }.bind(this));

  text = text.replace(/\x1bECRI\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEcri);
    return text;
  }.bind(this));

  text = text.replace(/\x1bECEV\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEcev);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMEV\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEmev);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMRF\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEmrf);
    return text;
  }.bind(this));

  text = text.replace(/\x1bECNT\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEcnt);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEHRG\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEhrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMRG\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEmrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bETRG\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEtrg);
    return text;
  }.bind(this));

  text = text.replace(/\x1bETGR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEtgr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEGRD\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEgrd);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEREC\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcErec);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEPHA\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEpha);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMCR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEmcr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bETCR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEtcr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEPDR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEpdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEMDR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEmdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEFDR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEfdr);
    return text;
  }.bind(this));

  text = text.replace(/\x1bEEXR\[(\d+)\]/gi, function() {
    var x = arguments[1] - 1;
    x = x.clamp(0, $gameTroop.members().length - 1)
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcEexr);
    return text;
  }.bind(this));
  
  return text;
};

Window_Base.prototype.convertColorCompare = function(text) {
  text = text.replace(/\x1bCOMPARE\<(.*?):(.*?)\>/gi, function() {
    var x = Yanfly.Util.forceNumber(arguments[1]);
    var y = Yanfly.Util.forceNumber(arguments[2]);
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCm0);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE1\<(.*?):(.*?)\>/gi, function() {
    var x = Yanfly.Util.forceNumber(arguments[1]);
    var y = Yanfly.Util.forceNumber(arguments[2]);
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCm1);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE2\<(.*?):(.*?)\>/gi, function() {
    var x = Yanfly.Util.forceNumber(arguments[1]);
    var y = Yanfly.Util.forceNumber(arguments[2]);
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCm2);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE3\<(.*?):(.*?)\>/gi, function() {
    var x = Yanfly.Util.forceNumber(arguments[1]);
    var y = Yanfly.Util.forceNumber(arguments[2]);
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCm3);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE4\<(.*?):(.*?)\>/gi, function() {
    var x = Yanfly.Util.forceNumber(arguments[1]);
    var y = Yanfly.Util.forceNumber(arguments[2]);
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCm4);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE5\<(.*?):(.*?)\>/gi, function() {
    var x = Yanfly.Util.forceNumber(arguments[1]);
    var y = Yanfly.Util.forceNumber(arguments[2]);
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCm5);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE6\<(.*?):(.*?)\>/gi, function() {
    var x = Yanfly.Util.forceNumber(arguments[1]);
    var y = Yanfly.Util.forceNumber(arguments[2]);
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCm6);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE7\<(.*?):(.*?)\>/gi, function() {
    var x = Yanfly.Util.forceNumber(arguments[1]);
    var y = Yanfly.Util.forceNumber(arguments[2]);
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCm7);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE8\<(.*?):(.*?)\>/gi, function() {
    var x = Yanfly.Util.forceNumber(arguments[1]);
    var y = Yanfly.Util.forceNumber(arguments[2]);
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCm8);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCOMPARE9\<(.*?):(.*?)\>/gi, function() {
    var x = Yanfly.Util.forceNumber(arguments[1]);
    var y = Yanfly.Util.forceNumber(arguments[2]);
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCm9);
    return text;
  }.bind(this));

  return text;
};

Window_Base.prototype.convertCaseText = function(text) {
  text = text.replace(/\x1bCASESWITCH\{(.*?)\?(.*?):(.*?)\}/gi, function() {
    var s = $gameSwitches.value(Number(arguments[1]));
    var x = arguments[2];
    var y = arguments[3];
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCSwitch);
    return text;
  }.bind(this));

  text = text.replace(/\x1bCASEEVAL\{(.*?)\?(.*?):(.*?)\}/gi, function() {
    var e = eval(arguments[1]);
    var x = arguments[2];
    var y = arguments[3];
    var text = '';
    eval(Yanfly.Lunatic.Msg.TcCaseEval);
    return text;
  }.bind(this));

  return text;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.forceGroup = function(inVal) {
  if (typeof inVal !== 'string') { inVal = String(inVal); }
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

Yanfly.Util.forceNumber = function(str) {
  var value = str.match(/\d/g);
  value = value.join('');
  return parseInt(value);
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_X_ExtMesPack2 without YEP_MessageCore. Please visit Yanfly.moe ';
text += 'and install YEP_MessageCore in your game project before you can use ';
text += 'this plugin.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_MessageCore