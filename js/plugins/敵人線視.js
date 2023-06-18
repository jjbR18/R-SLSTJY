#==============================================================================
# ■ LCF_Leyeshot (linetype eyeshot)ACE 2.21    Creator LCF  Date 2009.7.6
#------------------------------------------------------------------------------
# 　线形视野系统    编者：流川枫   QQ：350773875 
#==============================================================================
#【使用说明】
#------------------------------------------------------------------------------
# 视野系统开关    $game_map.events[@event_id].le_seeing = true/false
# 功能：该值为true表示该NPC视野开启，否则未开启，默认为false。
#------------------------------------------------------------------------------
# 视野透视开关    $game_map.events[@event_id].le_clairv = true/false
# 功能：该值为true表示该NPC视野不扫描视线障碍，否则扫描，默认为false。
#------------------------------------------------------------------------------
# 视线显示开关    $game_map.events[@event_id].le_show = true/false
# 功能：该值为true表示显示该NPC的视线，否则不显示，默认为false。
#------------------------------------------------------------------------------
# 看见时显示开关    $game_map.events[@event_id].le_ss = true/false
# 功能：该值为true表示只有当NPC看见主角时才显示视线，否则一直显示，默认为false。
#------------------------------------------------------------------------------
# 侧面可视开关    $game_map.events[@event_id].le_side = true/false
# 功能：该值为true表示该NPC可以看到侧面一格内的人，否则由斜率决定，默认为true。
#------------------------------------------------------------------------------
# 视野环绕开关    $game_map.events[@event_id].le_circle = true/false
# 功能：该值为true表示该NPC为环绕视野，否则不能看见自己的身后，默认为false。
#------------------------------------------------------------------------------
# 设置视野深度    $game_map.events[@event_id].le_deepness = 深度值
# 功能：该值代表视野的能见度，当视野模型为扇形时应避免设置成奇数，默认为8。
#------------------------------------------------------------------------------
# 设置视野斜率    $game_map.events[@event_id].le_slope = 斜率值
# 功能：该值代表视野的斜率，默认为1.0。
#------------------------------------------------------------------------------
# 设置显示颜色    $game_map.events[@event_id].le_color = 颜色值
# 功能：该值代表视线显示的颜色，默认为0xf0。
#------------------------------------------------------------------------------
# 设置触发开关    $game_map.events[@event_id].le_skey = "A"/"B"/"C"/"D"(大写)
# 功能：该值指定了映射是否看见主角的状态的独立开关，默认为"D"。
#------------------------------------------------------------------------------
# 设置键开关    $game_map.events[@event_id].le_kw = true/false
# 功能：该值表示是否将该NPC触发状态映射到触发开关指定的独立变量中，默认为true。
#------------------------------------------------------------------------------
# 设置触发确认    $game_map.events[@event_id].le_true = true/false
# 功能：该值表示该NPC是否看见了主角，等价于触发开关，默认为false。
#------------------------------------------------------------------------------
# 设置视野模型    $game_map.events[@event_id].le_mode = 0/1
# 功能：该值为0时表示该NPC的视野形状类扇形，为1时类三角形，默认为0。
#==============================================================================
# 全局视野开关    $le_run = true/false
# 功能：该值为true表示系统正常工作，否则终止所有NPC的视野,默认为true。
#------------------------------------------------------------------------------
# 全局关闭列表    $le_close_table = ["A","B","C","D"]
# 功能：不同场景转移时，将自动关闭表里的独立开关。（只针对le_seeing为true的NPC）
#==============================================================================
# 当NPC看见主角，独立开关(le_skey)便会被打开,否则为关闭状态。
#==============================================================================
 
