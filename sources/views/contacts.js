import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
//import form from "views/contactsForm";
import templateUser from "views/templateUser";

export default class DataView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		let addBut = { 
			view:"button",
			label:_("Add new"), 
			click: () => contacts.add({Name:"New contact", Email:"new@gmail.com"})

		};

		let list = { 
			rows:[
				{cols:[
					{rows:[
						addBut,
						{
							css:"border",
							view:"list",
							gravity: 2,
							id:"contsctsList",
							autoConfig:true,
							select:true,
							template:"<div class='userImageWrapeSmall'><img class='userPhoto' src='http://milkyway.mie.uc.edu/cgdm/students/Male.png'></div><div>#FirstName# #LastName# <br> #Email#</div>",
							type:{
								height:70          
							},
							on:{
								onAfterSelect:(id) =>{
									this.setParam("id", id, true);
									let values = this.$$("contsctsList").getSelectedItem();
									this.app.callEvent("onDataEditStop", [values]);
								}	
							}
						},
					]},
					{$subview:templateUser}
				]}
			]	
		};
		return list;
	}

	init(){
		this.$$("contsctsList").sync(contacts);
	}
	urlChange(){
		contacts.waitData.then(() => {
			var id = this.getParam("id");
			if (id) this.$$("contsctsList").select(id);
			else this.$$("contsctsList").select(1);
		});
	} 
}