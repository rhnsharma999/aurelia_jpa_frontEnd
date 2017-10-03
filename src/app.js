import {data} from './data'
import {HttpClient, json} from 'aurelia-fetch-client';
//import {HttpClient} from 'aurelia-http-client';
export class App {
  constructor() {
    this.message = 'Hello World!';
    this.empData = []
    this.nameField = ''
    this.baseURL = 'http://localhost:8080';
    this.cityField = '';
  }


  refreshData(fetchedData){
  	this.empData = []
  	for(var i = 0; i < fetchedData.length;i++){
  		if(fetchedData[i] != null){
			this.empData.push(new data(fetchedData[i].name,fetchedData[i].city));
		}
  	}

  }
  loadData(){
  	let client = new HttpClient();
  	client.fetch(this.baseURL + '/data/get')
  	  .then(response => response.json())
  	  .then(data => {
  	   	this.refreshData(data);
  	  });
  }
  addData(){
  	console.log('triggered');
  	if(this.nameField && this.cityField){

      let comment = {name:this.nameField,city:this.cityField};
      console.log(comment);

      let client = new HttpClient();

      client
        .fetch(this.baseURL + '/data/post', {
          method: 'post',
          body: json(comment)
        })
        .then(response => response.json())
        .then(savedComment => {
          console.log(savedComment);
          this.loadData();
        })
        .catch(error => {
         
        });




  	}
  }
}
