const express= require("express")
const router = express.Router()
const bodyParser= require("body-parser")
const cors= require("cors")
const url= require("url")
router.use(cors())
router.use(bodyParser.json());


router.post("/", (req,res)=>{
    let {Val} = req.body
    console.log(Val)
    
})

router.get("/",cors(), async (req,res)=>{
   console.log("Hello")
})

router.get("/rec", (req,res)=>{
    var genre=req.query.genres
   console.log(genre)
    
})



module.exports = router