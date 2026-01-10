import axios from 'axios';
import { Platform } from 'react-native';

// Use localhost for iOS simulator, 10.0.2.2 for Android Emulator
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const createBrainDump = async (text: string, userId: string = 'default-user-id') => {
    const response = await api.post('/brain-dumps', { rawText: text, userId });
    return response.data;
};

export const getBrainDumps = async (userId: string = 'default-user-id') => {
    const response = await api.get('/brain-dumps', { params: { userId } });
    return response.data;
};

export default api;
