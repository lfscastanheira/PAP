import styled from "styled-components";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api/api";
import {
	Container,
	ContainerHeader,
	SmallContainer,
	Header,
	TableRow,
	HeaderDivider,
	TableField,
} from "../../../styles/AdminStyles";
import { Edit } from "../../../styles/FormsTabsStyles";
import { SubmitButton, CancelButton } from "../../../styles/FormsStyles";
import { useForm } from "react-hook-form";

const Edit2 = styled(Edit)`
	height: 2rem;
	width: 5rem;
	text-align: center;
`;

const FormLabel = styled.b`
	font-size: 13px;
	margin-right: 0.5rem;
`;

const ContainHeader = styled(ContainerHeader)`
	line-height: 1rem;
	height: 2rem;
	align-items: center;
	display: flex;
`;

const SContainer = styled(SmallContainer)`
	height: 85%;
	margin-bottom: 0.5rem;
`;

const Head = styled(Header)`
	font-size: 14px;
`;

const HeaderDivision = styled(HeaderDivider)`
	display: flex;
	flex: 1 1 0%;
	place-content: center;
`;

const HeaderDivisionName = styled(HeaderDivider)`
	width: 30%;
`;

const Field = styled(TableField)`
	:first-child {
		width: 30%;
	}
`;

const Evaluations = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	const { register, handleSubmit, reset } = useForm();

	const onSubmit = (data) => {
		api.put(`/action/${id}/evaluation`, { evals: data }).then(() => {
			Notify.success("Avaliações submetidas!");
			navigate("/Admin/actions");
		});
	};

	const resetAsyncForm = useCallback(async () => {
		try {
			if (!id) return;

			api.get(`/action/${id}/evaluations`).then((result) => {
				reset(result.data.evals);
			});
		} catch (error) {}
	}, []);

	useEffect(() => {
		resetAsyncForm();
	}, [resetAsyncForm]);

	useEffect(() => {
		api.get(`/action/${id}/evaluationInfo`).then((result) => {
			setData(result.data);
			setLoading(false);
		});
	}, []);

	return (
		<>
			<Container>
				<ContainHeader>
					<FormLabel>Escala de avaliação: {data.evalScale}</FormLabel>
					<CancelButton to={"/Admin/actions"}>Cancelar</CancelButton>
				</ContainHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<SContainer>
						<Head>
							<HeaderDivisionName>Aluno</HeaderDivisionName>
							{data.evalCriteria?.map((header, index) => {
								return <HeaderDivision key={index}>{header}</HeaderDivision>;
							})}
						</Head>
						<table>
							{loading ? (
								<TableRow>
									<Field>A carregar...</Field>
								</TableRow>
							) : (
								data.students?.map((student) => {
									return (
										<TableRow key={student._id}>
											<Field>{student.name}</Field>
											{data.evalCriteria?.map((criteria) => {
												return (
													<Field>
														<Edit2
															type={"number"}
															{...register(`${student._id}.${criteria}`, {
																valueAsNumber: true,
															})}
														/>
													</Field>
												);
											})}
										</TableRow>
									);
								})
							)}
						</table>
					</SContainer>
					<SubmitButton type='submit' value='Confirmar' />
				</form>
			</Container>
		</>
	);
};

export default Evaluations;
