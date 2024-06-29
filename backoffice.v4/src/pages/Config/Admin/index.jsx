import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
	Delete,
	DeleteIcon,
	StarContainer,
	StarIconGold
} from "../../../styles/AdminStyles";
import { Edit, FormLabel } from "../../../styles/GlobalStyles";
import { MiniContainer, Table, TableRow, Form, Add, Message } from "./Styles";
import Swal from 'sweetalert2'

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
	const navigate = useNavigate();
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
		clearErrors,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const userVerification = await api.get(`/admins/${data.username}`);
			const emailVerification = await api.get(`/admins/${data.email}`);
			console.log(userVerification);
			console.log(emailVerification);

			if (data["password"] !== data["confirmPassword"]) {
				setError("confirmPassword", {
					type: "custom",
					message: "As passwords não correspondem",
				});
				return;
			}else if(userVerification.data.length>0){
				setError("userVerification", {
					type: "custom",
					message: "Username já Existente",
				});
				return;
			}else if(emailVerification.data.length>0){
				setError("emailVerification", {
					type: "custom",
					message: "Email já Existente",
				});
				return;
			}

			api
				.post("/admin", {
					username: data.username,
					email: data.email,
					superAdmin: data.superAdmin,
					password: JSON.stringify(cryptoJs.SHA256(data.password).words),
				})
				.then(() => {
					Notify.success("Administrador criado!");
					reset();
					requestAdmins();
				});
		} catch (error) {
			console.log(error);
		}
	};

	const deleteAdmin = async (data) => {
		try {
			const currentUser = JSON.parse(localStorage.getItem("user"));
			const superAdmins = admins.filter(admin => admin.superAdmin);
			if(superAdmins.length === 1 && data.superAdmin){
				Notify.failure("Não é possível excluir o único Super Admin, se deseja excluir deve criar um novo.");
				return;
			}
			if(currentUser._id === data._id){
				Swal.fire({
					title: "Tens a Certeza?",
					text: "Se deletares o teu próprio perfil, a tua sessão será terminada, e não poderás acessar mais a esta conta!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Sim, apagar e fazer logout!",
					cancelButtonText: "Cancelar"
				  }).then( async (result) => {
					if (result.isConfirmed) {
						await api.delete(`/admin/${data._id}`);
						localStorage.removeItem("user");
						navigate("/");
						window.location.reload()			
					}else if(result.isDismissed){
						return;
					}
				  });							
			}else{
				await api.delete(`/admin/${data._id}`);
				Notify.success("Admin Excluído");
			}

			const result = await api.get(`/admins`);
			setAdmins(result.data);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				Notify.failure("Admin não encontrado");
			} else {
				Notify.failure("Erro ao excluir Admin");
			}
			console.error("Error deleting admin:", error);
		} 
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
											console.log(admins),
											<TableRow key={admin._id}>
												<Field>
													<Delete style={{ display: 'block', marginLeft: "0.5rem" }} onClick={() => deleteAdmin(admin)}>
														<DeleteIcon size={14} />
													</Delete>
													{admin.superAdmin ? (
														<StarContainer style={{ display: 'block'}}>
															<StarIconGold size={14} />
														</StarContainer>
													):null}
													{admin.username}
												</Field>
												<Field>{admin.email}</Field>
											</TableRow>
										);
								  })}
						</Table>
						<div style={{marginTop: "5px"}}>
							<StarIconGold size={14} style={{alignSelf: "start"}}/>
							<p style={{display: 'inline-block', fontSize: "14px"}}> - Super Admins</p>
						</div>
					</MiniContainer>
					<MiniContainer>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<FormLabel>Username:</FormLabel>
							<EditInput
								{...register("username")}
								required
								placeholder='exemplo'
								onChange={() => clearErrors('userVerification')}
							/>

							<FormLabel>E-mail:</FormLabel>
							<EditInput
								{...register("email")}
								type='email'
								required
								placeholder='exemplo@gmail.com'
								onChange={() => clearErrors('emailVerification')}
							/>

							<FormLabel>Password:</FormLabel>
							<EditInput {...register("password")} type='password' required />

							<FormLabel>Confirmar password:</FormLabel>
							<EditInput
								{...register("confirmPassword")}
								type='password'
								required
							/>

							<FormLabel>Super Admin?</FormLabel>
							<EditInput {...register("superAdmin")} type='checkbox' />

							<Add>Criar</Add>
							{errors.confirmPassword && (
								<Message>{errors.confirmPassword.message}</Message>
							)}
							{errors.userVerification && (
								<Message>{errors.userVerification.message}</Message>
							)}
							{errors.emailVerification && (
								<Message>{errors.emailVerification.message}</Message>
							)}
						</Form>
					</MiniContainer>
				</SContainer>
			</Container>
		</>
	);
};

export default Students;
