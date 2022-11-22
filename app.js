const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')

// const session = require('express-session');
const region = require('./routes/regions');
const districts = require('./routes/districts')
const mfy = require('./routes/mfy')
const users = require('./routes/users')
const auth = require('./routes/auth')
const groupsofproducts = require('./routes/groupsofproducts')
const subgroupsofproducts = require('./routes/subgroupofproducts')
const typeofinsurer = require('./routes/typeofinsurer')
const statusofproduct = require('./routes/statusofproduct')
const policyformats = require('./routes/policyformats')
const typeofsector = require('./routes/typeofsector')
const classes = require('./routes/classes')
const subclasses = require('./routes/subclasses')
const role = require('./routes/role')
const typeofrisks = require('./routes/typeofrisks')
const risks = require('./routes/risks')
const typeofpayment = require('./routes/typeofpayment')
const typeofpolice = require('./routes/typeofpolice')
const typeofobject = require('./routes/typeofobject')
const object = require('./routes/objects')
const applicationformdocs = require('./routes/applicationformdocs')
const contractform = require('./routes/contract')
const additionaldocuments = require('./routes/additionaldocuments')
const typeofclaimsettlement = require('./routes/typeofclaimsettlement')
const typeofrefund = require('./routes/typeofrefund')
const typeoffranchise = require('./routes/typeoffranchise')
const baseoffranchise = require('./routes/baseoffranchise')
const typeofpersons=  require('./routes/typeofpersons')
const agents = require('./routes/agents')
const products=require('./routes/products')
const translations = require('./routes/translations')
const typeofposition = require('./routes/typeofposition')
const typeofagent = require('./routes/typeofagent')
const accountstatus = require('./routes/accountstatus')

const accountroles = require('./routes/accountroles')
const genders =require('./routes/gender')
const district = require('./routes/districts')
const citizenship = require('./routes/citizenship')
const position = require('./routes/position')
const typeofdocuments = require('./routes/typeofdocuments')
const levelofbranch = require('./routes/levelofbranch')
const breanches = require('./routes/breanches')
const breanchstatus = require('./routes/breanchstatus')
//============agreements=================
const agreements = require('./routes/agreements')
const reasons = require('./routes/reasons')

const policy = require('./routes/policy')

const fieldofendorsements = require('./routes/fieldofendorsements')
const paymentcurrency = require('./routes/paymentcurrency')

//==============Policy Status======
const statusofpayment = require('./routes/statusofpayment')
const statusofpolicy = require('./routes/statusofpolicy')

//===============Endorsements========================
const typeofendorsements = require('./routes/typeofendorsements')
const statusofendorsements = require('./routes/statusofendorsements')
const endorsements = require('./routes/endorsements')


const app = express();

 const URL = 'mongodb://mongoadmin:alfa_123_alfa_222@localhost:27017/Alfa?authSource=admin'       

// const URL = 'mongodb://mongoadmin:alfa_123_alfa_222@91.190.159.70:27017/Alfa?authSource=admin'


global.__basedir = __dirname;
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
app.use(cors())



app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('images',express.static(path.join(__dirname,'images')))
app.use('/auth',auth)
app.use('/regions',region)
app.use('/districts',districts)
app.use('/mfy',mfy)
app.use('/groupsofproducts',groupsofproducts)
app.use('/subgroupsofproducts',subgroupsofproducts)
app.use('/typeofinsurer',typeofinsurer)
app.use('/statusofproduct',statusofproduct)
app.use('/policyformats',policyformats)
app.use('/typeofsector',typeofsector)
app.use('/classes',classes)
app.use('/subclasses',subclasses)
app.use('/role',role)
app.use('/typeofrisk',typeofrisks)
app.use('/risk',risks)
app.use('/typeofpolice',typeofpolice)
app.use('/typeofpayment',typeofpayment)
app.use('/typeofobject',typeofobject)
app.use('/object',object)
//====================25.05.2022================
app.use('/applicationformdocs',applicationformdocs)
app.use('/contractform',contractform)
app.use('/additionaldocuments',additionaldocuments)
//=======================26.05.2022========
app.use('/typeofclaimsettlement',typeofclaimsettlement)
app.use('/typeofrefund',typeofrefund)
app.use('/typeoffranchise',typeoffranchise)
app.use('/baseoffranchise',baseoffranchise)
//========================28.05.2022=========
app.use('/typeofpersons',typeofpersons)
app.use('/agents',agents)
app.use('/products',products)
//=========================18.06.2022=====
app.use('/translations',translations)
app.use('/typeofposition',typeofposition)
app.use('/typeofagent',typeofagent)
app.use('/accountstatus',accountstatus)
app.use('/accountroles',accountroles)
app.use('/genders',genders)

app.use('/district',district)
app.use('/citizenship',citizenship)
app.use('/position',position)
app.use('/typeofdocuments',typeofdocuments)
app.use('/levelofbranch',levelofbranch)
app.use('/breanches',breanches)
app.use('/breanchstatus',breanchstatus)
//================agreements=====
app.use('/agreements',agreements)
app.use('/reasons',reasons)
app.use('/policy',policy)
app.use('/endorsements',endorsements)



app.use('/paymentcurrency',paymentcurrency)

//===================Policy sections====
app.use('/statusofpayment',statusofpayment)
app.use('/statusofpolicy',statusofpolicy)

//====================Endorsements======
app.use('/typeofendorsements',typeofendorsements)
app.use('/statusofendorsements',statusofendorsements)
app.use('/fieldofendorsements',fieldofendorsements)


app.use('/user',users)
app.use((error,req,res,next)=>{   
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
        message: message,
        data:data
    })
})
mongoose.connect(URL,{ useUnifiedTopology: true ,useNewUrlParser: true})
.then(result=>{
     app.listen(3000);
})
.catch(err => console.log(err))
