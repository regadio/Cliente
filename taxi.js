class Taxi {
    constructor(name, distance, travels) {
        this.name = name;
        this.distance = distance;
        this.travels = travels;
    
    }
    moneyMade() {
        return this.distance * 0.11 + this.travels * 3.80;
    }
    
}
export default Taxi;
