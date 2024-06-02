import { createContext, useState } from "react";
import { api } from "../api/api";
import { login as backendLogin } from '../../src/api/nova';
import cryptoJs from "crypto-js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState({});
	const [notificationsAmount, setNotificationsAmount] = useState("");
	const isAuth = !!Object.keys(user).length;

	const setUserData = (userData) => {
		if (!userData) return;

		setUser({
			id: userData._id,
			username: userData.username,
			email: userData.email,
			role: userData.role,
		});

		//  api.get(`/messages/${userData._id}/unread_amount`).then((result) => {
		//    setNotificationsAmount(result.data);
		//  });
	};

	useState(() => {
		setUserData(JSON.parse(localStorage.getItem("user")));
	}, []);

	const login = async ({ userOrEmail, password }) => {
		setIsLoading(true);
	
		// Criptografa a senha fornecida pelo usuário
		const hashedPassword = cryptoJs.SHA256(password).toString();
	
		const result = await api
			.post(`/login`, {
				userOrEmail,
				password: password, // Envia a senha criptografada para o backend
			})
			.then((result) => {
				setUserData(result.data);
				localStorage.setItem("user", JSON.stringify(result.data));
				return { login: true };
			})
			.catch((e) => {
				if (e.response) return { login: false, message: e.response.data.error };
				return { login: false, message: e.message };
			});
	
		setIsLoading(false);
		return result;
	};
	return (
		<AuthContext.Provider
			value={{
				login,
				isLoading,
				user,
				notificationsAmount,
				isAuth,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
