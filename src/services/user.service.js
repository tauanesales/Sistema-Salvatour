import User from "../models/User.js";

const create = (body) => User.create(body);

const findAll = () => User.find();

const findByIdService = (id) => User.findOne({ id });

const deleteUserById = async (requestingUserId, userIdToDelete) => {
    try {
      const requestingUser = await User.findById(requestingUserId);
      
      if (!requestingUser.isAdmin) {
        throw new Error('Usuário não tem permissão para excluir outros usuários');
      }
  
      const userToDelete = await User.findByIdAndDelete(userIdToDelete);
  
      if (!userToDelete) {
        throw new Error('Usuário não encontrado');
      }
  
      return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
      throw new Error(`Erro ao excluir usuário: ${error.message}`);
    }
  };

const updateService = (
    id,
    name,
    email,
    password
) => User.findOneAndUpdate(
    {_id: id},{
    name,
    email,
    password});

export default {
    create,
    findAll,
    findByIdService,
    updateService,
    deleteUserById
};