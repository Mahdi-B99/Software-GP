const pool= require("../DbConfigure");

async function deleteRefreshToken(token){
    try {
        let query = "DELETE FROM refreshtokens WHERE Token=?"
         pool.getConnection( function(err,conn){
            if(err){
                return console.log(err)
            }
          conn.query(query,[token], (err,result)=>{
                conn.release();
                if(err){
                    console.log(err)
                    return;
                }
                
                
                return result
               
            })
          
        })
          
    } catch (error) {
        console.log(error)
    }

}

async function addRefreshToken(token){

    try {
        let query = "INSERT INTO refreshtokens SET Token= ?"
         pool.getConnection( function(err,conn){
            if(err){
                return console.log(err)
            }
          conn.query(query,[token], (err,result)=>{
                conn.release();
                if(err){
                    console.log(err)
                    return;
                }
                
                
                return result
               
            })
          
        })
          
    } catch (error) {
        console.log(error)
    }

}

async function getRefreshToken(token,callback){

    try {
        let query = "Select Token from refreshtokens Where Token= ?"
        pool.getConnection( function(err,conn){
            if(err){
                return console.log(err)
            }
          conn.query(query,[token], (err,result)=>{
                conn.release();
                if(err){
                    console.log(err)
                    return;
                }
                
                
                return callback(null,result[0])
               
            })
          
        })
          
    } catch (error) {
        
    }

}



module.exports={
    getRefreshToken:getRefreshToken,
    addRefreshToken:addRefreshToken,
    deleteRefreshToken:deleteRefreshToken
}