import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		let header = {
			type:"header", template:"#value#", id:"headVal"
		};

		let menu = {
			css:"border",
			view:"menu", id:"top:menu", 
			width:180, layout:"y", select:true,
			template:"<span class='webix_icon fa-#icon#'></span> #value# ",
			data:[
				{ value:_("Contacts"), id:"contacts", icon:"users" },
				{ value:_("Activities"),id:"activitiTable", icon:"calendar" },
				{ value:_("Settings"),  id:"setting",  icon:"cogs" }
			],
			on: {
				onSelectChange:() => {
					let mainText =  this.$$("top:menu").getSelectedItem();
					this.$$("headVal").setValues(mainText);
				}
			}
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