//import JWT
const jwt=require('jsonwebtoken');

//import db
const db=require('./db')

//database
userDetails={
    1000:{acno:1000,username:"Amal",password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:"Amal1",password:1001,balance:1000,transaction:[]},
    1002:{acno:1002,username:"Amal2",password:1002,balance:1000,transaction:[]},
  
  }

// const register(db.User.findOne({acno}))

const register=(acno,username,password)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
      return {
        staus:false,
        statusCode:400,
        message:'User already registered'
      }
    }
    else{
      const newUser=new db.User({
        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[]
      })
      newUser.save();
      return{
        staus:true,
        statusCode:200,
        message:'Registered successfully'
      }
    }
  })
}
  //   if(acno in userDetails){
  //     return {
  //       staus:'false',
  //       statusCode:400,
  //       message:'User already registered'
  //     }
  //   }
  //   else{
  //     userDetails[acno]={
  //       acno,
  //       username,
  //       password,
  //       balance:0,
  //       transaction:[]
  //     }
  //     console.log(userDetails);
  //     return {
  //       staus:'true',
  //       statusCode:200,
  //       message:'Registered successfully'
  //     }
      
  //   }
  // }

  // register=(acno,username,password)=>{
  //   if(acno in userDetails){
  //     return {
  //       staus:'false',
  //       statusCode:400,
  //       message:'User already registered'
  //     }
  //   }
  //   else{
  //     userDetails[acno]={
  //       acno,
  //       username,
  //       password,
  //       balance:0,
  //       transaction:[]
  //     }
  //     console.log(userDetails);
  //     return {
  //       staus:'true',
  //       statusCode:200,
  //       message:'Registered successfully'
  //     }
      
  //   }
  // }

const login=(acno,pswd)=>{
  return db.User.findOne({acno,pswd})//data
  .then(user=>{
    if(user){
     
     currentUser=user.username  
      currentAcno=acno
      const token=jwt.sign({currentAcno:acno},'superkey2022')
      return {
        staus:true,
        statusCode:200,
        message:'Login successful',
        token:token,
        currentUser:currentUser,
        currentAcno:currentAcno
      }
    }
    else{
      return {
        staus:false,
        statusCode:400,
        message:'Invalid userdetails'
      }
    }
  })
}
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno]['password']){
    //     currentUser=userDetails[acno]['username'];  
    //     currentAcno=acno;   
    //     const token=jwt.sign({
    //       currentAcno:acno},
    //       'superkey2022')//To generate token 
    //       //It will generate a number and it will assigns it to the token 
    //     return {
    //       staus:'true',
    //       statusCode:200,
    //       message:'Login successful',
    //       token:token
    //     }
    //   }
    //   else{
    //     return {
    //       staus:'false',
    //       statusCode:400,
    //       message:'Password incorrect'
    //     }
    //   }
    // }
    // else{
    //   return {
    //     staus:'false',
    //     statusCode:400,
    //     message:'Invalid user details'
    //   }
    // }
  

const deposit=(acno,pswd,amount)=>{
  console.log(amount);
    var amount=parseInt(amount)||0;
    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){
        user.balance+=amount;
        user.transaction.push({
          Type:'Credit',
          Amount:amount
        })
        user.save();
        return {
          staus:true,
          statusCode:200,
          message:`${amount} is credited and balance is ${user.balance}`
        }
      }
      else{
        return {
          staus:false,
          statusCode:400,
          message:'Incorrect userdetails'
        }
      }
    })
  } 
    
    // {

    //   if(pswd==userDetails[acno]['password']){
    //     userDetails[acno]['balance']+=amount;
    //     userDetails[acno]['transaction'].push({
    //       Type:'Credit',
    //       Amount:amount
    //     })
    //     return {
    //       staus:'true',
    //       statusCode:200,
    //       message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`
    //     }
    //     // console.log(userDetails);
  
    //     // return userDetails[acno]['balance']
    //   }
    //   else{
    //     // alert('Password incorrect');
    //     return {
    //       staus:'false',
    //       statusCode:400,
    //       message:'Password incorrect'
    //     }
    //   }
    // }
    // else{
    //   // alert('User not found');
    //   return {
    //     staus:'false',
    //     statusCode:400,
    //     message:'Invalid user details'
    //   }
    // }
  

 const withdraw=(acno,pswd,amount)=>{
    var amount=parseInt(amount)||0;
    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){
        if(user.balance>amount){
           user.balance-=amount;
          user.transaction.push({
            Type:'Debit',
            Amount:amount
          })
          user.save();
          return {
            staus:'true',
            statusCode:200,
            message:`${amount} is debited and balance is ${user.balance}`
          }}
          else{
            return {
              staus:'false',
              statusCode:400,
              message:'Insufficient balance'
            }
          }
      }
      else{
        return {
          staus:'false',
          statusCode:400,
          message:'Invalid user details'
        }
      }
    })
  }
    
  //   {
  //     if(pswd==userDetails[acno]['password']){
  //       if(amount<userDetails[acno]['balance']){      
  //       userDetails[acno]['balance']-=amount;
  //       userDetails[acno]['transaction'].push({
  //         Type:'Debit',
  //         Amount:amount
  //       })
  //       console.log(userDetails);
  
  //       return {
  //         staus:'true',
  //         statusCode:200,
  //         message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`
  //       }
  //     }
  //     else{
  //       // alert('Inssuficient balance');
  //       return {
  //         staus:'false',
  //         statusCode:400,
  //         message:'Insufficient balance'
  //       }
  //     }
  //     }
  //     else{
  //       // alert('Password incorrect');
  //       return {
  //         staus:'false',
  //         statusCode:400,
  //         message:'Password incorrect'
  //       }
  //     }
  //   }
  //   else{
  //     // alert('User not found');
  //     return {
  //       staus:'false',
  //       statusCode:400,
  //       message:'Invalid user details'
  //     }
  //   }
  // }


 const getTransaction=(acno)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){
      return {
        staus:true,
        statusCode:200,
        Transaction:user.transaction
      }
    }
    else{
      return {
        staus:'false',
        statusCode:400,
        message:'Invalid user details'
      }
    }
  })
    // this.userDetails[acno]['transaction'];
  }

  const deleteAcc=(acno)=>{
    return db.User.deleteOne({acno})
    .then(user=>{
      if(user){
        return {
          staus:'true',
          statusCode:200,
          message:`Account deleted successfully`
        }
      }
      else{
        return {
          staus:'false',
          statusCode:400,
          message:'Account not found'
        }
      }
    })
  }

  module.exports={
    register,
    login,
    deposit, 
    withdraw,
    getTransaction,
    deleteAcc
  }