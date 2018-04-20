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
				{ id:"all", value:_("All") },
				{ id:"over", value:_("Overdue") }, 
				{ id:"complete", value:_("Completed") },
				{ id:"today", value:_("Today") },
				{ id:"tommorow", value:_("Tomorrow") },
				{ id:"week", value:_("This week")},
				{ id:"month", value:_("This month")}
			],
			on:{
				onChange:()=>{
					this.$$("activityData").filterByAll();
				}
			}
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
				{id:"TypeID", header: [_("Activity type") ,{content:"selectFilter"}], sort:"string", options:typeActivity,fillspace:4},
				{id:"DueDate", header:[_("Due date"),{ content:"datepickerFilter"}], sort:"date",fillspace:2},
				{id:"Details", header:[_("Details"), { content:"textFilter"}], sort:"string",fillspace:2},
				{id:"ContactID", header:[_("Contact"),{ content:"selectFilter"}], sort:"string", options:contacts, fillspace:2},
				{id:"edit", header:["",""], template:"{common.editIcon()}",width:40},
				{id:"trash", header:["",""], template:"{common.trashIcon()}",width:40}
			],
			
			//Delete selected activity
			onClick:{
				"fa-trash":function(e,id){
					webix.confirm({
						text:_("Are you sure?"),
						title:"Attention",
						callback:function(result){
							if(result){
								activities.remove(id);
								activities.waitData.then(
									() => webix.message(_("Deleted")),
									()=> webix.message(_("Undeleted"))
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

			this.$$("activityData").registerFilter(this.$$("segmentBar"), 
				{columnId:"DueDate", compare:function(value, filter, item){
					var formatFull = webix.Date.dateToStr("%Y.%n.%j");
					var formatHalf = webix.Date.dateToStr("%Y.%n");
					let parserDay = webix.Date.dateToStr("%j");
					if(filter == "all") return 1; 
					if(filter == "over") return value < new Date() && item.State == "Open";
					if(filter == "complete") return item.State == "Close";
					if(filter == "today") return formatFull(value) == formatFull(new Date());
					if(filter == "tommorow"){
						if(formatHalf(value) == formatHalf(new Date()) && (+parserDay(value)) == (+(parserDay(new Date))+1)) return 1;
					}
					if(filter == "week") return webix.Date.weekStart(value) == webix.Date.weekStart(new Date());
					if(filter == "month") return formatHalf(value) == formatHalf(new Date());
				}},
				{ 
					getValue:function(node){
						return node.getValue();
					},
					setValue:function(node, value){
						node.setValue(value);
					}
				}
			);
		});
	}
}

