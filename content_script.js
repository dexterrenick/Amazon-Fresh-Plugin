
const items = document.querySelectorAll('.a-size-base.a-color-base.a-text-normal');
const prices = document.querySelectorAll('.a-row.a-size-base.a-color-base');


const fp = [
 {
   "food": "Beef (beef herd)",
   "emissions per kg": "60 "
 },
 {
   "food": "Lamb Mutton",
   "emissions per kg": "24 "
 },
 {
   "food": "Cheese",
   "emissions per kg": "21 "
 },
 {
   "food": "Beef",
   "emissions per kg": "21 "
 },
 {
   "food": "Chocolate",
   "emissions per kg": "19 "
 },
 {
   "food": "Coffee",
   "emissions per kg": "17 "
 },
 {
   "food": "Prawns (farmed)",
   "emissions per kg": "12 "
 },
 {
   "food": "Palm Oil",
   "emissions per kg": "8 "
 },
 {
   "food": "Pig Meat pork bacon",
   "emissions per kg": "7 "
 },
 {
   "food": "Poultry chicken Meat",
   "emissions per kg": "6 "
 },
 {
   "food": "Olive Oil",
   "emissions per kg": "6 "
 },
 {
   "food": "Fish (farmed)",
   "emissions per kg": "5 "
 },
 {
   "food": "Eggs",
   "emissions per kg": "4.5 "
 },
 {
   "food": "Rice",
   "emissions per kg": "4 "
 },
 {
   "food": "Fish (wild catch)",
   "emissions per kg": "3 "
 },
 {
   "food": "Milk",
   "emissions per kg": "3 "
 },
 {
   "food": "Cane Sugar",
   "emissions per kg": "3 "
 },
 {
   "food": "Groundnuts Peanut Peanuts",
   "emissions per kg": "2.5 "
 },
 {
   "food": "Wheat Rye",
   "emissions per kg": "1.4 "
 },
 {
   "food": "Tomatoes Tomato",
   "emissions per kg": "1.4 "
 },
 {
   "food": "Maize (Corn)",
   "emissions per kg": "1.0 "
 },
 {
   "food": "Cassava",
   "emissions per kg": "1.0 "
 },
 {
   "food": "Soymilk",
   "emissions per kg": "0.9 "
 },
 {
   "food": "Peas",
   "emissions per kg": "0.9 "
 },
 {
   "food": "Bananas Banana",
   "emissions per kg": "0.7 "
 },
 {
   "food": "Root Vegetables carrot carrots parsnips parsnip potato potatoes beet beets celery turnip turnips kohlrabi rutabaga radish horseradish onion onions garlic clove",
   "emissions per kg": "0.4 "
 },
 {
   "food": "Apples",
   "emissions per kg": "0.4 "
 },
 {
   "food": "Citrus Fruits lemon lime",
   "emissions per kg": "0.3 "
 },
 {
   "food": "Nuts almonds cashew cashews hazelnuts macadamias pecans pine pistachios",
   "emissions per kg": "0.3 "
 },
 {
   "food": "turkey",
   "emissions per kg": "4.5 "
 },
 {
   "food": "coffee",
   "emissions per kg": "1.66 "
 },
 {
   "food": "beans",
   "emissions per kg": ".95 "
 },
 {"food": "tea",
  "emissions per kg": "1.9 kg"
  }
]

itemList = []
priceList = []

for (let item in items) {
  itemList.push(items[item].innerHTML);
}

for (let price in prices) {
  priceList.push(prices[price].innerHTML);
}

for (let i=0; i < prices.length; i++) {
  let wrapper = document.createElement("div");
  let co2Amount = document.createElement("div");
  let co2Num = document.createElement("div");
  let n = calculateEmissions(itemList[i]);

  let subscript = document.createElement("sub");
  subscript.append("2");

  wrapper.setAttribute("style", "font-size: 20px; font-weight: bold; display: flex; flex-wrap: wrap; overflow-wrap: break-word;")

  co2Amount.setAttribute("style", 'align-items: baseline; overflow-wrap: break-word;');
  co2Num.setAttribute("style", `color: ${getColor(n)}; padding-right: 7px; overflow-wrap: break-word;`)
  co2Num.append(n);
  co2Amount.append(`kg of CO`)
  co2Amount.append(subscript);
  wrapper.append(co2Num);
  wrapper.append(co2Amount);
  prices[i].parentNode.insertBefore(wrapper, prices[i]);
}


function getColor(num) {
  if (num > 5) {
    return '#bf0800';
  }
  else if (num > 3) {
    return '#ffba00';
  }
  else if (num > 0) {
    return '#3ed038';
  }
  return 'black';
}

