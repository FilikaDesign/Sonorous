#pragma strict

// Import Array List Class
// Reference http://forum.unity3d.com/threads/69281-Resizeable-array-for-javascript-Arraylist
import System.Collections.Generic;
import System.IO;

private var secretKey="x91{7&85,[cN5.S";//server side
private var baseNoti:String = "All cabinets (EX type) should have a base underneath. Please, set the base height.";

private var wall 		: GameObject;
private var floor 		: GameObject;

private var mouseScreen : Vector3 = new Vector3(0,0,0);
private var mouseWorld 	: Vector3 = new Vector3(0,0,0);
private var offSet 		: Vector3 = new Vector3(0,0,0);


	

public var woodThickness : float = 1;

public var parameters : List.<Hashtable> = new List.<Hashtable>();
private var moduls : List.<GameObject> = new List.<GameObject>();
private var thumbs : List.<Hashtable> = new List.<Hashtable>();
private var thumbTypes : Array = new Array();

// TEXTURE THUMBS
private var textures : Array = new Array();

private var variableScript : Element;
private var vs : Element;

//drag edilen nesnenin koordinatı
private var tempPosition : Vector3 = new Vector3(0,0,0);
private var draggingObject : GameObject;
private var preDraggingObj:GameObject;
private var draggingElementId : int = -1;


private var snapFactorX	: float = 5;
private var snapFactorY	: float = 5;
private var cameraShift : float = 150;
private var snapEnable 	: boolean = true;

private var bh:int;
// GUI
private var iSwitch:boolean = true;  
private var isGUIClosed:boolean = true;
private var guiState:String = "default";
private var guiNotification:String = "";
private var w:int = 240;
private var btnW:int = 40;
private var ml:int = 5;
private var mt:int = 8;
private var bMargin:int = 5;
private var tfH:int = 20;
private var tglH:int = 20;
public var sonorousGUISkin:GUISkin;
private var guiRect:LTRect = new LTRect( Screen.width, 0,w, Screen.height );
private var guiRectBounds:Rect = new Rect( Screen.width-w, 0,w, Screen.height );
private var welcomeRect = new LTRect(0,0,Screen.width,Screen.height);

private var guiPosX:int = Screen.width; 

// toggle state
private var inch2:boolean = false;
private var inch8:boolean = false;
// Material Change
private var setFront:boolean = false;
private var setFrontUp:boolean = false;
private var setFrontDown:boolean = false;
private var setLeft:boolean = false;
private var setRight:boolean = false;
private var setBack:boolean = false;
private var setBottom:boolean = false;
private var setTop:boolean = false;

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

//
private var baseAllH:int = 0;

var setRoomSize : boolean = false;
private var textWidth:String = "800";
private var textHeight:String = "300";

//private var prevHighlighted : GameObject;
private var prevHighlightedId : int = -1;
private var modulDestroyed:boolean = false;

private var ww:float;
private var hh:float;

// Mouse Drag Change Scene view with mouse
private var preMPosX:float;
private var MPosX:float;

private var preMPosY:float;
private var MPosY:float;
private var alphaDelay:float = 0.5f;
private var alphaRoomSize:float = 0.85f;

//grid
private var showGrid : boolean = false;
static var lineMaterial : Material;
private var gridMan : GameObject;

private var pdfGenerated:boolean = false;
function Start () {
	
	//camera positioning
	resetCameraPos();
	//Camera.main.fieldOfView -=8;
	//Camera.main.depth = 3;
	Camera.main.backgroundColor = Color(0,0,0);
	
	// Make a game object
	//Point light
	var lightGameObject : GameObject = new GameObject("The Light");
	lightGameObject.gameObject.name = "Light One";
	
	// Add the light component
	lightGameObject.AddComponent(Light);
	
	// Set color and position
	lightGameObject.light.color = Color.white;
	lightGameObject.light.type = LightType.Point;
	lightGameObject.light.intensity = 0.21;
	
	// Set the position (or any transform property) after
	// adding the light component.
	lightGameObject.transform.position = Vector3(-220, 100, -300);
	lightGameObject.light.range = 120000;
	//lightGameObject.transform.Rotate(40, 5, 200);
	
	var lightGameObjectTwo : GameObject = new GameObject("The Light");
	lightGameObjectTwo.gameObject.name = "Light Two";
	
	// Add the light component
	lightGameObjectTwo.AddComponent(Light);
	
	// Set color and position
	lightGameObjectTwo.light.color = Color.white;
	lightGameObjectTwo.light.type = LightType.Point;
	lightGameObjectTwo.light.intensity = 0.21;
	
	// Set the position (or any transform property) after
	// adding the light component.
	lightGameObjectTwo.transform.position = Vector3(220, 100, -300);
	lightGameObjectTwo.light.range = 120000;
	//lightGameObject.transform.Rotate(40, 5, 200);
	
	
	//Directional light
	var cameraLightGameObject : GameObject = new GameObject("Camera Light");
	cameraLightGameObject.gameObject.name = "Light Three";
	// Add the light component
	cameraLightGameObject.AddComponent(Light);
	// Set color and position
	cameraLightGameObject.light.color = Color.white;
	cameraLightGameObject.light.type = LightType.Directional;
	cameraLightGameObject.light.intensity = 0.2;
	cameraLightGameObject.transform.Rotate(270,0,0);
	
	// Set the position (or any transform property) after
	// adding the light component.
	cameraLightGameObject.transform.parent = this.transform;
	
	//Directional light
	var cameraLightGameObjectTwo : GameObject = new GameObject("Camera Light");
	cameraLightGameObjectTwo.gameObject.name = "Light Three";
	// Add the light component
	cameraLightGameObjectTwo.AddComponent(Light);
	// Set color and position
	cameraLightGameObjectTwo.light.color = Color.white;
	cameraLightGameObjectTwo.light.type = LightType.Directional;
	cameraLightGameObjectTwo.light.intensity = 0.2;
	cameraLightGameObjectTwo.transform.Rotate(65,0,0);
	
	// Set the position (or any transform property) after
	// adding the light component.
	cameraLightGameObjectTwo.transform.position = Vector3(220, 100, -300);
	
	
	//create Background Wall and Floor
	ww = float.Parse(textWidth);
	hh = float.Parse(textHeight);
	
	wall = GameObject.CreatePrimitive(PrimitiveType.Cube);
	wall.name = "Wall";
	var wallBoxCollider : BoxCollider = wall.GetComponent("BoxCollider");
	wallBoxCollider.enabled = false;
	wall.transform.position = Vector3(0,hh*0.5,0);
	wall.transform.localScale = Vector3(ww,2,hh);
	wall.transform.Rotate(90,0,0);
	wall.renderer.material.mainTexture = Resources.Load("textures/floortexture", Texture2D);
	wall.renderer.material.mainTextureScale = Vector2 (11,11);
	//floor
	floor = GameObject.CreatePrimitive(PrimitiveType.Cube);
	floor.name = "Floor";
	var floorBoxCollider : BoxCollider = floor.GetComponent("BoxCollider");
	floorBoxCollider.enabled = false;
	floor.transform.position = Vector3(0,-1,-hh*0.5);
	floor.transform.localScale = Vector3(ww,2,hh);
	floor.transform.Rotate(0,0,0);
	floor.renderer.material.mainTexture = Resources.Load("textures/floortexture", Texture2D);
	floor.renderer.material.mainTextureScale = Vector2 (11,11);	
	
	/*
	thumbTypes = ["ed50-f","ed50-u","ex10-dd","ex10-f","ex10-fd","ex10-t","ex10-tf",
	"ex11-dd","ex11-f","ex11-fd","ex11-t","ex11-tf",
	"ex12-dd","ex12-dd","ex12-f","ex12-fd","ex12-t","ex12-tf",
	"ex20-d","ex20-dd","ex20-f","ex20-fd","ex20-t",
	"ex32-f"];*/
	
	thumbTypes = ["EX10-TF-BLK-8-A","EX10-T-BLK-8-A","EX10-FD-BLK-8-A","EX10-F-BLK-8-A","EX10-DD-BLK-8-A",
	"EX11-T-BLK-8-A","EX11-TF-BLK-8-A","EX11-FD-BLK-8-A","EX11-F-BLK-8-A","EX11-DD-BLK-8-A",
	"EX12-TF-BLK-8-A","EX12-T-BLK-8-A","EX12-FD-BLK-8-A","EX12-F-BLK-8-A","EX12-DD-BLK-8-A",
	"EX20-T-BLK-8-A","EX20-F-BLK-8-A","EX20-FD-BLK-8-A","EX20-DD-BLK-8-A","EX20-D-BLK-8-A",
	"EX32-F-BLK-2-A",
	"ED50-U-BLK-A","ED50-F-BLK-A"];
	
	// Load Thumbnails
	for(var p:int = 0; p < thumbTypes.Count; p++) {
		var hh:Hashtable = {"src":"thumbs/"+thumbTypes[p],"type":thumbTypes[p]};
		thumbs.Add(hh);
	}
	
	textures = ["textures/200s", "textures/black", "textures/capucino", "textures/graphit", "textures/H3375_ST22", "textures/regblack"];
	welcomeRect.alpha = 0;
	
	
}

