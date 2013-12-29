#pragma strict

// Import Array List Class
// Reference http://forum.unity3d.com/threads/69281-Resizeable-array-for-javascript-Arraylist
import System.Collections.Generic;



private var wall 		: GameObject;
private var floor 		: GameObject;

private var mouseScreen : Vector3 = new Vector3(0,0,0);
private var mouseWorld 	: Vector3 = new Vector3(0,0,0);
private var offSet 		: Vector3 = new Vector3(0,0,0);
	

private var woodThickness : float = 1;

private var parameters : List.<Hashtable> = new List.<Hashtable>();
private var moduls : List.<GameObject> = new List.<GameObject>();


private var variableScript : Element;

//drag edilen nesnenin koordinatı
private var tempPosition : Vector3 = new Vector3(0,0,0);
private var draggingObject : GameObject;
private var preDraggingObj:GameObject;
private var draggingElementId : int = -1;


private var snapFactorX	: float = 5;
private var snapFactorY	: float = 2;
private var cameraShift : float = 5;
private var snapEnable 	: boolean = true;

// GUI
private var iSwitch:boolean = true;  
private var guiState:String = "default";
private var guiNotification:String = "";

// toggle state
private var inch2:boolean = false;
private var inch8:boolean = false;

// Scroll Position
var scrollPosition : Vector2 = Vector2.zero;

private var elementSize:String = "0x0";
private var elementType:String = "default";
private var elementF:String = "none";
private var elementFU:String = "none";
private var elementFD:String = "none";
private var elementL:String = "none";
private var elementR:String = "none";
private var elementB:String = "none";
private var elementBO:String = "none";
private var elementT:String = "none";

private var w:int = 240;
private var ml:int = 5;
private var mt:int = 8;
private var bMargin:int = 5;
private var tfH:int = 20;

public var sonorousGUISkin:GUISkin;
//

var setRoomSize : boolean = false;
private var textWidth:String = "800";
private var textHeight:String = "300";
var logo:Texture2D;

// Modul Item Images
var m1:Texture2D;

//private var prevHighlighted : GameObject;
private var prevHighlightedId : int;
private var modulDestroyed:boolean = false;

private var ww:float;
private var hh:float;

