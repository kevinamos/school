/*SON/2018-11-06 00:29 - DEVELOPMENT

This class carries all of the system's CRUD operations.
All create,read,update and delete operations go through
this class.The methods have been tested and proven to 
be working.Create an instance of the class and call any
of its methods

*/


var mysql = require('mysql');
var express = require('express');
var app = express();
var path =require("path");
var con=require('../common/dbConnect.js');

module.exports = class ModelMaster {


	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The class constructor.Does not take any arguments

*/
    constructor() {
    }

	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The insert function is for insertion of all tables
regardless of their number of columns.Pass it the
table name and a key-value pair of data to insert
with the key being the actual column name on the
database.
	
*/
	static insert(tableName, jsonObject_) {

      return new Promise(function(resolve, reject) {
    	
		  con.query('INSERT INTO ' + tableName + ' SET ?', jsonObject_, function (err, result) {
            if (err){reject(err);}
               else {
				   var returned_value_={success:true, message:"Record inserted succesfully.",recordId:result.insertId};
                   resolve(returned_value_);
                    }
            
            });
		
		
    })
        

    }

	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The selectAll() is to select all data on the
table.Pass it the table name and a callback
function to retrieve back your result

*/
	static selectAll(tableName) {

       return new Promise(function(resolve, reject) {
             con.query('SELECT * FROM ' + tableName + ';', function (err, result, fields) {
                if (err){reject(err);}
                   else {
				        var returned_value_=result;
                        resolve(returned_value_);
                    }
                });
		   
		   })

    }
	
	

	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The selectSpecific() is to select specific a
record(s) on the table depending on the 
arguments you pass to it.Pass it the table 
name and a callback function to retrieve back
your result

*/
	static selectSpecific(tableName,ColumnName,value_) {

     return new Promise(function(resolve, reject) {
        var sql = 'SELECT * FROM '+tableName+' WHERE '+ColumnName+' = '+ mysql.escape(value_);
        con.query(sql, function (err, result) {
            if (err){reject(err);}
                   else {
				        var returned_value_=result;
                        resolve(returned_value_);
                    }

        });
		 
	})


    }
	
	
	
	
	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The selectSpecific() is to select specific a
record(s) on the table depending on the 
arguments you pass to it.Pass it the table 
name and a callback function to retrieve back
your result

*/
	static selectSpecific_with_two_AND_searchkeys(tableName,ColumnNameOne,ValueOne,ColumnNameTwo,ValueTwo) {

     return new Promise(function(resolve, reject) {
        var sql = 'SELECT * FROM '+tableName+' WHERE '+ColumnNameOne+' = '+ mysql.escape(ValueOne)+' AND '+ColumnNameTwo+' = '+ mysql.escape(ValueTwo);
        con.query(sql, function (err, result) {
            if (err){reject(err);}
                   else {
				        var returned_value_=result;
                        resolve(returned_value_);
                    }

        });
		 
	})


    }	
	
	
	
	


/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The selectSpecific() is to select specific a
record(s) on the table depending on the 
arguments you pass to it.Pass it the table 
name and a callback function to retrieve back
your result

*/
	static selectSpecific_with_three_AND_searchkeys_and_bounds(tableName,ColumnNameOne,ValueOne,ColumnNameTwo,ValueTwo,ValueThree,ColumnThree,ColumnFour) {

     return new Promise(function(resolve, reject) {
        var sql = 'SELECT * FROM '+tableName+' WHERE '+ColumnNameOne+' = '+ mysql.escape(ValueOne)+' AND '+ColumnNameTwo+' = '+ mysql.escape(ValueTwo)+' AND '+ValueThree+' BETWEEN '+ColumnThree+' AND '+ColumnFour;
        con.query(sql, function (err, result) {
            if (err){reject(err);}
                   else {
				        var returned_value_=result;
                        resolve(returned_value_);
                    }

        });
		 
	})


    }	
	





/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The selectSpecific() is to select specific a
record(s) on the table depending on the 
arguments you pass to it.Pass it the table 
name and a callback function to retrieve back
your result

*/
	static select_two_searchkeys_and_bounds(tableName,ColumnNameOne,ValueOne,ValueTwo,ColumnTwo,ColumnThree) {

     return new Promise(function(resolve, reject) {
        var sql = 'SELECT * FROM '+tableName+' WHERE '+tableName+'.'+ColumnNameOne+'='+mysql.escape(ValueOne)+' AND '+mysql.escape(ValueTwo)+' BETWEEN '+tableName+'.'+ColumnTwo+' AND '+tableName+'.'+ColumnThree+';';
        con.query(sql, function (err, result) {
            if (err){reject(err);}
                   else {
				        var returned_value_=result;
                        resolve(returned_value_);
                    }

        });
		 
	})


    }	








	
	
	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The batch_update() makes a similar update on all
records of the table you pass to it.Pass it the 
table name and the key-value pair of the updates
to make.

*/	
	static batch_update(tableName,jsonObject_) {
	return new Promise(function(resolve, reject) {	

        con.query('UPDATE ' + tableName + ' SET ?', jsonObject_, function (err, result) {
            if (err){reject(err);}
                   else {
				        var returned_value_="Update was Successful";
                        resolve(returned_value_);
                    }
        });
		
	})

   }
	
	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
individual_update() updates a specific record(s).

*/	
	static individual_update(tableName,jsonObject_,ColumnName,value_) {
		
      return new Promise(function(resolve, reject) {
    	
		var selectSpecificPromise = ModelMaster.selectSpecific(tableName,ColumnName,value_);
		  
		selectSpecificPromise.then(function(result) {
        
			var returned_value_=result;
			
			if(returned_value_.length===0)
			{
			returned_value_="No such record exists";
				resolve(returned_value_);
			}else{
			
			con.query('UPDATE ' + tableName + ' SET ? WHERE '+ColumnName+' = '+ mysql.escape(value_), jsonObject_, function (err, result) {
            if (err){reject(err);}
            
			var returned_value_="Update was Successful";
            resolve(returned_value_);
            });

			
			}
			
        }, function(err) {
        console.log(err);
        })
		
    })
        
		
    }
	
	
	
	
	
	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
individual_update() updates a specific record(s).

*/	
	static update_with_two_AND_searchkeys(TableName,JsonObject,ColumnOne,ValueOne,ColumnTwo,ValueTwo) {
		
      return new Promise(function(resolve, reject) {
    	
		
			
			con.query('UPDATE ' + TableName + ' SET ? WHERE '+ColumnOne+' = '+ mysql.escape(ValueOne)+' AND '+ColumnTwo+' = '+ mysql.escape(ValueTwo),JsonObject, function (err, result) {
            if (err){reject(err);}
            
			var returned_value_={success:true, message:"Record updated succesfully."};
            resolve(returned_value_);
            });

			
			
			
        }, function(err) {
        console.log(err);
        })
		
    
        
		
    }		
	
	
	
	
	
	
	
	
	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
individual_update() updates a specific record(s).

*/	
	static individual_update_with_two_AND_searchkeys(TableName,ColumnOneToBeSet,ValueOneToBeSet,ColumnTwoToBeSet,ValueTwoToBeSet,ColumnOne,ValueOne,ColumnTwo,ValueTwo) {
		
      return new Promise(function(resolve, reject) {
    	
		
			
			con.query('UPDATE ' + TableName + ' SET '+ColumnOneToBeSet+'='+ mysql.escape(ValueOneToBeSet)+','+ColumnTwoToBeSet+'='+ mysql.escape(ValueTwoToBeSet)+' WHERE '+ColumnOne+' = '+ mysql.escape(ValueOne)+' AND '+ColumnTwo+' = '+ mysql.escape(ValueTwo), function (err, result) {
            if (err){reject(err);}
            
			var returned_value_={success:true, message:"Record updated succesfully."};
            resolve(returned_value_);
            });

			
			
			
        }, function(err) {
        console.log(err);
        })
		
    
        
		
    }	
	
	
	
	
	

/*SON/2018-11-06 00:29 - DEVELOPMENT
	
individual_update() updates a specific record(s).

*/	
	static three_updates_with_two_AND_searchkeys(TableName,ColumnOneToBeSet,ValueOneToBeSet,ColumnTwoToBeSet,ValueTwoToBeSet,ColumnThreeToBeSet,ValueThreeToBeSet,ColumnOne,ValueOne,ColumnTwo,ValueTwo) {
		
      return new Promise(function(resolve, reject) {
    	
		
			
			con.query('UPDATE ' + TableName + ' SET '+ColumnOneToBeSet+'='+ mysql.escape(ValueOneToBeSet)+','+ColumnTwoToBeSet+'='+ mysql.escape(ValueTwoToBeSet)+','+ColumnThreeToBeSet+'='+ mysql.escape(ValueThreeToBeSet)+' WHERE '+ColumnOne+' = '+ mysql.escape(ValueOne)+' AND '+ColumnTwo+' = '+ mysql.escape(ValueTwo), function (err, result) {
            if (err){reject(err);}
            
			var returned_value_={success:true, message:"Record updated succesfully."};
            resolve(returned_value_);
            });

			
			
			
        }, function(err) {
        console.log(err);
        })
		
    
        
		
    }	




	
	
	
	
	

	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
delete() deletes a specific record(s).

*/	
	
	static delete(tableName,ColumnName,value_,UserIdColumnName,UserId) {
		
		
		return new Promise(function(resolve, reject) {
    	
		var selectSpecificPromise = ModelMaster.selectUserSpecific(tableName,ColumnName,value_,UserIdColumnName,UserId);
		  
		selectSpecificPromise.then(function(result) {
        
			var returned_value_=result;
			
			if(returned_value_.length===0)
			{
			returned_value_="No such record exists";
				resolve(returned_value_);
			}else{
			
			con.query('DELETE FROM ' + tableName + ' WHERE '+ColumnName+' = '+ mysql.escape(value_)+' AND '+UserIdColumnName+' = '+ mysql.escape(UserId), function (err, result) {
            if (err){reject(err);}
            
			var returned_value_="Record Succesfully Deleted";
            resolve(returned_value_);
            });

			
			}
			
        }, function(err) {
        console.log(err);
        })
		
    })
		
   }
	
	

	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
batch_program() is a special function that handles batch jobs.

*/	
	
   static batch_program(){
	return new Promise(function(resolve, reject) {
	if (err) {reject(err);}
       con.query("SELECT * FROM users", function (err, result, fields) {
       if (err) throw err;
	   for (var i = 0; i < result.length; i++) {
		  
        con.query("SELECT * FROM users WHERE users.id = "+result[i].id, function (err, result) {
         if (err) {reject(err);}
         resolve(result);
          });
         }
     });

	})
   }
	
	

	
	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The two_table_inner_join() is used to conduct
an inner join query between two tables

*/	
	static two_table_inner_join(TableOne,TableTwo,JoiningKey,SearchColumn,SearchValue) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKey+' = '+TableTwo+'.'+JoiningKey+' WHERE '+TableTwo+'.'+SearchColumn+'= '+ mysql.escape(SearchValue),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }
   
   
   
   
   
   
   
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The two_table_inner_join() is used to conduct
an inner join query between two tables

