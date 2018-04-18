import {JetView} from "webix-jet";
import aUserFile from "views/individualFileTable";
import aUserActiv from "views/individualActivitiTable";

export default class aUserDataView extends JetView{
	config(){

		const _ = this.app.getService("locale")._;

		let top = {rows:[
			{
				view: "tabbar", 
				id: "activBar", 
				value:_("activ"), 
				multiview: true, 
				options: [
					{ value: "Activities", id: "activ"},
					{ value: "Files", id: "files"},
				]
			},
			{cells:[aUserActiv,aUserFile]}
		]};

		return top;
	}
}





					

