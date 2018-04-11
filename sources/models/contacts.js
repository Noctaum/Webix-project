export const contacts = new webix.DataCollection({ 
	
	url:"http://localhost:8096/api/v1/contacts/",
	save:"rest->http://localhost:8096/api/v1/contacts/"
});
/*
[
{"id":1,"FirstName":"","LastName":"","StatusID":0,"Company":"","Address":"","Job":"","Website":"","Skype":"","Phone":"","Email":"alex@gmail.com","Photo":"","Birthday":"01-01-0001","StartDate":"01-01-0001"},
{"id":2,"FirstName":"","LastName":"","StatusID":0,"Company":"","Address":"","Job":"","Website":"","Skype":"","Phone":"","Email":"doris@gmail.com","Photo":"","Birthday":"01-01-0001","StartDate":"01-01-0001"},
{"id":3,"FirstName":"Alex","LastName":"Brown","StatusID":0,"Company":"","Address":"","Job":"","Website":"","Skype":"","Phone":"","Email":"","Photo":"","Birthday":"16-08-1988","StartDate":"01-01-0001"}
]
*/
