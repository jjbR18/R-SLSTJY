
//==============================================================================
// RS_GraphicsMenu.js
//==============================================================================

var Imported = Imported || {};
Imported.RS_GraphicsMenu = true;

/*:
 *
 * @plugindesc 此插件允許您將選單指定為圖片<RS_GraphicsMenu>
 * @author biud436(翻譯 : ReIris)
 *
 * @param Menu Image
 * @text 選單圖片
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc 選擇要使用的選單圖片
 * @default inter_alpha
 *
 * @param Starting Position
 * @text 開始位置
 *
 * @param Start X
 * @text 開始 X 座標
 * @parent Starting Position
 * @type string
 * @desc 設置選單的開始 X 座標
 * @default Graphics.boxWidth / 2 - ((W * RECT.length) / 2)
 *
 * @param Start Y
 * @text 開始 Y 座標
 * @parent Starting Position
 * @type string
 * @desc 設置選單的開始 y 座標
 * @default Graphics.boxHeight / 2 - H / 2
 *
 * @param Rect
 * @text 區域
 *
 * @param W
 * @text 寬
 * @type number
 * @desc 設置按鈕大小，單位為像素(px)。
 * （將包括名為「W」的文字，將其替換為實際值。）
 * @default 78
 * @min 1
 *
 * @param H
 * @text 高
 * @type number
 * @desc 設置按鈕大小，單位為像素(px)。
 * （將包括名為「H」的文字，將其替換為實際值。）
 * @default 78
 * @min 1
 *
 * @param Menu Rect
 * @text 選單區域設定
 * @parent Rect
 * @type struct<MenuRect>[]
 * @desc 指定選單區域設定
 * @default ["{\"x\":\"0\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"78\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"156\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"234\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}","{\"x\":\"312\",\"y\":\"[\\\"0\\\",\\\"78\\\"]\",\"width\":\"78\",\"height\":\"78\"}"]
 *
 * @param Menu Index
 * @text 選單命令索引
 * @type string[]
 * @desc 指定區域的畫面名稱。
 * （將文本設置為 exit 時可退出遊戲）
 * @default ["Scene_Status","Scene_Item","Scene_Skill","Scene_Map","Scene_Map"]
 *
 * @help
 * =============================================================================
 * 使用方法
 * -----------------------------------------------------------------------------
 * - 選單命令索引，按鈕大小和區域設定
 * 首先，使用插件參數指定某個畫面名稱，然後必須設置按鈕的尺寸以及適合的按鈕圖像。
 *
 * 默認按鈕的寬度和高度為 78 px，它們已在名為「寬」和「高」的插件參數中設置。
 *
 * 請注意，這些值也應與「選單區域設定」中使用的「寬」和「高」相同。
 *
 * - 選單面板的起始位置
 * 起始位置將設置為適應畫面中心。
 * 默認值如下：
 *
 *  RS.GraphicsMenu.Params.startX = Graphics.boxWidth / 2 - ((W * menu.length) / 2)
 *  RS.GraphicsMenu.Params.startY = Graphics.boxHeight / 2 - H / 2
 *
 * 'W'和'H'是基於插件參數的自定義按鈕大小值。
 *
 * =============================================================================
 * 版權聲明 (圖像)
 * -----------------------------------------------------------------------------
 * 所包含素材的作者如下（選單圖像）：
 *  numg94 - http://blog.naver.com/numg94
 *
 *
 * 作者：biud436
 * 網站：https://biud436.tistory.com/notice/21
 * 聯絡：https://biud436.tistory.com/89
 * =============================================================================
 * Version Log
 * -----------------------------------------------------------------------------
 * 2017.07.11 (v1.0.0) - First Release
 * 2017.12.19 (v1.0.1) - Added a new feature that can exit the game.
 * 2017.12.29 (v1.0.2) - Fixed the issue that is not changed the button index when using a button index is six or above.
 * 2018.01.29 (v1.0.3) - Added a new feature that runs the eval code when pressing certain menu button.
 * 2018.11.16 (v1.0.4) - Open Menu Screen command is not supported.
 */

/*~struct~MenuRect:
 *
 * @param x
 * @text X 座標
 * @type number
 * @decimals 0
 * @desc 在選單中指定按鈕的 x 座標。
 * @default 0
 * @min 0
 *
 * @param y
 * @text Y 座標
 * @type number[]
 * @desc 請注意，每個屬性都顯示圖像的 y 座標。
 * 如果屬性索引為1（從0開始），當滑鼠懸停時它將顯示圖形。
 * @default ["0","78"]
 *
 * @param width
 * @text 寬
 * @type number
 * @desc 圖像內的單一按鈕寬度。
 * @default 78
 * @min 1
 *
 * @param height
 * @text 高
 * @type number
 * @desc 圖像內的單一按鈕高度。
 * @default 78
 * @min 1
 *
 */

