import User from "../users/user.dto";

export default interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  getUser: (token: string | null) => Promise<void>;
}