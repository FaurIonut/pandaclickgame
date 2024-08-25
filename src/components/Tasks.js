
import React, { useContext, useEffect, useState } from 'react';
import './Tasks.css';
import DailyRewardsModal from './DailyRewardsModal';
import axios from 'axios';
import ResourceContext from './context/ResourceContext';
import Notify from './Notify';
import { set } from 'mongoose';

const Tasks = () => {
  const [dailyRewards,setDailyRewards] = useState([]);
  const [taskss, setTask] = useState([]);
  const {tasks,resources,dailyReward,loading,setTasks,setResources,initData} = useContext(ResourceContext);
  const [timer, setTimer] = useState("00:00:00");
  const [id,setId]=useState(null)
  const [message,setMessage]=useState('')
  const [show,setShow]=useState(false)






  useEffect(() => {
    if(!loading){
      setTask(tasks);
      setDailyRewards(dailyReward);
      const currTime= new Date();
      let diff=0;
      for(let i=0; i < dailyReward.length; i++){
        diff=new Date(dailyReward[i].time)-currTime;
        if(!dailyReward[i].claimed){
          setId(dailyReward[i]._id);

          if(diff<0){
            diff=0;
          }
          setInterval(() => {
            diff-=1000;
            setTimer(new Date(diff).toISOString().substr(11, 8));
          }, 1000);

          break;
        }
      }
  }},[loading])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskCompletion = (id) => {
    setTasks(taskss.map(task =>
      task._id === id ? { ...task, completed: true } : task
    ));
    setTask(taskss.map(task =>
      task._id === id ? { ...task, completed: true } : task
    ));
    setResources({...resources,tokens:resources.tokens+taskss.find(task => task._id === id).reward});
    // setShow(true);


    axios.post("https://mechamon.glitch.me"+'/tasks/complete',null,{
      params:{
        initData:initData,
        taskId:id
      }
    }
    )
    // const interval=setTimeout(() => {
    //   setShow(false);
    // }, 3000);
    // return () => clearInterval(interval);
  };

  return (
<>
<div className="tasks-container">
      <button className="rewards-button" onClick={() => setIsModalOpen(!isModalOpen)}>Daily Rewards <div>{timer}</div></button>

      <DailyRewardsModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dailyRewards={dailyRewards}
        id={id}
      />

      <h2>Tasks</h2>
      <div className="tasks-list">
        {taskss.map((task) => (
          <div key={task._id} className="task">
            <span>{task.task}</span>
            {!task.completed ? (
              <a
                href={task.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleTaskCompletion(task._id)}
              >
                <div className="container">
                +{task.reward}
                <div className="metric"></div>
                </div>
              </a>
            ): (
              <div className='done'> </div>
            )}
          </div>
        ))}
      </div>
    </div>
      {/* <Notify message="Task Completed" isOpen={show} /> */}
</>
  );
};

export default Tasks;
