#pragma strict

// Editted by alp
// 24.12.2013

var elementID		: int;
var elementType		: String;
var elementContainer: GameObject;
var cubeFront 		: GameObject;
var cubeFrontUp		: GameObject;
var cubeFrontDown	: GameObject;
var cubeFrontMid	: GameObject;
var cubeBack 		: GameObject;
var cubeLeft 		: GameObject;
var cubeLeftSkin 	: GameObject;
var cubeLeftSkinTop	: GameObject;
var cubeRight 		: GameObject;
var cubeRightSkin 	: GameObject;
var cubeRightSkinTop: GameObject;
var cubeBottom 		: GameObject;
var cubeBottomSkin 	: GameObject;
var cubeTop 		: GameObject;
var cubeTopSkin		: GameObject;
var cubeHole 		: GameObject;
var woodThickness 	: float = 0.4;
var w				: float;
var h				: float;
var depth			: float;

var screenId		: int;


var xPos				: int = 0;
var yPos				: int = 0;
var params:Hashtable = {};

var isColliding			: int = 0;
var highlighted:boolean = false;
var showId:boolean = false;
var baseHeight			: int = 0;
var baseElement: GameObject;

var standElement: GameObject;
var theText: GameObject;
var textMesh:TextMesh;
var newFont : Font;

