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
					{view:"combo", label:"TypeID", options:{data:typeActivity}, name:"Type", invalidMessage:"Title shouldn't be empty!"},
					{view:"combo", label:"ContactID", options:{data:contacts}, name:"Contact", invalidMessage:"Title shouldn't be empty!"},
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
								label:"Add (*save)",
								click: () => { 
									let values = this.$$("form").getValues();
									values.Details=values.Details.replace(/<.*?>/g, "");
									if(!this.$$("form").validate())return false;
									if(values.id){
										activities.updateItem(values.id, values);
									} else{
										activities.add(values);
									}
									this.$$("popup").hide();
								}
							},
							{view:"button", label:"Cancel", click:() => this.$$("popup").hide()},
						]
					}
				]
			}],
			rules:{
				Type:webix.rules.isNotEmpty,
				Contact:webix.rules.isNotEmpty,
			},
		};

		let pop = {
			view:"window",
			id:"popup",
			position:"center",
			head:{template:"Add (*edit) activity"}, 
			width: 700,
			body: form
		};
		return pop;
	}
	init(){
		this.on(this.app, "dataActivityEdit", (data) => {
			if(data){
				this.$$("form").setValues(data);
			}
		});
	}
	showWindow() {
		this.getRoot().show();
	}
}


		


