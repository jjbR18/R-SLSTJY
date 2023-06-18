//=============================================================================
  /*:
 * @plugindesc v1.04 MinNiMap小地图
 * @author 流逝的岁月
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 *
 * 这个一个小地图插件，它支持你能够通过小地图观察地形变化
 还支持你可以通过标记进行寻路
 
 以下是参数色块的介绍
 
  玩家色块 : 玩家在地图上的位置
  敌人色块 : 事件进行战斗的NPC，这不包括随机遇敌
  箱子色块 : 地图中开启宝箱的事件
  传送点色块 : 地图边缘，或者进入房间跳转的事件
  通行陆地 : 可以在地图上正常行走，没有任何阻碍，比如草地，沙地，雪地的地图块
  阻挡色块 : 阻挡玩家正常通行的,比如山块,墙壁
  海洋色块 : 阻挡玩家正常通行的,但是是海洋
  虚空色块 : 在地图中没有放置的地图块，如果没有在地图背景添加远景图，会是黑色部分
  边缘色块 : 地图的范围之外,没有图块的区域,在小地图中的显示颜色
  梯子色块 : 限制通行方向的图块
  草木茂盛 : 在地图中行走会是你下半部分透明化
  伤害色块 : 比如毒沼泽
  
  在地图上的显示的优先级
  玩家 > 伤害色块 > 草木茂盛 > 通行陆地
  
  
注意：所有的图片路径都要放在Pictures文件夹中  
注意：图片的尺寸需要自己掌握,不会自行调节尺寸

比如使用地图的规格是13*13,每个瓦片的尺寸是10
那么就会生成一个130*130尺寸的小地图
  
警告：指向目的地的图片，箭头方向必须是指向右方，不然在游戏中会导致指向方错位
警告：地图在识别不满足四方向通行的方块时,会判定为不可通行方块

介绍：
 小地图插件是一款很实用的插件，它满足你在游戏中的许多需求
 比如创建一个难度并不大的迷宫
 比如直观的发现地图中的宝箱
 
---------------------------------------------------------

 使用条例：本插件完全免费，随意魔改
 
---------------------------------------------------------
 
 以下是一些操作的便签:
 
 ----------敌人->注释------------------------- 
 
 如何区分各种事件？
 这需要手动的在事件页d1注释中添加标签(注意！不是备注！不是备注！不是备注！重要的事情说三遍！)
 
 <ZzyMini Chest>     //代表这是一个箱子，会在地图上显示图片,如果没有填写参数名称，那么会显示指定的图块颜色
 <ZzyMini Enemy>     //代表这是一个敌人，会在地图上显示图片,如果没有填写参数名称，那么会显示指定的图块颜色
 <ZzyMini Tp>        //代表这是一个传送口，会在地图上显示图片,如果没有填写参数名称，那么会显示指定的图块颜色
 
 <ZzyCustomMini filename>        //filename是一个可以替换的内容,将filename替换成Pictures文件夹中的制定好的图片,不包含.png
                                         那么该事件会在小地图中显示图片
 <ZzyCustomMiniOp x>			//x替换为1~255之间的数值，代表自定义图片的透明度										 
										 
										 
 例子：
 <ZzyCustomMini hotel>      // 地图上会显示旅馆的图标
 <ZzyCustomMiniOp 150>		// hotel这张图片的透明度会变成150
 
-----------------------------------------------


----------地图->备注----------------------------


 小地图默认是会在每个地图都显示的
 那么如果想让指定的地图不会显示小地图
 或者有时只是想要禁用打开全图的功能
 

 <ZzyNo MiniMap>     //在地图备注添加这条注释之后，进入这张地图将会禁用小地图的功能，但这不能防止强制打开地图的命令
 <ZzyNo FullMap>     //在地图备注添加这条注释之后,进入地图无法打开小地图的全图功能，但这不能防止强制打开命令

 
-----------------------------------------------
  
  
  
  插件命令
----------Command Plugin----------------
  
  ZzyMiniWidowPos x(1~5)
  - 这回设置小地图的位置，可以填入编号1~5之间确认位置
  - 1左上方  2右上方  3左下方  4右下方  5中心
  - 例子：ZzyMiniWidowPos 2
  
  ZzyDisableMiniMap
  - 这将会强制关闭小地图功能，使其无法显示
  
  ZzyEnableMiniMap
  - 这将会打开小地图功能,让所有功能都可以正常的进行
  
  ZzyOpenMiniMap
  - 这将自动打开小地图显示，通常可以用于限制打开小地图的设计。
  注意：如果ZzyDisableMiniMap命令进行限制，此效果将无法执行
  
  ZzyOpenFullMap
  - 这将自动打开大地图显示，可以进行导航命令的设置
  注意：如果ZzyDisableMiniMap命令进行限制，此效果将无法执行
  
  ZzyMMFRectSize x
  - 该命令会修改小地图上每一个图块的尺寸
  
  ZzyMMFMiniList x
  - 该命令会修改小地图上显示图块数量列数
 
  ZzyMMFMiniLine x
  - 该命令会修改小地图上显示图块数量行数
  
-----------------------------------------------  
  日志:
  
  我叫坂本：1.04v 优化消耗情况
  我叫坂本：1.03v 添加终点公共事件调用,优化图片显示位置
  我叫坂本：1.02v 添加了小地图背景图片,添加了寻路功能
  我叫坂本：1.01v 优化了事件刷新,添加窗口位置控制的参数
  我叫坂本：1.00v 完成插件

 
 
 * @param ---Zzy Set---
 * @default
 *  
 * @param MiniWindowPos
 * @text 小地图在屏幕的位置
 * @parent ---Zzy Set---
 * @type combo
 * @option left-top
 * @option right-top
 * @option left-bottom
 * @option right-bottom
 * @option center
 * @desc 小地图窗口所在的位置，默认在left-top左上方
 * @default left-top
 

 * @param RectSize
 * @text 每一块的大小
 * @parent ---Zzy Set---
 * @type number
 * @desc 这会决定绘制小地图地图中一个方块的大小 默认10
   注意：如果使用了图片路径，图片大小不会随着这个参数改变
 * @default 10
 
 * @param MiniList
 * @text 小地图的列数
 * @parent ---Zzy Set---
 * @type number
 * @desc 小地图在屏幕上能显示的范围 默认值13
         请以奇数值设置,输入偶数会在处理时值+1
 * @default 13
 
 * @param MiniLine
 * @text 小地图的行数
 * @parent ---Zzy Set---
 * @type number
 * @desc 小地图在屏幕上能显示的范围 默认值13
         请以奇数值设置,输入偶数会在处理时值+1
 * @default 13
 
 * @param InputKey
 * @text 小地图按键
 * @parent ---Zzy Set---
 * @desc 弹出小地图,大地图的快捷键,默认值M
 * @default M
 * 
 
 
  * @param MiniBack
 * @text 小地图的背景图片
 * @parent ---Zzy Set---
 * @desc 显示小地图底层的图片，不添加路径则不会显示
 * @default 
 * 
 * @param MiniBackOp
 * @text 小地图的背景透明度
 * @parent ---Zzy Set---
 * @type number
 * @min 1
 * @max 255
 * @desc 显示小地图背景的透明度
 * @default 255

 * @param ---Zzy Event---
 * @default
 * 

 * @param PlayerColor
 * @text 玩家色块填充
 * @parent ---Zzy Event---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值255,50,50,188
 * @default 255,50,50,188
 * 
 
  
 * @param EnmeyColor
 * @text 敌人色块填充
 * @parent ---Zzy Event---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值0,100,255,188
 * @default 0,100,255,188
 * 
 
 
 * @param ChestColor
 * @text 箱子色块填充
 * @parent ---Zzy Event---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值255,200,100,188
 * @default 255,200,100,188
 * 
 
 * @param TPColor
 * @text 传送点色块填充
 * @parent ---Zzy Event---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值150,255,100,188
 * @default 150,255,100,188
 * 
 
 * @param ---Zzy Slice---
 * @default
 *  
 
 
 * @param LandColor
 * @text 通行陆地色块填充
 * @parent ---Zzy Slice---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值100,200,100,150
 * @default 100,200,100,150
 *  
 
 * @param WallColor
 * @text 阻挡色块填充
 * @parent ---Zzy Slice---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值180,150,40,150
 * @default 180,150,40,150
 *  
 
 * @param SeaColor
 * @text 海洋色块填充
 * @parent ---Zzy Slice---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值50,150,255,150
 * @default 50,150,255,150
 *  
 
 * @param NullColor
 * @text 虚空色块填充
 * @parent ---Zzy Slice---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值50,70,255,200
 * @default 50,70,0,200
 *  
 
 * @param LimitColor
 * @text 边缘色块填充
 * @parent ---Zzy Slice---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值128,128,128,200
 * @default 128,128,128,200
 *  
 
 * @param LadderColor
 * @text 梯子色块填充
 * @parent ---Zzy Slice---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值150,150,50,180
 * @default 150,150,50,180
 *  
 
 * @param BushColor
 * @text 草木茂盛色块填充
 * @parent ---Zzy Slice---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值50,130,50,180
 * @default 50,130,50,180
 *  

 * @param DamageColor
 * @text 伤害地板色块填充
 * @parent ---Zzy Slice---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值120,50,180,180
 * @default 120,50,180,180
 *  
 
 * @param ---Zzy Pic---
 * @default

 
 * @param PlayerPic
 * @text 玩家图片名称
 * @parent ---Zzy Pic---
 * @desc 玩家的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 
 
 * @param PlayerPicOp
 * @text 玩家图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 
 * @param EnemyPic
 * @text 敌人图片名称
 * @parent ---Zzy Pic---
 * @desc 敌人的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 

 * @param EnemyPicOp
 * @text 敌人图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 

 * @param ChestPic
 * @text 宝箱图片名称
 * @parent ---Zzy Pic---
 * @desc 宝箱的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 
 
 * @param ChestPicOp
 * @text 宝箱图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 
 
 * @param TpPic
 * @text 传送点图片名称
 * @parent ---Zzy Pic---
 * @desc 传送点的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 
 
 * @param TpPicOp
 * @text 传送点图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 
 
 * @param LandPic
 * @text 通行陆地图片名称
 * @parent ---Zzy Pic---
 * @desc 通行陆地的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 
 * @param LandPicOp
 * @text 通行陆地图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 * @param WallPic
 * @text 阻挡图片名称
 * @parent ---Zzy Pic---
 * @desc 阻挡的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 
 * @param WallPicOp
 * @text 阻挡图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 * @param SeaPic
 * @text 海洋图片名称
 * @parent ---Zzy Pic---
 * @desc 海洋的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 
 * @param SeaPicOp
 * @text 海洋图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 
 * @param NullPic
 * @text 虚空图片名称
 * @parent ---Zzy Pic---
 * @desc 虚空的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 
 * 
 * @param NullPicOp
 * @text 虚空图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 * @param LimitPic
 * @text 边缘图片名称
 * @parent ---Zzy Pic---
 * @desc 边缘的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 *  
 * @param LimitPicOp
 * @text 虚空图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 * @param LadderPic
 * @text 梯子图片名称
 * @parent ---Zzy Pic---
 * @desc 梯子的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 
 * @param LadderPicOp
 * @text 梯子图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 * @param BushPic
 * @text 草木茂盛图片名称
 * @parent ---Zzy Pic---
 * @desc 草木茂盛的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 
 * @param BushPicOp
 * @text 草木茂盛图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 * @param DamagePic
 * @text 伤害图片名称
 * @parent ---Zzy Pic---
 * @desc 伤害的图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 * 
 * @param DamagePicOp
 * @text 伤害图片透明度
 * @parent ---Zzy Pic---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 
 * @param ---Zzy Other---
 * @default
 
 
 * @param ProcessDis
 * @text 指向目的地箭头的间隔
 * @parent ---Zzy Other---
 * @type number
 * @desc 每隔多少个指路方块会显示一个指向图片
 * @default 3
 
 
 * @param ProcessColor
 * @text 箭头色块填充
 * @parent ---Zzy Other---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值0,0,255,188
 * @default 0,255,0,188
 *  
 * @param ProcessPic
 * @text 指向目的地箭头图片名称
 * @parent ---Zzy Other---
 * @desc 目的地图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default 
 *
 * @param ProcessPicOp
 * @text 指向目的地箭头图片透明度
 * @parent ---Zzy Other---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 * @param TargetColor
 * @text 目的地色块填充
 * @parent ---Zzy Other---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值0,0,255,188
 * @default 255,0,0,188
 *  
 * @param TargetPic
 * @text 目的地图片名称
 * @parent ---Zzy Other---
 * @desc 目的地图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default
 * 
 * @param TargetPicOp
 * @text 目的地图片透明度
 * @parent ---Zzy Other---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 * 
 * @param NotTargetColor
 * @text 无法到达色块填充
 * @parent ---Zzy Other---
 * @desc 在没有图片时玩家在地图上显示的色块颜色
      使用格式R,G,B,A      默认值0,0,255,188
 * @default 255,0,0,188
 *  
 * @param NotTargetPic
 * @text 无法到达图片名称
 * @parent ---Zzy Other---
 * @desc 目的地图标存放在Pictures文件夹，填写文件名，不包括.png
      如果没有填写，则会使用默认的色块填充
 * @default
 * 
 * @param NotTargetPicOp
 * @text 无法到达图片透明度
 * @parent ---Zzy Other---
 * @type number
 * @desc 图片显示的透明度,范围1~255,默认255
 * @min 1
 * @max 255
 * @default 255
 *
 * @param TheTargetCommon
 * @text 公共事件ID
 * @parent ---Zzy Other---
 * @type number
 * @desc 当到达导航位置时,会调用的公共事件ID
 *		填0则不会调用任何公共事件
 * @default 0
 * 
 * @param ---Zzy Ender---
 */
 
 
