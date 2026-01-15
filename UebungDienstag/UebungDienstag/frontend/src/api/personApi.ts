import { http } from "./http";
import type { Person } from "../models/Person"

export const personApi = {
    // Wenn baseURL in http.ts leer "" ist:
    getAll: () => http.get<Person[]>('/api/v1/Personen'),

    // Wenn baseURL in http.ts "/api/v1" ist:
    // getAll: () => http.get<Person[]>('/Personen'),

    getById: (id: string) => http.get<Person>(`/api/v1/Personen/${id}`),
    create: (p: Person) => http.post('/api/v1/Personen', p),
    update: (id: string, p: Person) => http.put(`/api/v1/Personen/${p.id}`, p),
    delete: (id: string) => http.delete(`/api/v1/Personen/${id}`)
};
