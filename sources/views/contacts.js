import {JetView} from "webix-jet";
import {contacts} from "models/contacts";

export default class DataView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		let addBut = { 
			view:"button",
			label:_("Add new"), 
			type:"iconButton",
			icon:"plus",
			click: () => {
				this.show("../contacts?id=new/contactsForm");
			}
		};

		let templ=(data)=>{
			return `
				<div class='userImageWrapeSmall'>
					<img class='userPhoto' src=${data.Photo || "http://milkyway.mie.uc.edu/cgdm/students/Male.png"}>
				</div>
				${data.FirstName || _("nameless")}
				${data.LastName || _("empty")} <br>
				${data.Email || _("empty")}`;			
		};

		let list = { 
			rows:[
				{cols:[
					{css:"border", rows:[
						{
							view:"text", 
							id:"filterForUser",
							placeholder:_("type to find matching contacts"),
							on:{
								onTimedKeyPress:()=>{
									let value = this.$$("filterForUser").getValue().toLowerCase();
									this.$$("contactsList").filter(function(obj){

										//It work bed because the most of time we find all contacts
										// for(let key in obj){
										// 	if (obj[key].toLowerCase().indexOf(value) == 0) return true;
										// }

										if (obj.FirstName.toLowerCase().indexOf(value) == 0 || obj.LastName.toLowerCase().indexOf(value) == 0 || obj.Email.toLowerCase().indexOf(value) == 0) return true;
									});
								}
							}
						},
						{
							css:"border",
							view:"list",
							id:"contactsList",
							select:true,
							gravity:100,
							template:templ,
							type:{
								height:70          
							},
							click:(id) =>{
								this.show(`../contacts?id=${id}/templateUser`);
							},
							gravity:100,
						},
						addBut,
					],
					},
					{$subview:true,}
				]}
			]	
		};
		return list;
	}
	init(){
		this.$$("contactsList").sync(contacts);
	}
	urlChange(){
		contacts.waitData.then(() => {
			const id = this.getParam("id",true);
			if (id === undefined || !contacts.exists(id) && id !=="new") this.show(`../contacts?id=${contacts.getFirstId()}/templateUser`);
			else if (id && id !=="new") {
				this.$$("contactsList").select(id);
				this.$$("contactsList").showItem(id);
			}
		});
	} 
}

