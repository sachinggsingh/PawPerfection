import Training from "../models/trainingProgram.js";


export const createTrainingProgram = async (req, res) => {
  try {
    const { week, title, task, resources, price } = req.body;
    if (!week || !title || !task || !resources || !price)
      return res
        .status(400)
        .json({ msg: "Cant create Task", success: false });
    //normalize Title
    const normalizeTitle = title;
    // check is the same exist
    if (price < 0)
      return res
        .status(400)
        .json({ msg: "Price can't be negative", success: false });

    const existingTraining = await Training.findOne({
      title: normalizeTitle,
      task,
      resources,
      price,
    });
    if (existingTraining)
      return res.status(409).json({ msg: "Already Exist", success: false });

    const trainingModel = new Training({
      week,
      title: normalizeTitle,
      task,
      resources,
      price,
    });
    await trainingModel.save();
    return res.status(201).json({
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
}
export const updateTrainingProgram = async (req, res) => {
  try {
    const { trainingId } = req.params;
    const { task, title, week, resources, price } = req.body;

    //  Ensure the task is a non-empty array
    if (!task || !Array.isArray(task) || task.length === 0) {
      return res.status(400).json({
        msg: "Invalid inputs. Tasks can't be empty.",
        success: false,
      });
    }

    // Update the training program with the provided fields
    const updatedTrainingModel = await Training.findByIdAndUpdate(
      trainingId,
      { task, title, week, resources, price },
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
}
export const deleteTrainingProgram = async (req, res) => {
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
}
export const getTrainingPrograms = async (req, res) => {
  try {
    const trainingPrograms = await Training.find();
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
}
export const getTrainingProgramBtID = async (req, res) => {
  try {
    const { id } = req.params;
    const trainingModel = await Training.findById(id);

    if (!trainingModel)
      return res
        .status(404)
        .json({ msg: "Can't find the model", success: false });
    return res.status(200).json({
      msg: "Training program fetched successfully.",
      success: true,
      trainingProgram: trainingModel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Can't find the Model" });
  }
}

// export default trainingCTRL;