//此处开始
 
var LiuYue = LiuYue || {};
LiuYue.LiuYue_MiniMap = true;//插件启动 
 
var Zzy = Zzy || {};
Zzy.MMF = Zzy.MMF || {};
Zzy.MMF.version = 1.04;
 
Zzy.Parameters = PluginManager.parameters('LiuYue_MiniMap');
Zzy.Param = Zzy.Param || {};

//参数初始化

Zzy.Param.MMFMiniWidowPos = String(Zzy.Parameters['MiniWindowPos']);

Zzy.Param.MMFRectSize = Number(Zzy.Parameters['RectSize']);
Zzy.Param.MMFMiniList = Number(Zzy.Parameters['MiniList']);
Zzy.Param.MMFMiniLine = Number(Zzy.Parameters['MiniLine']);
Zzy.Param.MMFProcessDis = Number(Zzy.Parameters['ProcessDis']);
Zzy.Param.MMFMiniBack = String(Zzy.Parameters['MiniBack']);
Zzy.Param.MMFInputKey = String(Zzy.Parameters['InputKey']);

Zzy.Param.MMFMiniBackOp = Number(Zzy.Parameters['MiniBackOp']);
Zzy.Param.MMFTargetCommonID = Number(Zzy.Parameters['TheTargetCommon']);

Zzy.Param.MMFPlayerColor = String(Zzy.Parameters['PlayerColor']);
Zzy.Param.MMFEnmeyColor = String(Zzy.Parameters['EnmeyColor']);
Zzy.Param.MMFChestColor = String(Zzy.Parameters['ChestColor']);
Zzy.Param.MMFTPColor = String(Zzy.Parameters['TPColor']); 
Zzy.Param.MMFLandColor = String(Zzy.Parameters['LandColor']);   
Zzy.Param.MMFWallColor = String(Zzy.Parameters['WallColor']);   
Zzy.Param.MMFSeaColor = String(Zzy.Parameters['SeaColor']);    
Zzy.Param.MMFNullColor = String(Zzy.Parameters['NullColor']);
Zzy.Param.MMFLimitColor = String(Zzy.Parameters['LimitColor']); 
Zzy.Param.MMFLadderColor = String(Zzy.Parameters['LadderColor']);
Zzy.Param.MMFBushColor = String(Zzy.Parameters['BushColor']);
Zzy.Param.MMFDamageColor = String(Zzy.Parameters['DamageColor']);
Zzy.Param.MMFProcessColor = String(Zzy.Parameters['ProcessColor']);
Zzy.Param.MMFTargetColor = String(Zzy.Parameters['TargetColor']);
Zzy.Param.MMFNotTargetColor = String(Zzy.Parameters['NotTargetColor']);

Zzy.Param.MMFPlayerPic = String(Zzy.Parameters['PlayerPic']);
Zzy.Param.MMFEnemyPic = String(Zzy.Parameters['EnemyPic']);
Zzy.Param.MMFChestPic = String(Zzy.Parameters['ChestPic']);
Zzy.Param.MMFTpPic = String(Zzy.Parameters['TpPic']);
Zzy.Param.MMFLandPic = String(Zzy.Parameters['LandPic']);
Zzy.Param.MMFWallPic = String(Zzy.Parameters['WallPic']);
Zzy.Param.MMFSeaPic = String(Zzy.Parameters['SeaPic']);
Zzy.Param.MMFNullPic = String(Zzy.Parameters['NullPic']);
Zzy.Param.MMFLimitPic = String(Zzy.Parameters['LimitPic']);
Zzy.Param.MMFLadderPic = String(Zzy.Parameters['LadderPic']);
Zzy.Param.MMFBushPic = String(Zzy.Parameters['BushPic']);
Zzy.Param.MMFDamagePic = String(Zzy.Parameters['DamagePic']);
Zzy.Param.MMFProcessPic = String(Zzy.Parameters['ProcessPic']);
Zzy.Param.MMFTargetPic = String(Zzy.Parameters['TargetPic']);
Zzy.Param.MMFNotTargetPic = String(Zzy.Parameters['NotTargetPic'])

Zzy.Param.MMFPlayerPicOp = Number(Zzy.Parameters['PlayerPicOp']);
Zzy.Param.MMFEnemyPicOp = Number(Zzy.Parameters['EnemyPicOp']);
Zzy.Param.MMFChestPicOp = Number(Zzy.Parameters['ChestPicOp']);
Zzy.Param.MMFTpPicOp = Number(Zzy.Parameters['TpPicOp']);
Zzy.Param.MMFLandPicOp = Number(Zzy.Parameters['LandPicOp']);
Zzy.Param.MMFWallPicOp = Number(Zzy.Parameters['WallPicOp']);
Zzy.Param.MMFSeaPicOp = Number(Zzy.Parameters['SeaPicOp']);
Zzy.Param.MMFNullPicOp = Number(Zzy.Parameters['NullPicOp']);
Zzy.Param.MMFLimitPicOp = Number(Zzy.Parameters['LimitPicOp']);
Zzy.Param.MMFLadderPicOp = Number(Zzy.Parameters['LadderPicOp']);
Zzy.Param.MMFBushPicOp = Number(Zzy.Parameters['BushPicOp']);
Zzy.Param.MMFDamagePicOp = Number(Zzy.Parameters['DamagePicOp']);
Zzy.Param.MMFProcessPicOp = Number(Zzy.Parameters['ProcessPicOp']);
Zzy.Param.MMFTargetPicOp = Number(Zzy.Parameters['TargetPicOp']);
Zzy.Param.MMFNotTargetPicOp = Number(Zzy.Parameters['NotTargetPicOp'])
 
Zzy.Param.MMFMapTileData = [];//加载地图数据
Zzy.Param.MMFMapLoadSign = [];//加载标记，判断地图是否有加载过，如果加载过代表不需要进行二次加载

Zzy.Param.MMFMapEventData = [];


//地图块ID
  // 通行陆地 : 1
  // 阻挡色块 : 2
  // 海洋色块 : 3
  // 虚空色块 : 4
  // 边缘色块 : 5
  // 梯子色块 : 6
  // 草木茂盛 : 7
  // 伤害色块 : 8

 
//事件ID
  // 敌人色块 : 1
  // 箱子色块 : 2
  // 传送点色块 : 3
  // 自定义图片 : 4


//玩家
//导航
  //指引方向ID  右 1
  //            下 2
  //            左 3
  //            上 4
 
 
 
//游戏临时数据
 
Zzy.MMF.tempBitmapArr = [];//缓存 
 
 
//=======================================================
//Game_System
//=======================================================

Zzy.MMF.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() 
{
    Zzy.MMF.Game_System_initialize.call(this);
	
	this.ZzyMMFInitColor();//初始化颜色
	this.ZzyMMFInitPic();//初始化路径
	this.ZzyMMFInitOpa();//透明度
	this.ZzyMMFInitOther();//初始化其他
   
};

