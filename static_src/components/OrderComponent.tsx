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
    changeEditInput: (event:any) => void,
}

//компонент, рисующий одну заявку
export default class OrderComponent extends React.Component<OrderProps,{}> {
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
                { this.props.order.name }|{ this.props.order.driver }|{ this.props.order.phone }|<a href={"https://ati.su/firms/" +this.props.order.ati+ '/info'}>Ati</a>|{ this.props.order.comments }
            </div></div>
        }else{            
            resultOrder=new OrderFromForm(
                this.props.inputEditOrder.name,
                this.props.inputEditOrder.driver,
                this.props.inputEditOrder.phone,
                this.props.inputEditOrder.ati,
                this.props.inputEditOrder.comments,
            );
            orderText= <div><div> Заявка № { this.props.order.id} от {dateSrting}: </div> 
                <div>
                <input 
                    onChange={ (event) => this.props.changeEditInput(event) }
                    value={ this.props.inputEditOrder.name }
                    onKeyUp={ (event) => this.editByEnter(event,resultOrder) } 
                    autoFocus={true}
                    name='name'
                />
                <input 
                    onChange={ (event) => this.props.changeEditInput(event) }
                    value={ this.props.inputEditOrder.driver }
                    onKeyUp={ (event) => this.editByEnter(event,resultOrder) } 
                    name='driver'
                />
                <input 
                    onChange={ (event) => this.props.changeEditInput(event) }
                    value={ this.props.inputEditOrder.phone }
                    onKeyUp={ (event) => this.editByEnter(event,resultOrder) } 
                    name='phone'
                />
                <input 
                    onChange={ (event) => this.props.changeEditInput(event) }
                    value={ this.props.inputEditOrder.ati }
                    onKeyUp={ (event) => this.editByEnter(event,resultOrder) } 
                    name='ati'
                />
                <input 
                    onChange={ (event) => this.props.changeEditInput(event) }
                    value={ this.props.inputEditOrder.comments }
                    onKeyUp={ (event) => this.editByEnter(event,resultOrder) } 
                    name='comments'
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
                <button onClick={ () => {
                    this.props.changeEditIndex(this.props.order.id)
                 }
                }>Редактировать</button>
                <button onClick={ () => this.props.deleteOrder(this.props.order.id) }>Удалить</button>
            </div>
        else
            return <div>{orderText}</div>
            
   }
}
