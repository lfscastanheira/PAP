import { useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { api } from "../../../../api/api";
import { nova } from "../../../../api/nova";
import { calendario } from "../../../../api/calendario";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import FirstTab from "./FirstTab";

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

  const [professores, setProfessores] = useState([]);

  useEffect(() => {
    nova.get("/getResources/").then((response) => {
      setProfessores(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(professores);
  }, [professores]);

  const location = useLocation();
  const teste = location.hash.split("?")[1];
  let idEvento;
  teste ? idEvento = teste.split("=")[1] : idEvento = null;

  console.log(idEvento);

  const infoEvento = async (id) => {
    const response = await calendario.get(`/api/evento/eventoId/${id}`);
	console.log(response.data)
    return response.data;
  };

  let info = null;
  if (idEvento !== null) {
    infoEvento(idEvento).then((data) => {
      info = data;

      console.log(info.title);
    });
  }

  useState(() => {
	const informacoesEvento = info
	console.log(informacoesEvento)
  }, [info]);

  const resetAsyncForm = useCallback(async () => {
    try {
      if (!id) return;

      await nova.get(`/getResources`).then((result) => console.log(result));
    } catch (error) {}
  }, []);

  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm]);

  const onSubmit = (data) => { 
    
    

    data["modules"] = modulesFields.map((field) => field._id); 
    data["evalCriteria"] = evalFields.map((field) => field.name);
    data.duration.monitoringTime = duration;

    // if (id && !clone.current) {
    // 	api.put(`/course/${id}`, data).then(() => {
    // 		Notify.success("Curso editado!");
    // 		navigate("/Admin/courses");
    // 	});
    // } else {
    // 	api.post("/course", data).then(() => {
    // 		Notify.success("Curso criado!");
    // 		navigate("/Admin/courses");
    // 	});
    // }
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
  }); // q: o que faz?
  

  return (
    <>
      <Container>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            <ContainerHeader>
              <HeaderDivider>
                <CancelButton to={"/Admin/calendar"}>Cancelar</CancelButton>
              </HeaderDivider>
              <HeaderDivider>
                <HeaderDividerTitle>
                  {info !== null
                    ? "Sessões - editar " + info.title
                    : "Criar sessão"}
                </HeaderDividerTitle>
              </HeaderDivider>
              <HeaderDivider>
                <SubmitButton type="submit" value="Finalizar" />
              </HeaderDivider>
            </ContainerHeader>
            <FirstTab />
          </Form>
        </FormProvider>
      </Container>
    </>
  );
};

export default StudentsForm;
