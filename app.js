const express = require("express");
const path = require("path");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

const connectDB = require("./config/db");
const { config } = require("./config/config");
const { errorHandler } = require("./middleware/error");

// const session = require('express-session');
const region = require("./routes/regions");
const districts = require("./routes/districts");
const mfy = require("./routes/mfy");
const users = require("./routes/users");
const auth = require("./routes/auth");
const groupsofproducts = require("./routes/groupsofproducts");
const subgroupsofproducts = require("./routes/subgroupofproducts");
const typeofinsurer = require("./routes/typeofinsurer");
const statusofproduct = require("./routes/statusofproduct");
const policyformats = require("./routes/policyformats");
const typeofsector = require("./routes/typeofsector");
const classes = require("./routes/classes");
const subclasses = require("./routes/subclasses");
const role = require("./routes/role");
const typeofrisks = require("./routes/typeofrisks");
const risks = require("./routes/risks");
const typeofpayment = require("./routes/typeofpayment");
const typeofpolice = require("./routes/typeofpolice");
const typeofobject = require("./routes/typeofobject");
const object = require("./routes/objects");
const applicationformdocs = require("./routes/applicationformdocs");
const contractform = require("./routes/contract");
const additionaldocuments = require("./routes/additionaldocuments");
const typeofclaimsettlement = require("./routes/typeofclaimsettlement");
const typeofrefund = require("./routes/typeofrefund");
const typeoffranchise = require("./routes/typeoffranchise");
const baseoffranchise = require("./routes/baseoffranchise");
const typeofpersons = require("./routes/typeofpersons");
const agents = require("./routes/agents");
const products = require("./routes/products");
const translations = require("./routes/translations");
const typeofposition = require("./routes/typeofposition");
const typeofagent = require("./routes/typeofagent");
const accountstatus = require("./routes/accountstatus");

const accountroles = require("./routes/accountroles");
const genders = require("./routes/gender");
const district = require("./routes/districts");
const citizenship = require("./routes/citizenship");
const position = require("./routes/position");
const typeofdocuments = require("./routes/typeofdocuments");
const levelofbranch = require("./routes/levelofbranch");
const breanches = require("./routes/breanches");
const breanchstatus = require("./routes/breanchstatus");
//============agreements=================
const agreements = require("./routes/agreements");
const reasons = require("./routes/reasons");

const policy = require("./routes/policy");

const fieldofendorsements = require("./routes/fieldofendorsements");
const paymentcurrency = require("./routes/paymentcurrency");

//==============Policy Status======
const statusofpayment = require("./routes/statusofpayment");
const statusofpolicy = require("./routes/statusofpolicy");

//===============Endorsements============================
const typeofendorsements = require("./routes/typeofendorsements");
const statusofendorsements = require("./routes/statusofendorsements");
const endorsements = require("./routes/endorsements");

//===============Billing============================
const transactions = require("./routes/billing/transaction");
const transactionlog = require("./routes/billing/transactionlog");
const typeofdistribute = require("./routes/billing/typeofdistribute");

//=================BCO=================================

const languagepolicy = require("./routes/bco/languagepolicy");
const typeofbco = require("./routes/bco/typeofbco");
const bco = require("./routes/bco/bco");

const statusbcopolicy = require("./routes/bco/statusbcopolicy");
const actstatus = require("./routes/bco/actstatus");
const acts = require("./routes/bco/acts");
const warehouse = require("./routes/bco/warehouse");
const policyblank = require("./routes/bco/policyblank");
const bcoinpolicyblank = require("./routes/bco/bcoinpolicyblank");
const statusoftypebco = require("./routes/bco/statusoftypebco");

const statusBco = require("./routes/bco/status_bco");
const statusActs = require("./routes/bco/status_acts");

//=======================Clients=======================
const clients = require("./routes/clients/clients");

//===========================Employee=======================
const employee = require("./routes/employee/employee");
const positions = require("./routes/employee/positions");
const app = express();

