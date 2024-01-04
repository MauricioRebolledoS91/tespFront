import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Contact } from './contact.model';
import { nanoid } from 'nanoid'

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) { }

  getContact(id: string): Observable<Contact | undefined> {
    return this.http.get<Contact>(`api/contacts/${id}`)
    // nuestra api devolverá las fechas en un formato como este '1994-05-05T06:00:00.000Z'
    //y la expresión pipe que hay en la siguiente línea, recortará T06:00:00.000Z
    //para darnos una fecha con un formato como este '1994-05-05'
      // .pipe(map(c => { c.dateOfBirth = c.dateOfBirth.split('T')[0]; return c}));
      .pipe(map(c => {
        const dob = c.dateOfBirth ? new Date(c.dateOfBirth) : null;
        return { ...c, dateOfBirth: dob }
      }));
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('api/contacts');
  }

  //Partial<Contact> lo usamos debido a que NO esperamos a que el usuario
  //en una app de contactos, llene todos los campos para un contacto
  //lo cual nos hace sentido el usar mejor un tipo de dato Partial
  //con esto nos evitamos errores donde dice que falta llenar determinados campos
  //del modelo Contact
  saveContact(contact: Partial<Contact>): Observable<Contact> {
    const headers = { headers: { 'Content-Type': 'application/json' } };

    if (!contact.id || contact.id === '') {
      let newContact: Partial<Contact> = { ...contact, id: nanoid(5) };
      return this.http.post<Contact>('api/contacts/', newContact, headers)
    }
    else
      return this.http.put<Contact>('api/contacts/', contact, headers)
  }
}