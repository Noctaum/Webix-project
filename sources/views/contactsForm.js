import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {status} from "models/status";

export default class ContactForm extends JetView{

	config(){

		const _ = this.app.getService("locale")._;


		let saveBut = {
			view:"button", 
			id:"but",
			label:"", 
			click: () => {
				let values = this.$$("form").getValues();
				if(values.id){
					contacts.updateItem(values.id, values);
				} else{
					contacts.add(values);
				}
				this.app.show("top/contacts");
			}
		};

		let delBut = { 
			view:"button",
			label:_("Cancel"), 
			type:"iconButton",
			icon:"trash",
			click:() => {
				let id = this.getParam("id",true);
				id == "new" ? this.app.show("top/contacts") : this.show("../templateUser");
			}
		};

		
		//
		let form = {
			view:"form",
			id:"form",
			css:"border",
			elements:[
				{cols:[
					{view:"text", label:_("First Name"), name:"FirstName"},
					{view:"text", label:_("Email"), name:"Email"},
				]},
				{cols:[
					{view:"text", label:_("Last Name"), name:"LastName"},
					{view:"text", label:_("Skype"), name:"Skype"},
				]},
				{cols:[
					{view:"datepicker", label:_("Joining date"), name:"StartDate"},
					{view:"text", label:_("Phone"), name:"Phone"},
					
				]},
				{cols:[
					
					{view:"combo", label:_("Status"), name:"StatusID", options:{data:status}},
					{view:"datepicker", label:_("Birthday"), name:"Birthday"},
				]},
				{cols:[
					{rows:[
						{view:"text", label:_("Job"), name:"Job"},
						{view:"text", label:_("Company"), name:"Company"},
						{view:"text", label:_("Website"), name:"Website"},
						{view:"text", label:_("Address"), name:"Address"},
					]},
					{cols:[
						{name:"Photo", template:(a)=>a, id:"imgUser"},
						{rows:[
							{},
							{
								view:"uploader", 
								label:"Change photo",
								autosend:false, 
								multiple:false,
								id:"uploadImg",
								accept:"image/jpeg, image/png",
								name:"Photo",
								on:{
									onBeforeFileAdd:(upload)=>{    
										var file = upload.file;
										var reader = new FileReader();  
										reader.onload = (event) => {
											this.$$("form").setValues({Photo:event.target.result}, true);
											this.photo();
										};   
										reader.readAsDataURL(file);
										return false;
									}
								}
							},
							{view:"button", label:"Delete photo", click:()=>{this.$$("form").setValues({Photo:"http://milkyway.mie.uc.edu/cgdm/students/Male.png"}, true);this.photo();}}
						]}
						
					]},
				]},
			]
		};

		return {
			rows:[
				{template:(str)=>`<h2>${str}</h2>`, id:"headTempl"},
				form, 
				{},
				{cols:[{},delBut,saveBut]}
			],
			gravity:4
		};

	}
	init(){
		this.on(this.app, "onDataEditStop", (data) => {
			if(data){
				this.$$("form").setValues(data);
			}
		});
	}
	urlChange(){
		webix.promise.all([
			contacts.waitData,
			status.waitData
		]).then(()=>{
			const id = this.getParam("id",true);
			let text = "<span class='webix_icon fa-edit'></span>";
			let str, data, templStr;
			if (id && id !== "new"){
				str = "Save";
				templStr = "Edit";
				data = contacts.getItem(id);
			} else{
				templStr = str = "Add";
				data = {};
			}
			this.$$("form").setValues(data);
			this.$$("but").setValue(text+str);
			this.$$("headTempl").setValues(templStr);
			
			this.photo();
		},()=>{webix.message("Ошибка загрузки данных!");});
	}
	photo(){
		let photo = this.$$("form").getValues().Photo; 
		this.$$("imgUser").setValues(`
			<div class='userImageWrape'>
				<img class='userPhoto' src=${photo ? photo : "http://milkyway.mie.uc.edu/cgdm/students/Male.png"}>
			</div>
		`);
	}
}

