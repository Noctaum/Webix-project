import data from "views/obj";
import {status} from "models/status";

export default class statusData extends data{
	ready(){
		status.waitData.then(() => {
			this.table.sync(status);
		});
	}
	add(){
		const _ = this.app.getService("locale")._;

		status.add({Value:_("New Status"), Icon:_("Icon")});
	}
	dell(){ 
		var one = this.table.getSelectedId();
		if(one) status.remove(one);
	}
}

