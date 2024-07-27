// utils.js
import axios from 'axios';
import { saveAs } from 'file-saver';

export const fetchData = async (symbol, startDate, endDate, timeline) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/graph/${symbol}`, {
      params: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        timeline,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchSuggestions = async (input) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/suggestions/${input}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
};

export const generateBIReport = async (symbol, startDate, endDate) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/graph/report/${symbol}`,
      {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
      },
      {
        responseType: 'blob',
      }
    );
    const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
    saveAs(blob, `${symbol}_BI_Report.xlsx`);
  } catch (error) {
    console.error('Failed to generate BI report:', error);
  }
};