function Start () {
	
	//camera positioning
	this.transform.position = Vector3(90,150,-300);
	this.transform.Rotate(15,-5,0);
	
	// Make a game object
	
	var lightGameObject : GameObject = new GameObject("The Light");
	
	// Add the light component
	lightGameObject.AddComponent(Light);
	
	// Set color and position
	lightGameObject.light.color = Color.white;
	lightGameObject.light.type = LightType.Directional;
	lightGameObject.light.intensity = 0.4;
	
	// Set the position (or any transform property) after
	// adding the light component.
	lightGameObject.transform.position = Vector3(0, 500, 0);
	lightGameObject.transform.Rotate(40, 5, 200);
	
	//point light
	var pointLightGameObject : GameObject = new GameObject("The Point One");
	
	// Add the light component
	pointLightGameObject.AddComponent(Light);
	// Set color and position
	pointLightGameObject.light.color = Color.white;
	pointLightGameObject.light.type = LightType.Point;
	pointLightGameObject.light.intensity = 1;
	pointLightGameObject.light.range = 130;
	
	// Set the position (or any transform property) after
	// adding the light component.
	pointLightGameObject.transform.position = Vector3(60, 140, -31);
	pointLightGameObject.transform.Rotate(40, 5, 200);
	
	
	//create Background Wall and Floor
	ww = float.Parse(textWidth);
	hh = float.Parse(textHeight);
	
	wall = GameObject.CreatePrimitive(PrimitiveType.Cube);
	wall.name = "Wall";
	var wallBoxCollider : BoxCollider = wall.GetComponent("BoxCollider");
	wallBoxCollider.enabled = false;
	wall.transform.position = Vector3(0,hh*0.5,10);
	wall.transform.localScale = Vector3(ww,2,hh);
	wall.transform.Rotate(90,0,0);
	wall.renderer.material.mainTexture = Resources.Load("wall", Texture2D);
	wall.renderer.material.mainTextureScale = Vector2 (11,11);
	
	//floor
	floor = GameObject.CreatePrimitive(PrimitiveType.Cube);
	floor.name = "Floor";
	var floorBoxCollider : BoxCollider = floor.GetComponent("BoxCollider");
	floorBoxCollider.enabled = false;
	floor.transform.position = Vector3(0,-1,-hh*0.5+10);
	floor.transform.localScale = Vector3(ww,2,hh);
	floor.transform.Rotate(0,0,0);
	floor.renderer.material.mainTexture = Resources.Load("wooden-floor-texture", Texture2D);
	floor.renderer.material.mainTextureScale = Vector2 (11,11);

	
	//create Parameter Data
	var myStuffTex:Hashtable = {"elementId":0,
						"elementType":"EX",
						"Front":"H3375_ST22",
                        "FrontUp":"200s",
                        "FrontDown":"200s",
                        "Back":"H3375_ST22",
                        "Left":"H3375_ST22",
                        "Right":"H3375_ST22",
                        "Bottom":"H3375_ST22",
                        "Top":"200s",
                        "Hole":0,
                        "nFrontFace":1,
                        "w":130,
                        "h":40,
                        "depth":50,
                        "x":0,
                        "y":20,
                        "isRigid":1,
                        "baseHeight":0
                        };
                        
    var myStuffTex2:Hashtable = {"elementId":1,
   						"elementType":"EX",
    					"Front":"H3375_ST22",
                        "FrontUp":"200s",
                        "FrontDown":"200s",
                        "Back":"H3375_ST22",
                        "Left":"H3375_ST22",
                        "Right":"H3375_ST22",
                        "Bottom":"H3375_ST22",
                        "Top":"200s",
                        "Hole":1,
                        "nFrontFace":1,
                        "w":130,
                        "h":40,
                        "depth":50,
                        "x":130,
                        "y":0,
                        "isRigid":1,
                        "baseHeight":0
                        };
                        
    var myStuffTex3:Hashtable = {"elementId":2,
    					"elementType":"ED",
    					"Front":"H3375_ST22",
                        "FrontUp":"200s",
                        "FrontDown":"200s",
                        "Back":"H3375_ST22",
                        "Left":"H3375_ST22",
                        "Right":"H3375_ST22",
                        "Bottom":"H3375_ST22",
                        "Top":"200s",
                        "Hole":0,
                        "nFrontFace":2,
                        "w":65,
                        "h":40,
                        "depth":50,
                        "x":260,
                        "y":40,
                        "isRigid":1,
                        "baseHeight":0
                        };
                        
    var myStuffTex4:Hashtable = {"elementId":3,
    					"elementType":"ED",
    					"Front":"H3375_ST22",
                        "FrontUp":"200s",
                        "FrontDown":"200s",
                        "Back":"H3375_ST22",
                        "Left":"H3375_ST22",
                        "Right":"H3375_ST22",
                        "Bottom":"H3375_ST22",
                        "Top":"200s",
                        "Hole":0,
                        "nFrontFace":2,
                        "w":65,
                        "h":40,
                        "depth":50,
                        "x":-65,
                        "y":60,
                        "isRigid":1,
                        "baseHeight":0
                        };   
                        
                        
	addModul(myStuffTex,"0");
	addModul(myStuffTex2,"1");
	addModul(myStuffTex3,"2");
	addModul(myStuffTex4,"3");                                        
    //////
     
	
	
}

/* ADD MODUL METHOD */
function addModul(modulParams:Hashtable, id:String) {
	
	parameters.Add(modulParams);
	
	var eleman : GameObject = new GameObject("Kutu"+id);
	eleman.AddComponent("Element");
	
	
	var other : Element = eleman.GetComponent("Element");
	other.params = parameters[parameters.Count-1];
	
	moduls.Add(eleman);

}

