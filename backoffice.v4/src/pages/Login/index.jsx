import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
	Container,
	Card,
	CardDivision,
	Form,
	Logo,
	Input,
	InputWrapper,
	UserIcon,
	LockIcon,
	LoadingIcon,
	SubmitButton,
	LoadingButton,
	FormFooter,
	Message,
} from "../../styles/LoginStyles";

const Login = () => {
	const { login, isLoading } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm();
	const navigate = useNavigate();

	const tryLogin = async (data) => {
		const user = await login(data);
		if (user.login) navigate("/home");
		else {
			setError("password", { type: "custom", message: `${user.message}` });
		}
	};

	return (
		<>
			<Container>
				<Card>
					<CardDivision>
						<Form onSubmit={handleSubmit(tryLogin)}>
							<Logo src='logo.png' />
							<InputWrapper>
								<UserIcon size={18} />
								<Input
									type={"text"}
									{...register("userOrEmail", { required: true })}
									placeholder='Utilizador'
									required
								/>
							</InputWrapper>
							<InputWrapper>
								<LockIcon size={18} />
								<Input
									type={"password"}
									{...register("password", { required: true })}
									placeholder='Password'
									required
								/>
							</InputWrapper>
							<FormFooter>
								{isLoading ? (
									<LoadingButton>
										<LoadingIcon size={18} />
									</LoadingButton>
								) : (
									<SubmitButton type='submit' value='Login'>
										Login
									</SubmitButton>
								)}
							</FormFooter>

							<Message>{errors.password && errors.password.message}</Message>
						</Form>
					</CardDivision>
				</Card>
			</Container>
		</>
	);
};

export default Login;