Game_System.prototype.ZzyMMFInitOpa = function()
{
	this.ZzyMMFMapPicOpArr = [];
	this.ZzyMMFEventPicOpArr = [];	
	
	this.ZzyMMFEventPicOpArr[1] = Zzy.Param.MMFEnemyPicOp;
	this.ZzyMMFEventPicOpArr[2] = Zzy.Param.MMFChestPicOp;
	this.ZzyMMFEventPicOpArr[3] = Zzy.Param.MMFTpPicOp;
	
	this.ZzyMMFMapPicOpArr[1] = Zzy.Param.MMFLandPicOp;
	this.ZzyMMFMapPicOpArr[2] = Zzy.Param.MMFWallPicOp;
	this.ZzyMMFMapPicOpArr[3] = Zzy.Param.MMFSeaPicOp;
	this.ZzyMMFMapPicOpArr[4] = Zzy.Param.MMFNullPicOp;
	this.ZzyMMFMapPicOpArr[5] = Zzy.Param.MMFLimitPicOp;
	this.ZzyMMFMapPicOpArr[6] = Zzy.Param.MMFLadderPicOp;
	this.ZzyMMFMapPicOpArr[7] = Zzy.Param.MMFBushPicOp;
	this.ZzyMMFMapPicOpArr[8] = Zzy.Param.MMFDamagePicOp;
	
	this.ZzyMMFPlayerPicOp = Zzy.Param.MMFPlayerPicOp;
	this.ZzyMMFProcessPicOp = Zzy.Param.MMFProcessPicOp;
	this.ZzyMMFTargetPicOp = Zzy.Param.MMFTargetPicOp;
	this.ZzyMMFNotTargetPicOp = Zzy.Param.MMFNotTargetPicOp;
}

Game_System.prototype.ZzyMMFInitColor = function()
{
	//初始化颜色
	this.ZzyMMFMapColorArr = [];
	this.ZzyMMFEventColorArr = [];
	
	this.ZzyMMFMapColorArr[1] = Zzy.Param.MMFLandColor;
	this.ZzyMMFMapColorArr[2] = Zzy.Param.MMFWallColor;
	this.ZzyMMFMapColorArr[3] = Zzy.Param.MMFSeaColor;
	this.ZzyMMFMapColorArr[4] = Zzy.Param.MMFNullColor;
	this.ZzyMMFMapColorArr[5] = Zzy.Param.MMFLimitColor;
	this.ZzyMMFMapColorArr[6] = Zzy.Param.MMFLadderColor;
	this.ZzyMMFMapColorArr[7] = Zzy.Param.MMFBushColor;
	this.ZzyMMFMapColorArr[8] = Zzy.Param.MMFDamageColor;
	

	for(var i=1;i<=8;i++)
	{
		this.ZzyMMFMapColorArr[i] = this.ZzyMMFMapColorArr[i].split(',');//切割成数组
	}
	
	
	this.ZzyMMFEventColorArr[1] = Zzy.Param.MMFEnmeyColor;
	this.ZzyMMFEventColorArr[2] = Zzy.Param.MMFChestColor;
	this.ZzyMMFEventColorArr[3] = Zzy.Param.MMFTPColor;

	for(var i=1;i<=3;i++)
	{
		
		this.ZzyMMFEventColorArr[i] = this.ZzyMMFEventColorArr[i].split(',');//切割成数组
	}

	
	this.ZzyMMFPlayerColor = Zzy.Param.MMFPlayerColor;
	this.ZzyMMFProcessColor = Zzy.Param.MMFProcessColor;
	this.ZzyMMFTargetColor = Zzy.Param.MMFTargetColor;
	this.ZzyMMFNotTargetColor = Zzy.Param.MMFNotTargetColor;	
	
	
	this.ZzyMMFPlayerColor = this.ZzyMMFPlayerColor.split(',');//切割成数组
	this.ZzyMMFProcessColor = this.ZzyMMFProcessColor.split(',');//切割成数组
	this.ZzyMMFTargetColor = this.ZzyMMFTargetColor.split(',');//切割成数组
	this.ZzyMMFNotTargetColor = this.ZzyMMFNotTargetColor.split(',');//切割成数组
	
}

Game_System.prototype.ZzyMMFInitPic = function()
{
	//初始化路径
	this.ZzyMMFMapPicArr = [];
	this.ZzyMMFEventPicArr = [];	
	
	this.ZzyMMFMapPicArr[1] = Zzy.Param.MMFLandPic;
	this.ZzyMMFMapPicArr[2] = Zzy.Param.MMFWallPic;
	this.ZzyMMFMapPicArr[3] = Zzy.Param.MMFSeaPic;
	this.ZzyMMFMapPicArr[4] = Zzy.Param.MMFNullPic;
	this.ZzyMMFMapPicArr[5] = Zzy.Param.MMFLimitPic;
	this.ZzyMMFMapPicArr[6] = Zzy.Param.MMFLadderPic;
	this.ZzyMMFMapPicArr[7] = Zzy.Param.MMFBushPic;
	this.ZzyMMFMapPicArr[8] = Zzy.Param.MMFDamagePic;	
	
	this.ZzyMMFEventPicArr[1] = Zzy.Param.MMFEnemyPic;
	this.ZzyMMFEventPicArr[2] = Zzy.Param.MMFChestPic;
	this.ZzyMMFEventPicArr[3] = Zzy.Param.MMFTpPic;
	
	this.ZzyMMFPlayerPic = Zzy.Param.MMFPlayerPic;
	this.ZzyMMFProcessPic = Zzy.Param.MMFProcessPic;
	this.ZzyMMFTargetPic = Zzy.Param.MMFTargetPic;
	this.ZzyMMFNotTargetPic = Zzy.Param.MMFNotTargetPic;
	
	
}

Game_System.prototype.ZzyMMFInitOther = function()
{
	//初始化其他参数
	
	this.ZzyMMFMiniWidowPos = Zzy.Param.MMFMiniWidowPos;//小地图位置
	this.ZzyMMFRectSize = Zzy.Param.MMFRectSize;		//瓦片大小
	this.ZzyMMFMiniList = Zzy.Param.MMFMiniList;		//宽数量
	this.ZzyMMFMiniLine = Zzy.Param.MMFMiniLine;		//高数量
	this.ZzyMMFProcessDis = Zzy.Param.MMFProcessDis;	//导航路线间隔
	this.ZzyMMFIsEnableMinMap = true;					//是否开启	
	this.ZzyMMFMiniBack = Zzy.Param.MMFMiniBack;		//小地图mini背景
	this.ZzyMMFMiniBackOp = Zzy.Param.MMFMiniBackOp;	//透明度
	
	this.ZzyMMFMapInfoArr = [];//地图信息
	//地图信息包括参数:
	//type :  Any,NoFull,NoMini
	//Any:可以使用所有功能
	//NoFull:失去全地图打开功能
	//NoMini:失去mini地图打开功能
}

//================================================================
//Game_Interpreter
//================================================================

 
Zzy.MMF.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args)
{
	Zzy.MMF.Game_Interpreter_pluginCommand.call(this,command,args);
	
	if(command === 'ZzyDisableMiniMap')//关闭功能
	{
		$gameSystem.ZzyMMFIsEnableMinMap = false;//强制禁用地图功能
		Zzy.MMF.ZzyOpenMiniMapFun(false);
	}
	else if(command === 'ZzyEnableMiniMap')//开启功能
	{
		$gameSystem.ZzyMMFIsEnableMinMap = true;
		Zzy.MMF.ZzyOpenMiniMapFun(true);
	}
	else if(command === 'ZzyOpenMiniMap')//打开小地图
	{
		if($gameSystem.ZzyMMFIsEnableMinMap)
		{Zzy.MMF.ZzyOpenMiniMapFun(true);}
	}
	else if(command === 'ZzyOpenFullMap')//打开全屏地图
	{
		if($gameSystem.ZzyMMFIsEnableMinMap)
		{Zzy.MMF.ZzyOpenFullMapFun();}
	}
	else if(command === 'ZzyMMFRectSize')//设置瓦片大小
	{
		var value = Number(args[0]);
		$gameSystem.ZzyMMFRectSize = value;
	}
	else if(command === 'ZzyMMFMiniList')//设置瓦片宽数量
	{
		var value = Number(args[0]);
		$gameSystem.ZzyMMFMiniList = value;
	}
	else if(command === 'ZzyMMFMiniLine')//设置瓦片高数量
	{
		var value = Number(args[0]);
		$gameSystem.ZzyMMFMiniLine = value;
	}	
	else if(command === 'ZzyMiniWidowPos')
	{
		var Index = Number(args[0]);
		
		switch(Index)
		{
			case 1:$gameSystem.ZzyMMFMiniWidowPos = 'left-top';break;
			case 2:$gameSystem.ZzyMMFMiniWidowPos = 'right-top';break;
			case 3:$gameSystem.ZzyMMFMiniWidowPos = 'left-bottom';break;
			case 4:$gameSystem.ZzyMMFMiniWidowPos = 'right-bottom';break;
			case 5:$gameSystem.ZzyMMFMiniWidowPos = 'center';break;
			default:
		}
	}
	
	
	
}
 
 //================================================================
//DataManager
//================================================================
 
DataManager.getZzyMMFType = function(mapId) 
{
	if (!$dataMap) return '';
	
	var notedata = $dataMap.note.split(/[\r\n]+/);
	var len = notedata.length;
  for (var i = 0; i < len; i++) 
  {
    var line = notedata[i];//获取每一行内容
	
    if (line.match(/<ZZYNO[ ]MINIMAP>/i))//禁用显示小地图功能
	{   
	   return 'NoMini';
    }
	else if(line.match(/<ZZYNO[ ]FULLMAP>/i)) //禁用显示大地图功能
	{	
	    return 'NoFull';
	}

  }
	return 'Any';
}
 

//================================================================
//Game_Map
//================================================================

Zzy.MMF.Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() 
{
    Zzy.MMF.Scene_Map_create.call(this);

};

Zzy.MMF.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() 
{
	Zzy.MMF.Scene_Map_start.call(this);

	this.createZzyMMFWindow();//创造窗口
};

Zzy.MMF.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update =  function() 
{
	Zzy.MMF.Scene_Map_update.call(this);
	if($gameSystem.ZzyMMFIsEnableMinMap === true)
	{
		if(Input.isTriggered(Zzy.Param.MMFInputKey))
		{
			//判断处于的情况
			this.ZzyMMFChangeMapMode();//切换地图模式
		}
	}
}

Scene_Map.prototype.ZzyMMFChangeMapMode = function()
{
	var mapId = $gameMap.mapId();
	var type = $gameSystem.ZzyMMFMapInfoArr[mapId].type;
	
	if(type == 'NoFull')//禁用大地图模式
	{
		this._ZzyMMFMiniWindow.visible = !this._ZzyMMFMiniWindow.visible;
	}
	else if(type == 'NoMini')//禁用小地图模式
	{

	}
	else if(type == 'Any')//没有禁用选项
	{	
		//注意地图的顺序呈现乒乓式
		if(Zzy.MMF.tempKeyAnyLoop == 0)
		{
			if(this._ZzyMMFMiniWindow.visible === true)
			{
				Zzy.MMF.ZzyOpenFullMapFun();//打开大地图
				Zzy.MMF.tempKeyAnyLoop = 1;	
			}
			else
			{
				this._ZzyMMFMiniWindow.visible = true;
			}
		}
		else
		{
			if(this._ZzyMMFMiniWindow.visible === true)
			{
				this._ZzyMMFMiniWindow.visible = false;
				Zzy.MMF.tempKeyAnyLoop = 0;
			}
			else
			{
				this._ZzyMMFMiniWindow.visible = true;
			}	
		}
	}
	
}