*/	
	static two_table_inner_join_searchKeys_on_each_table(TableOne,TableTwo,JoiningKey,SearchColumnOne,SearchValueOne,SearchColumnTwo,SearchValueTwo) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKey+' = '+TableTwo+'.'+JoiningKey+' WHERE '+TableOne+'.'+SearchColumnOne+'= '+ mysql.escape(SearchValueOne)+' AND '+TableTwo+'.'+SearchColumnTwo+'='+ mysql.escape(SearchValueTwo),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }   
   
   
   
   
   
   
   
   
   
   
   /*SON/2018-11-06 00:29 - DEVELOPMENT
	
The two_table_inner_join() is used to conduct
an inner join query between two tables

*/	
	static two_table_inner_join_with_no_condition(TableOne,TableTwo,JoiningKey) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKey+' = '+TableTwo+'.'+JoiningKey,function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }
   
   
   
   
   
   
   
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The two_table_inner_join() is used to conduct
an inner join query between two tables

*/	
	static two_table_inner_join_two_AND_searchkeys(TableOne,TableTwo,JoiningKey,SearchColumnOne,SearchValueOne,SearchColumnTwo,SearchValueTwo) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKey+' = '+TableTwo+'.'+JoiningKey+' WHERE '+TableTwo+'.'+SearchColumnOne+'= '+ mysql.escape(SearchValueOne)+ ' AND '+TableTwo+'.'+SearchColumnTwo+'= '+ mysql.escape(SearchValueTwo),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }   
   
   
   
   
   
   
   
   
   
   
   
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The two_table_inner_join() is used to conduct
an inner join query between two tables

