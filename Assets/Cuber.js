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
private var draggingElementId : int;


private var snapFactor	: float = 5;
private var snapEnable 	: boolean = true;



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
	wall = GameObject.CreatePrimitive(PrimitiveType.Cube);
	wall.name = "Wall";
	var wallBoxCollider : BoxCollider = wall.GetComponent("BoxCollider");
	wallBoxCollider.enabled = false;
	wall.transform.position = Vector3(0,150,30);
	wall.transform.localScale = Vector3(800,2,300);
	wall.transform.Rotate(90,0,0);
	wall.renderer.material.mainTexture = Resources.Load("wall", Texture2D);
	wall.renderer.material.mainTextureScale = Vector2 (11,11);
	
	//floor
	floor = GameObject.CreatePrimitive(PrimitiveType.Cube);
	floor.name = "Floor";
	var floorBoxCollider : BoxCollider = floor.GetComponent("BoxCollider");
	floorBoxCollider.enabled = false;
	floor.transform.position = Vector3(0,-1,-120);
	floor.transform.localScale = Vector3(800,2,300);
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
                        "y":0,
                        "isRigid":1
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
                        "x":70,
                        "y":0,
                        "isRigid":1
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
                        "x":190,
                        "y":0,
                        "isRigid":1
                        };
    //////
           
	//Add parameter data to ArrayList
	parameters.Add(myStuffTex);
	parameters.Add(myStuffTex2);
	parameters.Add(myStuffTex3);
	/////
	
	
	// Create moduls 1
	var eleman : GameObject = new GameObject("Kutu");
	eleman.AddComponent("Element");
	
	
	var other : Element = eleman.GetComponent("Element");
	other.params = parameters[0];
	
	
	/////// 2
	var eleman2 : GameObject = new GameObject("Kutu2");
	eleman2.AddComponent("Element");
	
	
	var other2 : Element = eleman2.GetComponent("Element");
	other2.params = parameters[1];


	//////// 3
	var eleman3 : GameObject = new GameObject("Kutu3");
	eleman3.AddComponent("Element");
	
	var other3 : Element = eleman3.GetComponent("Element");
	other3.params = parameters[2];
	

}

function Update () {

	var mainCamera = Camera.main;
	var hit : RaycastHit;
	
	//gizmo
	
	
	Debug.DrawLine (Vector3 (0, 0, 0), Vector3 (100, 0, 0), Color.red);
	Debug.DrawLine (Vector3 (0, 0, 0), Vector3 (0, 100, 0), Color.blue);
	Debug.DrawLine (Vector3 (0, 0, 0), Vector3 (0, 0, -100), Color.green);	
	

	if (Input.GetMouseButtonDown (0)){
	
		if( Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),  hit ) ) {
		
			 if(hit.rigidbody.gameObject.GetComponent("BoxCollider")){
				draggingObject = hit.collider.gameObject;
				
				tempPosition = hit.transform.position;
				
				mouseScreen = Vector3(Input.mousePosition.x,Input.mousePosition.y,-1 * mainCamera.transform.position.z);
				
				mouseWorld = mainCamera.ScreenToWorldPoint(mouseScreen);
				
				offSet = mouseWorld-hit.transform.position;		
			
				
			}
		}
			
	
	}
	
	if (Input.GetMouseButton (0)){
	
		if(draggingObject){
		
	
			mouseScreen = Vector3(Input.mousePosition.x,Input.mousePosition.y,-1 * mainCamera.transform.position.z);
				
			mouseWorld = mainCamera.ScreenToWorldPoint(mouseScreen);
				
			variableScript = draggingObject.GetComponent("Element");
			
			draggingElementId = variableScript.elementID;
					
					
			if(snapEnable){
				draggingObject.transform.position.x = (snapFactor * Mathf.Floor((mouseWorld.x- offSet.x)/snapFactor)); 
	       		draggingObject.transform.position.y = (snapFactor * Mathf.Floor((mouseWorld.y- offSet.y)/snapFactor)); 
	       		
	       		//Debug.Log(snapX);
					
			}
			else{
				draggingObject.transform.position.x = mouseWorld.x - offSet.x;
				draggingObject.transform.position.y = mouseWorld.y - offSet.y;		
			}		
			
			
		
	    	
			
			if(draggingObject.transform.position.y < draggingObject.transform.localScale.y * 0.5 +1){
				draggingObject.transform.position.y = draggingObject.transform.localScale.y * 0.5 +1;			
			}
			
			draggingObject.transform.position.z = 0;
		}
	   

	}
	
	if (Input.GetMouseButtonUp (0)){
	
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
				
			draggingObject = null;
		}
	}
	
	 
}

function RulesEngine(){

		// Rule 1 : EX ÜST ÜSTE OLMAZ
		
		if(parameters[draggingElementId]["elementType"] == "EX"){
			
			
			for(var i : int = 0; i < parameters.Count; i++){
			
				if(i != draggingElementId){
				
					var othersX	: int = parameters[i]["x"];
					var othersY : int = parameters[i]["y"];
					var othersH : int = parameters[i]["h"];
					var othersW : int = parameters[i]["w"];
					
					var considerX : int = parameters[draggingElementId]["x"];
					var considerY : int = parameters[draggingElementId]["y"];
					var considerH : int = parameters[draggingElementId]["h"];
					var considerW : int = parameters[draggingElementId]["w"];
					
				
					if(//conditions
					
					(parameters[i]["elementType"] == "EX")
					
					&&
					
					(Mathf.Abs(othersY - considerY) == considerH) //yukarda aşağıda
					
					&&
					
					(Mathf.Abs(othersX - considerX) < Mathf.Min(othersW,considerW)) // arasında
					
					
					){
						
						Debug.Log("ust uste olmaaaaz");
						break;
					}
				
				}
				
			}
		
		}
		
		

}