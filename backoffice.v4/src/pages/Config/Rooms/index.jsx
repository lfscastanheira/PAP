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
} from "../../../styles/AdminStyles";

const HeaderDivision = styled(HeaderDivider)`
	width: 16.6%;
	:nth-child(2) {
		width: 50%;
	}
`;

const Field = styled(TableField)`
	width: 16.6%;
	:nth-child(2) {
		width: 50%;
	}
`;

const Rooms = () => {
	const [rooms, setRooms] = useState([]);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		api.get(`/rooms?designation=${query}`).then((result) => {
			setRooms(result.data);
			setLoading(false);
		});
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
					<Add to={"/config/rooms/form"}>Adicionar</Add>
				</ContainerHeader>
				<SmallContainer>
					<Header>
						<HeaderDivision>Código</HeaderDivision>
						<HeaderDivision>Designação</HeaderDivision>
						<HeaderDivision>Lotação</HeaderDivision>
						<HeaderDivision>Ativa</HeaderDivision>
					</Header>
					<table>
						{loading ? (
							<TableRow>
								<TableField>A carregar</TableField>
							</TableRow>
						) : rooms.length === 0 ? (
							<TableRow>
								<TableField>Sem resultados</TableField>
							</TableRow>
						) : (
							rooms.map((room) => {
								return (
									<TableRow key={room._id}>
										<Field>
											<TableIconContainer>
												<Edit to={`/config/rooms/form/${room._id}`}>
													<EditIcon size={14} />
												</Edit>
											</TableIconContainer>
											{room.code}
										</Field>
										<Field>{room.designation}</Field>
										<Field>{room.lotation}</Field>
										<Field>{room.isActive ? "Sim" : "Não"}</Field>
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

export default Rooms;
