import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { api, filesApi } from "../../../../api/api";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ThirdTab from "./ThirdTab";
import ForthTab from "./ForthTab";
import { Container } from "../../../../styles/AdminStyles";
import {
	HeaderDivider,
	ContainerHeader,
	HeaderDividerTitle,
	SubmitButton,
	CancelButton,
	Form,
} from "../../../../styles/FormsStyles";

const TeachersForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [tab, setTab] = useState(0);

	const nextTab = () => setTab((tab) => tab + 1);
	const previousTab = () => setTab((tab) => tab - 1);

	const resetAsyncForm = useCallback(async () => {
		if (!id) return;

		const result = await api.get(`/teacher/${id}`);
		methods.reset(result.data);
	}, []);

	const fileNames = [
		"identification",
		"cv",
		"ibanf",
		"cap",
		"contributoryStatus",
		"curriculumAnalysis",
		"socialSecurityDeclarartion",
		"criminalRecord",
		"habilitationCertificate",
		"selectionReport",
		"finance",
		"formerDeclaration",
	];

	useEffect(() => {
		resetAsyncForm();
	}, [resetAsyncForm]);

	const methods = useForm();

	const onSubmit = async (data) => {
		
		let files = {};
		fileNames.map((fileName) => {
			if (methods.getValues(fileName) !== undefined)
				files[fileName] = methods.getValues(fileName)[0];
		});

		if (id) {
			await api.put(`/teacher/${id}`, data);
			await filesApi.patch(`/teacher/${id}/files`, files);
			Notify.success("Formador Editado!");
			navigate("/Admin/teachers");
		} else {
			const id = await api.post("/teacher", data).then((result) => {
				return result.data.insertedId;
			});
			await filesApi.patch(`/teacher/${id}/files`, files);
			Notify.success("Formador criado!");
			navigate("/Admin/teachers");
		}

	};
	return (
		<>
			<Container>
				<FormProvider {...methods}>
					<Form onSubmit={methods.handleSubmit(onSubmit)}>
						<ContainerHeader>
							<HeaderDivider>
								<CancelButton to={"/Admin/teachers"}>Cancelar</CancelButton>
							</HeaderDivider>
							<HeaderDivider>
								<HeaderDividerTitle>Formadores</HeaderDividerTitle>
							</HeaderDivider>
							<HeaderDivider>
								<SubmitButton type='submit' value='Finalizar' />
							</HeaderDivider>
						</ContainerHeader>
						{tab === 0 ? (
							<FirstTab nextTab={nextTab} />
						) : tab === 1 ? (
							<SecondTab previousTab={previousTab} nextTab={nextTab} />
						) : tab === 2 ? (
							<ThirdTab previousTab={previousTab} nextTab={nextTab} />
						) : (
							<ForthTab previousTab={previousTab} />
						)}
					</Form>
				</FormProvider>
			</Container>
		</>
	);
};

export default TeachersForm;