function Update () {
	if(setRoomSize) {
	var mainCamera = Camera.main;
	var hit : RaycastHit;
	
	//gizmo
	
	
	Debug.DrawLine (Vector3 (0, 0, 0), Vector3 (100, 0, 0), Color.red);
	Debug.DrawLine (Vector3 (0, 0, 0), Vector3 (0, 100, 0), Color.blue);
	Debug.DrawLine (Vector3 (0, 0, 0), Vector3 (0, 0, -100), Color.green);	
	

	if (Input.GetMouseButtonDown (0) && iSwitch){
	
		if( Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),  hit ) ) {
		
			 if(hit.rigidbody.gameObject.GetComponent("BoxCollider")){
				draggingObject = hit.collider.gameObject;
				
				tempPosition = hit.transform.position;
				
				mouseScreen = Vector3(Input.mousePosition.x,Input.mousePosition.y,-1 * mainCamera.transform.position.z);
				
				mouseWorld = mainCamera.ScreenToWorldPoint(mouseScreen);
				
				offSet = mouseWorld-hit.transform.position;		
			
				
				/* GUI Parameter */	
				variableScript = draggingObject.GetComponent("Element");
				draggingElementId = variableScript.elementID;
				
				var w:int = parameters[draggingElementId]["w"];
				var h:int = parameters[draggingElementId]["h"];
				var d:int = parameters[draggingElementId]["depth"];
				elementType = parameters[draggingElementId]["elementType"];
				elementSize = w.ToString() + "x" + h.ToString() + "x" + d.ToString();
				elementF 	= parameters[draggingElementId]["Front"];
				elementFU 	= parameters[draggingElementId]["FrontUp"];
				elementFD 	= parameters[draggingElementId]["FrontDown"];
				elementB 	= parameters[draggingElementId]["Back"];
				elementL 	= parameters[draggingElementId]["Left"];
				elementR 	= parameters[draggingElementId]["Right"];
				elementBO 	= parameters[draggingElementId]["Bottom"];
				elementT 	= parameters[draggingElementId]["Top"];
				
				ToggleLight(moduls[draggingElementId]);
			}
		}else{
			//clear Highlighted Elements
			if(draggingElementId != -1 && moduls.Count != 0){
				if(!modulDestroyed)
					var allChildren = moduls[prevHighlightedId].GetComponentsInChildren(Transform);
	
				for (var child : Transform in allChildren) {
  				// do whatever with child transform here
	  				if(child.renderer != null){
		    			if(child.renderer.gameObject.name !="Base"){
			    			child.renderer.material.color = Color.white;
			   			 }
			    		else{
			   				 child.renderer.material.color = Color.gray;
			   			 }
		    			variableScript.highlighted = false;
	    			}
	      		}
	      		//draggingElementId = -1;
	      		//prevHighlightedId = -1;
			}
		}
			
	
	}
	
	if (Input.GetMouseButton (0)&& iSwitch){
	
		if(draggingObject){
		
	
			mouseScreen = Vector3(Input.mousePosition.x,Input.mousePosition.y,-1 * mainCamera.transform.position.z);
				
			mouseWorld = mainCamera.ScreenToWorldPoint(mouseScreen);
				
			variableScript = draggingObject.GetComponent("Element");
			
			draggingElementId = variableScript.elementID;
					
					
			if(snapEnable){
				draggingObject.transform.position.x = (snapFactorX * Mathf.Floor((mouseWorld.x- offSet.x)/snapFactorX)); 
	       		draggingObject.transform.position.y = (snapFactorY * Mathf.Floor((mouseWorld.y- offSet.y)/snapFactorY)); 
	       		
	       		//Debug.Log(snapX);
					
			}
			else{
				draggingObject.transform.position.x = mouseWorld.x - offSet.x;
				draggingObject.transform.position.y = mouseWorld.y - offSet.y;		
			}		
			
			
			
	    	var dragBaseHeight : int = parameters[draggingElementId]["baseHeight"];
			
			if(draggingObject.transform.position.y - draggingObject.transform.localScale.y * 0.5 - dragBaseHeight
				< floor.gameObject.transform.position.y - floor.gameObject.transform.localScale.y * 0.5){
				draggingObject.transform.position.y = draggingObject.transform.localScale.y * 0.5 + dragBaseHeight;			
			}
			
			draggingObject.transform.position.z = 0;
		}
	   

	}
	
	if (Input.GetMouseButtonUp (0)&& iSwitch){
	
		if(draggingObject){
			
			
			
			if(variableScript.isColliding == 1){
				//Collide ederken mouse burakırsa
				draggingObject.transform.position = tempPosition;
				//draggingObject.transform.position.x = snapX;
				//draggingObject.transform.position.y = snapY;
			} 
			
			parameters[draggingElementId]["x"] = draggingObject.transform.position.x;
			parameters[draggingElementId]["y"] = draggingObject.transform.position.y;
			
			RulesEngine();
			
			preDraggingObj = moduls[draggingElementId];
			draggingObject = null;
		}
	}
	
}
}



/*************************************************************************************************
**************** GUI *****************************************************************************
**************************************************************************************************/
private var guiRect:LTRect = new LTRect( Screen.width, 0,w, Screen.height );
private var welcomeRect = new LTRect(0,0,Screen.width,Screen.height);

