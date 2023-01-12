const Warehouse = require('../../models/bco/warehouse')
const Typeofbco= require('../../models/bco/typeofbco')
const Policyblank = require('../../models/bco/policyblank')

exports.getPolicyblank = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await Policyblank.find()
            .countDocuments()
        const data = await Policyblank.find()  
             .populate({
                path:'warehouse_id',
                populate:[
                    { 
                        path: 'policy_type_id',
                        select: 'policy_type_name'
                    },
                    { 
                        path: 'statusofpolicy',
                        select: 'name'
                    }
                ]
            })
             .populate({
                path: 'policy_type_id',
                populate:[
                    { 
                    path: 'policy_size_id',
                    select: 'name'
                },
                { 
                    path: 'language',
                    select: 'name'

                }
                ]
             })
             .skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `Warehouse Insurance`,
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

exports.getPolicyblankById = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const result = await Policyblank.findById(AgesId)
        .populate({
            path:'warehouse_id',
            populate:[
                { 
                    path: 'policy_type_id',
                    select: 'name'
                },
                { 
                    path: 'statusofpolicy',
                    select: 'name'
                }
            ]
        })
         .populate({
            path: 'policy_type_id',
            populate:[
                { 
                path: 'policy_size_id',
                select: 'name'
            },
            { 
                path: 'language',
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
            message: `Warehouse Insurance`,
            data: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.createPolicyblank = async (req, res, next) => {

    const warehouse_id = req.body.warehouse_id
    const policy_type_id = req.body.policy_type_id
    const blank_number = req.body.blank_number
    const Is_usedblank = req.body.Is_usedblank 

    const result = new Policyblank({
        warehouse_id: warehouse_id,
        policy_type_id:policy_type_id,
        blank_number: blank_number,
        Is_usedblank:Is_usedblank,
        creatorId: req.userId
    })
    const results = await result.save()
    res.status(200).json({
        message: `Creat new policy blank`,
        data: results,
        creatorId: req.userId,
    })
}

exports.updatePolicyblank = async (req, res, next) => {
    const AgesId = req.params.id
    const warehouse_id = req.body.warehouse_id
    const policy_type_id = req.body.policy_type_id
    const blank_number = req.body.blank_number
    const Is_usedblank = req.body.Is_usedblank 
    try {
        const result = await Policyblank.findById(AgesId)
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        result.warehouse_id = warehouse_id
        result.policy_type_id = policy_type_id
        result.blank_number = blank_number
        result.policy_count = policy_count
        result.Is_usedblank = Is_usedblank

        const data = await result.save()
        res.status(200).json({
            message: `Update policy blank`,
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            const error = new Error('Intenall error11111')
            error.statusCode = 500
            throw error
        }
        next(err)
    }
}

exports.deletePolicyblank = async (req, res, next) => {
    const AgesId = req.params.id
    try {
        const deleteddata = await Policyblank.findById(AgesId)
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
        const data = await Policyblank.findByIdAndRemove(AgesId)
        res.status(200).json({
            message: 'Policy blank is deleted',
            data: data
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getPolicyblanknumberByTypeId= async(req,res,next)=>{
    const policy_type_id = req.params.id
    try {
        const result = await Policyblank.find({policy_type_id: policy_type_id}&&{Is_usedblank:false}).select("blank_number")
        // .populate({
        //     path:'warehouse_id',
        //     populate:[
        //         { 
        //             path: 'policy_type_id',
        //             select: 'name'
        //         },
        //         { 
        //             path: 'statusofpolicy',
        //             select: 'name'
        //         }
        //     ]
        // })
        //  .populate({
        //     path: 'policy_type_id',
        //     populate:[
        //         { 
        //         path: 'policy_size_id',
        //         select: 'name'
        //     },
        //     { 
        //         path: 'language',
        //         select: 'name'

        //     }
        //     ]
        //  })           
           
        if (!result) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `Policy blank by type of bco`,
            data: result
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

}

