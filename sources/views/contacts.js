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
									this.$$("contactsList").data.filter(function(obj){
										for(let key in obj){
											if(key !== "id" && key !== "Photo" && key !== "StatusID"){
												if (obj[key].toLowerCase().indexOf(value) != -1) return true;
											}
										}
									});
								}
							}
						},
						{
							view:"list",
							id:"contactsList",
							select:true,
							width:220,
							template:templ,
							type:{
								height:70          
							},
							click:(id) =>{
								this.show(`../contacts?id=${id}/templateUser`);
							},
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

