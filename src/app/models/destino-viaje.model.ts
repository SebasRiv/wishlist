export class DestinoViaje {
    private selected: boolean;
    public servicios: string[];
    public id: string;

    constructor(public nombre: string, public imagenUrl: string) {
        this.servicios = ["pileta", "desayuno"];
    }

    isSelected(): boolean {
        return this.selected;
    }

    setSelected(b: boolean) {
        this.selected = b;
    }

}