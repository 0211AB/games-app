import create from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
    persist((set) => ({
        user: null,
        token: null,
        isLoggedIn: false,
        getUser: async (token) => {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/user-detail`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer :${token}`,
                    },
                }
            );
            set({ user: await response.json() });
        },
    })),
    {
        name: "user", // name of item in the storage (must be unique)
    }
);

export default useUserStore;