function convertWeight(weight, unit) {
  let w = (weight.replace( /^\D+/g, ''));
  if (('kg kg.').includes(unit.toLowerCase())) {
    return (w);
  }
  else if (('oz oz. ounce ounces fl fl. fl.oz').includes(unit.toLowerCase())) {
    return (`${w*0.0283495}`);
  }
  else if (('lb lb. lbs lbs. pound pounds').includes(unit.toLowerCase())) {
    return (`${w*0.453592}`);
  }
  else {
    return 0;
  }
}

function getWeight(foodTitle) {
  let i = -1;
  foodWords = foodTitle.split(" ");
  for (let food in foodWords) {
    if (("lb oz kg oz. lb. kg. ounce ounces pounds pound lbs. lbs fl fl. fl.oz").includes(foodWords[food].toLowerCase())) {
      i = food
      return convertWeight(foodWords[i-1], foodWords[i])
    }
  }
  return 0;
}

function calculateEmissions(foodItem) {
  for (let item in fp) {
    let foodWords = fp[item]["food"].split(" ")
    for (let word in foodWords) {
      if (foodItem.toLowerCase().includes(foodWords[word].toLowerCase())) {
        if (getWeight(foodItem) != 0) {
          return Math.round(getWeight(foodItem) * parseFloat(fp[item]["emissions per kg"])*100)/100
        }
      }
    }
  }
  return 'unknown';
}


const addToCartButtons = document.querySelectorAll('.a-section.a-spacing-none.a-spacing-top-mini');

for (let button = 0; button < addToCartButtons.length-1; button++) {
  let wrapper = document.createElement("div");
  wrapper.setAttribute('style', 'display: flex;');
  let newButton = document.createElement("a");
  newButton.setAttribute("style", "width: 90px; height: 30px; background: #fad813; border-radius: 10px; margin-left: 20px; margin-top: 4px; outline: 1px #D2B11E; text-decoration: none; align: right;")
  newButton.setAttribute("href", "https://dexterrenick.com/amazonfreshplugin/index.html")
  // newButton.setAttribute("target", "_blank")
  // newButton.setAttribute("rel", "noopener noreferrer")

  let buttonText = document.createElement("div")
  buttonText.setAttribute("style", "padding-top: 1px; color: black; font-size: 8px; overflow-wrap: break-word; line-height: 9px; text-align: center;");
  buttonText.append('Learn About Your Groceries Carbon Emissions');
  newButton.append(buttonText);
  let buttonCopy = addToCartButtons[button].cloneNode(true);

  wrapper.append(buttonCopy);
  wrapper.append(newButton);
  addToCartButtons[button].parentNode.insertBefore(wrapper, addToCartButtons[button]);
  addToCartButtons[button].parentElement.removeChild(addToCartButtons[button])
}


// Clone Carousel
try {
  const itemCarousels = document.querySelectorAll('.celwidget');
  let carouselCopy = itemCarousels[1].cloneNode(true);
  let title = carouselCopy.querySelectorAll('.a-carousel-heading.a-inline-block.a-text-bold')
  let titleText = document.createElement("div");
  title[0].outerText = 'Shop more sustainably';
  itemCarousels[0].parentNode.insertBefore(carouselCopy, itemCarousels[0]);
}
catch (exception_var) {
}






const cartItems = document.querySelectorAll('.a-truncate.a-size-base-plus');
let totalEmissions = 0;
for(let item = 0; item < cartItems.length-1; item++) {
  let e = calculateEmissions(cartItems[item].firstChild.innerHTML);
  if (e != 'unknown') {
    totalEmissions += calculateEmissions(cartItems[item].firstChild.innerHTML);
    console.log(totalEmissions);
  }
}


// Clone Carousel
try {
  const cartTitle = document.querySelectorAll('.a-section.a-padding-small');
  console.log(cartTitle);
  let totalEmissionsText = document.createElement("div");
  let wr = document.createElement("div");
  wr.setAttribute("style", "display: flex");
  totalEmissionsText.append('Estimate of Cart Total Emissions: ');
  totalEmissionsText.append(totalEmissions);

  let subscript = document.createElement("sub");
  subscript.append("2");

  totalEmissionsText.append(`kg of CO`);
  totalEmissionsText.append(subscript);
  wr.append(totalEmissionsText);

  totalEmissionsText.setAttribute("style", "font-size: 24px; font-weight: bold; padding-left: 40px; padding-top: 20px;")
  cartTitle[0].parentNode.insertBefore(wr, cartTitle[0]);
}
catch (exception_var) {
}
