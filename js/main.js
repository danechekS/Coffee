let btnElem = document.querySelector('.btn');
let nameElem = document.querySelector('.name');
let surnameElem = document.querySelector('.surname');
let finalChargeElem = document.querySelector('.sum');
let goodsCheckBox = document.querySelectorAll('[name="goods"]');
let amountCheckBox = document.querySelectorAll('[name="amount"]');


const countGoods = {
	"expresso": 0,
	"americano": 0,
	"latte": 0,
	"capuchino": 0,
	"chocolate_muffin": 0,
	"blueberry_muffin": 0,
	"apple_tart": 0
}

const choicePriceGoods = {
	"expresso": 0,
	"americano": 0,
	"latte": 0,
	"capuchino": 0,
	"chocolate_muffin": 0,
	"blueberry_muffin": 0,
	"apple_tart": 0
}

goodsCheckBox.forEach(function (element, index) {
	element.addEventListener("change", function () {
		if (element.checked) {
			amountCheckBox[index].value = "1";
		} else {
			amountCheckBox[index].value = "0";
		}
		loadData(element.dataset.goods, parseInt(amountCheckBox[index].value), parseInt(amountCheckBox[index].value) * parseInt(element.value));
		finalSum();
	});
});

amountCheckBox.forEach(function (element, index) {
	element.addEventListener("change", function () {
		if (element.value == "") {
			element.value = 0;
			goodsCheckBox[index].checked = false;
		}
		if (parseInt(element.value) >= 0) {
			loadData(element.id, parseInt(element.value), parseInt(element.value) * parseInt(goodsCheckBox[index].value))
		}
		finalSum();
	})
});


function loadData(goodName, amount, value) {
	countGoods[goodName] = amount;
	choicePriceGoods[goodName] = value;
}

function finalSum() {
	let charge = 0;
	let iterator = 0;
	for (const [key, value] of Object.entries(choicePriceGoods)) {
		if (goodsCheckBox[iterator].checked) {
			charge += value;
		}
		iterator++;
	}
	finalChargeElem.textContent = charge.toString();
}


btnElem.addEventListener('click', () => {
	const asArray = Object.entries(countGoods);
	const filtered = asArray.filter(([key, value]) => value > 0);
	alert(`Заказчик: ${surnameElem.value} ${nameElem.value}\nВаш заказ (товар,кол-во) ${filtered.join('; ')}\nИтого: ${finalChargeElem.textContent} р.`);
});