Scene_Map.prototype.createZzyMMFWindow = function()
{

	this._ZzyMMFMiniWindow = new Window_ZzyMMFMini();//获得窗口
	Zzy.MMF.tempMiniWindow = this._ZzyMMFMiniWindow;//记录用于插件命令调用

	this.addChild(this._ZzyMMFMiniWindow);//添加窗口
	this._ZzyMMFMiniWindow.opacity = 0;
	//判断小地图是否显示
	var mapId = $gameMap.mapId();
	if($gameSystem.ZzyMMFMapInfoArr[mapId].type == 'NoMini')
	{
		this._ZzyMMFMiniWindow.visible = false;//关闭
	}
}

Zzy.MMF.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() //地图加载时
{
    Zzy.MMF.Scene_Map_onMapLoaded.call(this);
	
	//获取地图类型
	var mapId = $gameMap.mapId();
	$gameSystem.ZzyMMFMapInfoArr[mapId] = {};
	$gameSystem.ZzyMMFMapInfoArr[mapId].type = DataManager.getZzyMMFType(mapId);


	this.ZzyMMFLoadTile(mapId);//载入地图瓦片内容
	this.ZzyMMFLoadEvent(mapId);//载入事件标记内容

}

Scene_Map.prototype.ZzyMMFLoadEvent = function(mapId)//读取事件
{
	//因为事件不像地图一样一层不变，而是会跟随移动变化的,所以要刷新检测
	//读取事件并存储_ZzyMMFType不为0的事件ID
	Zzy.Param.MMFMapEventData = [];//初始化

	var tempEvents = $gameMap.events();
	var tempLen = tempEvents.length;
	
	var tempIndex = 0;//计数下标
	for(var i=0;i<tempLen;i++)
	{
		var ev = tempEvents[i];
		var TypeId = ev._ZzyMMFType;//获取类型
		
		//对内容进行赋值
		if(TypeId > 0)
		{
			Zzy.Param.MMFMapEventData[tempIndex] = {};
			Zzy.Param.MMFMapEventData[tempIndex].typeId = TypeId;
			Zzy.Param.MMFMapEventData[tempIndex].evId = ev.eventId();
			
			if(TypeId == 4)
			{
				Zzy.Param.MMFMapEventData[tempIndex].picName = ev._ZzyMMFCustomPic;
				Zzy.Param.MMFMapEventData[tempIndex].picOpacity = ev._ZzyMMFCustomPicOp;
			}
			else
			{
				Zzy.Param.MMFMapEventData[tempIndex].picName = '';
			}
			
			tempIndex++;
		}
	}
}


Scene_Map.prototype.ZzyMMFLoadTile = function(mapId) //载入数据内容
{
	if(Zzy.Param.MMFMapLoadSign[mapId] === true)return;//代表此ID加载过
	
	
	var tempH = $dataMap.height;
	var tempW = $dataMap.width;
	
	Zzy.Param.MMFMapTileData[mapId] = [];
	
	for(var i=0;i<tempH;i++)
	{
		Zzy.Param.MMFMapTileData[mapId][i] = [];
		for(var j=0;j<tempW;j++)
		{
			
			//进行位置的判断和内容的获取
			//玩家 > 伤害色块 > 草木茂盛 > 通行陆地
			
			if($gameMap.isDamageFloor(j,i))//伤害地板
			{
				Zzy.Param.MMFMapTileData[mapId][i][j] = 8;//8代表伤害地板
			}
			else if($gameMap.isBush(j,i))
			{
				
				Zzy.Param.MMFMapTileData[mapId][i][j] = 7;//7代表草木茂盛瓦片
				
			}
			else if($gameMap.isLadder(j,i))
			{	
				Zzy.Param.MMFMapTileData[mapId][i][j] = 6;//6代表梯子
				
			}
			else if($gameMap.data()[i*tempW + j] === 0)
			{
				Zzy.Param.MMFMapTileData[mapId][i][j] = 4;//4代表虚空
			}
			else if($gameMap.isBoatPassable(j,i) || $gameMap.isShipPassable(j,i))//3代表水
			{
				Zzy.Param.MMFMapTileData[mapId][i][j] = 3;
			}
			else if($gameMap.checkPassage(j, i, 0x0f))//2代表阻挡
			{
				Zzy.Param.MMFMapTileData[mapId][i][j] = 1;//2代表石头
			}
			else if(!$gameMap.checkPassage(j, i, 0x0f))//1代表陆地
			{
				Zzy.Param.MMFMapTileData[mapId][i][j] = 2;
			}
			else//未知的方块类型
			{
				Zzy.Param.MMFMapTileData[mapId][i][j] = -1;
			}
		}
	}
	Zzy.Param.MMFMapLoadSign[mapId] = true;
}

Zzy.MMF.Scene_Map_terminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() 
{
    Zzy.MMF.Scene_Map_terminate.call(this);
	Zzy.MMF.tempMiniWindow = undefined;
};


//===============================================================
//Game_Event
//================================================================

Zzy.MMF.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() //加载事件
{
	
	Zzy.MMF.Game_Event_setupPage.call(this);
	

	this.ZzyMMFInitData();//调用初始化数据
}
 
Game_Event.prototype.ZzyMMFInitData = function()
{
	if (!this.page()) return;


	this._ZzyMMFType = 0;//在mini地图上显示的类型
	this._ZzyMMFCustomPic = '';

  
  var list = this.list();
  var len = list.length;

  for (var i = 0; i < len; ++i) 
  {
    var ev = list[i];
	
    if ([108, 408].contains(ev.code)) 
	{
		
      if (ev.parameters[0].match(/<ZZYMINI[ ]ENEMY>/i))
	  {
        this._ZzyMMFType = 1;
      } 
	  else if (ev.parameters[0].match(/<ZZYMINI[ ]CHEST>/i))
	  {
        this._ZzyMMFType = 2;
      } 
	  else if (ev.parameters[0].match(/<ZZYMINI[ ]TP>/i))
	  {
        this._ZzyMMFType = 3;
      }
	  else if(ev.parameters[0].match(/<ZZYCUSTOMMINI[ ](.*)>/i))
	  {
		  this._ZzyMMFType = 4;//类型
		  this._ZzyMMFCustomPic = String(RegExp.$1);//获取特定图片名城
	  }
	  else if(ev.parameters[0].match(/<ZZYCUSTOMMINIOP[ ](\d+)>/i))
	  {
		  this._ZzyMMFCustomPicOp = RegExp.$1;
	  }
    }
  }
}

//===============================================================
//Window_ZzyMMFMini
//================================================================

//临时数据，用来做大地图展开时，进行赋值
Zzy.MMF.tempTitlSpriteArr = [];
Zzy.MMF.tempEventSpriteArr = [];
Zzy.MMF.tempPlayerSprite;
Zzy.MMF.tempMapId = 0;
Zzy.MMF.tempFindRoute = undefined;
Zzy.MMF.tempProcessSpriteArr = [];
Zzy.MMF.tempIsFindTarget = false;
Zzy.MMF.tempMiniWindow = undefined;
Zzy.MMF.tempKeyAnyLoop = 0;//按键循环模式,用来做小地图变更顺序


function Window_ZzyMMFMini() 
{
    this.initialize.apply(this, arguments);
}
Window_ZzyMMFMini.prototype = Object.create(Window_Base.prototype);
Window_ZzyMMFMini.prototype.constructor = Window_ZzyMMFMini;

Window_ZzyMMFMini.prototype.initialize = function() 
{
    var width = this.Width();
    var height = this.Height();
	
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	
	//设置命令强制关闭命令是否开启
	this.visible = $gameSystem.ZzyMMFIsEnableMinMap;
	
	this.TitlSpriteArr = [];//地图精灵数组
	this.EventSpriteArr = [];//事件精灵组
	this.PlayerSprite = undefined;//玩家精灵图片
	this.MiniBackSprite = undefined;//地图背景
	this.TargetSprite = undefined;//目标
	
	this.windowPosX = 0;
	this.windowPosY = 0;
	
	
	this._playerX = 0;
	this._playerY = 0;
	this._isRefresh = true;//是否执行刷新地图命令
	
	
	//照相机的位置，这指定了绘制地图中所显示应有部分的内容,其他没有显示的部分会被隐藏
	//在正常的情况下，照相机会绑定玩家的位置
	
	this.cameraX = 0;
	this.cameraY = 0;
	
	this.ReNewSprite();//重新获取sprite图形数组的存储
	
	this.ReadWindowPos();//读取窗口位置
};



Window_ZzyMMFMini.prototype.ReadWindowPos = function()
{
	var typePos = $gameSystem.ZzyMMFMiniWidowPos;
	
	var rangeW = $gameSystem.ZzyMMFMiniList;
	var rangeH = $gameSystem.ZzyMMFMiniLine;
	var tempSize = $gameSystem.ZzyMMFRectSize;	
	var standardPad = this.standardPadding();//默认间距
	
	if(typePos === 'left-top')
	{
		this.windowPosX = 0;
		this.windowPosY = 0;
	}
	else if(typePos === 'right-top')
	{
		this.windowPosX = Graphics.boxWidth - rangeW * tempSize - standardPad*2;
		this.windowPosY = 0;
	}
	else if(typePos === 'left-bottom')
	{
		this.windowPosX = 0;
		this.windowPosY = Graphics.boxHeight - rangeH * tempSize - standardPad*2;
	}
	else if(typePos === 'right-bottom')
	{
		this.windowPosX = Graphics.boxWidth - rangeW * tempSize - standardPad*2;
		this.windowPosY = Graphics.boxHeight - rangeH * tempSize - standardPad*2;
	}
	else if(typePos === 'center')
	{
		this.windowPosX = Graphics.boxWidth / 2 - (rangeW * tempSize) / 2 - standardPad;
		this.windowPosY = Graphics.boxHeight / 2 - (rangeH * tempSize) / 2 - standardPad;
	}
	else
	{
		this.windowPosX = 0;
		this.windowPosY = 0;
	}
	
} 

Window_ZzyMMFMini.prototype.Width = function()
{
	return $gameSystem.ZzyMMFRectSize * $gameSystem.ZzyMMFMiniList;
}


