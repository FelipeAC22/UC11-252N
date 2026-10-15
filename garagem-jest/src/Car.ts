export class Car {
    protected brand: string
    protected model: string
    protected year: number
    private stored: boolean
    constructor(brand: string, model: string, year: number) {
        this.brand = brand
        this.model = model
        this.year = year
        this.stored = false
    }
    public getBrand(): string {
        return this.brand
    }
    public setBrand(value: string): void {
        this.brand = value
    }
    public getModel(): string {
        return this.model
    }
    public setModel(value: string): void {
        this.model = value
    }
    public getStored(): boolean {
        return this.stored
    }
    public setStored(value: boolean) {
        this.stored = value
    }
    public setYear(value: number): void {
        this.year = value
    }
    public getYear(): number {
        return this.year
    }
}