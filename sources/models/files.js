export const files = new webix.DataCollection({ 

	data:[
		{id:76, Name:"file1.pdf", DateChange:"01.06.23", Size:"32.5Mb", ContactID:"2"},
		{id:78, Name:"file2.pdf", DateChange:"32.34.33", Size:"1.56Mb", ContactID:"3"},
		{id:79, Name:"file3.pdf", DateChange:"12.23.83", Size:"1.5Mb", ContactID:"2"},
		{id:75, Name:"file4.pdf", DateChange:"11.32.22", Size:"12.3Mb", ContactID:"13"},
		{id:74, Name:"file5.pdf", DateChange:"22.04.15", Size:"5.4Mb", ContactID:"2"},
		{id:73, Name:"file6.pdf", DateChange:"82.42.21", Size:"7.4Mb", ContactID:"3"}
	],
});

export let delFile = (ContactID) => {
	files.data.each(function(data){
		if (data.ContactID == ContactID){
			files.remove(data.id);
		}
	});
};