Window_ZzyMMFMini.prototype.update = function()
{
	

	this.RefreshPlayerPos();//刷新玩家的位置对比
	//this.RefreshEventPos();//刷新事件的位置对比
	
	
	if(this._isRefresh)//如果地图有变动,则更新地图
	{
		this._isRefresh = false;		
		this.refresh();//刷新地图,玩家，事件的位置
	}
	
	this.RefreshMapEventVisibleAndPos();
	

}


Window_ZzyMMFMini.prototype.Height = function()
{
	return $gameSystem.ZzyMMFRectSize * $gameSystem.ZzyMMFMiniLine;
}

Window_ZzyMMFMini.prototype.refresh = function() 
{
    //刷新玩家的位置信息
	var rangeW = $gameSystem.ZzyMMFMiniList;
	var rangeH = $gameSystem.ZzyMMFMiniLine;
	//对范围进行修改
	var rw = Math.floor(rangeW / 2);//获取半径
	var rh = Math.floor(rangeH / 2);
	
	this._playerX = $gamePlayer.x;//刷新玩家在地图中的xy
	this._playerY = $gamePlayer.y;

	var offsetX =  this._playerX + rw;//添加边界的偏移
	var offsetY =  this._playerY + rh;
	
	var tempSize = $gameSystem.ZzyMMFRectSize;
	
	//计算在小地图上绘制的位置
	this.PlayerSprite.x = this.standardPadding() + offsetX * tempSize + tempSize/2;
	this.PlayerSprite.y = this.standardPadding() + offsetY * tempSize + tempSize/2;
	
	
	if(this.cameraX != this._playerX || this.cameraY != this._playerY)
	{
		
		//将摄像机之前的范围内图片关掉,将新的摄像机范围开启
		this.setMapTileVisible(this.cameraX+rw,this.cameraY+rh,false);
		
		
		//对选择范围内的图块显示或者隐藏

		//设置照相机的位置
		this.cameraX = this._playerX;
		this.cameraY = this._playerY;
		
		this.setMapTileVisible(offsetX,offsetY,true);
		this.RefreshMapEventVisibleAndPos();//刷新地图上显示的事件
		
		
		if(!Zzy.MMF.tempIsFindTarget)//没有找到目标前会对目标进行侦测
		{
			this.RefreshMapProcessVisible();//刷新路径
		}
		
	}

	//刷新地图跟随摄像机绑定的位置
	this.x = (-this.cameraX) * $gameSystem.ZzyMMFRectSize + this.windowPosX;
	this.y = (-this.cameraY) * $gameSystem.ZzyMMFRectSize + this.windowPosY;
	//刷新地图背景跟随摄像机
	if(this.MiniBackSprite)
	{
		this.MiniBackSprite.x = this.PlayerSprite.x;
		this.MiniBackSprite.y = this.PlayerSprite.y;
	}
	
};



Window_ZzyMMFMini.prototype.RefreshMapProcessVisible = function()//刷新路径在地图上的显示情况
{
			
		var cx = this.cameraX;
		var cy = this.cameraY;
		
		var tempSize = $gameSystem.ZzyMMFRectSize;
		var standardPad = this.standardPadding();//默认间距
		var rangeW = $gameSystem.ZzyMMFMiniList;
		var rangeH = $gameSystem.ZzyMMFMiniLine;
		var rw = Math.floor(rangeW / 2);//获取半径
		var rh = Math.floor(rangeH / 2);
		
		var left = cx - rw;
		var right = cx + rw;
		var up = cy - rh;
		var bottom = cy + rh;

		if(this.FindRoute != undefined)
		{
			var tar = this.FindRoute;
			if(tar.x >= left && tar.x <= right && tar.y >= up && tar.y <= bottom)//处于范围内
			{
				this.TargetSprite.visible = true;
			}
			else
			{
				this.TargetSprite.visible = false;
			}
		}

		if(this.ProcessVisblePosArr === undefined || this.ProcessVisblePosArr.length === 0){return;}
	
		//对所有路径的位置进行判定	
		var tempLen = this.ProcessVisblePosArr.length;
		for(var j=0;j<tempLen;j++)
		{
			var pro = this.ProcessVisblePosArr[j];
			if(pro.x >= left && pro.x <= right && pro.y >= up && pro.y <= bottom)//处于范围内
			{
				this.ProcessVisbleArr[j].visible = true;
			}
			 else
			 {
				this.ProcessVisbleArr[j].visible = false;
			 }
			}
				//刷新判断是否到达导航地点
		if(this.TargetSprite != undefined && this.TargetSprite.visible == true)
		{	
			if(this.JudgArrivedTarget())//到达终点
			{
				//隐藏所有指向
				this.TargetSprite.visible = false;
				var len = this.ProcessSpriteArr.length;
				
				for(var i=0;i<len;i++)
				{
					this.ProcessSpriteArr[i].visible = false;
				}
				
				Zzy.MMF.tempIsFindTarget = true;
				
				
				//调用公共事件
				if(Zzy.Param.MMFTargetCommonID > 0)
				{$gameTemp.reserveCommonEvent(Zzy.Param.MMFTargetCommonID);}
			}
		}


}

Window_ZzyMMFMini.prototype.RefreshMapEventVisibleAndPos = function()
{
	var cx = this.cameraX;
	var cy = this.cameraY;
	
	var tempSize = $gameSystem.ZzyMMFRectSize;
	var standardPad = this.standardPadding();//默认间距
	var rangeW = $gameSystem.ZzyMMFMiniList;
	var rangeH = $gameSystem.ZzyMMFMiniLine;
	var rw = Math.floor(rangeW / 2);//获取半径
	var rh = Math.floor(rangeH / 2);
	
	var left = cx - rw;
	var right = cx + rw;
	var up = cy - rh;
	var bottom = cy + rh;
	
	
	//对所有事件的位置进行判定
	
	var len = Zzy.Param.MMFMapEventData.length;
	
	for(var i=0;i<len;i++)
	{
		var ev = $gameMap._events[Zzy.Param.MMFMapEventData[i].evId];
		this.EventSpriteArr[i].x = (ev.x+rw) * tempSize + standardPad + tempSize / 2;
		this.EventSpriteArr[i].y = (ev.y+rh) * tempSize + standardPad + tempSize / 2;	

		if(ev.x >= left && ev.x <= right && ev.y >= up && ev.y <= bottom)//处于范围内
		{
			this.EventSpriteArr[i].visible = true;
		}
		else
		{
			this.EventSpriteArr[i].visible = false;
		}
	}
	
	
}


Window_ZzyMMFMini.prototype.setMapTileVisible = function(cx,cy,vis)
{
	//对选择范围内的图块显示或者隐藏
	var rangeW = $gameSystem.ZzyMMFMiniList;
	var rangeH = $gameSystem.ZzyMMFMiniLine;
	
	//对范围进行修改
	var rw = Math.floor(rangeW / 2);//获取半径
	var rh = Math.floor(rangeH / 2);
	
	var left = Math.max(cx - rw,0);
	var right = Math.min(cx + rw,$gameMap.width()-1+rangeW);
	var up = Math.max(cy - rh,0);
	var bottom = Math.min(cy + rh,$gameMap.height()-1+rangeH);
	
	
	for(var i=up;i<=bottom;i++)
	{
		 for(var j=left;j<=right;j++)
		 {	
			 this.TitlSpriteArr[i][j].visible = vis;
		 }
	}
	

}


Window_ZzyMMFMini.prototype.RefreshPlayerPos = function()
{
	//刷新玩家的位置
	if(this._playerX != $gamePlayer.x)//代表需要刷新
	{
		this._isRefresh = true;
	}
	if(this._playerY != $gamePlayer.y)
	{

		this._isRefresh = true;
	}
	

}


Window_ZzyMMFMini.prototype.JudgArrivedTarget = function()
{
	//通过玩家位置和终点进行矫对
	
	var px = this._playerX;
	var py = this._playerY;
	
	var tx = this.FindRoute.x;
	var ty = this.FindRoute.y;
	
	//判断玩家和终点的距离
	var j1 = Math.abs(px - tx);
	var j2 = Math.abs(py - ty);
	
	if(j1 <= 1 && j2 <= 1) {return true;}
	
return false;

}