/* ADD MODUL METHOD */
function addModul(modulParams:Hashtable, id:String) {
	
	parameters.Add(modulParams);
	parameters[parameters.Count-1]["elementId"] = parameters.Count-1;
	
	var eleman : GameObject = new GameObject("Kutu"+id);
	eleman.AddComponent("Element");
	
	
	var other : Element = eleman.GetComponent("Element");
	other.params = parameters[parameters.Count-1];

	moduls.Add(eleman);
	
	  
	

}

function changeBaseAll(baseH : int){

	for(var i:int = 0; i < moduls.Count; i++) {
			
		variableScript = moduls[i].GetComponent("Element");
		
		var tip:String = variableScript.elementType;
		
		
		
	
		if(tip == "EX") {
			
			// duvarları toparla
			/*if(baseAllH == 8){
		
				
				wall.transform.position.y = -8 + hh*0.5;
				floor.transform.position.y = -8 -1 ;
				
			}else{
				
				
				wall.transform.position.y = -2 + hh*0.5;
				floor.transform.position.y = -2 -1 ;
				
		
			}*/
			
			
			print(tip);
			wall.transform.position.y = -baseAllH + hh*0.5;
			floor.transform.position.y = -baseAllH -1 ;
		
			var mG : GameObject = moduls[i];			
            GameObject.Find(mG.name).SendMessage("changeBase",baseH);
			
		}
			
	}
	
	
	DebugEngine();


}

