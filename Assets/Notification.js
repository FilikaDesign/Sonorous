static var h: int = 30;
static var mh:int = 20;
static var isNotClosed:boolean = true;
static var notPosY:int = Screen.height;
static var notificationRect:LTRect = new LTRect( 0, notPosY,Screen.width, h );
static var notCount:int = 0;
static var textH:int = 45;
static var w:int = 240;
static var selectionGridInt : int = 0;
	
static var notiArr:Array = ["- EX Cabinets cannot be superposed",
							"- ED Cabinets cannot be superposed",
							"- EX Cabinets cannot be onto ED Cabinets",
							"- ED Cabinets cannot be on the floor",
							"- EX Cabinets cannot be on the wall",
							"- EX Cabinets must have a base option",
							"- ED-U Cabinets should be above the shoulder",
							"- ED-F Cabinets should be below the shoulder"];
							
static var notiBool:Array = ["0","0","0","0","0","0","0","0"];

static function checkForWarning() {
	if(notiBool[0]=="1" || notiBool[1]=="1" || notiBool[2]=="1" || notiBool[3]=="1" || notiBool[4]=="1" || notiBool[5]=="1" || notiBool[6]=="1" || notiBool[7]=="1") {
		
		return true;
	}else{
		return false;
	}
}

static function checkNotiCount() {

	for(var i:int = 0; i < notiBool.Count; i++) {
		if(notiBool[i] == "1") {
			var str:String = notiArr[i];
			GUI.Label(Rect(5,5+(notCount*textH),w-15,textH),str);
			notCount++;
		}
	}
	
	notCount = 0;
}

static function showNotificationList() {
	GUI.skin.button.fontSize = 10;
	for(var i:int = 0; i < notiBool.Count; i++) {
		if(notiBool[i] == "1") {
			var str:String = notiArr[i];
			if(GUI.Button(Rect(5,5+(notCount*textH),w-10,textH),str)) {
				GameObject.Find(Camera.main.name).SendMessage("HighlightErrorsEngine",i);
			}
			notCount++;
		}
	}
	GUI.skin.button.fontSize = 12;
	notCount = 0;

}

static function message(str:String) {
	
	GUI.BeginGroup (notificationRect.rect);
	GUI.color.a = 0.9;
	GUI.skin.box.normal.background = GUITextures.tex_box_bg_hover();
	
	GUI.Box(Rect(0, 0, Screen.width, h),"");
	GUI.skin.box.normal.background =  GUITextures.tex_box_bg();
	GUI.color.a = 1;
	GUI.skin.label.alignment = TextAnchor.MiddleCenter;
	GUI.skin.label.alignment = TextAnchor.MiddleLeft;
	GUI.skin.label.wordWrap = false;
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

static function closeNotification() {
	notPosY = notPosY+h;
	LeanTween.move( notificationRect, Vector2(0, notPosY), 0.25 );
	isNotClosed =  !isNotClosed;
}