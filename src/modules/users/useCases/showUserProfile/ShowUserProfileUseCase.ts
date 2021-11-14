import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const existingUser = this.usersRepository.findById(user_id);
    if (!existingUser) {
      throw new Error("O usuário não existe");
    }
    return existingUser;
  }
}

export { ShowUserProfileUseCase };