function Start (){
    	
    		

    		elementContainer = new GameObject("Element Container");
    		elementContainer.transform.parent = this.transform;
    		
    		elementID = params["elementId"];
			
			////
    		
    		h = params["h"];
			w = params["w"];
			depth = params["depth"];
			var x:float = params["x"];
			var y:float = params["y"];
			
			elementType = params["elementType"];
			
			this.gameObject.transform.localPosition.y = h*0.5;
			baseHeight = params["baseHeight"];
			
			

			//collider
			
			
			var sc : BoxCollider;
			sc = this.gameObject.AddComponent ("BoxCollider");
			sc.center.x =  0.5;
			sc.center.y =  0;
			sc.center.z =  -1 * 0.5;
			sc.size.x = 0.99;
			sc.size.y = 0.99;
			
			
			
			//this.GetComponent("BoxCollider").transform.position.y = h * 0.5;
			
			
			
			sc.transform.localScale = Vector3(w,h,depth);
			
			sc.isTrigger = true;
			//sc.convex = true;
			
			var Front:String = params["Front"]; 
			var FrontUp:String = params["FrontUp"]; 
			var FrontDown:String = params["FrontDown"]; 
			var Back:String = params["Back"]; 
			var Left:String = params["Left"]; 
			var Right:String = params["Right"];
			var Bottom:String = params["Bottom"];
			var Top:String = params["Top"];
			var hole:int = params["Hole"];
			var isRigid:int =  params["isRigid"];
			
			
			
	
			if(isRigid == 1) {
				this.gameObject.AddComponent(Rigidbody);
				this.gameObject.rigidbody.isKinematic = true;
				this.gameObject.rigidbody.useGravity = false;
				this.gameObject.rigidbody.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
			}
			
			
			if(params["nFrontFace"] == 1){
			
			
			
			//Front
		    cubeFront  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeFront.name = "cubeFront";
		    cubeFront.transform.localScale = Vector3(w-woodThickness * 2,h-woodThickness,woodThickness);
			cubeFront.transform.localPosition = Vector3(w*0.5, h * 0.5 - 0.5* woodThickness, -1 * depth + woodThickness*0.5);
			cubeFront.renderer.material.mainTexture = Resources.Load(Front, Texture2D);
			cubeFront.transform.parent = elementContainer.transform;
			var cubeFrontBoxCollider : BoxCollider = cubeFront.GetComponent("BoxCollider");
			cubeFrontBoxCollider.enabled = false;
			
			
			
			}else if(params["nFrontFace"] == 2){
			
			//things to do
			//FrontUp
		    cubeFrontUp  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeFrontUp.name = "cubeFrontUp";
		    cubeFrontUp.transform.localScale = Vector3(w-2*woodThickness,(h-woodThickness)*0.5-0.2,woodThickness);
			cubeFrontUp.transform.localPosition = Vector3(w*0.5,(h - woodThickness)*0.75+0.1, -1 * depth + woodThickness*0.5);
			cubeFrontUp.renderer.material.mainTexture = Resources.Load(FrontUp, Texture2D);
			cubeFrontUp.transform.parent = elementContainer.transform;
			var cubeFrontUpBoxCollider : BoxCollider = cubeFrontUp.GetComponent("BoxCollider");
			cubeFrontUpBoxCollider.enabled = false;
			
			
			
			
			//FrontDown
			cubeFrontDown  = GameObject.CreatePrimitive(PrimitiveType.Cube);
			cubeFrontDown.name = "cubeFrontDown";
		    cubeFrontDown.transform.localScale = Vector3(w-2*woodThickness,(h-woodThickness)*0.5-0.2,woodThickness);
			cubeFrontDown.transform.localPosition = Vector3(w*0.5,(h - woodThickness)*0.25-0.1, -1 * depth + woodThickness*0.5);
			cubeFrontDown.renderer.material.mainTexture = Resources.Load(FrontDown, Texture2D);
			cubeFrontDown.transform.parent = elementContainer.transform;
			var cubeFrontDownBoxCollider : BoxCollider = cubeFrontDown.GetComponent("BoxCollider");
			cubeFrontDownBoxCollider.enabled = false;
			
			cubeFrontMid = GameObject.CreatePrimitive(PrimitiveType.Cube);
			cubeFrontMid.name = "skin";
		    cubeFrontMid.transform.localScale = Vector3(w-2*woodThickness,0.6,woodThickness*0.5);
			cubeFrontMid.transform.localPosition = Vector3(w*0.5,(h - woodThickness)*0.5 - 0.1, -1 * depth + 0.2);
			cubeFrontMid.renderer.material.color = Color.black;
			cubeFrontMid.transform.parent = elementContainer.transform;
			var cubeFrontMidCollider : BoxCollider = cubeFrontMid.GetComponent("BoxCollider");
			cubeFrontMidCollider.enabled = false;
			
			
			}
			
			//Back
		    cubeBack  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeBack.name = "cubeBack";
		    cubeBack.transform.localScale = Vector3(w-woodThickness * 2,h-woodThickness * 2,woodThickness);
			cubeBack.transform.localPosition = Vector3(w*0.5,h * 0.5, -1 * woodThickness*0.5);
			cubeBack.renderer.material.mainTexture = Resources.Load(Back, Texture2D);
			cubeBack.transform.parent = elementContainer.transform;
			var cubeBackDownBoxCollider : BoxCollider = cubeBack.GetComponent("BoxCollider");
			cubeBackDownBoxCollider.enabled = false;
			
			//Left
		    cubeLeft  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeLeft.name = "cubeLeft";
		    cubeLeft.transform.localScale = Vector3(woodThickness,h,depth);
			cubeLeft.transform.localPosition = Vector3(0.5 * woodThickness, h * 0.5, -1 * depth * 0.5);
			cubeLeft.renderer.material.mainTexture = Resources.Load(Left, Texture2D);
			cubeLeft.transform.parent = elementContainer.transform;
			var cubeLeftBoxCollider : BoxCollider = cubeLeft.GetComponent("BoxCollider");
			cubeLeftBoxCollider.enabled = false;
			
			//Left Skin
		    cubeLeftSkin  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeLeftSkin.name = "skin";
		    cubeLeftSkin.transform.localScale = Vector3(woodThickness,h,0.1);
			cubeLeftSkin.transform.localPosition = Vector3(0.5 * woodThickness, h * 0.5, -1 * depth - 0.1);
			cubeLeftSkin.renderer.material.color = Color.black;
			cubeLeftSkin.transform.parent = elementContainer.transform;
			var cubeLeftSkinBoxCollider : BoxCollider = cubeLeftSkin.GetComponent("BoxCollider");
			cubeLeftSkinBoxCollider.enabled = false;
			
			//Left Skin Top
		    cubeLeftSkinTop  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeLeftSkinTop.name = "skin";
		    cubeLeftSkinTop.transform.localScale = Vector3(woodThickness,0.1,depth);
			cubeLeftSkinTop.transform.localPosition = Vector3(0.5 * woodThickness, h , -0.5 * depth);
			cubeLeftSkinTop.renderer.material.color = Color.black;
			cubeLeftSkinTop.transform.parent = elementContainer.transform;
			var cubeLeftSkinTopBoxCollider : BoxCollider = cubeLeftSkinTop.GetComponent("BoxCollider");
			cubeLeftSkinTopBoxCollider.enabled = false;
			
			//Right
		    cubeRight  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeRight.name = "cubeRight";
		    cubeRight.transform.localScale = Vector3(woodThickness,h,depth);
			cubeRight.transform.localPosition = Vector3(w - woodThickness*0.5, h * 0.5, -1 * depth * 0.5);
			cubeRight.renderer.material.mainTexture = Resources.Load(Right, Texture2D);
			cubeRight.transform.parent = elementContainer.transform;
			var cubeRightBoxCollider : BoxCollider = cubeRight.GetComponent("BoxCollider");
			cubeRightBoxCollider.enabled = false;
			
			//Right Skin
		    cubeRightSkin  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeRightSkin.name = "skin";
		    cubeRightSkin.transform.localScale = Vector3(woodThickness,h,0.1);
			cubeRightSkin.transform.localPosition = Vector3(w - woodThickness*0.5, h * 0.5, -1 * depth - 0.1);
			cubeRightSkin.renderer.material.color = Color.black;
			cubeRightSkin.transform.parent = elementContainer.transform;
			var cubeRightSkinBoxCollider : BoxCollider = cubeRightSkin.GetComponent("BoxCollider");
			cubeRightSkinBoxCollider.enabled = false;
			
			//Right Skin Top
		    cubeRightSkinTop  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeRightSkinTop.name = "skin";
		    cubeRightSkinTop.transform.localScale = Vector3(woodThickness,0.1,depth);
			cubeRightSkinTop.transform.localPosition = Vector3(w - woodThickness*0.5, h , -0.5 * depth);
			cubeRightSkinTop.renderer.material.color = Color.black;
			cubeRightSkinTop.transform.parent = elementContainer.transform;
			var cubeRightSkinTopBoxCollider : BoxCollider = cubeRightSkinTop.GetComponent("BoxCollider");
			cubeRightSkinTopBoxCollider.enabled = false;

			
			//Bottom
		    cubeBottom  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeBottom.name = "cubeBottom";
		    cubeBottom.transform.localScale = Vector3(w-woodThickness * 2,woodThickness,depth-woodThickness * 2);
			cubeBottom.transform.localPosition = Vector3(w*0.5,woodThickness*0.5, -1 * depth * 0.5);
			cubeBottom.renderer.material.mainTexture = Resources.Load(Bottom, Texture2D);
			cubeBottom.transform.parent = elementContainer.transform;
			var cubeBottomBoxCollider : BoxCollider = cubeBottom.GetComponent("BoxCollider");
			cubeBottomBoxCollider.enabled = false;
			
			/*
			//Bottom Skin
		    cubeBottomSkin  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeBottomSkin.name = "skin";
		    cubeBottomSkin.transform.localScale = Vector3(w-woodThickness * 2,woodThickness,0.1);
			cubeBottomSkin.transform.localPosition = Vector3(w*0.5,woodThickness*0.5, -1 * depth - 0.1);
			cubeBottomSkin.renderer.material.color = Color.black;
			cubeBottomSkin.transform.parent = elementContainer.transform;
			var cubeBottomSkinCollider : BoxCollider = cubeBottomSkin.GetComponent("BoxCollider");
			cubeBottomSkinCollider.enabled = false;
			*/
			
			//Top
		    cubeTop  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeTop.name = "cubeTop";
		    cubeTop.transform.localScale = Vector3(w-woodThickness * 2,woodThickness,depth);
			cubeTop.transform.localPosition = Vector3(w*0.5,h-woodThickness*0.5, -1 * depth * 0.5);
			cubeTop.renderer.material.mainTexture = Resources.Load(Top, Texture2D);
			cubeTop.transform.parent = elementContainer.transform;
			var cubeTopBoxCollider : BoxCollider = cubeTop.GetComponent("BoxCollider");
			cubeTopBoxCollider.enabled = false;
			
			//Top Skin
		    cubeTopSkin  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeTopSkin.name = "skin";
		    cubeTopSkin.transform.localScale = Vector3(w-woodThickness * 2,woodThickness,0.1);
			cubeTopSkin.transform.localPosition = Vector3(w*0.5,h-woodThickness*0.5, -1 * depth - 0.1);
			cubeTopSkin.renderer.material.color = Color.black;
			cubeTopSkin.transform.parent = elementContainer.transform;
			var cubeTopSkinCollider : BoxCollider = cubeTopSkin.GetComponent("BoxCollider");
			cubeTopSkinCollider.enabled = false;
			
							
			if(hole ==  1){
			//Hole
		    cubeHole  = GameObject.CreatePrimitive(PrimitiveType.Cube);
		    cubeHole.name = "cubeHole";
		    cubeHole.transform.localScale = Vector3(10,0,3);
			cubeHole.transform.localPosition = Vector3(w*0.5,h+0.2,-1.8);
			cubeHole.renderer.material.color = Color.gray;
			cubeHole.transform.parent = elementContainer.transform;
			var cubeHoleBoxCollider : BoxCollider = cubeHole.GetComponent("BoxCollider");
			cubeHoleBoxCollider.enabled = false;
			
			createStand();
			
			}
			
			if(baseHeight > 0){
				
				baseElement = GameObject.CreatePrimitive(PrimitiveType.Cube);
				baseElement.name = "Base";
				baseElement.transform.localScale = Vector3(this.w,baseHeight,this.depth-2);
				baseElement.transform.position.x = elementContainer.transform.position.x + this.w * 0.5;
				baseElement.transform.position.y = this.transform.localPosition.y - h*0.5 - baseHeight * 0.5;
				baseElement.transform.position.z = elementContainer.transform.position.z - this.depth * 0.5 + 1;
				baseElement.renderer.material.color = Color.gray;
				baseElement.transform.parent = elementContainer.transform;
					
			}
			
			
			if(!showId) {
				theText = new GameObject();
 
				textMesh = theText.AddComponent("TextMesh");
				var meshRenderer = theText.AddComponent("MeshRenderer");
			
				//textMesh.GetComponent(TextMesh).text = (elementID + 1).ToString();
				textMesh.GetComponent(TextMesh).fontSize = 70;
				newFont = Resources.Load("Arial", typeof(Font)) as Font;
			
				textMesh.GetComponent(TextMesh).font = newFont;
				
				var Texttir:String = params["Front"]; 
				var Texttir2:String = params["FrontUp"]; 
				//newFont.material.color = Color.black;

				if(Texttir == "textures/200s" || Texttir2 == "textures/200s"){
					
					newFont.material.color = Color.black;
				}else{
					
					newFont.material.color = Color.white;
				
				}
				
			
				meshRenderer.GetComponent(MeshRenderer).renderer.material = newFont.material; 
				
			}
			Place(x,y);
			
}

