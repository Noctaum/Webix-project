import data from "views/obj";
import {status} from "models/status";

export default class statusData extends data{
	ready(view){
		status.waitData.then(() => {
			view.queryView({ view:"datatable"}).sync(status);
		});
	}
	add(){
		status.add({Value:"New Status", Icon:"Icon"});
	}
	dell(){ 
		var one = this.table.getSelectedId();
		if(one) status.remove(one);
	}
}

