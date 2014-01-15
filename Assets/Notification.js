static var h: int = 30;
static var mh:int = 20;
static var isNotClosed:boolean = true;
static var notPosY:int = Screen.height;
static var notificationRect:LTRect = new LTRect( 0, notPosY,Screen.width, h );
static var notCount:int = 0;
static var textH:int = 35;
static var w:int = 240;
static var selectionGridInt : int = 0;

static var notiArr:Array = ["- EX Type Cabinets cannot be superposed",
							"- ED Type Cabinets cannot be superposed",
							"- EX Type Cabinets cannot be placed onto ED Cabinets",
							"- ED Type Cabinets cannot be on the floor",
							"- EX Type Cabinets cannot be on the wall",
							"- EX Type Cabinets have to have a base option"];
							
static var notiBool:Array = ["0","0","0","0","0","0"];

static function checkForWarning() {
	if(notiBool[0]=="1" || notiBool[1]=="1" || notiBool[2]=="1" || notiBool[3]=="1" || notiBool[4]=="1" || notiBool[5]=="1") {
		
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
for(var i:int = 0; i < notiBool.Count; i++) {
		if(notiBool[i] == "1") {
			var str:String = notiArr[i];
			GUI.Label(Rect(5,5+(notCount*textH),w-10,textH),str);
			notCount++;
		}
	}
	
	notCount = 0;
	/*
	if(notiBool[0] == "1") {
		GUI.Label(Rect(5,5+(0*textH),w-10,textH),notiArr[0]);
	}
	
	if(notiBool[1] == "1") {
		GUI.Label(Rect(5,5+(1*textH),w-10,textH),notiArr[1]);
	}
	
	if(notiBool[2] == "1") {
		GUI.Label(Rect(5,5+(2*textH),w-10,textH),notiArr[2]);
	}
	
	if(notiBool[3] == "1") {
		GUI.Label(Rect(5,5+(3*textH),w-10,textH),notiArr[3]);
	}
	
	if(notiBool[4] == "1") {
		GUI.Label(Rect(5,5+(4*textH),w-10,textH),notiArr[4]);
	}
	
	if(notiBool[5] == "1") {
		GUI.Label(Rect(5,5+(5*textH),w-10,textH),notiArr[5]);
	}
	*/
}

static function message(str:String) {
	
	GUI.BeginGroup (notificationRect.rect);
	GUI.color.a = 0.9;
	GUI.skin.box.normal.background = GUITextures.tex_box_bg_hover();
	
	GUI.Box(Rect(0, 0, Screen.width, h),"");
	GUI.skin.box.normal.background =  GUITextures.tex_box_bg();
	GUI.color.a = 1;
	GUI.skin.label.alignment = TextAnchor.MiddleCenter;
	GUI.Label(Rect(mh,0,Screen.width-mh*2,h),str);
	GUI.skin.label.alignment = TextAnchor.MiddleLeft;
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