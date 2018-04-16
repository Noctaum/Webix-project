import {JetView} from "webix-jet";
import {activities} from "models/activities";
import {typeActivity} from "models/typeActivity";
import {contacts} from "models/contacts";
import WindowEdit from "views/window";

export default class DataView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		//Top segment for datatable
		let segmFilter = {
			view:"segmented",
			id:"segmentBar",
			gravity:5, 
			options:[
				{ id:"all", value:"All" },
				{ id:"over", value:"Overdue" }, 
				{ id:"complete", value:"Completed" },
				{ id:"today", value:"Today" },
				{ id:"tommorow", value:"Tomorrow" },
				{ id:"week", value:"This week"},
				{ id:"month", value:"This month"}
			],
		
		};

		//Add Button, add new activity
		let addBut = { 
			view:"button",
			type:"iconButton",
			icon:"plus",
			label:_("Add activity"), 
			click:() => {
				this.app.callEvent("dataActivityEdit", [{}]);
				this._jetPopup.showWindow();
			}
		};

		//Table for activity
		let datatable = {
			view: "datatable",
			id:"activityData",
			datatype:"json",
			select:true,
			columns:[
				{id:"State", header:["",""], sort:"string", template:"{common.checkbox()}", uncheckValue:"Open", checkValue:"Close",width:40},
				{id:"TypeID", header: ["Activity type" ,{content:"selectFilter"}], sort:"string", options:typeActivity,fillspace:4},
				{id:"DueDate", header:["Due date",{ content:"datepickerFilter"}], sort:"date",fillspace:2},
				{id:"Details", header:["Details", { content:"textFilter"}], sort:"string",fillspace:2},
				{id:"ContactID", header:["Contact",{ content:"selectFilter"}], sort:"string", options:contacts, fillspace:2},
				{id:"edit", header:["",""], template:"{common.editIcon()}",width:40},
				{id:"trash", header:["",""], template:"{common.trashIcon()}",width:40}
			],
			
			//Delete selected activity
			onClick:{
				"fa-trash":function(e,id){
					webix.confirm({
						text:"Are you sure?",
						title:"Attention",
						callback:function(result){
							if(result){
								activities.remove(id);
								activities.waitData.then(
									() => webix.message("Deleted"),
									()=> webix.message("Undeleted")
								);
							}
						}
					});
					return false;
				},
				
				//Edit selected activity
				"fa-pencil":()=>{
					let values = this.$$("activityData").getSelectedItem();
					this.app.callEvent("dataActivityEdit", [values]);
					this._jetPopup.showWindow(); 

				}
			},
		};

		return {rows:[
			{cols:[segmFilter,{}, addBut]},
			datatable
		]};
	}
	
	init(){
		this._jetPopup = this.ui(WindowEdit);
		activities.waitData.then(() => {
			this.$$("activityData").sync(activities);
		});
	}
}

