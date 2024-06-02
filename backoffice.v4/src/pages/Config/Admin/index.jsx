import styled from "styled-components";
import { useEffect, useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { api } from "../../../api/api";
import cryptoJs from "crypto-js";
import { useForm } from "react-hook-form";
import {
	Container,
	ContainerHeader,
	SmallContainer,
	Header,
	HeaderDivider,
	TableField,
} from "../../../styles/AdminStyles";
import { Edit, FormLabel } from "../../../styles/GlobalStyles";
import { MiniContainer, Table, TableRow, Form, Add, Message } from "./Styles";

const SContainer = styled(SmallContainer)`
	flex-direction: row;
	height: 100%;
`;

const HeaderDivision = styled(HeaderDivider)`
	width: 50%;
`;

const Field = styled(TableField)`
	font-size: 13px;
	width: 50%;
`;

const EditInput = styled(Edit)`
	grid-column: span 5;
`;

const Students = () => {
	const [admins, setAdmins] = useState([]);
	const [loading, setLoading] = useState(true);

	const requestAdmins = () => {
		api.get("/admins").then((result) => {
			setAdmins(result.data);
			setLoading(false);
		});
	};
	useEffect(() => {
		requestAdmins();
	}, []);

	const {
		register,
		handleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		if (data["password"] !== data["confirmPassword"]) {
			setError("confirmPassword", {
				type: "custom",
				message: "As passwords não correspondem",
			});
			return;
		}

		api
			.post("/admin", {
				username: data.username,
				email: data.email,
				password: JSON.stringify(cryptoJs.SHA256(data.password).words),
			})
			.then(() => {
				Notify.success("Administrador criado!");
				reset();
				requestAdmins();
			});
	};

	return (
		<>
			<Container>
				<ContainerHeader></ContainerHeader>
				<SContainer>
					<MiniContainer>
						<Header>
							<HeaderDivision>Username</HeaderDivision>
							<HeaderDivision>E-mail</HeaderDivision>
						</Header>
						<Table>
							{loading
								? "Loading..."
								: admins.map((admin) => {
										return (
											<TableRow key={admin._id}>
												<Field>{admin.username}</Field>
												<Field>{admin.email}</Field>
											</TableRow>
										);
								  })}
						</Table>
					</MiniContainer>
					<MiniContainer>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<FormLabel>Username:</FormLabel>
							<EditInput
								{...register("username")}
								required
								placeholder='exemplo'
							/>

							<FormLabel>E-mail:</FormLabel>
							<EditInput
								{...register("email")}
								type='email'
								required
								placeholder='exemplo@gmail.com'
							/>

							<FormLabel>Password:</FormLabel>
							<EditInput {...register("password")} type='password' required />

							<FormLabel>Confirmar password:</FormLabel>
							<EditInput
								{...register("confirmPassword")}
								type='password'
								required
							/>

							<Add>Criar</Add>
							{errors.confirmPassword && (
								<Message>{errors.confirmPassword.message}</Message>
							)}
						</Form>
					</MiniContainer>
				</SContainer>
			</Container>
		</>
	);
};

export default Students;