*/	
	static inverted_two_table_inner_join(TableOne,TableTwo,JoiningKey,SearchColumn,SearchValue) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKey+' = '+TableTwo+'.'+JoiningKey+' WHERE '+TableOne+'.'+SearchColumn+'= '+ mysql.escape(SearchValue),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }   
   
   
   
   
   
   
   
	
	
	
	
   /*SON/2018-11-06 00:29 - DEVELOPMENT
	
The three_table_one_parent_with_searchkey_inner_join() is used to conduct
an inner join query between three tables where one table(TableOne) is the parent 
of the other two,and there is a WHERE clause

*/	
	static three_table_one_parent_with_searchkey_inner_join(TableOne,TableTwo,TableThree,JoiningKeyOne,JoiningKeyTwo,SearchColumn,SearchValue) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKeyOne+' = '+TableTwo+'.'+JoiningKeyOne+' INNER JOIN '+TableThree+' ON '+TableOne+'.'+JoiningKeyTwo+' = '+TableThree+'.'+JoiningKeyTwo+' WHERE '+TableOne+'.'+SearchColumn+'= '+ mysql.escape(SearchValue),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }
   
   
   
   
   
   
   
   /*SON/2018-11-06 00:29 - DEVELOPMENT
	
The three_table_one_parent_with_searchkey_inner_join() is used to conduct
an inner join query between three tables where one table(TableOne) is the parent 
of the other two,and there is a WHERE clause

*/	
	static three_table_linear_inner_join(TableOne,TableTwo,TableThree,JoiningKeyOne,JoiningKeyTwo,SearchColumn,SearchValue) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM `academic_class_levels` INNER JOIN `classes` ON `academic_class_levels`.`AcademicClassLevelId`=`classes`.`AcademicClassLevelId` INNER JOIN `students` ON `classes`.`ClassId`=`students`.`ClassId` WHERE `students`.`ClassId`=5;',function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }   
   
   
   
   
   
   
   
   
	
	
	
      /*SON/2018-11-06 00:29 - DEVELOPMENT
	
The three_table_one_parent_no_searchkey_inner_join() is used to conduct
an inner join query between three tables where one table(TableOne) is the parent 
of the other two,and there is no WHERE clause

*/	
	static three_table_one_parent_no_searchkey_inner_join(TableOne,TableTwo,TableThree,JoiningKeyOne,JoiningKeyTwo) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKeyOne+' = '+TableTwo+'.'+JoiningKeyOne+' INNER JOIN '+TableThree+' ON '+TableOne+'.'+JoiningKeyTwo+' = '+TableThree+'.'+JoiningKeyTwo,function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }
	
	
	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
