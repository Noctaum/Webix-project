import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import templateUser from "views/templateUser";

export default class DataView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		let addBut = { 
			view:"button",
			label:_("Add new"), 
			type:"iconButton",
			icon:"plus",
			click: () => {}
		};

		let templ=(data)=>{
			return `<div class='userImageWrapeSmall'>
					<img class='userPhoto' src='http://milkyway.mie.uc.edu/cgdm/students/Male.png'>
				</div>
				${data.FirstName ? data.FirstName : "nameless"}
				${data.LastName ? data.LastName : "empty"} <br>
				${data.Email ? data.Email : "empty"}`;			
		};

		let list = { 
			rows:[
				{cols:[
					{rows:[
						{
							css:"border",
							view:"list",
							gravity: 3,
							id:"contsctsList",
							select:true,
							template:templ,
							type:{
								height:70          
							},
							on:{
								onAfterSelect:(id) =>{
									this.show(`../contacts?id=${id}`);
								}	
							}
						},
						{},
						addBut,
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
			const id = this.getParam("id");
			if (id && contacts.getIndexById(id) !== -1) this.$$("contsctsList").select(id);
			else this.$$("contsctsList").select(contacts.getFirstId());
		});
	} 
}