function Update () {

	if (Input.GetKeyDown(KeyCode.Escape)) {
        Application.Quit();
	}
		
	if(setRoomSize) {
		 
		if(!isGUIClosed) {
			if (guiRectBounds.Contains(Input.mousePosition))  
				iSwitch = false; else  iSwitch = true; 
		}
		
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
					vs = draggingObject.GetComponent("Element");
					draggingElementId = vs.elementID;
					
					//Debug.Log(parameters[0]["elementId"]);
					//Debug.Log("Moduls Len : "+moduls.Count + " / ");
					//Debug.Log("Current id : "+draggingElementId);
					var w:int = parameters[draggingElementId]["w"];
					var h:int = parameters[draggingElementId]["h"];
					var d:int = parameters[draggingElementId]["depth"];
					elementType = parameters[draggingElementId]["code"];
					elementSize = w.ToString() + "x" + h.ToString() + "x" + d.ToString();
					elementF 	= parameters[draggingElementId]["Front"];
					elementFU 	= parameters[draggingElementId]["FrontUp"];
					elementFD 	= parameters[draggingElementId]["FrontDown"];
					elementB 	= parameters[draggingElementId]["Back"];
					elementL 	= parameters[draggingElementId]["Left"];
					elementR 	= parameters[draggingElementId]["Right"];
					elementBO 	= parameters[draggingElementId]["Bottom"];
					elementT 	= parameters[draggingElementId]["Top"];
					
					Debug.Log("draggingElementId : "+draggingElementId);
					ToggleLight();

				}
			}else{
				clearAllHighlightedModuls();
			}
				
		
		}
		
		if (Input.GetMouseButton (0) && iSwitch){
		
			if(draggingObject){
			
		
				mouseScreen = Vector3(Input.mousePosition.x,Input.mousePosition.y,-1 * mainCamera.transform.position.z);
					
				mouseWorld = mainCamera.ScreenToWorldPoint(mouseScreen);
					
				vs = draggingObject.GetComponent("Element");
				
				draggingElementId = vs.elementID;
						
						
				if(snapEnable){
					draggingObject.transform.position.x = (snapFactorX * Mathf.Floor((mouseWorld.x- offSet.x)/snapFactorX)); 
		       		draggingObject.transform.position.y = (snapFactorY * Mathf.Floor((mouseWorld.y- offSet.y)/snapFactorY)); 
		       		
		       		//Debug.Log(draggingObject.transform.position);
						
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
		
		if (Input.GetMouseButtonUp (0) && iSwitch){
		
			if(draggingObject){
				
				
				
				if(vs.isColliding == 1){
					//Collide ederken mouse burakırsa
					draggingObject.transform.position = tempPosition;
					//draggingObject.transform.position.x = snapX;
					//draggingObject.transform.position.y = snapY;
				} 
				
				parameters[draggingElementId]["x"] = draggingObject.transform.position.x;
				parameters[draggingElementId]["y"] = draggingObject.transform.position.y;
				
				//RulesEngine();
				DebugEngine();
				returnStructure();
				
				preDraggingObj = moduls[draggingElementId];
				draggingObject = null;
				
				var textureF:String = parameters[draggingElementId]["Top"].ToString();
				var fNum:int = parameters[draggingElementId]["nFrontFace"];
				var codum:String = parameters[draggingElementId]["code"];
	
				setTextures(textureF,fNum ,codum,draggingElementId); 
				
			}
		}
		
		
		
	} // Set room size condition
	
	setMouseZoom();
}



/*************************************************************************************************
**************** GUI *****************************************************************************
**************************************************************************************************/

function OnGUI() {
	
	GUI.skin = sonorousGUISkin;
	
	
	
	// Enable Keyboard Interaction
	initKeyboardInteraction();
	
	// Menu Buttons
	// Check Menu state
	if(isGUIClosed) {
		GUI.skin.button.normal.background  = Resources.Load("GUISkin/sonorous_gui_button", Texture2D);
	}else{
		GUI.skin.button.normal.background = Resources.Load("GUISkin/sonorous_gui_button_hover", Texture2D);
	}
	
	if(GUI.Button(Rect(0,0,btnW,btnW),GUITextures.tex_inspector())) {
		if(guiState != "modul_edit")
			openInspector();
			
		guiState = "default";
	}
	
	GUI.skin.button.normal.background  = Resources.Load("GUISkin/sonorous_gui_button", Texture2D);

	// Load
	if(GUI.Button(Rect(btnW+1,0,btnW,btnW),GUITextures.tex_load())) {
		LoadState();
	}
	
	// Save
	else if(GUI.Button(Rect((btnW+1)*2,0,btnW,btnW),GUITextures.tex_save())) {
		guiState = "save";
		SaveState();
   		
	}
	
	
	// Screen Shot Button
	if(Notification.checkForWarning()) {
		GUI.color.a = 0.5;
	}else{
		GUI.color.a = 1.0;
	}
	//
	if(GUI.Button(Rect((btnW+1)*3,0,btnW,btnW),GUITextures.tex_export())) {
		//Application.CaptureScreenshot("Screenshot.png",1);
		if(!pdfGenerated) {
			pdfGenerated = true;
			guiState = "ids";
			BillofMaterials();
		}
	}
	GUI.color.a = 1;
	
	// Delete Button
	if(GUI.Button(Rect((btnW+1)*4,0,btnW,btnW),GUITextures.tex_delete())) {
		removeAndDestroyAt(draggingElementId);
	}
	
	// Delete All Button
	else if(GUI.Button(Rect((btnW+1)*5,0,btnW,btnW),GUITextures.tex_new_scene())) {
		guiState = "default";
		removeAndDestroy();
		resetGUIParams();
	}
	
	// Change Material
	else if(GUI.Button(Rect((btnW+1)*6,0,btnW,btnW),GUITextures.tex_material())) {
		guiState = "modul_edit";
		inch2 = false;
		inch8 = false;
		if(isGUIClosed)
			openInspector();
	}
	
	// Reset camera position
	else if(GUI.Button(Rect((btnW+1)*9,0,btnW,btnW),GUITextures.tex_reset())){
		resetCameraPos();
	}
	
	// Set Room Size
	else if(GUI.Button(Rect((btnW+1)*7,0,btnW,btnW),GUITextures.tex_room_size())){
		clearAllHighlightedModuls();
		setRoomSize = false;
		alphaDelay = 0f;
		alphaRoomSize = 0.85f;
	}
	
	if(isGUIClosed) {
		GUI.skin.button.normal.background  = Resources.Load("GUISkin/sonorous_gui_button", Texture2D);
	}else{
		if(guiState == "modul_warning")
			GUI.skin.button.normal.background = Resources.Load("GUISkin/sonorous_gui_button_hover", Texture2D);
	}
	// Warning Section
	// check For Warnings
	if(Notification.checkForWarning()) {
		if(GUI.Button(Rect((btnW+1)*8,0,btnW,btnW),GUITextures.tex_warning_on())) {
			guiState = "modul_warning";
			
			DebugEngine();
			
			if(isGUIClosed)
				openInspector();
		}
	}else{
		if(GUI.Button(Rect((btnW+1)*8,0,btnW,btnW),GUITextures.tex_warning_off())) {
		}
		Notification.notCount = 0;
	}
	
	
	
	if(guiState == "save") {
		popUpMessage("COMBINATION SAVED");
	}
	
	if(guiState == "ids") {
		popUpMessage("PDF SAVING...");
	}

		
	
	
	
	// Tooltip
	GUI.Label (Rect ((btnW+2)*10,3,200,40), GUI.tooltip);
	
	/* GUI State */
	var customButton : GUIStyle;
	GUI.BeginGroup (guiRect.rect);
	
	GUI.color.a = 0.9;
	GUI.Box(Rect(0, 0, w, Screen.height),"");
	
	
	if(guiState == "default") {
		
		
		var startx:int = 122;
	
		// Select Modul to Add Screen
		scrollPosition = GUI.BeginScrollView (Rect (ml,ml,w-12,Screen.height - ml - 5),
		scrollPosition, Rect (0, 0, 0, (134+ml)*(thumbs.Count-1)));	
		
		
		GUI.skin.button.normal.background  = GUITextures.load_thumb_bg(); 
		for(var t:int=0; t < thumbs.Count; t++) {
			if(GUI.Button(Rect( -50,(128+1)*t,320,128 ),GUITextures.load_tex(thumbs[t]["src"]))) {
				addMBox(thumbs[t]["type"]);
				
				
			}
			GUI.skin.label.normal.textColor = Color.black;
			GUI.skin.label.fontSize = 9;
			GUI.skin.label.alignment = TextAnchor.MiddleRight;
			var boxName : String = thumbTypes[t];
			GUI.Label(Rect(5,(128+1)*(t),w-38,20),boxName);
			GUI.skin.label.normal.textColor = Color.white;
			GUI.skin.label.fontSize = 12;
		}
		GUI.skin.button.normal.background  = GUITextures.tex_box_bg(); 
		GUI.EndScrollView ();
		
		
	}
	/*
	else if(guiState == "select_base") {
		
	}
	*/
	
	// Change Material GUI
	if(guiState == "modul_edit" && draggingElementId > -1 && moduls.Count > 0) {
		//resetGUIParams();
		
		var tex:String = "wall";
		
		var num:int = parameters[draggingElementId]["nFrontFace"];
		var minusFac:int = 0;
		
		GUI.Label(Rect(ml,ml,w,20),"Element Code");
		GUI.Label(Rect(ml,ml+tfH,w,20),"Element Size");
		GUI.Label(Rect(ml+122,ml,w,20),": "+ elementType.ToUpper());
		GUI.Label(Rect(ml+122,ml+tfH,w,20),": "+ elementSize);
		
		GUI.Label(Rect(ml,ml+tfH*2,w,tfH),"Click on Cabinet and select a texture");
		
		var tFloor:int = 0;
		var lastY:int = ml+tfH*3 ;
		var cType:String = parameters[draggingElementId]["code"];
		
		for(var te:int = 0; te < textures.Count; te++) {
			if(te % 2 == 0) {
				if(GUI.Button(Rect( ml,lastY + tFloor*(2+120),(w-ml*2)*0.5,120 ),GUITextures.load_tex(textures[te]))) 
				{	
					setTextures(textures[te],num,cType,draggingElementId);
				}
				tFloor++;
			}else {
				if(GUI.Button(Rect( ml*2+((w-ml*2)*0.5), lastY + (tFloor-1)*(2+120),(w-ml*2)*0.5,120 ),GUITextures.load_tex(textures[te]))) 
				{	
					setTextures(textures[te],num,cType,draggingElementId);
				}
			}
		}
		
		
		/// EX için baza seçimi
		
		var tipo : String = parameters[draggingElementId]["elementType"];
		
		if(tipo == "EX"){
			GUI.Label(Rect(ml,lastY + (tFloor)*(2+120),w,20),"UYARI");
			GUI.Label(Rect(ml,lastY + (tFloor)*(2+120)+tfH,w,77),baseNoti);
			
			if(GUI.Toggle(Rect(ml,lastY + (tFloor)*(2+120)+tfH*4+ml,100,30),inch2," 2 cm")) {
				
				
				variableScript = preDraggingObj.GetComponent("Element");
				
				baseAllH = 2;
				setElementCode();
				if(variableScript.baseHeight == 0){
					GameObject.Find(preDraggingObj.name).SendMessage("createBase",baseAllH);
					DebugEngine();
					wall.transform.position.y = -baseAllH + hh*0.5;
					floor.transform.position.y = -baseAllH -1 ;	
				    //parameters[draggingElementId]["y"] = 2 + preDraggingObj.transform.localScale.y*0.5;
				}else{
					if(!inch2)
						changeBaseAll(baseAllH);
				}
				inch2 = true;
				inch8 = false;
				
				clearAllHighlightedModuls();
				
			}
			
			if(GUI.Toggle(Rect(ml+100,lastY + (tFloor)*(2+120)+tfH*4+ml,200,30),inch8," 8 cm")) {
				
				
				variableScript = preDraggingObj.GetComponent("Element");
				
				baseAllH = 8;
				setElementCode();
				if(variableScript.baseHeight == 0){
					GameObject.Find(preDraggingObj.name).SendMessage("createBase",baseAllH);
					DebugEngine();
					wall.transform.position.y = -baseAllH + hh*0.5;
					floor.transform.position.y = -baseAllH - 1;	
					//parameters[draggingElementId]["y"] = 8 + preDraggingObj.transform.localScale.y*0.5;
				}else{
					if(!inch8)
						changeBaseAll(baseAllH);
				}
				
				inch2 = false;
				inch8 = true;
				
				clearAllHighlightedModuls();
			}
			
			
		}
	}
	
	else if(guiState == "modul_warning") {
		Notification.showNotificationList();
	}
	
	GUI.EndGroup ();
	
	
	GUI.skin.label.normal.textColor = Color.gray;
	GUI.skin.label.fontSize = 32;
		
	for(var g:int = 0; g < moduls.Count; g++) {
			//var screenPos : Vector3 = camera.WorldToScreenPoint (moduls[g].transform.position);
			//GUI.Label(Rect(screenPos.x,Screen.height-screenPos.y,30,30),(g+1).ToString());
		
			
			
	}
	/*
	if(guiState == "ids") {
		GUI.skin.label.normal.textColor = Color.gray;
		GUI.skin.label.fontSize = 32;
		
		for(var g:int = 0; g < moduls.Count; g++) {
			var screenPos : Vector3 = camera.WorldToScreenPoint (moduls[g].transform.position);
			GUI.Label(Rect(screenPos.x,Screen.height-screenPos.y,30,30),(g+1).ToString());
		}
		
		
		
		
	}
	*/
	GUI.skin.label.normal.textColor = Color.white;
	GUI.skin.label.fontSize = 12;
		
	Notification.message(guiNotification);
	// Welcome Screen
	initSetRoomSize();
	
	
	
}
/*
* POP UP MESSAGE WINDOW
*/
function popUpMessage( msg:String) {
	GUI.Box(Rect((Screen.width-300)*0.5, (Screen.height-100)*0.5, 300, 100),"");
	GUI.skin.label.alignment = TextAnchor.MiddleCenter;
	GUI.Label(Rect((Screen.width-300)*0.5, (Screen.height-100)*0.5,300,100),msg);
}

/*
* SET EDIT TEXTURES OF SELECTED MODUL
*/
function setTextures(tex:String,coverCount:int,cType:String,_id:int) {
	
	
	
	
	
	variableScript = moduls[_id].GetComponent("Element");
	
	var tip:String = (cType.Substring(5,cType.Length-5));
	
	
	
	if(coverCount==2) {
		if(tip != "tf") {
			variableScript.cubeFrontUp.renderer.material.mainTexture = Resources.Load(tex, Texture2D);
			parameters[_id]["FrontUp"] = tex;
			variableScript.params = parameters[_id];
		}
		
		variableScript.cubeFrontDown.renderer.material.mainTexture = Resources.Load(tex, Texture2D);
		parameters[_id]["FrontDown"] = tex;
		variableScript.params = parameters[_id];
	}
	if(coverCount==1){
		if(tip != "t") {
			//print("tex : "+tex);
			variableScript.cubeFront.renderer.material.mainTexture = Resources.Load(tex, Texture2D);
			parameters[_id]["Front"] = tex;
			variableScript.params = parameters[_id];
		}
	}
	
	variableScript.cubeLeft.renderer.material.mainTexture = Resources.Load(tex, Texture2D);
	parameters[_id]["Left"] = tex;
	
	variableScript.cubeRight.renderer.material.mainTexture = Resources.Load(tex, Texture2D);
	parameters[_id]["Right"] = tex;

	variableScript.cubeBack.renderer.material.mainTexture = Resources.Load(tex, Texture2D);
	parameters[_id]["Back"] = tex;

	variableScript.cubeBottom.renderer.material.mainTexture = Resources.Load(tex, Texture2D);
	parameters[_id]["Bottom"] = tex;

	variableScript.cubeTop.renderer.material.mainTexture = Resources.Load(tex, Texture2D);
	parameters[_id]["Top"] = tex;
	
	variableScript.params = parameters[_id];
	
	
	
	setElementCode();
}

function setElementCode() {
	var baseHg : String;
	var cType :String = parameters[draggingElementId]["code"];
	var decor:String = parameters[draggingElementId]["Top"];
	cType = cType.Substring(0,5);
	
	if(baseAllH == 0) {
		baseHg = "";
	}else{
		baseHg = baseAllH.ToString()+"-";
	}
	
	switch(decor) {
		case "textures/black":
		parameters[draggingElementId]["code"] = cType + parameters[draggingElementId]["cabinetDoor"] + "-" + "AMZ"  + "-" + baseHg + parameters[draggingElementId]["structure"];
		break;
		
		case "textures/regblack":
		parameters[draggingElementId]["code"] = cType + parameters[draggingElementId]["cabinetDoor"] + "-" + "BLK"  + "-" + baseHg + parameters[draggingElementId]["structure"];
		break;
		
		case "textures/capucino":
		parameters[draggingElementId]["code"] = cType + parameters[draggingElementId]["cabinetDoor"] + "-" + "CPN"  + "-" + baseHg + parameters[draggingElementId]["structure"];
		break;
		
		case "textures/H3375_ST22":
		parameters[draggingElementId]["code"] = cType + parameters[draggingElementId]["cabinetDoor"] + "-" + "OAK"  + "-" + baseHg + parameters[draggingElementId]["structure"];
		break;
		
		case "textures/200s":
		parameters[draggingElementId]["code"] = cType + parameters[draggingElementId]["cabinetDoor"] + "-" + "WHT"  + "-" + baseHg + parameters[draggingElementId]["structure"];
		break;
		
		case "textures/graphit":
		parameters[draggingElementId]["code"] = cType + parameters[draggingElementId]["cabinetDoor"] + "-" + "GRP"  + "-" + baseHg + parameters[draggingElementId]["structure"];
		break;
		
	}
	
	elementType = parameters[draggingElementId]["code"];
	
	
	
	setFrontUp = setFrontDown = setLeft = setRight = setBottom = setTop = setBack = setFront = false;
}
/* 
*** ADD SELECTED MODUL TO STGE AND SET ACTIVE
*/
function addMBox(type:String) {

    var idM:String = (moduls.Count).ToString();
    //Debug.Log(type);
    addModul(ModulsParams.type_Ex(type),idM);
   
    //draggingObject = moduls[moduls.Count-1];
}

/*
*** OPEN INSPECTOR PANEL
*/
function openInspector() {
	if(isGUIClosed) {
		guiPosX = Screen.width-w;
		
	}else{
		guiPosX = guiPosX+w;
		resetGUIParams();
	}
	LeanTween.move( guiRect, Vector2(guiPosX, 0), 0.5 ).setEase(LeanTweenType.easeOutExpo);
	//d.setOnComplete( tweenFinished );
	
	isGUIClosed =  !isGUIClosed;
}

function showInspector() {
	guiPosX = guiPosX-w;
	
	LeanTween.move( guiRect, Vector2(guiPosX, 0), 0.5 ).setEase(LeanTweenType.easeOutExpo);/*.setOnComplete( tweenFinished );*/
	
}

function hideInspector() {
	guiPosX = guiPosX+w;
	
	LeanTween.move( guiRect, Vector2(guiPosX, 0), 0.5 ).setEase(LeanTweenType.easeOutExpo);/*.setOnComplete( tweenFinished );*/
	
}
/*
function tweenFinished() {
	isGUIClosed =  !isGUIClosed;
	guiPosX = Screen.width-w;
	LeanTween.move( guiRect, Vector2(guiPosX, 0), 0.5 ).setEase(LeanTweenType.easeOutExpo);
}

*/
/*
*** RESET GUI PAREMETERS
*/
function resetGUIParams() {
	inch2 = false;
	inch8 = false;
	guiState = "default";
}


function clearAllHighlightedModuls() {
	//clear Highlighted Elements
	if(draggingElementId != -1 && moduls.Count > 0){
		
		var allChildren = moduls[prevHighlightedId].GetComponentsInChildren(Transform);

		for (var child : Transform in allChildren) {
		// do whatever with child transform here
			if(child.renderer != null){
			
    			if(child.renderer.gameObject.name =="Base"){
	    			child.renderer.material.color = Color.white;
	    			//child.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
	   			 }
	   			 else if(child.renderer.gameObject.name =="skin"){
	   			 	child.renderer.material.color = Color.black;
	   			 }else{
	   			 	child.renderer.material.color = Color.white;
	   			 	
	   				 
	   			 }
    			variableScript.highlighted = false;
    			
    			//print(child.renderer.gameObject.name);
			}
			
			
  		}
	}
}

/*
*** INIT ROOM SIZE
*/
function initSetRoomSize() {

	//if(!setRoomSize) {
	
		
	
	//GUI.color.a = 0.9;
	
	GUI.BeginGroup(welcomeRect.rect);
	GUI.Box(Rect(0,0,Screen.width,Screen.height),"");
	GUI.skin.box.normal.background = null;
	GUI.Box(Rect((Screen.width-GUITextures.tex_logo().width)*0.5,50,GUITextures.tex_logo().width,GUITextures.tex_logo().height),GUITextures.tex_logo());
	
	GUI.Label(Rect(Screen.width*0.5-70,150,70,20),"width");
	GUI.Label(Rect(Screen.width*0.5-76,174,70,20),"height");
	textWidth = GUI.TextField(Rect(Screen.width*0.5-35,150,70,20),textWidth);
	textHeight = GUI.TextField(Rect(Screen.width*0.5-35,174,70,20),textHeight);
	GUI.skin.box.normal.background = GUITextures.tex_box_bg();
	
	if(GUI.Button(Rect(Screen.width*0.5-50,210,100,30),"OK")) {
		alphaRoomSize = 0;
		alphaDelay = 0;
		ww = parseInt(textWidth);
		hh = parseInt(textHeight);
		wall.transform.localScale = Vector3(parseInt(textWidth),2,parseInt(textHeight));
		wall.transform.position = Vector3(0,parseInt(textHeight)*0.5,0);
		floor.transform.localScale = Vector3(parseInt(textWidth),2,parseInt(textHeight));
		floor.transform.position = Vector3(0,-1,-parseInt(textHeight)*0.5);

	}
	
	GUI.EndGroup();
	
	if(!LeanTween.isTweening(welcomeRect))
		LeanTween.alpha(welcomeRect,alphaRoomSize , 0.5f).setEase(LeanTweenType.easeOutExpo).setOnComplete(setBolFalse);
}

function setBolFalse() {
	setRoomSize = true;	
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
			this.gameObject.transform.position.y = this.gameObject.transform.position.y + cameraShift/15;	
			break;
		case "down":
			this.gameObject.transform.position.y = this.gameObject.transform.position.y - cameraShift/15;	
			break;
		case "right":
			this.gameObject.transform.position.x = this.gameObject.transform.position.x + cameraShift/15;	
			break;
		case "left":
			this.gameObject.transform.position.x = this.gameObject.transform.position.x - cameraShift/15;	
			break;
		default :
			break;
	
	
	}
}

