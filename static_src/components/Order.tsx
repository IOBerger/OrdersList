export default class Order {
    readonly id: number;//индекс заявки
    readonly date: Date;//дата создания
    name: string;//имя компании
    driver: string;//имя перевозчика
    phone: string;//телефон
    ati: number;//ати
    comments:string;//комментарии
    constructor(id:number,name:string,driver:string,phone:string,ati:number,comments:string){
        this.date=new Date();
        this.id=id;
        this.name=name;
        this.driver=driver;
        this.phone=phone;
        this.ati=ati;
        this.comments=comments;
    };
}