batch_program() is a special function that handles batch jobs.

*/	
	
   static concatenate_two_query_results(){
	return new Promise(function(resolve, reject) {
	if (err) {reject(err);}
       con.query("SELECT * FROM users", function (err, result, fields) {
       if (err) throw err;
	   for (var i = 0; i < result.length; i++) {
		  
        con.query("SELECT * FROM users WHERE users.id = "+result[i].id, function (err, result) {
         if (err) {reject(err);}
         resolve(result);
          });
         }
     });

	})
   }
	
	
   
	

	
	
/*This function implements a select query based on the session Id/User making this request*/	
	static user_specific_select_query(tableName,ColumnName,value_,UserIdColumnName,UserId) {

     return new Promise(function(resolve, reject) {
        var sql = 'SELECT * FROM '+tableName+' WHERE '+ColumnName+' = '+ mysql.escape(value_)+' AND '+UserIdColumnName+' = '+ mysql.escape(UserId);
        con.query(sql, function (err, result) {
            if (err){reject(err);}
                   else {
				        var returned_value_=result;
                        resolve(returned_value_);
                    }

        });
		 
	})


    }
	

	
	
	
	
	
/*This function gets the number of records in a table.*/	
	
	static get_number_of_records(tableName,ColumnName,value_) {

     return new Promise(function(resolve, reject) {
        var sql = 'SELECT COUNT(*) AS NumberOfRecords FROM '+tableName+' WHERE '+ColumnName+' = '+ mysql.escape(value_);
        con.query(sql, function (err, result) {
            if (err){reject(err);}
                   else {
				        var returned_value_=result;
                        resolve(returned_value_);
                    }

        });
		 
	})


    }
	
	
	
	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The two_table_inner_join() is used to conduct
an inner join query between two tables but 
with no WHERE clause(No condition)

