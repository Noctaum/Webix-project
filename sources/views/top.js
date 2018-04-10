import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		let header = {
			type:"header", template:"Contacts",
		};

		let menu = {
			css:"border",
			view:"menu", id:"top:menu", 
			width:180, layout:"y", select:true,
			template:"<span class='webix_icon fa-#icon#'></span> #value# ",
			data:[
				{ value:_("Contacts"), id:"contacts", icon:"users" },
				{ value:_("Activities"),id:"data",     icon:"calendar" },
				{ value:_("Settings"),  id:"setting",  icon:"cogs" }
			]
		};

		let ui = {
			rows:[header,
				{cols:[
					menu,
					{ $subview:true } 
				]}
			]
		};
				
		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:menu");
	}
}