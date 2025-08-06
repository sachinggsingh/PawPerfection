import Pet from '../models/petModel.js';

const createPet = async (req, res) => {
    try {
        const { name, breed, age, gender, description } = req.body;
        if (!name || !breed || !age || !gender || !description)
            return res.status(400).json({ msg: "Please enter all fields" });
        if (age < 0)
            return res.status(400).json({ msg: "Age cannot be negative or zero" });
        if (!description)
            return res.status(400).json({ msg: "Description cannot be empty" });
        if (!gender)
            return res.status(400).json({ msg: "Gender cannot be empty" });
        if (!breed)
            return res.status(400).json({ msg: "Breed cannot be empty" });

        const pet = await Pet.create({
            name,
            breed,
            age,
            gender,
            description,
            userId: req.user._id // Associate pet with user
        });
        return res.status(201).json({
            msg: "Pet created successfully",
            pet: {
                _id: pet._id,
                name: pet.name,
                breed: pet.breed,
                age: pet.age,
                gender: pet.gender,
                description: pet.description
            }
        });
    }
    catch (error) {
        console.error("Create pet error:", error);
        return res.status(500).json({ msg: "Failed to create pet" });
    }
}

const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find({ userId: req.user._id });
        return res.status(200).json({
            msg: "Pets retrieved successfully",
            pets: pets.map(pet => ({
                _id: pet._id,
                name: pet.name,
                breed: pet.breed,
                age: pet.age,
                gender: pet.gender,
                description: pet.description
            }))
        });
    }
    catch (error) {
        console.error("Get all pets error:", error);
        return res.status(500).json({ msg: "Failed to fetch pets" });
    }
}

const getPets = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json({ msg: "Pet not found" });
        }
        
        // Check if the pet belongs to the authenticated user
        if (pet.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Access denied. This pet doesn't belong to you." });
        }
        
        return res.status(200).json({
            msg: "Pet found successfully",
            pet: {
                _id: pet._id,
                name: pet.name,
                breed: pet.breed,
                age: pet.age,
                gender: pet.gender,
                description: pet.description
            }
        });
    }
    catch (error) {
        console.error("Get pet error:", error);
        return res.status(500).json({ msg: "Failed to fetch pet" });
    }
}

const editPet = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, breed, age, gender, description } = req.body;
        if (!name || !breed || !age || !gender || !description)
            return res.status(400).json({ msg: "Please enter all fields" });
        if (age < 0)
            return res.status(400).json({ msg: "Age cannot be negative or zero" });
        if (!description)
            return res.status(400).json({ msg: "Description cannot be empty" });
        if (!gender)
            return res.status(400).json({ msg: "Gender cannot be empty" });
        if (!breed)
            return res.status(400).json({ msg: "Breed cannot be empty" });
            
        // Check if pet exists and belongs to user
        const existingPet = await Pet.findById(id);
        if (!existingPet) {
            return res.status(404).json({ msg: "Pet not found" });
        }
        
        if (existingPet.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Access denied. This pet doesn't belong to you." });
        }
        
        const pet = await Pet.findByIdAndUpdate(id, { name, breed, age, gender, description }, { new: true });
        return res.status(200).json({
            msg: "Pet edited successfully",
            pet: {
                _id: pet._id,
                name: pet.name,
                breed: pet.breed,
                age: pet.age,
                gender: pet.gender,
                description: pet.description
            }
        });
    }
    catch (error) {
        console.error("Edit pet error:", error);
        return res.status(500).json({ msg: "Failed to edit pet" });
    }
}

const deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Check if pet exists and belongs to user
        const pet = await Pet.findById(id);
        if (!pet) {
            return res.status(404).json({ msg: "Pet not found" });
        }
        
        if (pet.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: "Access denied. This pet doesn't belong to you." });
        }
        
        await Pet.findByIdAndDelete(id);
        return res.status(200).json({ msg: "Pet deleted successfully" });
    }
    catch (error) {
        console.error("Delete pet error:", error);
        return res.status(500).json({ msg: "Failed to delete pet" });
    }
}

export default { createPet, getAllPets, getPets, editPet, deletePet }