*/	
	static two_table_inner_join_with_no_condition(TableOne,TableTwo,JoiningKey) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKey+' = '+TableTwo+'.'+JoiningKey,function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }	
	
	
	
	
	
	
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The five_table_inner_join_one_grandparent_two_parents_two_grandchildren_from_one_parent_no_searchkey() is used to conduct
an inner join query between five  tables where one table(TableOne) is the Grandparent 
of the other two parents,One parent has two children while the other is barren,and there is no WHERE clause

*/	
	static five_table_inner_join_one_grandparent_two_parents_two_grandchildren_from_one_parent_no_searchkey(TableOne,TableTwo,TableThree,TableFour,TableFive,JoiningKeyOne,JoiningKeyTwo,JoiningKeyThree,JoiningKeyFour) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKeyOne+' = '+TableTwo+'.'+JoiningKeyOne+' INNER JOIN '+TableThree+' ON '+TableOne+'.'+JoiningKeyTwo+' = '+TableThree+'.'+JoiningKeyTwo+' INNER JOIN '+TableFour+' ON '+TableThree+'.'+JoiningKeyThree+' = '+TableFour+'.'+JoiningKeyThree+' INNER JOIN '+TableFive+' ON '+TableThree+'.'+JoiningKeyFour+' = '+TableFive+'.'+JoiningKeyFour,function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }
   
   
   
   
   
   
   
   
   
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The four_table_inner_join_one_grandparent_two_parents_one_grandchild_from_one_parent_searchkey_on_prolific_parent() is used to conduct
an inner join query between four  tables where one table(TableOne) is the Grandparent 
of the other two parents,One parent has one child while the other is barren,and there is a WHERE clause on the prolific parent

*/	
	static four_table_inner_join_one_grandparent_two_parents_one_grandchild_from_one_parent_searchkey_on_prolific_parent(TableOne,TableTwo,TableThree,TableFour,JoiningKeyOne,JoiningKeyTwo,JoiningKeyThree,SearchColumn,SearchValue) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKeyOne+' = '+TableTwo+'.'+JoiningKeyOne+' INNER JOIN '+TableThree+' ON '+TableOne+'.'+JoiningKeyTwo+' = '+TableThree+'.'+JoiningKeyTwo+' INNER JOIN '+TableFour+' ON '+TableThree+'.'+JoiningKeyThree+' = '+TableFour+'.'+JoiningKeyThree+' WHERE '+TableThree+'.'+SearchColumn+'= '+ mysql.escape(SearchValue),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }	
   
   
   
   
   
   
