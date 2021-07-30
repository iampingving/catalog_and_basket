let catalogElem = document.querySelector('.catalog');
let basketElem = document.querySelector('.basket');
catalogElem.addEventListener('click', catalogClickEventHandler);
basketElem.addEventListener('click', basketClickEventHandler);

const catalog = {
    items: [{
            id: 1,
            name: "Футболка",
            price: 999
        },
        {
            id: 2,
            name: "Шорты",
            price: 1199
        },
        {
            id: 3,
            name: "Юбка",
            price: 1599
        }, {
            id: 4,
            name: "Носки",
            price: 149
        }, {
            id: 5,
            name: "Джинсы",
            price: 2199
        }
    ],

    render() {
        for (let item in this.items) {
            let itemCard = document.createElement('div');
            itemCard.className = "item";

            let itemName = document.createElement('span');
            itemName.innerText = this.items[item].name;

            let itemID = document.createElement('span');
            itemID.innerText = "Артикул: " + this.items[item].id;

            let itemPrice = document.createElement('span');
            itemPrice.innerText = "Цена (за 1 ед.): " + this.items[item].price;

            let buyBtn = document.createElement('button');
            buyBtn.innerText = "Купить";
            buyBtn.style.marginTop = "10px";
            buyBtn.dataset.index = this.items.indexOf(this.items[item])

            itemCard.appendChild(itemName);
            itemCard.appendChild(itemID);
            itemCard.appendChild(itemPrice);
            itemCard.appendChild(buyBtn);
            catalogElem.appendChild(itemCard);
        }
    },

    addToCart(event) {
        let temp = {};
        Object.assign(temp, this.items[parseInt(event.target.dataset.index)], {
            amount: 1
        });
        if (basket.items.length < 0)
            basket.items.push(temp);
        else {
            let check = false;
            for (let item in basket.items) {
                if (basket.items[item].id === temp.id) {
                    basket.items[item].amount++;
                    check = true;
                }
            }
            if (!check) {
                basket.items.push(temp);
            }
        }
        basket.render();
    }
}

const basket = {
    items: [],

    render() {
        basketElem.innerHTML = '';
        let itemWrap = document.createElement('div');
        itemWrap.className="basket__wrap";
        if (basket.items.length === 0) {
            basketElem.innerText = "Корзина пуста";
        } else {
            for (let item in basket.items) {
                let itemCard = document.createElement('div');
                itemCard.className = "item";
                itemCard.dataset.index = basket.items[item].id;

                let itemName = document.createElement('span');
                itemName.innerText = basket.items[item].name;
                let itemID = document.createElement('span');
                itemID.innerText = "Артикул: " + basket.items[item].id;
                let itemAmount = document.createElement('span');
                itemAmount.innerText = "Кол-во: " + basket.items[item].amount;
                let itemPriceOne = document.createElement('span');
                itemPriceOne.innerText = "Цена (за 1 ед.): " + basket.items[item].price;
                let itemPrice = document.createElement('span');
                itemPrice.innerText = "Всего на: " + basket.items[item].amount * basket.items[item].price;

                let deleteBtn = document.createElement('button');
                deleteBtn.innerText = "Удалить";
                deleteBtn.style.marginTop = "10px";

                deleteBtn.dataset.index = basket.items.indexOf(basket.items[item]);

                itemCard.appendChild(itemName);
                itemCard.appendChild(itemID);
                itemCard.appendChild(itemAmount);
                itemCard.appendChild(itemPriceOne);
                itemCard.appendChild(itemPrice);
                itemCard.appendChild(deleteBtn);
                itemWrap.appendChild(itemCard);
            }
            basketElem.appendChild(itemWrap);
            let sumPrice = document.createElement('span');
            sumPrice.innerText = "В корзине " + basket.countAmount() + " товаров на сумму " + basket.countSum() + " рублей.";
            basketElem.appendChild(sumPrice);
        }
    },

    countSum() {
        let summ = 0;
        for (let item in this.items) {
            summ += this.items[item].amount * this.items[item].price;
        }
        return summ;
    },

    countAmount() {
        let amount = 0;
        for (let item in this.items) {
            amount += this.items[item].amount;
        }
        return amount;
    },

    deleteFromCart(event) {
        this.items.splice(parseInt(event.target.dataset.index), 1);
        this.render();
    }
}

function catalogClickEventHandler(event) {
    if (event.target.tagName != 'BUTTON') return;
    catalog.addToCart(event);
}

function basketClickEventHandler(event) {
    if (event.target.tagName != 'BUTTON') return;
    basket.deleteFromCart(event);
}

catalog.render();
basket.render();