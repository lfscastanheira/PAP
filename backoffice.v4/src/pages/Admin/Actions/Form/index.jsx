import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { api } from "../../../../api/api";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ThirdTab from "./ThirdTab";
import ForthTab from "./ForthTab";
import FifthTab from "./FifthTab";
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

const ActionsForm = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [tab, setTab] = useState(0);
	const [course, setCourse] = useState({});

	const nextTab = () => setTab((tab) => tab + 1);
	const previousTab = () => setTab((tab) => tab - 1);

	const methods = useForm();
	const { control } = useForm();

	const onSubmit = (data) => {
		data["modulesId"] = modulesFields.map((field) => field._id);
		data["students"] = studentFields.map((field) => field._id);
		data["teachersId"] = teacherFields.map((field) => field._id);

		api.post("/action", data).then(() => {
			Notify.success("Ação de formação criada!");
			navigate("/Admin/actions");
		});
	};

	const resetAsyncForm = useCallback(async () => {
		if (!id) return;

		const result = await api.get(`/action/${id}`);
		methods.reset(result.data);
	}, []);

	useEffect(() => {
		resetAsyncForm();
	}, [resetAsyncForm]);

	const resetModules = async (option) => {
		modulesFields.forEach((field) => modulesRemove(field));
		studentFields.forEach((field) => studentRemove(field));
		teacherFields.forEach((field) => teacherRemove(field));

		api.get(`/course/${option._id}`).then((result) => {
			methods.setValue("courseId", option._id);
			setCourse(result.data);
		});
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
		fields: studentFields,
		append: studentAppend,
		remove: studentRemove,
	} = useFieldArray({
		control,
		name: "student",
	});

	const {
		fields: teacherFields,
		append: teacherAppend,
		remove: teacherRemove,
	} = useFieldArray({
		control,
		name: "teacher",
	});

	return (
		<>
			<Container>
				<FormProvider {...methods}>
					<Form onSubmit={methods.handleSubmit(onSubmit)}>
						<ContainerHeader>
							<HeaderDivider>
								<CancelButton to={"/Admin/actions"}>Cancelar</CancelButton>
							</HeaderDivider>
							<HeaderDivider>
								<HeaderDividerTitle>Ações de Formação</HeaderDividerTitle>
							</HeaderDivider>
							<HeaderDivider>
								<SubmitButton type='submit' value='Finalizar' />
							</HeaderDivider>
						</ContainerHeader>
						{tab === 0 ? (
							<FirstTab
								nextTab={nextTab}
								resetModules={resetModules}
								courseName={course.name}
							/>
						) : tab === 1 ? (
							<SecondTab
								previousTab={previousTab}
								nextTab={nextTab}
								course={course}
							/>
						) : tab === 2 ? (
							<ThirdTab
								previousTab={previousTab}
								nextTab={nextTab}
								courseModules={methods.getValues("modules")}
								fields={modulesFields}
								append={modulesAppend}
								remove={modulesRemove}
							/>
						) : tab === 3 ? (
							<ForthTab
								previousTab={previousTab}
								nextTab={nextTab}
								courseModules={methods.getValues("students")}
								fields={studentFields}
								append={studentAppend}
								remove={studentRemove}
							/>
						) : (
							<FifthTab
								previousTab={previousTab}
								courseModules={methods.getValues("teachers")}
								fields={teacherFields}
								append={teacherAppend}
								remove={teacherRemove}
							/>
						)}
					</Form>
				</FormProvider>
			</Container>
		</>
	);
};

export default ActionsForm;
