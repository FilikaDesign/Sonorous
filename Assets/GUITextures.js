#pragma strict
 
static function tex_inspector()
{
	var tex:Texture2D = Resources.Load("GUISkin/gui_btn_inspector", Texture2D);
 
	return GUIContent(tex,"Open / Close the inspector panel");
}


static function tex_export()
{
	var tex:Texture2D = Resources.Load("GUISkin/gui_btn_export", Texture2D);
 
	return GUIContent(tex,"Export as pdf document");
}

static function tex_delete()
{
	var tex:Texture2D = Resources.Load("GUISkin/gui_btn_delete", Texture2D);
 
	return GUIContent(tex,"Delete current item");
}

static function tex_new_scene()
{
	var tex:Texture2D = Resources.Load("GUISkin/gui_btn_new_scene", Texture2D);
 
	return GUIContent(tex,"New Scene");
}


static function tex_material()
{
	var tex:Texture2D = Resources.Load("GUISkin/gui_btn_material", Texture2D);
 
	return GUIContent(tex,"Change surface material");
}


static function tex_room_size()
{
	var tex:Texture2D = Resources.Load("GUISkin/gui_btn_size", Texture2D);
 
	return GUIContent(tex,"Set Room Size");
}

static function tex_load()
{
	var tex:Texture2D = Resources.Load("GUISkin/gui_btn_load", Texture2D);
 
	return GUIContent(tex,"Load Built'in Combinations");
}

static function tex_save()
{
	var tex:Texture2D = Resources.Load("GUISkin/gui_btn_save", Texture2D);
 
	return GUIContent(tex,"Save Combination");
}

static function tex_logo() 
{
	var tex:Texture2D = Resources.Load("sonorous_logo", Texture2D);
 
	return tex;
}

static function tex_box_bg() 
{
	var tex:Texture2D = Resources.Load("GUISkin/sonorous_gui_button", Texture2D);
 
	return tex;
}

static function load_tex(src:String) 
{
	var tex:Texture2D = Resources.Load(src, Texture2D);
 
	return tex;
}