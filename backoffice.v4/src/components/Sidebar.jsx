import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";
import {
	Archive,
	Settings,
	Users,
	Calendar,
	Coffee,
	Clipboard,
	Book,
	BookOpen,
	Paperclip,
	Shield,
	Image,
	Monitor,
	Menu,
	BarChart2
} from "react-feather";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {
	Div,
	SidebarContainer,
	SidebarLogoContainer,
	LogoButton,
	Logo,
	PageContainer,
	Page,
	Ref,
	SidebarFooter,
	Profile,
	Img,
	Buttons,
	Name,
	Logout,
	Accordion,
	MenuButton,
} from "./SidebarStyles";

const PageLink = ({ path, name, children }) => {
	return (
		<Ref to={path}>
			<Page>
				{children} {name}
			</Page>
		</Ref>
	);
};

const LogoSvg = () => {
	const theme = useTheme();

	return (
		<Logo xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 40'>
			<path
				fill={theme.colors.secundary}
				d='M38.531 19.707c0 1.66-.203 3.313-.61 4.918H19.267v-4.918h13.25c-.004-7.465-5.938-13.516-13.254-13.516-7.317.004-13.246 6.055-13.246 13.524.004 7.465 5.933 13.52 13.25 13.52v6.132C8.625 39.367 0 30.567 0 19.707 0 8.852 8.625.047 19.266.047c10.64 0 19.265 8.805 19.265 19.66Zm0 0'
			/>
			<path
				fill={theme.colors.secundary}
				d='M14.453 14.797h4.82v4.918h-4.82Zm0 0'
			/>
			<path
				fill='#333'
				d='M92.848 16.54v3.737c-2.075-2.586-5.172-4.09-8.442-4.097-6.39.03-11.562 5.308-11.597 11.828 0 6.383 5.242 11.941 11.597 11.941 3.406 0 6.406-1.664 8.442-4.207v3.625h3.41V16.54Zm-8.543 19.987c-4.532 0-7.938-3.996-7.938-8.52 0-4.616 3.406-8.405 7.938-8.405 4.422 0 8.347 3.789 8.347 8.406-.007 4.52-3.925 8.52-8.347 8.52ZM62.41 19.656a9.862 9.862 0 0 1 7.586-3.476v3.425c-3.965 0-7.578 2.493-7.578 7.16V39.38h-3.414V16.543h3.406ZM114.48 16.543h3.407v2.75c1.781-1.965 4.281-3.113 7.324-3.113 6.41 0 9.156 2.906 9.156 10.172v13.027h-3.41V26.352c0-4.516-2.031-6.747-5.746-6.747-4.527-.105-7.324 2.493-7.324 7.63v12.144h-3.407Zm0 0'
			/>
			<path
				fill={theme.colors.secundary}
				d='M141.184 16.543h3.558v22.84h-3.558ZM141.184 8.082h3.558v3.633h-3.558Zm0 0'
			/>
			<path
				fill='#333'
				d='M103.59 16.543h3.558v22.84h-3.558ZM103.59 8.082h3.558v3.633h-3.558Zm0 0'
			/>
			<path
				fill={theme.colors.secundary}
				d='M151.555 16.543V8.082h3.41v8.461h5.031v3.164h-5.031v19.672h-3.41Zm0 0'
			/>
			<path
				fill='#333'
				d='M45.98 16.543V8.082h3.407v8.461h5.035v3.164h-5.035v19.672H45.98ZM29.488 36.215h8.442v3.164h-8.442Zm0 0'
			/>
		</Logo>
	);
};

const Sidebar = () => {
	const navigate = useNavigate();

	const { user } = useContext(AuthContext);

	const logout = () => {
		localStorage.removeItem("user");
		navigate("/");
		window.location.reload();
	};

	const [pedagogyOpen, setPedagogyOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [DivOpen, setDivOpen] = useState(false);

	return (
		<Div open={DivOpen}>
			<SidebarContainer open={DivOpen}>
				<MenuButton onClick={() => setDivOpen(!DivOpen)}>
					<Menu size={24} />
				</MenuButton>
				<SidebarLogoContainer open={DivOpen}>
					<LogoButton href='/home'>
						<LogoSvg />
					</LogoButton>
				</SidebarLogoContainer>
				<PageContainer open={DivOpen}>
					<Page onClick={() => setPedagogyOpen(!pedagogyOpen)}>
						<Archive size={16} />
						Gestão Pedagógica
					</Page>
					<Accordion open={pedagogyOpen}>
						<PageLink key='Formandos' path='/Admin/students' name='Formandos'>
							<Users size={14} />
						</PageLink>
						<PageLink key='Formadores' path='/Admin/teachers' name='Formadores'>
							<Coffee size={14} />
						</PageLink>

						<PageLink key='Módulos' path='/Admin/modules' name='Módulos'>
							<Book size={14} />
						</PageLink>

						<PageLink key='Cursos' path='/Admin/courses' name='Cursos'>
							<BookOpen size={14} />
						</PageLink>

						<PageLink
							key='Ações de formação'
							path='/Admin/actions'
							name='Ações de formação'
						>
							<Clipboard size={14} />
						</PageLink>

						<PageLink
							key='Calendarização'
							path='/Admin/calendar'
							name='Calendarização'
						>
							<Calendar size={14} />
						</PageLink>
					</Accordion>
					<Page onClick={() => setSettingsOpen(!settingsOpen)}>
						<Settings size={16} />
						Configurações
					</Page>
					<Accordion open={settingsOpen}>
						<PageLink key='Geral' path='/config/general' name='Geral'>
							<BarChart2 size={14} />
						</PageLink>
						<PageLink key='Admin' path='/config/admin' name='Admin'>
							<Shield size={14} />
						</PageLink>
						<PageLink key='Salas' path='/config/rooms' name='Salas'>
							<Monitor size={14} />
						</PageLink>
						<PageLink key='Design' path='/config/design' name='Design'>
							<Image size={14} />
						</PageLink>
					</Accordion>
				</PageContainer>
				<SidebarFooter open={DivOpen}>
					<Profile path='' name=''>
						<Img src='logo.png' />
						<Buttons>
							<Name>{user.username || "Guest"}</Name>
							<Logout onClick={logout}>Terminar sessão</Logout>
						</Buttons>
					</Profile>
				</SidebarFooter>
			</SidebarContainer>
		</Div>
	);
};

export default Sidebar;
