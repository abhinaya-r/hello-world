"use strict";

var GuiConfig = GuiConfig || {};

GuiConfig.dropdownOptions = {};

// Each entry of GuiConfig.defs will have one Gui element created for it.
/* Parameters are as follows:
    - folderName: what folder to place this entry in
    - name: text to display as a label for this GUI element
    - param: name of the field of SceneParams to be mutated
    - range: [min, max, step] for numerical-valued fields
    - onChange: a function f(newValue) that applies the results of this
                variable having changed
    - type: optionally a type hint to indicate the type of value being selected
            ("color", "string", "num", "boolean")
*/
GuiConfig.defs = [
  /***************************************************
   *                Top level
   ***************************************************/
  {
    name: "auto rotate",
    param: "rotate",
  },
  /***************************************************
   *             Forces folder
   ***************************************************/

  /***************************************************
   *             Scene folder
   ***************************************************/

  /***************************************************
   *             Behavior folder
   ***************************************************/

  /***************************************************
   *             Appearance folder
   ***************************************************/
   {
     folderName: "Appearance",
     name: "ground color",
     param: "groundColor",
     type: "color",
     onChange: Scene.update,
   },
   {
     folderName: "Appearance",
     name: "ground emission",
     param: "groundEmissive",
     type: "color",
     onChange: Scene.update,
   },
   {
     folderName: "Appearance",
     name: "fog color",
     param: "fogColor",
     type: "color",
     onChange: Scene.update,
   },
   /***************************************************
    *             Top level
    ***************************************************/
 ];
