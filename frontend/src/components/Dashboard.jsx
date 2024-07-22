import React, { useEffect, useState } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';
import { fetchData } from '../services/api';
import Heatmap from './HeatMap';
import BubbleChart from './BubbleChart';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchData();
        setData(response);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    getData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Data Visualization Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Intensity by Topic</h2>
        <div className=' overflow-auto'>
          <BarChart data={data}  className =" overflow-auto"/>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Sector Distribution</h2>
        <PieChart data={data} />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Trends Over Years</h2>
        <LineChart data={data} />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Intensity Heatmap by Country and Region</h2>
        <Heatmap data={data} />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Intensity Heatmap by Country and Region</h2>
        <BubbleChart data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
