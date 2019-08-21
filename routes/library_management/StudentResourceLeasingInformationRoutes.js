/*SON/2018-11-06 00:29 - DEVELOPMENT
This class is the student_resource_leasing_information table's route class.
It is initialized at the "Index.js" and is able to recieve
calls from the client and passes the calls down to the 
"StudentResourceLeasingInformationController" class
*/



const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const StudentResourceLeasingInformationController = require('../../controllers/library_management/StudentResourceLeasingInformationController.js');



   //Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  
  next();
});



   router.post('/add_student_resource_leasing_information', urlencodedParser,function(request,response){
	   
	    var date = new Date();
        date.setHours(date.getHours()+0);
	   
        var	jsonObject_ = {
         
			
			
			
			
			SRLITId:request.body.SRLITId,
			StudentResourceLeasingId:request.body.StudentResourceLeasingId,
			Information:request.body.Information,
			RecordedBy:request.body.RecordedBy,
			RecordedDate:date
			
			
				
        };
	
	     
          var myPromise = StudentResourceLeasingInformationController.insert(jsonObject_);
	          
		   
		   myPromise.then(function(result) {
        
           var response_object={results:result}
           response.send(response_object);
           }, function(err) {
			   console.log(err);
           response.send("An error occurred");
           })

    });






   router.post('/get_all_student_resource_leasing_information',urlencodedParser,function(request,response){
    
    var myPromise = StudentResourceLeasingInformationController.get_all_records();
	      
		   
		   myPromise.then(function(result) {
        
           var response_object={results:result}
           response.send(response_object);
           }, function(err) {
			   console.log(err);
           response.send("An error occurred");
           })

   });









   router.post('/get_specific_student_resource_leasing_information',urlencodedParser,function(request,response){
        var mKey=request.body.column_name;
        //var mValue=parseInt(request.query.search_value, 10);
        var mValue=request.body.search_value;
       
        


        var myPromise = StudentResourceLeasingInformationController.get_specific_records(mKey,mValue);
	        
		   
		   myPromise.then(function(result) {
           var response_object={results:result}
           response.send(response_object);
           }, function(err) {
           response.send("An error occurred");
			   console.log(err);
           })
	        

     });













   router.post('/update_student_resource_leasing_information',urlencodedParser,function(request,response){
	   
	  
	   var date = new Date();
        date.setHours(date.getHours()+0);
	   
        var	jsonObject_ = {
         
			
			
			SRLITId:request.body.SRLITId,
			StudentResourceLeasingId:request.body.StudentResourceLeasingId,
			Information:request.body.Information,
			RecordedBy:request.body.RecordedBy,
			RecordedDate:date
			
			
				
        };
	
	
    
    var myPromise = StudentResourceLeasingInformationController.batch_update(jsonObject_);
	   
		   
		   myPromise.then(function(result) {
        
           var response_object={results:result}
           response.send(response_object);
           }, function(err) {
           response.send("An error occurred");
			   console.log(err);
           })

   });








   router.post('/update_individual_student_resource_leasing_information',urlencodedParser,function(request,response){
	
          var column_name=request.body.ColumnName;
          var value_=request.body.ColumnValue;
	   
	   
	
          var date = new Date();
        date.setHours(date.getHours()+0);
	   
        var	jsonObject_ = {
         
			
			
			
			SRLITId:request.body.SRLITId,
			StudentResourceLeasingId:request.body.StudentResourceLeasingId,
			Information:request.body.Information,
			RecordedBy:request.body.RecordedBy,
			RecordedDate:date
			
			
				
        };
	
         
         var myPromise = StudentResourceLeasingInformationController.individual_record_update(column_name,value_,jsonObject_);
	         	        
		   
		   myPromise.then(function(result) {
        
           var response_object={results:result}
           response.send(response_object);
           }, function(err) {
           response.send("An error occurred");
			   console.log(err);
           })

  });






   router.post('/delete_individual_student_resource_leasing_information',urlencodedParser,function(request,response){
	
    var column_name=request.body.column_name;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_=request.body.search_value;
	   
	var UserIdColumnName=request.body.UserIdColumnName;
	   
	var UserId=request.body.UserId;
	
    
    var myPromise = StudentResourceLeasingInformationController.delete_user_specic_record(column_name,value_,UserIdColumnName,UserId);
	      	        
		   
		   myPromise.then(function(result) {
        
           var response_object={results:result}
           response.send(response_object);
           }, function(err) {
           response.send("An error occurred");
			   console.log(err);
           })

   });






   router.post('/get_number_of_student_resource_leasing_information_records',urlencodedParser,function(request,response){
	
    var column_name=request.body.column_name;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_=request.body.search_value;
	
	
    
    var myPromise = StudentResourceLeasingInformationController.get_number_of_records(column_name,value_);
	      	        
		   
		   myPromise.then(function(result) {
        
           var response_object={results:result}
           response.send(response_object);
           }, function(err) {
           response.send("An error occurred");
			   console.log(err);
           })

   });







router.post('/student_resource_leasing_information_user_specific_query',urlencodedParser,function(request,response){
	
    var ColumnName=request.body.ColumnName;
    //var mValue=parseInt(request.body.search_value, 10);
    var value_=request.body.value_;
	
	var UserIdColumnName=request.body.UserIdColumnName;
	
	var UserId=request.body.UserId;
	
	
    
    var myPromise = StudentResourceLeasingInformationController.user_specific_select_query(ColumnName,value_,UserIdColumnName,UserId);
	      	        
		   
		   myPromise.then(function(result) {
        
           var response_object={results:result}
           response.send(response_object);
           }, function(err) {
           response.send("An error occurred");
			   console.log(err);
           })

   });




 
 
module.exports = router;
