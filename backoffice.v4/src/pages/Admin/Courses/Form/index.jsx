import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { api } from "../../../../api/api";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ThirdTab from "./ThirdTab";
import ForthTab from "./ForthTab";
import { useCallback } from "react";
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
	const [duration, setDuration] = useState(0);

	const nextTab = () => setTab((tab) => tab + 1);
	const previousTab = () => setTab((tab) => tab - 1);

	const methods = useForm();
	const { control } = useForm();

	const clone = useRef(false);

	const resetAsyncForm = useCallback(async () => {
		try {
			if (!id) return;

			await api
				.get(`/course/${id}/isInAction`)
				.then((result) => (clone.current = result.data));

			const result = await api.get(`/course/${id}`);
			result.data["evalCriteria"].forEach((data) => {
				evalAppend({ name: data });
			});
			methods.reset(result.data);
		} catch (error) {}
	}, []);

	useEffect(() => {
		resetAsyncForm();
	}, [resetAsyncForm]);

	const onSubmit = (data) => {
		data["modules"] = modulesFields.map((field) => field._id);
		data["evalCriteria"] = evalFields.map((field) => field.name);
		data.duration.monitoringTime = duration;

		if (id && !clone.current) {
			api.put(`/course/${id}`, data).then(() => {
				Notify.success("Curso editado!");
				navigate("/Admin/courses");
			});
		} else {
			api.post("/course", data).then(() => {
				Notify.success("Curso criado!");
				navigate("/Admin/courses");
			});
		}
	};

	const {
		fields: modulesFields,
		append: modulesAppend,
		remove: modulesRemove,
	} = useFieldArray({
		control,
		name: "modules",
	});

	const {
		fields: evalFields,
		append: evalAppend,
		remove: evalRemove,
	} = useFieldArray({
		control,
		name: "evalCriteria",
	});

	return (
		<>
			<Container>
				<FormProvider {...methods}>
					<Form onSubmit={methods.handleSubmit(onSubmit)}>
						<ContainerHeader>
							<HeaderDivider>
								<CancelButton to={"/Admin/courses"}>Cancelar</CancelButton>
							</HeaderDivider>
							<HeaderDivider>
								<HeaderDividerTitle>
									{clone.current ? "Cursos - editar como cópia" : "Cursos"}
								</HeaderDividerTitle>
							</HeaderDivider>
							<HeaderDivider>
								<SubmitButton type='submit' value='Finalizar' />
							</HeaderDivider>
						</ContainerHeader>
						{tab === 0 ? (
							<FirstTab nextTab={nextTab} />
						) : tab === 1 ? (
							<SecondTab
								previousTab={previousTab}
								nextTab={nextTab}
								duration={duration}
							/>
						) : tab === 2 ? (
							<ThirdTab
								previousTab={previousTab}
								nextTab={nextTab}
								resetModules={methods.getValues("modules")}
								fields={modulesFields}
								append={modulesAppend}
								remove={modulesRemove}
								duration={duration}
								setDuration={setDuration}
							/>
						) : (
							<ForthTab
								previousTab={previousTab}
								fields={evalFields}
								append={evalAppend}
								remove={evalRemove}
							/>
						)}
					</Form>
				</FormProvider>
			</Container>
		</>
	);
};

export default StudentsForm;
