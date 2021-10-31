import * as React from "react"
import OrderComponent from './OrderComponent';
import Order from "./Order"
import OrderFromForm from "./OrderFromForm"


type OrderFieldState = {
    orders: Order[],//массив заявок
    inputAddOrder: OrderFromForm,//объект, хранящий то, что сейчас в поле создания заявки
    admin: boolean,//режим администратора
    editIndex: number,//индекс заявки, которую сейчас редактируем, не редактируем ничего - значит, 0
    inputEditOrder: OrderFromForm,//объекст, хранящий то, что сейчас в поле редактирования заявки
}

export default class OrderField extends React.Component<{},OrderFieldState> {
    state : OrderFieldState = {
        orders: [],
        inputAddOrder: new OrderFromForm('','','','',''),
        admin: false,
        editIndex: 0,
        inputEditOrder: new OrderFromForm('','','','',''),
    };
    //подсчёт количества заявок
    countOrders = () => {
        let numberOrders:number=0;
        for(let i=0;i<this.state.orders.length;i++){
            if(this.state.orders[i])
                numberOrders++;
        }
        return numberOrders;
    }
    //при клике на кнопку проверяем корректность и добавляем заявку
    handleClickAddOrder = (order:OrderFromForm) => {
        if(order.checkValues(order)){
            this.addOrder(order);
        }else{
            alert('Ошибка в данных!');
        }
    };
    //Сохраняем изменения в форме добавки
    handleChangeAdd = (event:any) => {
        const {name, value} = event.target
        this.setState({ inputAddOrder: {
            ...this.state.inputAddOrder,
            [name]: String(value),
        } });
    };
    //по нажатию enter пытаемся добавить новую заявку
    handleKeyUpAddOrder = (event:any, order:OrderFromForm) => {
        if (event.keyCode === 13) { // Enter
            this.handleClickAddOrder(order);
        }
    };
    //непосредственно добавление заявки
    addOrder = (order:OrderFromForm) => {        
        this.setState({ 
            orders: [ 
                ...this.state.orders, 
                {
                    id: this.state.orders.length+1, 
                    date: new Date(),
                    name: order.name,
                    driver: order.driver,
                    phone: order.phone,
                    ati: Number(order.ati),
                    comments: order.comments
                } 
            ],
            inputAddOrder : new OrderFromForm('','','','',''),
        });
    };
    //удаление заявки
    deleteOrder = (id:number) => {
        let leftOrders=this.state.orders;
        delete leftOrders[id-1];
        this.setState({orders: leftOrders, editIndex: 0});
    }
    //сохраняем изменения edit
    changeEditInput = (event:any) => {
        const {name, value} = event.target
        this.setState({ inputEditOrder: {
            ...this.state.inputEditOrder,
            [name]: String(value),
        } });      
    }
    //изменяет индекс заявки, изменяемой в текущий момент (0 - ничего не изменяем)
    changeEditIndex = (id:number) => {
        console.log('id='+id)
        this.setState({
            editIndex: id,
            inputEditOrder:{
            ...this.state.inputEditOrder,
            name:this.state.orders[id-1].name,
            phone:this.state.orders[id-1].phone,
            driver:this.state.orders[id-1].driver,
            ati:String(this.state.orders[id-1].ati),
            comments:this.state.orders[id-1].comments,
        }});
    }
    //проверка корректности данных и изменение заявки
    editOrder= (id:number,order:OrderFromForm) => {
        if(order.checkValues(order)){
            let leftOrders:Order[]=this.state.orders;
            leftOrders[id-1]={
                id:leftOrders[id-1].id,
                date:leftOrders[id-1].date,
                name: order.name,
                driver: order.driver,
                phone: order.phone,
                ati: Number(order.ati),
                comments: order.comments
            }
            this.setState({orders: leftOrders, editIndex: 0,inputEditOrder:new OrderFromForm('','','','','')});    
        }else{
            alert('Ошибка в данных!');
        }

    }
    render() {
        //собираем компоненты заявок в массив
        const orderElements = this.state.orders.map((order:Order, index) => {
            if(order===undefined) 
                return;
            return <OrderComponent 
                key={index}
                order={ order } 
                admin={this.state.admin}
                deleteOrder={this.deleteOrder}
                changeEditIndex={this.changeEditIndex}
                editIndex={this.state.editIndex}
                editOrder={this.editOrder}
                changeEditInput={this.changeEditInput}
                inputEditOrder={this.state.inputEditOrder}
            />});
        //разворачиваем массив
        orderElements.reverse();
        let numberOrders = this.countOrders();
        let addOrder=null;
        //форма добавления заявки
        if(this.state.admin){
            addOrder = <div> 
                    <input
                        onChange={ this.handleChangeAdd }
                        value={ this.state.inputAddOrder.name }
                        onKeyUp={ (event) => this.handleKeyUpAddOrder(event, this.state.inputAddOrder) }
                        autoFocus={true}
                        placeholder="Название фирмы"
                        name="name"
                    />
                    <input
                        onChange={ this.handleChangeAdd }
                        value={ this.state.inputAddOrder.driver }
                        onKeyUp={ (event) => this.handleKeyUpAddOrder(event, this.state.inputAddOrder) }
                        placeholder="Имя перевозчика"
                        name="driver"
                    />
                    <input
                        onChange={ this.handleChangeAdd }
                        value={ this.state.inputAddOrder.phone }
                        onKeyUp={ (event) => this.handleKeyUpAddOrder(event, this.state.inputAddOrder) }
                        placeholder="Телефон"
                        name="phone"
                    />
                    <input
                        onChange={ this.handleChangeAdd }
                        value={ this.state.inputAddOrder.ati }
                        onKeyUp={ (event) => this.handleKeyUpAddOrder(event, this.state.inputAddOrder) }
                        placeholder="Ati"
                        name="ati"
                    />
                     <input
                        onChange={ this.handleChangeAdd }
                        value={ this.state.inputAddOrder.comments }
                        onKeyUp={ (event) => this.handleKeyUpAddOrder(event, this.state.inputAddOrder) }
                        placeholder="Комментарий"
                        name="comments"
                    />
                    <button
                        onClick={ () => this.handleClickAddOrder(this.state.inputAddOrder) }
                    >
                        Добавить заявку
                    </button>
                </div> 
        }
        //текст на кнопке изменения режима
        let adminButtonText= this.state.admin ? 'Выйти из режима администрирования':'Режим администрирования';
        //отрисовываем таблицу целиком
        let answer= <div className="layout">
                <button
                    onClick={ () => {
                        this.setState({admin: !this.state.admin,editIndex:0});
                        }
                    }
                >
                    {adminButtonText}
                </button>
                <p>Всего: {numberOrders}</p>
                {addOrder}
                <div className="order-field">
                   { orderElements }
                </div>
            </div>  
        return answer;
   }
}
