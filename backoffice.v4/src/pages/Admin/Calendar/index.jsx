
import styled from "styled-components";
import React, { useState, useRef, useEffect } from "react";
import ReactAsync from "react-select/async";
import "./CalendarStyles.css";
import {
	
	ContainerHeader,
	SmallContainer,
	Header,
	TableIconContainer,
	TableRow,
	Search,
	Edit,
	Add,
	EditIcon,
	HeaderDivider,
	TableField,
} from "../../../styles/AdminStyles";
import { api } from "../../../api/api";
import { calendario } from "../../../api/calendario";
import { Notify } from "notiflix";

export default function Index() {
  
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [key, setKey] = useState(0);
  const [teacherParam, setTeacherParam] = useState("all")
  const [selectedValue, setSelectedValue] = useState(null);


  

  useEffect(() => {
    
    api.get('/teachers')
      .then(response => {
        const teacherData = response.data.map(teacher => ({
          label: teacher.name,
          value: teacher._id,
        }));
        console.log(teacherData);
        setTeachers(teacherData);
        setTeachers([{ label: 'Todos os professores', value: 'all' }, ...teacherData]);
      })
      .catch(error => {
        Notify.failure("Erro ao buscar os professores");
      });
  }, []); 

  const handleTeacherChange = selectedOption => {
    setSelectedTeacher(selectedOption);
  };
  
  
  
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    padding: 1rem;
    height: 100%;
    overflow-y: auto;
  `;

  const Select = styled(ReactAsync)`
    width: 50%;
    margin-bottom: 2rem;
    .css-13cymwt-control,
    .css-t3ipsp-control {
      border: 2px solid ${(props) => props.theme.colors.background};
      border-radius: 0.5rem;
    }
    .css-13cymwt-control:hover,
    .css-t3ipsp-control:hover {
      border-color: ${(props) => props.theme.colors.secundary};
      cursor: pointer;
    }
    .css-t3ipsp-control {
      box-shadow: none;
    }
  `;

  const styles = {
    wrap: {
      display: "flex",
    },
    left: {
      marginRight: "10px",
    },
    main: {
      flexGrow: "1",
    },
  };
  
  const handleChange = selectedOption => {
    setSelectedTeacher(selectedOption);
  };
  const filterColors = (inputValue) => {
		return teachers.filter((i) =>
			i.label.toLowerCase().includes(inputValue.toLowerCase())
		);
	};

	const loadOptions = (inputValue, callback) => {
		setTimeout(() => {
			callback(filterColors(inputValue));
		}, 500);
	};

  useEffect(() => {
    
    setTeacherParam(selectedTeacher ? (selectedTeacher.value || "all") : "all");
    
  }, [selectedTeacher]) 
  window.addEventListener("message", (event) => {
    if(event.data.type === "dC"){
      console.log("type: dateClick")
      console.log(event.data.info)
      

    } else if (event.data.type === "eC"){
      console.log("type: eventClick")
      console.log(event.data.info)
      window.location.href = "#/Admin/calendar/form?id=" + event.data.info.id;

    }
  });
  return (
    <>
      <Container>
        <div className="cHeader">
        {teachers.length > 0 && ( // Verifica se há dados nos professores
          <Select
            loadOptions={loadOptions}
            value={teachers.find(teacher => teacher.value === teacherParam)}
            defaultOptions
            onChange={handleChange}
            placeholder="Escolha um formador"
          />
        )}
          
        </div>
        
        <div className="calendario">
          <iframe
            src={'http://localhost:3006/calendario?professorId=' + teacherParam  }
            frameborder="0"
            height="700px"
            width="100%"
            
          ></iframe>
        </div>
      </Container>
    </>
  );
}