function updateElementId() {
	textMesh.GetComponent(TextMesh).text = (screenId + 1).ToString();
}

function showIds() {
 
			
	textMesh.GetComponent(TextMesh).text = (screenId + 1).ToString();
	
	var Texttir:String = params["Front"]; 
	var Texttir2:String = params["FrontUp"]; 

						
	theText.transform.position.x = elementContainer.transform.position.x + 5;
	theText.transform.position.y = elementContainer.transform.position.y + h * 0.5 - 5;
	theText.transform.position.z = -1 * depth + woodThickness*0.5;
				
	theText.transform.parent = elementContainer.transform;
	
	var meshRenderer = theText.GetComponent("MeshRenderer");
	if(Texttir == "textures/200s" || Texttir2 == "textures/200s"){
					
		meshRenderer.GetComponent(MeshRenderer).renderer.material.color = Color.black;
	}else{
					
		meshRenderer.GetComponent(MeshRenderer).renderer.material.color = Color.white;
				
	}
	
}

function hideIds() {
 
			
	textMesh.GetComponent(TextMesh).text = "";
	
}

    	
    	
function Place (_xPos : int, _yPos : int)
{
	 	xPos = _xPos;
 		yPos = _yPos;
 		this.gameObject.transform.localPosition = Vector3(xPos,yPos, 0);
 		

}


