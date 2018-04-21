import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {status} from "models/status";
import aUserTable from "views/individualTable";

export default class templateUser extends JetView{

	config(){

		const _ = this.app.getService("locale")._;

		let saveBut = {
			view:"button", 
			label:_("Edit"), 
			type:"iconButton",
			icon:"edit",
			click: () => {
				this.show("../contactsForm");
			}
		};

		let delBut = { 
			view:"button",
			label:_("Delete"), 
			type:"iconButton",
			icon:"trash",
			click: () => {
				let id = this.getParam("id",true);
				webix.confirm({
					text:"Are you sure?",
					title:"Attention",
					callback:(result)=>{
						if(result){
							if(id) {
								contacts.remove(id);
							}
							contacts.waitData.then(
								() => {
									webix.message("Deleted");
									this.app.show("top/contacts");
								},
								()=> webix.message("Undeleted")
							);
						}
					}
				});
			}
		};

		let templ = (data) =>{
			let Status = status.getItem(data.StatusID);
			return `
				<div>
					<h2>${data.FirstName || _("empty")} ${data.LastName || _("empty")}</h2>
				</div>
				<div class="bigCantainer">
					<div class="conteiner">
						<div class='userImageWrape'>
							<img class='userPhoto' src=${data.Photo || "http://milkyway.mie.uc.edu/cgdm/students/Male.png"}>
						</div>
						<div class="content">${Status && Status.Value ? Status.Value : _("empty")} </div>
					</div>
					<div class="conteiner">
						<div class="content">
							<span class='webix_icon fa-envelope'></span> ${data.Email || _("empty")}
						</div>
						<div class="content"><span class='webix_icon fa-skype'></span> ${data.Skype || _("empty")} </div>
						<div class="content"><span class='webix_icon fa-tag'></span> ${data.Job || _("empty")}</div>
						<div class="content"><span class='webix_icon fa-briefcase'></span> ${data.Company || _("empty")} </div>
					</div>
					<div class="conteiner">
						<div class="content">
						<span class='webix_icon fa-calendar'></span> ${data.Birthday || _("empty")} </div>
						<div class="content"><span class='webix_icon fa-map-marker'></span> ${data.Address || _("empty")} </div>
					</div>
				</div>`;
		};


		let form =
			{	
				view:"template",
				id:"head",
				template:templ,
				gravity: 3
			};
			
		return {
			gravity:5,
			rows:[
				{cols:[
					form, 
					{rows:[
						{cols:[delBut, saveBut]},
						{}
					]}
				]},
				{$subview:aUserTable}
			]
		};
	}
	urlChange(){
		webix.promise.all([
			contacts.waitData,
			status.waitData
		]).then(()=>{
			const id = this.getParam("id",true);
			if (id){
				let data = contacts.getItem(id);
				this.$$("head").setValues(data);
			}
		});
	}
}





