/* Mouse Control */
// Todo control scene when mouse + cmd pressed
function setMouseZoom() {
	if(iSwitch) {
		this.gameObject.transform.position.z = this.gameObject.transform.position.z + Input.GetAxis("Mouse ScrollWheel")*(cameraShift+40);
			
		if(Input.GetKey(KeyCode.LeftApple) && Input.GetMouseButton) {
			
			//this.gameObject.transform.position = this.gameObject.transform.position + Input.mousePosition;
		}	
	}
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
		
		}else if(Event.current.Equals (Event.KeyboardEvent ("g")) || Event.current.Equals (Event.KeyboardEvent ("G"))) {
			showGrid = !showGrid;
			gridManToggle();
	
		}else if(Event.current.Equals (Event.KeyboardEvent ("e")) || Event.current.Equals (Event.KeyboardEvent ("e"))) {
		
			//pdfMaker.pdfC();
			//System.Diagnostics.Process.Start(Application.dataPath + "/bin/oscillator_debug.exe");
			
			
		}
		
		
		
	}else{
		if(Event.current.Equals (Event.KeyboardEvent ("return"))) {
		
			wall.transform.localScale = Vector3(parseInt(textWidth),2,parseInt(textHeight));
			floor.transform.localScale = Vector3(parseInt(textWidth),2,parseInt(textHeight));
			setRoomSize = true;
		
		}
	}
}

function ToggleLight(){

	//print(draggingElementId);
	//highlight
	var allChildren = moduls[draggingElementId].GetComponentsInChildren(Transform);
 	

 	variableScript = moduls[draggingElementId].GetComponent("Element");

	for (var child : Transform in allChildren) {
    // do whatever with child transform here
	    if(child.renderer != null){
	    
		    child.renderer.material.color = Color.green;
		    variableScript.highlighted = true;
		   
	    }
	       
	}
	
 	if(prevHighlightedId != draggingElementId && prevHighlightedId != -1){
	 	//de-highlight
	 	if(!modulDestroyed)
			allChildren = moduls[prevHighlightedId].GetComponentsInChildren(Transform);
		
		for (var child : Transform in allChildren) {
	    // do whatever with child transform here
		    if(child.renderer != null){
		    
		    	if(child.renderer.gameObject.name =="Base"){
	    			child.renderer.material.color = Color.white;
	    			//child.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
	   			 }
	   			 else if(child.renderer.gameObject.name =="skin"){
	   			 	child.renderer.material.color = Color.black;
	   			 }
	    		else{
	   				 child.renderer.material.color = Color.white;
	   				 
	   			 }
			    variableScript.highlighted = false;
			   
		    }
		}
	}
	
		if(prevHighlightedId == -1 ) {
			if(!modulDestroyed)
				allChildren = moduls[draggingElementId].GetComponentsInChildren(Transform);
		
			for (var child : Transform in allChildren) {
    		// do whatever with child transform here
		   		if(child.renderer != null){
		    
			    child.renderer.material.color = Color.green;
			    variableScript.highlighted = true;
			   
		    	}
	       
			}
		}
		
		prevHighlightedId = draggingElementId;
		modulDestroyed = false;
		
	
}

