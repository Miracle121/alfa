const Breanches = require('../models/breanches')
const User = require('../models/users')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const moment = require('moment')

exports.getBreanches = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Breanches.find().countDocuments()
        const data = await Breanches.find()
            .populate('regionId', 'name')
            .populate('breanchstatus', 'name')
            .populate({
                path: 'employees',
                populate: [
                    {
                        path: 'positions',
                        select: 'name'
                    }
                ]
            })


            .skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `Breanches List`,
            data: data,
            totalItems: totalItems
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getBreanchesById = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const result = await Breanches.findById(AgesId)
            .populate('regionId', 'name')
            .populate('breanchstatus', 'name')
            .populate({
                path: 'employees',
                populate: [
                    {
                        path: 'positions',
                        select: 'name'
                    }
                ]
            })
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `Breanches List`,
            data: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createBreanches = async (req, res, next) => {

    const levelofbreanches = req.body.levelofbreanches
    const codeofbreanches = req.body.codeofbreanches
    const inn = req.body.inn
    const regionId = req.body.regionId
    const branchname = req.body.branchname
    const shorttitleofbranch = req.body.shorttitleofbranch
    const address = req.body.address
    const telephone = req.body.telephone
    let email = req.body.email
    let agreementnumber = req.body.agreementnumber
    const agreementdate = moment(req.body.agreementdate, "DD/MM/YYYY")
    const expirationdate = moment(req.body.expirationdate, "DD/MM/YYYY")
    const employees = req.body.employees
    const checkingaccount = req.body.checkingaccount
    const mfo = req.body.mfo
    const nameofbank = req.body.nameofbank
    const breanchstatus = req.body.breanchstatus
    try {
        // const inndata = await Breanches.find({"inn":inn})
        // if(inndata){         
        const result = new Breanches({
            levelofbreanches: levelofbreanches,
            codeofbreanches: codeofbreanches,
            inn: inn,
            regionId: regionId,
            branchname: branchname,
            shorttitleofbranch: shorttitleofbranch,
            address: address,
            telephone: telephone,
            email: email,
            agreementnumber: agreementnumber,
            agreementdate: agreementdate,
            expirationdate: (expirationdate),
            employees: employees,
            checkingaccount: checkingaccount,
            mfo: mfo,
            nameofbank: nameofbank,
            breanchstatus: breanchstatus,
            creatorId: req.userId
        })


        const results = await result.save()
        res.status(200).json({
            message: `Breanches List`,
            data: results,
            creatorId: req.userId,
        })





        // }else{


        //     res.status(200).json({
        //         message:`Breanches List`,
        //         data: inndata,            
        //         creatorId: req.userId,
        //     })

        // }




    } catch (err) {
        // console.log(err);
        // if(!err.statusCode){

        //     const err = new Error('Agentni qoshishda xatolik')
        //     err.statusCode = 500
        //     throw err
        // }
        next(err)
    }
}

exports.updateBreanches = async (req, res, next) => {
    const AgesId = req.params.id
    const levelofbreanches = req.body.levelofbreanches
    const codeofbreanches = req.body.codeofbreanches
    const inn = req.body.inn
    const regionId = req.body.regionId
    const branchname = req.body.branchname
    const shorttitleofbranch = req.body.shorttitleofbranch
    const address = req.body.address
    const telephone = req.body.telephone
    let email = req.body.email
    let agreementnumber = req.body.agreementnumber
    const agreementdate = moment(req.body.agreementdate, "DD/MM/YYYY")
    const expirationdate = moment(req.body.expirationdate, "DD/MM/YYYY")
    const employees = req.body.employees
    const checkingaccount = req.body.checkingaccount
    const mfo = req.body.mfo
    const nameofbank = req.body.nameofbank
    const breanchstatus = req.body.breanchstatus
    try {
        const result = await Breanches.findById(AgesId)
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        result.levelofbreanches = levelofbreanches
        result.codeofbreanches = codeofbreanches
        result.inn = inn
        result.regionId = regionId
        result.branchname = branchname
        result.shorttitleofbranch = shorttitleofbranch
        result.address = address
        result.telephone = telephone
        result.email = email
        result.agreementnumber = agreementnumber
        result.expirationdate = expirationdate
        result.employees = employees
        result.checkingaccount = checkingaccount
        result.mfo = mfo
        result.nameofbank = nameofbank
        result.breanchstatus = breanchstatus
        const data = await result.save()
        res.status(200).json({
            message: `Agents List`,
            data: data
        })
    }
    catch (err) {
        // if(!err.statusCode){
        //     const error = new Error('Intenall error11111')
        //     error.statusCode = 500
        //     throw error
        // }
        next(err)
    }
}

exports.deleteBreanches = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const deleteddata = await Breanches.findById(AgesId)
        const userdata = await User.find({ "agentId": AgesId })
        if (!deleteddata) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        // if(deleteddata.creatorId.toString()!==req.userId){
        //     const error = new Error('bu userni ochirishga imkoni yoq')
        //     error.statusCode =403
        //     throw error
        //     }
        const data = await Breanches.findByIdAndRemove(AgesId)
        // const usersdata=await User.findByIdAndRemove(userdata) 
        res.status(200).json({
            message: 'Region is deletes',
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}