Window_ZzyMMFMini.prototype.ReNewSprite = function()
{
		
	this.CreateMMFMiniBack();//添加Mini地图背景，背景将会是自动适应
	
	
		//进行初始化
		var tempW = $gameMap.width();
		var tempH = $gameMap.height();
		
		var tempList = $gameSystem.ZzyMMFMiniList;
		var tempLine = $gameSystem.ZzyMMFMiniLine;
		
		var standardPad = this.standardPadding();//默认间距
		var tempSize = $gameSystem.ZzyMMFRectSize;
		
		var rw = Math.floor(tempList / 2);//获取半径
		var rh = Math.floor(tempLine / 2);

		var l;//left
		var u;//up
		var r;//right
		var b;//bottom
		
		//获取颜色值
		
		var mapId = $gameMap.mapId();
		
		var tempMMFMapTileData = Zzy.Param.MMFMapTileData[mapId];
		
		var ColorArr = $gameSystem.ZzyMMFMapColorArr;
		var PicArr = $gameSystem.ZzyMMFMapPicArr;
		var ColorStrArr = [];
		var PicOpArr = $gameSystem.ZzyMMFMapPicOpArr;//透明度
		

		var lenColor = ColorArr.length;
		
		for(var i=1;i<lenColor;i++)//从1开始是因为0定义ID=0是空的
		{
			ColorStrArr[i] = 'rgba(' + ColorArr[i][0] + ',' + ColorArr[i][1] + ',' + ColorArr[i][2] + ',' + ColorArr[i][3] + ')';
		}
		
		
		this.TitlSpriteArr = [];//地图精灵数组	
		
		var tempH2 = tempH + rh*2;
		var tempW2 = tempW + rw*2;
		
		
		for(var i=0;i<tempH2;i++)
		{
			this.TitlSpriteArr[i] = [];
			for(var j=0;j<tempW2;j++)
			{
				this.TitlSpriteArr[i][j] = new Sprite();//申请图片
				
				//判断是否拥有对应图片,如果没有则绘制对应的色块
				this.TitlSpriteArr[i][j].bitmap = new Bitmap(tempSize,tempSize);

				
				//设置位置
				l = j * tempSize;
				u = i * tempSize;
				
				var tempId = 0;	//瓦片类型
				var tempOpacity = 255;//瓦片透明度
				var tempStrColor;//瓦片颜色
				var tempPic = undefined;
				
				
				//判断边缘外部
				if(i<rh || i>= tempH + rh || j < rw || j>= tempW + rw)//满足边缘框
				{
					//判断是否拥有图片
					if(PicArr[5] != undefined)
					{
						//tempPic = PicArr[5];
						//this.TitlSpriteArr[i][j].bitmap = ImageManager.loadPicture(tempPic);
						this.TitlSpriteArr[i][j].bitmap = Zzy.MMF.LoadPicture(5);
						tempOpacity = PicOpArr[5];
					}
					else
					{
						//注意要向四周添加边缘方块边缘方块ID为5
						tempStrColor = ColorStrArr[5];
						tempOpacity = Number(ColorArr[5][3]);
						this.TitlSpriteArr[i][j].bitmap.fillRect(0,0,tempSize,tempSize,tempStrColor);
					}
				}
				else
				{
					//ID的获取要减去边缘的差数值
					tempId = tempMMFMapTileData[i-rh][j-rw];//取得地图标记内部的ID
					
					
					if(PicArr[tempId] != undefined && PicArr[tempId] != '')
					{
						//tempPic = PicArr[tempId];
						//this.TitlSpriteArr[i][j].bitmap = ImageManager.loadPicture(tempPic);
						this.TitlSpriteArr[i][j].bitmap = Zzy.MMF.LoadPicture(tempId);
						tempOpacity = PicOpArr[tempId];
					}
					else
					{
						tempOpacity = Number(ColorArr[tempId][3]);
						
						tempStrColor = ColorStrArr[tempId];//取得对应的颜色		
						this.TitlSpriteArr[i][j].bitmap.fillRect(0,0,tempSize,tempSize,tempStrColor);
					}						

				}

				//设置位置信息
				this.TitlSpriteArr[i][j].x = l + standardPad;
				this.TitlSpriteArr[i][j].y = u + standardPad;
				
				this.TitlSpriteArr[i][j].opacity = tempOpacity;//设置颜色的透明度
				this.TitlSpriteArr[i][j].visible = false;//默认隐藏			
				this.addChild(this.TitlSpriteArr[i][j]);//添加
			}
		}

	this.ReEventsSprite();//添加事件精灵组	
	if(!Zzy.MMF.tempIsFindTarget)
	{
		this.AddProcessSprite();//添加导航组精灵
	}
		//添加玩家
		this.PlayerSprite = Zzy.MMF.NewMiniSprite($gameSystem.ZzyMMFPlayerPic,$gameSystem.ZzyMMFPlayerColor,$gameSystem.ZzyMMFPlayerPicOp,tempSize);

		this.addChild(this.PlayerSprite);
		this.PlayerSprite.x += standardPad;
		this.PlayerSprite.y += standardPad;	

	//临时赋值
	Zzy.MMF.tempTitlSpriteArr = this.TitlSpriteArr;
	Zzy.MMF.tempEventSpriteArr = this.EventSpriteArr;
	Zzy.MMF.tempPlayerSprite = this.PlayerSprite;
	Zzy.MMF.tempMapId = $gameMap.mapId();
}

Window_ZzyMMFMini.prototype.AddProcessSprite = function()//添加导航组精灵
{
	var tempW = $gameMap.width();
	var tempH = $gameMap.height();
		
	var tempList = $gameSystem.ZzyMMFMiniList;
	var tempLine = $gameSystem.ZzyMMFMiniLine;
		
	var standardPad = this.standardPadding();//默认间距
	var tempSize = $gameSystem.ZzyMMFRectSize;
		
	var rw = Math.floor(tempList / 2);//获取半径
	var rh = Math.floor(tempLine / 2);
	

	if(Zzy.MMF.tempFindRoute != undefined)//并非空会申请终点
	{
		this.TargetSprite = Zzy.MMF.NewMiniSprite($gameSystem.ZzyMMFTargetPic,$gameSystem.ZzyMMFTargetColor,$gameSystem.ZzyMMFTargetPicOp,$gameSystem.ZzyMMFRectSize);
		
		//设置终点位置
		this.FindRoute = Zzy.MMF.tempFindRoute;
		this.ProcessSpriteArr = Zzy.MMF.tempProcessSpriteArr;
		this.ProcessVisbleArr = [];//这个数组是用来存储所显示的
		this.ProcessVisblePosArr = [];//这个数组是用来存储所显示的
		
		this.TargetSprite.x = standardPad + (this.FindRoute.x+rw) * tempSize + tempSize / 2;
		this.TargetSprite.y = standardPad + (this.FindRoute.y+rh) * tempSize + tempSize / 2;
		
		
		
		this.addChild(this.TargetSprite);
		
		
		//显示指向
		var tempFindRoute = this.FindRoute.prev;
		var tempCount = 0;
		var tempProcessDis = $gameSystem.ZzyMMFProcessDis;//所隔离的间隔,这代表在地图上显示多长算一个步伐

		var tempDis = 0;
		while(tempFindRoute != undefined)
		{
			var tempProSprite = this.ProcessSpriteArr[tempCount];
			
			tempProSprite.scale.x = 1;
			tempProSprite.scale.y = 1;
			
			
			tempProSprite.x = standardPad + (tempFindRoute.x+rw) * tempSize + tempSize / 2;
			tempProSprite.y = standardPad + (tempFindRoute.y+rw) * tempSize + tempSize / 2;
			
			this.addChild(tempProSprite);
			
			tempProSprite.visible = false;
			
			if(tempDis >= tempProcessDis)
			{
				tempDis = 0;
				tempProSprite.visible = true;
				this.ProcessVisbleArr.push(tempProSprite);//压入数组
				this.ProcessVisblePosArr.push(tempFindRoute);
			}
			
			
			
			tempCount++;
			tempDis++;
			tempFindRoute = tempFindRoute.prev;//向下遍历
		}
		
	}
	
}

Window_ZzyMMFMini.prototype.ReEventsSprite = function()
{
	var mapList = $gameMap.width();//地图长尺寸
	var mapLine = $gameMap.height();//地图宽尺寸
	var fullList = mapList + 2;
	var fullLine = mapLine + 2;
	var gWidth = Graphics.boxWidth;//游戏窗口宽高
	var gHeight = Graphics.boxHeight;
	
	this.EventSpriteArr = [];
	var standardPad = this.standardPadding();//默认间距
	var tempList = $gameSystem.ZzyMMFMiniList;
	var tempLine = $gameSystem.ZzyMMFMiniLine;
	var rw = Math.floor(tempList / 2);//获取半径
	var rh = Math.floor(tempLine / 2);
	
	var tempLen = Zzy.Param.MMFMapEventData.length;
	var tempColorArr = $gameSystem.ZzyMMFEventColorArr;
	var tempPicArr = $gameSystem.ZzyMMFEventPicArr;
	var tempPicOpArr = $gameSystem.ZzyMMFEventPicOpArr;
	var tempStrColor;
	var tempSize = $gameSystem.ZzyMMFRectSize;
	
	//计算比例
	var rSize1 = gWidth / fullList;
	var rSize2 = gHeight / fullLine;
    this._rSize = Math.min(rSize1,rSize2);

	for(var i=0;i<tempLen;i++)
	{
		//对内容进行获取
		var tempEv = Zzy.Param.MMFMapEventData[i];
		var tempTypeId = tempEv.typeId;
		var tempColor;
		var tempPic;
	    var tempOpacity = 255;
		
// 敌人色块 : 1		箱子色块 : 2		传送点色块 : 3		自定义图片 : 4
		if(tempTypeId >= 1 && tempTypeId <= 3)//4代表没有色块，是用自定义图片填充
		{		
			this.EventSpriteArr[i] = Zzy.MMF.NewMiniSprite($gameSystem.ZzyMMFEventPicArr[tempTypeId],$gameSystem.ZzyMMFEventColorArr[tempTypeId],$gameSystem.ZzyMMFEventPicOpArr[tempTypeId],this._rSize);
		}
		else
		{
			//tempTypeId 4比较特殊,因为是自定义图片，并且不包含默认的色块，所以要单独处理
			tempPic = tempEv.picName;
			tempEv.picOpacity = Math.max(1,tempEv.picOpacity);
			tempEv.picOpacity = Math.min(tempEv.picOpacity,255);
			
			tempOpacity = tempEv.picOpacity;
			
			
			
			this.EventSpriteArr[i] = new Sprite();
			this.EventSpriteArr[i].bitmap = ImageManager.loadPicture(tempPic);
			this.EventSpriteArr[i].opacity = tempOpacity;//透明度
			this.EventSpriteArr[i].anchor.x = 0.5;
			this.EventSpriteArr[i].anchor.y = 0.5;
		}
		//设置初始化位置
		var ev = $gameMap._events[tempEv.evId];//获取事件对象
		
		this.EventSpriteArr[i].visible = false;
		this.EventSpriteArr[i].x = (ev.x+rw) * this._rSize + standardPad + this._rSize / 2;
		this.EventSpriteArr[i].y = (ev.y+rh) * this._rSize + standardPad + this._rSize / 2;
		
		
		this.addChild(this.EventSpriteArr[i]);		
	}
}


Window_ZzyMMFMini.prototype.CreateMMFMiniBack = function()//添加mini背景
{
	
	if($gameSystem.ZzyMMFMiniBack === undefined || $gameSystem.ZzyMMFMiniBack === '')
	{return;}
	
	this.MiniBackSprite = new Sprite();
	this.MiniBackSprite.bitmap = ImageManager.loadPicture($gameSystem.ZzyMMFMiniBack)//添加背景

	this.MiniBackSprite.opacity = $gameSystem.ZzyMMFMiniBackOp;
	
	//获取瓦片数据
	var tempList = $gameSystem.ZzyMMFMiniList;
	var tempLine = $gameSystem.ZzyMMFMiniLine;
	var standardPad = this.standardPadding();//默认间距
	var tempSize = $gameSystem.ZzyMMFRectSize;
	this.MiniBackSprite.anchor.x = 0.5;
	this.MiniBackSprite.anchor.y = 0.5;

	this.addChild(this.MiniBackSprite);	
	
	
}




//============================================================
//Scene_ZzyMMFMini
//============================================================


function Scene_ZzyMMFMini() {
    this.initialize.apply(this, arguments);
}

Scene_ZzyMMFMini.prototype = Object.create(Scene_Base.prototype);
Scene_ZzyMMFMini.prototype.constructor = Scene_ZzyMMFMini;

