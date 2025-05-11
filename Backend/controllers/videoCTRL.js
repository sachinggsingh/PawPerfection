const Video = require("../models/videos");

const createVideo = async (req, res) => {
  try {
    const { title, description, url, resources } = req.body;

    if (!title || !description || !url || !resources) {
      return res
        .status(400)
        .json({ msg: "Please enter all fields", success: false });
    }

    if (description.length > 100) {
      return res
        .status(400)
        .json({
          msg: "Description cannot be longer than 100 characters",
          success: false,
        });
    }

    if (!url.startsWith("https://") || !resources.startsWith("https://")) {
      return res
        .status(400)
        .json({ msg: "Invalid URL", success: false });
    }

    // Embedder Function 
    const getYouTubeEmbedUrl = (inputUrl) => {
      try {
        const urlObj = new URL(inputUrl);
        let videoId = "";

        if (urlObj.hostname === "youtu.be") {
          videoId = urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes("youtube.com")) {
          videoId = urlObj.searchParams.get("v");
        }
        console.log(inputUrl.host);
        console.log(inputUrl.hostname);
        console.log(videoId);

        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      } catch {
        return null;
      }
    };

    const encryptedUrl = getYouTubeEmbedUrl(url);

    if (!encryptedUrl) {
      return res
        .status(400)
        .json({ msg: "Invalid YouTube URL format", success: false });
    }

    const existingVideo = await Video.findOne({ url: encryptedUrl });
    if (existingVideo) {
      return res
        .status(409)
        .json({ msg: "Video already exists", success: false });
    }

    const video = await Video.create({
      title,
      description,
      url: [encryptedUrl],
      resources,
    });

    return res.status(201).json({
      msg: "Video created successfully",
      video: {
        _id: video._id,
        title: video.title,
        description: video.description,
        url: video.url,
        resources: video.resources,
      },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Failed to create video", error, success: false });
  }
};


const showVideo = async(req,res)=>
{
    try
    {
        const {id} = req.params
        const video = await Video.findById(id)
        if(!video)
            return res.status(400).json({msg:"Video not found",success:false})
        return res.status(200).json({msg:"Video found successfully",video,success:true})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Failed to fetch video",success:false})
    }
}


const deleteVideo = async(req,res)=>
{
    try
    {
        const {id} = req.params
        const video = await Video.findByIdAndDelete(id)
        if(!video)
            return res.status(400).json({msg:"Video not found",success:false})
        return res.status(200).json({msg:"Video deleted successfully",video,success:true})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Failed to delete video",success:false})
    }
}



const updateVideo = async(req,res)=>
{
    try
    {
        const {url} = req.body
        const {id} = req.params
        const video = await Video.findByIdAndUpdate(id,{url:url})
        if(!video)
            return res.status(400).json({msg:"Video not found",success:false})
        return res.status(200).json({msg:"Video updated successfully",video,success:true})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({msg:"Failed to update video",success:false})
    }
}


module.exports = {
    createVideo,
    showVideo,
    deleteVideo,
    updateVideo
}