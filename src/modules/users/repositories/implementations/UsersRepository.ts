import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const userFromID = this.users.find((user) => user.id === id);
    return userFromID;
  }

  findByEmail(email: string): User | undefined {
    const userFromEmail = this.users.find((user) => user.email === email);
    return userFromEmail;
  }

  turnAdmin(receivedUser: User): User | undefined {
    const userIndex = this.users.indexOf(receivedUser);
    Object.assign(this.users[userIndex], {
      admin: true,
      updated_at: new Date(),
    });
    return this.users[userIndex];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
