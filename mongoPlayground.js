// index.js
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://atul:vlh5j1J1Do1jV2wO@playgroundcluster.m9dwgal.mongodb.net/?appName=PlaygroundCluster";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const db = client.db("practiceDB");
    const users = db.collection("users");

//     const activeBackendDev = await users.find(
//         {$and : 
//             [
//                 {active : true},
//                 {skills : {
//                     $in : ["Node", "Python", "Java", "Go"]
//                 }
//             } 
//             ]
//         }
//     ).toArray()
//    console.log("Active backend devs :");
//    console.log(activeBackendDev)

//    const androidDevs = await users.find(
//         {skills : {
//             $in : ["Android", "Kotlin", "Java", "Compose"]
//         }}
//     ).toArray()
//    console.log("Active android devs :");
//    console.log(androidDevs);
   
//    const cloudOrDevOpsExperts = await users.find({
//     skills : {
//             $in : ["AWS", "Docker", "Kubernetes", "Terraform", "Azure"]
//         }
//    }).toArray()
//    console.log("Cloud and Dev Ops Experts :");
//    console.log(cloudOrDevOpsExperts);

//    const usersWithNameStartsWithA = await users.find({
//     name : /^A/i
//    }).toArray()
//    console.log("Name starts with A");
//    console.log(usersWithNameStartsWithA)
   
//    const finalList = await users.find(
//     {
//         $and : [
//             { age : { $gt : 30 }},
//             { active : true }
//         ]
//     }
//    ).sort({age : -1}).toArray()
//    console.log(finalList)

    const sortedUser = await users.createIndex({age: 1})
    const allUsers = await users.find().toArray();
    
    console.log(sortedUser);
    console.log(allUsers);


  } finally {
    await client.close();
  }
}

run();
