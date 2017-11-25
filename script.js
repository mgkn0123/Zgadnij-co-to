$(document).ready(function () {
    var lista_hasel = [
        "gra o tron",
        "drzewo owocowe",
        "brudna forsa",
        "konik na biegunach",
        "piłka nożna",
        "złota rączka",
        "pies ogrodnika",
        "burza mózgów",
        "minionki",
        "droga do nieba",
        "kominiarz",
        "pomoc domowa",
        "napój gazowany",
        "droga krzyżowa",
        "czerwony jak burak",
        "kołobrzeg",
        "ognisko domowe",
        "biała śmierć",
        "cisza nocna",
        "masaż serca"
    ];
    
    var ilosc_hasel = lista_hasel.length;
    var id_aktualne_haslo = 0;
    var zebrane_punkty = 250;
    var haslo = lista_hasel[id_aktualne_haslo];
    haslo = haslo.toUpperCase();
    var dlugosc = haslo.length;
    var ilosc_wprowadzonych_liter = 0;
    var maska = [];
    var ilosc_liter = 0; //ilość liter w haśle
    var haslo_only_letters = [];
    var wylosowane_literki = "";
    var wprowadzone = [];
    var ID_letter;


//////////////  RYSOWANIE PLANSZY 
    function wyswietlNumerHasla() {
        $("#id_aktualne_haslo").text(id_aktualne_haslo + 1);
        $("#ilosc_hasel").text(ilosc_hasel);
    }

    function wyswietlPunkty() {
        $("#ilosc_punktow").text(zebrane_punkty);
    }

    function wyswietlObraz() {
        $("#image-box").html("<img id=\"image\" src=\"image/" + id_aktualne_haslo + ".png\" alt=\"Obraz\"/>");

    }

    function wyswietlMaske() {
        for (i = 0; i < dlugosc; i++) {
            if (haslo.charAt(i) === " ") {
                $("#haslo").append('<div class="letter-mask-space"></div>');
            } else {
                maska[ilosc_liter] = '-';
                $("#haslo").append('<div class="letter-mask" id="letter-mask_' + ilosc_liter + '"></div>');
                haslo_only_letters[ilosc_liter] = haslo.charAt(i);
                ++ilosc_liter;
            }
        }
        $(".letter-mask").css({"width": "40px", "height": "45px", "background": "transparent", "color": "white", "text-align": "center", "border-bottom": "2px solid white", "display": "inline-block", "margin": "5px"});
        $(".letter-mask-space").css({"width": "32px", "height": "45px", "color": "transparent", "background": "transparent", "display": "inline-block", "margin": "0px"});
        for (var i = 0; i < maska.length; i++)
            wprowadzone[i] = maska[i];
    }


    function LosujOnlyLiterki() {
        //losowanie cyfr
        var numbers = [];
        for (i = 0; i < ilosc_liter; i++)
            numbers[i] = i;
        var n = ilosc_liter;
        var k = ilosc_liter;
        var i = 0;
        while (i < k) {
            var r = Math.floor(Math.random() * ((n - 1) + 1));
            var wylosowana = numbers[r];
            wylosowane_literki += haslo_only_letters[wylosowana];  //zamiana cyfr na literki
            numbers[r] = numbers[n - 1];
            n--;
            i++;
        }
    }


    function wyswietlLiterki() {
        // wyświetlanie literek
        var j;
        for (j = 0; j < ilosc_liter; j++) {
            $("#literki").append('<div class="literka" id="literka' + j + '">' + wylosowane_literki.charAt(j) + '</div>');

        }
    }

////////////// WCZYTYWANIE LITEREK
    function wczytajHaslo() {
        var klieknieta_literka = "";
        var id_literki = "";
        var r = 0;
        $(".literka").click(function () {     //sprawdzam wybraną literkę
            klieknieta_literka = this.innerHTML;
            id_literki = this.id;

            $("#" + id_literki).hide();

            for (r = 0; r < ilosc_liter; r++) {
                if (wprowadzone[r] === '-') {
                    wprowadzone[r] = klieknieta_literka;
                    break;
                }
            }
            $("#letter-mask_" + r).css({"border": "none", "width": "auto", "cursor": "pointer"});
            $("#letter-mask_" + r).text(klieknieta_literka);
            $("#letter-mask_" + r).attr("title", "Usuń literkę");
            if (ilosc_liter === ilosc_wprowadzonych_liter)
                $("#losowa_litera").css({"color": "red", "cursor": "auto"});
            if (wprowadzone[0] !== "-")
                $("#pierwsza_litera").css({"color": "red", "cursor": "auto"});
            sprawdzHaslo();
            //alert('wprowadzone: '+ wprowadzone);
        });
        usunLiterke();
    }


////////////// USUWANIE LITEREK
    function usunLiterke() {
        $('.letter-mask').click(function () {
            //alert(this.innerHTML);
            var letter_content = this.innerHTML;
            if ((letter_content !== "") && ($(this).css('color') !== 'rgb(0, 128, 0)')) {
                this.innerHTML = "";
                $(this).css({"width": "40px", "height": "45px", "background": "transparent", "color": "white", "text-align": "center",
                    "border-bottom": "2px solid white", "display": "inline-block", "margin": "5px", "cursor": "auto"});
                ID_letter = this.id.replace('letter-mask_', '');
                //alert('ID literki: '+ID_letter);
                wprowadzone[ID_letter] = '-';
                //alert('letter_content: '+letter_content);
                //alert('wprowadzone: ' + wprowadzone);
                // zwracanie literek do #literki
                var literki_node = document.querySelector('#literki');
                ilosc_wprowadzonych_liter--;
                for (j = 0; j < ilosc_liter; j++) {
                    if (literki_node.childNodes[j].textContent === letter_content) {
                        //alert('twoja literka '+literki_node.childNodes[j].textContent + " nodeName= "+ literki_node.childNodes[j].nodeName);
                        if (literki_node.childNodes[j].style.display === "none") {
                            literki_node.childNodes[j].setAttribute("style", "display:inline-block;  ");
                            break;
                        }
                    }
                }
                
                if (wprowadzone[0] !== "-")
                    $("#pierwsza_litera").css({"color": "red", "cursor": "auto"});
                else
                    $("#pierwsza_litera").css({"color": "white", "cursor": "pointer"});
            }
        });
    }

    function sprawdzHaslo() {
        //alert(id_aktualne_haslo);
        //alert(ilosc_hasel);
        for (r = 0; r < ilosc_liter; r++) {
            if (wprowadzone[r] === '-') {
                break;
            }
            if (r === (ilosc_liter - 1)) {
                var czyOk = 1;
                for (i = 0; i <= ilosc_liter; i++) {
                    if (wprowadzone[i] !== haslo_only_letters[i]) {
                        czyOk = 0;
                        break;
                    }
                }              
                if ((id_aktualne_haslo + 1) === ilosc_hasel) {
                    $("#image-box").fadeOut();
                    $("#haslo").fadeOut();
                    $("#literki").fadeOut();
                    $("#podpowiedz").fadeOut();
                    $(".game-end").fadeIn(200);
                } else {
                    if ((czyOk === 1)) {
                        $("#literki").append('<div class="btn-nastepny"> Dalej >> </div>');
                        $(".letter-mask").css({"border": "none", "width": "auto", "cursor": "auto", "color": "green"});
                        $("#losowa_litera").css({"color": "red", "cursor": "auto"});
                        zebrane_punkty += 10;
                        wyswietlPunkty();
                        nastepneHaslo();
                    } else {
                        $("#literki").append('<div class="btn-zle" title="Kliknij aby spróbować jeszcze raz">Źle!</div>');
                        sprobujJeszczeRaz();
                    }
                }
            }
        }
    }



////////////////// PODPOWIEDZI

    function podpowiedzLiterke(x) {
        if (wprowadzone[x] === "-")
        {
            wprowadzone[x] = haslo_only_letters[x];
            var literki_node = document.querySelector('#literki');
            //alert('1 literka to:' + haslo_only_letters[x]);
            for (var j = 0; j <= ilosc_liter; j++) {
                if ((literki_node.childNodes[j].textContent === haslo_only_letters[x]) && (literki_node.childNodes[j].style.display !== "none")) {
                    literki_node.childNodes[j].style.display = "none";
                    //alert('usuwam literke: '+ literki_node.childNodes[j].textContent);
                    break;
                }
            }
            $("#letter-mask_" + x).css({"border": "none", "width": "auto", "cursor": "auto", "color": "green"});
            $("#letter-mask_" + x).attr("title", "");
            $("#letter-mask_" + x).text(wprowadzone[x]);
            //alert('wprowadzone: '+ wprowadzone);
            //  console.log("podpowiedzLiterke()");
            zebrane_punkty -= 10;
            if (zebrane_punkty < 10) {
                $("#pierwsza_litera").css({"color": "red", "cursor": "auto"});
                $("#losowa_litera").css({"color": "red", "cursor": "auto"});
            }
            wyswietlPunkty();
            sprawdzHaslo();
        } else {
            $('.alert').text("Opcja niedostępna!");
            $('.alert').show();
            $('.alert').delay(1400).fadeOut(300);
        }
        if (wprowadzone[0] !== "-")
            $("#pierwsza_litera").css({"color": "red", "cursor": "auto"});
        ilosc_wprowadzonych_liter++;
    }


    var los = -1;
    function Podpowiedzi() {
        $('#pierwsza_litera').click(function () {
            if (zebrane_punkty >= 10)
                podpowiedzLiterke(0);
            else {
                $('.alert').text("Masz za mało punktów!");
                $('.alert').show();
                $('.alert').delay(1400).fadeOut(300);
            }
            $("#pierwsza_litera").css({"color": "red", "cursor": "auto"});
        });
        $('#losowa_litera').click(function () {
            if (zebrane_punkty >= 10) {
                var r = 0;
                var to_random = [];
                for (var i = 0; i < ilosc_liter; i++) {
                    if (wprowadzone[i] === "-") {
                        to_random[r] = i;
                        r++;
                    }
                }
                los = Math.floor(Math.random() * ((r - 2) + 1));
                // alert("to random : "+to_random);
                //alert("los "+los);
                // alert("wylosowano: "+ los+ '  to_random[los]: '+to_random[los]);
                podpowiedzLiterke(to_random[los]);
            } else {
                $('.alert').text("Masz za mało punktów!");
                $('.alert').show();
                $('.alert').delay(1400).fadeOut(300);
            }
        });
    }


///////// NASTĘPNE HASŁO
    function sprobujJeszczeRaz() {
        $(".btn-zle").click(function () {
            $(this).remove();
            $(".literka").remove();
            //czyszczenie literek
            $(".letter-mask").html("");
            $(".letter-mask").css({"width": "40px", "height": "45px", "background": "transparent",
                "color": "white", "text-align": "center", "border-bottom": "2px solid white", "display": "inline-block", "margin": "5px", "cursor": "auto"});
            //alert('maska: '+maska);
            //alert('wprowadzone: '+wprowadzone);
            for (var i = 0; i < maska.length; i++)
                wprowadzone[i] = maska[i];
            wyswietlLiterki();
            wczytajHaslo();
        });
    }

    function nastepneHaslo() {
        id_aktualne_haslo += 1;
        $(".btn-nastepny").click(function () {
            $(this).remove();
            $(".literka").remove();
            $(".letter-mask").remove();
            $(".letter-mask-space").remove();
            haslo = lista_hasel[id_aktualne_haslo];
            haslo = haslo.toUpperCase();
            dlugosc = haslo.length;
            maska = [];
            ilosc_liter = 0; //ilość liter w haśle
            haslo_only_letters = [];
            wylosowane_literki = "";
            wprowadzone = [];
            ilosc_wprowadzonych_liter = 0;
            $("#pierwsza_litera").css({"color": "white", "cursor": "pointer"});
            $("#losowa_litera").css({"color": "white", "cursor": "pointer"});
            start();
        });
    }

    function start() {
        wyswietlNumerHasla();
        wyswietlPunkty();
        wyswietlObraz();
        wyswietlMaske();
        LosujOnlyLiterki();
        wyswietlLiterki();
        wczytajHaslo();
    }



///////////// Wywołania funkcji
    start();
    Podpowiedzi();
    
});



