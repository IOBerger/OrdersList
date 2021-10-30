import * as React from "react"
import Order from "./Order"
import OrderFromForm from "./OrderFromForm"

type OrderProps = {//типы свойств компонента
    order:Order,//Заявка
    admin:boolean,//Режим администратора
    deleteOrder:(id: number) => void,//функция удаления
    changeEditIndex:(id: number) => void,//Изменить индекс заявки, которую меняем
    editIndex:number,//Индекс заявки, которую меняем
    editOrder:(id: number, order:OrderFromForm) => void,//функция изменения заявки
    inputEditOrder:OrderFromForm,//в объекте хранится то, что прямо сейчас в формах
    //функции, сохраняющие изменения в формах
    changeEditInputName: (text:string) => void,
    changeEditInputPhone:(text:string) => void,
    changeEditInputAti:(text:string) => void,
    changeEditInputComments:(text:string) => void,
}

//компонент, рисующий одну заявку
export default class OrderComponent extends React.Component<OrderProps,{}> {
    //изменение заявки нажатием enter
    editByEnter = (event: any, resultOrder:OrderFromForm) => {
        if (event.keyCode === 13) { // Enter
            this.props.editOrder(this.props.order.id,resultOrder);
        }
    }; 
   render():React.ReactNode {
        let orderText : React.ReactNode;  
        let dateSrting:string = this.props.order.date.toString();  
        let resultOrder:OrderFromForm;
        if(this.props.editIndex!==this.props.order.id){
            //рисуем заявку в обычном случае
            orderText= <div><div>
                    <p> Заявка № {this.props.order.id} от {dateSrting}:</p>
                </div>
                <div> 
            { this.props.order.name }|{ this.props.order.phone }|<a href={"https://ati.su/firms/" +this.props.order.ati+ '/info'}>Ati</a>|{ this.props.order.comments }
            </div></div>
        }else{
            //рисуем форму изменения заявки
            let editValueName:string = this.props.inputEditOrder.name==='' ? this.props.order.name : this.props.inputEditOrder.name;//?????было 0 а не ''
            let editValuePhone:string = this.props.inputEditOrder.phone==='' ? this.props.order.phone : this.props.inputEditOrder.phone;
            let editValueAti:string = this.props.inputEditOrder.ati==='' ? String(this.props.order.ati) : this.props.inputEditOrder.ati;
            let editValueComments:string = this.props.inputEditOrder.comments==='' ? this.props.order.comments : this.props.inputEditOrder.comments;
            resultOrder=new OrderFromForm(editValueName,editValuePhone,editValueAti,editValueComments);
            
            orderText= <div><div> Заявка № { this.props.order.id} от {dateSrting}: </div> 
                <div>
                <input 
                    onChange={ (event) => this.props.changeEditInputName(event.target.value) }
                    value={ editValueName }
                    onKeyUp={ (event) => this.editByEnter(event,resultOrder) } 
                />
                <input 
                    onChange={ (event) => this.props.changeEditInputPhone(event.target.value) }
                    value={ editValuePhone }
                    onKeyUp={ (event) => this.editByEnter(event,resultOrder) } 
                />
                <input 
                    onChange={ (event) => this.props.changeEditInputAti(event.target.value) }
                    value={ editValueAti }
                    onKeyUp={ (event) => this.editByEnter(event,resultOrder) } 
                />
                <input 
                    onChange={ (event) => this.props.changeEditInputComments(event.target.value) }
                    value={ editValueComments }
                    onKeyUp={ (event) => this.editByEnter(event,resultOrder) } 
                />
                <button
                    onClick={ () => this.props.editOrder(this.props.order.id,resultOrder) }
                >
                    ОК
                </button>
                </div>
            </div>
        }
        if(this.props.admin===true)
            //рисуем кнопки редактировать-изменить
            return <div>{orderText} 
                <button onClick={ () => this.props.changeEditIndex(this.props.order.id) }>Редактировать</button>
                <button onClick={ () => this.props.deleteOrder(this.props.order.id) }>Удалить</button>
            </div>
        else
            return <div>{orderText}</div>
            
   }
}
