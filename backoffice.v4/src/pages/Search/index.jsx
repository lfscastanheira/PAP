import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import {
	Container,
	ContainerHeader,
	SmallContainer,
} from "../../styles/AdminStyles";
import {
	HeaderSpan,
	SearchDivision,
	DivisionTitle,
	UserIcon,
	TeacherIcon,
	ModuleIcon,
	CourseIcon,
	ActionIcon,
	DivisionResults,
	DivisionBody,
	BodyRow,
	SearchedItem,
} from "./SearchStyles";

const SContainer = styled(SmallContainer)`
	height: 100%;
`;

const DataWrapper = ({ icon, name, data, path, labelName }) => {
	return (
		<SearchDivision>
			<DivisionTitle>
				{icon} {name}
				<DivisionResults>
					({data.length} resultado{data.length !== 1 && "s"})
				</DivisionResults>
			</DivisionTitle>
			<DivisionBody>
				<BodyRow>
					{data.map((field) => {
						return (
							<SearchedItem key={field[labelName]} to={path + field._id}>
								{field[labelName]}
							</SearchedItem>
						);
					})}
				</BodyRow>
			</DivisionBody>
		</SearchDivision>
	);
};

const Search = () => {
	const { query } = useParams();

	const [result, setResult] = useState({});
	const [loading, setLoading] = useState(true);

	const wrappers = [
		{
			type: "students",
			icon: <UserIcon size={18} />,
			name: "Formandos",
			path: "/Admin/students/form/",
			labelName: "name",
		},
		{
			type: "teachers",
			icon: <TeacherIcon size={18} />,
			name: "Formadores",
			path: "/Admin/teachers/form/",
			labelName: "name",
		},
		{
			type: "modules",
			icon: <ModuleIcon size={18} />,
			name: "Módulos",
			path: "/Admin/modules/form/",
			labelName: "designation",
		},
		{
			type: "courses",
			icon: <CourseIcon size={18} />,
			name: "Cursos",
			path: "/Admin/courses/form/",
			labelName: "name",
		},
		{
			type: "actions",
			icon: <ActionIcon size={18} />,
			name: "Ações",
			path: "/Admin/actions/form/",
			labelName: "code",
		},
	];

	useEffect(() => {
		setLoading(true);
		api.get(`/search?query=${query}`).then((result) => {
			setResult(result.data);
			setLoading(false);
		});
	}, [query]);

	const noResult = Object.keys(result).every((key) => {
		return result[key].length === 0;
	});

	return (
		<>
			<Container>
				<ContainerHeader>
					<HeaderSpan>
						Procurou por "<b>{query}</b>"
					</HeaderSpan>
				</ContainerHeader>
				<SContainer>
					{loading
						? "Carregar..."
						: noResult
						? "Sem resultados"
						: wrappers.map((wrapper) => {
								if (result[wrapper.type].length === 0)
									return <div key={wrapper.type}></div>;

								return (
									<DataWrapper
										key={wrapper.type}
										icon={wrapper.icon}
										name={wrapper.name}
										data={result[wrapper.type]}
										path={wrapper.path}
										labelName={wrapper.labelName}
									/>
								);
						  })}
				</SContainer>
			</Container>
		</>
	);
};

export default Search;