function screenIDSorter(){
		
	var screenIDs : List.<int> = new List.<int>();	
	
	var walk = 0;
		
	for(var i:int = 0; i < parameters.Count; i++) {
	
		variableScript = moduls[i].GetComponent("Element");
		
		var hu:String = parameters[i]["elementType"];
		if(parameters[i]["elementType"] == "EX"){
		
			//screenIDs.Add(i);
			parameters[i]["screenId"] = walk;
			variableScript.screenId = walk;
			walk ++;
		}
		
	}
	
	for(var ii:int = 0; ii < parameters.Count; ii++) {
	
		variableScript = moduls[ii].GetComponent("Element");
		
		if(parameters[ii]["elementType"] == "ED"){
		
			parameters[ii]["screenId"] = walk;
			variableScript.screenId = walk;
			walk ++;
		}
		
	}
	/*
	for(var p:int = 0; p < screenIDs.Count; p++) {
	print(screenIDs[p]);
	}
*/
		
}

function BillofMaterials(){
	
	
	
	screenIDSorter();
	pdfMaker.resetRows();
	
	// Show element ids on export //
	for(var m:int = 0; m < moduls.Count; m++) {
		variableScript = moduls[m].GetComponent("Element");
		
		variableScript.showIds();
		
		//print(parameters[m]["structure"]);
		// modul info to pdf maker
		pdfMaker.setRows(parameters[m]);
	}
	
	// Reset Cam Pos
	//resetCameraPos();
	setZoom();
	
	// Close GUI
	if(!isGUIClosed) {
		hideInspector();
		
		isGUIClosed = true;
	}
	
	yield WaitForSeconds(1.5);
	guiState = "default";
	
	// Hide Grid
	showGrid = false;
	yield WaitForEndOfFrame();
	
 
	
	pdfMaker.pdfC();
	
	pdfGenerated = false;
	
	for(var p:int = 0; p < moduls.Count; p++) {
		variableScript = moduls[p].GetComponent("Element");
		
		variableScript.hideIds();
	}
	
	resetCameraPos();
	
	
	
}

function SaveState(){

	
	var xmlDoc : XmlDocument = new XmlDocument();
	var CombinationXML : XmlElement = xmlDoc.CreateElement("Combination");
	xmlDoc.AppendChild(CombinationXML);
	var ElementsXML : XmlElement = xmlDoc.CreateElement("Elements");
	CombinationXML.AppendChild(ElementsXML);
	
	for(var i : int = 0; i < parameters.Count; i++){
			
		var ElementXML : XmlElement = xmlDoc.CreateElement("Element");
		ElementsXML.AppendChild(ElementXML);
		
		var elementIdXML : XmlElement = xmlDoc.CreateElement("elementId");
		ElementXML.AppendChild(elementIdXML);
		var elementId : int = parameters[i]["elementId"];
		elementIdXML.InnerText = elementId.ToString();
		
		var elementTypeXML : XmlElement = xmlDoc.CreateElement("elementType");
		ElementXML.AppendChild(elementTypeXML);
		var elementType : String = parameters[i]["elementType"];
		elementTypeXML.InnerText = elementType.ToString();
		
		var cabinetDoorXML : XmlElement = xmlDoc.CreateElement("cabinetDoor");
		ElementXML.AppendChild(cabinetDoorXML);
		var cabinetDoor : String = parameters[i]["cabinetDoor"];
		cabinetDoorXML.InnerText = cabinetDoor.ToString();
		
		var FrontXML : XmlElement = xmlDoc.CreateElement("Front");
		ElementXML.AppendChild(FrontXML);
		var Front : String = parameters[i]["Front"];
		FrontXML.InnerText = Front.ToString();
		
		var FrontUpXML : XmlElement = xmlDoc.CreateElement("FrontUp");
		ElementXML.AppendChild(FrontUpXML);
		var FrontUp : String = parameters[i]["FrontUp"];
		FrontUpXML.InnerText = FrontUp.ToString();
		
		var FrontDownXML : XmlElement = xmlDoc.CreateElement("FrontDown");
		ElementXML.AppendChild(FrontDownXML);
		var FrontDown : String = parameters[i]["FrontDown"];
		FrontDownXML.InnerText = FrontDown.ToString();
		
		var BackXML : XmlElement = xmlDoc.CreateElement("Back");
		ElementXML.AppendChild(BackXML);
		var Back : String = parameters[i]["Back"];
		BackXML.InnerText = Back.ToString();
		
		var LeftXML : XmlElement = xmlDoc.CreateElement("Left");
		ElementXML.AppendChild(LeftXML);
		var Left : String = parameters[i]["Left"];
		LeftXML.InnerText = Left.ToString();
		
		var RightXML : XmlElement = xmlDoc.CreateElement("Right");
		ElementXML.AppendChild(RightXML);
		var Right : String = parameters[i]["Right"];
		RightXML.InnerText = Right.ToString();
		
		var BottomXML : XmlElement = xmlDoc.CreateElement("Bottom");
		ElementXML.AppendChild(BottomXML);
		var Bottom : String = parameters[i]["Bottom"];
		BottomXML.InnerText = Bottom.ToString();
		
		var TopXML : XmlElement = xmlDoc.CreateElement("Top");
		ElementXML.AppendChild(TopXML);
		var Top : String = parameters[i]["Top"];
		TopXML.InnerText = Top.ToString();
		
		var HoleXML : XmlElement = xmlDoc.CreateElement("Hole");
		ElementXML.AppendChild(HoleXML);
		var Hole : int = parameters[i]["Hole"];
		HoleXML.InnerText = Hole.ToString();
		
		var nFrontFaceXML : XmlElement = xmlDoc.CreateElement("nFrontFace");
		ElementXML.AppendChild(nFrontFaceXML);
		var nFrontFace : int = parameters[i]["nFrontFace"];
		nFrontFaceXML.InnerText = nFrontFace.ToString();
		
		var wXML : XmlElement = xmlDoc.CreateElement("w");
		ElementXML.AppendChild(wXML);
		var w : int = parameters[i]["w"];
		wXML.InnerText = w.ToString();
		
		var hXML : XmlElement = xmlDoc.CreateElement("h");
		ElementXML.AppendChild(hXML);
		var h : int = parameters[i]["h"];
		hXML.InnerText = h.ToString();
		
		var depthXML : XmlElement = xmlDoc.CreateElement("depth");
		ElementXML.AppendChild(depthXML);
		var depth : int = parameters[i]["depth"];
		depthXML.InnerText = depth.ToString();
		
		var xXML : XmlElement = xmlDoc.CreateElement("x");
		ElementXML.AppendChild(xXML);
		var x : int = parameters[i]["x"];
		xXML.InnerText = x.ToString();
		
		var yXML : XmlElement = xmlDoc.CreateElement("y");
		ElementXML.AppendChild(yXML);
		var y : int = parameters[i]["y"];
		yXML.InnerText = y.ToString();
		
		var isRigidXML : XmlElement = xmlDoc.CreateElement("isRigid");
		ElementXML.AppendChild(isRigidXML);
		var isRigid : boolean = parameters[i]["isRigid"];
		isRigidXML.InnerText = isRigid.ToString();
		
		var baseHeightXML : XmlElement = xmlDoc.CreateElement("baseHeight");
		ElementXML.AppendChild(baseHeightXML);
		var baseHeight : int = parameters[i]["baseHeight"];
		baseHeightXML.InnerText = baseHeight.ToString();
		
		var codeXML : XmlElement = xmlDoc.CreateElement("code");
		ElementXML.AppendChild(codeXML);
		var code : String = parameters[i]["code"];
		codeXML.InnerText = code.ToString();
		
		var screenIDXML : XmlElement = xmlDoc.CreateElement("screenid");
		ElementXML.AppendChild(screenIDXML);
		var screenId : int = parameters[i]["screenId"];
		screenIDXML.InnerText = screenId.ToString();
		
		var structureXML : XmlElement = xmlDoc.CreateElement("structure");
		ElementXML.AppendChild(structureXML);
		var structure : String = parameters[i]["structure"];
		structureXML.InnerText = structure.ToString();

	}
	

	/*
	var path = EditorUtility.SaveFilePanel(
						"Save",
						"",
						"",
						"xml");
		
	xmlDoc.Save(path);
									
	*/
	xmlDoc.Save(Application.streamingAssetsPath+"/Save"+".xml");
	
	yield WaitForSeconds(1.5);
		guiState = "default";
   


}

