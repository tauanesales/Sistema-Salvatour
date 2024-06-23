import TouristAttraction from "../models/TouristAttraction.js";

const createService = (body) => TouristAttraction.create(body);

const findAllService = () => TouristAttraction.find();

const deleteService = (id) => TouristAttraction.findByIdAndDelete(id);

const updateService = (id, updateData) =>
    TouristAttraction.findOneAndUpdate(
      { _id: id },
      updateData
    );

export default {
  createService,
  findAllService,
  deleteService,
  updateService,
};
