import { defineStore } from 'pinia';
import { weatherApi } from '@/api/weatherApi';
import type { WeatherForecast } from '@/models/WeatherForecast';

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        forecasts: [] as WeatherForecast[],
        loading: false
    }),
    actions: {
        async load() {
            this.loading = true;
            try {
                const { data } = await weatherApi.getForecasts();
                this.forecasts = data;
            } finally {
                this.loading = false;
            }
        }
    }
});