function Update ()
{

	
	
}

function OnTriggerEnter (collided : Collider) {

		
		xPos = collided.gameObject.transform.position.x;
		yPos = collided.gameObject.transform.position.y;

		isColliding = 1;	
		//Debug.Log(isColliding);
		
}

function OnTriggerStay (collided : Collider) {

		xPos = collided.gameObject.transform.position.x;
		yPos = collided.gameObject.transform.position.y;
		
		isColliding = 1;
		//Debug.Log(isColliding);
		/*
		var arr = new Array();
		arr.push(elementID);
		arr.push(this.gameObject.transform.position.x);
		arr.push(this.gameObject.transform.position.y);
		arr.push(wCol);
		arr.push(hCol);
		
		
		GameObject.Find("Main Camera").SendMessage("CollisionSnap",arr);
		*/
		
}

function OnTriggerExit (other : Collider) {
		
		isColliding = 0;

}

function createBase(size : int){

	var temp_baseHeight : int = params["baseHeight"];
	
	if(temp_baseHeight == 0){
	
		print(elementID);
		//Debug.Log("Baza yarat");
		params["baseHeight"] = size;
		baseHeight = size;
		baseElement = GameObject.CreatePrimitive(PrimitiveType.Cube);
		baseElement.name = "Base";
		baseElement.transform.localScale = Vector3(this.w,size,this.depth-2);
		baseElement.transform.position.x = elementContainer.transform.position.x + this.w * 0.5;
		baseElement.transform.position.y = this.transform.localPosition.y - h*0.5 - size * 0.5;
		baseElement.transform.position.z = elementContainer.transform.position.z - this.depth * 0.5 + 1;
		baseElement.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
		baseElement.transform.parent = elementContainer.transform;
	}
	
	
}

