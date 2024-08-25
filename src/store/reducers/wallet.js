import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/api";
import { dispatch } from "../index";
const initialState = {
    error: null,
    user: {
        _id: "",
        username: "",
        balance: 0,
        energy: 0,
        full_energy: 1,
        tap: 1,
        limit: 1000,
        daily_coins: new Date()
    },
    friend: false,
    users: [],
};
const wallet = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        // GET USER
        getWalletSuccess(state, action) {
            state.user = action.payload;
        },
        getUsersSuccess(state, action) {
            state.users = action.payload;
        },
        addWalletSuccess(state, action) {
            state.user = action.payload;
        },
        updateWalletSuccess(state, action) {
            state.user = action.payload;
        },
        addFriendSuccess(state, action) {
            state.friend = action.payload;
        },
    },
});
// Reducer
export default wallet.reducer;
// ----------------------------------------------------------------------
export function getWallet(username) {
    return async () => {
        try {
            const response = await axios.post(`/wallet/${username}`);
            dispatch(wallet.actions.getWalletSuccess(response.data));
        }
        catch (error) {
            dispatch(wallet.actions.hasError(error));
        }
    };
}
export function insertWallet(username) {
    console.log("wallet address---------->", username);
    return async () => {
        try {
            const response = await axios.post("/wallet/add", { username: username });
            dispatch(wallet.actions.addWalletSuccess(response.data));
        }
        catch (error) {
            dispatch(wallet.actions.hasError(error));
        }
    };
}
export function updateWallet(username, balance, energy) {
    return async () => {
        try {
            const response = await axios.post(`/wallet/update/${username}`, {
                balance: balance,
                energy: energy,
            });
            dispatch(wallet.actions.updateWalletSuccess(response.data));
        }
        catch (error) {
            dispatch(wallet.actions.hasError(error));
        }
    };
}
export function updateEnergy(username, energy) {
    console.log("------>", energy);
    return async () => {
        try {
            const response = await axios.post(`/wallet/updateEnergy/${username}`, {
                energy: energy,
            });
            dispatch(wallet.actions.updateWalletSuccess(response.data));
        }
        catch (error) {
            dispatch(wallet.actions.hasError(error));
        }
    };
}
export function updateFullEnergy(username, full_energy) {
    return async () => {
        try {
            const response = await axios.post(`/wallet/updateFullEnergy/${username}`, {
                full_energy: full_energy,
            });
            dispatch(wallet.actions.updateWalletSuccess(response.data));
        }
        catch (error) {
            dispatch(wallet.actions.hasError(error));
        }
    };
}
export function updateTap(username, tap) {
    console.log("------>", tap);
    return async () => {
        try {
            const response = await axios.post(`/wallet/updateTap/${username}`, {
                tap: tap,
            });
            dispatch(wallet.actions.updateWalletSuccess(response.data));
        }
        catch (error) {
            dispatch(wallet.actions.hasError(error));
        }
    };
}
export function updateLimit(username, limit) {
    console.log("------>", limit);
    return async () => {
        try {
            const response = await axios.post(`/wallet/updateLimit/${username}`, {
                limit: limit,
            });
            dispatch(wallet.actions.updateWalletSuccess(response.data));
        }
        catch (error) {
            dispatch(wallet.actions.hasError(error));
        }
    };
}
export function updateBalance(username, balance) {
    return async () => {
        try {
            const response = await axios.post(`/wallet/updateBalance/${username}`, {
                balance: balance,
            });
            dispatch(wallet.actions.updateWalletSuccess(response.data));
        }
        catch (error) {
            dispatch(wallet.actions.hasError(error));
        }
    };
}
export function addFriend(username) {
    return async () => {
        try {
            await axios.post(`/wallet/${username}`);
            dispatch(wallet.actions.addFriendSuccess(true));
        }
        catch (error) {
            dispatch(wallet.actions.addFriendSuccess(false));
        }
    };
}
export function getAllUsers() {
    return async () => {
        try {
            const response = await axios.get("/wallet/all");
            dispatch(wallet.actions.getUsersSuccess(response.data));
        }
        catch (error) {
            dispatch(wallet.actions.hasError(error));
        }
    };
}
export function updateDailyCoins(username, daily_coins) {
    return async () => {
        try {
            const response = await axios.post(`/wallet/updateDailyCoins/${username}`, {
                daily_coins: daily_coins,
            });
            dispatch(wallet.actions.updateWalletSuccess(response.data));
        }
        catch (error) {
            dispatch(wallet.actions.hasError(error));
        }
    };
}
