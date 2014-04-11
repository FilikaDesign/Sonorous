 import System.Collections.Generic;
 import System.Xml;
 import System.IO;
 
 @XmlRoot("Combination")
 public class Combination
 {
 	@XmlArray("Elements")
 	@XmlArrayItem("Element")
 	public var screenHeight : int;
 	public var screenWidth : int;
 	public var Elements : List.<ElementData>;
 	public var Settings : List.<SettingsData>;
 
 	public function Save(path : String)
 	{
 		var serializer : XmlSerializer = new XmlSerializer(Combination);
 		var stream : Stream = new FileStream(path, FileMode.Create);
 		serializer.Serialize(stream, this);
 		stream.Close();
 	}
 
 	public static function Load(path : String):Combination 
 	{
 		var serializer : XmlSerializer = new XmlSerializer(Combination);
 		var stream : Stream = new FileStream(path, FileMode.Open);
 		var result : Combination = serializer.Deserialize(stream) as Combination;
 		stream.Close();
 		return result;
 	}
 
         //Loads the xml directly from the given string. Useful in combination with www.text.
         public static function LoadFromText(text : String):Combination
         {
 		var serializer : XmlSerializer = new XmlSerializer(Combination);
 		return serializer.Deserialize(new StringReader(text)) as Combination;
 	}
 }