/**
* DESTROY EVERYTHING
*/
function removeAndDestroy() {

	clearAllHighlightedModuls();
	
	for(var i:int=0; i < moduls.Count; i++) {
		Destroy(moduls[i]);
	}
	
	moduls.Clear();
	parameters.Clear();
	modulDestroyed = true;
	Notification.notCount = 0;
	for(var j:int=0; j < Notification.notiBool.Count;j++) {
		Notification.notiBool[j] = "0";
	}
	
}

/**
* DESTROY SELECTED MODUL
*/
function removeAndDestroyAt(rId:int) {
	
	if(moduls.Count > 0) {
		clearAllHighlightedModuls();
		prevHighlightedId = -1;
		Destroy(moduls[rId]);
		moduls.RemoveAt(rId);
		parameters.RemoveAt(rId);
		
		for(var m:int = 0; m < moduls.Count; m++) {
			variableScript = moduls[m].GetComponent("Element");
			variableScript.elementID = m;
			variableScript.updateElementId();
			parameters[m]["elementId"] = m;
			
		}
	
		modulDestroyed = true;
	}
}

function LoadState(){

  var myLoad : Combination = Combination.Load(Application.streamingAssetsPath+"/Save"+".xml");
	
  //Debug.Log(myLoad.Elements.Count);
			
  //Debug.Log(myLoad.Elements[0].Back);
  
  removeAndDestroy();
  
  for(var j:int=0; j < myLoad.Elements.Count; j++) {
  
  			var elementId : int = myLoad.Elements[j].elementId;
  			var elementType : String = myLoad.Elements[j].elementType;
  			var cabinetDoor : String = myLoad.Elements[j].cabinetDoor;
  			var Front : String = myLoad.Elements[j].Front;
  			var FrontUp : String = myLoad.Elements[j].FrontUp;
  			var FrontDown : String = myLoad.Elements[j].FrontDown;
  			var Back : String = myLoad.Elements[j].Back;
  			var Left : String = myLoad.Elements[j].Left;
  			var Right : String = myLoad.Elements[j].Right;
  			var Bottom : String = myLoad.Elements[j].Bottom;
  			var Top : String = myLoad.Elements[j].Top;
  			var Hole : int = myLoad.Elements[j].Hole;
  			var nFrontFace : int = myLoad.Elements[j].nFrontFace;
  			var w : int = myLoad.Elements[j].w;
  			var h : int = myLoad.Elements[j].h;
  			var depth : int = myLoad.Elements[j].depth;
  			var x : int = myLoad.Elements[j].x;
  			var y : int = myLoad.Elements[j].y;
  			var isRigid : String = myLoad.Elements[j].isRigid;//problem
  			var baseHeight : int = myLoad.Elements[j].baseHeight;
  			var code : String = myLoad.Elements[j].code;
  			var screenId : int = myLoad.Elements[j].screenId;
  			var structure : String = myLoad.Elements[j].structure;
  			
			var myStuffTex:Hashtable = {"elementId":elementId,
							"elementType":elementType,
							"cabinetDoor":cabinetDoor,
							"Front":Front,
	                        "FrontUp":FrontUp,
	                        "FrontDown":FrontDown,
	                        "Back":Back,
	                        "Left":Left,
	                        "Right":Right,
	                        "Bottom":Bottom,
	                        "Top":Top,
	                        "Hole":Hole,
	                        "nFrontFace":nFrontFace,
	                        "w":w,
	                        "h":h,
	                        "depth":depth,
	                        "x":x,
	                        "y":y,
	                        "isRigid":true,
	                        "baseHeight":baseHeight,
	                        "code":code,
	                        "screenId":screenId,
	                        "structure":structure
	                        };
	         var index = j.ToString();               
	         addModul(myStuffTex,index);
	         
	         
	         /**/   
	               
  }
  
 
  baseAllH = baseHeight;
  

}

function resetCameraPos(){
	
	//this.transform.position = Vector3(0 ,160,-400);
	
    Camera.main.fieldOfView = 15;
    Camera.main.farClipPlane = 4000;
	
	LeanTween.move(camera.main.gameObject,new Vector3(0 ,150,-1600),1f).setEase(LeanTweenType.easeOutExpo);

}

function setZoom(){
	
	//this.transform.position = Vector3(0 ,160,-400);
	
    Camera.main.fieldOfView = 15;
    Camera.main.farClipPlane = 4000;
	
	LeanTween.move(camera.main.gameObject,new Vector3(0 ,150,-1400),1f).setEase(LeanTweenType.easeOutExpo);

}


//show grid

static function CreateLineMaterial() {

	if( !lineMaterial ) {
	lineMaterial = new Material( "Shader \"Lines/Colored Blended\" {" +
	"SubShader { Pass { " +
	"    Blend SrcAlpha OneMinusSrcAlpha " +
	"    ZWrite Off Cull Off Fog { Mode Off } " +
	"    BindChannels {" +
	"      Bind \"vertex\", vertex Bind \"color\", color }" +
	"} } }" );

	lineMaterial.hideFlags = HideFlags.HideAndDontSave;
	lineMaterial.shader.hideFlags = HideFlags.HideAndDontSave;
	}

}



function OnPostRender() {

	if(showGrid){
	
		GL.PushMatrix();
		CreateLineMaterial();
		// set the current material
		lineMaterial.SetPass( 0 );
		GL.Begin( GL.LINES );
		GL.Color( Color(224/255,224/255,221/255,0.3) );
		var gridSpaceV : int = 5;
		var gridSpaceH :int = 5;
		

		for(var i:int = 0; i < parseInt(hh / gridSpaceV); i++) {
			
			GL.Vertex3( -1 * ww * 0.5, i * gridSpaceV, -2 );
			GL.Vertex3(  1 * ww * 0.5, i * gridSpaceV, -2 );
		}
		
		for(var j:int = 0; j < parseInt(ww / gridSpaceH); j++) {

			GL.Vertex3( -1 * ww * 0.5 + j * gridSpaceH, -1 * hh, -2 );
			GL.Vertex3( -1 * ww * 0.5 + j * gridSpaceH,  1 * hh, -2 );
		
		}

		GL.End();
		GL.PopMatrix();
		
		
		
	
	}

}

function gridManToggle(){

	if(showGrid){
			// human picture
			gridMan  = GameObject.CreatePrimitive(PrimitiveType.Plane);
			gridMan.name = "gridMan";
			gridMan.transform.localScale = Vector3(7,0,18);
			//gridMan.gameObject.renderer.material.color = Color.blue;
			gridMan.transform.Rotate(90,180,0);
			var texi:Texture2D = Resources.Load("textures/mano", Texture2D);
			
		
			gridMan.renderer.material.mainTexture = texi;
			//gridMan.renderer.material.shader = 
			gridMan.renderer.material.shader = Shader.Find ("Unlit/Transparent");
			gridMan.transform.localPosition = Vector3(0, 89, -2);
			//gridMan.active = false;
	}else{
	
		Destroy(gridMan);
	}
}