private var guiPosX:int = Screen.width;
function OnGUI() {
	
	GUI.skin = sonorousGUISkin;
	/*
	scrollPosition = GUI.BeginScrollView (Rect (10,300,130,100),
	scrollPosition, Rect (0, 0, 220, 200));	
	
	GUI.Button (Rect (0,0,100,20), "Top-left");
	GUI.Button (Rect (0,21,100,20), "Top-left");
	GUI.Button (Rect (0,42,100,20), "Top-left");
	GUI.Button (Rect (0,63,100,20), "Top-left");
	GUI.Button (Rect (0,84,100,20), "Top-left");
	
	GUI.EndScrollView ();
	
	GUI.Box(Rect(0,100,200,200),m1);
	*/
	// Enable Keyboard Interaction
	initKeyboardInteraction();
	
	// Menu Buttons
	if(GUI.Button(Rect(0,0,100,25),"Inspector")) {
		guiState = "default";
		openInspector();
	}
	
	// Screen Shot Button
	else if(GUI.Button(Rect(101,0,100,25),"Screen Shot")) {
		Application.CaptureScreenshot("Screenshot.png",1);
	}
	
	// Delete Button
	else if(GUI.Button(Rect(202,0,100,25),"Delete Modul")) {
		Destroy(moduls[draggingElementId]);
		modulDestroyed = true;
	}
	
	// Delete All Button
	else if(GUI.Button(Rect(303,0,100,25),"Delete All")) {
		for(var i:int=0; i < moduls.Count; i++) {
			Destroy(moduls[i]);
		}
		modulDestroyed = true;
	}
	
	// Set Room Size
	else if(GUI.Button(Rect(404,0,100,25),"Room Size")){
		setRoomSize = false;
	}
	
	
	/* GUI State */
	var customButton : GUIStyle;
	GUI.BeginGroup (guiRect.rect);
	
	//GUI.backgroundColor = Color(0,0,0,0.7);
	GUI.color.a = 0.9;
	GUI.Box(Rect(0, 0, w, Screen.height),"");
	
	
	if(guiState == "default") {
		GUI.Label(Rect(ml,ml,w,20),"Element Type");
		GUI.Label(Rect(ml,ml+tfH,w,20),"Element Size");
		GUI.Label(Rect(ml,ml+tfH*2,w,20),"Texture Front");
		GUI.Label(Rect(ml,ml+tfH*3,w,20),"Texture FrontUp");
		GUI.Label(Rect(ml,ml+tfH*4,w,20),"Texture FrontDown");
		GUI.Label(Rect(ml,ml+tfH*5,w,20),"Texture Back");
		GUI.Label(Rect(ml,ml+tfH*6,w,20),"Texture Left");
		GUI.Label(Rect(ml,ml+tfH*7,w,20),"Texture Right");
		GUI.Label(Rect(ml,ml+tfH*8,w,20),"Texture Bottom");
		GUI.Label(Rect(ml,ml+tfH*9,w,20),"Texture Top");
		
		var startx:int = 122;
					
		GUI.Label(Rect(ml+startx,ml,w,20),": "+ elementType);
		GUI.Label(Rect(ml+startx,ml+tfH,w,20),": "+ elementSize);
		GUI.Label(Rect(ml+startx,ml+tfH*2,w,20),": " + elementF);
		GUI.Label(Rect(ml+startx,ml+tfH*3,w,20),": " + elementFU);
		GUI.Label(Rect(ml+startx,ml+tfH*4,w,20),": " + elementFD);
		GUI.Label(Rect(ml+startx,ml+tfH*5,w,20),": " + elementB);
		GUI.Label(Rect(ml+startx,ml+tfH*6,w,20),": " + elementL);
		GUI.Label(Rect(ml+startx,ml+tfH*7,w,20),": " + elementR);
		GUI.Label(Rect(ml+startx,ml+tfH*8,w,20),": " + elementBO);
		GUI.Label(Rect(ml+startx,ml+tfH*9,w,20),": " + elementT);
		
		if(GUI.Button(Rect(ml,ml+tfH*10+mt,w-ml*2,20),"Add Element")) {
			var myStuffTex5:Hashtable = {"elementId":4,
							"elementType":"EX",
							"Front":"H3375_ST22",
	                        "FrontUp":"200s",
	                        "FrontDown":"200s",
	                        "Back":"H3375_ST22",
	                        "Left":"H3375_ST22",
	                        "Right":"H3375_ST22",
	                        "Bottom":"H3375_ST22",
	                        "Top":"200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":130,
	                        "h":80,
	                        "depth":50,
	                        "x":-230,
	                        "y":20,
	                        "isRigid":1,
	                        "baseHeight":0
	                        };
	        var id:String= (moduls.Count-1).ToString();
	        addModul(myStuffTex5,id);
		}
	}else{
		if(guiState == "select_base") {
			GUI.Label(Rect(ml,ml,w,20),"UYARI");
			GUI.Label(Rect(ml,ml+tfH,w,Screen.height),guiNotification);
			
			if(GUI.Toggle(Rect(ml,ml+tfH*5,100,30),inch2," 2 cm")) {
				inch2 = true;
				inch8 = false;
				GameObject.Find(preDraggingObj.name).SendMessage("createBase",2);
				preDraggingObj.transform.position.y = 2 + preDraggingObj.transform.localScale.y*0.5;	
				parameters[draggingElementId]["y"] = 2 + preDraggingObj.transform.localScale.y*0.5;
			}
			
			if(GUI.Toggle(Rect(ml+100,ml+tfH*5,200,30),inch8," 8 cm")) {
				inch2 = false;
				inch8 = true;
				GameObject.Find(preDraggingObj.name).SendMessage("createBase",8);
				preDraggingObj.transform.position.y = 8 + preDraggingObj.transform.localScale.y*0.5;	
				parameters[draggingElementId]["y"] = 8 + preDraggingObj.transform.localScale.y*0.5;
			}
		}
	}
	
	
	GUI.EndGroup ();
	
	// Welcome Screen
	initSetRoomSize();
	
}