function changeBase(size : int){

		Destroy(baseElement);
		params["baseHeight"] = size;
		baseHeight = size;
		baseElement = GameObject.CreatePrimitive(PrimitiveType.Cube);
		baseElement.name = "Base";
		baseElement.transform.localScale = Vector3(this.w,size,this.depth-2);
		baseElement.transform.position.x = elementContainer.transform.position.x + this.w * 0.5;
		
		baseElement.transform.position.y = this.transform.localPosition.y - h*0.5 - size * 0.5;
		baseElement.transform.position.z = elementContainer.transform.position.z - this.depth * 0.5 + 1;
		baseElement.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
		baseElement.transform.parent = elementContainer.transform;
	
}

function createStand(){

		
		
		standElement = GameObject.CreatePrimitive(PrimitiveType.Cube);
		standElement.name = "Stand";
		standElement.transform.localScale = Vector3(6,38,6);
		standElement.transform.position.x = elementContainer.transform.position.x + this.w * 0.5;
		standElement.transform.position.y = this.transform.localPosition.y + h*0.5 + 9;
		standElement.transform.position.z = elementContainer.transform.position.z - 6;
		standElement.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
		standElement.transform.parent = elementContainer.transform;
		
		var standElementDetail : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
		standElementDetail.name = "standElementDetail";
		standElementDetail.transform.localScale = Vector3(4,12,4);
		standElementDetail.transform.position.x = elementContainer.transform.position.x + this.w * 0.5;
		standElementDetail.transform.position.y = this.transform.localPosition.y + h*0.5 + 36;
		standElementDetail.transform.position.z = elementContainer.transform.position.z - 5;
		standElementDetail.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
		standElementDetail.transform.parent = standElement.transform;
		
		var barLeft : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
		barLeft.name = "barLeft";
		barLeft.transform.localScale = Vector3(3,40,3);
		barLeft.transform.position.x = elementContainer.transform.position.x + this.w * 0.5 - 30;
		barLeft.transform.position.y = this.transform.localPosition.y + h*0.5 + 42;
		barLeft.transform.position.z = elementContainer.transform.position.z - 6;
		barLeft.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
		barLeft.transform.parent = standElement.transform;
		
		var barRight : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
		barRight.name = "barRight";
		barRight.transform.localScale = Vector3(3,40,3);
		barRight.transform.position.x = elementContainer.transform.position.x + this.w * 0.5 + 30;
		barRight.transform.position.y = this.transform.localPosition.y + h*0.5 + 42;
		barRight.transform.position.z = elementContainer.transform.position.z - 6;
		barRight.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
		barRight.transform.parent = standElement.transform;
		
		var barFrameLeft : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
		barFrameLeft.name = "barFrameLeft";
		barFrameLeft.transform.localScale = Vector3(2,12,2);
		barFrameLeft.transform.position.x = elementContainer.transform.position.x + this.w * 0.5 - 40;
		barFrameLeft.transform.position.y = this.transform.localPosition.y + h*0.5 + 36;
		barFrameLeft.transform.position.z = elementContainer.transform.position.z - 6;
		barFrameLeft.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
		barFrameLeft.transform.parent = standElement.transform;
		
		var barFrameRight : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
		barFrameRight.name = "barFrameRight";
		barFrameRight.transform.localScale = Vector3(2,12,2);
		barFrameRight.transform.position.x = elementContainer.transform.position.x + this.w * 0.5 + 40;
		barFrameRight.transform.position.y = this.transform.localPosition.y + h*0.5 + 36;
		barFrameRight.transform.position.z = elementContainer.transform.position.z - 6;
		barFrameRight.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
		barFrameRight.transform.parent = standElement.transform;
		
		var barFrameTop : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
		barFrameTop.name = "barFrameTop";
		barFrameTop.transform.localScale = Vector3(82,2,2);
		barFrameTop.transform.position.x = elementContainer.transform.position.x + this.w * 0.5;
		barFrameTop.transform.position.y = this.transform.localPosition.y + h*0.5 + 43;
		barFrameTop.transform.position.z = elementContainer.transform.position.z - 6;
		barFrameTop.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
		barFrameTop.transform.parent = standElement.transform;
		
		var barFrameBottom : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
		barFrameBottom.name = "barFrameBottom";
		barFrameBottom.transform.localScale = Vector3(82,2,2);
		barFrameBottom.transform.position.x = elementContainer.transform.position.x + this.w * 0.5;
		barFrameBottom.transform.position.y = this.transform.localPosition.y + h*0.5 + 29;
		barFrameBottom.transform.position.z = elementContainer.transform.position.z - 6;
		barFrameBottom.renderer.material.mainTexture = Resources.Load("textures/basetexture", Texture2D);
		barFrameBottom.transform.parent = standElement.transform;
		
	
}








  	
