const cards = document.querySelectorAll('.card');


let Game = [];
let GameBet = [];
let Level = 0;
let Reset = 0;

function flipCard() {
    Level = Level + 1;
    console.log($(this).hasClass("flip"));
    this.classList.toggle('flip');
}
$('#bet-start').click(function() {
    Random = random();
    var numItem = 0;
    Random.forEach(function(item, index) {
        const $cell = $(`.card[data-row=${item}]`);
        const $factor = $(`.factor[data-row=${numItem}]`);
        if ($cell.children(".back-face").hasClass("selected")) {
            $cell.children(".back-face").addClass('hit');
            $factor.children(".num").addClass('hit');
            numItem = numItem + 1;
            Reset = 1;
        } else {
            $cell.children(".back-face").addClass('result');
        }
    });
    Level = 0;
    Reset = 1;
    $(this).addClass('disabledbutton');
    $('.card').each(function(i, item) {
        $(item).removeClass('hidden');

    });

});

$('.card').click(function() {
    if (Reset == 1) {
        reset();
        Reset = 0;
    }

    if ($(this).children(".back-face").hasClass("selected")) {
        $(this).children(".back-face").removeClass('selected');

        Level = Level - 1;
        removeValueBet();
    } else {
        if (Level < 10) {
            $(this).children(".back-face").addClass('selected');
            addValueBet()
            Level = Level + 1;

        }
    }
    $('#bet-start').removeClass('disabledbutton');
});




function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}



function reset() {
    Level = 0;
    const $cell = $(`.factor`);

    $cell.remove();

    $('.card').each(function(i, item) {
        $(item).children(".back-face").removeClass('selected hit result');


    });


    $('#bet-start').removeClass('disabledbutton');
}



function addValueBet() {
    const $board = $('#result-bet');

    var $row = $('<div>').addClass('factor ng-star-inserted').attr('data-row', Level);
    const $col = $('<div>')
        .addClass('num')
        .text(Level + 1);

    $row.append($col);
    const $lbl = $('<div>')
        .addClass('lbl')
        .text('21.00x');

    $row.append($lbl);
    $board.append($row);
}

function removeValueBet() {
    const $cell = $(`.factor[data-row=${Level}]`);

    $cell.remove();
}

function random() {
    var arr = [];
    while (arr.length < 10) {
        var r = Math.floor(Math.random() * 36);
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;

}
$('#bet-start').addClass('disabledbutton');