/*
*** OPEN INSPECTOR PANEL
*/
function openInspector() {
	if(iSwitch) {
		guiPosX = Screen.width-w;
	}else{
		guiPosX = guiPosX+w;
		resetGUIParams();
	}
	LeanTween.move( guiRect, Vector2(guiPosX, 0), 0.25 );
	//d.setOnComplete( tweenFinished );
	
	iSwitch =  !iSwitch;
}

/*
*** RESET GUI PAREMETERS
*/
function resetGUIParams() {
	inch2 = false;
	inch8 = false;
}

function tweenFinished() {
	//LeanTween.move( guiRect, Vector2(Screen.width, 0), 0.25 ).setOnComplete(tweenFinished);
}

/*
*** INIT ROOM SIZE
*/
function initSetRoomSize() {

	if(!setRoomSize) {
		GUI.color.a = 0.9;
		GUI.BeginGroup(welcomeRect.rect);
		GUI.Box(Rect(0,0,Screen.width,Screen.height),"");
		GUI.Box(Rect((Screen.width-logo.width)*0.5,50,logo.width,logo.height),logo);
		textWidth = GUI.TextField(Rect(Screen.width*0.5-35,150,70,20),textWidth);
		textHeight = GUI.TextField(Rect(Screen.width*0.5-35,174,70,20),textHeight);
		
		if(GUI.Button(Rect(Screen.width*0.5-50,210,100,30),"OK")) {
			wall.transform.localScale = Vector3(parseInt(textWidth),2,parseInt(textHeight));
			wall.transform.position = Vector3(0,parseInt(textHeight)*0.5,10);
			floor.transform.localScale = Vector3(parseInt(textWidth),2,parseInt(textHeight));
			floor.transform.position = Vector3(0,-1,-parseInt(textHeight)*0.5+10);
			setRoomSize = true;			
		}
		
		GUI.EndGroup();
	}
}

function setCameraPosition(direction : String) {

	switch(direction){
	
		case "zoomin":
			this.gameObject.transform.position.z = this.gameObject.transform.position.z + cameraShift;	
			break;
		case "zoomout":
			this.gameObject.transform.position.z = this.gameObject.transform.position.z - cameraShift;	
			break;
		case "up":
			this.gameObject.transform.position.y = this.gameObject.transform.position.y + cameraShift;	
			break;
		case "down":
			this.gameObject.transform.position.y = this.gameObject.transform.position.y - cameraShift;	
			break;
		case "right":
			this.gameObject.transform.position.x = this.gameObject.transform.position.x + cameraShift;	
			break;
		case "left":
			this.gameObject.transform.position.x = this.gameObject.transform.position.x - cameraShift;	
			break;
		default :
			break;
	
	
	}
	
	
			
	//RulesEngine();
	
	//parameters[draggingElementId]["x"] = preDraggingObj.transform.position.x;
	//parameters[draggingElementId]["y"] = preDraggingObj.transform.position.y;
	
	
}

