import { io } from "socket.io-client";
import { useUser } from "@/store/zustand";

const socket = () => {
  const user = useUser((state) => state.user);
  const userId = user?._id || "guest";

  return io(process.env.NEXT_PUBLIC_SERVER, {
    query: { userId },
    transports: ["websocket"],
  });
};

export default socket;
