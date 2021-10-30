export default class OrderFromForm{
    name: string;
    phone: string;
    ati: string;
    comments:string;
    constructor(name:string,phone:string,ati:string,comments:string){
        this.name=name;
        this.phone=phone;
        this.ati=ati;
        this.comments=comments;
    };
    checkValues=(order:OrderFromForm) => {
        if(order.name.trim()===''){//обрезаем пробелы в названии компании и проверяем, не пусто ли
            return false;
        }
        if(order.phone.trim()==='' || order.phone.trim()==='+'){//в разных местах земного шара телефон может включать даже буквы, так что ограничимся проверкой на то, не пусто ли поле и не один ли там плюс
            return false;
        }
        if(String(Number(order.ati.trim()))!==order.ati.trim() || order.ati===''){//Ати должен быть числом
            return false;
        }
        return true;
    };
}
