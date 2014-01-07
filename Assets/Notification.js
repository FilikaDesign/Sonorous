static var h: int = 30;
static var mh:int = 20;
static var isNotClosed:boolean = true;
static var notPosY:int = Screen.height;
static var notificationRect:LTRect = new LTRect( 0, notPosY,Screen.width, h );

static function message(str:String) {
	
	GUI.BeginGroup (notificationRect.rect);
	GUI.color.a = 0.9;
	GUI.skin.box.normal.background = GUITextures.tex_box_bg_hover();
	
	GUI.Box(Rect(0, 0, Screen.width, h),"");
	GUI.skin.box.normal.background =  GUITextures.tex_box_bg();
	GUI.color.a = 1;
	//GUI.skin.label.alignment = TextAnchor.MiddleCenter;
	GUI.Label(Rect(mh,0,Screen.width-mh*2,h),str);
	//GUI.skin.label.alignment = TextAnchor.MiddleLeft;
	GUI.EndGroup ();
}

static function showNotification() {
	if(isNotClosed) {
		notPosY = Screen.height-h;
		LeanTween.move( notificationRect, Vector2(0, notPosY), 0.25 ).setOnComplete( tweenFinished );
		isNotClosed =  !isNotClosed;
	}
}

static function tweenFinished () {
	notPosY = notPosY+h;
	LeanTween.move( notificationRect, Vector2(0, notPosY), 0.25 ).setDelay(5f).setOnComplete(tweenClosedFinised);
	
}


static function tweenClosedFinised () {
	isNotClosed =  !isNotClosed;
}