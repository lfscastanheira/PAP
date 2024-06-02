import styled from "styled-components";
import { Star } from "react-feather";
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
} from "../../../styles/AdminStyles";
import { Notify } from "notiflix";

const StarIcon = styled(Star)`
	color: ${(props) => props.theme.colors.primary};
	align-self: center;
`;

const HeaderDivision = styled(HeaderDivider)`
	width: 10%;
	:nth-child(2),
	:nth-child(4) {
		width: 40%;
	}
`;

const Field = styled(TableField)`
	width: 10%;
	:nth-child(2),
	:nth-child(4) {
		width: 40%;
	}
`;

const Edit2 = styled(Edit)`
	max-width: 1.5rem;
`;

const TableIconContainer2 = styled(TableIconContainer)`
	margin-left: 1rem;
`;

const Actions = () => {
	const [actions, setActions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");

	useEffect(() => {
		setLoading(true);
		try {
			api.get(`/actions?code=${query}`).then((result) => {
				setActions(result.data);
			});
		} catch {
			Notify.failure("Problemas de rede (tente mais tarde)");
		}
		setLoading(false);
	}, [query]);

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
					<Add to={"/Admin/actions/form"}>Adicionar</Add>
				</ContainerHeader>
				<SmallContainer>
					<Header>
						<HeaderDivision>Código</HeaderDivision>
						<HeaderDivision>Curso</HeaderDivision>
						<HeaderDivision>Duração (h)</HeaderDivision>
						<HeaderDivision>Local</HeaderDivision>
					</Header>
					<table>
						{loading ? (
							<TableRow>
								<Field>A carregar</Field>
							</TableRow>
						) : actions.length === 0 ? (
							<TableRow>
								<Field>Sem resultados</Field>
							</TableRow>
						) : (
							actions.map((action) => {
								return (
									<TableRow key={action._id}>
										<Field>
											<TableIconContainer>
												<Edit2 to={`/Admin/actions/form/${action._id}`}>
													<EditIcon size={14} />
												</Edit2>
											</TableIconContainer>
											<TableIconContainer2>
												<Edit2 to={`/Admin/evaluations/${action._id}`}>
													<StarIcon size={14} />
												</Edit2>
											</TableIconContainer2>
											{action.code}
										</Field>
										<Field>{action.course}</Field>
										<Field>{action.duration}</Field>
										<Field>{action.location}</Field>
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

export default Actions;
