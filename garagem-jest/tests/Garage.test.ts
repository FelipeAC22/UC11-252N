import { Garage } from "../src/Garage"
import { Car } from "../src/Car"

beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => { })
})

afterEach(() => {
    jest.restoreAllMocks()
})

describe("Criar um carro", () => {
    test("Guarda marca, modelo e ano", () => {
        const car = new Car("Volkswagen", "Gol", 2010)

        expect(car.getBrand()).toBe("Volkswagen")
        expect(car.getModel()).toBe("Gol")
        expect(car.getYear()).toBe(2010)
    })
})

describe("Estado de armazenamento", () => {
    test("Começa como false", () => {
        const car = new Car("Volkswagen", "Gol", 2010)

        expect(car.getStored()).toBe(false)
    })

    test("Pode ser alterado para true", () => {
        const car = new Car("Volkswagen", "Gol", 2010)

        car.setStored(true)

        expect(car.getStored()).toBe(true)
    })

    test("Pode voltar para false", () => {
        const car = new Car("Volkswagen", "Gol", 2010)

        car.setStored(true)
        car.setStored(false)

        expect(car.getStored()).toBe(false)
    })
})

describe("Adicionar carros", () => {
    test("Adiciona um carro à garagem", () => {
        const car = new Car("Volkswagen", "Gol", 2010)
        const garage = new Garage()

        garage.addCar(car)

        expect(garage.getCarCount()).toBe(1)
    })

    test("Marca o carro como armazenado", () => {
        const car = new Car("Volkswagen", "Gol", 2010)
        const garage = new Garage()

        garage.addCar(car)

        expect(car.getStored()).toBe(true)
    })

    test("Adiciona vários carros diferentes", () => {
        const garage = new Garage()

        garage.addCar(new Car("Volkswagen", "Gol", 2010))
        garage.addCar(new Car("Volkswagen", "Polo", 2018))
        garage.addCar(new Car("Volkswagen", "Fox", 2008))

        expect(garage.getCarCount()).toBe(3)
    })

    test("Não adiciona outro carro com a mesma marca, modelo e ano", () => {
        const garage = new Garage()

        garage.addCar(new Car("Volkswagen", "Gol", 2010))
        garage.addCar(new Car("Volkswagen", "Gol", 2010))

        expect(garage.getCarCount()).toBe(1)
        expect(console.log).toHaveBeenCalledWith("Carro duplicado!")
    })

    test("Aceita o mesmo modelo quando o ano é diferente", () => {
        const garage = new Garage()

        garage.addCar(new Car("Volkswagen", "Gol", 2010))
        garage.addCar(new Car("Volkswagen", "Gol", 2012))

        expect(garage.getCarCount()).toBe(2)
    })
})

describe("Remover carros", () => {
    test("Remove o carro da garagem", () => {
        const car = new Car("Volkswagen", "Gol", 2010)
        const garage = new Garage()
        garage.addCar(car)

        garage.removeCar(car)

        expect(garage.getCarCount()).toBe(0)
    })

    test("Marca o carro removido como não armazenado", () => {
        const car = new Car("Volkswagen", "Gol", 2010)
        const garage = new Garage()
        garage.addCar(car)

        garage.removeCar(car)

        expect(car.getStored()).toBe(false)
    })

    test("Mantém os outros carros ao remover um deles", () => {
        const gol = new Car("Volkswagen", "Gol", 2010)
        const polo = new Car("Volkswagen", "Polo", 2018)
        const fox = new Car("Volkswagen", "Fox", 2008)
        const garage = new Garage()

        garage.addCar(gol)
        garage.addCar(polo)
        garage.addCar(fox)
        garage.removeCar(fox)

        expect(garage.getCarCount()).toBe(2)
        expect(garage.findCarByModel("Gol")).toBe(gol)
        expect(garage.findCarByModel("Polo")).toBe(polo)
    })

    test("Atualiza apenas o estado do carro removido", () => {
        const gol = new Car("Volkswagen", "Gol", 2010)
        const polo = new Car("Volkswagen", "Polo", 2018)
        const fox = new Car("Volkswagen", "Fox", 2008)
        const garage = new Garage()

        garage.addCar(gol)
        garage.addCar(polo)
        garage.addCar(fox)
        garage.removeCar(fox)

        expect(gol.getStored()).toBe(true)
        expect(polo.getStored()).toBe(true)
        expect(fox.getStored()).toBe(false)
    })
})

describe("Buscar carros por modelo", () => {
    test("Encontra um carro existente", () => {
        const car = new Car("Volkswagen", "Gol", 2010)
        const garage = new Garage()
        garage.addCar(car)

        expect(garage.findCarByModel("Gol")).toBe(car)
    })

    test("A busca não diferencia maiúsculas de minúsculas", () => {
        const car = new Car("Volkswagen", "Gol", 2010)
        const garage = new Garage()
        garage.addCar(car)

        expect(garage.findCarByModel("gol")).toBe(car)
    })

    test("Retorna undefined quando o modelo não existe", () => {
        const garage = new Garage()

        garage.addCar(new Car("Volkswagen", "Gol", 2010))

        expect(garage.findCarByModel("Fox")).toBeUndefined()
    })

    test("O carro encontrado mantém sua marca e ano", () => {
        const car = new Car("Volkswagen", "Polo", 2018)
        const garage = new Garage()
        garage.addCar(car)
        const found = garage.findCarByModel("Polo")

        expect(found?.getBrand()).toBe("Volkswagen")
        expect(found?.getYear()).toBe(2018)
    })
})

describe("Buscar carros por marca", () => {
    test("Retorna o primeiro carro encontrado pela marca", () => {
        const garage = new Garage()

        const corolla = new Car("Toyota", "Corolla", 2025)
        const yaris = new Car("Toyota", "Yaris", 2024)

        garage.addCar(corolla)
        garage.addCar(yaris)

        const toyota = garage.findCarByBrand("Toyota")

        expect(toyota).toBe(corolla)
    })

    test("Retorna undefined para uma marca inexistente", () => {
        const garage = new Garage()

        garage.addCar(new Car("Toyota", "Corolla", 2025))

        expect(garage.findCarByBrand("Fiat")).toBeUndefined()
    })
})
