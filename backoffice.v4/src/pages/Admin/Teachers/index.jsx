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
	Add,
	EditIcon,
	Delete,
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
			api.get(`/teachers?name=${query}`).then((result) => {
				setUsers(result.data);
			});
		} catch {
			Notify.failure("Problemas de rede (tente mais tarde)")
		}
		setLoading(false);
	}, [query]);

	const deleteTeacher = async (data) => {
		try {
			await api.delete(`/teacher/${data._id}`);
			await api.delete(`/user/${data._id}`)
			Notify.success("Formador Excluído");

			const result = await api.get(`/teachers`);
			setUsers(result.data);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				Notify.failure("Formador não encontrado");
			} else {
				Notify.failure("Erro ao excluir Formador");
			}
			console.error("Error deleting teacher:", error);
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
					<Add to={"/Admin/teachers/form"}>Adicionar</Add>
				</ContainerHeader>
				<SmallContainer>
					<Header>
						<HeaderDivision>Nome</HeaderDivision>
						<HeaderDivision>NIF</HeaderDivision>
						<HeaderDivision>E-mail</HeaderDivision>
						<HeaderDivision>Contacto</HeaderDivision>
					</Header>
					<table>
						{loading ?
							<TableRow>
								<Field>A carregar</Field>
							</TableRow>
							: users.length === 0 ?
								<TableRow>
									<Field>Sem resultados</Field>
								</TableRow>
								: users.map((user) => {
									return (
										<TableRow key={user._id}>
											<Field>
												<TableIconContainer>
													<Edit to={`/Admin/teachers/form/${user._id}`}>
														<EditIcon size={14} />
													</Edit>
												</TableIconContainer>
												<TableIconContainer>
													<Delete onClick={() => deleteTeacher(user)}>
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
						}
					</table>
				</SmallContainer>
			</Container>
		</>
	);
};

export default Students;
