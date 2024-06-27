import touristAttractionService from "../services/touristAttraction.service.js";

const getAttractions = async (req, res) => {
  try {
    let attractions = await touristAttractionService.findAllService();
    const serverUrl = req.protocol + "://" + req.get("host");
    attractions = attractions.map((attraction) => {
      if (attraction.image) {
        attraction.image = `${serverUrl}/touristAttraction/image/${attraction._id}`;
      }
      return attraction;
    });

    if (!attractions) attractions = [];
    // TODO: Adicionar lógica para avaliações

    res.status(200).json(attractions);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getImage = async (req, res) => {
  try {
    const id = req.params.id;
    const attraction = await touristAttractionService.findByIdService(id);

    if (!attraction || !attraction.image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const base64Data = attraction.image;
    const imgBuffer = Buffer.from(base64Data, "base64");

    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": imgBuffer.length,
    });
    res.end(imgBuffer);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addAttraction = async (req, res) => {
  try {
    const requiredFields = ["name", "address", "openingHours", "description"];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Please add the field ${field}` });
      }
    }

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }

    const { name, address, openingHours, description } = req.body;

    const base64Data = req.file.buffer.toString('base64');

    const attraction = await touristAttractionService.createService({
      name,
      address,
      openingHours,
      description,
      image: base64Data,
    });

    res.status(201).json({
      message: "Tourist Attraction registered successfully",
      id: attraction._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const updateAttraction = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: `Please add the attraction id as a request param` });
    }

    const requiredFields = ["name", "address", "openingHours", "description"];

    for (const field of requiredFields) {
      if (!req.body[field] && !req.file) {
        return res
          .status(400)
          .json({ error: `Please add the field ${field} or upload an image` });
      } else {
        break;
      }
    }

    const { name, address, openingHours, description } = req.body;
    let base64Data;

    if (req.file) {
      base64Data = req.file.buffer.toString('base64');
    }

    //TODO: criar middleware que pega o id do usuário e testa se é admin

    const updatedData = {};
    if (name) updatedData.name = name;
    if (address) updatedData.address = address;
    if (openingHours) updatedData.openingHours = openingHours;
    if (description) updatedData.description = description;
    if (base64Data) updatedData.image = base64Data;

    const result = await touristAttractionService.updateService(
      id,
      updatedData
    );

    if (!result) {
      res.status(404).json({ message: "Tourist Attraction not found" });
    } else {
      res
        .status(204)
        .json({ message: "Tourist Attraction update successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAttraction = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ message: `Please add the attraction id as a request param` });
    }

    const result = await touristAttractionService.deleteService(id);

    if (!result) {
      res.status(404).json({ error: "Tourist Attraction not found" });
    } else {
      res.status(204).json({ menssage: "Attraction succesfully deleted" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getAttractions,
  addAttraction,
  deleteAttraction,
  updateAttraction,
  getImage,
};
