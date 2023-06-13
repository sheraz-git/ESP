const pastproject=require("../Model/Publishpastproject");
exports.pastprojects = async (req, res) => {
  try {
    const VendorId = req.headers._id;
    console.log(VendorId);
    const {ProjectName, Description } = req.body;
 
    if (!req.files || !req.files.Image || !req.files.Video) {
      return res.status(400).json({ message: "Please upload an image and video" });
    }

    const { Image, Video } = req.files;

    const findproject = await pastproject.findOne({ ProjectName: ProjectName });
    if (findproject) {
      return res.status(400).json({ message: "Project already uploaded" });
    }
    const created = await pastproject.create({
      ProjectName: ProjectName,
      Description: Description,
      Image: Image[0].filename,
      Video: Video[0].filename,
      VendorId:VendorId
    });
    return res.status(201).json({ message: "Project uploaded successfully", created });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getproject = async (req, res) => {
  try {
    const VendorId = req.headers._id;
    console.log(VendorId);
    const findproject = await pastproject.find({VendorId:VendorId}); // filter out the past projects that don't match the vendorId
    console.log(findproject);
    return res.status(200).json({
      message: "Specific  projects",
      findproject
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error"
    });
  }
}

exports.getallprojects = async (req, res) => {
  try {
  
    const findallproject = await pastproject.find({});
    console.log(findallproject);
    return res.status(200).json({
      message: "All  projects",
      findallproject    });
  } catch (error) {
    return res.status(500).json({
      message: "server error"
    });
  }
}

