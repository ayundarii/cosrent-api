const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client")
const { generateHash, decodeHash } = require("../utils/bcrypt")
const { generateToken, decodeToken } = require("../utils/jwt")

const prisma = new PrismaClient()

class UserController {
    static async getUser(req, res){
        const userData = await prisma.user.findMany({
            select : {
                id: true,
                username: true,
                role: true
            }
        })
        res.status(200).json({ data: userData })
    }

    static async createUser(req, res){
        //destructuring object
        const { username, password, role } = req.body

        try{
            //cek kelengkapan data awal
            if(!username || !password || !role){
                return res.status(400).json({ error: 'All fields are required.' })
            }
            //proses hash password
            const hashedPassword = generateHash(password)
            
            const result = await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword,
                    role: Number (role)
                }
            })

            res.status(201).json(result)
        } catch (error) {
            //di luar dari kondisi kelengkapan data, maka kita anggap internal server error
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2002'){
                return res.status(409).json({ error: 'Username already exist' })
            }

            res.status(500).json({ error: 'An error occured while adding the user' })
        }
        
    }

    //controller untuk menghandle proses login
    static async login(req, res){
        const { username, password } = req.body

        // cek dulu apakah usernamenya ada
        const findUser = await prisma.user.findUnique({
            where : {
                username
            }
        })

        console.log(username, password)

        // lakukan proses
        if( findUser ){
            // apakah user password-nya sudah valid
            const isPasswordValid = decodeHash(password, findUser.password)
            if (isPasswordValid){
                // muatkan token
                const { id, username, role } = findUser
                res.status(200).json({
                    token: generateToken({ id, username, role})
                })
            } else {
                res.status(400).json({ message: "Invalid username or password"})
            }
        } else {
            res.status(400).json({ message: "Invalid username or password"})
        }
    }
}

module.exports = UserController