function DebugEngine(){

	Notification.notiBool[0] = "0";
	Notification.notiBool[1] = "0";
	Notification.notiBool[2] = "0";
	Notification.notiBool[3] = "0";
	Notification.notiBool[4] = "0";
	Notification.notiBool[5] = "0";
	Notification.notiBool[6] = "0";
	Notification.notiBool[7] = "0";
	
	var myX	: int;
	var myY : int;
	var myH : int;
	var myW : int;
	
	var otherX	: int;
	var otherY : int;
	var otherH : int;
	var otherW : int;
	
	var deltaW : int;
		
	// Rule 1 : EX ÜST ÜSTE OLMAZ
	for(var i : int = 0; i < parameters.Count; i++){


		if(parameters[i]["elementType"] == "EX"){
		
			for(var j : int = 0; j < parameters.Count; j++){
			
				if(parameters[j]["elementType"] == "EX" && i!=j){
				
				
					//başka EX kutusu
					
					myX = parameters[i]["x"];
					myY = parameters[i]["y"];
					myH = parameters[i]["h"];
					myW = parameters[i]["w"];
					
					otherX = parameters[j]["x"];
					otherY = parameters[j]["y"];
					otherH = parameters[j]["h"];
					otherW = parameters[j]["w"];
					
					if(Mathf.Min(myX,otherX) == myX){
						
							//ben soldayım
							deltaW = myW;
						
					}else{
							//others solda
							deltaW = otherW;
						
					}
					
					if(//conditions
					
					(Mathf.Abs(otherY - myY) == myH) //yukarda aşağıda
					
					&&
					
					(Mathf.Abs(otherX - myX) < deltaW) // arasında
					
					
					){
						//print("üstüsteyiz");
						Notification.notiBool[0] = "1";
						break;
					}else{
						//print("sorun yok abi");
						
					}

				
				}

			}

		}
	
		if(Notification.notiBool[0] == "0"){
		
		
		var allChildren = moduls[i].GetComponentsInChildren(Transform);
									
			for (var child : Transform in allChildren) {
			// do whatever with child transform here
				if(child.renderer != null){
					if(child.renderer.gameObject.name =="Base"){					
						child.renderer.material.color = Color.white;
						//child.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
					}else if(child.renderer.gameObject.name =="skin"){
	   			 		child.renderer.material.color = Color.black;
	   			 	}
					else{
						child.renderer.material.color = Color.white;
					}
									   
				}
			}
		}

	}
	
	//// Rule 1 ends here
	
	
	// Rule 2 : ED ÜST ÜSTE OLMAZ
		
	//Debug.Log("2 : ED rule");
	for(var m : int = 0; m < parameters.Count; m++){


		if(parameters[m]["elementType"] == "ED"){
		
			for(var n : int = 0; n < parameters.Count; n++){
			
				if(parameters[n]["elementType"] == "ED" && m!=n){
				
				
					//başka ED kutusu
					
					myX = parameters[m]["x"];
					myY = parameters[m]["y"];
					myH = parameters[m]["h"];
					myW = parameters[m]["w"];
					
					otherX = parameters[n]["x"];
					otherY = parameters[n]["y"];
					otherH = parameters[n]["h"];
					otherW = parameters[n]["w"];
					
					if(Mathf.Min(myX,otherX) == myX){
						
							//ben soldayım
							deltaW = myW;
						
					}else{
							//others solda
							deltaW = otherW;
						
					}
		
					if(//conditions
					
					(Mathf.Abs(otherY - myY) == myH) //yukarda aşağıda
					
					&&
					
					(Mathf.Abs(otherX - myX) < deltaW) // arasında
					
					
					){
						//Debug.Log("2 : ED ust uste olmaaaaz");
						Notification.notiBool[1] = "1";
						break;
					}else{
						//print("sorun yok abi");
						
					}
				
				}
				
			}
		}
	}
	
	// Rule 2 : ENDS HERE
	
	// Rule 3 : ED EX’in ÜSTÜNE GELEBİLİR. TAM TERSİ OLAMAZ. = EX ED'in üstüne gelemez
	
	for(var p : int = 0; p < parameters.Count; p++){


		if(parameters[p]["elementType"] == "ED"){
		
			for(var r : int = 0; r < parameters.Count; r++){
			
				if(parameters[r]["elementType"] == "EX"){
			
					//ED kutusu
						
					myX = parameters[p]["x"];
					myY = parameters[p]["y"];
					myH = parameters[p]["h"];
					myW = parameters[p]["w"];
					
					//Başka EX kutusu
						
					otherX = parameters[r]["x"];
					otherY = parameters[r]["y"];
					otherH = parameters[r]["h"];
					otherW = parameters[r]["w"];
					
					if(Mathf.Min(otherX,myX) == otherX){
							//EX ED kutusunun solunda
							deltaW = otherW;
						
					}else{
							//EX ED kutusunun sağında
							deltaW = myW;
					}
					
					if(//conditions
					
						(otherY - myY == myH) //EX kutusu yukarıda 
						
						&&
						
						(Mathf.Abs(otherX - myX) < deltaW) // arasında
						
						
						){
							
							Debug.Log("3 : EX ED'in üstüne gelemez");
							Notification.notiBool[2] = "1";
							break;
						}else{
							//print("sorun yok abi");
						}
			
				}
			}
		}	
	}

	// Rule 3 : ENDS HERE
	
	// Rule 4 : ED YERDE OLAMAZ.
	for(var k : int = 0; k < parameters.Count; k++){


		if(parameters[k]["elementType"] == "ED"){
		
			myX = parameters[k]["x"];
			myY = parameters[k]["y"];
			myH = parameters[k]["h"];
			myW = parameters[k]["w"];
			
			
			
			if(myY - myH * 0.5 <= floor.transform.localPosition.y + floor.transform.localScale.y * 0.5){
				Debug.Log("4 : ED YERDE OLAMAZ");
				Notification.notiBool[3] = "1";
			
			}else{
				
			}
		}
	}
	// Rule 4 : ENDS HERE.
	
	// Rule 5 : EX DUVARDA OLAMAZ (ASILAMAZ). HER ZAMAN YERDE OLMALI
	// Rule 6 : Yerdeki tüm ürünler (EX) bir baza seçeneğine sahip olmak zorunda.
	
	for(var v : int = 0; v < parameters.Count; v++){


		if(parameters[v]["elementType"] == "EX"){
		
			myX = parameters[v]["x"];
			myY = parameters[v]["y"];
			myH = parameters[v]["h"];
			myW = parameters[v]["w"];
			
			var baseHeight : int = parameters[v]["baseHeight"];
			
			if(myY - myH * 0.5 - baseHeight> 0){
				//Debug.Log("5 : EX DUVARDA OLAMAZ (ASILAMAZ). HER ZAMAN YERDE OLMALI");
				Notification.notiBool[4] = "1";
			
			}else{
			
				//EX YERDE DEMEK
				Notification.notiBool[4] = "0";
				if(baseHeight <= 0){
					guiState = "modul_edit";
					
					if(isGUIClosed) {
						showInspector();
						isGUIClosed = false;
					}
					
					//Debug.Log("6 : Yerdeki tüm ürünler (EX) bir baza seçeneğine sahip olmak zorunda.");
					Notification.closeNotification();
					Notification.notiBool[5] = "1";
					
					
				}else{
					Notification.notiBool[5] = "0";
				}
				
				
			}
			
			
		}
			
	}
		
	// Rule 5 : ENDS HERE.
	
	// Rule 6 : ED ÜRÜNLERİ OMUZ HİZASI VE ÜZERİNDE “U”, ALTINDA İSE “F” KAPAK SEÇENEĞİNE SAHİP OLMALI.
	
	
	
	
	var shoulderLevel : int = 160;
	
	for(var c : int = 0; c < parameters.Count; c++){


		if(parameters[c]["elementType"] == "ED"){
		
			var cabinetDoor	: String = parameters[c]["cabinetDoor"];
			myH = parameters[c]["y"];
						
			if(myH < shoulderLevel && cabinetDoor == "U"){
				//print("error");
				Notification.notiBool[6] = "1";
			
			}
			
			if(myH > shoulderLevel && cabinetDoor == "F"){
				Notification.notiBool[7] = "1";
				//print("error");
			}
			
		}
	}
	
	// Rule 6 : ENDS HERE.
		
}

