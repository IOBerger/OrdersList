export default class Order {
    readonly id: number;//индекс заявки
    readonly date: Date;//дата создания
    name: string;//имя компании
    phone: string;//телефон
    ati: number;//ати
    comments:string;//комментарии
    constructor(id:number,date:Date,name:string,phone:string,ati:number,comments:string){
        this.date=new Date();
        this.id=id;
        this.name=name;
        this.phone=phone;
        this.ati=ati;
        this.comments=comments;
    };
}
