import { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { api, filesApi } from "../../../../api/api";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ThirdTab from "./ThirdTab";
import { useEffect } from "react";
import { Container } from "../../../../styles/AdminStyles";
import {
	HeaderDivider,
	ContainerHeader,
	HeaderDividerTitle,
	SubmitButton,
	CancelButton,
	Form,
} from "../../../../styles/FormsStyles";

const StudentsForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [tab, setTab] = useState(0);

	const fileNames = [
		"identification",
		"cv",
		"ibanf",
		"drivingCertificate",
		"employerDeclaration",
		"proofAddress",
		"withdrawal",
	];

	const nextTab = () => setTab((tab) => tab + 1);
	const previousTab = () => setTab((tab) => tab - 1);

	const resetAsyncForm = useCallback(async () => {
		if (!id) return;

		const result = await api.get(`/student/${id}`);
		methods.reset(result.data);
		const files = result.data.files || [];
	}, []);

	useEffect(() => {
		resetAsyncForm();
	}, [resetAsyncForm]);

	const methods = useForm();

	const onSubmit = async (data) => {
		let files = {};
		fileNames.forEach((fileName) => {
			if (methods.getValues(fileName) !== undefined)
				files[fileName] = methods.getValues(fileName)[0];
		});
	
		try {
			if (id) {
				await api.put(`/student/${id}`, data);
				await filesApi.patch(`/student/${id}/files`, files);
				Notify.success("Formando editado!");
			} else {
				await api.post("/student", data).then(async (result) => {
					await filesApi.patch(`/student/${result.data.insertedId}/files`, files);
				});
	
				Notify.success("Formando criado!");
			}
			navigate("/Admin/students");
		} catch (error) {
			Notify.failure("Erro ao criar formando!");
		}
	};

	return (
		<>
			<Container>
				<FormProvider {...methods}>
					<Form onSubmit={methods.handleSubmit(onSubmit)}>
						<ContainerHeader>
							<HeaderDivider>
								<CancelButton to={"/Admin/students"}>Cancelar</CancelButton>
							</HeaderDivider>
							<HeaderDivider>
								<HeaderDividerTitle>Formandos</HeaderDividerTitle>
							</HeaderDivider>
							<HeaderDivider>
								<SubmitButton type='submit' value='Finalizar' />
							</HeaderDivider>
						</ContainerHeader>
						{tab === 0 ? (
							<FirstTab nextTab={nextTab} />
						) : tab === 1 ? (
							<SecondTab previousTab={previousTab} nextTab={nextTab} />
						) : (
							<ThirdTab previousTab={previousTab} />
						)}
					</Form>
				</FormProvider>
			</Container>
		</>
	);
};

export default StudentsForm;
