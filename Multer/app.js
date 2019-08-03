var express = require('express')
var multer  = require('multer')
var path = require('path')
var fs = require('fs')
var cors = require('cors')
var app = express()
//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, 'public'))); // To serve static files
//ByDefault serve /public/index.html 



function sanitizeFile(file, cb) {
    // Define the allowed extension
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']
    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/")
    if(isAllowedExt && isAllowedMimeType){
        return cb(null ,true) // no errors
    }
    else{
        // pass error msg to callback, which can be displaye in frontend
        //cb('Error: File type not allowed!')
        return cb(null ,true)
    }
}

var storage = multer.diskStorage({
    destination: './public',
    filename: function (req, file, cb) {
      cb(null, Date.now()+ file.fieldname+'.'+file.originalname.split('.')[1].toLowerCase())
    }
  })
   
  var upload = multer({ storage: storage,
    limits: {
        fileSize: 10000000000
    },
    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
}).fields([{name:'Profilepic'},{name:'Resume'}])

app.get('/name1',(req,res)=>{
    console.log("hiii");
    res.send(fs.readFileSync(path.join(__dirname,'public','name1'),'utf8'))
})
app.post('/photo',(req,res)=>{
    upload(req, res, (err) => {
        console.log(req.files);
        if (err){ 
            res.send({ 'msg': err})
        }else{
            // If file is not selected
            if (req.files == undefined) {
                res.send('No file selected!')
            
            }
            else{
                var ob=new Object();
                ob.name=req.body.commName;
                ob.email=req.body.email;
                ob.dob=req.body.dob;
                ob.phone=req.body.phone;
                ob.city=req.body.city;
                ob.gender=req.body.gender;
                ob.photo=req.files.Profilepic[0].filename;
                ob.resume=req.files.Resume[0].filename;
                var ar=[];
                ar.push(ob);
                fs.writeFileSync(path.join(__dirname,'public','name1'),JSON.stringify(ar))
                res.redirect('Informtion.html');
            }
        }
    
    })

})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})
app.listen(3000 , ()=>{console.log(`Listening on Port ${8080}`)})