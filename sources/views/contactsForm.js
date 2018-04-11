import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {status} from "models/status";

export default class ContactForm extends JetView{

	config(){

		const _ = this.app.getService("locale")._;

		let saveBut = {
			view:"button", 
			label:_("Edit"), 
			type:"iconButton",
			icon:"edit",
			click: () => {
				let values = this.$$("form").getValues();
				contacts.updateItem(values.id, values);
			}
		};

		let delBut = { 
			view:"button",
			label:_("Delete"), 
			type:"iconButton",
			icon:"trash",
			click: () => {
				let form = this.$$("form");
				let id = form.getValues().id;
				if(id) contacts.remove(id);
				form.clear();
				form.clearValidation();
			}
		};

		let form = {
			gravity:3,
			view:"form",
			id:"form",
			css:"border",
			elements:[
				{cols:[
					{view:"text", label:_("First Name"), name:"FirstName"},
					{view:"text", label:_("Last Name"), name:"LastName"},
				]},
				{view:"text", label:_("Photo"), name:"Photo"},
				{cols:[
					{view:"text", label:_("Email"), name:"Email"},
					{view:"text", label:_("Phone"), name:"Phone"},
				]},
				{cols:[
					{view:"text", label:_("Birthday"), name:"Birthday"},
					{view:"text", label:_("Address"), name:"Address"},
				]},
				{cols:[
					{view:"text", label:_("Skype"), name:"Skype"},
					{view:"text", label:_("Website"), name:"Website"},
				]},
				{cols:[
					{view:"text", label:_("Company"), name:"Company"},
					{view:"text", label:_("Job"), name:"Job"},
				]},
				{cols:[
					{view:"combo", label:_("Status ID"), name:"StatusID", options:{data:status, body:{template:"#Value#"}}},
					{view:"datepicker", label:_("StartDate"), name:"StartDate"},
				]},
			]
		};
		return {cols:[form, {rows:[saveBut,delBut]}],gravity:4};
	}
	init(){
		this.on(this.app, "onDataEditStop", (data) => {
			if(data){
				this.$$("form").setValues(data);
			}
		});
	}
}

