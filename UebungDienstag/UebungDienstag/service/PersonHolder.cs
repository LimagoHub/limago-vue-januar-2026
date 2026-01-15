namespace UebungDienstag.service
{
    using System;
    using System.Collections.Generic;

    public sealed class PersonHolder
    {
        private readonly Dictionary<Guid, Person> _persons = new();


        public PersonHolder()
        {
            // Initialisierungs-Script: Testdaten hinzufügen
            var p1 = new Person
            {
                Id = Guid.NewGuid(),
                Vorname = "Max",
                Nachname = "Mustermann",
                Aktiv = true
            };
            var p2 = new Person
            {
                Id = Guid.NewGuid(),
                Vorname = "Erika",
                Nachname = "Musterfrau",
                Aktiv = false
            };

            _persons[p1.Id] = p1;
            _persons[p2.Id] = p2;
        }
        /// <summary>
        /// Insertiert eine neue Person.
        /// Liefert false, wenn eine Person mit dieser Id bereits existiert.
        /// </summary>
        public bool Insert(Person person)
        {
            if (person == null)
                throw new ArgumentNullException(nameof(person));

            if (_persons.ContainsKey(person.Id))
                return false;

            _persons[person.Id] = person;
            return true;
        }

        /// <summary>
        /// Aktualisiert eine bestehende Person.
        /// Liefert false, wenn die Person nicht existiert.
        /// </summary>
        public bool Update(Person person)
        {
            if (person == null)
                throw new ArgumentNullException(nameof(person));

            if (!_persons.ContainsKey(person.Id))
                return false;

            _persons[person.Id] = person;
            return true;
        }

        /// <summary>
        /// Löscht eine Person anhand der Id.
        /// Liefert false, wenn die Person nicht existiert.
        /// </summary>
        public bool Delete(Guid id)
        {
            return _persons.Remove(id);
        }

        /// <summary>
        /// Findet eine Person anhand der Id.
        /// Liefert null, wenn keine Person existiert.
        /// </summary>
        public Person? FindById(Guid id)
        {
            _persons.TryGetValue(id, out var person);
            return person;
        }

        /// <summary>
        /// Liefert alle Personen als IList.
        /// </summary>
        public IList<Person> FindAll()
        {
            return new List<Person>(_persons.Values);
        }
    }

}
