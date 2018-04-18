import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {typeActivity} from "models/typeActivity";
import {activities} from "models/activities";

export default class WindowEdit extends JetView{
	config(){

		let form = {
			view:"form",
			elements:[{
				rows:[
					{view: "textarea", label: "Details", height: 200, name:"Details"},
					{view:"combo", label:"TypeID", options:{data:typeActivity}, name:"TypeID", invalidMessage:"Title shouldn't be empty!"},
					{view:"combo", label:"ContactID", options:{data:contacts}, name:"ContactID", invalidMessage:"Title shouldn't be empty!"},
					{
						cols:[
							{view:"datepicker", label:"Date", name:"DueDate"},
							{view:"datepicker", label:"Time", type:"time", name:"Time"},
						]
					},
					{view:"checkbox", label:"Completed", name:"State", uncheckValue:"Open", checkValue:"Close", labelWidth:92},
					{
						cols:[
							{},
							{
								view:"button",
								label: "",
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
								label:"Cancel", 
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
			head:(obj)=>`${obj} activities`,
			width: 700,
			body: form
		};
		
		return pop;
	}
	init(){
		this.on(this.app, "dataActivityEdit", (data) => {
			this.getRoot().queryView({view:"form"}).setValues(data);
			let a;
			data.id ? a = "Edit" : a = "Add";
			this.getRoot().getHead().setValues(a);
			this.getRoot().queryView({view:"button", type:"form"}).setValue(a);
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

		//for reboot "individualActivitiTable"
		this.app.callEvent("newer", [{}]);
	}
}


		


