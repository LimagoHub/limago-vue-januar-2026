import { defineStore } from 'pinia';
import { personApi } from '@/api/personApi';
import type { Person } from '@/models/Person';

export const usePersonStore = defineStore('person', {
    state: () => ({
        persons: [] as Person[],
        loading: false
    }),
   // Hier liegt die Korrektur für TypeScript
  persist: true,
    actions: {
        async fetchPersons() {
            this.loading = true;
            try {
                const { data } = await personApi.getAll();
                this.persons = data;
            } finally {
                this.loading = false;
            }
        },
        async deletePerson(id: string) {
            await personApi.delete(id);
            await this.fetchPersons(); // Refresh nach Löschen
        },
        async savePerson(person: Person, isNew: boolean) {
            if (isNew) {
                await personApi.create(person);
            } else {
                await personApi.update(person.id, person);
            }
            // Kein fetch hier nötig, wenn wir eh auf die Liste navigieren,
            // da die Liste beim Mounten fetched.
        }
    },

});
