import data from "views/obj";
import {typeActivity} from "models/typeActivity";

export default class countryData extends data{
	ready(view){
		typeActivity.waitData.then(() => {
			view.queryView({ view:"datatable"}).sync(typeActivity);
		});
	}
	add(){
		typeActivity.add({Value:"New Activity",Icon:"Icon"});
	}
	dell(){
		var one = this.table.getSelectedId();
		if(one) typeActivity.remove(one);
	}
}