// Connect to db
connectDB();

// Json parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sanitize
app.use(mongoSanitize());

// Helmet
app.use(helmet());

// Prevent Xss Attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({ windowMs: 10 * 10 * 1000, max: 100 });

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

global.__basedir = __dirname;

app.use(cors());

if (config.env === "development") app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use("/auth", auth);
app.use("/regions", region);
app.use("/districts", districts);
app.use("/mfy", mfy);
app.use("/groupsofproducts", groupsofproducts);
app.use("/subgroupsofproducts", subgroupsofproducts);
app.use("/typeofinsurer", typeofinsurer);
app.use("/statusofproduct", statusofproduct);
app.use("/policyformats", policyformats);
app.use("/typeofsector", typeofsector);
app.use("/classes", classes);
app.use("/subclasses", subclasses);
app.use("/role", role);
app.use("/typeofrisk", typeofrisks);
app.use("/risk", risks);
app.use("/typeofpolice", typeofpolice);
app.use("/typeofpayment", typeofpayment);
app.use("/typeofobject", typeofobject);
app.use("/object", object);
//====================25.05.2022================
app.use("/applicationformdocs", applicationformdocs);
app.use("/contractform", contractform);
app.use("/additionaldocuments", additionaldocuments);
//=======================26.05.2022========
app.use("/typeofclaimsettlement", typeofclaimsettlement);
app.use("/typeofrefund", typeofrefund);
app.use("/typeoffranchise", typeoffranchise);
app.use("/baseoffranchise", baseoffranchise);
//========================28.05.2022=========
app.use("/typeofpersons", typeofpersons);
app.use("/agents", agents);
app.use("/products", products);
//=========================18.06.2022=====
app.use("/translations", translations);
app.use("/typeofposition", typeofposition);
app.use("/typeofagent", typeofagent);
app.use("/accountstatus", accountstatus);
app.use("/accountroles", accountroles);
app.use("/genders", genders);

app.use("/district", district);
app.use("/citizenship", citizenship);
app.use("/position", position);
app.use("/typeofdocuments", typeofdocuments);
app.use("/levelofbranch", levelofbranch);
app.use("/breanches", breanches);
app.use("/breanchstatus", breanchstatus);
//================agreements=====
app.use("/agreements", agreements);
app.use("/reasons", reasons);
app.use("/policy", policy);
app.use("/endorsements", endorsements);

app.use("/paymentcurrency", paymentcurrency);

//===================Policy sections====
app.use("/statusofpayment", statusofpayment);
app.use("/statusofpolicy", statusofpolicy);

//====================Endorsements======
app.use("/typeofendorsements", typeofendorsements);
app.use("/statusofendorsements", statusofendorsements);
app.use("/fieldofendorsements", fieldofendorsements);

//===================Transactions==========

app.use("/transactions", transactions);
app.use("/transactionlog", transactionlog);
app.use("/typeofdistribute", typeofdistribute);

//=====================BCO======================
app.use("/languagepolicy", languagepolicy);
app.use("/typeofbco", typeofbco);
app.use("/bco", bco);
app.use("/statusbcopolicy", statusbcopolicy);
app.use("/statusoftypebco", statusoftypebco);
app.use("/actstatus", actstatus);
app.use("/acts", acts);
app.use("/warehouse", warehouse);
app.use("/policyblank", policyblank);
app.use("/bcoinpolicyblank", bcoinpolicyblank);

app.use("/statusbco", statusBco);
app.use("/statusacts", statusActs);
//===========================
app.use("/employee", employee);
app.use("/positions", positions);
//============================Clients============
app.use("/clients", clients);

app.use("/user", users);

// Error handling
app.use(errorHandler);

const PORT = config.port;

const server = app.listen(
  PORT,
  console.log(
    `Server running ${config.env.inverse} mode on port ${PORT.inverse}`.yellow
  )
);

//Hnadle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server and exit proces
  server.close(() => process.exit(1));
});