#==============================================================================
# ■ Game_Event
#------------------------------------------------------------------------------
# 　重载事件类
#==============================================================================
class Game_Event
  attr_accessor   :le_seeing                 # 视野系统开关
  attr_accessor   :le_clairv                 # 视野透视开关
  attr_accessor   :le_show                   # 视线显示开关
  attr_accessor   :le_ss                     # 看见时显示开关
  attr_accessor   :le_side                   # 侧面可视开关
  attr_accessor   :le_circle                 # 视野环绕开关
  attr_accessor   :le_deepness               # 视野深度
  attr_accessor   :le_slope                  # 视野斜率
  attr_accessor   :le_color                  # 显示颜色
  attr_accessor   :le_trace                  # 视野痕迹
  attr_accessor   :le_skey                   # 触发开关
  attr_accessor   :le_kw                     # 键开关
  attr_accessor   :le_true                   # 触发确认
  attr_accessor   :le_mode                   # 视野模型
  #--------------------------------------------------------------------------
  LE_DEEPNESS_OFFSET = 1                     # 深度缓存的偏移
  #--------------------------------------------------------------------------
  # ● 初始化对像
  #     map_id : 地图 ID
  #     event  : 事件 (RPG::Event)
  #--------------------------------------------------------------------------
  alias original_le_initialize initialize
  def initialize (map_id, event)
    original_le_initialize(map_id, event)
    @le_seeing   = false
    @le_clairv   = false
    @le_show     = false
    @le_ss       = false
    @le_side     = true
    @le_circle   = false
    @le_deepness = 8
    @le_slope    = 1.0
    @le_color    = 0xf0
    @le_trace = Table.new(@le_deepness-LE_DEEPNESS_OFFSET,2)
    @le_trace[0,0] = -1
    @le_kw   = true
    @le_true = false
    @le_mode = 0
    @le_skey = "D"
  end
  #--------------------------------------------------------------------------
  # ● 刷新
  #--------------------------------------------------------------------------
  alias original_le_update update
  def update
    original_le_update
    if @le_seeing and $le_run
      @le_trace.resize(@le_deepness-LE_DEEPNESS_OFFSET,2) if @le_trace.xsize+LE_DEEPNESS_OFFSET != @le_deepness
      self.see
      if @le_kw
        $game_map.need_refresh = true if @le_true != $game_self_switches[[$game_map.map_id, @id, @le_skey]]
        $game_self_switches[[$game_map.map_id, @id, @le_skey]] = @le_true
      end
    end
  end
  #--------------------------------------------------------------------------
  # ● 视野检测
  #--------------------------------------------------------------------------
  def see
    @le_true = false
    if ($game_player.x-@x).abs<@le_deepness and ($game_player.y-@y).abs<@le_deepness
      difference_x = ($game_player.x - @x).abs
      difference_y = ($game_player.y - @y).abs
      case @direction
      when 2
        return if @le_circle != true and $game_player.y < @y
        unless @le_side and (difference_y == 0 and difference_x == 1)
          return if difference_x.to_f/difference_y > @le_slope
        end
      when 4
        return if @le_circle != true and $game_player.x > @x
        unless @le_side and difference_y == 1 and difference_x == 0
          return if difference_y.to_f/difference_x > @le_slope
        end
      when 6
        return if @le_circle != true and $game_player.x < @x
        unless @le_side and difference_y == 1 and difference_x == 0
          return if difference_y.to_f/difference_x > @le_slope
        end
      else
        return if @le_circle != true and $game_player.y > @y
        unless @le_side and difference_y == 0 and difference_x == 1
          return if difference_x.to_f/difference_y > @le_slope
        end
      end
      if @le_mode == 0
        return if (difference_x ** 2 + difference_y ** 2) > le_deepness ** 2
      end
      @le_true = scan_line
      if @le_ss and @le_true !=true
        @le_trace[0,0] = -1
      end
    end
  end
  #--------------------------------------------------------------------------
  # ● 视线检测   采用了国际领先的视线扫描算法！
  #--------------------------------------------------------------------------
  def scan_line
    difference_x = $game_player.x - @x
    difference_y = $game_player.y - @y
    direction_x = (difference_x > 0 ? 1 : -1)
    direction_y = (difference_y > 0 ? 1 : -1)
    i = 0
    if difference_x.abs > difference_y.abs
      while difference_x.abs > i+1
        i+=1
        x = @x+i*direction_x
        if direction_y>0
          y = @y+i*difference_y/difference_x.to_f*direction_y*direction_x+0.5
        else
          y = @y-i*difference_y/difference_x.to_f*direction_y*direction_x+0.5
        end
        x = x.floor
        y = y.floor
        if @le_clairv != true
          unless (direction_x > 0 ? passable?(x-1,y,6) : passable?(x+1,y,4))
            @le_trace[i-1,0] = -1
            return false
          end
        end
        if @le_show
          @le_trace[i-1,0] = x
          @le_trace[i-1,1] = y
        end
      end
    else
      while difference_y.abs > i+1
        i+=1
        y = @y+i*direction_y
        if direction_x>0
          x = @x+i*difference_x/(difference_y+0.0)*direction_x*direction_y+0.5
        else
          x = @x-i*difference_x/(difference_y+0.0)*direction_x*direction_y+0.5
        end
        x = x.floor
        y = y.floor
        if @le_clairv != true
          unless (direction_y > 0 ? passable?(x,y-1,2) : passable?(x,y+1,8))
            @le_trace[i-1,0] = -1
            return false
          end
        end
        if @le_show
          @le_trace[i-1,0] = x
          @le_trace[i-1,1] = y
        end
      end
    end
    @le_trace[i,0] = -1
    return true
  end
