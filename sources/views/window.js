import {JetView} from "webix-jet";
import {contacts} from "models/contacts";
import {status} from "models/status";
import {activities} from "models/activities";

export default class WindowEdit extends JetView{
	config(){

		let form = {
			view:"form",
			id:"form",
			elements:[{
				rows:[
					{view: "textarea", label: "Details", height: 200, name:"Details"},
					{view:"combo", label:"TypeID", options:{data:status, body:{template:"#Value#"}}, name:"Type", invalidMessage:"Title shouldn't be empty!"},
					{view:"combo", label:"ContactID", options:{data:contacts, body:{template:"#FirstName#"}}, name:"Contact", invalidMessage:"Title shouldn't be empty!"},
					{
						cols:[
							{view:"datepicker", label:"Date", name:"DueDate"},
							{view:"datepicker", label:"Time", type:"time", name:"Time"},
						]
					},
					{view:"checkbox", label:"Completed"},
					{
						cols:[
							{
								view:"button", 
								label:"Add (*save)",
								click: () => { 
									let values = this.$$("form").getValues();
									values.Details=values.Details.replace(/<.*?>/g, "");
									//if(!values.validate())return false;
									if(!values.Contact || !values.Type) {
										webix.alert("Please, fill in the form");
										return false;
									}
									if(values.id){
										activities.updateItem(values.id, values);
										this.$$("popup").hide();
									} else{
										activities.add(values);
										this.$$("popup").hide();
									}
								}
							},
							{view:"button", label:"Cancel", click:() => this.$$("popup").hide()},
						]
					}
				]
			}],
			// rules:{

			//  	Type:webix.rules.isNotEmpty,
			//  	Contact:webix.rules.isNotEmpty,
			//  	"Type":()=>{ if(!this.$$("form").getValues().TypeID) return false;}
			// },
		};

		let pop = {
			view:"window",
			id:"popup",
			position:"center",
			head:{template:"Add (*edit) activity"}, 
			width: 700,
			body: form
			// body:{
			// 	rows:[
			// 		{ 
			// 		    view: "textarea", 
			// 		    label: "Details", 
			// 		    labelAlign: "right", 
			// 		    height: 200, 
			// 		    //value: "type here" 
			// 		},
			// 		{ 
			// 		    view:"combo", 
			// 		    label:"Type", 
			// 		    options:{data:status}
			// 		},
			// 		{ 
			// 		    view:"combo", 
			// 		    label:"Contact", 
			// 		    options:{data:contacts}
			// 		},
			// 		{
			// 			cols:[
			// 				{ 
			// 				    view:"datepicker", 
			// 				    label:"Date", 
			// 					name:"StartDate"
			// 					//id or name??
			// 				},
			// 				{ 
			// 				    view:"datepicker", 
			// 				    label:"Time", 
			// 				    type:"time"
			// 				    //value:"One", 
			// 				    //options:["One", "Two", "Three"]
			// 				},

			// 			]
			// 		},
			// 		{ 
			// 			view:"checkbox", 
			// 			label:"Completed", 
			// 			//value:1
			// 		},
			// 		{
			// 			cols:[
			// 				{ 
			// 					view:"button",
			// 					label:"Add (*save)", 
			// 				},
			// 				{ 
			// 					view:"button",
			// 					label:"Cancel",
			// 					click:() => this.$$("popup").hide() 
			// 				},
			// 			]
			// 		}

			// 	]
			// }
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


		


