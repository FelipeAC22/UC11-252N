import { Car } from "./Car"

export class Garage {
    protected garage: Car[]

    constructor(garage: Car[] = []) {
        this.garage = garage
    }

    public addCar(car: Car): void {
        let duplicated = false

        for (let i = 0; i < this.garage.length; i++) {
            if (
                this.garage[i].getBrand() === car.getBrand() &&
                this.garage[i].getModel() === car.getModel() &&
                this.garage[i].getYear() === car.getYear()
            ) {
                duplicated = true
                break
            }
        }

        if (duplicated) {
            console.log("Carro duplicado!")
        } else {
            this.garage.push(car)
            car.setStored(true)
            console.log("Carro adicionado com sucesso!")
        }
    }
    public removeCar(car: Car): void {
        const carIndex = this.garage.indexOf(car)

        if (carIndex !== -1) {
            this.garage[carIndex].setStored(false)
            this.garage.splice(carIndex, 1)
        }
    }
    public getCarCount(): number {
        return this.garage.length
    }
    public findCarByModel(modelChosen: string): Car | undefined {
        return this.garage.find(
            car => car.getModel().toLowerCase() === modelChosen.toLowerCase()
        )
    }
    public findCarByBrand(brand: string): Car | undefined {
        return this.garage.find(car => car.getBrand() === brand)
    }
}