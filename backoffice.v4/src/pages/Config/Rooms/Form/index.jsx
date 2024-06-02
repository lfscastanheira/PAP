import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { api } from "../../../../api/api";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import FirstTab from "./FirstTab";
import { Container } from "../../../../styles/AdminStyles";
import {
	Form,
	HeaderDivider,
	HeaderDividerTitle,
	ContainerHeader,
	CancelButton,
	SubmitButton,
} from "../../../../styles/FormsStyles";

const RoomsForm = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const resetAsyncForm = useCallback(async () => {
		if (!id) return;

		const result = await api.get(`/room/${id}`);
		methods.reset(result.data);
	}, []);

	useEffect(() => {
		resetAsyncForm();
	}, [resetAsyncForm]);

	const methods = useForm();

	const onSubmit = (data) => {
		if (id) {
			api.put(`/room/${id}`, data).then(() => {
				Notify.success("Sala editada!");
				navigate("/config/rooms");
			});
		} else {
			api.post("/room", data).then(() => {
				Notify.success("Sala criada!");
				navigate("/config/rooms");
			});
		}
	};

	return (
		<>
			<Container>
				<FormProvider {...methods}>
					<Form onSubmit={methods.handleSubmit(onSubmit)}>
						<ContainerHeader>
							<HeaderDivider>
								<CancelButton to={"/config/rooms"}>Cancelar</CancelButton>
							</HeaderDivider>
							<HeaderDivider>
								<HeaderDividerTitle>Salas</HeaderDividerTitle>
							</HeaderDivider>
							<HeaderDivider>
								<SubmitButton type='submit' value='Finalizar' />
							</HeaderDivider>
						</ContainerHeader>

						<FirstTab />
					</Form>
				</FormProvider>
			</Container>
		</>
	);
};

export default RoomsForm;
