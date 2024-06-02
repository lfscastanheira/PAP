import { useFormContext } from "react-hook-form";
import {
	SmallContainer,
	Form,
	FormHeader,
	FormLabel,
	EnabledPrevious,
	NavigationButton,
	FormHeaderDivider,
	Next,
	FileEdit,
	UploadIcon,
} from "../../../../styles/FormsTabsStyles";

const ForthTab = ({ previousTab }) => {
	const { register } = useFormContext();

	return (
		<>
			<SmallContainer>
				<FormHeader>
					<FormHeaderDivider>Documentos</FormHeaderDivider>
					<FormHeaderDivider>
						<NavigationButton onClick={previousTab}>
							<EnabledPrevious size={24} />
						</NavigationButton>
						<NavigationButton disabled={true}>
							<Next size={24} />
						</NavigationButton>
					</FormHeaderDivider>
				</FormHeader>
				<Form>
					<FormLabel>Documento de Identificação:</FormLabel>
					<FileEdit {...register("identification")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Curriculum Vitae (CV):</FormLabel>
					<FileEdit {...register("cv")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>CAP/CCP e Isenção ou Regime Excecional:</FormLabel>
					<FileEdit {...register("cap")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Certificado de Habilitações:</FormLabel>
					<FileEdit {...register("habilitationCertificate")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Declaração Situação Contributiva:</FormLabel>
					<FileEdit {...register("contributoryStatus")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Comprovativo de IBAN:</FormLabel>
					<FileEdit {...register("ibanf")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Ficha de Análise Curricular</FormLabel>
					<FileEdit {...register("curriculumAnalysis")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Relatório de Seleção:</FormLabel>
					<FileEdit {...register("selectionReport")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Declaração de não dívida à SS:</FormLabel>
					<FileEdit {...register("socialSecurityDeclarartion")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Declaração de não dívida às Finanças:</FormLabel>
					<FileEdit {...register("finance")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Cópia do Registo Criminal:</FormLabel>
					<FileEdit {...register("criminalRecord")} type='file' />
					<UploadIcon size={16} />

					<FormLabel>Declaração do Formador - Anexo 3:</FormLabel>
					<FileEdit {...register("formerDeclaration")} type='file' />
					<UploadIcon size={16} />
				</Form>
			</SmallContainer>
		</>
	);
};

export default ForthTab;
