import React, { useEffect, useState, useRef } from 'react';
import Calendar from '@event-calendar/core';
import TimeGrid from '@event-calendar/time-grid';
import Interaction from '@event-calendar/interaction';
import DayGrid from '@event-calendar/day-grid';
import List from '@event-calendar/list';
import '@event-calendar/core/index.css';
import { calendarConfig, handleDateClick } from './calendar-configs-functions';
import Popup from '../popup/Popup';
import './calendar.css';
import { useNavigate } from 'react-router-dom';
import { getEventos, updateEventColor } from '../../services/api';
import Swal from 'sweetalert2';
import { vermelho, verde } from '../../configs/configs'


const Calendario = (idProfessor) => {
  
  const [popupOptions, setPopupOptions] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [backendData, setBackendData] = useState([]);
  const [calendarInitialized, setCalendarInitialized] = useState(false);
  const navigate = useNavigate();
  const calendarRef = useRef(null);

  const [loading, setLoading] = useState(true);


  function verificarEventosParaAtualizacao() {
    const eventosParaAtualizar = backendData.filter((evento) => {
      const dataFinal = new Date(evento.end).getTime();
      const agora = new Date().getTime();
      return dataFinal < agora && evento.extendedProps.sumario.trim() === '';
    });
  
    eventosParaAtualizar.forEach(async (evento) => {
      try {
        // Atualiza a cor do evento na base de dados via chamada à API
        let cor = vermelho
        await updateEventColor(evento.id, cor);
        console.log(`Cor do evento ${evento.id} atualizada.`);
      } catch (error) {
        
        console.error(`Erro ao atualizar a cor do evento ${evento.id}:`, error);
      }
    });
  }
  
  

  

  let contErros = 0;
  useEffect(() => {
    async function fetchEvents() {
      try {
        const events = await getEventos(idProfessor.idProfessor);
  
        const renamedEvents = events.map((event) => {
          event.id = event._id;
          delete event._id;
          
          return event;
        });
  
        if (renamedEvents.length === 0) {
          if (contErros !== 1) {
            Swal.fire({
              icon: 'error',
              title: 'Nenhum evento encontrado para o professor associado.',
              showConfirmButton: false,
              timer: 1500,
            });
          }
          contErros += 1;
        }
  
        setLoading(false);
        setBackendData(renamedEvents);
        //createCalendar()
      } catch (error) {
        console.error('Erro ao buscar eventos do backend:', error);
      }
    }
  
    fetchEvents();
  }, []);
  
  

  useEffect(() => {
    const agora = new Date().getTime();

    console.log(backendData)
    for(let i = 0; i < backendData.length; i++){
      const dataFinal = new Date(backendData[i].end).getTime();

      
    }
    if (!calendarInitialized && backendData.length > 0) {
      createCalendar();
    } else if (calendarInitialized) {
      calendarRef.current.destroy();
      createCalendar();
    }
  }, [backendData]);

  const createCalendar = () => {
    calendarRef.current = new Calendar({
      target: document.getElementById('ec'),
      props: {
        plugins: [TimeGrid, Interaction, DayGrid, List],
        options: {
          ...calendarConfig,
          events: backendData,
          dateClick: (info) => {
            handleDateClick(info, setPopupOptions, setShowPopup);
          },
          eventClick: (info) => {
            
            let tempId = info.event.id
            if(!(tempId.includes("generated"))){
              navigate('../../Evento?id=' + info.event.id);
            }
          },
        },
      },
    });

    setCalendarInitialized(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const updateEvents = async () => {
    try {
      const events = await getEventos("all");
      
      setBackendData(events);
    } catch (error) {
      console.error('Erro ao buscar eventos do backend:', error);
    }
  };

  return (
    <>
      {loading ? ( 
        <div className='divDoLoader'>
          <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
      ) : (
        <div className="calendar">
          <div className="ec" id="ec"></div>
        </div>
      )}
      {showPopup && <Popup popupOptions={popupOptions} onClose={handleClosePopup} updateEvents={updateEvents} />}
    </>
  );
};

export default Calendario;
