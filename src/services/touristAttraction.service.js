import TouristAttraction from "../models/TouristAttraction.js";

const createService = (body) => TouristAttraction.create(body);

const findAllService = () => TouristAttraction.find();

const findByIdService = (id) => TouristAttraction.findOne({ _id: id });

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
  findByIdService
};
