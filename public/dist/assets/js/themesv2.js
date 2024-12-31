( () => {
    var e, t, n, o, a, l, i, s, r = document.getElementById("satuMomen"), c = document.documentElement.lang, d = document.getElementById("loader");
    d && (window.onload = d.style.display = "none");
    var u = r.dataset.guest
      , m = document.getElementById("guestNameSlot");
    u && m && (m.innerHTML = u);
    var y = r.dataset.group
      , p = document.getElementById("groupNameSlot");
    y && p && (p.innerHTML = y);
    var f = document.getElementById("btnMusic")
      , v = document.getElementById("music") ? document.getElementById("music") : null
      , g = document.querySelector(".sc-music > iframe")
      , h = g ? SC.Widget(g) : null
      , w = !1;
    playMusic = function(e) {
        v && (e ? (v.play(),
        w = !0) : (w ? v.pause() : v.play(),
        w = !w)),
        h && SC.Widget.Events.READY && (w ? (h.pause(),
        w = !1) : (h.play(),
        w = !0)),
        f && (w ? f.classList.add("playing") : f.classList.remove("playing"))
    }
    ,
    v && (v.onplaying = function() {
        w = !0,
        f.classList.add("playing")
    }
    ,
    v.onpause = function() {
        w = !1,
        f.classList.remove("playing")
    }
    ),
    showGift = function(e) {
        for (var t = 0; t < E.length; t++)
            t != e && (b[t].style.display = "none");
        b[e].style.display = "inherit",
        ge()
    }
    ;
    for (var b = document.getElementsByClassName("gift-container"), L = 0; L < b.length; L++)
        b[L].style.display = "none";
    for (var E = document.getElementsByClassName("btn-gift"), x = function(e) {
        E[e].onclick = function() {
            showGift(e)
        }
    }, T = 0; T < E.length; T++)
        x(T);
    var M = document.getElementById("lightboxWrapper")
      , B = document.getElementById("lightboxCloseBtn")
      , I = document.getElementById("lightboxNextBtn")
      , _ = document.getElementById("lightboxPrevBtn")
      , H = document.querySelector("#lightboxWrapper > .lightbox-list")
      , S = document.getElementsByClassName("lightbox");
    showLightbox = function(e) {
        M.classList.add("show"),
        H.innerHTML = '<div class="lightbox-inner"><img src="'.concat(S[e].src, '"></div>'),
        I.dataset.index = e,
        _.dataset.index = e,
        ge(),
        window.removeEventListener(ce[V].down, ye, !1)
    }
    ,
    I.onclick = function() {
        var e = parseInt(I.dataset.index) + 1;
        e >= S.length && (e = 0),
        showLightbox(e)
    }
    ,
    _.onclick = function() {
        var e = parseInt(_.dataset.index) - 1;
        -1 == e && (e = S.length - 1),
        showLightbox(e)
    }
    ,
    closeLightbox = function() {
        M.classList.remove("show"),
        H.innerHTML = "",
        window.addEventListener(ce[V].down, ye, !1)
    }
    ;
    for (var k = function(e) {
        S[e].onclick = function() {
            showLightbox(e)
        }
    }, q = 0; q < S.length; q++)
        k(q);
    B.onclick = function() {
        closeLightbox()
    }
    ;
    var C = document.getElementsByTagName("BODY")[0]
      , A = document.getElementById("modalOverlay");
    showModal = function(e) {
        C.classList.add("modal-open"),
        A.classList.add("show"),
        A.style = "display: block;",
        e.classList.add("show"),
        e.style = "display: block;",
        ge(),
        window.removeEventListener(ce[V].down, ye, !1)
    }
    ,
    closeModal = function(e) {
        C.classList.remove("modal-open"),
        A.classList.remove("show"),
        A.style = "display: none;",
        e.classList.remove("show"),
        e.style = "display: none;",
        window.addEventListener(ce[V].down, ye, !1)
    }
    ;
    var N = document.getElementsByClassName("countdown-wrapper");
    displayCountdown = function(e) {
        var t = new Date(e.dataset.datetime).getTime()
          , n = e.querySelector(".countdown > .day > .number")
          , o = e.querySelector(".countdown > .hour > .number")
          , a = e.querySelector(".countdown > .minute > .number")
          , l = e.querySelector(".countdown > .second > .number")
          , i = setInterval((function() {
            var e = (new Date).getTime()
              , s = t - e
              , r = Math.floor(s / 864e5)
              , c = Math.floor(s % 864e5 / 36e5)
              , d = Math.floor(s % 36e5 / 6e4)
              , u = Math.floor(s % 6e4 / 1e3);
            n.innerHTML = r,
            o.innerHTML = c,
            a.innerHTML = d,
            l.innerHTML = u,
            s < 0 && (clearInterval(i),
            n.innerHTML = "00",
            o.innerHTML = "00",
            a.innerHTML = "00",
            l.innerHTML = "00")
        }
        ), 1e3)
    }
    ;
    for (var W = 0; W < N.length; W++)
        displayCountdown(N[W]);
    for (var D = document.getElementsByClassName("btn-rsvp"), F = null !== (e = document.querySelector(".rsvp-placeholder")) && void 0 !== e ? e : null, O = null !== (t = document.querySelector(".rsvp-form")) && void 0 !== t ? t : null, Y = 0; Y < D.length; Y++)
        F ? D[Y].style.display = "none" : D[Y].onclick = function() {
            showModal(rsvpModal)
        }
        ;
    O && F && (F.innerHTML = "",
    F.appendChild(O));
    var R = null !== (n = document.getElementById("app")) && void 0 !== n ? n : null
      , j = null !== (o = document.getElementById("illegal")) && void 0 !== o ? o : null
      , z = null !== (a = document.getElementById("waterMark")) && void 0 !== a ? a : null
      , P = null !== (l = document.querySelector(".watermark-placeholder")) && void 0 !== l ? l : null
      , U = null !== (i = document.querySelector(".no-watermark")) && void 0 !== i ? i : null
      , G = null !== (s = document.querySelector(".watermark")) && void 0 !== s ? s : null;
    setTimeout((function() {
        z && P && null == U ? (z.style.display = "inherit",
        P.innerHTML = "",
        P.appendChild(z),
        j.style.display = "none") : G && null == P ? (R.innerHTML = "",
        j.style.display = "flex") : (z && (z.style.display = "none"),
        j.style.display = "none")
    }
    ), 300);
    for (var X = document.getElementsByClassName("account-number"), Z = 0; Z < X.length; Z++)
        X[Z].style.display = "inline",
        X[Z].innerHTML && ("id" == c ? X[Z].insertAdjacentHTML("afterend", "<button type='button' class='btn btn-sm btn-primary ml-2 mb-1 animate__animated animate__zoomIn animate__slow delay-5' data-text='".concat(X[Z].innerText, "' onclick='copyText(event)' style='font-family: sans-serif; border-radius: 4px; line-height: 1'>Salin</button>")) : X[Z].insertAdjacentHTML("afterend", "<button type='button' class='btn btn-sm btn-primary ml-2 mb-1 animate__animated animate__zoomIn animate__slow delay-5' data-text='".concat(X[Z].innerText, "' onclick='copyText(event)' style='font-family: sans-serif; border-radius: 4px; line-height: 1'>Copy</button>")));
    for (var J = document.getElementsByClassName("copy-address"), K = 0; K < J.length; K++)
        J[K].innerHTML && ("id" == c ? J[K].insertAdjacentHTML("afterend", "<button type='button' class='btn btn-sm btn-primary mt-2 animate__animated animate__fadeInUp animate__slow delay-5' data-text='".concat(J[K].innerText, "' onclick='copyText(event)' style='font-family: sans-serif; border-radius: 4px;'>Salin Alamat</button>")) : J[K].insertAdjacentHTML("afterend", "<button type='button' class='btn btn-sm btn-primary mt-2 animate__animated animate__fadeInUp animate__slow delay-5' data-text='".concat(J[K].innerText, "' onclick='copyText(event)' style='font-family: sans-serif; border-radius: 4px;'>Copy to Clipboard</button>")));
    copyText = function(e) {
        var t = document.createElement("input");
        t.autofocus = !1,
        t.value = e.target.dataset.text,
        document.body.appendChild(t),
        t.select(),
        document.execCommand("copy"),
        t.remove();
        var n = e.target.innerHTML;
        e.target.innerHTML = "id" == c ? "Disalin" : "Copied",
        setTimeout((function() {
            e.target.innerHTML = n
        }
        ), 2e3)
    }
    ;
    var Q = function() {
        document.getElementById("workspace-container");
        var e = document.querySelector(".canvas")
          , t = document.getElementById("panZoom")
          , n = Number(window.screen.width > 430 ? 414 : window.screen.width)
          , o = Number(window.innerHeight > 932 ? 736 : window.innerHeight) / n * 9
          , a = Number(window.innerHeight) / 736
          , l = Number(window.screen.width) / 414
          , i = a < l ? a : l
          , s = 46 * (o < 16 || window.screen.width > 430 ? 16 : o);
        e.style.height = "".concat(s, "px"),
        r.style.height = "".concat(s, "px"),
        t.style.transform = "scale(".concat(i, ") translate(0px,0px)")
    };
    Q(),
    window.addEventListener("resize", Q, !1);
    var V = ""
      , $ = function() {
        try {
            return document.createEvent("TouchEvent"),
            V = "touch",
            !0
        } catch (e) {
            return V = "mouse",
            !1
        }
    };
    $();
    var ee = document.querySelectorAll(".satumomen_slide")
      , te = document.querySelectorAll(".satumomen_menu_item")
      , ne = document.getElementById("smMenu")
      , oe = document.querySelector(".satumomen_menu_list")
      , ae = te.length < 5 ? ne.offsetWidth / te.length : ne.offsetWidth / 5
      , le = 0
      , ie = function() {
        Array.from(ee).forEach((function(e) {
            e.style.display = "none"
        }
        )),
        Array.from(te).forEach((function(e) {
            e.style.maxWidth = "".concat(ae, "px"),
            e.classList.remove("active"),
            e.onclick = function(t) {
                t.cancelable && t.preventDefault(),
                le = Array.from(te).indexOf(e),
                re(le)
            }
        }
        )),
        ee[le].style.display = "",
        te[le].classList.add("active")
    };
    ie();
    var se = function() {
        ie(),
        le = le < ee.length - 1 ? le + 1 : 0,
        re(le, !1),
        me()
    }
      , re = function(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        ie(),
        t && ge();
        var n = oe.offsetWidth - oe.scrollWidth;
        ee[e].style.display = "",
        te[e].classList.add("active");
        var o = ne.offsetWidth / 2 - ae / 2 - te[e].offsetLeft;
        oe.style.transform = "translateX(".concat(o > 0 ? 0 : o < n ? n : o, "px)"),
        le = e
    }
      , ce = {
        mouse: {
            down: "mousedown",
            move: "mousemove",
            up: "mouseup"
        },
        touch: {
            down: "touchstart",
            move: "touchmove",
            up: "touchend"
        }
    }
      , de = 0
      , ue = function(e) {
        var t = $() ? e.touches[0].clientY : e.clientY;
        de - 50 > t && (ge(),
        se()),
        de < t - 50 && (ie(),
        re(le = le > 0 ? le - 1 : le),
        me(),
        ge())
    }
      , me = function(e) {
        window.removeEventListener(ce[V].move, ue, !1)
    }
      , ye = function(e) {
        e.cancelable && e.preventDefault(),
        de = $() ? e.touches[0].clientY : e.clientY,
        window.addEventListener(ce[V].up, me, !1),
        window.addEventListener(ce[V].move, ue, !1)
    }
      , pe = document.getElementById("btnAutoplay")
      , fe = !1
      , ve = function() {
        fe || (fe = !0,
        autoPlay = setInterval((function() {
            se()
        }
        ), 15e3),
        pe.classList.add("playing"))
    }
      , ge = function() {
        fe && (fe = !1,
        clearInterval(autoPlay),
        pe.classList.remove("playing"))
    };
    pe.addEventListener("click", (function(e) {
        e.cancelable && e.preventDefault(),
        fe ? ge() : fe || he ? ve() : we()
    }
    ), !1),
    openFullScreen = function() {
        document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.webkitRequestFullscreen ? document.documentElement.webkitRequestFullscreen() : document.documentElement.msRequestFullscreen && document.documentElement.msRequestFullscreen()
    }
    ;
    for (var he = !1, we = function(e) {
        if (he = !0)
            for (var t = 0; t < be.length; t++)
                be[t].classList.add("d-none");
        playMusic(!0),
        ve(),
        -1 != navigator.userAgent.indexOf("UCBrowser") || -1 != navigator.userAgent.indexOf("MiuiBrowser") || navigator.userAgent.includes("OppoBrowser") || navigator.userAgent.includes("HeyTapBrowser") ? console.log("Browser not support portrait full screen mode") : openFullScreen(),
        document.querySelector(".not-open").classList.remove("not-open"),
        window.addEventListener(ce[V].down, ye, !1),
        se()
    }, be = document.getElementsByClassName("btn-open-invitation"), Le = 0; Le < be.length; Le++)
        be[Le].addEventListener("click", we, !1)
}
)();
