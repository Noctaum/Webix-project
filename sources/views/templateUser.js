import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
//import {status} from "models/status";

export default class templateUser extends JetView{

	config(){

		const _ = this.app.getService("locale")._;

		let saveBut = {
			view:"button", 
			label:_("Edit"), 
			type:"iconButton",
			icon:"edit",
		};

		let delBut = { 
			view:"button",
			label:_("Delete"), 
			type:"iconButton",
			gravity:1,
			icon:"trash",
			click: () => {
				let id = this.getParam("id");
				if(id) contacts.remove(id);
			}
		};

		let form =
			{
				gravity:4,
				id:"formUser",
				rows:[
					{	
						view:"template",
						id:"head",
						template:"<h2>#FirstName# #LastName#</h2>",
						height:70
					},
					{cols:[
						{
							template:"<div class='userImageWrape'><img class='userPhoto' src='http://milkyway.mie.uc.edu/cgdm/students/Male.png'></div>", 
					
						},
						{rows:[
							{	
								view:"template",
								id:"mail",
								template:"<span class='webix_icon fa-envelope'></span> #Email#",
							},
							{	
								view:"template",
								id:"skype",
								template:"<span class='webix_icon fa-skype'></span> #Skype#",
							},
							{	
								view:"template",
								id:"job",
								template:"<span class='webix_icon fa-tag'></span> #Job#",
							},
							{	
								view:"template",
								id:"comp",
								template:"<span class='webix_icon fa-briefcase'></span> #Company#",
							},
						]},
						{rows:[
							{	
								view:"template",
								id:"birth",
								template:"<span class='webix_icon fa-calendar'></span> #Birthday#",
							},
							{	
								view:"template",
								id:"map",
								template:"<span class='webix_icon fa-map-marker'></span> #Address#",
							},
							{},
							{}
						]},

					]},
					{	
						view:"template",
						id:"status",
						template:"#StatusID#"
					},
				]
			}; 

		return {cols:[form, {rows:[saveBut,delBut,{}]}],gravity:4};
	}
	urlChange(){
		contacts.waitData.then(() => {
			const id = this.getParam("id");
			if (id){
				let data = contacts.getItem(id);
				this.$$("head").setValues(data);
				this.$$("mail").setValues(data);
				this.$$("skype").setValues(data);
				this.$$("job").setValues(data);
				this.$$("comp").setValues(data);
				this.$$("birth").setValues(data);
				this.$$("map").setValues(data);
				this.$$("status").setValues(data);
			}
		});
	}
}





