Scene_ZzyMMFMini.prototype.initialize = function() 
{
    Scene_Base.prototype.initialize.call(this);

	this._mapId = Zzy.MMF.tempMapId;//获取地图ID
	
	//大小，比率，点击位置
	this._rSize = 1;
	this._rate = 1;
	
	this._offHorizontal = 0;
	this._offVertical = 0;
	
	this._touchX = 0;
	this._touchY = 0;
	
	this._arrIndexX = -1;
	this._arrIndexY = -1;
	
	this._findRoute = undefined;//这是找到了正确线路的路径
	
	this._targetSprite;
	this._notTargetSprite;
	this._processSpriteArr = [];
	
};

Scene_ZzyMMFMini.prototype.create = function()
 {
    Scene_Base.prototype.create.call(this);
    this.createBackground();//创建背景图片
	
	//显示图片
	this.ShowFullMap();//展示大地图
	
};

Scene_ZzyMMFMini.prototype.ShowFullMap = function()
{
	
	//首先获取比例,本地图规格会使长或者宽以为最高
	//边界会保留1
	//计算瓦片尺寸
	var tempSrcSize = $gameSystem.ZzyMMFRectSize;//原始尺寸
	
	
	var mapList = $gameMap.width();//地图长尺寸
	var mapLine = $gameMap.height();//地图宽尺寸
	
	
	var tempList = $gameSystem.ZzyMMFMiniList;
	var tempLine = $gameSystem.ZzyMMFMiniLine;
	var rw = Math.floor(tempList / 2);//获取半径
	var rh = Math.floor(tempLine / 2);
	
	var fullList = mapList + 2;
	var fullLine = mapLine + 2;
	var gWidth = Graphics.boxWidth;//游戏窗口宽高
	var gHeight = Graphics.boxHeight;
	
	//计算比例
	var rSize1 = gWidth / fullList;
	var rSize2 = gHeight / fullLine;
	
    this._rSize = Math.min(rSize1,rSize2);
	
	var isHorizontal = false;//判断地图是水平拉满还是垂直拉满
	if(this._rSize == rSize1)//等于宽度代表水平拉满,则需要计算垂直偏移的距离
	{
		isHorizontal = true;
	}
	
	
	//计算比率
	this._rate = this._rSize / tempSrcSize;
	
	//将所有的图片比率增加
	
	
	var tempTitlSpriteArr = Zzy.MMF.tempTitlSpriteArr;
	var tempEventSpriteArr = Zzy.MMF.tempEventSpriteArr;
	var tempPlayerSprite = Zzy.MMF.tempPlayerSprite;
	
	var eventLen = Zzy.MMF.tempEventSpriteArr.length;

	var jLen = mapList+rh*2;
	var iLen = mapLine+rw*2;
	
	
	//计算偏差值
	var offX = rw - 1;
	var offY = rh - 1;
	

	this._offHorizontal = 0;
	this._offVertical = 0;
	
	//计算显示偏移值
	 if(isHorizontal)
	 {
		 //如果是水平的，那么会计算垂直偏移
		 var h1 = Graphics.boxHeight / 2;
		 h1 -= (this._rSize * fullLine) / 2;
		this._offVertical = h1;
	 }
	 else
	 {
		 var w1 = Graphics.boxWidth / 2;
		 w1 -= (this._rSize * fullList) / 2;
		 this._offHorizontal = w1;
	 }
	
	 for(var i=offY;i<iLen-offY;i++)
	 {
		 for(var j=offX;j<jLen-offX;j++)
		 {
			 
			 tempTitlSpriteArr[i][j].scale.x = this._rate;
			 tempTitlSpriteArr[i][j].scale.y = this._rate;
			 tempTitlSpriteArr[i][j].opacity = 255;
			 tempTitlSpriteArr[i][j].visible = true; 
			 //设置位置
			 tempTitlSpriteArr[i][j].x = (j - offX)*this._rSize + this._offHorizontal;
			 tempTitlSpriteArr[i][j].y = (i - offY)*this._rSize + this._offVertical;
			 
			 this.addChild(tempTitlSpriteArr[i][j]);
			 
		 }
	 }
	 
	//获取所有事件
	var tempEvents = $gameMap.events();
	var tempEventsLen = tempEvents.length;
	var tempEventCount = 0;
	for(var i=0;i<tempEventsLen;i++)
	{
		var ev = tempEvents[i];
		if(ev._ZzyMMFType > 0)//代表在地图上,可以获取xy位置
		{
			var indexX = ev.x;
			var indexY = ev.y;
			
			tempEventSpriteArr[tempEventCount].scale.x = this._rate;
			tempEventSpriteArr[tempEventCount].scale.y = this._rate;
			tempEventSpriteArr[tempEventCount].visible = true; 
			
			tempEventSpriteArr[tempEventCount].x = (indexX+1) * this._rSize + this._offHorizontal + this._rSize / 2;
			tempEventSpriteArr[tempEventCount].y = (indexY+1) * this._rSize + this._offVertical + this._rSize / 2;

			this.addChild(tempEventSpriteArr[tempEventCount]);
			tempEventCount++;
		}
	}	  
	  
	  //角色的位置
	 var playerX = ($gamePlayer.x+1) * this._rSize + this._offHorizontal + this._rSize/2;//刷新玩家在地图中的xy
	 var playerY = ($gamePlayer.y+1) * this._rSize + this._offVertical + this._rSize/2;
	  
	  tempPlayerSprite.scale.x = this._rate;
	  tempPlayerSprite.scale.y = this._rate;
	  tempPlayerSprite.visible = true; 
	  
	  tempPlayerSprite.x = playerX;
	  tempPlayerSprite.y = playerY;
	  
	  this.addChild(tempPlayerSprite);
	
}

Scene_ZzyMMFMini.prototype.start = function() 
{
    Scene_Base.prototype.start.call(this);
};

Scene_ZzyMMFMini.prototype.update = function() //刷新
{
	//退出判断
	if(Input.isTriggered('cancel') || Input.isTriggered(Zzy.Param.MMFInputKey))
	{
		SceneManager.pop();
	}
	//鼠标点击判断

	if(TouchInput.isTriggered())//如果触发，则检测
	{
		this.GetTouchXY();//获取点击的XY位置
		
		this.GetTouchOfArrPos();//获取点击的地图位置xy;
		
		if(this.IsSetTarget() == true)//判断这个点是否可以设置通过点
		{
			this.SetTarget();//设置目标点
			
		}
		
	}
    Scene_Base.prototype.update.call(this);
	
};

Scene_ZzyMMFMini.prototype.stop = function() 
{
    Scene_Base.prototype.stop.call(this);
};

Scene_ZzyMMFMini.prototype.terminate = function() //退出
{
    Scene_Base.prototype.terminate.call(this);
	//将临时进行存储
	Zzy.MMF.tempFindRoute = this._findRoute;//获取临时存储
	Zzy.MMF.tempProcessSpriteArr = this._processSpriteArr;//获取存储精灵的数组
};

Scene_ZzyMMFMini.prototype.createBackground = function() 
{
    this._backSprite = new Sprite();
    this._backSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backSprite);
};

Scene_ZzyMMFMini.prototype.GetTouchXY = function()
{
	this._touchX = TouchInput.x;
	this._touchY = TouchInput.y;
}

Scene_ZzyMMFMini.prototype.GetTouchOfArrPos = function()
{
	//将点击的位置转换成对应格子
	var realX = this._touchX - this._offHorizontal;
	var realY = this._touchY - this._offVertical;
	
	var indexX = Math.floor(realX / this._rSize); 
	var indexY = Math.floor(realY / this._rSize); 
	
	//转换到数组中对应的位置
	
	//坐标转换
	this._arrIndexX = indexX - 1;
	this._arrIndexY = indexY - 1;
}


Scene_ZzyMMFMini.prototype.IsSetTarget = function()
{
	var tempMapData = Zzy.Param.MMFMapTileData[this._mapId];
	//点击出范围了
	if(this._arrIndexX < 0 || this._arrIndexX >= tempMapData[0].length) {return false;}
	if(this._arrIndexY < 0 || this._arrIndexY >= tempMapData.length) {return false;}
	return true;
	//获取到类型的下标
}


Scene_ZzyMMFMini.prototype.SetTarget = function()
{
	var tempMapData = Zzy.Param.MMFMapTileData[this._mapId];
	var typeId = tempMapData[this._arrIndexY][this._arrIndexX];
	
	//首先有三种情况，飞船，大船，以及步行
	//因为地图数据中没有包含大船小船区别，所以全部归于大船
	//大船满足在水上行走，飞船可以在地图上任意点
	var vehicleType = 0;//0代表步行
	if($gamePlayer.isInAirship() === true)
	{vehicleType = 2;}
	else if($gamePlayer.isInShip() === true)
	{vehicleType = 1;}
	var passArr = this.CreatePassArr(vehicleType);
	
	if(passArr[this._arrIndexY][this._arrIndexX] === false)
	{
		//代表此处不可通行,因为点中石头
		
		this.ShowPathSprite(false);//false代表路径不通，显示寻路失败的标记
		return;
	}
	//通过广度寻路算法来判断是否可以到达此位置
	this._findRoute = this.WidePathAlgorithm(passArr);
	

	if(this._findRoute === undefined)
	{
		this.ShowPathSprite(false);
		
	}//false代表路径不通，显示寻路失败的标记
	else
	{
		this.ShowPathSprite(true);
		Zzy.MMF.tempIsFindTarget = false;
	}
	
}

