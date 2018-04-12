import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {typeActivity} from "models/typeActivity";
import {activities} from "models/activities";

export default class WindowEdit extends JetView{
	config(){

		let form = {
			view:"form",
			id:"form",
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
					{view:"checkbox", label:"Completed", name:"State", uncheckValue:"Open", checkValue:"Close"},
					{
						cols:[
							{
								view:"button",
								id:"but", 
								label: labelForBut,
								click: () => { 
									let popForm = this.$$("form");
									let values = popForm.getValues();
									values.Details=values.Details.replace(/<.*?>/g, "");
									if(!popForm.validate()) return false;
									if(values.id){
										activities.updateItem(values.id, values);
									} else{
										activities.add(values);
									}
									hideFunction();
								}
							},
							{
								view:"button", 
								label:"Cancel", 
								click:() => {
									hideFunction();
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

		let hideFunction = () =>{
			let popForm = this.$$("form");
			popForm.clear();
			popForm.clearValidation();
			this.$$("popup").hide();
		};

		let labelForBut = (obj)=>obj;

		let templateForPopHead = {
			id:"excess",
			template: (obj)=>{
				return `${obj.id ? "Edit" : "Add"} activities`;}
		};

		let pop = {
			view:"window",
			id:"popup",
			position:"center",
			head:templateForPopHead, 
			width: 700,
			body: form
		};
		
		return pop;
	}
	init(){
		this.on(this.app, "dataActivityEdit", (data) => {
			this.$$("form").setValues(data);
			this.$$("excess").setValues(data);
			let a;
			data.id ? a = "Edit" : a = "Add";
			this.$$("but").setValue(a);

		});
	}
	showWindow() {
		this.getRoot().show();
	}
}


		


