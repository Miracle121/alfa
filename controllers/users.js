const User = require('../models/users')
const Agents = require('../models/agents')
const Employee = require('../models/employee/employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.getUsers = async (req, res, next) => {
    const page = req.query.page || 1
    const counts = 20 //req.query.count ||20
    let totalItems
    try {
        totalItems = await User.find().countDocuments()
        const users = await User.find()
            .populate('accountstatus', 'name')
            .populate('accountrole', 'name')
            .populate('branch_Id', 'branchname')
            .populate('agent_Id', 'inn')

            .skip((page - 1) * counts).limit(counts)
        res.status(200).json({
            message: `User haqida ma'/lumot`,
            data: users,
            totalItems: totalItems
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getUsersById = async (req, res, next) => {
    const userId = req.params.id
    try {
        const users = await User.findById(userId)
            .populate('accountstatus', 'name')
            .populate('accountrole', 'name')
            .populate('branch_Id', 'branchname')
            .populate('agent_Id', 'inn')
        if (!users) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: `ma'lumotlar topildi`,
            users: users
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

}

exports.CreateUsers = async (req, res, next) => {
    try {

        const agent_Id = req.get('agentId') || null
        const branch_Id = req.get('branch_Id')
        const emp_id = req.get('emp_id') || null
        const email = req.body.email
        const password = req.body.password
        const accountstatus = req.body.accountstatus
        const accountrole = req.body.accountrole
        const hashpass = await bcrypt.hash(password, 12)
        const user = new User({
            agent_Id: agent_Id,
            branch_Id: branch_Id,
            emp_Id: emp_id,
            email: email,
            password: hashpass,
            accountstatus: accountstatus,
            accountrole: accountrole,
            creatorId: req.userId
        })
        const users = await user.save()
        console.log(users);
        if (agent_Id) {
            console.log("Agentga keldi ==========");

            const agent = await Agents.findByIdAndUpdate(agent_Id, {
                user_id: users._id
            })
            const agents = await agent.save()
            console.log(agents);
            console.log();
        }
        if (emp_id) {
            console.log("emp ga keldi");
            const employee = await Employee.findByIdAndUpdate(emp_id, {
                user_id: users._id
            })
            const emp = await employee.save()
            console.log(emp);
        }
        res.status(201).json({
            message: 'User bazaga kiritildi',
            users: users
        })
    } catch (err) {
        console.log(err);
        next(err)
    }
}

exports.UpdateUsers = async (req, res, next) => {
    const userId = req.params.id
    const agent_Id = req.get('agent_Id') || null
    const branch_Id = req.get('branch_Id')
    const emp_id = req.get('emp_id') || null
    const email = req.body.email
    const password = req.body.password
    const accountstatus = req.body.accountstatus
    const accountrole = req.body.accountrole
    const hashpass = await bcrypt.hash(password, 12)

    try {
        const user = await User.findById(userId)
        if (!user) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }
        const hashpass = await bcrypt.hash(password, 12)
        user.agent_Id = agent_Id
        user.emp_Id = emp_id
        user.branch_Id = branch_Id
        user.email = email
        user.password = hashpass
        user.accountstatus = accountstatus
        user.accountrole = accountrole
        const data = await user.save()
        res.status(200).json({
            message: `ma'lumotlar o'zgartirildi`,
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

exports.DeleteUsers = async (req, res, next) => {
    const usersId = req.params.id
    try {
        const deleteddata = await User.findById(usersId)

        if (!deleteddata) {
            const error = new Error('Object  not found')
            error.statusCode = 404
            throw error
        }

        const data = await User.findByIdAndRemove(usersId)
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

exports.getMe = async (req, res, next) => {
    const token = req.get('auth')

    if (!token) {
        const err = new Error('Token is not exist')
        err.statusCode = 401
        throw err
    }
    decodedToken = jwt.verify(token, 'testtest!@#123')
    try {
        if (decodedToken) {
            const users = await User.findById(decodedToken.userId)
                .populate('accountstatus', 'name')
                .populate('accountrole', 'name')
                .populate('branch_Id', 'branchname')
                .populate('agent_Id')
                .populate('emp_Id', 'name secondname middlename')
            if (!users) {
                const error = new Error('Object  not found')
                error.statusCode = 404
                throw error
            }
            res.status(200).json({
                message: `ma'lumotlar topildi`,
                users: users
            })

        } else {
            res.status(404).json({
                message: `ma'lumotlar topilmadi`
            })
        }

    } catch (err) {
        next()
    }


}