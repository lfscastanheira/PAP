import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import { api } from "../../../../api/api";
import { useRef } from "react";
import { Container } from "../../../../styles/AdminStyles";
import {
	HeaderDivider,
	ContainerHeader,
	HeaderDividerTitle,
	SubmitButton,
	CancelButton,
	Form,
} from "../../../../styles/FormsStyles";

const ModulesForm = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [tab, setTab] = useState(0);

	const clone = useRef(false);

	const nextTab = () => setTab((tab) => tab + 1);
	const previousTab = () => setTab((tab) => tab - 1);

	const resetAsyncForm = useCallback(async () => {
		if (!id) return;

		await api
			.get(`/module/${id}/isInCourse`)
			.then((result) => (clone.current = result.data));

		const result = await api.get(`/module/${id}`);
		methods.reset(result.data);
	}, []);

	useEffect(() => {
		resetAsyncForm();
	}, [resetAsyncForm]);

	const methods = useForm();

	const onSubmit = (data) => {
		console.log(clone.current);
		if (id) {
			if(clone.current){
				//mensagem de erro e redirect
				Notify.failure("Não é possível editar um módulo que está associado a um curso!");
				navigate("/Admin/modules");
			}else{
				api.put(`/module/${id}`, data).then(() => {
					Notify.success("Módulo editado!");
					navigate("/Admin/modules");
				});
			}
		} else {
			api.post("/module", data).then(() => {
				Notify.success("Módulo criado!");
				navigate("/Admin/modules");
			});
		}
	};

	return (
		<>
			<FormProvider {...methods}>
				<Container>
					<Form onSubmit={methods.handleSubmit(onSubmit)}>
						<ContainerHeader>
							<HeaderDivider>
								<CancelButton to={"/Admin/modules"}>Cancelar</CancelButton>
							</HeaderDivider>
							<HeaderDivider>
								<HeaderDividerTitle>
									{"Módulos"}
								</HeaderDividerTitle>
							</HeaderDivider>
							<HeaderDivider>
								<SubmitButton type='submit' value='Finalizar' />
							</HeaderDivider>
						</ContainerHeader>
						{tab === 0 ? (
							<FirstTab nextTab={nextTab} />
						) : (
							<SecondTab previousTab={previousTab} />
						)}
					</Form>
				</Container>
			</FormProvider>
		</>
	);
};

export default ModulesForm;