/*SON/2018-11-06 00:29 - DEVELOPMENT
	
The one_grandparent_one_parent_two_children_two_grandchildren_from_one_child() is used to conduct
an inner join query between six  tables, one grandParent(TableOne), one parent(TableTwo),two children(table Three and four)
and two grandchildren(Tables five and six) from one child(TableFour)

*/	
	static one_grandparent_one_parent_two_children_two_grandchildren_from_one_child(TableOne,TableTwo,TableThree,TableFour,TableFive,TableSix,JoiningKeyOne,JoiningKeyTwo,JoiningKeyThree,JoiningKeyFour,JoiningKeyFive,SearchColumn,SearchValue) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM '+TableOne+' INNER JOIN '+TableTwo+' ON '+TableOne+'.'+JoiningKeyOne+' = '+TableTwo+'.'+JoiningKeyOne+' INNER JOIN '+TableThree+' ON '+TableTwo+'.'+JoiningKeyTwo+' = '+TableThree+'.'+JoiningKeyTwo+' INNER JOIN '+TableFour+' ON '+TableTwo+'.'+JoiningKeyThree+' = '+TableFour+'.'+JoiningKeyThree+' INNER JOIN '+TableFive+' ON '+TableFour+'.'+JoiningKeyFour+' = '+TableFive+'.'+JoiningKeyFour+' INNER JOIN '+TableSix+' ON '+TableFour+'.'+JoiningKeyFive+' = '+TableSix+'.'+JoiningKeyFive+' WHERE '+TableOne+'.'+SearchColumn+'= '+ mysql.escape(SearchValue),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }
   
   
   
   
   
   
   
   
   
   
   /*SON/2018-11-06 00:29 - DEVELOPMENT
	
The one_grandparent_one_parent_two_children_two_grandchildren_from_one_child() is used to conduct
an inner join query between six  tables, one grandParent(TableOne), one parent(TableTwo),two children(table Three and four)
and two grandchildren(Tables five and six) from one child(TableFour)

*/	
	static getting_a_results_table_row(AdmissionNo,FieldId) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM fields_ INNER JOIN subjects ON fields_.fieldId=subjects.FieldId INNER JOIN class_specific_subjects ON subjects.SubjectId=class_specific_subjects.SubjectId INNER JOIN exam_papers ON class_specific_subjects.ClassSpecificSubjectId=exam_papers.ClassSpecificSubjectId INNER JOIN specific_student_exam_papers ON exam_papers.ExamPaperId=specific_student_exam_papers.ExamPaperId INNER JOIN students ON specific_student_exam_papers.AdmissionNo=students.AdmissionNo WHERE students.AdmissionNo='+AdmissionNo+' AND fields_.fieldId= '+ mysql.escape(FieldId),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }
	
	





   /*SON/2018-11-06 00:29 - DEVELOPMENT
	
The one_grandparent_one_parent_two_children_two_grandchildren_from_one_child() is used to conduct
an inner join query between six  tables, one grandParent(TableOne), one parent(TableTwo),two children(table Three and four)
and two grandchildren(Tables five and six) from one child(TableFour)

*/	
	static get_any_unsubmitted_marks(ExamId) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM staff_members INNER JOIN teachers_class_specific_subjects ON staff_members.StaffNo=teachers_class_specific_subjects.StaffNo INNER JOIN class_specific_subjects ON teachers_class_specific_subjects.ClassSpecificSubjectId=class_specific_subjects.ClassSpecificSubjectId INNER JOIN subjects ON class_specific_subjects.SubjectId=subjects.SubjectId INNER JOIN classes ON classes.ClassId=class_specific_subjects.ClassId INNER JOIN academic_class_levels ON classes.AcademicClassLevelId=academic_class_levels.AcademicClassLevelId INNER JOIN class_streams ON classes.ClassStreamId=class_streams.ClassStreamId INNER JOIN exam_papers ON class_specific_subjects.ClassSpecificSubjectId=exam_papers.ClassSpecificSubjectId INNER JOIN exams ON exam_papers.ExamId=exams.ExamId INNER JOIN specific_student_exam_papers ON exam_papers.ExamPaperId=specific_student_exam_papers.ExamPaperId INNER JOIN students ON specific_student_exam_papers.AdmissionNo=students.AdmissionNo WHERE specific_student_exam_papers.IsMarkSubmited=0 AND exams.ExamId='+ mysql.escape(ExamId),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }






	static get_a_specific_students_class_by_full_reference(AdmissionNo) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM `academic_class_levels` INNER JOIN classes ON academic_class_levels.AcademicClassLevelId=classes.AcademicClassLevelId INNER JOIN class_streams ON classes.ClassStreamId=class_streams.ClassStreamId INNER JOIN students ON students.ClassId=classes.ClassId WHERE students.AdmissionNo='+ mysql.escape(AdmissionNo),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }	
   
   
   
   
   
   
   
   
	static get_a_students_Fields(AdmissionNo) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT DISTINCT fields_.fieldId FROM fields_ INNER JOIN subjects ON fields_.fieldId=subjects.FieldId INNER JOIN class_specific_subjects ON subjects.SubjectId=class_specific_subjects.SubjectId INNER JOIN student_class_specific_subject_rship ON class_specific_subjects.ClassSpecificSubjectId=student_class_specific_subject_rship.ClassSpecificSubjectId WHERE student_class_specific_subject_rship.AdmissionNo='+ mysql.escape(AdmissionNo),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }
   
   
   
   
   
   
   

	static get_results_for_a_particular_class_level(AcademicClassLevelId,ExamId) {
	return new Promise(function(resolve, reject) {	

        con.query('SELECT * FROM academic_class_levels INNER JOIN classes ON academic_class_levels.AcademicClassLevelId=classes.AcademicClassLevelId INNER JOIN students ON students.ClassId=classes.ClassId INNER JOIN primary_results_table ON students.AdmissionNo=primary_results_table.AdmissionNo WHERE academic_class_levels.AcademicClassLevelId='+ mysql.escape(AcademicClassLevelId)+' AND primary_results_table.ExamId='+ mysql.escape(ExamId),function (err, result) {
            if (err){reject(err);}
                   else {
				        
                        resolve(result);
                    }
        });
		
	})

   }




	

}