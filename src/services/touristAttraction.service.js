import TouristAttraction from "../models/TouristAttraction.js";

const createService = (body) => TouristAttraction.create(body);

const findAllService = () => TouristAttraction.find();

const deleteService = (id) => TouristAttraction.findByIdAndDelete(id);

const updateService = (
    id, 
    name, 
    address, 
    openingHours, 
    typeOfAttraction, 
    description
) => TouristAttraction.findOneAndUpdate(
    { _id: id },
    {
        name, address, openingHours, typeOfAttraction, description
    }
)

export default {
    createService,
    findAllService,
    deleteService,
    updateService
}