Scene_ZzyMMFMini.prototype.ShowPathSprite = function(isFind)
{
	//将所有指向都隐藏
	if(this._processSpriteArr != undefined)
	{
		var tempLen = this._processSpriteArr.length;
		for(var i=0;i<tempLen;i++)
		{
			this._processSpriteArr[i].visible = false;
		}
	}
	
	
	if(isFind === false)
	{
		if(this._notTargetSprite == undefined)//没有创建则创建寻路失败的图标
		{
			this._notTargetSprite = Zzy.MMF.NewMiniSprite($gameSystem.ZzyMMFNotTargetPic,$gameSystem.ZzyMMFNotTargetColor,$gameSystem.ZzyMMFNotTargetPicOp,this._rSize);
			
			if($gameSystem.ZzyMMFNotTargetPic)
			{
				this._notTargetSprite.scale.x = this._rate;
				this._notTargetSprite.scale.y = this._rate;
			}
			//添加图片
			this.addChild(this._notTargetSprite);
		}
		else
		{
			this._notTargetSprite.visible = true;//创建则显示
		}
		//设置点击失败的位置
		this._notTargetSprite.x = this._rSize * (this._arrIndexX+1) + this._offHorizontal + this._rSize/2;
		this._notTargetSprite.y = this._rSize * (this._arrIndexY+1) + this._offVertical + this._rSize/2;
		if(this._targetSprite)
		{this._targetSprite.visible = false;}
	}
	else
	{
		if(this._targetSprite == undefined)//没有创建则创建寻路失败的图标
		{
			this._targetSprite = Zzy.MMF.NewMiniSprite($gameSystem.ZzyMMFTargetPic,$gameSystem.ZzyMMFTargetColor,$gameSystem.ZzyMMFTargetPicOp,this._rSize);
			if($gameSystem.ZzyMMFTargetPic)
			{
				this._targetSprite.scale.x = this._rate;
				this._targetSprite.scale.y = this._rate;
			}
			//添加图片
			this.addChild(this._targetSprite);
		}
		else
		{
			this._targetSprite.visible = true;//创建则显示
		}
		//设置点击失败的位置
		this._targetSprite.x = this._rSize * (this._arrIndexX+1) + this._offHorizontal + this._rSize/2;
		this._targetSprite.y = this._rSize * (this._arrIndexY+1) + this._offVertical + this._rSize/2;
		if(this._notTargetSprite)
		{this._notTargetSprite.visible = false;}

	
		//使用动态缓存数组
			
		var tempRoute = this._findRoute.prev;//因为最后一个是终点，所以忽略
		var tempIndex = 0;//临时标记
		var prevNode = this._findRoute;//上一个节点，用来计算图片的方向
		
		while(tempRoute != undefined)//向前遍历
		{
			var tempSprite;
			if(tempIndex >= this._processSpriteArr.length)
			{
				//需要申请对象
				 tempSprite = Zzy.MMF.NewMiniSprite($gameSystem.ZzyMMFProcessPic,$gameSystem.ZzyMMFProcessColor,$gameSystem.ZzyMMFProcessPicOp,this._rSize);
				 tempSprite.scale.x = this._rate;
				 tempSprite.scale.y = this._rate;
				 
				 //设置叠加的荧光模式
				 tempSprite.blendMode = Graphics.BLEND_ADD;
				this._processSpriteArr.push(tempSprite);
				this.addChild(tempSprite);
			}
			else
			{
				//启用对象就可以了
				tempSprite = this._processSpriteArr[tempIndex];
				tempSprite.visible = true;
			}

			var dirID = 0;
			//通过比较前一个的位置来计算方向
			if($gameSystem.ZzyMMFProcessPic)//代表有图片
			{
				//方向ID 0:右 1:上 2:左 3:下
				
				var px = prevNode.x;
				var py = prevNode.y;
				var nx = tempRoute.x;
				var ny = tempRoute.y;
				
				if(px > nx){dirID = 0;}//右边
				else if(py < ny){dirID = 1;}
				else if(px < nx){dirID = 2;}
				else if(py > ny){dirID = 3;}
				
				tempSprite.rotation = -Math.PI / 2 * dirID;
			}
			tempSprite.x = this._rSize * (tempRoute.x+1) + this._offHorizontal + this._rSize/2;
			tempSprite.y = this._rSize * (tempRoute.y+1) + this._offVertical + this._rSize/2;			
			
			tempIndex++;
			prevNode = tempRoute;
			tempRoute = tempRoute.prev;
		}
	}
}

Scene_ZzyMMFMini.prototype.CreatePassArr = function(vehicleType)//制定通行数组
{
	var tempMapData = Zzy.Param.MMFMapTileData[this._mapId];
	var mapList = $gameMap.width();//地图长尺寸
	var mapLine = $gameMap.height();//地图宽尺寸
	
	var passArr = [];
	
	
	switch(vehicleType)
	{
		case 2://全图都是可通行的
		for(var i=0;i<mapLine;i++)
		{
			passArr[i] = [];
			for(var j=0;j<mapList;j++)
			{
				passArr[i][j] = true;
			}
		}
			break;
		case 1://包含海洋是可通行的
		for(var i=0;i<mapLine;i++)
		{
			passArr[i] = [];
			for(var j=0;j<mapList;j++)
			{
// 通行陆地:1  阻挡色块:2  海洋色块:3  虚空色块:4  边缘色块:5  梯子色块:6  草木茂盛:7  伤害色块:8				
				switch(tempMapData[i][j])
				{
					case 1:case 3:case 6:case 7:case 8:
					passArr[i][j] = true;
					break;
					default:
					passArr[i][j] = false;
				}				
			}
		}
			break;
		case 0:
			for(var i=0;i<mapLine;i++)
			{
				passArr[i] = [];
				for(var j=0;j<mapList;j++)
				{
					switch(tempMapData[i][j])
					{
						case 1:case 6:case 7:case 8:
						passArr[i][j] = true;
						break;
						default:
						passArr[i][j] = false;						
						
					}
				}
			}
			break;
		default:
		return undefined;
	}
	
	return passArr;
}




Scene_ZzyMMFMini.prototype.WidePathAlgorithm = function(passArr)
{
	var tempPassArr = passArr;

	var startX = $gamePlayer.x;
	var startY = $gamePlayer.y;
	var enderX = this._arrIndexX;
	var enderY = this._arrIndexY;

	PathNode = {
		x:0,//x位置
		y:0,//y位置
		prev:undefined//前一个指针
	};
	
	var startNode = Object.create(PathNode);
	startNode.x = startX;
	startNode.y = startY;
	startNode.prev = undefined;
	
	var enderNode = Object.create(PathNode);
	enderNode.x = enderX;
	enderNode.y = enderY;
	enderNode.prev = undefined;
	
	var currentArr = [];
	var nextArr = [];
	
	currentArr.push(startNode);
	tempPassArr[startNode.y][startNode.x] = false;
	//方向遍历顺序:上左下右
	var isFindTarget = false;
	var TargetPathNode;
	while(1)
	{
		//此处开始遍历
		nextArr = [];//初始化提供每次变化
		var currentLen = currentArr.length;
		var isFindEnder = false;
		
		if(currentLen <= 0)  {break;} //全部遍历完成，并没有找到目标
		
		for(var i=0;i<currentLen;i++)
		{
			var tempX = currentArr[i].x;
			var tempY = currentArr[i].y;
	
			//判断四方向是否满足
			if(this.IsWidePathPass(tempX,tempY-1,tempPassArr))//向上
			{
				var tempNode = Object.create(PathNode);
				tempNode.x = tempX;
				tempNode.y = tempY-1;
				tempNode.prev = currentArr[i];//指向父类
				nextArr.push(tempNode);//压入
				tempPassArr[tempY-1][tempX] = false;
			}
			if(this.IsWidePathPass(tempX-1,tempY,tempPassArr))//向左
			{
				var tempNode = Object.create(PathNode);
				tempNode.x = tempX-1;
				tempNode.y = tempY;
				tempNode.prev = currentArr[i];//指向父类
				nextArr.push(tempNode);//压入
				tempPassArr[tempY][tempX-1] = false;
			}
			if(this.IsWidePathPass(tempX,tempY+1,tempPassArr))//向右
			{
				var tempNode = Object.create(PathNode);
				tempNode.x = tempX;
				tempNode.y = tempY+1;
				tempNode.prev = currentArr[i];//指向父类
				nextArr.push(tempNode);//压入
				tempPassArr[tempY+1][tempX] = false;				
			}
			if(this.IsWidePathPass(tempX+1,tempY,tempPassArr))//向下
			{
				var tempNode = Object.create(PathNode);
				tempNode.x = tempX+1;
				tempNode.y = tempY;
				tempNode.prev = currentArr[i];//指向父类
				nextArr.push(tempNode);//压入
				tempPassArr[tempY][tempX+1] = false;				
			}
		}
		
		
		//判断是否寻到了终点
		var nextLen = nextArr.length;
		for(var i=0;i<nextLen;i++)
		{
			var tempNode = nextArr[i];
			
			if(tempNode.x == enderNode.x && tempNode.y == enderNode.y)
			{
				//找到了终点
				TargetPathNode = tempNode;
				isFindTarget = true;
				break;
			}
		}
		
		if(isFindTarget)//退出遍历循环
		{
			break;
		}
		currentArr = nextArr;//赋值满足下一圈
	}
	
	if(isFindTarget)//可以计算出获取终点的路径
	{
		return TargetPathNode;	
	}
	return undefined;
}

Scene_ZzyMMFMini.prototype.IsWidePathPass = function(x,y,tempPassArr)
{
	var tempList = tempPassArr[0].length;
	var tempLine = tempPassArr.length;
	
	if(x < 0 || x >= tempList || y < 0 || y >= tempLine)return false;//判断是否越界
	
	return tempPassArr[y][x];
	
	
}

//=======================================================
//
Zzy.MMF.NewMiniSprite = function(zPicName,zColor,zOpacity,zSize)
{
	var tempSprite = new Sprite();
	if(zPicName === undefined || zPicName === '')
	{
		var tempColor = zColor;
		var tempStrColor = 	'rgba(' + tempColor[0] + ',' + tempColor[1] + ',' + tempColor[2] + ',' + tempColor[3] + ')';
		tempSprite.bitmap = new Bitmap(zSize,zSize);
		tempSprite.bitmap.fillRect(0,0,zSize,zSize,tempStrColor);
		tempSprite.opacity = Number(tempColor[3]);
		tempSprite.anchor.x = 0.5;
		tempSprite.anchor.y = 0.5;
	}
	else
	{
		tempSprite.bitmap = ImageManager.loadPicture(zPicName);
		tempSprite.anchor.x = 0.5;
		tempSprite.anchor.y = 0.5;
		tempSprite.opacity = zOpacity;
	}
	return tempSprite;
}

Zzy.MMF.ZzyOpenMiniMapFun = function(show)//打开小地图命令
{
	if(Zzy.MMF.tempMiniWindow)
	{
		Zzy.MMF.tempMiniWindow.visible = show;
	}
}

Zzy.MMF.ZzyOpenFullMapFun = function()//打开全屏地图
{
	if($gameSystem.ZzyMMFIsEnableMinMap === true)
	{
		SceneManager.push(Scene_ZzyMMFMini);
	}
	
}

Zzy.MMF.KeyBindingFun = function()//执行按键绑定
{
	//转换为字符编码
	var CC = Zzy.Param.MMFInputKey;
	var ASCII = CC.charCodeAt();
	
	if(ASCII > 0 && ASCII < 256)
	{
		Input.keyMapper[ASCII] = Zzy.Param.MMFInputKey;
	}
}
Zzy.MMF.KeyBindingFun();



Zzy.MMF.LoadPicture = function(index)//优化LoadPicture
{
	if(!Zzy.MMF.tempBitmapArr[index])
	{
		
		var fileName = $gameSystem.ZzyMMFMapPicArr[index];
		
		Zzy.MMF.tempBitmapArr[index] = ImageManager.loadPicture(fileName);
	}
	
	return Zzy.MMF.tempBitmapArr[index];
}




