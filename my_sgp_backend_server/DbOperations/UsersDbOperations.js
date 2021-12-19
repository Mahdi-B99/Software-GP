const pool= require("../DbConfigure");

async function checkUser(username,email,callback){
    let query;
    try { 
        if(username === undefined && email === undefined)  return callback(false)

        else if(username !== undefined && email !== undefined){
        query = "SELECT * FROM users WHERE userName= ? OR email= ?"
        pool.getConnection((err,conn)=>{
            if(err){
             return console.log(err)
            }
            conn.query(query,[username,email], (err,result)=>{
            conn.release();
            if(err){
            console.log(err)
            }
            if(result.length > 0){
             return callback(null,result)
            }
            else{
              let exists=false
                return callback(exists)
            } 
        })
        
    })
        }
        else if(username !== undefined && email === undefined){
         query = "SELECT * FROM users WHERE userName= ?"
         pool.getConnection((err,conn)=>{
            if(err){
             return console.log(err)
            }
            conn.query(query,[username], (err,result)=>{
            conn.release();
            if(err){
            console.log(err)
            }
            if(result.length > 0){
             return callback(null,result)
            }
            else{
              let exists=false
                return callback(exists)
            } 
        })
        
    })
        }
        else if(username === undefined && email !== undefined){
         query ="SELECT * FROM users WHERE email= ?"
         pool.getConnection((err,conn)=>{
            if(err){
             return console.log(err)
            }
            conn.query(query,[email], (err,result)=>{
            conn.release();
            if(err){
            console.log(err)
            }
            if(result.length > 0){
             return callback(null,result)
            }
            else{
              let exists=false
                return callback(exists)
            } 
        })
        
    })

        }
        
       
    } catch (error) {
        console.log(error)
    }
}

async function addNewUser(username,email,password,callback){
   
    try {
       await checkUser(username,email,function (err,result){
           
        if(!result){
            const statement = "INSERT INTO users SET userName=? , email=? , password=?;"
             pool.getConnection((err, conn) => {
              if (err) {
                  return console.log(err);
              }
              conn.query(statement, [username, email, password], (err, result) => {
                  conn.release();
                  if (err) {
                      return console.log(err)
                  }
                  result.message="user Added Successfully !";
                  return callback(result[0]);
              });
              
            })
         } else return callback(null,result)
       })
        

    } catch(error){
        console.log(error)
      
    }
}

async function editUserInfo(username,email,password,image,prevUserName,prevEmail,callback){
    let checkUsername=username
    let checkEmail=email
    try {
        if(username === prevUserName && email === prevEmail){
       checkUsername=undefined
       checkEmail=undefined
        }
        else if(username === prevUserName && email !== prevEmail){
           checkUsername=undefined
           
        }
         else if(username !== prevUserName && email === prevEmail){
             checkEmail=undefined
         }

        await checkUser(checkUsername,checkEmail,function (err,result){
            if(err)
            console.log(err)
       if(!result){
           let query;
           if(image === undefined){
             query = "UPDATE users SET userName= ? , email= ? , password= ? WHERE userName= ?"
             pool.getConnection((err, conn) => {
                if (err) {
                    return console.log(err);
                } 
                conn.query(query, [username, email, password,prevUserName],async (err, result) => {
                    if (err) {
                        return console.log(err)
                    }
                    
                   await findUser(username,function (err,result){
                       conn.release();
                      if(err)
                      console.log(err)
                      result.message="Info Updated Successfully !"
                      return callback(null,result);
                   })
                   
                    
                }); 
              })
           }
           else{
             query = "UPDATE users SET userName= ? , email= ? , password= ? , image= ? WHERE userName= ?"
             pool.getConnection((err, conn) => {
                if (err) {
                    return console.log(err);
                } 
                conn.query(query, [username, email, password,image,prevUserName],async (err, result) => {
                    if (err) {
                        return console.log(err)
                    }
                    
                   await findUser(username,function (err,result){
                       conn.release();
                      if(err)
                      console.log(err)
                      result.message="Info Updated Successfully !"
                      return callback(null,result);
                   })
                   
                    
                }); 
              })
           }
     
      
    } else return callback(null,result) 
    })
     }catch(error){
        console.log(error)
    }
}

async function getUserPhoto(username,callback){

    try {
           const query = "SELECT image FROM users WHERE userName=?"
           pool.getConnection((err, conn) => {
            if (err) {
                return console.log(err);
            }
        
            conn.query(query, [username], (err, result) => {
                conn.release();
                if (err) {
                    return console.log(err)
                }
                return callback(null,result);
            }); 
          })
    } catch (error) {
        
    }
}

async function findUser(username, callback){

    try {
       
        const query = "SELECT userName,email,password FROM users WHERE userName= ? OR email= ?"
      
        
     pool.getConnection( function(err,conn){
        if(err){
            return console.log(err)
        }
      conn.query(query,[username,username], (err,result)=>{
            conn.release();
            if(err){
                console.log(err)
                return;
            }
            
            
            return callback(null,result[0])
           
        })
      
    })
      } catch (error) {
        console.log(error)
    }
    
}
module.exports = {
    addNewUser: addNewUser,
    findUser: findUser,
    editUserInfo:editUserInfo,
    getUserPhoto:getUserPhoto,
}