end
#==============================================================================
# ■ Spriteset_Map
#------------------------------------------------------------------------------
#    重载地图显示
#==============================================================================
class Spriteset_Map
  attr_reader:tilemap 
  alias :original_le_initialize :initialize
  def initialize
    original_le_initialize
    @tilemap.flash_data=Table.new(@tilemap.map_data.xsize,@tilemap.map_data.ysize)
  end
end
#==============================================================================
# ■ Game_Player
#------------------------------------------------------------------------------
#    重载玩家
#==============================================================================
class Game_Player < Game_Character
  attr_reader:new_map_id
end
#==============================================================================
# ■ Scene_Map
#------------------------------------------------------------------------------
#    重载地图场景
#==============================================================================
class Scene_Map
  attr_reader:spriteset
  #--------------------------------------------------------------------------
  # ● 场所移动前的处理
  #--------------------------------------------------------------------------
  alias original_le_pre_transfer pre_transfer
  def pre_transfer
    original_le_pre_transfer
    # 自动关闭当前地图上le_seeing为true的NPC独立开关
    if $game_map.map_id != $game_player.new_map_id
      for event in $game_map.events.values
        if event.le_seeing
          for key in $le_close_table
            $game_self_switches[[$game_map.map_id,event.id, key]] =false
          end
        end
      end
    end
  end
  #--------------------------------------------------------------------------
  # ● 更新画面
  #--------------------------------------------------------------------------
  #alias original_le_update update
  def update
    super
      #==========================
      # 清除LE视野产生的痕迹
      #==========================
      for event in $game_map.events.values
        for i in 0 .. event.le_trace.xsize-1
          break if event.le_trace[i,0] == -1
          @spriteset.tilemap.flash_data[event.le_trace[i,0],event.le_trace[i,1]] = 0
        end
         event.le_trace[0,0] = -1
       end
      #==========================
 
    $game_map.update(true)
    $game_player.update
    $game_timer.update
    @spriteset.update
    update_scene if scene_change_ok?
      #==========================
      # 刷新LE视野路径
      #==========================
      for event in $game_map.events.values
        for i in 0 .. event.le_trace.xsize-1
          break if event.le_trace[i,0] == -1
          @spriteset.tilemap.flash_data[event.le_trace[i,0],event.le_trace[i,1]] = event.le_color
        end
      end
      #==========================
  end
end
#==============================================================================
# ■ Scene_Title
#------------------------------------------------------------------------------
# 　处理标题画面的类。
#==============================================================================
class Scene_Title
  alias original_le_main main
  def main
    $le_run = true
    $le_close_table = ["A","B","C","D"]
    original_le_main
  end
end
#==============================================================================
# ■ DataManager
#------------------------------------------------------------------------------
# 　处理存档。
#==============================================================================
module DataManager
  # 写入两个全局变量
  def self.save_game_without_rescue(index)
    File.open(make_filename(index), "wb") do |file|
      $game_system.on_before_save
      Marshal.dump(make_save_header, file)
      Marshal.dump(make_save_contents, file)
      @last_savefile_index = index
      Marshal.dump($le_run,file)
      Marshal.dump($le_close_table,file)
    end
    return true
  end
  def self.load_game_without_rescue(index)
    File.open(make_filename(index), "rb") do |file|
      Marshal.load(file)
      extract_save_contents(Marshal.load(file))
      reload_map_if_updated
      @last_savefile_index = index
      $le_run         = Marshal.load(file)
      $le_close_table = Marshal.load(file)
    end
    return true
  end
end
#==============================================================================
#                                 The End
#==============================================================================