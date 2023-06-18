//=============================================================================
// Yanfly Engine Plugins - Row Formation
// YEP_RowFormation.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_RowFormation = true;

var Yanfly = Yanfly || {};
Yanfly.Row = Yanfly.Row || {};
Yanfly.Row.version = 1.16;

//=============================================================================
 /*:
 * @plugindesc v1.16 阵型系统(已翻译)
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @text 常规
 * @default
 *
 * @param Maximum Rows
 * @text 最大列数
 * @parent ---General---
 * @type number
 * @min 1
 * @max 10
 * @desc 这个值不能在游戏中改变
 * 最小:1  最大:10
 * @default 2
 *
 * @param Command Name
 * @text 主菜单显示阵型命令的文本
 * @parent ---General---
 * @default 阵型
 *
 * @param Auto Add Menu
 * @text 自动添加到主菜单
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc 自动将阵型命令添加到主菜单
 * @default true
 *
 * @param Show Menu Command
 * @text 显示阵型命令
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 *
 * @param Enable Menu Command
 * @text 启用阵型命令
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 *
 * @param Show Battle Command
 * @text 队伍命令窗口显示阵型命令
 * @parent ---General---
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 *
 * @param Enable Battle Command
 * @text 队伍命令窗口启用阵型命令
 * @parent ---General---
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 *
 * @param Battle Cooldown
 * @text 打开阵型菜单后冷却回合
 * @parent ---General---
 * @type number
 * @desc 战斗界面打开阵型菜单后需要冷却多少回合
 * @default 1
 *
 * @param ---Defaults---
 * @text 默认
 * @default
 *
 * @param Default Row
 * @text 角色/敌人初始列
 * @parent ---Defaults---
 * @type number
 * @min 1
 * @max 10
 * @default 1
 *
 * @param Enemy Row Lock
 * @text 敌人锁定列,无法改变
 * @parent ---Defaults---
 * @type boolean
 * @on 锁定
 * @off 不锁定
 * @default false
 *
 * @param ---Menu Settings---
 * @text 菜单设置
 * @default
 *
 * @param Use Map Sprite
 * @text 视图显示方式
 * @parent ---Menu Settings---
 * @type boolean
 * @on 行走图片
 * @off SV战斗图
 * @default false
 *
 * @param Front Buffer Y
 * @text 行走图片Y轴相对坐标
 * @parent ---Menu Settings---
 * @default (rect.height - 48) / 2;
 *
 * @param Side Buffer Y
 * @text SV战斗图Y轴相对坐标
 * @parent ---Menu Settings---
 * @default (rect.height - 64) / 2;
 *
 * @param ---Position Settings---
 * @text 位置设置
 * @default
 *
 * @param Alive Row Index
 * @text 
 * @parent ---Position Settings---
 * @type boolean
 * @on Alive members
 * @off All Members
 * @desc When calculating a unit's row index, base it off of
 * all alive members (true) or all members (false).
 * @default false
 *
 * @param Maximum Row X
 * @text 列定位X轴的最大坐标
 * @parent ---Position Settings---
 * @default screenWidth - partySize * 32 - 16
 *
 * @param Maximum Row Y
 * @text 列定位Y轴的最大坐标
 * @parent ---Position Settings---
 * @default screenHeight - statusHeight - 16
 *
 * @param Minimum Row Y
 * @text 列定位Y轴的最小坐标
 * @parent ---Position Settings---
 * @default screenHeight - statusHeight - 16 - (maxSize * 64)
 *
 * @param Center Row Y
 * @text 列定位Y轴的中心坐标
 * @parent ---Position Settings---
 * @default (maxRowY + minRowY) / 2 + 16
 *
 * @param ---Row 1 Settings---
 * @text 列1设置
 * @default
 *
 * @param Row 1 Name
 * @text 列1名称
 * @parent ---Row 1 Settings---
 * @default 前排
 *
 * @param Row 1 Help Line 1
 * @text 列1帮助文本第1行
 * @parent ---Row 1 Settings---
 * @default
 *
 * @param Row 1 Help Line 2
 * @text 列1帮助文本第2行
 * @parent ---Row 1 Settings---
 * @default
 *
 * @param Row 1 States
 * @text 列1附加的被动状态
 * @parent ---Row 1 Settings---
 * @desc 用空格分隔多个状态
 * @default
 *
 * @param Row 1 States 1.5.0
 * @text 列1附加的被动状态
 * @parent ---Row 1 Settings---
 * @type state[]
 * @default []
 *
 * @param Row 1 Home X
 * @text 列1的X轴坐标
 * @parent ---Row 1 Settings---
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 1 Home Y
 * @text 列1的Y轴坐标
 * @parent ---Row 1 Settings---
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 *
 * @param ---Row 2 Settings---
 * @text 列2设置
 * @default
 *
 * @param Row 2 Name
 * @text 列2名称
 * @parent ---Row 2 Settings---
 * @default 后排
 *
 * @param Row 2 Help Line 1
 * @text 列2帮助文本第1行
 * @parent ---Row 2 Settings---
 * @default
 *
 * @param Row 2 Help Line 2
 * @text 列2帮助文本第2行
 * @parent ---Row 2 Settings---
 * @default
 *
 * @param Row 2 States
 * @text 列2附加的被动状态
 * @parent ---Row 2 Settings---
 * @desc 用空格分隔多个状态
 * @default
 *
 * @param Row 2 States 1.5.0
 * @text 列2附加的被动状态
 * @parent ---Row 2 Settings---
 * @type state[]
 * @default []
 *
 * @param Row 2 Home X
 * @text 列2的X轴坐标
 * @parent ---Row 2 Settings---
 * @default maxRowX - (maxRows - rowId) * 112 + rowIndex * 32
 *
 * @param Row 2 Home Y
 * @text 列2的Y轴坐标
 * @parent ---Row 2 Settings---
 * @default centerY + ((rowSize / -2 + 0.5) + rowIndex) * 32
 *
 * @param ---Row 3 Settings---
 * @text 列3设置
 * @default
 *
 * @param Row 3 Name
 * @text 列3名称
 * @parent ---Row 3 Settings---
 * @default
 *
 * @param Row 3 Help Line 1
 * @text 列3帮助文本第1行
 * @parent ---Row 3 Settings---
 * @default
 *
 * @param Row 3 Help Line 2
 * @text 列3帮助文本第2行
 * @parent ---Row 3 Settings---
 * @default
 *
 * @param Row 3 States
 * @text 列3附加的被动状态
 * @parent ---Row 3 Settings---
 * @desc 用空格分隔多个状态
 * @default
 *
 * @param Row 3 States 1.5.0
 * @text 列3附加的被动状态
 * @parent ---Row 3 Settings---
 * @type state[]
 * @default []
 *
 * @param Row 3 Home X
 * @text 列3的X轴坐标
 * @parent ---Row 3 Settings---
 * @default
 *
 * @param Row 3 Home Y
 * @text 列3的Y轴坐标
 * @parent ---Row 3 Settings---
 * @default
 *
 * @param ---Row 4 Settings---
 * @text 列4设置
 * @default
 *
 * @param Row 4 Name
 * @text 列4名称
 * @parent ---Row 4 Settings---
 * @default
 *
 * @param Row 4 Help Line 1
 * @text 列4帮助文本第1行
 * @parent ---Row 4 Settings---
 * @default
 *
 * @param Row 4 Help Line 2
 * @text 列4帮助文本第2行
 * @parent ---Row 4 Settings---
 * @default
 *
 * @param Row 4 States
 * @text 列4附加的被动状态
 * @parent ---Row 4 Settings---
 * @desc 用空格分隔多个状态
 * @default
 *
 * @param Row 4 States 1.5.0
 * @text 列4附加的被动状态
 * @parent ---Row 4 Settings---
 * @type state[]
 * @default []
 *
 * @param Row 4 Home X
 * @text 列4的X轴坐标
 * @parent ---Row 4 Settings---
 * @default
 *
 * @param Row 4 Home Y
 * @text 列4的Y轴坐标
 * @parent ---Row 4 Settings---
 * @default
 *
 * @param ---Row 5 Settings---
 * @text 列5设置
 * @default
 *
 * @param Row 5 Name
 * @text 列5名称
 * @parent ---Row 5 Settings---
 * @default
 *
 * @param Row 5 Help Line 1
 * @text 列5帮助文本第1行
 * @parent ---Row 5 Settings---
 * @default
 *
 * @param Row 5 Help Line 2
 * @text 列5帮助文本第2行
 * @parent ---Row 5 Settings---
 * @default
 *
 * @param Row 5 States
 * @text 列5附加的被动状态
 * @parent ---Row 5 Settings---
 * @desc 用空格分隔多个状态
 * @default
 *
 * @param Row 5 States 1.5.0
 * @text 列5附加的被动状态
 * @parent ---Row 5 Settings---
 * @type state[]
 * @default []
 *
 * @param Row 5 Home X
 * @text 列5的X轴坐标
 * @parent ---Row 5 Settings---
 * @default
 *
 * @param Row 5 Home Y
 * @text 列5的Y轴坐标
 * @parent ---Row 5 Settings---
 * @default
 *
 * @param ---Row 6 Settings---
 * @text 列6设置
 * @default
 *
 * @param Row 6 Name
 * @text 列6名称
 * @parent ---Row 6 Settings---
 * @default
 *
 * @param Row 6 Help Line 1
 * @text 列6帮助文本第1行
 * @parent ---Row 6 Settings---
 * @default
 *
 * @param Row 6 Help Line 2
 * @text 列6帮助文本第2行
 * @parent ---Row 6 Settings---
 * @default
 *
 * @param Row 6 States
 * @text 列6附加的被动状态
 * @parent ---Row 6 Settings---
 * @desc 用空格分隔多个状态
 * @default
 *
 * @param Row 6 States 1.5.0
 * @text 列6附加的被动状态
 * @parent ---Row 6 Settings---
 * @type state[]
 * @default []
 *
 * @param Row 6 Home X
 * @text 列6的X轴坐标
 * @parent ---Row 6 Settings---
 * @default
 *
 * @param Row 6 Home Y
 * @text 列6的Y轴坐标
 * @parent ---Row 6 Settings---
 * @default
 *
 * @param ---Row 7 Settings---
 * @text 列7设置
 * @default
 *
 * @param Row 7 Name
 * @text 列7名称
 * @parent ---Row 7 Settings---
 * @default
 *
 * @param Row 7 Help Line 1
 * @text 列7帮助文本第1行
 * @parent ---Row 7 Settings---
 * @default
 *
 * @param Row 7 Help Line 2
 * @text 列7帮助文本第2行
 * @parent ---Row 7 Settings---
 * @default
 *
 * @param Row 7 States
 * @text 列7附加的被动状态
 * @parent ---Row 7 Settings---
 * @desc 用空格分隔多个状态
 * @default
 *
 * @param Row 7 States 1.5.0
 * @text 列7附加的被动状态
 * @parent ---Row 7 Settings---
 * @type state[]
 * @default []
 *
 * @param Row 7 Home X
 * @text 列7的X轴坐标
 * @parent ---Row 7 Settings---
 * @default
 *
 * @param Row 7 Home Y
 * @text 列7的Y轴坐标
 * @parent ---Row 7 Settings---
 * @default
 *
 * @param ---Row 8 Settings---
 * @text 列8设置
 * @default
 *
 * @param Row 8 Name
 * @text 列8名称
 * @parent ---Row 8 Settings---
 * @default
 *
 * @param Row 8 Help Line 1
 * @text 列8帮助文本第1行
 * @parent ---Row 8 Settings---
 * @default
 *
 * @param Row 8 Help Line 2
 * @text 列8帮助文本第2行
 * @parent ---Row 8 Settings---
 * @default
 *
 * @param Row 8 States
 * @text 列8附加的被动状态
 * @parent ---Row 8 Settings---
 * @desc 用空格分隔多个状态
 * @default
 *
 * @param Row 8 States 1.5.0
 * @text 列8附加的被动状态
 * @parent ---Row 8 Settings---
 * @type state[]
 * @default []
 *
 * @param Row 8 Home X
 * @text 列8的X轴坐标
 * @parent ---Row 8 Settings---
 * @default
 *
 * @param Row 8 Home Y
 * @text 列8的Y轴坐标
 * @parent ---Row 8 Settings---
 * @default
 *
 * @param ---Row 9 Settings---
 * @text 列9设置
 * @default
 *
 * @param Row 9 Name
 * @text 列9名称
 * @parent ---Row 9 Settings---
 * @default
 *
 * @param Row 9 Help Line 1
 * @text 列9帮助文本第1行
 * @parent ---Row 9 Settings---
 * @default
 *
 * @param Row 9 Help Line 2
 * @text 列9帮助文本第2行
 * @parent ---Row 9 Settings---
 * @default
 *
 * @param Row 9 States
 * @text 列9附加的被动状态
 * @parent ---Row 9 Settings---
 * @desc 用空格分隔多个状态
 * @default
 *
 * @param Row 9 States 1.5.0
 * @text 列9附加的被动状态
 * @parent ---Row 9 Settings---
 * @type state[]
 * @default []
 *
 * @param Row 9 Home X
 * @text 列9的X轴坐标
 * @parent ---Row 9 Settings---
 * @default
 *
 * @param Row 9 Home Y
 * @text 列9的Y轴坐标
 * @parent ---Row 9 Settings---
 * @default
 *
 * @param ---Row 10 Settings---
 * @text 列10设置
 * @default
 *
 * @param Row 10 Name
 * @text 列10名称
 * @parent ---Row 10 Settings---
 * @default
 *
 * @param Row 10 Help Line 1
 * @text 列10帮助文本第1行
 * @parent ---Row 10 Settings---
 * @default
 *
 * @param Row 10 Help Line 2
 * @text 列10帮助文本第2行
 * @parent ---Row 10 Settings---
 * @default
 *
 * @param Row 10 States
 * @text 列10附加的被动状态
 * @parent ---Row 10 Settings---
 * @desc 用空格分隔多个状态
 * @default
 *
 * @param Row 10 States 1.5.0
 * @text 列10附加的被动状态
 * @parent ---Row 10 Settings---
 * @type state[]
 * @default []
 *
 * @param Row 10 Home X
 * @text 列10的X轴坐标
 * @parent ---Row 10 Settings---
 * @default
 *
 * @param Row 10 Home Y
 * @text 列10的Y轴坐标
 * @parent ---Row 10 Settings---
 * @default
 *
 * @param ---Enemy Rows---
 * @text 敌人列
 * @default
 *
 * @param Adjust Relative
 * @text 战斗开始时敌人的位置
 * @parent ---Enemy Rows---
 * @type boolean
 * @on 按列的坐标调整位置
 * @off 按数据库的摆放位置
 * @default false
 *
 * @param Enemy Row X
 * @text 敌人列X轴的移动距离
 * @parent ---Enemy Rows---
 * @desc 当敌人改变列时,X轴移动距离,这是一个公式
 * @default screenX - (rowId - 1) * 64
 *
 * @param Enemy Row Y
 * @text 敌人列Y轴的移动距离
 * @parent ---Enemy Rows---
 * @desc 当敌人改变列时,Y轴移动距离,这是一个公式
 * @default screenY
 *
 * @help
 * 插件更新:yanfly.moe/plugins/en/YEP_RowFormation.js
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 确保该插件在插件列表中位于YEP_BattleEngineCore下方
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 角色/敌人备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 设置该角色/敌人的初始列,如果分配了多个列,那么在游戏开始时(对于角色)/战
 * 斗开始时(对于敌人),将随机分配
 * <Default Row: x>
 * <Default Row: x, x, x>
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 角色/职业/敌人/武器/防具/状态备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 锁定列,使用者无法切换列
 * <Row Lock>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 解锁列,使用者可以切换列
 * <Not Row Lock>
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 技能/道具备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 使用者只能处于第x~y列才能使用该技能
 * <Row Only: x>
 * <Row Only: x, x, x>
 * <Row Only: x to y>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 该技能将目标设置为第x列
 * <Change Target Row: x>
 * －－－－－－－－－－－－－－－－－
 * 该技能将目标增加x列
 * <Push Back Target Row: x>
 * －－－－－－－－－－－－－－－－－
 * 该技能将目标减少x列
 * <Pull Forward Target Row: x>
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 该技能将使用者设置为第x列
 * <Change User Row: x>
 * －－－－－－－－－－－－－－－－－
 * 该技能将使用者增加x列
 * <Push Back User Row: x>
 * －－－－－－－－－－－－－－－－－
 * 该技能将使用者减少x列
 * <Pull Forward User Row: x>
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 疯狂模式-有条件的设置或改变列
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 技能/道具备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 该技能将设置/改变目标的列,"row"变量将设置/改变目标的列
 * <Custom Target Row>
 * if (user.hpRate() > 0.50) {
 * row += 1;
 * } else {
 * row = 1;
 * }
 * </Custom Target Row>
 * －－－－－－－－－－－－－－－－－
 * 该技能将设置/改变使用者的列,"row"变量将设置/改变使用者的列
 * <Custom User Row>
 * if (user.hpRate() > 0.50) {
 * row += 1;
 * } else {
 * row = 1;
 * }
 * </Custom User Row>
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 疯狂模式-有条件的列附加被动状态
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 状态备注:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 给列附加的被动状态设置条件,"condition"变量确定条件是否满足
 * <Custom Row Condition>
 * if (user.hp / user.mhp <= 0.25) {
 * condition = true;
 * } else {
 * condition = false;
 * }
 * </Custom Row Condition>
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 插件命令:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 在主菜单显示/隐藏阵列命令
 * ShowMenuRow
 * HideMenuRow
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 在主菜单启用/禁用阵列命令
 * EnableMenuRow
 * DisableMenuRow
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 在队伍命令窗口显示/隐藏阵列命令
 * ShowBattleRow
 * HideBattleRow
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 在队伍命令窗口启用/禁用阵列命令
 * EnableBattleRow
 * DisableBattleRow
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 将角色[2]设置为第1列
 * SetActorRow 2 1
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 将队伍成员[2]设置为第3列
 * SetPartyRow 2 3
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 将敌人[4]设置为第1列
 * SetEnemyRow 4 1
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * JavaScript函数:
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * battler是引用角色/敌人的变量
 * －－－－－－－－－－－－－－－－－
 * battler = $gameActors.actor(1);引用数据库角色[1]
 * battler = $gameParty.members()[0];引用队伍排序[0]的角色
 * battler = $gameTroop.members()[0];引用敌群排序[0]的敌人
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * 返回目标当前所在的列
 * battler.row()
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 返回与同一行中同一组的其他战斗人员相关的战斗人员索引
 * 返回同一列中同一团队的其他战士相关的战斗者指数。
 * battler.rowIndex()
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 如果目标被锁定列,则返回true
 * battler.isRowLocked()
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 将目标设置为第x列
 * battler.setRow(x)
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 目标将增加/减少x列
 * battler.alterRow(+x)
 * battler.alterRow(-x)
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 返回第x列中角色/敌人的人数(包括已死亡)
 * $gameParty.rowSize(x)
 * $gameTroop.rowSize(x)
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 返回第x列中存活的角色/敌人的人数
 * $gameParty.rowAliveSize(x)
 * $gameTroop.rowAliveSize(x)
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 返回第x列中死亡的角色/敌人的人数
 * $gameParty.rowDeadSize(x)
 * $gameTroop.rowDeadSize(x)
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 返回第x列中每个角色/敌人(包括已死亡),直接返回没有意义
 * $gameParty.rowMembers(x)
 * $gameTroop.rowMembers(x)
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 返回第x列中每个存活的角色/敌人,直接返回没有意义
 * $gameParty.rowAliveMembers(x)
 * $gameTroop.rowAliveMembers(x)
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 返回第x列中每个死亡的角色/敌人,直接返回没有意义
 * $gameParty.rowDeadMembers(x)
 * $gameTroop.rowDeadMembers(x)
 * －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
 * 检查队伍/敌群的列,如果有列为空(或已死亡),则该列后面的角色/敌人列减少1列
 * $gameParty.updateRows();
 * $gameTroop.updateRows();
 * 〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
 * 主菜单管理器-定位行命令
 * ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
 * Name: Yanfly.Param.RowCmdName
 * Symbol: row
 * Show: $gameSystem.isShowRowMenu()
 * Enabled: $gameSystem.isEnabledRowMenu()
 * Ext:
 * Main Bind: this.commandRow.bind(this)
 * Actor Bind:
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_RowFormation');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.RowMaximum = Number(Yanfly.Parameters['Maximum Rows']);
Yanfly.Param.RowMaximum = Yanfly.Param.RowMaximum.clamp(1, 10);
Yanfly.Param.RowCmdName = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.RowAutoAdd = eval(String(Yanfly.Parameters['Auto Add Menu']));
Yanfly.Param.RowShowMenu = eval(String(Yanfly.Parameters['Show Menu Command']));
Yanfly.Param.RowEnMenu = eval(String(Yanfly.Parameters['Enable Menu Command']));
Yanfly.Param.RowShowBat = String(Yanfly.Parameters['Show Battle Command']);
Yanfly.Param.RowShowBat = eval(Yanfly.Param.RowShowBat);
Yanfly.Param.RowEnBat = String(Yanfly.Parameters['Enable Battle Command']);
Yanfly.Param.RowEnBat = eval(Yanfly.Param.RowEnBat);
Yanfly.Param.RowCooldown = Number(Yanfly.Parameters['Battle Cooldown']);

Yanfly.Param.RowDefault = Number(Yanfly.Parameters['Default Row']);
Yanfly.Param.RowDefault = Yanfly.Param.RowDefault.clamp(1, 10);
Yanfly.Param.RowEnemyLock = eval(String(Yanfly.Parameters['Enemy Row Lock']));

Yanfly.Param.RowMapSprite = eval(String(Yanfly.Parameters['Use Map Sprite']));
Yanfly.Param.RowFrontBufferY = String(Yanfly.Parameters['Front Buffer Y']);
Yanfly.Param.RowSideBufferY = String(Yanfly.Parameters['Side Buffer Y']);

Yanfly.Param.RowAliveRowIndex = String(Yanfly.Parameters['Alive Row Index']);
Yanfly.Param.RowAliveRowIndex = eval(Yanfly.Param.RowAliveRowIndex);
Yanfly.Param.RowMaxRowX = String(Yanfly.Parameters['Maximum Row X']);
Yanfly.Param.RowMaxRowY = String(Yanfly.Parameters['Maximum Row Y']);
Yanfly.Param.RowMinRowY = String(Yanfly.Parameters['Minimum Row Y']);
Yanfly.Param.RowCenterY = String(Yanfly.Parameters['Center Row Y']);

Yanfly.Row.Name = {};
Yanfly.Row.Help = {};
Yanfly.Row.States = {};
Yanfly.Row.HomeX = {};
Yanfly.Row.HomeY = {};
Yanfly.SetupParameters = function() {
  for (var i = 1; i < 11; ++i) {
    var text = 'Row ' + i + ' Name';
    Yanfly.Row.Name[i] = String(Yanfly.Parameters[text]);
    text = 'Row ' + i + ' Help Line 1';
    Yanfly.Row.Help[i] = String(Yanfly.Parameters[text]) + '\n';
    text = 'Row ' + i + ' Help Line 2';
    Yanfly.Row.Help[i] += String(Yanfly.Parameters[text]);
    text = 'Row ' + i + ' States';
    var array = String(Yanfly.Parameters[text]).split(' ');
    Yanfly.Row.States[i] = [];
    for (var j = 0; j < array.length; ++j) {
      Yanfly.Row.States[i].push(parseInt(array[j]));
    }
    if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.5.0') {
      text = 'Row ' + i + ' States 1.5.0';
      Yanfly.Parameters[text] = Yanfly.Parameters[text] || '[]';
      var array = JSON.parse(Yanfly.Parameters[text]);
      Yanfly.Row.States[i] = [];
      for (var j = 0; j < array.length; ++j) {
        if (Yanfly.Row.States[i].contains(array[j])) continue;
        Yanfly.Row.States[i].push(parseInt(array[j]));
      }
    }
    text = 'Row ' + i + ' Home X';
    Yanfly.Row.HomeX[i] = String(Yanfly.Parameters[text]);
    text = 'Row ' + i + ' Home Y';
    Yanfly.Row.HomeY[i] = String(Yanfly.Parameters[text]);
  };
};
Yanfly.SetupParameters();

Yanfly.Param.RowEnemyAdj = eval(String(Yanfly.Parameters['Adjust Relative']));
Yanfly.Param.RowEnemyX = String(Yanfly.Parameters['Enemy Row X']);
Yanfly.Param.RowEnemyY = String(Yanfly.Parameters['Enemy Row Y']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Row.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Row.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_RowFormation) {
    this.processRowNotetags1($dataActors);
    this.processRowNotetags1($dataEnemies);
    this.processRowNotetags2($dataSkills);
    this.processRowNotetags2($dataItems);
    this.processRowNotetags3($dataActors);
    this.processRowNotetags3($dataClasses);
    this.processRowNotetags3($dataEnemies);
    this.processRowNotetags3($dataWeapons);
    this.processRowNotetags3($dataArmors);
    this.processRowNotetags3($dataStates);
    this.processRowNotetags4($dataStates);
    Yanfly._loaded_YEP_RowFormation = true;
  }
  return true;
};

DataManager.processRowNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.defaultRow = [Yanfly.Param.RowDefault];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:DEFAULT ROW):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        obj.defaultRow = [];
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.defaultRow = obj.defaultRow.concat(array);
      }
    }
  }
};

DataManager.processRowNotetags2 = function(group) {
  var noteR1 = /<(?:ROW ONLY):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var noteR2 = /<(?:ROW ONLY):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.rowOnly = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    obj.changeTargetRow = 0;
    obj.alterTargetRow = 0;
    obj.targetRowEval = '';
    obj.changeUserRow = 0;
    obj.alterUserRow = 0;
    obj.userRowEval = '';
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteR1)) {
        obj.rowOnly = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      } else if (line.match(noteR2)) {
        obj.rowOnly = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
      } else if (line.match(/<(?:CHANGE TARGET ROW):[ ](\d+)>/i)) {
        obj.changeTargetRow = parseInt(RegExp.$1);
      } else if (line.match(/<(?:PUSH BACK TARGET ROW):[ ](\d+)>/i)) {
        obj.alterTargetRow = parseInt(RegExp.$1);
      } else if (line.match(/<(?:PULL FORWARD TARGET ROW):[ ](\d+)>/i)) {
        obj.alterTargetRow = parseInt(RegExp.$1) * -1;
      } else if (line.match(/<(?:CUSTOM TARGET ROW)>/i)) {
        evalMode = 'customTargetRow';
      } else if (line.match(/<\/(?:CUSTOM TARGET ROW)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'customTargetRow') {
        obj.targetRowEval = obj.targetRowEval + line + '\n';
      } else if (line.match(/<(?:CHANGE USER ROW):[ ](\d+)>/i)) {
        obj.changeUserRow = parseInt(RegExp.$1);
      } else if (line.match(/<(?:PUSH BACK USER ROW):[ ](\d+)>/i)) {
        obj.alterUserRow = parseInt(RegExp.$1);
      } else if (line.match(/<(?:PULL FORWARD USER ROW):[ ](\d+)>/i)) {
        obj.alterUserRow = parseInt(RegExp.$1) * -1;
      } else if (line.match(/<(?:CUSTOM USER ROW)>/i)) {
        evalMode = 'customUserRow';
      } else if (line.match(/<\/(?:CUSTOM USER ROW)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'customUserRow') {
        obj.userRowEval = obj.userRowEval + line + '\n';
      }
    }
  }
};

DataManager.processRowNotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.rowLock = group === $dataEnemies ? Yanfly.Param.RowEnemyLock : false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:ROW LOCK|LOCK ROW)>/i)) {
        obj.rowLock = true;
      } else if (line.match(/<(?:NOT ROW LOCK|NOT LOCK ROW)>/i)) {
        obj.rowLock = false;
      }
    }
  }
};

DataManager.processRowNotetags4 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.rowConditionEval = '';
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:CUSTOM ROW CONDITION)>/i)) {
        var evalMode = 'customRowCondition';
      } else if (line.match(/<\/(?:CUSTOM ROW CONDITION)>/i)) {
        var evalMode = 'none';
      } else if (evalMode === 'customRowCondition') {
        obj.rowConditionEval = obj.rowConditionEval + line + '\n';
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Row.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Yanfly.Row.BattleManager_initMembers.call(this);
    this.clearRefreshRows();
};

BattleManager.clearRefreshRows = function() {
    this._refreshRows = false;
};

BattleManager.requestRefreshRows = function() {
    if (!$gameSystem.isSideView()) return;
    this._refreshRows = true;
};

BattleManager.isRowRefreshRequested = function() {
    return this._refreshRows;
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.hasStoredBattleSpriteset = function() {
  return this._battleSpriteset;
};

Game_Temp.prototype.storeBattleSpriteset = function() {
  this._battleSpriteset = SceneManager._scene._spriteset;
};

Game_Temp.prototype.restoreBattleSpriteset = function() {
  if (this._battleSpriteset) {
    SceneManager._scene._spriteset = this._battleSpriteset;
    SceneManager._scene.addChild(SceneManager._scene._spriteset);
    this._battleSpriteset = undefined;
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Row.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.Row.Game_System_initialize.call(this);
    this.initRowSettings();
};

Game_System.prototype.initRowSettings = function() {
    this._showRowMenu = Yanfly.Param.RowShowMenu;
    this._enableRowMenu = Yanfly.Param.RowEnMenu;
    this._showRowBattle = Yanfly.Param.RowShowBat;
    this._enableRowBattle = Yanfly.Param.RowEnBat;
};

Game_System.prototype.isShowRowMenu = function() {
    if (this._showRowMenu === undefined) this.initRowSettings();
    return this._showRowMenu;
};

Game_System.prototype.setShowRowMenu = function(value) {
    if (this._showRowMenu === undefined) this.initRowSettings();
    this._showRowMenu = value;
};

Game_System.prototype.isEnabledRowMenu = function() {
    if (this._enableRowMenu === undefined) this.initRowSettings();
    return this._enableRowMenu;
};

Game_System.prototype.setEnabledRowMenu = function(value) {
    if (this._enableRowMenu === undefined) this.initRowSettings();
    this._enableRowMenu = value;
};

Game_System.prototype.isShowRowBattle = function() {
    if (this._showRowBattle === undefined) this.initRowSettings();
    return this._showRowBattle;
};

Game_System.prototype.setShowRowBattle = function(value) {
    if (this._showRowBattle === undefined) this.initRowSettings();
    this._showRowBattle = value;
};

Game_System.prototype.isEnabledRowBattle = function() {
    if (this._enableRowBattle === undefined) this.initRowSettings();
    if (this._battleRowCooldown === undefined) {
      this.resetBattleRowCooldown();
    }
    if (this._battleRowCooldown > 0) return false;
    return this._enableRowBattle;
};

Game_System.prototype.setEnabledRowBattle = function(value) {
    if (this._enableRowBattle === undefined) this.initRowSettings();
    this._enableRowBattle = value;
};

Game_System.prototype.resetBattleRowCooldown = function() {
    this._battleRowCooldown = 0;
};

Game_System.prototype.updateBattleRowCooldown = function() {
    if (this._battleRowCooldown === undefined) {
      this.resetBattleRowCooldown();
    }
    this._battleRowCooldown--;
};

Game_System.prototype.setBattleRowCooldown = function() {
    this._battleRowCooldown = Yanfly.Param.RowCooldown;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.Row.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    this._isRowLocked = undefined;
    this._requestRowStatesRefresh = true;
    this._rowStatesRaw = undefined;
    Yanfly.Row.Game_BattlerBase_refresh.call(this);
};

Yanfly.Row.Game_BattlerBase_states = Game_BattlerBase.prototype.states;
Game_BattlerBase.prototype.states = function() {
    var array = Yanfly.Row.Game_BattlerBase_states.call(this);
    if ($gameParty.inBattle()) {
      this.addRowStates(array);
      this.sortRowStates(array);
    }
    return array;
};

Yanfly.Row.Game_BattlerBase_isStateAffected =
    Game_BattlerBase.prototype.isStateAffected;
Game_BattlerBase.prototype.isStateAffected = function(stateId) {
    if (this.isRowStateAffected(stateId)) return true;
    return Yanfly.Row.Game_BattlerBase_isStateAffected.call(this, stateId);
};

Game_BattlerBase.prototype.addRowStates = function(array) {
    var length = this.rowStatesRaw().length;
    for (var i = 0; i < length; ++i) {
      var stateId = this.rowStatesRaw()[i];
      var state = $dataStates[stateId];
      if (state) array.push(state);
    }
};

Game_BattlerBase.prototype.rowStates = function() {
    var array = [];
    for (var i = 0; i < this.rowStatesRaw().length; ++i) {
      var state = $dataStates[this.rowStatesRaw()[i]];
      if (state && array.contains(state)) continue;
      array.push(state);
    }
    return array;
};

Game_BattlerBase.prototype.rowStatesRaw = function() {
    if (this._rowStatesRaw !== undefined) return this._rowStatesRaw;
    var array = this.getRowStateData();
    this._rowStatesRaw = array.filter(Yanfly.Util.onlyUnique)
    return this._rowStatesRaw;
};

Game_BattlerBase.prototype.getRowStateData = function() {
    var source = Yanfly.Row.States[this.row()].slice();
    var array = [];
    for (var i = 0; i < source.length; ++i) {
      var stateId = source[i];
      if (!this.meetRowStateCondition(stateId)) continue;
      array.push(stateId);
    }
    return array;
};

Game_BattlerBase.prototype.meetRowStateCondition = function(stateId) {
    if (!$gameParty.inBattle()) return false;
    if (this._checkingRowStateCondition) return false;
    var state = $dataStates[stateId];
    if (!state) return false;
    if (state.rowConditionEval === '') return true;
    return this.rowStateConditionEval(state);
};

Game_BattlerBase.prototype.rowStateConditionEval = function(state) {
    this._checkingRowStateCondition = state.id;
    var condition = true;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = state.rowConditionEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'ROW STATE CONDITION EVAL ERROR');
    }
    this._checkingRowStateCondition = 0;
    return condition;
};

Game_BattlerBase.prototype.sortRowStates = function(array) {
    array.sort(function(a, b) {
      var p1 = a.priority;
      var p2 = b.priority;
      if (p1 !== p2) return p2 - p1;
      return a - b;
    });
};

Game_BattlerBase.prototype.isRowStateAffected = function(stateId) {
    if (!$gameParty.inBattle()) return false;
    return this.rowStatesRaw().contains(stateId);
};

Yanfly.Row.Game_BattlerBase_meetsSkillConditions =
    Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    if (!skill.rowOnly.contains(this.row())) return false;
    return Yanfly.Row.Game_BattlerBase_meetsSkillConditions.call(this, skill);
};

Yanfly.Row.Game_BattlerBase_meetsItemConditions =
    Game_BattlerBase.prototype.meetsItemConditions;
Game_BattlerBase.prototype.meetsItemConditions = function(item) {
    if (!item.rowOnly.contains(this.row())) return false;
    return Yanfly.Row.Game_BattlerBase_meetsItemConditions.call(this, item);
};

Game_BattlerBase.prototype.isRowStateRefreshRequested = function() {
    return this._requestRowStatesRefresh;
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.initRowFormation = function() {
    if (this.isActor()) {
      var rows = this.actor().defaultRow;
    } else if (this.isEnemy()) {
      var rows = this.enemy().defaultRow;
    }
    this._row = rows[Math.floor(Math.random() * rows.length)];;
    this._row = this._row.clamp(1, Yanfly.Param.RowMaximum);
    this._rowStatesRaw = undefined;
};

Game_Battler.prototype.row = function() {
    if (this._row === undefined) this.initRowFormation();
    return this._row;
};

Game_Battler.prototype.rowIndex = function() {
    var group = this.friendsUnit();
    if (Yanfly.Param.RowAliveRowIndex && group === $gameTroop) {
      var index = group.rowAliveMembers(this.row()).indexOf(this);
    } else {
      var index = group.rowMembers(this.row()).indexOf(this);
    }
    return index;
};

Yanfly.Row.Game_Battler_isStateAddable = Game_Battler.prototype.isStateAddable;
Game_Battler.prototype.isStateAddable = function(stateId) {
    if (this.isRowStateAffected(stateId)) return false;
    return Yanfly.Row.Game_Battler_isStateAddable.call(this, stateId);
};

Yanfly.Row.Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    if (this.isRowStateAffected(stateId)) return;
    Yanfly.Row.Game_Battler_removeState.call(this, stateId);
};

Game_Battler.prototype.isRowLocked = function() {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var state = this.states()[i];
      if (state && state.rowLock) {
        this._isRowLocked = true;
        return this._isRowLocked;
      }
    }
    return false;
};

Game_Battler.prototype.setRow = function(rowId) {
    if (this._row === undefined) this.initRowFormation();
    if (this.isRowLocked()) return;
    var currentRow = this._row;
    this._row = rowId.clamp(1, Yanfly.Param.RowMaximum);
    var changed = currentRow !== this._row;
    if (changed) this.friendsUnit().clearBattleRowCache();
    if ($gameParty.inBattle() && changed) BattleManager.requestRefreshRows();
};

Game_Battler.prototype.alterRow = function(value) {
    if (this._row === undefined) this.initRowFormation();
    if (this.isRowLocked()) return;
    var currentRow = this._row;
    this._row += value;
    this._row = this._row.clamp(1, Yanfly.Param.RowMaximum);
    var changed = currentRow !== this._row;
    if (changed) this.friendsUnit().clearBattleRowCache();
    if ($gameParty.inBattle() && changed) BattleManager.requestRefreshRows();
};

Game_Battler.prototype.targetRowEval = function(code, user, item) {
    var visible = true;
    var skill = item;
    var a = user;
    var subject = user;
    var b = this;
    var target = this;
    var row = this._row;
    var currentRow = this._row;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'TARGET ROW EVAL ERROR');
    }
    if (currentRow !== row) this.setRow(row);
    var changed = currentRow !== this._row;
    if ($gameParty.inBattle() && changed) BattleManager.requestRefreshRows();
};

Game_Battler.prototype.userRowEval = function(code, target, item) {
    var visible = true;
    var skill = item;
    var a = this;
    var user = this;
    var subject = this;
    var b = target;
    var target = target;
    var row = this._row;
    var currentRow = this._row;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'USER ROW EVAL ERROR');
    }
    if (currentRow !== row) this.setRow(row);
    var changed = currentRow !== this._row;
    if ($gameParty.inBattle() && changed) BattleManager.requestRefreshRows();
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Row.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Yanfly.Row.Game_Actor_setup.call(this, actorId);
    this.initRowFormation();
};

Game_Actor.prototype.isRowLocked = function() {
    if (this._isRowLocked !== undefined) return this._isRowLocked;
    if (this.actor().rowLock) {
      this._isRowLocked = true;
      return this._isRowLocked;
    }
    if (this.currentClass().rowLock) {
      this._isRowLocked = true;
      return this._isRowLocked;
    }
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.rowLock) {
        this._isRowLocked = true;
        return this._isRowLocked;
      }
    }
    if (Game_Battler.prototype.isRowLocked.call(this)) {
      this._isRowLocked = true;
      return this._isRowLocked;
    }
    this._isRowLocked = false;
    return this._isRowLocked;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Yanfly.Row.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Yanfly.Row.Game_Enemy_setup.call(this, enemyId, x, y);
    this.initRowFormation();
};

Game_Enemy.prototype.isRowLocked = function() {
    if (this._isRowLocked !== undefined) return this._isRowLocked;
    if (this.enemy().rowLock) {
      this._isRowLocked = true;
      return this._isRowLocked;
    }
    if (Game_Battler.prototype.isRowLocked.call(this)) {
      this._isRowLocked = true;
      return this._isRowLocked;
    }
    this._isRowLocked = false;
    return this._isRowLocked;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Row.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    if ($gameTroop.turnCount() <= 0) target._allowRowReposition = true;
    Yanfly.Row.Game_Action_apply.call(this, target);
    if ($gameParty.inBattle() && this.item()) {
      this.applyUserItemRowEffect(target);
    }
};

Yanfly.Row.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.Row.Game_Action_applyItemUserEffect.call(this, target);
    if (!$gameParty.inBattle()) return;
    if (!this.item()) return;
    this.applyItemRowEffect(target);
};

Game_Action.prototype.applyItemRowEffect = function(target) {
    if (!target) return;
    var item = this.item();
    if (item.changeTargetRow > 0) target.setRow(item.changeTargetRow);
    if (item.alterTargetRow !== 0) target.alterRow(item.alterTargetRow);
    if (item.targetRowEval !== '') target.targetRowEval(item.targetRowEval, 
      this.subject(), item);
};

Game_Action.prototype.applyUserItemRowEffect = function(target) {
    var item = this.item();
    var user = this.subject();
    if (!user) return;
    if (item.changeUserRow > 0) user.setRow(item.changeUserRow);
    if (item.alterUserRow !== 0) user.alterRow(item.alterUserRow);
    if (item.userRowEval !== '') user.userRowEval(item.userRowEval, 
      target, item);
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.rowSize = function(rowId) {
    return this.rowMembers(rowId).length;
};

Game_Unit.prototype.rowAliveSize = function(rowId) {
    return this.rowAliveMembers(rowId).length;
};

Game_Unit.prototype.rowDeadSize = function(rowId) {
    return this.rowDeadMembers(rowId).length;
};

Game_Unit.prototype.rowMembers = function(rowId) {
    var group = [];
    var length = this.members().length;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (!member) continue;
      if (member.row() === rowId) group.push(member);
    }
    return group;
};

Game_Unit.prototype.rowAliveMembers = function(rowId) {
    var group = [];
    var length = this.aliveMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = this.aliveMembers()[i];
      if (!member) continue;
      if (member.row() === rowId) group.push(member);
    }
    return group;
};

Game_Unit.prototype.rowDeadMembers = function(rowId) {
    var group = [];
    var length = this.deadMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = this.deadMembers()[i];
      if (!member) continue;
      if (member.row() === rowId) group.push(member);
    }
    return group;
};

Game_Unit.prototype.updateRows = function() {
    for (var i = 0; i < Yanfly.Param.RowMaximum; ++i) {
      var rowId = i + 1;
      if (this.rowAliveSize(rowId) <= 0) this.updateMemberRows(rowId);
    }
};

Game_Unit.prototype.updateMemberRows = function(rowId) {
    for (var i = 0; i < this.aliveMembers().length; ++i) {
      var member = this.aliveMembers()[i];
      if (!member) continue;
      if (member.row() < rowId) continue;
      member.alterRow(-1);
    }
};

Game_Unit.prototype.isRowStateRefreshRequested = function() {
    var length = this.members();
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member && member.isRowStateRefreshRequested())  return true;
    }
    return false;
};

Game_Unit.prototype.clearBattleRowCache = function() {
    var length = this.members().length;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member) {
        member._rowStatesRaw = undefined;
        member._requestRowStatesRefresh = false;
      }
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.rowMembers = function(rowId) {
    var group = [];
    var length = this.battleMembers().length;
    for (var i = 0; i < length; ++i) {
      var member = this.members()[i];
      if (member && member.row() === rowId) group.push(member);
    }
    return group;
};

Game_Party.prototype.loadActorImages = function() {
    for (var i = 0; i < this.members().length; ++i) {
      var actor = this.members()[i];
      if (!actor) continue;
      ImageManager.loadFace(actor.faceName());
      ImageManager.loadCharacter(actor.characterName());
    }
};

//=============================================================================
// Game_Troop
//=============================================================================

Yanfly.Row.Game_Troop_increaseTurn = Game_Troop.prototype.increaseTurn;
Game_Troop.prototype.increaseTurn = function() {
    Yanfly.Row.Game_Troop_increaseTurn.call(this);
    $gameSystem.updateBattleRowCooldown();
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.Row.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.Row.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command === 'ShowMenuRow') $gameSystem.setShowRowMenu(true);
  if (command === 'HideMenuRow') $gameSystem.setShowRowMenu(false);
  if (command === 'EnableMenuRow') $gameSystem.setEnabledRowMenu(true);
  if (command === 'DisableMenuRow') $gameSystem.setEnabledRowMenu(false);
  if (command === 'ShowBattleRow') $gameSystem.setShowRowBattle(true);
  if (command === 'HideBattleRow') $gameSystem.setShowRowBattle(false);
  if (command === 'EnableBattleRow') $gameSystem.setEnabledRowBattle(true);
  if (command === 'DisableBattleRow') $gameSystem.setEnabledRowBattle(false);
  if (command === 'SetActorRow') this.setActorRow(args);
  if (command === 'SetPartyRow') this.setPartyRow(args);
  if (command === 'SetEnemyRow') this.setEnemyRow(args);
};

Game_Interpreter.prototype.setActorRow = function(args) {
    if (!args) return;
    var actorId = parseInt(args[0]);
    var rowId = parseInt(args[1]);
    $gameActors.actor(actorId).setRow(rowId);
};

Game_Interpreter.prototype.setPartyRow = function(args) {
    if (!args) return;
    var index = parseInt(args[0]) - 1;
    var rowId = parseInt(args[1]);
    $gameParty.members()[index].setRow(rowId);
};

Game_Interpreter.prototype.setEnemyRow = function(args) {
    if (!args) return;
    var index = parseInt(args[0]) - 1;
    var rowId = parseInt(args[1]);
    $gameTroop.members()[index].setRow(rowId);
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.Row.Sprite_Battler_setHome = Sprite_Battler.prototype.setHome;
Sprite_Battler.prototype.setHome = function(x, y) {
    if (this._enemy) return this.setEnemyHome(this._enemy.index());
    Yanfly.Row.Sprite_Battler_setHome.call(this, x, y);
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Yanfly.Row.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    if (!$gameSystem.isSideView()) {
      return Yanfly.Row.Sprite_Actor_setActorHome.call(this, index);
    }
    this.alterActorHome(index);
    this.setHome(this._homeX, this._homeY);
    this.moveToStartPosition();
};

Sprite_Actor.prototype.alterActorHome = function(index) {
    var screenWidth = Graphics.boxWidth;
    var screenHeight = Graphics.boxHeight;
    var maxSize = $gameParty.maxBattleMembers();
    var maxRows = Yanfly.Param.RowMaximum;
    var partySize = $gameParty.battleMembers().length;
    var rowId = this._actor.row();
    var rowSize = $gameParty.rowSize(rowId);
    var rowMembers = $gameParty.rowMembers(rowId);
    var rowIndex = this._actor.rowIndex();
    if (Imported.YEP_BattleEngineCore) {
      var statusHeight = Yanfly.Param.BECCommandRows;
    } else {
      var statusHeight = 4;
    }
    statusHeight *= Window_Base.prototype.lineHeight.call(this);
    statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
    var code = Yanfly.Param.RowMaxRowX;
    try {
      var maxRowX = eval(code);
    } catch (e) {
      var maxRowX = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION MAX ROW X ERROR');
    }
    var code = Yanfly.Param.RowMaxRowY;
    try {
      var maxRowY = eval(code);
    } catch (e) {
      var maxRowY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION MAX ROW Y ERROR');
    }
    var code = Yanfly.Param.RowMinRowY;
    try {
      var minRowY = eval(code);
    } catch (e) {
      var minRowY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION MIN ROW Y ERROR');
    }
    var code = Yanfly.Param.RowCenterY;
    try {
      var centerY = eval(code);
    } catch (e) {
      var centerY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION CENTER Y ERROR');
    }
    var code = Yanfly.Row.HomeX[rowId];
    try {
      var homeX = eval(code);
    } catch (e) {
      var homeX = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION ACTOR HOME X ERROR');
    }
    var code = Yanfly.Row.HomeY[rowId];
    try {
      var homeY = eval(code);
    } catch (e) {
      var homeY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION ACTOR HOME Y ERROR');
    }
    this._homeX = homeX;
    this._homeY = homeY;
};

Sprite_Actor.prototype.refreshActorRow = function() {
    if (!this._actor) return;
    var index = this._actor.index();
    var x = this.x;
    var y = this.y;
    this.alterActorHome(index);
    this._offsetX = x - this._homeX;
    this._offsetY = y - this._homeY;
    this._targetOffsetX = this._targetOffsetX || 0;
    this._targetOffsetY = this._targetOffsetY || 0;
    if (this.isNotChangeRowPosition()) this._movementDuration = 12;
};

Sprite_Actor.prototype.isNotChangeRowPosition = function() {
    if (this._actor === BattleManager._subject) return false;
    if (this._actor.isDead()) return false;
    if (this._actor._allowRowReposition) {
      this._actor._allowRowReposition = undefined;
      return false;
    }
    return true;
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

Sprite_Enemy.prototype.refreshEnemyRow = function() {
    if (!this._enemy) return;
    var index = this._enemy.index();
    if (this.isNotChangeRowPosition()) return this.setRowHomePosition();
    var x = this.x;
    var y = this.y;
    this.alterEnemyHome(index);
    this._offsetX = x - this._homeX;
    this._offsetY = y - this._homeY;
    this._targetOffsetX = this._targetOffsetX || 0;
    this._targetOffsetY = this._targetOffsetY || 0;
    if (this._enemy !== BattleManager._subject) this._movementDuration = 12;
};

Sprite_Enemy.prototype.isNotChangeRowPosition = function() {
    if (Yanfly.Param.RowEnemyAdj) return false;
    if (this._enemy._allowRowReposition) {
      this._enemy._allowRowReposition = undefined;
      return false;
    }
    if ($gameTroop.turnCount() <= 0) return true;
    if (this._enemy.isDead()) return true;
    return false;
};

Sprite_Enemy.prototype.setRowHomePosition = function() {
    if (BattleManager._bypassMoveToStartLocation) return;
    var screenWidth = Graphics.boxWidth;
    var screenHeight = Graphics.boxHeight;
    var maxSize = $gameTroop.members().length;
    var maxRows = Yanfly.Param.RowMaximum;
    var partySize = $gameTroop.members().length;
    var rowId = this._enemy.row();
    var rowSize = $gameTroop.rowSize(rowId);
    var rowMembers = $gameTroop.rowMembers(rowId);
    var rowIndex = this._enemy.rowIndex();
    if (Imported.YEP_BattleEngineCore) {
      var statusHeight = Yanfly.Param.BECCommandRows;
    } else {
      var statusHeight = 4;
    }
    statusHeight *= Window_Base.prototype.lineHeight.call(this);
    statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
    var code = Yanfly.Param.RowMaxRowX;
    try {
      var maxRowX = eval(code);
    } catch (e) {
      var maxRowX = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION MAX ROW X ERROR');
    }
    var code = Yanfly.Param.RowMaxRowY;
    try {
      var maxRowY = eval(code);
    } catch (e) {
      var maxRowY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION MAX ROW Y ERROR');
    }
    var code = Yanfly.Param.RowMinRowY;
    try {
      var minRowY = eval(code);
    } catch (e) {
      var minRowY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION MIN ROW Y ERROR');
    }
    var code = Yanfly.Param.RowCenterY;
    try {
      var centerY = eval(code);
    } catch (e) {
      var centerY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION CENTER Y ERROR');
    }
    var screenX = this._enemy.screenX();
    var screenY = this._enemy.screenY();
    var code = Yanfly.Param.RowEnemyX;
    try {
      var homeX = eval(code);
    } catch (e) {
      var homeX = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION ENEMY HOME X ERROR');
    }
    var code = Yanfly.Param.RowEnemyY
    try {
      var homeY = eval(code);
    } catch (e) {
      var homeY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION ENEMY HOME Y ERROR');
    }
    this._enemy._screenX += this._homeX - homeX;
    this._enemy._screenY += this._homeY - homeY;
};

Sprite_Enemy.prototype.setEnemyHome = function(index) {
    if (this.isNotChangeRowPosition()) {
      this._homeX = this._enemy.screenX();
      this._homeY = this._enemy.screenY();
      if (!BattleManager._bypassMoveToStartLocation) {
        return this.setRowHomePosition();
      }
    }
    this.alterEnemyHome(index);
    Yanfly.Row.Sprite_Battler_setHome.call(this, this._homeX, this._homeY);
};

Sprite_Enemy.prototype.alterEnemyHome = function(index) {
    var screenWidth = Graphics.boxWidth;
    var screenHeight = Graphics.boxHeight;
    var maxSize = $gameTroop.members().length;
    var maxRows = Yanfly.Param.RowMaximum;
    var partySize = $gameTroop.members().length;
    var rowId = this._enemy.row();
    var rowSize = $gameTroop.rowSize(rowId);
    var rowMembers = $gameTroop.rowMembers(rowId);
    var rowIndex = this._enemy.rowIndex();
    if (Imported.YEP_BattleEngineCore) {
      var statusHeight = Yanfly.Param.BECCommandRows;
    } else {
      var statusHeight = 4;
    }
    statusHeight *= Window_Base.prototype.lineHeight.call(this);
    statusHeight += Window_Base.prototype.standardPadding.call(this) * 2;
    var code = Yanfly.Param.RowMaxRowX;
    try {
      var maxRowX = eval(code);
    } catch (e) {
      var maxRowX = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION MAX ROW X ERROR');
    }
    var code = Yanfly.Param.RowMaxRowY;
    try {
      var maxRowY = eval(code);
    } catch (e) {
      var maxRowY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION MAX ROW Y ERROR');
    }
    var code = Yanfly.Param.RowMinRowY;
    try {
      var minRowY = eval(code);
    } catch (e) {
      var minRowY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION MIN ROW Y ERROR');
    }
    var code = Yanfly.Param.RowCenterY;
    try {
      var centerY = eval(code);
    } catch (e) {
      var centerY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION CENTER Y ERROR');
    }
    var screenX = this._enemy.screenX();
    var screenY = this._enemy.screenY();
    var code = Yanfly.Param.RowEnemyX;
    try {
      var homeX = eval(code);
    } catch (e) {
      var homeX = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION ENEMY HOME X ERROR');
    }
    var code = Yanfly.Param.RowEnemyY
    try {
      var homeY = eval(code);
    } catch (e) {
      var homeY = 0;
      Yanfly.Util.displayError(e, code, 'ROW FORMATION ENEMY HOME Y ERROR');
    }
    this._homeX = homeX;
    this._homeY = homeY;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Yanfly.Row.Spriteset_Battle_createLowerLayer =
    Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    Yanfly.Row.Spriteset_Battle_createLowerLayer.call(this);
    this.refreshRowPositions();
};

Spriteset_Battle.prototype.refreshRowPositions = function() {
    var length = this._actorSprites.length;
    for (var i = 0; i < length; ++i) {
      var sprite = this._actorSprites[i];
      if (!sprite) continue;
      sprite.refreshActorRow();
    }
    var length = this._enemySprites.length;
    for (var i = 0; i < length; ++i) {
      var sprite = this._enemySprites[i];
      if (!sprite) continue;
      sprite.refreshEnemyRow();
    }
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawSvActor = function(actor, x, y) {
    var filename = actor.battlerName();
    var bitmap = ImageManager.loadSvActor(filename);
    var pw = bitmap.width / 9;
    var ph = bitmap.height / 6;
    var sx = 0;
    var sy = 0;
    this.contents.blt(bitmap, sx, sy, pw, ph, x - pw / 2, y - ph);
};

//=============================================================================
// Window_ItemList
//=============================================================================

Yanfly.Row.Window_ItemList_isEnabled = Window_ItemList.prototype.isEnabled;
Window_ItemList.prototype.isEnabled = function(item) {
    if ($gameParty.inBattle()) return this.isRowEnabled(item);
    return Yanfly.Row.Window_ItemList_isEnabled.call(this, item);
};

Window_ItemList.prototype.isRowEnabled = function(item) {
    var actor = BattleManager.actor();
    if (!actor) return Yanfly.Row.Window_ItemList_isEnabled.call(this, item);
    return actor.canUse(item);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

Yanfly.Row.Window_MenuCommand_addFormationCommand =
    Window_MenuCommand.prototype.addFormationCommand;
Window_MenuCommand.prototype.addFormationCommand = function() {
    Yanfly.Row.Window_MenuCommand_addFormationCommand.call(this);
    if (Yanfly.Param.RowAutoAdd) this.addRowCommand();
};

Window_MenuCommand.prototype.addRowCommand = function() {
    if (!$gameSystem.isShowRowMenu()) return;
    if (this.findSymbol('row') > -1) return;
    var text = Yanfly.Param.RowCmdName;
    var enabled = $gameSystem.isEnabledRowMenu();
    this.addCommand(text, 'row', enabled);
};

//=============================================================================
// Window_RowFormation
//=============================================================================

function Window_RowFormation() {
    this.initialize.apply(this, arguments);
}

Window_RowFormation.prototype = Object.create(Window_Selectable.prototype);
Window_RowFormation.prototype.constructor = Window_RowFormation;

Window_RowFormation.prototype.initialize = function(wy) {
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - wy;
    Window_Selectable.prototype.initialize.call(this, 0, wy, ww, wh);
    this.loadImages();
    this.refresh();
    this.select(0);
    this.activate();
};

Window_RowFormation.prototype.maxItems = function() {
    return $gameParty.size();
};

Window_RowFormation.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    clientHeight = Math.floor(clientHeight / this.numVisibleRows())
    clientHeight = Math.max(clientHeight, this.lineHeight() * 2);
    return clientHeight;
};

Window_RowFormation.prototype.numVisibleRows = function() {
    return $gameParty.maxBattleMembers();
};

Window_RowFormation.prototype.loadImages = function() {
    $gameParty.members().forEach(function(actor) {
      this.getImage(actor);
    }, this);
};

Window_RowFormation.prototype.getActor = function(index) {
    return $gameParty.members()[index];
};

Window_RowFormation.prototype.getImage = function(actor) {
    if (Yanfly.Param.RowMapSprite) {
      var image = ImageManager.loadCharacter(actor.characterName());
    } else {
      var image = ImageManager.loadSvActor(actor.battlerName());
    }
    return image;
};

Window_RowFormation.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
      var index = topIndex + i;
      if (index < this.maxItems()) {
        this.drawItem(index);
        var rect = this.itemRect(index + 1);
        this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
      }
    }
};

Window_RowFormation.prototype.drawItem = function(index) {
  var actor = this.getActor(index);
  if (!actor) return;
  var image = this.getImage(actor);
  if (image.width <= 0) return setTimeout(this.drawItem.bind(this, index), 5);
  this.drawRowItem(index);
};

Window_RowFormation.prototype.drawRowItem = function(index) {
    var actor = this.getActor(index);
    this.drawRowRects(index);
    this.drawActorRowPosition(actor, index);
    this.drawActorDetail(actor, index);
};

Window_RowFormation.prototype.drawRowRects = function(index) {
    for (var i = 0; i < Yanfly.Param.RowMaximum; ++i) {
      var rect = this.rowRect(index, i + 1)
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    }
};

Window_RowFormation.prototype.rowRect = function(index, rowId) {
    var actor = this.getActor(index);
    var rect = this.itemRect(index);
    rect.width = Math.floor(rect.width / Yanfly.Param.RowMaximum);
    rect.width = Math.min(rect.width, rect.height);
    var sx = (this.contents.width - rect.width * Yanfly.Param.RowMaximum) / 2
    rect.x = sx + (rowId - 1) * rect.width;
    return rect;
};

Window_RowFormation.prototype.drawDarkRect = function(dx, dy, dw, dh) {
    var color = this.gaugeBackColor();
    this.changePaintOpacity(false);
    this.contents.fillRect(dx + 2, dy + 2, dw - 4, dh - 4, color);
    this.changePaintOpacity(true);
};

Window_RowFormation.prototype.drawActorRowPosition = function(actor, index) {
    var img = this.getImage(actor);
    var rect = this.rowRect(index, actor.row());
    if (Yanfly.Param.RowMapSprite) {
      var code = Yanfly.Param.RowFrontBufferY;
      try {
        var buffer = eval(code);
      } catch (e) {
        var buffer = 0;
        Yanfly.Util.displayError(e, code, 'FRONT ROW Y BUFFER FORMULA ERROR');
      }
      var wx = Math.floor(rect.x + rect.width / 2);
      var wy = Math.floor(rect.y + rect.height - buffer);
      this.drawActorCharacter(actor, wx, wy);
    } else {
      var code = Yanfly.Param.RowSideBufferY;
      try {
        var buffer = eval(code);
      } catch (e) {
        var buffer = 0;
        Yanfly.Util.displayError(e, code, 'SIDE ROW Y BUFFER FORMULA ERROR');
      }
      var wx = Math.floor(rect.x + rect.width / 2);
      var wy = Math.floor(rect.y + rect.height - buffer);
      this.drawSvActor(actor, wx, wy)
    }
};

Window_RowFormation.prototype.drawActorDetail = function(actor, index) {
    var rect = this.itemRect(index);
    var wx = rect.x + this.textPadding();
    var ww = rect.width - this.textPadding() * 2;
    this.changeTextColor(this.normalColor());
    this.drawText(actor.name(), wx, rect.y, ww);
    var wy = rect.y + this.lineHeight();
    this.changeTextColor(this.systemColor());
    this.drawText(actor.currentClass().name, wx, wy, ww);
};

Window_RowFormation.prototype.updateCursor = function() {
    var index = this.index();
    var actor = this.getActor(index);
    var rowId = (actor) ? actor.row() : 1;
    var rect = this.rowRect(index, rowId);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};

Window_RowFormation.prototype.cursorRight = function(wrap) {
    var actor = this.getActor(this.index());
    if (!actor) return;
    if (actor.row() < Yanfly.Param.RowMaximum) {
      if (actor.isRowLocked()) return SoundManager.playBuzzer();
      SoundManager.playCursor();
      actor.alterRow(1);
      actor.refresh();
      this.refresh();
      this.updateHelp();
      this.updateCursor();
    }
};

Window_RowFormation.prototype.cursorLeft = function(wrap) {
    var actor = this.getActor(this.index());
    if (!actor) return;
    if (actor.row() > 1) {
      if (actor.isRowLocked()) return SoundManager.playBuzzer();
      SoundManager.playCursor();
      actor.alterRow(-1);
      actor.refresh();
      this.refresh();
      this.updateHelp();
      this.updateCursor();
    }
};

Window_RowFormation.prototype.updateHelp = function() {
    var actor = this.getActor(this.index());
    if (!actor) return this._helpWindow.clear();
    var rowId = actor.row();
    this._helpWindow.setText(Yanfly.Row.Help[rowId]);
};

Window_RowFormation.prototype.onTouch = function(triggered) {
    var lastIndex = this.index();
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    var hitIndex = this.hitTest(x, y);
    if (hitIndex >= 0 && this.isCursorMovable()) {
      this.updateTouchRectRow(hitIndex, x, y);
    } else {
      Window_Selectable.prototype.onTouch.call(this, triggered);
    }
};

Window_RowFormation.prototype.updateTouchRectRow = function(index, x, y) {
    for (var i = 1; i < Yanfly.Param.RowMaximum + 1; ++i) {
      var rect = this.rowRect(index, i);
      if (x >= rect.x && x <= rect.x + rect.width) {
        if (y >= rect.y && y <= rect.y + rect.height) {
          var actor = this.getActor(index);
          var currentIndex = this.index();
          this.select(index);
          var changedIndex = currentIndex !== this.index();
          var currentRow = actor._row;
          actor.setRow(i);
          actor.refresh();
          this.refresh();
          this.updateHelp();
          this.updateCursor();
          var changedRow = currentRow !== actor._row;
          if (changedIndex || changedRow) SoundManager.playCursor();
        }
      }
    }
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Row.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    Yanfly.Row.Scene_Battle_update.call(this);
    if (BattleManager.isRowRefreshRequested()) this.refreshRowPositions();
    if ($gameParty.isRowStateRefreshRequested()) {
      $gameParty.clearBattleRowCache();
    }
    if ($gameTroop.isRowStateRefreshRequested()) {
      $gameTroop.clearBattleRowCache();
    }
};

Scene_Battle.prototype.refreshRowPositions = function() {
    this._spriteset.refreshRowPositions();
    BattleManager.clearRefreshRows();
};

//=============================================================================
// Scene_Menu
//=============================================================================

Yanfly.Row.Scene_Menu_createCommandWindow =
    Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    Yanfly.Row.Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('row', this.commandRow.bind(this));
};

Scene_Menu.prototype.commandRow = function() {
    SceneManager.push(Scene_Row);
};

//=============================================================================
// Scene_Row
//=============================================================================

function Scene_Row() {
    this.initialize.apply(this, arguments);
}

Scene_Row.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Row.prototype.constructor = Scene_Row;

Scene_Row.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Row.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createRowFormationWindow();
};

Scene_Row.prototype.createRowFormationWindow = function() {
    var wy = this._helpWindow.height;
    this._rowFormationWindow = new Window_RowFormation(wy);
    this._rowFormationWindow.setHelpWindow(this._helpWindow);
    this._rowFormationWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._rowFormationWindow);
};

//=============================================================================
// Battle Engine Core Implementation
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Row.BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    if (!$gameTemp._rowBattle) {
      Yanfly.Row.BattleManager_startBattle.call(this);
    }
    $gameTemp._rowBattle = false;
    this._bypassMoveToStartLocation = false;
    //this._spriteset.refreshRowPositions();
    BattleManager.refreshAllBattlers();
};

BattleManager.refreshAllBattlers = function() {
  var members = $gameParty.members().concat($gameTroop.members());
  var length = members.length;
  for (var i = 0; i < length; ++i) {
    var member = members[i];
    if (member) member.refresh();
  }
};

Yanfly.Row.BattleManager_playBattleBgm = BattleManager.playBattleBgm;
BattleManager.playBattleBgm = function() {
    var restartBgm = true;
    if (Yanfly.Row.SavedBattleBgm) {
      AudioManager.playBgm(Yanfly.Row.SavedBattleBgm);
      Yanfly.Row.SavedBattleBgm = undefined;
      restartBgm = false;
    }
    if (Yanfly.Row.SavedBattleBgs) {
      AudioManager.playBgs(Yanfly.Row.SavedBattleBgs);
      Yanfly.Row.SavedBattleBgs = undefined;
      restartBgm = false;
    }
    if (restartBgm) Yanfly.Row.BattleManager_playBattleBgm.call(this);
};

//=============================================================================
// Game_Unit
//=============================================================================

Yanfly.Row.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function() {
    if ($gameTemp._rowBattle) return;
    Yanfly.Row.Game_Unit_onBattleStart.call(this);
    $gameSystem.resetBattleRowCooldown();
};

Yanfly.Row.Game_Unit_onBattleEnd = Game_Unit.prototype.onBattleEnd;
Game_Unit.prototype.onBattleEnd = function() {
    if ($gameTemp._rowBattle) return;
    Yanfly.Row.Game_Unit_onBattleEnd.call(this);
    $gameSystem.resetBattleRowCooldown();
};

//=============================================================================
// Window_Command
//=============================================================================

Window_Command.prototype.addCommandAt = function(index, name, symbol, en, ext) {
    if (en === undefined) enabled = true;
    if (ext === undefined) ext = null;
    var obj = { name: name, symbol: symbol, enabled: en, ext: ext};
    this._list.splice(index, 0, obj);
};

//=============================================================================
// Window_PartyCommand
//=============================================================================

Yanfly.Row.Window_PartyCommand_makeCommandList =
    Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
    Yanfly.Row.Window_PartyCommand_makeCommandList.call(this);
    this.addRowCommand();
};

Window_PartyCommand.prototype.addRowCommand = function() {
    if (!$gameSystem.isShowRowBattle()) return;
    var index = this.findSymbol('escape');
    var enabled = $gameSystem.isEnabledRowBattle();
    this.addCommandAt(index, Yanfly.Param.RowCmdName, 'row', enabled);
};

//=============================================================================
// Sprite_Actor
//=============================================================================

Yanfly.Row.Sprite_Actor_moveToStartPosition =
    Sprite_Actor.prototype.moveToStartPosition;
Sprite_Actor.prototype.moveToStartPosition = function() {
    if (BattleManager._bypassMoveToStartLocation) return;
    Yanfly.Row.Sprite_Actor_moveToStartPosition.call(this);
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Yanfly.Row.Spriteset_Battle_createBackground =
    Spriteset_Battle.prototype.createBackground;
Spriteset_Battle.prototype.createBackground = function() {
    Yanfly.Row.Spriteset_Battle_createBackground.call(this);
    if (Yanfly.Row.SavedBackgroundBitmap) {
      var spr = this._backgroundSprite;
      spr.bitmap = Yanfly.Row.SavedBackgroundBitmap;
      Yanfly.Row.SavedBackgroundBitmap = undefined;
    }
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.Row.Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    Yanfly.Row.Scene_Map_create.call(this);
    $gameParty.loadActorImages();
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Row.Scene_Battle_createDisplayObjects =
    Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    Yanfly.Row.Scene_Battle_createDisplayObjects.call(this);
    $gameParty.loadActorImages();
};

Yanfly.Row.Scene_Battle_createPartyCommandWindow =
    Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    Yanfly.Row.Scene_Battle_createPartyCommandWindow.call(this);
    var win = this._partyCommandWindow;
    win.setHandler('row', this.partyCommandRow.bind(this));
};

Yanfly.Row.Scene_Battle_createSpriteset =
    Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
  if ($gameTemp.hasStoredBattleSpriteset()) {
    $gameTemp.restoreBattleSpriteset();
  } else {
    Yanfly.Row.Scene_Battle_createSpriteset.call(this);
  }
};

Scene_Battle.prototype.partyCommandRow = function() {
    BattleManager._bypassMoveToStartLocation = true;
    $gameParty.loadActorImages();
    this.prepareBackground();
    BattleManager._savedActor = BattleManager.actor();
    $gameSystem.setBattleRowCooldown();
    Yanfly.Row.SavedBattleBgm = AudioManager.saveBgm();
    Yanfly.Row.SavedBattleBgs = AudioManager.saveBgs();
    $gameTemp.storeBattleSpriteset();
    SceneManager.push(Scene_Row);
    BattleManager._phase = 'input';
    $gameTemp._rowBattle = true;
};

Scene_Battle.prototype.prepareBackground = function() {
    Yanfly.Row.SavedBackgroundBitmap = SceneManager._backgroundBitmap;
    this._prevWindowLayer = this._windowLayer.y;
    this._windowLayer.y = Graphics.boxHeight * 495;
    SceneManager.snapForBackground();
    this._windowLayer.y = this._prevWindowLayer;
};

}; // Imported.YEP_BattleEngineCore

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.onlyUnique = function(value, index, self) {
    return self.indexOf(value) === index;
};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================