var RS = RS || {};
RS.GraphicsMenu = RS.GraphicsMenu || {};
RS.GraphicsMenu.Params = RS.GraphicsMenu.Params || {};
RS.Utils = RS.Utils || {};

(function () {

  var parameters = $plugins.filter(function (i) {
    return i.description.contains('<RS_GraphicsMenu>');
  });

  parameters = (parameters.length > 0) && parameters[0].parameters;

  RS.Utils.jsonParse = function (str) {
    var retData = JSON.parse(str, function (k, v) {
      try { return RS.Utils.jsonParse(v); } catch (e) { return v; }
    });
    return retData;
  };

  RS.GraphicsMenu.Params.RECT = RS.Utils.jsonParse(parameters['Menu Rect']);
  RS.GraphicsMenu.Params.MENU = RS.Utils.jsonParse(parameters['Menu Index']);

  //============================================================================
  // Game_System
  //============================================================================

  var alias_Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    alias_Game_System_initialize.call(this);
    // 세이브 데이터에 저장을 하기 위해 여기에 변수를 정의했습니다.
    this._menuMouseX = 0;
    this._menuMouseY = 0;
  };

  Object.defineProperties(Game_System.prototype, {
    // 마우스 X 좌표
    menuMouseX: {
      get: function() {
          return this._menuMouseX;
      },
      set: function(value) {
          this._menuMouseX = value;
      },
      configurable: true
    },
    // 마우스 Y 좌표
    menuMouseY: {
      get: function() {
          return this._menuMouseY;
      },
      set: function(value) {
          this._menuMouseY = value;
      },
      configurable: true
    }
  });

  //============================================================================
  // TouchInput
  //============================================================================

  var alias_TouchInput_onMouseMove = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    alias_TouchInput_onMouseMove.call(this, event);
    // 마우스의 움직임이 감지되면 마우스 좌표를 업데이트 합니다
    // 일반 마우스 좌표는 업데이트를 하지 않으므로 호환성을 위해 그대로 두었습니다
    var x = Graphics.pageToCanvasX(event.pageX);
    var y = Graphics.pageToCanvasY(event.pageY);
    if($gameSystem) {
      $gameSystem.menuMouseX = x;
      $gameSystem.menuMouseY = y;
    }
  };

  //============================================================================
  // Scene_LinearMenu
  //============================================================================

  function Scene_LinearMenu() {
    this.initialize.apply(this, arguments);
  };

  Scene_LinearMenu.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_LinearMenu.prototype.constructor = Scene_LinearMenu;

  // Static 변수...
  Scene_LinearMenu.INDEX = 0;

  Scene_LinearMenu.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._touched = false;
    this.createImage();
  };

  Scene_LinearMenu.prototype.start = function () {
    Scene_MenuBase.prototype.start.call(this);
  };

  Scene_LinearMenu.prototype.createHelpWindow = function () {
  };

  Scene_LinearMenu.prototype.terminate = function () {
    Scene_MenuBase.prototype.terminate.call(this);
  };

  Scene_LinearMenu.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
    this.updateIndex();
    this.processExit();
  };

  Scene_LinearMenu.prototype.right = function () {
    var RECT = RS.GraphicsMenu.Params.RECT;
    Scene_LinearMenu.INDEX = (Scene_LinearMenu.INDEX + 1).mod(RECT.length);
    SoundManager.playCursor();
  };

  Scene_LinearMenu.prototype.left = function () {
    var RECT = RS.GraphicsMenu.Params.RECT;
    Scene_LinearMenu.INDEX = (Scene_LinearMenu.INDEX - 1).mod(RECT.length);
    SoundManager.playCursor();
  };

  Scene_LinearMenu.prototype.updateIndex = function () {

    // 키 체크
    if(Input.isTriggered('right')) {
      this.right();
    }
    if(Input.isTriggered('left')) {
      this.left();
    }
    if(Input.isTriggered('ok')) {
      this.selectScene();
    }

    // 마우스 및 터치
    this.isSelectedInTouchInput();

    // 현재 인덱스에 맞는 영역으로 재설정한다.
    this.setRect(this._rect[Scene_LinearMenu.INDEX], Scene_LinearMenu.INDEX);

  };

  Scene_LinearMenu.prototype.isSelectedInTouchInput = function () {

    var menu = RS.GraphicsMenu.Params.MENU;
    if(!menu) return;

    var W = parseInt(parameters['W']);
    var H = parseInt(parameters['H']);
    var x = RS.GraphicsMenu.Params.startX;
    var y = RS.GraphicsMenu.Params.startY;
    var width = Math.floor(W * menu.length);
    var height = H;
    var mx = $gameSystem.menuMouseX || 0;
    var my = $gameSystem.menuMouseY || 0;

    // 인덱스 값 : (마우스 좌표 - 메뉴 시작 위치) / 메뉴의 폭
    var index = Math.floor( (mx - x) / W );
    var previousIndex = Scene_LinearMenu.INDEX;

    // 범위 내에 있는 지 확인
    if(mx > x && my > y && mx < (x + width) && my < (y + height)) {
      Scene_LinearMenu.INDEX = index.clamp(0, menu.length - 1);
      if(TouchInput.isTriggered()) this.selectScene();
    }

    // 커서 사운드 재생
    if(previousIndex !== Scene_LinearMenu.INDEX && !this._touched) {
      SoundManager.playCursor();
      this._touched = true;
    } else {
      this._touched = false;
    }

  };

  Scene_LinearMenu.prototype.selectScene = function () {
    var sceneObject = RS.GraphicsMenu.Params.MENU[Scene_LinearMenu.INDEX];
    var self = this;
    if(sceneObject.endsWith(':exit')) {
      setTimeout(function () {
        self._touched = false;
        SoundManager.playOk();
        SceneManager.exit();
      }, 0);
      return;
    }
    if(sceneObject.match(/(?:EVAL[ ]*:[ ]*)(.*)/i)) {
      try {
        this._touched = false;
        eval(RegExp.$1);
        SoundManager.playOk();
      } catch(e) {
        console.warn(e);
      }
    }
    if(typeof window[sceneObject] === 'function') {
      // push : 현재 메뉴 씬을 메뉴 스택에 누적
      this._touched = false;
      SceneManager.push(window[sceneObject]);
      SoundManager.playOk();
    }
  };

  Scene_LinearMenu.prototype.processExit = function () {
    if(Scene_Map.prototype.isMenuCalled.call(this)) {
      // goto : 메뉴 스택에 누적하지 않고 씬 오브젝트 생성
      this._touched = false;
      SceneManager.goto(Scene_Map);
      SoundManager.playCancel();
    }
  };

  Scene_LinearMenu.prototype.loadBitmap = function (x, y, w, h, index) {
    // 드로우 콜을 줄이기 위해 하나의 이미지만 사용
    var sprite = new Sprite(ImageManager.loadPicture(parameters['Menu Image']));
    var H = parseInt(parameters['H']);
    sprite.setFrame(x, y, w, h);
    this.addChild(sprite);
    return sprite;
  };

  Scene_LinearMenu.prototype.createImage = function () {
    var RECT = RS.GraphicsMenu.Params.RECT;
    var W = parseInt(parameters['W']);
    var H = parseInt(parameters['H']);

    RS.GraphicsMenu.Params.startX = eval(parameters['Start X']);
    RS.GraphicsMenu.Params.startY = eval(parameters['Start Y']);

    this._rect = [];

    for (var i = 0; i < RECT.length; i++) {
      var imageRect = RECT[i];
      if(!imageRect) continue;
      this._rect[i] = this.loadBitmap(imageRect.x, 0, imageRect.width, imageRect.height);
      this._rect[i].x = RS.GraphicsMenu.Params.startX + imageRect.x;
      this._rect[i].y = RS.GraphicsMenu.Params.startY + 0;
    }
    this.setRect(this._rect[Scene_LinearMenu.INDEX], Scene_LinearMenu.INDEX);
  };

  /**
   * @method setRect
   * @param {Object} rect
   * @param {Number} i
   */
  Scene_LinearMenu.prototype.setRect = function (rect, index) {
    var dRect = RS.GraphicsMenu.Params.RECT;
    var H = 78;

    // 선택된 메뉴를 마우스 오버 상태의 이미지로 변경
    rect.setFrame(dRect[index].x, H, dRect[index].width, dRect[index].height);

    for (var i = 0; i < dRect.length; i++) {

      // 선택된 메뉴가 아니라면 모두 일반 이미지로 변경
      if(i === Scene_LinearMenu.INDEX) continue;
      this._rect[i].setFrame(dRect[i].x, 0, dRect[i].width, dRect[i].height);

    }

  };

  //============================================================================
  // Scene_Map
  //============================================================================
  Scene_Map.prototype.callMenu = function() {
    SoundManager.playOk();
    SceneManager.push(Scene_LinearMenu);
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
  };

  Game_Interpreter.prototype.command351 = function() {
    if (!$gameParty.inBattle()) {
        SceneManager.push(Scene_LinearMenu);
        Window_MenuCommand.initCommandPosition();
    }
    return true;
  };


})();