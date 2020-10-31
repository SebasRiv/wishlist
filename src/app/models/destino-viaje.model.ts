export class DestinoViaje {
    public selected: boolean;
    public servicios: string[];
    public id: string;
    
    constructor(public nombre: string, public imagenUrl: string, public votes: number = 0) {
        this.servicios = ["pileta", "desayuno"];
    }
    
    isSelected(): boolean {
        return this.selected;
    }
    
    setSelected(b: boolean) {
        this.selected = b;
    }
    
    voteUp() {
        this.votes++;
    }
    
    voteDown() {
        this.votes--;
    }
}
