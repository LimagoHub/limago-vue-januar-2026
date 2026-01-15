import { http } from "./http";
import type { WeatherForecast } from "@/models/WeatherForecast";

export const weatherApi = {
    getForecasts: () => http.get<WeatherForecast[]>('/api/v1/weatherforecast')
};
