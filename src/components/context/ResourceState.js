import { useEffect, useState } from "react";
import ResourceContext from "./ResourceContext";
import axios from "axios";

const ResourceState = ({ children }) => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const initData = window.Telegram.WebApp.initData;

    const [tasks, setTasks] = useState([]);
    const [dailyReward, setDailyReward] = useState([]);
    const [referrals, setReferrals] = useState([]);
    const [trigger,setTrigger] = useState(false);
    const [collectables,setCollectables] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const validateRequest = axios.post("https://mechamon.glitch.me/validate", null, {
                    params: {
                        initData: initData,
                        refer: window.Telegram.WebApp.initDataUnsafe?.start_param
                    }
                });

                const tasksRequest = axios.post("https://mechamon.glitch.me/tasks", null, {
                    params: { initData: initData }
                });

                const referralsRequest = axios.post("https://mechamon.glitch.me/referral/getReferrals", null, {
                    params: { initData: initData }
                });

                const [validateResponse, tasksResponse, referralsResponse] = await Promise.all([
                    validateRequest,
                    tasksRequest,
                    referralsRequest
                ]);

                setResources(validateResponse.data.resource);
                setCollectables(validateResponse.data.collectables);
                setTasks(tasksResponse.data.task.tasks);
                setDailyReward(tasksResponse.data.dailyReward.details);
                setReferrals(referralsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [trigger]);

    return (
        <ResourceContext.Provider value={{ initData,resources, loading,setTrigger,setCollectables,collectables,tasks, dailyReward, referrals,setDailyReward,setResources,setTasks }}>
            {children}
        </ResourceContext.Provider>
    );
};

export default ResourceState;
