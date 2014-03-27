#pragma strict

static function type_Ex(type:String) {
	var myStuffTex:Hashtable;
	
	switch (type)
	{
	
		/* EX-10 TYPE CABINETS*/
		//case "ex10-f":
		case "EX10-F":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"F",
							"Front":"textures/200s",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex10-fd":
	    case "EX10-FD":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"FD",
							"Front":"textures/200s",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":2,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	    //case "ex10-dd":
	    case "EX10-DD":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"DD",
							"Front":"textures/200s",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":2,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex10-t":
	   case "EX10-T":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"T",
							"Front":"textures/speakertexture",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   case "EX10-TF":
	    //case "ex10-tf":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"TF",
							"Front":"",
	                        "FrontUp":"textures/speakertexture",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":2,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   
	   /* EX-11 TYPE CABINETS*/
		//case "ex11-f":
		case "EX11-F":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"F",
							"Front":"textures/200s",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":1,
	                        "nFrontFace":1,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   
	   //case "ex11-fd":
		case "EX11-FD":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"FD",
							"Front":"textures/200s",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":1,
	                        "nFrontFace":2,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex11-dd":
	   case "EX11-DD":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"DD",
							"Front":"textures/200s",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":1,
	                        "nFrontFace":2,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   
	   //case "ex11-t":
	   case "EX11-T":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"T",
							"Front":"textures/speakertexture",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":1,
	                        "nFrontFace":1,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   
	   //case "ex11-tf":
	   case "EX11-TF":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"TF",
							"Front":"textures/200s",
	                        "FrontUp":"textures/speakertexture",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":1,
	                        "nFrontFace":2,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   /* EX-12 TYPE CABINETS*/
	   //case "ex12-f":
	   case "EX12-F":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"F",
							"Front":"textures/200s",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex12-fd":
	   case "EX12-FD":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"FD",
							"Front":"textures/200s",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":2,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex12-dd":
	   case "EX12-DD":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"DD",
							"Front":"textures/200s",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":2,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex12-t":
	   case "EX12-T":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"T",
							"Front":"textures/speakertexture",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex12-tf":
	   case "EX12-TF":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"TF",
							"Front":"textures/200s",
	                        "FrontUp":"textures/speakertexture",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":2,
	                        "w":130,
	                        "h":40,
	                        "depth":50,
	                        "x":-65,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   /* EX-32 TYPE CABINETS*/
	   //case "ex32-f":
	   case "EX32-F":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"F",
							"Front":"textures/200s",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":160,
	                        "h":40,
	                        "depth":50,
	                        "x":-80,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   
	   /* EX-20 TYPE CABINETS*/
	   //case "ex20-d":
		case "EX20-D":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"D",
							"Front":"textures/200s",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":65,
	                        "h":40,
	                        "depth":50,
	                        "x":-32,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex20-f":
		case "EX20-F":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"F",
							"Front":"textures/200s",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":65,
	                        "h":40,
	                        "depth":50,
	                        "x":-32,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex20-dd":
		case "EX20-DD":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"DD",
							"Front":"textures/200s",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":2,
	                        "w":65,
	                        "h":40,
	                        "depth":50,
	                        "x":-32,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex20-fd":
		case "EX20-FD":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"FD",
							"Front":"textures/200s",
	                        "FrontUp":"textures/200s",
	                        "FrontDown":"textures/200s",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":2,
	                        "w":65,
	                        "h":40,
	                        "depth":50,
	                        "x":-32,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ex20-t":
		case "EX20-T":
		myStuffTex = {"elementId":0,
							"elementType":"EX",
							"cabinetDoor":"T",
							"Front":"textures/speakertexture",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":65,
	                        "h":40,
	                        "depth":50,
	                        "x":-32,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   
	   /* ED-50 TYPE CABINETS*/
	   //case "ed50-f":
		case "ED50-F":
		myStuffTex = {"elementId":0,
							"elementType":"ED",
							"cabinetDoor":"F",
							"Front":"textures/200s",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":65,
	                        "h":40,
	                        "depth":36,
	                        "x":-32,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   //case "ed50-u":
		case "ED50-U":
		myStuffTex = {"elementId":0,
							"elementType":"ED",
							"cabinetDoor":"U",
							"Front":"textures/200s",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":65,
	                        "h":40,
	                        "depth":36,
	                        "x":-32,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   
	   /* ES-90 TYPE COFFEE TABLE
	   case "ed50-f":
		myStuffTex = {"elementId":0,
							"elementType":"ED",
							"cabinetDoor":"F",
							"Front":"textures/200s",
	                        "FrontUp":"",
	                        "FrontDown":"",
	                        "Back":"textures/200s",
	                        "Left":"textures/200s",
	                        "Right":"textures/200s",
	                        "Bottom":"textures/200s",
	                        "Top":"textures/200s",
	                        "Hole":0,
	                        "nFrontFace":1,
	                        "w":120,
	                        "h":30,
	                        "depth":40,
	                        "x":-60,
	                        "y":300,
	                        "isRigid":1,
	                        "baseHeight":0,
	                        "code":type,
	                        "screenId":0,
	                        "structure":"A"
	                        };
	   break;
	   */
	}
	
	                        
	 return myStuffTex;
}