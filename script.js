(function($){
$.fn.game2048 = function(size){
    var score = 0;

    function createGrid(size) { //Création de la grille de jeu
        var i = 0;
        var j = 0;
        $("table").remove()
        $("#score").remove()
        $('.games').append("<table></table>")
        for(i=0;i<size;i++) {
            $("table").append("<tr></tr>");
            for(j=0;j<size;j++) {
                $("tr").last().append("<td empty = 1 value = 0 row = "+i+" col ="+j+"></td>");
            }
        }
        $('body').append('<div id = "score">Your score : 0</div>')
        color()
    }

    function newNumber(size){ //Apparition d'une case 2 ou 4 aléatoire
        var proba = Math.round(Math.random() * ((5) - 1) + 1);
        var nbEmpty = $("td[empty='1']").length;
        var random = Math.floor(Math.random()*nbEmpty);
        var tile = $("td[empty='1']").eq(random);
        if (proba <= 4) {
            $(tile).html("2");
            $(tile).attr("value", "2");
            $(tile).attr("empty", "0");
            canMove = true;
        }
        else {
            $(tile).html("4");
            $(tile).attr("value", "4");
            $(tile).attr("empty", "0");
            canMove = true;
        }
        color()
    }

     function combine(source, target) { //gère la fusion de 2 cases
        newValue = $(source).html() * 2;
        $(target).attr("value", newValue)
        $(source).attr("value", "0")
        $(source).attr("empty", "1");
        score = score + newValue //on incrémente le score
        $('#score').html('Your score: '+score); //affiche le score
    }

    function moveLeft(size) { //gère le switch vers la gauche
            var i = 0
            var j = 0
            var k = 0
            while (i < size) {
                j = 0
                k = 0
                while(k < (size - 1)){
                    j = 0;
                    if ($('td[col='+k+'][row='+i+']').attr("empty") == $('td[col='+(k+1)+'][row='+i+']').attr("empty")) {
                        if ($('td[col='+k+'][row='+i+']').attr("value") != 0) {
                            while (j < (size - 1)) {
                                if ( $('td[col='+j+'][row='+i+']').attr("value") == $('td[col='+(j+1)+'][row='+i+']').attr("value") && $('td[col='+j+'][row='+i+']').attr("value") != 0) {
                                    combine($('td[col='+(j+1)+'][row='+i+']'), $('td[col='+j+'][row='+i+']'))
                                    isMoved = true
                                }
                                j++
                            }
                        }
                        k++
                        j = 0
                    }
                    else if ($('td[col='+k+'][row='+i+']').attr("empty") == '1' && $('td[col='+(k+1)+'][row='+i+']').attr("empty") == '0') {
                        while (j < (size - 1)) {
                            if ( $('td[col='+j+'][row='+i+']').attr("empty") == '1' &&  $('td[col='+(j+1)+'][row='+i+']').attr("empty") == '0') {
                                $('td[col='+j+'][row='+i+']').attr("value", ($('td[col='+(j+1)+'][row='+i+']').attr("value")))
                                $('td[col='+j+'][row='+i+']').attr("empty", "0");
                                $('td[col='+(j+1)+'][row='+i+']').attr("empty", "1")
                                isMoved = true

                            }
                            else if ( $('td[col='+j+'][row='+i+']').attr("value") == $('td[col='+(j+1)+'][row='+i+']').attr("value") && $('td[col='+j+'][row='+i+']').attr("value") != 0) {
                                combine($('td[col='+(j+1)+'][row='+i+']'), $('td[col='+j+'][row='+i+']'))
                                isMoved = true
                            }
                            j++
                        }
                        k = 0
                    }
                    else if ($('td[col='+k+'][row='+i+']').attr("empty") == '0' && $('td[col='+(k+1)+'][row='+i+']').attr("empty") == '1') {
                        k++
                        j = 0
                    }
                j = 0
                while (j < (size)) {
                    color()
                    if ($('td[col='+j+'][row='+i+']').attr("empty") == 1)
                            $('td[col='+j+'][row='+i+']').attr("value", 0)
                    if ($('td[col='+j+'][row='+i+']').attr("value") != 0)
                        $('td[col='+j+'][row='+i+']').html($('td[col='+j+'][row='+i+']').attr("value"))
                    else if ($('td[col='+j+'][row='+i+']').attr("value") == 0)
                        $('td[col='+(j)+'][row='+i+']').html(' ')
                    j++
                }
            }
            i++
        }
    }

    function moveRight(size) { //gère le switch vers la droite
        var i = 0
        var j = size -1
        var k = size -1
        while (i < size) {
            j = size -1
            k = size -1
            while(k >= 0){
                j = size -1;
                if ((k) != 0) {
                    if ($('td[col='+k+'][row='+i+']').attr("empty") == $('td[col='+(k-1)+'][row='+i+']').attr("empty")) {
                        if ($('td[col='+k+'][row='+i+']').attr("value") != 0) {
                            while (j > 0) {
                                if ( $('td[col='+j+'][row='+i+']').attr("value") == $('td[col='+(j-1)+'][row='+i+']').attr("value") && $('td[col='+j+'][row='+i+']').attr("value") != 0) {
                                    combine($('td[col='+(j-1)+'][row='+i+']'), $('td[col='+j+'][row='+i+']'))
                                    isMoved = true
                                }
                                j--
                            }
                        }
                        k--
                        j = size -1
                    }
                    else if ($('td[col='+k+'][row='+i+']').attr("empty") == '1' && $('td[col='+(k-1)+'][row='+i+']').attr("empty") == '0') {
                        while (j >= 0) {
                            if ( $('td[col='+j+'][row='+i+']').attr("empty") == '1' &&  $('td[col='+(j-1)+'][row='+i+']').attr("empty") == '0') {
                                $('td[col='+j+'][row='+i+']').attr("value", ($('td[col='+(j-1)+'][row='+i+']').attr("value")))
                                $('td[col='+j+'][row='+i+']').attr("empty", "0");
                                $('td[col='+(j-1)+'][row='+i+']').attr("empty", "1")
                                isMoved = true
                            }
                            else if ( $('td[col='+j+'][row='+i+']').attr("value") == $('td[col='+(j-1)+'][row='+i+']').attr("value") && $('td[col='+j+'][row='+i+']').attr("value") != 0) {
                                combine($('td[col='+(j-1)+'][row='+i+']'), $('td[col='+j+'][row='+i+']'))
                                isMoved = true
                            }
                            j--
                        }
                        k = size -1
                    }
                    else if ($('td[col='+k+'][row='+i+']').attr("empty") == '0' && $('td[col='+(k-1)+'][row='+i+']').attr("empty") == '1') {
                        k--
                        j = size -1
                    }
                j = size -1
                while (j >= 0) {
                    if ($('td[col='+j+'][row='+i+']').attr("empty") == 1)
                            $('td[col='+j+'][row='+i+']').attr("value", 0)
                    if ($('td[col='+j+'][row='+i+']').attr("value") != 0)
                        $('td[col='+j+'][row='+i+']').html($('td[col='+j+'][row='+i+']').attr("value"))
                    else if ($('td[col='+j+'][row='+i+']').attr("value") == 0)
                        $('td[col='+(j)+'][row='+i+']').html(' ')
                    j--
                }
            }
            else
                break
        }
        i++
    }
}

function moveUp(size) { //gère le switch vers le haut
        var i = 0
        var j = 0
        var k = 0
        while (i < size) {
            j = 0
            k = 0
            while(k < (size - 1)){
                j = 0;
                if ($('td[row='+k+'][col='+i+']').attr("empty") == $('td[row='+(k+1)+'][col='+i+']').attr("empty")) {
                    if ($('td[row='+k+'][col='+i+']').attr("value") != 0) {
                        while (j < (size - 1)) {
                            if ( $('td[row='+j+'][col='+i+']').attr("value") == $('td[row='+(j+1)+'][col='+i+']').attr("value") && $('td[row='+j+'][col='+i+']').attr("value") != 0) {
                                combine($('td[row='+(j+1)+'][col='+i+']'), $('td[row='+j+'][col='+i+']'))
                                isMoved = true
                            }
                            j++
                        }
                    }
                    k++
                    j = 0
                }
                else if ($('td[row='+k+'][col='+i+']').attr("empty") == '1' && $('td[row='+(k+1)+'][col='+i+']').attr("empty") == '0') {
                    while (j < (size - 1)) {
                        if ( $('td[row='+j+'][col='+i+']').attr("empty") == '1' &&  $('td[row='+(j+1)+'][col='+i+']').attr("empty") == '0') {
                            $('td[row='+j+'][col='+i+']').attr("value", ($('td[row='+(j+1)+'][col='+i+']').attr("value")))
                            $('td[row='+j+'][col='+i+']').attr("empty", "0");
                            $('td[row='+(j+1)+'][col='+i+']').attr("empty", "1")
                            isMoved = true
                        }
                        else if ( $('td[row='+j+'][col='+i+']').attr("value") == $('td[row='+(j+1)+'][col='+i+']').attr("value") && $('td[row='+j+'][col='+i+']').attr("value") != 0) {
                            combine($('td[row='+(j+1)+'][col='+i+']'), $('td[row='+j+'][col='+i+']'))
                            isMoved = true
                        }
                        j++
                    }
                    k = 0
                }
                else if ($('td[row='+k+'][col='+i+']').attr("empty") == '0' && $('td[row='+(k+1)+'][col='+i+']').attr("empty") == '1') {
                    k++
                    j = 0
                }
            j = 0
            while (j < (size)) {
                if ($('td[row='+j+'][col='+i+']').attr("empty") == 1)
                        $('td[row='+j+'][col='+i+']').attr("value", 0)
                if ($('td[row='+j+'][col='+i+']').attr("value") != 0)
                    $('td[row='+j+'][col='+i+']').html($('td[row='+j+'][col='+i+']').attr("value"))
                else if ($('td[row='+j+'][col='+i+']').attr("value") == 0)
                    $('td[row='+(j)+'][col='+i+']').html(' ')
                j++
            }
        }
        i++
    }
}

    function moveDown(size) {
      var i = 0
      var j = size -1
      var k = size -1
      while (i < size) {
          j = size -1
          k = size -1
          while(k >= 0){
              j = size -1;
              if ((k) != 0)
              {
                  if ($('td[row='+k+'][col='+i+']').attr("empty") == $('td[row='+(k-1)+'][col='+i+']').attr("empty")) {
                      if ($('td[row='+k+'][col='+i+']').attr("value") != 0) {
                          while (j > 0) {
                              if ( $('td[row='+j+'][col='+i+']').attr("value") == $('td[row='+(j-1)+'][col='+i+']').attr("value") && $('td[row='+j+'][col='+i+']').attr("value") != 0) {
                                  combine($('td[row='+(j-1)+'][col='+i+']'), $('td[row='+j+'][col='+i+']'))
                                  isMoved = true
                              }
                              j--
                          }
                      }
                      k--
                      j = size -1
                  }
                  else if ($('td[row='+k+'][col='+i+']').attr("empty") == '1' && $('td[row='+(k-1)+'][col='+i+']').attr("empty") == '0') {
                      while (j >= 0) {
                          if ( $('td[row='+j+'][col='+i+']').attr("empty") == '1' &&  $('td[row='+(j-1)+'][col='+i+']').attr("empty") == '0') {
                              $('td[row='+j+'][col='+i+']').attr("value", ($('td[row='+(j-1)+'][col='+i+']').attr("value")))
                              $('td[row='+j+'][col='+i+']').attr("empty", "0");
                              $('td[row='+(j-1)+'][col='+i+']').attr("empty", "1")
                              isMoved = true
                          }
                          else if ( $('td[row='+j+'][col='+i+']').attr("value") == $('td[row='+(j-1)+'][col='+i+']').attr("value") && $('td[row='+j+'][col='+i+']').attr("value") != 0) {
                              combine($('td[row='+(j-1)+'][col='+i+']'), $('td[row='+j+'][col='+i+']'))
                              isMoved = true
                          }
                          j--
                      }
                      k = size -1
                  }
                  else if ($('td[row='+k+'][col='+i+']').attr("empty") == '0' && $('td[row='+(k-1)+'][col='+i+']').attr("empty") == '1') {
                      k--
                      j = size -1
                  }
              j = size -1
              while (j >= 0) {
                  if ($('td[row='+j+'][col='+i+']').attr("empty") == 1)
                          $('td[row='+j+'][col='+i+']').attr("value", 0)
                  if ($('td[row='+j+'][col='+i+']').attr("value") != 0)
                      $('td[row='+j+'][col='+i+']').html($('td[row='+j+'][col='+i+']').attr("value"))
                  else if ($('td[row='+j+'][col='+i+']').attr("value") == 0)
                      $('td[row='+(j)+'][col='+i+']').html(' ')
                  j--
              }
          }
          else
              break
      }
      i++
    }
  }

    function winOrLoose (size, isMoved) { //vérifie si les condition de victoire ou défaites sont atteintes
        var i = 0
        var j = 0
        var tmp = 0
        var nbEmpty = $("td[empty='1']").length;

        while (i < size - 1) {
            while (j < size -1) {
                if ( $('td[row='+i+'][col='+j+']').attr("value") >= tmp )
                    tmp = $('td[row='+i+'][col='+j+']').attr("value")
                j++
            }
            i++
        }
        if (isMoved == false && nbEmpty == 0) {
            alert("Sorry, youu loose... Try again !")
        }
        if ( tmp == 2048)
            alert(" GG, you win ! You can try again or try to have the best score...")

        return tmp
    }

    function color() { //Colorie les cases en fonction de leur valeur
        $("td[value='0']").css('background-color', 'white')
        $("td[value='2']").css('background-color', '#EFEFEF')
        $("td[value='4']").css('background-color', '#DCDCDC')
        $("td[value='8']").css('background-color', '#CECECE')
        $("td[value='16']").css('background-color', '#C0C0C0')
        $("td[value='32']").css('background-color', '#A9A9A9')
        $("td[value='64']").css('background-color', '#9E9E9E')
        $("td[value='128']").css('background-color', '#9E9E9E')
        $("td[value='256']").css('background-color', '#808080')
        $("td[value='512']").css('background-color', '#5A5E6B')
        $("td[value='1024']").css('background-color', '#303030')
        $("td[value='2048']").css('background-color', 'black')
        $("td[value='2048']").css('color', 'white')
    }

    $('html').keydown(function(event) { //Appel des fonction move en fonction de l'instruction donné
        if (canMove){
            isMoved = false;
            canMove = false;
            switch(event.keyCode) {
                case 37:
                    moveLeft(size);
                    break;
                case 39:
                    moveRight(size)
                    break;
                case 38:
                    moveUp(size)
                    break;
                case 40:
                    moveDown(size)
                    break;
                default:
            }
            color()
            canMove = true
            winOrLoose(size, isMoved)
            if (isMoved) {
                    newNumber(size);
                    isMoved = false
                }
        }
    })

    $(this).append(createGrid(size));
    newNumber(size);
    newNumber(size);

}
})(jQuery);
