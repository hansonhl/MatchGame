var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function () {
    var cardValues = MatchGame.generateCardValues();
    MatchGame.renderCards(cardValues, $('#game').find('.row'))
})

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
    var arr = [];
    for (var i = 1; i < 9; i++) {
        arr[2 * i - 2] = i;
        arr[2 * i - 1] = i;
    }

    var ranarr = [];
    var index;
    var num;
    while (arr.length > 0) {
        index = Math.floor(Math.random() * arr.length);
        num = arr[index];
        arr.splice(index, 1);
        ranarr.push(num);
    }
    return ranarr;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
    $game.empty();
    $game.data("flippedCards", []);
    var hsllist = [25, 55, 90, 160, 220, 265, 310, 360];
    var colors = [];
    for (var i = 0; i < hsllist.length; i++) {
        colors[i] = 'hsl(' + hsllist[i] + ', 85%, 65%)';
    }

    // set state for unflipped cards
    for (var i = 0; i < cardValues.length; i++) {
        var $card = $('<div class="card col-3"><h1></h1></div>');
        $card.data("val", cardValues[i]);
        $card.data("flipped", false);
        var colorindex = cardValues[i] - 1;
        var color = colors[colorindex];
        $card.data("color", color);
        $game.append($card);
    }

    // event listener if cards are clicked
    $('div.card').click(function() {
        MatchGame.flipCard($(this), $game);
    });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
    var cardState = $card.data("flipped");
    if (cardState)
        return;
    $card.data("flipped", true);
    var color = $card.data("color");
    var val = $card.data("val");
    $card.css("background-color", color);
    $card.find("h1").text(val);

    var flippedCards = $game.data("flippedCards");
    flippedCards.push($card);
    if (flippedCards.length >= 2) {
        var $old = flippedCards[0];
        var $curr = flippedCards[1];
        var oldVal = $old.data("val");
        var currVal = $curr.data("val");
        if (oldVal === currVal) {
            $curr.css("background-color", "rgb(153,153,153)");
            $curr.find("h1").css("color", "rgb(204,204,204)");
            $old.css("background-color", "rgb(153,153,153)");
            $old.find("h1").css("color", "rgb(204,204,204)");
        } else {
            setTimeout(function () {
                $curr.css("background-color", "rgb(32, 64, 86)");
                $curr.find("h1").text("");
                $curr.data("flipped", false);
                $old.css("background-color", "rgb(32, 64, 86)");
                $old.find("h1").text("");
                $old.data("flipped", false);
            }, 350);
        }
        $game.data("flippedCards", []);
    }

};
