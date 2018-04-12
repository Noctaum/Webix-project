import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {status} from "models/status";

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

		let templ = (data) =>{
			let Status = status.getItem(data.StatusID);
			return `<div>
				<h2>${data.FirstName ? data.FirstName : "empty"} ${data.LastName ? data.LastName : "empty"}</h2>
				</div>
				<div class="bigCantainer">
					<div class="conteiner">
						<div class='userImageWrape'>
							<img class='userPhoto' src='http://milkyway.mie.uc.edu/cgdm/students/Male.png'>
						</div>
						<div class="content">${Status && Status.Value ? Status.Value : "empty"} </div>
					</div>
					<div class="conteiner">
						<div class="content">
							<span class='webix_icon fa-envelope'></span> ${data.Email ? data.Email : "empty"}
						</div>
						<div class="content"><span class='webix_icon fa-skype'></span> ${data.Skype ? data.Skype : "empty"} </div>
						<div class="content"><span class='webix_icon fa-tag'></span> ${data.Job ? data.Job : "empty"}</div>
						<div class="content"><span class='webix_icon fa-briefcase'></span> ${data.Company ? data.Company : "empty"} </div>
					</div>
					<div class="conteiner">
						<div class="content">
						<span class='webix_icon fa-calendar'></span> ${data.Birthday ? data.Birthday : "empty"} </div>
						<div class="content"><span class='webix_icon fa-map-marker'></span> ${data.Address ? data.Address : "empty"} </div>
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
			
		return {cols:[form, {rows:[{cols:[delBut, saveBut]},{}]}],gravity:4};
	}
	urlChange(){
		webix.promise.all([
			contacts.waitData,
			status.waitData
		]).then(()=>{
			const id = this.getParam("id");
			if (id){
				let data = contacts.getItem(id);
				this.$$("head").setValues(data);
			}
		});
	}
}





















