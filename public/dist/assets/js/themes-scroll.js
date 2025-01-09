( () => {
    var e, t, n, o, l, a, i, s;
    document.body.style.overflowY = "hidden";
    var r = document.getElementById("satuMomen")
      , d = document.querySelector(".satumomen_cover");
    d.style.position = "fixed";
    var c = document.documentElement.lang
      , u = document.getElementById("loader");
    u && (window.onload = u.style.display = "none",
    window.onload = r.style.display = "inherit");
    var m = r.dataset.guest
      , y = document.getElementById("guestNameSlot");
    m && y && (y.innerHTML = m);
    var p = r.dataset.group
      , f = document.getElementById("groupNameSlot");
    p && f && (f.innerHTML = p);
    var g = document.getElementById("btnMusic")
      , v = document.getElementById("music") ? document.getElementById("music") : null
      , h = document.querySelector(".sc-music > iframe")
      , b = h ? SC.Widget(h) : null
      , w = !1;
    playMusic = function(e) {
        v && (e ? (v.play(),
        w = !0) : (w ? v.pause() : v.play(),
        w = !w)),
        b && SC.Widget.Events.READY && (w ? (b.pause(),
        w = !1) : (b.play(),
        w = !0)),
        g && (w ? g.classList.add("playing") : g.classList.remove("playing"))
    }
    ,
    v && (v.onplaying = function() {
        w = !0,
        g.classList.add("playing")
    }
    ,
    v.onpause = function() {
        w = !1,
        g.classList.remove("playing")
    }
    ),
    showGift = function(e) {
        for (var t = 0; t < E.length; t++)
            t != e && (L[t].style.display = "none");
        L[e].style.display = "inherit"
    }
    ;
    for (var L = document.getElementsByClassName("gift-container"), x = 0; x < L.length; x++)
        L[x].style.display = "none";
    for (var E = document.getElementsByClassName("btn-gift"), T = function(e) {
        E[e].onclick = function() {
            showGift(e)
        }
    }, M = 0; M < E.length; M++)
        T(M);
    var B = document.getElementById("lightboxWrapper")
      , _ = document.getElementById("lightboxCloseBtn")
      , C = document.getElementById("lightboxNextBtn")
      , H = document.getElementById("lightboxPrevBtn")
      , I = document.querySelector("#lightboxWrapper > .lightbox-list")
      , S = document.getElementsByClassName("lightbox");
    showLightbox = function(e) {
        B.classList.add("show"),
        I.innerHTML = '<div class="lightbox-inner"><img src="'.concat(S[e].src, '"></div>'),
        C.dataset.index = e,
        H.dataset.index = e
    }
    ,
    C.onclick = function() {
        var e = parseInt(C.dataset.index) + 1;
        e >= S.length && (e = 0),
        showLightbox(e)
    }
    ,
    H.onclick = function() {
        var e = parseInt(H.dataset.index) - 1;
        -1 == e && (e = S.length - 1),
        showLightbox(e)
    }
    ,
    closeLightbox = function() {
        B.classList.remove("show"),
        I.innerHTML = ""
    }
    ;
    for (var q = function(e) {
        S[e].onclick = function() {
            showLightbox(e)
        }
    }, k = 0; k < S.length; k++)
        q(k);
    _.onclick = function() {
        closeLightbox()
    }
    ;
    var A = document.getElementsByTagName("BODY")[0]
      , N = document.getElementById("modalOverlay");
    showModal = function(e) {
        A.classList.add("modal-open"),
        N.classList.add("show"),
        N.style = "display: block;",
        e.classList.add("show"),
        e.style = "display: block;"
    }
    ,
    closeModal = function(e) {
        A.classList.remove("modal-open"),
        N.classList.remove("show"),
        N.style = "display: none;",
        e.classList.remove("show"),
        e.style = "display: none;"
    }
    ;
    var F = document.getElementsByClassName("countdown-wrapper");
    displayCountdown = function(e) {
        var t = new Date(e.dataset.datetime).getTime()
          , n = e.querySelector(".countdown > .day > .number")
          , o = e.querySelector(".countdown > .hour > .number")
          , l = e.querySelector(".countdown > .minute > .number")
          , a = e.querySelector(".countdown > .second > .number")
          , i = setInterval((function() {
            var e = (new Date).getTime()
              , s = t - e
              , r = Math.floor(s / 864e5)
              , d = Math.floor(s % 864e5 / 36e5)
              , c = Math.floor(s % 36e5 / 6e4)
              , u = Math.floor(s % 6e4 / 1e3);
            n.innerHTML = r,
            o.innerHTML = d,
            l.innerHTML = c,
            a.innerHTML = u,
            s < 0 && (clearInterval(i),
            n.innerHTML = "00",
            o.innerHTML = "00",
            l.innerHTML = "00",
            a.innerHTML = "00")
        }
        ), 1e3)
    }
    ;
    for (var R = 0; R < F.length; R++)
        displayCountdown(F[R]);
    for (var D = document.getElementsByClassName("btn-rsvp"), O = null !== (e = document.querySelector(".rsvp-placeholder")) && void 0 !== e ? e : null, U = null !== (t = document.querySelector(".rsvp-form")) && void 0 !== t ? t : null, Y = 0; Y < D.length; Y++)
        O ? D[Y].style.display = "none" : D[Y].onclick = function() {
            showModal(rsvpModal)
        }
        ;
    U && O && (O.innerHTML = "",
    O.appendChild(U));
    var j = null !== (n = document.getElementById("app")) && void 0 !== n ? n : null
      , W = null !== (o = document.getElementById("illegal")) && void 0 !== o ? o : null
      , G = null !== (l = document.getElementById("waterMark")) && void 0 !== l ? l : null
      , P = null !== (a = document.querySelector(".watermark-placeholder")) && void 0 !== a ? a : null
      , z = null !== (i = document.querySelector(".no-watermark")) && void 0 !== i ? i : null
      , J = null !== (s = document.querySelector(".watermark")) && void 0 !== s ? s : null;
    setTimeout((function() {
        G && P && null == z ? (G.style.display = "inherit",
        P.innerHTML = "",
        P.appendChild(G),
        W.style.display = "none") : J && null == P ? (j.innerHTML = "",
        W.style.display = "flex") : (G && (G.style.display = "none"),
        W.style.display = "none")
    }
    ), 300);
    for (var K = document.getElementsByClassName("account-number"), Q = 0; Q < K.length; Q++)
        K[Q].innerHTML && ("id" == c ? K[Q].insertAdjacentHTML("afterend", "<button type='button' class='btn btn-sm btn-primary mt-2 mb-2 animate__animated animate__fadeInUp animate__slow delay-5' data-text='".concat(K[Q].innerText, "' onclick='copyText(event)' style='font-family: sans-serif; border-radius: 4px'>Salin Rekening</button>")) : K[Q].insertAdjacentHTML("afterend", "<button type='button' class='btn btn-sm btn-primary mt-2 mb-2 animate__animated animate__fadeInUp animate__slow delay-5' data-text='".concat(K[Q].innerText, "' onclick='copyText(event)' style='font-family: sans-serif; border-radius: 4px'>Copy to Clipboard</button>")));
    for (var V = document.getElementsByClassName("copy-address"), X = 0; X < V.length; X++)
        V[X].innerHTML && ("id" == c ? V[X].insertAdjacentHTML("afterend", "<button type='button' class='btn btn-sm btn-primary mt-2 animate__animated animate__fadeInUp animate__slow delay-5' data-text='".concat(V[X].innerText, "' onclick='copyText(event)' style='font-family: sans-serif; border-radius: 4px;'>Salin Alamat</button>")) : V[X].insertAdjacentHTML("afterend", "<button type='button' class='btn btn-sm btn-primary mt-2 animate__animated animate__fadeInUp animate__slow delay-5' data-text='".concat(V[X].innerText, "' onclick='copyText(event)' style='font-family: sans-serif; border-radius: 4px;'>Copy to Clipboard</button>")));
    copyText = function(e) {
        var t = document.createElement("input");
        t.autofocus = !1,
        t.value = e.target.dataset.text,
        document.body.appendChild(t),
        t.select(),
        document.execCommand("copy"),
        t.remove(),
        e.target.innerHTML = "id" == c ? "Berhasil Disalin" : "Copied to Clipboard"
    }
    ;
    var Z = document.querySelectorAll(".satumomen_slide");
    Array.from(Z).forEach((function(e) {
        e.classList.contains("satumomen_cover") || (e.style.display = "none")
    }
    ));
    var $ = document.querySelectorAll(".animate__animated")
      , ee = function() {
        window.scrollY;
        Array.from($).forEach((function(e) {
            e.getBoundingClientRect().y - window.innerHeight < 0 && ("hidden" == e.style.visibility && (e.style.display = "none"),
            setTimeout((function() {
                e.style.display = "",
                e.style.visibility = ""
            }
            ), 1))
        }
        ))
    };
    window.addEventListener("scroll", function(e) {
        var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 10, o = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        return function() {
            var l = this
              , a = arguments
              , i = o && !t;
            clearTimeout(t),
            t = setTimeout((function() {
                t = null,
                o || e.apply(l, a)
            }
            ), n),
            i && e.apply(l, a)
        }
    }(ee)),
    openFullScreen = function() {
        document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.webkitRequestFullscreen ? document.documentElement.webkitRequestFullscreen() : document.documentElement.msRequestFullscreen && document.documentElement.msRequestFullscreen()
    }
    ;
    for (var te = function(e) {
        var t;
        if (!0)
            for (var n = 0; n < ne.length; n++)
                ne[n].classList.add("d-none");
        playMusic(!0),
        -1 != navigator.userAgent.indexOf("UCBrowser") || -1 != navigator.userAgent.indexOf("MiuiBrowser") || navigator.userAgent.includes("OppoBrowser") || navigator.userAgent.includes("HeyTapBrowser") ? console.log("Browser not support portrait full screen mode") : openFullScreen(),
        document.body.style.overflowY = "",
        d.style.position = "relative",
        setTimeout((function() {
            window.scroll({
                top: window.innerHeight,
                behavior: "smooth"
            })
        }
        ), 100),
        Array.from(Z).forEach((function(e) {
            e.style.display = ""
        }
        )),
        Array.from($).forEach((function(e) {
            e.style.visibility = "hidden"
        }
        )),
        ee(),
        null === (t = document.querySelector(".not-open")) || void 0 === t || t.classList.remove("not-open"),
        e.target.remove()
    }, ne = document.getElementsByClassName("btn-open-invitation"), oe = 0; oe < ne.length; oe++)
        ne[oe].addEventListener("click", te, !1)
}
)();
