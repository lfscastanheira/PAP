import styled from "styled-components";
import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { areaOfFormation } from "../../../selectData.json"
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

const HeaderDivision = styled(HeaderDivider)`
	width: 13.3%;
	:nth-child(2),
	:last-child {
		width: 30%;
	}
`;

const Field = styled(TableField)`
	width: 13.3%;
	:nth-child(2),
	:last-child {
		width: 30%;
	}
`;

const Students = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState("");

	useEffect(() => {
		setLoading(true);
		try {
			api.get(`/courses?name=${query}`).then((result) => {
				setCourses(result.data);
			});
		} catch {
			Notify.failure("Problemas de rede (tente mais tarde)")
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
					<Add to={"/Admin/courses/form"}>Adicionar</Add>
				</ContainerHeader>
				<SmallContainer>
					<Header>
						<HeaderDivision>Código</HeaderDivision>
						<HeaderDivision>Nome</HeaderDivision>
						<HeaderDivision>Duração (h)</HeaderDivision>
						<HeaderDivision>Nº Módulos</HeaderDivision>
						<HeaderDivision>Área de Formação</HeaderDivision>
					</Header>
					<table>
						{loading ?
							<TableRow>
								<Field>A carregar</Field>
							</TableRow>
							: courses.length === 0 ?

								<TableRow>
									<Field>Sem resultados</Field>
								</TableRow>
								: courses.map((course) => {

									const area = areaOfFormation.filter(area =>
										course.area === area.value
									)[0]?.label

									return (
										<TableRow key={course._id}>
											<Field>
												<TableIconContainer>
													<Edit to={`/Admin/courses/form/${course._id}`}>
														<EditIcon size={14} />
													</Edit>
												</TableIconContainer>
												{course.code}
											</Field>
											<Field>{course.name}</Field>
											<Field>{course.duration}</Field>
											<Field>{course.modules}</Field>
											<Field>{area}</Field>
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
