const {initializeApp} = require('firebase/app')
const { getDoc, addDoc, doc , getFirestore, collection,
 serverTimestamp, getDocs, deleteDoc, updateDoc, orderBy, where,query } = require('firebase/firestore')
const {firebaseConfig} = require('./firbaseConfig')
require('dotenv').config()

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
const colRef = collection(db , 'toDoApp')

//home page
module.exports.homePage = async(req,res) =>{
    const taskArr = []
    const tasks = await getDocs(query(colRef, orderBy("createdAt")))
    tasks.docs.map(e => taskArr.push(e.data()))
// Getting all the tasks to send to home page
    res.render('index', {taskArr})
}

// For adding tasks
module.exports.addTask = async(req,res)=>{
    const task = req.body.task
 //Adding the tasks
    await addDoc(colRef, {
       task : task,
       createdAt: serverTimestamp()
    }).then(e => res.json({added:true}))
}

// Completing tasks
module.exports.completedTask = async(req,res)=>{
    // Removing the button element from the task 
    const task = req.body.task.replace('<button id="btn-li"></button>', '')
    let id = null
   await getDocs(query(colRef, where("task", "==", task))).then(e => e.docs.map(e => id = e.id))
   await updateDoc(doc(db , 'toDoApp', id), {
    completed: req.body.completed 
   })
}

// For deleting tasks
module.exports.deleteTask = async(req,res)=>{
    // Removing the button element from the task 
     const task = req.body.task.replace('<button id="btn-li"></button>', '')
     let id = null
     await getDocs(query(colRef, where("task", "==", task)))
     .then(e => e.docs.map(e => id = e.id))
     await deleteDoc(doc(db , 'toDoApp', id)).then(e =>{
         res.json({deleted:true})
     })
 }
