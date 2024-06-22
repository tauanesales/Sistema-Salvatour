import touristAttractionService from "../services/touristAttraction.service.js";

const getAttractions = async (req, res) => {
  try {
    let attractions = await touristAttractionService.findAllService();
    if (!attractions) attractions = [];
    //TODO: colocar as avaliações

    res.status(200).json(attractions);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addAttraction = async (req, res) => {
  try {
    const requiredFields = [
      "name",
      "address",
      "openingHours",
      "typeOfAttraction",
      "description",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Please add the field ${field}` });
      }
    }

    const { name, address, openingHours, typeOfAttraction, description } =
      req.body;

    //TODO: testar se o usuário é admin

    const attraction = await touristAttractionService.createService({
      name,
      address,
      openingHours,
      typeOfAttraction,
      description,
    });

    res.status(201).json({
      message: "Tourist Attraction registered successfully",
      id: attraction._id,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
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

    const requiredFields = [
      "name",
      "address",
      "openingHours",
      "typeOfAttraction",
      "description",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Please add the field ${field}` });
      }
    }

    const { name, address, openingHours, typeOfAttraction, description } =
      req.body;

    //TODO: criar middleware que pega o id do usuário e testa se é admin

    const result = await touristAttractionService.updateService(
      id,
      name,
      address,
      openingHours,
      typeOfAttraction,
      description
    );

    if (!result) {
      res.status(404).json({ message: "Tourist Attraction not found" });
    } else {
      res.status(204).json();
    }
  } catch (error) {
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
      res.status(204).json();
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getAttractions,
  addAttraction,
  deleteAttraction,
  updateAttraction,
};
