import { v4 as uuidv4 } from 'uuid' // a package used for generating unique ids

export class Note {

    id: string

    constructor(public title: string, public content: string) {
        
        this.id = uuidv4()

    }
}