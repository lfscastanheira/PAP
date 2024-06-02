import styled from "styled-components";
import { useFormContext, Controller } from "react-hook-form";
import {
  areaOfFormation,
  evalScale,
  levels,
  literaryQualifications,
  professionalQualifications,
} from "../../../../selectData.json";
import {
  Selects,
  SmallContainer,
  Form,
  FormHeader,
  Previous,
  Edit,
  FormLabel,
  FormLabelInvisible,
  NavigationButton,
  FormHeaderDivider,
  EnabledNext,
} from "../../../../styles/FormsTabsStyles";


const Select = styled(Selects)`
  grid-column: span 3;
`;

const BigSelect = styled(Select)`
  grid-column: span 8;
`;

const InvisibleFormLabel = styled(FormLabelInvisible)`
  grid-column: span 1;
`;

const BigEdit = styled(Edit)`
  grid-column: span 11;
`;

const MediumEdit = styled(Edit)`
  grid-column: span 3;
`;

const MiniEdit = styled(Edit)`
  grid-column: span 2;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  height: 22px;
  border: 2px solid ${(props) => props.theme.colors.background};
  border-radius: 0.5rem;

  width: 100%;
  /* Adicione outros estilos conforme necessário para se alinhar com seu design */
`;

const TimeInput = styled.input`
  padding: 0.5rem;
  height: 22px;
  border: 2px solid ${(props) => props.theme.colors.background};
  border-radius: 0.5rem;

  width: 100%;
  /* Adicione outros estilos conforme necessário para se alinhar com seu design */
`;

const FirstTab = ({ nextTab }) => {
  const { register, control } = useFormContext();

  return (
    <>
      <SmallContainer>
        <FormHeader>
          <FormHeaderDivider>Definições Básicas</FormHeaderDivider>
          <FormHeaderDivider>
            <NavigationButton disabled={true}>
              <Previous size={24} />
            </NavigationButton>
            <NavigationButton onClick={nextTab}>
              <EnabledNext size={24} />
            </NavigationButton>
          </FormHeaderDivider>
        </FormHeader>

        <Form>
          <FormLabel>Titulo da sessão:</FormLabel>
          <BigEdit
            {...register("name")}
            required
            placeholder="Nome da sessão"
          />

          <FormLabel>Inicio da sessão:</FormLabel>
          <DateInput
            {...register("startDay")}
            type="date"
            required
            placeholder="Data de início"
          />
          <TimeInput
            {...register("startTime")}
            type="time"
            required
            placeholder="Hora de início"
          />
          <InvisibleFormLabel />
          <FormLabel>Fim da sessão:</FormLabel>
          <DateInput
            {...register("startDay")}
            type="date"
            required
            placeholder="Data de início"
          />
          <TimeInput
            {...register("startTime")}
            type="time"
            required
            placeholder="Hora de início"
          />
          <InvisibleFormLabel />

          <FormLabel>Curso:</FormLabel>
          <Controller
            control={control}
            defaultValue=""
            name="evalScale"
            render={({ field }) => (
              <Select
                options={evalScale}
                value={evalScale.find((val) => val.value === field.value)}
                onChange={(val) => field.onChange(val.value)}
                isSearchable={false}
                isClearable
              />
            )}
          />

          <FormLabel>Módulo:</FormLabel>
          <Controller
            control={control}
            defaultValue=""
            name="startLevel"
            render={({ field }) => (
              <Select
                options={levels}
                value={levels.find((val) => val.value === field.value)}
                onChange={(val) => field.onChange(val.value)}
                isSearchable={false}
                isClearable
              />
            )}
          />

          <FormLabel>Formador:</FormLabel>
          <Controller
            control={control}
            defaultValue=""
            name="finalLevel"
            render={({ field }) => (
              <Select
                options={levels}
                value={levels.find((val) => val.value === field.value)}
                onChange={(val) => field.onChange(val.value)}
                isSearchable={false}
                isClearable
              />
            )}
          />

          <FormLabel>Recorrências:</FormLabel>
          <MediumEdit
            {...register("recurrency", { valueAsNumber: true })}
            required
          />
        </Form>
      </SmallContainer>
    </>
  );
};

export default FirstTab;
