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
	HeaderDivider,
	TableField,
	Delete,
	DeleteIcon,
} from "../../../styles/AdminStyles";
import { Notify } from "notiflix";

const HeaderDivision = styled(HeaderDivider)`
	width: 25%;
	:nth-child(2) {
		width: 50%;
	}
`;

const Field = styled(TableField)`
	width: 25%;
	:nth-child(2) {
		width: 50%;
	}
`;

const AdminModules = () => {
	const [modules, setModules] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");

	useEffect(() => {
		setLoading(true);
		try {
			api.get(`/modules?designation=${query}`).then((result) => {
				setModules(result.data);
			});
		} catch {
			Notify.failure("Problemas de rede (tente mais tarde)")
		}
		setLoading(false);
	}, [query]);

	const deleteModule = async (data) => {
		try {
			await api.delete(`/module/${data._id}`);
			Notify.success("Módulo Excluído");

			const result = await api.get(`/modules`);
			setModules(result.data);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				Notify.failure("Módulo não encontrado");
			} else {
				Notify.failure("Erro ao excluir Módulo");
			}
			console.error("Error deleting module:", error);
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
					<Add to={"/Admin/modules/form"}>Adicionar</Add>
				</ContainerHeader>
				<SmallContainer>
					<Header>
						<HeaderDivision>Abreviatura</HeaderDivision>
						<HeaderDivision>Nome</HeaderDivision>
						<HeaderDivision>Duração (h)</HeaderDivision>
					</Header>
					<table>
						{loading ?
							<TableRow>
								<TableField>A carregar</TableField>
							</TableRow>
							: modules.length === 0 ?
								<TableRow>
									<TableField>Sem resultados</TableField>
								</TableRow>
								: modules.map((module) => {
									return (
										<TableRow key={module._id}>
											<Field>
												<TableIconContainer>
													<Edit to={`/Admin/modules/form/${module._id}`}>
														<EditIcon size={14} />
													</Edit>
												</TableIconContainer>
												<TableIconContainer>
													<Delete onClick={() => deleteModule(module)}>
														<DeleteIcon size={14} />
													</Delete>
												</TableIconContainer>
												{module.abbreviation}
											</Field>
											<Field>{module.designation}</Field>
											<Field>{module.totalTime}</Field>
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

export default AdminModules;
