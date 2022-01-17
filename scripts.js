function calculateAmount() {
  let vegsPizza = document.getElementById('vegs').value;
  let befsPizza = document.getElementById('befs').value;
  let hamsPizza = document.getElementById('hams').value;
  let magsPizza = document.getElementById('mags').value;
  let hawsPizza = document.getElementById('haws').value;
  let topsPizza = document.getElementById('tops').value;
  let mozsPizza = document.getElementById('mozs').value;
  let pepsPizza = document.getElementById('peps').value;
  let whitesPizza = document.getElementById('whites').value;
  if (vegsPizza > 0) {
    return [vegsPizza, 'Vegetable Pizza'];
  } else if (befsPizza > 0) {
    return [befsPizza, 'BBQ Pizza'];
  } else if (hamsPizza > 0) {
    return [hamsPizza, 'Hamburger Pizza'];
  } else if (magsPizza > 0) {
    return [magsPizza, 'Magharitta Pizza'];
  } else if (hawsPizza > 0) {
    return [hawsPizza, 'Hawaiian Pizza'];
  } else if (topsPizza > 0) {
    return [topsPizza, 'Topian Pizza'];
  } else if (mozsPizza > 0) {
    return [mozsPizza, 'Mozarella Pizza'];
  } else if (pepsPizza > 0) {
    return [pepsPizza, 'Pepperoni Pizza'];
  } else if (whitesPizza > 0) {
    return [whitesPizza, 'White Pizza'];
  } else {
    alert("please specify quantity");
    $("#choice").modal("hide");
  }
}

class calcAll {
  constructor(pieces, size, crust, toppings) {
    this.pieces = pieces;
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
    this.totals = [];
  }
}

class totalCost {
  constructor(total) {
    this.total = total;
  }
}

$(document).ready(function () {
  $("#addCart").click(function () {
    let pizzaSelection = calculateAmount();
    let pizzaQuantity = pizzaSelection[0];
    let pizzaSize = parseInt($("#size").val());
    let pizzaCrustChoice = parseInt($("#crust").val()) * pizzaSelection[0];
    let pizzaToppingsChoice = parseInt($("#toppings").val()) * pizzaSelection[0];
    let size = $("#size option:selected").text();
    let crust = $("#crust option:selected").text();
    let toppings = $("#toppings option:selected").text();
    let price = pizzaSelection[0];
    let name = pizzaSelection[1]
    let total = pizzaQuantity * pizzaSize + pizzaCrustChoice + pizzaToppingsChoice;
    if (pizzaQuantity > 0) {
      document.getElementById("veg").reset();
      document.getElementById("bef").reset();
      document.getElementById("ham").reset();
      document.getElementById("mag").reset();
      document.getElementById("haw").reset();
      document.getElementById("top").reset();
      document.getElementById("moz").reset();
      document.getElementById("pep").reset();
      document.getElementById("white").reset();
    }
    const finalCalc = new calcAll(pizzaQuantity, pizzaSize, pizzaCrustChoice, pizzaToppingsChoice, total);
    finalCalc.totals.push(total);
    let sum = 0;

    $('#cart li').each(function () {
      finalCalc.totals.push(total);
    });
    $.each(finalCalc.totals, function () {
      sum += this;
    });
    $("#cart").append(name + "</br>" + crust + " </br>" + size + " " + toppings + "</br>" + " Quantity: " + price + "</br>" + "$" + finalCalc.totals + "</br>");
    $("#total").text("TOTAL: $" + sum);
    $("#deliver").html('<button id="setlocation" class="btn-cust2 blink_me">Want it Delivered?</button>');
    $("#setlocation").click(function () {
      $("#location").toggle();
    });
    $("#checkout").html('</br><button type="button" class="btn btn-cust2" data-bs-toggle="modal" data-bs-target="#myModal">Checkout</button>');
    $("#location").hide();
    $("#location").html('<form><select id="delivery"><option value="0">no delivery</option><option value="200">delivery</option></select></form>');
    $("#checkout").click(function () {
      let deliveryOption = $('#delivery').find(":selected").val();
      let cost = parseInt($("#delivery").val()) + sum;
      console.log(deliveryOption);
      if (deliveryOption === "200") {
        let setLocation =  prompt("enter location");
        alert("Pizza will be delivered to " + setLocation.toUpperCase());
      }
      $("#message").text("Total Cost: $" + cost);
      $('#reset').click(function () {
        location.reload();
      });
    });
  });
});