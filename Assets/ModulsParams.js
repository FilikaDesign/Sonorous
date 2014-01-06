#pragma strict

static function type_Ex(type:String) {
	var myStuffTex:Hashtable;
	
	switch (type)
	{
		case "EX":
		myStuffTex = {"elementId":4,
							"elementType":"EX",
							"Front":"textures/H3375_ST22",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/H3375_ST22",
	                        "Left":"textures/H3375_ST22",
	                        "Right":"textures/H3375_ST22",
	                        "Bottom":"textures/H3375_ST22",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-230,
	                        "y":20,
	                        "isRigid":1,
	                        "baseHeight":0
	                        };
	   break;
	   
	   case "ED":
	   myStuffTex = {"elementId":4,
							"elementType":"ED",
							"Front":"textures/H3375_ST22",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/H3375_ST22",
	                        "Left":"textures/H3375_ST22",
	                        "Right":"textures/H3375_ST22",
	                        "Bottom":"textures/H3375_ST22",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":30,
	                        "h":40,
	                        "depth":50,
	                        "x":-230,
	                        "y":50,
	                        "isRigid":1,
	                        "baseHeight":0
	                        };
	   break;
	   
	   default:
	   myStuffTex = {"elementId":4,
							"elementType":"EX",
							"Front":"textures/H3375_ST22",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/H3375_ST22",
	                        "Left":"textures/H3375_ST22",
	                        "Right":"textures/H3375_ST22",
	                        "Bottom":"textures/H3375_ST22",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-230,
	                        "y":20,
	                        "isRigid":1,
	                        "baseHeight":0
	                        };
	   break;
	   
	}
	
	                        
	 return myStuffTex;
}