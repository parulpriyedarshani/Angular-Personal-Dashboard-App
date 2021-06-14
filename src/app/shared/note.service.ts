import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, SubscribableOrPromise, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy{

  notes: Note[] = []

  storageListenSub: Subscription

  constructor() { 
    this.loadState();

    this.storageListenSub = fromEvent(window, 'storage')
    .subscribe((event: StorageEvent) => {
      if (event.key === 'notes') this.loadState()
    })
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getNotes() {
    return this.notes
  }

  getNote(id: string) {
    // find func. will return true when n.id equals
    // the id passed into this Method
    return this.notes.find(n => n.id === id)

  }

  addNote(note: Note) {
    this.notes.push(note)

    this.saveState()
  }


  updateNote(id: string, updatedFields: Partial<Note>) {  

    // Partial<Note> is used here because we donot need the whole 
    // note object but just for the changed fields

    const note = this.getNote(id)
    Object.assign(note, updatedFields)

    this.saveState()
    
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id)
    if (noteIndex == -1) return

    this.notes.splice(noteIndex, 1)
    this.saveState()

  }

  /** to save into local storage we are gonna
   *  convert our notes array into a JSON string 
   *  so that it can be stored 
   * */ 
  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes))
  }

  loadState() {

    try {

      const notesInStorage = JSON.parse(localStorage.getItem('notes'))
      // if (!notesInStorage) return      // if the local storage is empty
      
      //clear the notes array while keeping the reference
      this.notes.length = 0
      this.notes.push(...notesInStorage)

    } catch (e) {
        console.log('There was an error retrieving the notes from the local storage')
        console.log(e)
    }

  }

}
