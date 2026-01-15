// OPhne toast

import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { usePersonStore } from '@/stores/personStore';
import { useRouter } from 'vue-router';
import type { Person } from '@/models/Person';


export function usePersonLogic(personId: string | string[]) {
    const store = usePersonStore();
    const router = useRouter();
    const isNew = computed(() => personId === 'neu');

    const person = ref<Person>({
        id: isNew.value ? uuidv4() : '',
        vorname: '',
        nachname: '',
        aktiv: true
    });

    const loadPerson = () => {
        if (!isNew.value) {
            const existing = store.persons.find(p => p.id === personId);
            if (existing) person.value = { ...existing };
        }
    };

    const save = async () => {
        await store.savePerson(person.value, isNew.value);
        router.push('/personen');
    };

    return { person, isNew, save, loadPerson };
}
/*

import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { usePersonStore } from '@/stores/personStore';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'; // 1. Toast importieren
import type { Person } from '@/models/Person';

export function usePersonLogic(personId: string | string[]) {
    const store = usePersonStore();
    const router = useRouter();
    const toast = useToast(); // 2. Toast-Instanz initialisieren

    const isNew = computed(() => personId === 'neu');

    const person = ref<Person>({
        id: isNew.value ? uuidv4() : '',
        vorname: '',
        nachname: '',
        aktiv: true
    });

    const loadPerson = () => {
      toast.success("Halllooooooo");
        if (!isNew.value) {
            const idToFind = Array.isArray(personId) ? personId[0] : personId;
            const existing = store.persons.find(p => p.id === idToFind);
            if (existing) {
                person.value = { ...existing };
            } else {
                toast.warning("Person wurde im lokalen Speicher nicht gefunden.");
            }
        }
    };

    const save = async () => {
        try {
            await store.savePerson(person.value, isNew.value);

            // 3. Erfolg melden
            const message = isNew.value
                ? `${person.value.vorname} wurde erfolgreich angelegt!`
                : "Änderungen wurden gespeichert.";
            toast.success(message);

            router.push('/personen');
        } catch (error) {
            // 4. Fehler melden
            console.error(error);
            toast.error("Fehler beim Speichern der Person.");
        }
    };

    const remove = async () => {
    // 1. Wir prüfen isNew, damit wir nicht versuchen, eine nicht-existente Person zu löschen
    if (!isNew.value && confirm(`Möchten Sie ${person.value.vorname} wirklich löschen?`)) {
        try {
            // 2. ID sicher aus den Parametern extrahieren und sicherstellen, dass es ein String ist
            // Wir nehmen das erste Element, falls es ein Array ist, oder den Wert selbst.
            // Falls beides nicht existiert, nutzen wir zur Not die ID aus dem person-Ref.
            const idToDelete = (Array.isArray(personId) ? personId[0] : personId) || person.value.id;

            // 3. Falls die ID immer noch undefined/leer sein könnte, werfen wir einen Fehler ab
            if (!idToDelete) {
                toast.error("Löschen nicht möglich: Keine ID gefunden.");
                return;
            }

            await store.deletePerson(idToDelete);
            toast.info("Person wurde erfolgreich entfernt.");
            router.push('/personen');
        } catch (error) {
            toast.error("Löschen fehlgeschlagen.");
        }
    }
};

    return { person, isNew, save, loadPerson, remove };
}


*/
