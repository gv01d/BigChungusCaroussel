//V1.1.0

onload = () => {
    //Button Left
    let BtLeft = document.getElementById("left");
    //Button Right
    let BtRight = document.getElementById("right");
    //Parent of cards
    const caroussel = document.getElementById("caroussel");


    //First Card
    let Fst = document.querySelector("#caroussel>li:first-child");
    //Last Card
    let Lst = document.querySelector("#caroussel>li:last-child");

    //Inicial Values
    let Wait = false;
    let Size = -1;
    let Start = [];
    let Finish = [];

    //Find Number of Cards
    for (Size = 1; document.querySelector(`#caroussel>li:nth-child(${Size}n)`) != Lst; Size++);

    //Main card (class "M<value>" - 0 middle, -1 left, +1 right,can go from -99 to 99)
    let Main = parseInt(Size / 2) + (Size % 2) + parseInt(caroussel.className.substring(caroussel.className.lastIndexOf("M") + 1, caroussel.className.lastIndexOf("M-") + 3));
    document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = "Main";

    //Size
    let Gap = parseInt(window.getComputedStyle(Fst.parentElement).gap);
    let Offset = (x) => {
        return Gap + ((document.querySelector(`#caroussel>li:nth-child(${Main + x}n)`).clientWidth + document.querySelector(`#caroussel>li:nth-child(${Main}n)`).clientWidth) / 2)
    }

    if (Size % 2 == 0) {
        Fst.style.margin = `0 0 0 ${Offset}px`;
    }

    //Animation
    const Cgo = (x) => {
        return ([
            { transform: `translateX(0px)` },
            { transform: `translateX(${x}px)`, easing: "ease-out" }]);
    };

    let STi = 400;
    let start = STi;

    //Animation Timing config
    const CTiming = {
        //Animations duration - Milisseconds
        duration: start / 4,
        iterations: 1,
    };
    const ATiming = {
        //Animations duration - Milisseconds
        duration: start / 4,
        iterations: 1,
    };


    // funçao de repetiçao
    let t;
    function holdit(btn, action, speedup) {
        var repeat = function () {
            action();
            t = setTimeout(repeat, start);
            start = start / speedup;
        }
        btn.onmousedown = function () {
            repeat();
        }
        btn.onmouseup = function () {
            clearTimeout(t);
        }
    }


    let TO = true;

    let scrollLeft = (btn, speedup) => {
        if (Wait) {
            console.log("LeftButton Error : Please Wait");
        }
        else {
            let repeat = () => {
                Gap = parseInt(window.getComputedStyle(Fst.parentElement).gap);
                caroussel.animate(Cgo(Offset(-1)), CTiming).onfinish = () => {
                    let Lhtml = Lst.innerHTML;
                    for (let i = Size; i > 1; i--) {
                        document.querySelector(`#caroussel>li:nth-child(${i}n)`).innerHTML = document.querySelector(`#caroussel>li:nth-child(${i - 1}n)`).innerHTML;
                    }
                    Fst.innerHTML = Lhtml;
                    if (TO) {
                        t = setTimeout(repeat, start);
                        start = start / speedup;
                    } else {
                        console.log("mouseup");
                        clearTimeout(t);
                        document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = "Main";
                        Start = [document.querySelector("#caroussel>li:first-child").clientWidth, document.querySelector("#caroussel>li:first-child").clientHeight];
                        Finish = [document.querySelector(".Main").clientWidth, document.querySelector(".Main").clientHeight];
                        console.log("S : " + Start[0]);
                        console.log("F : " + Finish[0]);
                        document.querySelector(`#caroussel>li:nth-child(${Main}n)`).animate([
                            { width: `${Start[0]}px`, height: `${Start[1]}px` },
                            { width: `${Finish[0]}px`, height: `${Finish[1]}px`, easing: "ease-out" }
                        ], ATiming);
                        start = STi;
                        Wait = false;
                    }
                };
            }
            btn.onmousedown = function () {
                TO = true;
                Wait = true;
                Start = [document.querySelector("#caroussel>li:first-child").clientWidth, document.querySelector("#caroussel>li:first-child").clientHeight];
                Finish = [document.querySelector(".Main").clientWidth, document.querySelector(".Main").clientHeight];
                console.log("S : " + Start[0]);
                console.log("F : " + Finish[0]);
                document.querySelector(`#caroussel>li:nth-child(${Main}n)`).animate([
                    { width: `${Finish[0]}px`, height: `${Finish[1]}px` },
                    { width: `${Start[0]}px`, height: `${Start[1]}px`, easing: "ease-out" }
                ], ATiming).onfinish = () => {
                    document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = " ";
                    repeat();
                }
            }
            btn.onmouseup = function () {
                TO = false;
            }
            btn.onmouseleave = function () {
                TO = false;
            }
        }
    }


    let scrollRight = (btn, speedup) => {
        if (Wait) {
            console.log("RightButton Error : Please Wait");
        }
        else {
            let repeat = () => {
                Gap = parseInt(window.getComputedStyle(Fst.parentElement).gap);
                caroussel.animate(Cgo(-Offset(1)), CTiming).onfinish = () => {
                    let Lhtml = Fst.innerHTML;
                    for (let i = 1; i < Size; i++) {
                        document.querySelector(`#caroussel>li:nth-child(${i}n)`).innerHTML = document.querySelector(`#caroussel>li:nth-child(${i + 1}n)`).innerHTML;
                    }
                    Lst.innerHTML = Lhtml;
                    if (TO) {
                        t = setTimeout(repeat, start);
                        start = start / speedup;
                    } else {
                        console.log("mouseup");
                        clearTimeout(t);
                        document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = "Main";
                        Start = [document.querySelector("#caroussel>li:first-child").clientWidth, document.querySelector("#caroussel>li:first-child").clientHeight];
                        Finish = [document.querySelector(".Main").clientWidth, document.querySelector(".Main").clientHeight];
                        document.querySelector(`#caroussel>li:nth-child(${Main}n)`).animate([
                            { width: `${Start[0]}px`, height: `${Start[1]}px` },
                            { width: `${Finish[0]}px`, height: `${Finish[1]}px`, easing: "ease-out" }
                        ], ATiming);
                        start = STi;
                        Wait = false;
                    }
                };
            }
            btn.onmousedown = function () {
                TO = true;
                Wait = true;
                Start = [document.querySelector("#caroussel>li:first-child").clientWidth, document.querySelector("#caroussel>li:first-child").clientHeight];
                Finish = [document.querySelector(".Main").clientWidth, document.querySelector(".Main").clientHeight];
                console.log("S : " + Start[0]);
                console.log("F : " + Finish[0]);
                document.querySelector(`#caroussel>li:nth-child(${Main}n)`).animate([
                    { width: `${Finish[0]}px`, height: `${Finish[1]}px` },
                    { width: `${Start[0]}px`, height: `${Start[1]}px`, easing: "ease-out" }
                ], ATiming).onfinish = () => {
                    document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = " ";
                    repeat();
                }
            };
            btn.onmouseup = function () {
                TO = false;
            }
            btn.onmouseleave = function () {
                TO = false;
            }
        }
    }

    scrollLeft(BtLeft, 2);
    scrollRight(BtRight, 2);

    /*
    //Button Left trigger
    BtLeft.addEventListener("click", () => {
        if (Wait) {
            console.log("LeftButton Error : Please Wait");
        }
        else {
            Wait = true;
            Start = [document.querySelector("#caroussel>li:first-child").clientWidth, document.querySelector("#caroussel>li:first-child").clientHeight];
            Finish = [document.querySelector(".Main").clientWidth, document.querySelector(".Main").clientHeight];
            console.log("S : " + Start[0]);
            console.log("F : " + Finish[0]);
            document.querySelector(`#caroussel>li:nth-child(${Main}n)`).animate([
                { width: `${Finish[0]}px`, height: `${Finish[1]}px` },
                { width: `${Start[0]}px`, height: `${Start[1]}px`, easing: "ease-out" }
            ], ATiming).onfinish = () => {
                document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = " ";
                Gap = parseInt(window.getComputedStyle(Fst.parentElement).gap);
                caroussel.animate(Cgo(Offset(-1)), CTiming).onfinish = () => {
                    let Lhtml = Lst.innerHTML;
                    for (let i = Size; i > 1; i--) {
                        document.querySelector(`#caroussel>li:nth-child(${i}n)`).innerHTML = document.querySelector(`#caroussel>li:nth-child(${i - 1}n)`).innerHTML;
                    }
                    Fst.innerHTML = Lhtml;
                    document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = "Main";
                    Start = [document.querySelector("#caroussel>li:first-child").clientWidth, document.querySelector("#caroussel>li:first-child").clientHeight];
                    Finish = [document.querySelector(".Main").clientWidth, document.querySelector(".Main").clientHeight];
                    console.log("S : " + Start[0]);
                    console.log("F : " + Finish[0]);
                    document.querySelector(`#caroussel>li:nth-child(${Main}n)`).animate([
                        { width: `${Start[0]}px`, height: `${Start[1]}px` },
                        { width: `${Finish[0]}px`, height: `${Finish[1]}px`, easing: "ease-out" }
                    ], ATiming);
                    Wait = false;
                };
            };
        }
    });
 
    //Button Right trigger
    BtRight.addEventListener("click", () => {
        if (Wait) {
            console.log("RightButton Error : Please Wait");
        }
        else {
            Wait = true;
            Start = [document.querySelector("#caroussel>li:first-child").clientWidth, document.querySelector("#caroussel>li:first-child").clientHeight];
            Finish = [document.querySelector(".Main").clientWidth, document.querySelector(".Main").clientHeight];
 
            document.querySelector(`#caroussel>li:nth-child(${Main}n)`).animate([
                { width: `${Finish[0]}px`, height: `${Finish[1]}px` },
                { width: `${Start[0]}px`, height: `${Start[1]}px`, easing: "ease-out" }
            ], ATiming).onfinish = () => {
                document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = " ";
                Gap = parseInt(window.getComputedStyle(Fst.parentElement).gap);
                caroussel.animate(Cgo(-Offset(1)), CTiming).onfinish = () => {
                    let Lhtml = Fst.innerHTML;
                    for (let i = 1; i < Size; i++) {
                        document.querySelector(`#caroussel>li:nth-child(${i}n)`).innerHTML = document.querySelector(`#caroussel>li:nth-child(${i + 1}n)`).innerHTML;
                    }
                    Lst.innerHTML = Lhtml;
                    document.querySelector(`#caroussel>li:nth-child(${Main}n)`).className = "Main";
                    Start = [document.querySelector("#caroussel>li:first-child").clientWidth, document.querySelector("#caroussel>li:first-child").clientHeight];
                    Finish = [document.querySelector(".Main").clientWidth, document.querySelector(".Main").clientHeight];
                    document.querySelector(`#caroussel>li:nth-child(${Main}n)`).animate([
                        { width: `${Start[0]}px`, height: `${Start[1]}px` },
                        { width: `${Finish[0]}px`, height: `${Finish[1]}px`, easing: "ease-out" }
                    ], ATiming);
                    Wait = false;
                };
            };
        }
    });
    */
}
