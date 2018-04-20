import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {typeActivity} from "models/typeActivity";
import {activities} from "models/activities";

export default class WindowEdit extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let form = {
			view:"form",
			elements:[{
				rows:[
					{view: "textarea", label:_("Details"), height: 200, name:"Details"},
					{view:"combo", label:_("TypeID"), options:{data:typeActivity}, name:"TypeID", invalidMessage:_("Title shouldn't be empty!")},
					{view:"combo", label:_("ContactID"), options:{data:contacts}, name:"ContactID", invalidMessage:_("Title shouldn't be empty!")},
					{
						cols:[
							{view:"datepicker", label:_("Date"), name:"DueDate"},
							{view:"datepicker", label:_("Time"), type:"time", name:"Time"},
						]
					},
					{view:"checkbox", label:_("Completed"), name:"State", uncheckValue:"Open", checkValue:"Close", labelWidth:92},
					{
						cols:[
							{},
							{
								view:"button",
								label:"",
								type:"form",
								click: () => { 
									let popForm = this.getRoot().queryView({view:"form"});
									let values = popForm.getValues();
									values.Details=values.Details.replace(/<.*?>/g, "");
									if(!popForm.validate()) return false;
									if(values.id){
										activities.updateItem(values.id, values);
									} else{
										activities.add(values);
									}
									this.hideFunction();
								}
							},
							{
								view:"button", 
								label:_("Cancel"), 
								click:() => {
									this.hideFunction();
								}
							},
						]
					}
				]
			}],
			rules:{
				TypeID:webix.rules.isNotEmpty,
				ContactID:webix.rules.isNotEmpty,
			},
		};

		let pop = {
			view:"window",
			position:"center",
			head:(obj)=>`${obj} ${_("activities")}`, 
			width: 700,
			body: form
		};

		return pop;
	}
	init(){
		let _ = this.app.getService("locale")._;

		this.on(this.app, "dataActivityEdit", (data) => {
			if(data.disabled) this.getRoot().queryView({name:"ContactID"}).disable();
			this.getRoot().queryView({view:"form"}).setValues(data);
			let a;
			data.id ? a = "Edit" : a = "Add";
			this.getRoot().getHead().setValues(_(a));
			this.getRoot().queryView({view:"button", type:"form"}).setValue(_(a));
		});
	}
	showWindow() {
		this.getRoot().show();
	}
	hideFunction(){
		let popForm = this.getRoot().queryView({view:"form"});
		popForm.clear();
		popForm.clearValidation();
		this.getRoot().hide();
	}
}

