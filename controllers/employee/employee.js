const Employees = require('../../models/employee/employee')
const User = require('../../models/users')
const moment = require('moment')

exports.getEmployees = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Employees.find().countDocuments()
        const data = await Employees.find()
               .populate('branch','branchname')        
               .populate('gender','name')     
               .populate('citizenship','name')
               .populate('regions','name')
               .populate('districts','name')
               .populate('position','name')
               .skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `Employees List`,
            data: data,
            totalItems: totalItems
        })
    } catch (err) {

        next(err)
    }
}

exports.getEmployeesById = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const result = await Employees.findById(AgesId)
        .populate('branch','branchname')        
        .populate('gender','name')     
        .populate('citizenship','name')
        .populate('regions','name')
        .populate('districts','name')
        .populate('position','name')
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `Employees List`,
            data: result
        })
    }
    catch (err) {

        next(err)
    }
}

exports.createEmployees = async (req, res, next) => {
console.log("keldiiiiiii");
    console.log(req.branch);
    console.log(req.file.path);

    console.log("++++++++++++++++++++");
   
    const branch = req.body.branch
    const photo = req.body.photo
    const name = req.body.name 
    const secondname = req.body.secondname  //moment(req.body.agreementdate,"DD/MM/YYYY")       
    const middlename = req.body.middlename
    const gender = req.body.gender 
    const dateofbirth =moment( req.body.dateofbirth,"DD/MM/YYYY")   
    const citizenship = req.body.citizenship
    const passportSeries = req.body.passportSeries 
    const passportNumber = req.body.passportNumber 
    const pin = req.body.pin
    const regions = req.body.regions
    const districts = req.body.districts
    const address = req.body.address
    const telephonenumber = req.body.telephonenumber
    const job_title = req.body.job_title
    const position = req.body.position
    try {
        const result = new Employees({
            branch: branch,
            photo: photo,
            name: name,
            secondname: secondname,
            middlename: middlename,
            gender: gender,
            dateofbirth: dateofbirth,
            citizenship: citizenship,
            passportSeries: passportSeries,
            passportNumber: passportNumber,
            pin: pin,
            regions: regions,
            districts: districts,
            address: address,
            telephonenumber: telephonenumber,
            job_title: job_title,
            position: position,
            creatorId: req.userId
        })
        const results = await result.save()
        res.status(200).json({
            message: `Employees List`,
            data: results,
            creatorId: req.userId,
        })
       
    } catch (err) {
        next(err)
    }
}

exports.updateEmployees = async (req, res, next) => {
    const AgesId = req.params.id
    const branch = req.body.branch
    const photo = req.body.photo
    const name = req.body.name 
    const secondname = req.body.secondname   
    const middlename = req.body.middlename
    const gender = req.body.gender 
    const dateofbirth =moment( req.body.dateofbirth,"DD/MM/YYYY")   
    const citizenship = req.body.citizenship
    const passportSeries = req.body.passportSeries 
    const passportNumber = req.body.passportNumber 
    const pin = req.body.pin
    const regions = req.body.regions
    const districts = req.body.districts
    const address = req.body.address
    const telephonenumber = req.body.telephonenumber
    const job_title = req.body.job_title
    const position = req.body.position

    try {
        const result = await Employees.findById(AgesId)
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        result.branch = branch
        result.photo = photo
        result.name = name
        result.secondname = secondname
        result.middlename = middlename
        result.gender = gender
        result.dateofbirth = dateofbirth
        result.citizenship = citizenship
        result.passportSeries = passportSeries
        result.passportNumber = passportNumber

        result.pin = pin
        result.regions = regions

        result.districts = districts
        result.address = address
        result.telephonenumber = telephonenumber
        result.job_title = job_title
        result.position = position

        const data = await result.save()
        res.status(200).json({
            message: `Employees List`,
            data: data
        })
    }
    catch (err) {
        if (!err.statusCode) {
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.deleteEmployeess = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const deleteddata = await Employees.findById(AgesId)
        const userdata = await User.find({ "agentId": AgesId })
        if (!deleteddata) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        if (deleteddata.creatorId.toString() !== req.userId) {
            const error = new Error('bu userni ochirishga imkoni yoq')
            error.statusCode = 403
            throw error
        }
        const data = await Employees.findByIdAndRemove(AgesId)
        const usersdata = await User.findByIdAndRemove(userdata)
        res.status(200).json({
            message: 'Employees is deletes',
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}