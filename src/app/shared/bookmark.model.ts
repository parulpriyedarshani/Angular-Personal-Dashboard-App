import { v4 as uuidv4 } from 'uuid' // for creating unique ids

export class Bookmark {
    id: string
    name: string
    url: URL

    constructor(name: string, url: string) {
        this.id = uuidv4()
        this.url = new URL(url)

        // to add the name automatically from the URL
        if (!name) name = this.url.hostname

        this.name = name
        
    }
}