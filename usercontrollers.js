const User = require("../models/user");

const jwt = require('jsonwebtoken');

const multer = require('multer');

const storage = multer.memoryStorage();
    
const upload = multer({ storage: storage });

const uploadImage = upload.single('image');

let register = async (req, res) => { 
try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Authentication Token is required' });
    }
    const newUser = await User.create({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

let login = async (req, res) => { 
 try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

let addUser = async (req, res) => { 
    try {
        const data = await User.create({});
        data.set({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            Projectname: req.body.Projectname,
            description: req.body.description,
            status: req.body.status,
            Image: req.body.Image,
        });
    await data.save();
        res.status(200).json(data.toJSON());
        
    // const { imageId } = req.params;
    // const image = await User.findByPk(imageId);
    // if (!image) {
    //   return res.status(404).json({ error: 'Image not found' });
    // }
    // res.status(200).json({ success: true, image: User.data.toString() });   
    }
    catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    }
    
    // if (someCondition) {
    // res.status(200).json({ success: true });
    // } else {
    // return res.status(400).json({ error: 'Bad Request' });
    // }
    // res.send('This line is safe')
    
    // const data = User.create({});
    // console.log(data instanceof User);
    // console.log(data.firstName);
    // await data.update({firstName: "kevin", lastName:"barvadiya"})
    // await data.save();
    // console.log('data was saved to the database!');
    // console.log(data.toJSON());
    // await data.reload();
    // res.status(200).json(data.toJSON())

    //     try {
    //         let checkData = await User.create({
    //             where: {
    //                 firstName: 'karan',
    //                 lastName: 'dudhat',
    //                 Projectname: 'abcd',
    //                 description: 'dvsdv sdvsd vsdv vsdv vsdv vsd vsd v',
    //                 status: '1',
    //             },
    //         });

    //         if (checkData) {
    //             return res.json({ status: 200, msg: "Data already exists", checkData });
    //         }
    //         else {
    //             let newData = await User.create(req.body);
    //             return res.json({ status: 500, msg: "Data added successfully", newData });
    //         }
    //     }
    //     catch (error) {
    //         console.error("Error:", error.message);
    //         res.status(500).json({ error: "Internal Server Error" });
    //     }


    // try {
    //     let chackdata = await User.findOne({ lastName: req.body.lastName });
    //     if (chackdata) {
    //         return res.json({ status: 200, msg: "Data alredy add" })
    //     } else {
    //         await User.create(req.body)
    //         return res.json({ status: 500, msg: "Data added successfully" })
    //     }
    // } catch (error) {
    //     res.status(500).json({ status: 500, msg: 'Error adding user', error: error.message });
    // }
    
    // var info = {
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     Projectname: req.body.Projectname,
    //     description : req.body.description,
    //     status : req.body.status,
    // }
    // const data = await User.create(info)
    // res.status(200).json({data})
};

let getUsers = async (req, res) => { 
    const data = await User.findAll({})
    res.status(200).json({ data: data });
}

let getUser = async (req, res) => { 
    const data = await User.findOne({
        where : {
            id: req.params.id
        }
    })
    res.status(200).json({ data: data });
}

let deletingUser = async (req, res) => { 
      const data = await User.destroy({
            where: {
                id : req.params.id
            }
      });
    res.status(200).json({data:data})
}

var updateUser = async (req, res) => { 
    const updateData = req.body;
    const data = await User.update(updateData,{
            where: {
                id : req.params.id
            }
      });
    res.status(200).json({ data: data });
}

module.exports = {
    register,
    login,
    addUser,
    getUsers,
    getUser,
    deletingUser,
    updateUser,
}