import React, { useContext } from "react";
import styled from "styled-components";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import DynamicThemeProvider from "./contexts/DynamicThemeProvider";
import AuthProvider, { AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Search from "./pages/Search";
import Page404 from "./pages/Page404";

import Evaluations from "./pages/Admin/Evaluations";

import Students from "./pages/Admin/Students";
import StudentsForm from "./pages/Admin/Students/Form";

import AdminModules from "./pages/Admin/Modules";
import ModulesForm from "./pages/Admin/Modules/Form";

import Teachers from "./pages/Admin/Teachers";
import TeachersForm from "./pages/Admin/Teachers/Form";

import Courses from "./pages/Admin/Courses";
import CoursesForm from "./pages/Admin/Courses/Form";

import Actions from "./pages/Admin/Actions";
import ActionsForm from "./pages/Admin/Actions/Form";

import AdminCalendar from "./pages/Admin/Calendar";
import CalendarForm from "./pages/Admin/Calendar/Form";

import ConfigGeneral from "./pages/Config/General";
import ConfigAdmin from "./pages/Config/Admin";

import ConfigRooms from "./pages/Config/Rooms";
import ConfigRoomsForm from "./pages/Config/Rooms/Form";

import ConfigDesign from "./pages/Config/Design";

const Container = styled.div`
	background-color: ${(props) => props.theme.colors.background};
	margin-left: 17%;
	height: calc(100vh - 5rem);
	padding: 0 1rem 1rem 1rem;
	display: flex;
	flex-direction: column;
	@media screen and (max-width: 415px) {
		margin-left: 0;
	}
`;

const AuthWrapper = ({ authOnly, name }) => {
	const location = useLocation();
	const { isAuth } = useContext(AuthContext);

	return authOnly && !isAuth ? (
		<Navigate to='/' replace state={{ from: location }} />
	) : (
		<>
			<Sidebar />
			<Topbar name={name} />
			<Container>
				<Outlet />
			</Container>
		</>
	);
};

const App = () => {
	const routes = [
		{ path: "/home", element: <Home />, authOnly: false },
		{
			path: "/Admin/evaluations/:id",
			element: <Evaluations />,
			authOnly: false,
		},
		{
			name: "Formandos",
			path: "/Admin/students",
			element: <Students />,
			authOnly: false,
		},
		{
			name: "Formandos",
			path: "/Admin/students/form/:id?",
			element: <StudentsForm />,
			authOnly: false,
		},

		{
			name: "Formadores",
			path: "/Admin/teachers",
			element: <Teachers />,
			authOnly: false,
		},
		{
			name: "Formadores",
			path: "/Admin/teachers/form/:id?",
			element: <TeachersForm />,
			authOnly: false,
		},
		{
			name: "Cursos",
			path: "/Admin/courses",
			element: <Courses />,
			authOnly: false,
		},
		{
			name: "Cursos",
			path: "/Admin/courses/form/:id?",
			element: <CoursesForm />,
			authOnly: false,
		},

		{
			name: "Ações de Formação",
			path: "/Admin/actions",
			element: <Actions />,
			authOnly: false,
		},
		{
			name: "Ações de Formação",
			path: "/Admin/actions/form/:id?",
			element: <ActionsForm />,
			authOnly: false,
		},

		{
			name: "Módulos",
			path: "/Admin/modules",
			element: <AdminModules />,
			authOnly: false,
		},
		{
			name: "Módulos",
			path: "/Admin/modules/form/:id?",
			element: <ModulesForm />,
			authOnly: false,
		},
		{ path: "/search/:query?", element: <Search />, authOnly: false },
		{
			name: "Calendarização",
			path: "/Admin/calendar",
			element: <AdminCalendar />,
			authOnly: false,
		},
		{
			name: "Calendarização",
			path: "/Admin/calendar/form",
			element: <CalendarForm />,
			authOnly: false,
		},
		{
			name: "Geral",
			path: "/config/general",
			element: <ConfigGeneral />,
			authOnly: false,
		},
		{
			name: "Admin",
			path: "/config/admin",
			element: <ConfigAdmin />,
			authOnly: false,
		},
		{
			name: "Design",
			path: "/config/design",
			element: <ConfigDesign />,
			authOnly: false,
		},
		{
			name: "Salas",
			path: "/config/rooms",
			element: <ConfigRooms />,
			authOnly: false,
		},
		{
			path: "/config/rooms/form/:id?",
			element: <ConfigRoomsForm />,
			authOnly: false,
		},
	];
	return (
		<>
			<AuthProvider>
				<DynamicThemeProvider>
					<Routes>
						<Route index element={<Login />} />
						{routes.map((route) => {
							return (
								<Route
									key={route.path}
									element={
										<AuthWrapper authOnly={route.authOnly} name={route.name} />
									}
								>
									<Route
										path={route.path}
										element={route.element}
										name={route.name}
									/>
								</Route>
							);
						})}
						<Route path='*' element={<Page404 />}></Route>
					</Routes>
				</DynamicThemeProvider>
			</AuthProvider>
		</>
	);
};

export default App;