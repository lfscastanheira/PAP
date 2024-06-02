import styled from "styled-components";
import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import {
	Container,
	ContainerHeader,
	SmallContainer,
	Header,
	TableIconContainer,
	TableRow,
	Search,
	Edit,
	Delete,
	Add,
	EditIcon,
	DeleteIcon,
	HeaderDivider,
	TableField,
} from "../../../styles/AdminStyles";
import { Notify } from "notiflix";

const HeaderDivision = styled(HeaderDivider)`
	width: 20%;
	:first-child {
		width: 40%;
	}
	@media screen and (max-width: 415px) {
		width: 18%;
		:first-child {
			width: 38%;
		}
	}
`;

const Field = styled(TableField)`
	width: 20%;
	:first-child {
		width: 40%;
	}
`;

const Students = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");

	useEffect(() => {
		setLoading(true);
		try {
			api.get(`/students?name=${query}`).then((result) => {
				setUsers(result.data);
			});
		} catch {
			Notify.failure("Problemas de rede (tente mais tarde)");
		}
		setLoading(false);
	}, [query]);

	const deleteUser = async (data) => {
		try {
			await api.delete(`/student/${data._id}`);
			await api.delete(`/user/${data._id}`)
			Notify.success("Formando Excluído");

			const result = await api.get(`/students`);
			setUsers(result.data);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				Notify.failure("Formando não encontrado");
			} else {
				Notify.failure("Erro ao excluir Formando");
			}
			console.error("Error deleting student:", error);
		}
	};

	return (
		<>
			<Container>
				<ContainerHeader>
					<Search
						type='text'
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						placeholder='Procurar'
					/>
					<Add to={"/Admin/students/form"}>Adicionar</Add>
				</ContainerHeader>
				<SmallContainer>
					<Header>
						<HeaderDivision>
							<span>Nome</span>
						</HeaderDivision>
						<HeaderDivision>
							<span>NIF</span>
						</HeaderDivision>
						<HeaderDivision>
							<span>E-mail</span>
						</HeaderDivision>
						<HeaderDivision>
							<span>Contacto</span>
						</HeaderDivision>
					</Header>
					<table>
						{loading ? (
							<TableRow>
								<TableField>A carregar</TableField>
							</TableRow>
						) : users.length === 0 ? (
							<TableRow>
								<TableField>Sem resultados</TableField>
							</TableRow>
						) : (
							users.map((user) => {
								return (
									<TableRow key={user._id}>
										<Field>
											<TableIconContainer>
												<Edit to={`/Admin/students/form/${user._id}`}>
													<EditIcon size={14} />
												</Edit>
											</TableIconContainer>
											<TableIconContainer>
												<Delete onClick={() => deleteUser(user)}>
													<DeleteIcon size={14} />
												</Delete>
											</TableIconContainer>
											{user.name}
										</Field>
										<Field>{user.nif}</Field>
										<Field>{user.email}</Field>
										<Field>{user.phoneNumber}</Field>
									</TableRow>
								);
							})
						)}
					</table>
				</SmallContainer>
			</Container>
		</>
	);
};

export default Students;
