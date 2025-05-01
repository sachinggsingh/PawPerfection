const Pet  = require('../models/petModel');


const createPet = async (req,res)=>
{
    try
    {
        const {name,breed,age,gender,description} = req.body
        if(!name || !breed || !age || !gender || !description)
            return res.status(400).json({msg:"Please enter all fields"})
        if(age < 0 )
            return res.status(400).json({msg:"Age cannot be negative or zero"})
        if(!description)
            return res.status(400).json({msg:"Description cannot be empty"})
        if(!gender)
            return res.status(400).json({msg:"Gender cannot be empty"})
        if(!breed)
            return res.status(400).json({msg:"Breed cannot be empty"})

        const pet = await Pet.create({
            name,
            breed,
            age,
            gender,
            description
        })
        return res.status(200).json({msg:"Pet created successfully",pet:{
            _id:pet._id,
            name:pet.name,
            breed:pet.breed,
            age:pet.age,
            gender:pet.gender,
            description:pet.description
        }})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Failed to create pet"})
    }
}

const getPets = async (req,res)=>
{
    try
    {
        const {id} = req.params
        const pets = await Pet.findById(id)
        if(!pets)
            return res.status(400).json({msg:"Pets not found"})
        return res.status(200).json({msg:"Pets found successfully",pets:{
            _id:pets._id,
            name:pets.name,
            breed:pets.breed,
            age:pets.age,
            gender:pets.gender,
            description:pets.description
        }})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Failed to fetch pets"})
    }
}
const editPet = async (req,res)=>
{
    try{
        const {id} = req.params
        const {name,breed,age,gender,description} = req.body
        if(!name || !breed || !age || !gender || !description)
            return res.status(400).json({msg:"Please enter all fields"})
        if(age < 0 )
            return res.status(400).json({msg:"Age cannot be negative or zero"})
        if(!description)
            return res.status(400).json({msg:"Description cannot be empty"})
        if(!gender)
            return res.status(400).json({msg:"Gender cannot be empty"})
        if(!breed)
            return res.status(400).json({msg:"Breed cannot be empty"})
        const pet = await Pet.findByIdAndUpdate(id,{name,breed,age,gender,description})
        return res.status(200).json({msg:"Pet edited successfully",pet:{
            _id:pet._id,
            name:pet.name,
            breed:pet.breed,
            age:pet.age,
            gender:pet.gender,
            description:pet.description
        }})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Failed to edit pet"})
    }
}

const deletePet = async (req,res)=>
{
    try{
        const {id} = req.params
        const pet = await Pet.findByIdAndDelete(id)
        if(!pet)
            return res.status(400).json({msg:"Pet not found"})
        return res.status(200).json({msg:"Pet deleted successfully"})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Failed to delete pet"})
    }
}

module.exports = {createPet,getPets,editPet,deletePet}