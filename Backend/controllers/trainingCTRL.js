const Training = require("../models/trainingProgram");


const trainPet = {
  createTrainingProgram: async (req, res) => {
    try {
      const { week, title, task, resources } = req.body;
      if (!week || !title || !task)
        return res
          .status(400)
          .json({ msg: "Cant create Task", success: false });
      //normalize Title
      const normalizeTitle = title.trim().toLoweCase();
      // check is the same exist
      const existingTraining = await Training.findOne({
        title: normalizeTitle,
        task,
      });
      if (existingTraining)
        return res.status(409).json({ msg: "Already Exist", success: false });

      const trainingModel = new Training({
        week,
        title: normalizeTitle,
        task,
        resources,
      });
      await trainingModel.save();
      return res
        .status(201)
        .json({
          msg: "Program created Successfully",
          success: true,
          trainingModel,
        });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Can't create Program", success: false });
    }
  },
  editTraining: async (req, res) => {
    try {
      const { trainingId } = req.params;
      const { task, title, week, resources } = req.body;

      //  Ensure the task is a non-empty array
      if (!task || !Array.isArray(task) || task.length === 0) {
        return res
          .status(400)
          .json({
            msg: "Invalid inputs. Tasks can't be empty.",
            success: false,
          });
      }

      // Update the training program with the provided fields
      const updatedTrainingModel = await Training.findByIdAndUpdate(
        trainingId,
        { task, title, week, resources },
        { new: true }
      );

      // If the training program doesn't exist
      if (!updatedTrainingModel) {
        return res
          .status(404)
          .json({ msg: "Training program not found.", success: false });
      }

      return res.status(200).json({
        msg: "Training program updated successfully.",
        success: true,
        updatedTrainingModel,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Can't edit and update the training program.",
        success: false,
      });
    }
  },
  deleteTraining: async (req, res) => {
    try {
      const { trainingId } = req.params;
      const deleteTrainingModel = await Training.findByIdAndDelete({
        trainingId,
      });
      if (!deleteTrainingModel)
        return res
          .status(400)
          .json({ msg: "no training model Exist", success: false });
      return res.status(200).json({ msg: "Model deleted", success: true });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "can't delete the model", success: false });
    }
  },
  getAllTrainingPrograms: async (req, res) => {
    try {
      const trainingPrograms = await Training.find(); // Find all training programs

      if (trainingPrograms.length === 0) {
        return res
          .status(404)
          .json({ msg: "No training programs found.", success: false });
      }

      return res.status(200).json({
        msg: "Training programs fetched successfully.",
        success: true,
        trainingPrograms,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Error fetching training programs.",
        success: false,
      });
    }
  },
  getTrainingProgramById: async (req, res) => {
    try {
      const { trainingId } = req.params;
      const trainingModel = await Training.findById({ trainingId });

      if (!trainingModel)
        return res
          .status(404)
          .json({ msg: "Can't find the model", success: false });
      return res.status(200).json({
        msg: "Training program fetched successfully.",
        success: true,
        trainingProgram,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Can't find the Model" });
    }
  },
};


module.exports = trainPet;