function HighlightErrorsEngine(errorCode : int){

			var myX	: int;
			var myY : int;
			var myH : int;
			var myW : int;
			
			var otherX	: int;
			var otherY : int;
			var otherH : int;
			var otherW : int;
			
			var deltaW : int;
			var allChildren;
			
			for(var c : int = 0; c < parameters.Count; c++){
			
				allChildren = moduls[c].GetComponentsInChildren(Transform);
								
				for (var child : Transform in allChildren) {
					// do whatever with child transform here
					if(child.renderer != null){
									
						child.renderer.material.color = Color.white;
								   
					}
				}
			
			
			}
			
		//	print("errorCode : " + errorCode);
			
	switch(errorCode){
	
	
	
	case 0:
			
				
			// Rule 1 : EX ÜST ÜSTE OLMAZ
			for(var i : int = 0; i < parameters.Count; i++){


				if(parameters[i]["elementType"] == "EX"){
				
					for(var j : int = 0; j < parameters.Count; j++){
					
						if(parameters[j]["elementType"] == "EX" && i!=j){
						
						
							//başka EX kutusu
							
							myX = parameters[i]["x"];
							myY = parameters[i]["y"];
							myH = parameters[i]["h"];
							myW = parameters[i]["w"];
							
							otherX = parameters[j]["x"];
							otherY = parameters[j]["y"];
							otherH = parameters[j]["h"];
							otherW = parameters[j]["w"];
							
							if(Mathf.Min(myX,otherX) == myX){
								
									//ben soldayım
									deltaW = myW;
								
							}else{
									//others solda
									deltaW = otherW;
								
							}
							
							if(//conditions
							
							(Mathf.Abs(otherY - myY) == myH) //yukarda aşağıda
							
							&&
							
							(Mathf.Abs(otherX - myX) < deltaW) // arasında
							
							
							){
								print("üstüsteyiz highlighted");
								
								allChildren = moduls[i].GetComponentsInChildren(Transform);
								
								for (var child : Transform in allChildren) {
									// do whatever with child transform here
									if(child.renderer != null){
									
										child.renderer.material.color = Color.red;
								   
									}
								}
		
								
								break;
							}else{
								//print("sorun yok abi");
								
							}

						}

					}

				}

			}
	break;
	
	case 1:
			
				
		// Rule 2 : ED ÜST ÜSTE OLMAZ
		
		//Debug.Log("2 : ED rule");
		for(var m : int = 0; m < parameters.Count; m++){


			if(parameters[m]["elementType"] == "ED"){
			
				for(var n : int = 0; n < parameters.Count; n++){
				
					if(parameters[n]["elementType"] == "ED" && m!=n){
					
					
						//başka ED kutusu
						
						myX = parameters[m]["x"];
						myY = parameters[m]["y"];
						myH = parameters[m]["h"];
						myW = parameters[m]["w"];
						
						otherX = parameters[n]["x"];
						otherY = parameters[n]["y"];
						otherH = parameters[n]["h"];
						otherW = parameters[n]["w"];
						
						if(Mathf.Min(myX,otherX) == myX){
							
								//ben soldayım
								deltaW = myW;
							
						}else{
								//others solda
								deltaW = otherW;
							
						}
			
						if(//conditions
						
						(Mathf.Abs(otherY - myY) == myH) //yukarda aşağıda
						
						&&
						
						(Mathf.Abs(otherX - myX) < deltaW) // arasında
						
						
						){
							//Debug.Log("2 : ED ust uste olmaaaaz");
							allChildren = moduls[m].GetComponentsInChildren(Transform);
									
									for (var child : Transform in allChildren) {
										// do whatever with child transform here
										if(child.renderer != null){
										
											child.renderer.material.color = Color.red;
									   
										}
									}
							break;
						}else{
							//print("sorun yok abi");
							
						}
					
					}
					
				}
			}
		}
	break;
	
	case 2:
	
		// Rule 3 : ED EX’in ÜSTÜNE GELEBİLİR. TAM TERSİ OLAMAZ. = EX ED'in üstüne gelemez
		
		for(var p : int = 0; p < parameters.Count; p++){


			if(parameters[p]["elementType"] == "ED"){
			
				for(var r : int = 0; r < parameters.Count; r++){
				
					if(parameters[r]["elementType"] == "EX"){
				
						//ED kutusu
							
						myX = parameters[p]["x"];
						myY = parameters[p]["y"];
						myH = parameters[p]["h"];
						myW = parameters[p]["w"];
						
						//Başka EX kutusu
							
						otherX = parameters[r]["x"];
						otherY = parameters[r]["y"];
						otherH = parameters[r]["h"];
						otherW = parameters[r]["w"];
						
						if(Mathf.Min(otherX,myX) == otherX){
								//EX ED kutusunun solunda
								deltaW = otherW;
							
						}else{
								//EX ED kutusunun sağında
								deltaW = myW;
						}
						
						if(//conditions
						
							(otherY - myY == myH) //EX kutusu yukarıda 
							
							&&
							
							(Mathf.Abs(otherX - myX) < deltaW) // arasında
							
							
							){
								
								//Debug.Log("2 : ED ust uste olmaaaaz");
								
								
								allChildren = moduls[p].GetComponentsInChildren(Transform);
									
								for (var child : Transform in allChildren) {
										// do whatever with child transform here
										if(child.renderer != null){
										
											child.renderer.material.color = Color.red;
									   
										}
								}
								
								allChildren = moduls[r].GetComponentsInChildren(Transform);
									
								for (var child : Transform in allChildren) {
										// do whatever with child transform here
										if(child.renderer != null){
										
											child.renderer.material.color = Color.red;
									   
										}
								}
								break;
							}else{
								//print("sorun yok abi");
							}
				
					}
				}
			}	
		}

		// Rule 3 : ENDS HERE
	break;
	
	case 3:
		// Rule 4 : ED YERDE OLAMAZ.
		
		for(var k : int = 0; k < parameters.Count; k++){


			if(parameters[k]["elementType"] == "ED"){
			
				myX = parameters[k]["x"];
				myY = parameters[k]["y"];
				myH = parameters[k]["h"];
				myW = parameters[k]["w"];
						
				
				if(myY - myH * 0.5 == 0){
				
					allChildren = moduls[k].GetComponentsInChildren(Transform);
									
					for (var child : Transform in allChildren) {
							// do whatever with child transform here
							if(child.renderer != null){
							
								child.renderer.material.color = Color.red;
						   
							}
					}
				
				}else{
					
				}
			}
		}
		// Rule 4 : ENDS HERE.
	break;
	
	case 4:
		// Rule 5 : EX DUVARDA OLAMAZ (ASILAMAZ). HER ZAMAN YERDE OLMALI
		// Rule 6 : Yerdeki tüm ürünler (EX) bir baza seçeneğine sahip olmak zorunda.
		
		for(var v : int = 0; v < parameters.Count; v++){


			if(parameters[v]["elementType"] == "EX"){
			
				myX = parameters[v]["x"];
				myY = parameters[v]["y"];
				myH = parameters[v]["h"];
				myW = parameters[v]["w"];
				
				var baseHeight : int = parameters[v]["baseHeight"];
				
				if(myY - myH * 0.5 - baseHeight> 0){
					//Debug.Log("5 : EX DUVARDA OLAMAZ (ASILAMAZ). HER ZAMAN YERDE OLMALI");
					allChildren = moduls[v].GetComponentsInChildren(Transform);
									
					for (var child : Transform in allChildren) {
							// do whatever with child transform here
							if(child.renderer != null){
							
								child.renderer.material.color = Color.red;
						   
							}
					}
				
				}else{
				/*
					//EX YERDE DEMEK
					Notification.notiBool[4] = "0";
					if(baseHeight <= 0){
						guiState = "modul_edit";
						
						if(isGUIClosed) {
							showInspector();
							isGUIClosed = false;
						}
						
						Debug.Log("6 : Yerdeki tüm ürünler (EX) bir baza seçeneğine sahip olmak zorunda.");
						Notification.closeNotification();
						Notification.notiBool[5] = "1";
						
						
					}else{
						Notification.notiBool[5] = "0";
					}
					
					*/
				}
				
				
			}
				
		}
			
		// Rule 5 : ENDS HERE.
	break;
	
	// Rule 6 : ED ÜRÜNLERİ OMUZ HİZASI VE ÜZERİNDE “U”, ALTINDA İSE “F” KAPAK SEÇENEĞİNE SAHİP OLMALI.
	
	
	case 6:
	
		
		var shoulderLevel : int = 160;
		
		for(var cc : int = 0; cc < parameters.Count; cc++){
	
	
			if(parameters[cc]["elementType"] == "ED"){
			
				var cabinetDoor	: String = parameters[cc]["cabinetDoor"];
				myH = parameters[cc]["y"];
							
				if(myH < shoulderLevel && cabinetDoor == "U"){
					print("error U");
					allChildren = moduls[cc].GetComponentsInChildren(Transform);
									
					for (var child : Transform in allChildren) {
							// do whatever with child transform here
							if(child.renderer != null){
							
								child.renderer.material.color = Color.red;
						   
							}
					}
				
				}
				
				
				
			}
		}
	// Rule 6 : ENDS HERE.
	break;
	
	case 7:
	
		
		var shoulderLevel2 : int = 160;
		
		for(var ccc : int = 0; ccc < parameters.Count; ccc++){
	
	
			if(parameters[ccc]["elementType"] == "ED"){
			
				var cabinetDoor2	: String = parameters[ccc]["cabinetDoor"];
				myH = parameters[ccc]["y"];
							
				
				
				if(myH > shoulderLevel2 && cabinetDoor2 == "F"){
					print("error F");
					allChildren = moduls[ccc].GetComponentsInChildren(Transform);
									
					for (var child : Transform in allChildren) {
							// do whatever with child transform here
							if(child.renderer != null){
							
								child.renderer.material.color = Color.red;
						   
							}
					}
				}
				
			}
		}
	// Rule 6 : ENDS HERE.
	break;
	
	}

}

function returnStructure(){

			var myX	: int;
			var myY : int;
			var myH : int;
			var myW : int;
			
			var otherX	: int;
			var otherY : int;
			var otherH : int;
			var otherW : int;
			
			
			
			for(var i : int = 0; i < parameters.Count; i++){
			
				var boxRight = false;
				var boxLeft = false;
				var boxStructure : String = "";
			
				for(var j : int = 0; j < parameters.Count; j++){
				
					if(i !=j){
				
						//KUTU
							
						myX = parameters[i]["x"];
						myY = parameters[i]["y"];
						myH = parameters[i]["h"];
						myW = parameters[i]["w"];
						
						//Başka KUTU
							
						otherX = parameters[j]["x"];
						otherY = parameters[j]["y"];
						otherH = parameters[j]["h"];
						otherW = parameters[j]["w"];
						
						
						
						if(myX < otherX && otherX - myX == myW && myY == otherY){
							//print("benim sağımda kutu var");
							boxRight = true;

						}
						
						if(myX > otherX && myX - otherX == otherW && myY == otherY){
					        //print("benim solumda kutu var");
							boxLeft = true;
						}
						
					}
				}
				
				if(boxRight){
					boxStructure = "B";
				}
				if(boxLeft){
					boxStructure = "C";
				}
				if(boxRight && boxLeft){
					boxStructure = "D";
				}
				if(!boxRight && !boxLeft){
					boxStructure = "A";
				}
				
				
				//print("box structure : "+boxStructure );
				parameters[i]["structure"] = boxStructure;
				//parameters[i]["code"] = boxStructure;
				
				var tip:String = parameters[i]["code"].ToString().Substring(0,parameters[i]["code"].ToString().Length-1);
				
				
				parameters[i]["code"] = tip + parameters[i]["structure"];
			}
			
			

}