/* Keyboard Control */
function initKeyboardInteraction() {
	
	if(setRoomSize) {
		if (Event.current.Equals (Event.KeyboardEvent ("up")) ) {
			
			setCameraPosition("zoomin");
			
		}else if(Event.current.Equals (Event.KeyboardEvent ("down")) ) {
		
			setCameraPosition("zoomout");
		
		
		}else if(Event.current.Equals (Event.KeyboardEvent ("left")) ) {
			setCameraPosition("left");
		
		}else if(Event.current.Equals (Event.KeyboardEvent ("right")) ) {
		
			setCameraPosition("right");
		
		}
		else if(Event.current.Equals (Event.KeyboardEvent ("z")) || Event.current.Equals (Event.KeyboardEvent ("Z"))) {
		
			setCameraPosition("up");
		
		}
		else if(Event.current.Equals (Event.KeyboardEvent ("x")) || Event.current.Equals (Event.KeyboardEvent ("X"))) {
		
			setCameraPosition("down");
		
		}
	}else{
		if(Event.current.Equals (Event.KeyboardEvent ("return"))) {
		
			wall.transform.localScale = Vector3(parseInt(textWidth),2,parseInt(textHeight));
			floor.transform.localScale = Vector3(parseInt(textWidth),2,parseInt(textHeight));
			setRoomSize = true;
		
		}
	}
}
function RulesEngine(){

		var othersX	: int;
		var othersY : int;
		var othersH : int;
		var othersW : int;
		
		var deltaW : int;
		
		var considerX : int;
		var considerY : int;
		var considerH : int;
		var considerW : int;
		
		considerX = parameters[draggingElementId]["x"];
		considerY = parameters[draggingElementId]["y"];
		considerH = parameters[draggingElementId]["h"];
		considerW = parameters[draggingElementId]["w"];

		// Rule 1 : EX ÜST ÜSTE OLMAZ
		
		if(parameters[draggingElementId]["elementType"] == "EX"){
			
			Debug.Log("1 : EX rule");
			for(var i : int = 0; i < parameters.Count; i++){
			
				if(i != draggingElementId && parameters[i]["elementType"] == "EX"){
				
					othersX = parameters[i]["x"];
					othersY = parameters[i]["y"];
					othersH = parameters[i]["h"];
					othersW = parameters[i]["w"];
					
					if(Mathf.Min(othersX,considerX) == othersX){
						
							//others solda
							deltaW = othersW;
						
					}else{
							//others solda
							deltaW = considerW;
						
					}
					
				
					if(//conditions
					
					(Mathf.Abs(othersY - considerY) == considerH) //yukarda aşağıda
					
					&&
					
					(Mathf.Abs(othersX - considerX) < deltaW) // arasında
					
					
					){
						
						Debug.Log("1 : EX ust uste olmaaaaz");
						break;
					}
				
				}
				
			}
		
		}
		
		// Rule 2 : ED ÜST ÜSTE OLMAZ
		
		if(parameters[draggingElementId]["elementType"] == "ED"){
			
			Debug.Log("2 : ED rule");
			for(var j : int = 0; j < parameters.Count; j++){
			
				if(j != draggingElementId && parameters[j]["elementType"] == "ED"){
					
					othersX = parameters[j]["x"];
					othersY = parameters[j]["y"];
					othersH = parameters[j]["h"];
					othersW = parameters[j]["w"];
					
					if(Mathf.Min(othersX,considerX) == othersX){
						
							//others solda
							deltaW = othersW;
						
					}else{
							//others solda
							deltaW = considerW;
						
					}
		
					if(//conditions

					
					(Mathf.Abs(othersY - considerY) == considerH) //yukarda aşağıda
					
					&&
					
					(Mathf.Abs(othersX - considerX) < deltaW) // arasında
					
					
					){
						
						Debug.Log("2 : ED ust uste olmaaaaz");
						break;
					}
				
				}
				
			}
		
		}
		
		// Rule 3 : ED EX’in ÜSTÜNE GELEBİLİR. TAM TERSİ OLAMAZ. = EX ED'in üstüne gelemez
		
		if(parameters[draggingElementId]["elementType"] == "EX"){
		
			Debug.Log("3 : ED EX rule");
		
			for(var k : int = 0; k < parameters.Count; k++){
			
				if(k != draggingElementId && parameters[k]["elementType"] == "ED"){
						//static ED'ler
						othersX = parameters[k]["x"];
						othersY = parameters[k]["y"];
						othersH = parameters[k]["h"];
						othersW = parameters[k]["w"];
						
						
						
						if(Mathf.Min(othersX,considerX) == othersX){
						
							//others solda
							deltaW = othersW;
						
						}else{
							//others solda
							deltaW = considerW;
						
						}
						
						if(//conditions

					
						(considerY - othersY == considerH) //yukarda 
						
						&&
						
						(Mathf.Abs(othersX - considerX) < deltaW) // arasında
						
						
						){
							
							Debug.Log("3 : EX ED'in üstüne gelemez");
							break;
						}
				
				
				}
			
			
			}
		}
		
		if(parameters[draggingElementId]["elementType"] == "ED"){
		
			Debug.Log("3 : ED EX rule");
		
			for(var m : int = 0; m < parameters.Count; m++){
			
				if(m != draggingElementId && parameters[m]["elementType"] == "EX"){
						//static EX'ler
						othersX = parameters[m]["x"];
						othersY = parameters[m]["y"];
						othersH = parameters[m]["h"];
						othersW = parameters[m]["w"];
						
						
						
						if(Mathf.Min(othersX,considerX) == othersX){
						
							//others solda
							deltaW = othersW;
						
						}else{
							//others solda
							deltaW = considerW;
						
						}
						
						if(//conditions

					
						(othersY - considerY == considerH) //yukarda aşağıda
						
						&&
						
						(Mathf.Abs(othersX - considerX) < deltaW) // arasında
						
						
						){
							
							Debug.Log("3 : EX ED'in üstüne gelemez");
							break;
						}
				
				
				}
			
			
			}
		}
		
		// Rule 4 : ED YERDE OLAMAZ.
		
		if(parameters[draggingElementId]["elementType"] == "ED"){
			
			if(considerY - considerH * 0.5 < snapFactorY){
				Debug.Log("4 : ED YERDE OLAMAZ");
			
			}
		
		}
		
		// Rule 5 : EX DUVARDA OLAMAZ (ASILAMAZ). HER ZAMAN YERDE OLMALI
		// Rule 6 : Yerdeki tüm ürünler (EX) bir baza seçeneğine sahip olmak zorunda.
		
		if(parameters[draggingElementId]["elementType"] == "EX"){
			
			if(considerY - considerH * 0.5 >= snapFactorY){
				Debug.Log("5 : EX DUVARDA OLAMAZ (ASILAMAZ). HER ZAMAN YERDE OLMALI");
			
			}else{
				//EX YERDE DEMEK
				guiNotification="Yerdeki tüm ürünler (EX) bir baza seçeneğine sahip olmak zorunda. Lütfen baza yüksekliği seçin.";
				guiState = "select_base";
				openInspector();
				//Debug.Log("6 : Yerdeki tüm ürünler (EX) bir baza seçeneğine sahip olmak zorunda.");
				
				
			}
		
		}
}

function ToggleLight( go : GameObject ){


	//highlight
	var allChildren = moduls[draggingElementId].GetComponentsInChildren(Transform);
 	

 	variableScript = moduls[draggingElementId].GetComponent("Element");
		
	for (var child : Transform in allChildren) {
    // do whatever with child transform here
	    if(child.renderer != null){
	    
		    child.renderer.material.color = Color.red;
		    variableScript.highlighted = true;
		   
	    }
	       
	}
 	if(prevHighlightedId != draggingElementId){
	 	//de-highlight
	 	if(!modulDestroyed)
			allChildren = moduls[prevHighlightedId].GetComponentsInChildren(Transform);
		
		for (var child : Transform in allChildren) {
	    // do whatever with child transform here
		    if(child.renderer != null){
		    	if(child.renderer.gameObject.name !="Base"){
			    child.renderer.material.color = Color.white;
			    
			    }
			    else{
			    child.renderer.material.color = Color.gray;
			    
			    }
			    variableScript.highlighted = false;
			   
		    }
		       
		}
		
		prevHighlightedId = draggingElementId;
		modulDestroyed = false;
	
	}
}